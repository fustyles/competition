/*
@license
Copyright 2025 Taiwan (ChungYi Fu)

@author https://www.facebook.com/francefu/
@Update 13/10/2025 00:00 (Taiwan Standard Time)
*/

var mainPath = 'https://fustyles.github.io/competition/';
var workspace;
var subWorkspace;
var category;
var categoryBlocks = [];
var categoryExpand = [];
var scratchStyle = false;
var xmlBlockly = "";
var xmlScratch = "";
var createFunctionVariable = ["", []];

document.addEventListener('DOMContentLoaded', function() {
	
	function getScript(output) {
		if (output)
			var jsPath = mainPath;
		else
			var jsPath = '';
		
		var script = "<link rel='stylesheet' href='"+jsPath+"css/icon_custom.css' />";
		
		var xml = Blockly.Xml.workspaceToDom(workspace, true);
		xml = Blockly.Xml.domToPrettyText(xml);
		
		return script;
	}	

	function loadToolbox(renderer, categorySystem, scale) {
		//載入積木目錄
		category = [
			categorySystem
		];
	
		var xmlToolbox='<xml id="toolbox">';
		try {
			for (var i=0;i<category.length;i++){
				category[i] = category[i].replace(/\<category /g, "<category expanded=\"false\" ");
				//console.log(category[i]);
				var xml = new DOMParser().parseFromString(category[i],"text/xml");
				xmlToolbox+=new XMLSerializer().serializeToString(xml.firstChild).replace("<xml>","").replace("</xml>","");
			}
		} catch (error) {
			console.log(error);
		}		
		xmlToolbox+='</xml>';
		

		//初始化工作區	
		workspace = Blockly.inject('root',{
				renderer: renderer
				,media: 'media/'
				,toolbox: xmlToolbox
				,grid:{spacing: 20,length: 3,colour: '#eee',snap: true}
				,zoom:{controls: true, wheel: false, startScale: scale, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2}
				,trashcan: true
				,move:{
					scrollbars: {
					  horizontal: true,
					  vertical: true
					},
					drag: true,
					wheel: true
				}			
			}
		);
		
		function onWorkspaceChange(event) {
			if (event.type === Blockly.Events.BLOCK_DELETE) {
				handleBlockDelete(event);
			}
			
			const targetWorkspace = Blockly.getMainWorkspace();
			
			const allowedTypes = [
				Blockly.Events.BLOCK_CHANGE
			];

			if (allowedTypes.includes(event.type)) {
				if (scratchStyle) {
					xmlScratch = Blockly.Xml.workspaceToDom(targetWorkspace);
					xmlScratch = Blockly.Xml.domToText(xmlScratch);
				} else {	
					xmlBlockly = Blockly.Xml.workspaceToDom(targetWorkspace);
					xmlBlockly = Blockly.Xml.domToText(xmlBlockly);
				}
			}
		}
		workspace.addChangeListener(onWorkspaceChange);
		
		function handleBlockDelete(event) {
			const deletedXml = event.oldXml;
			if (!deletedXml) {
				return;
			}

			const blockType = deletedXml.getAttribute('type');

			if (blockType === "javascript_procedures_defnoreturn_scratch") {
				const nameField = deletedXml.querySelector('field[name="NAME"]');
				if (!nameField) return; 

				const procedureName = nameField.textContent;
				const allVariables = workspace.getAllVariables();
				allVariables.forEach(function(variableModel) {
					const mutation = deletedXml.querySelector('mutation');
					if (mutation) {
						mutation.querySelectorAll('arg').forEach(function(arg) {
							const varId = arg.getAttribute('varid');
							const varName = arg.getAttribute('name');
							const variableToDelete = workspace.getVariableById(varId);
							if (variableToDelete) {
								workspace.deleteVariableById(varId);
							}
						});
					}
				});
			}
		}
		
		registerMyVariable();
		registerMyLists();
		registerMyFunction();
		
		return workspace;
	}
	window.loadToolbox = loadToolbox;
	
	function registerMyVariable(){
		Blockly.myvariable = {};
		Blockly.MYVARIABLE_CATEGORY_NAME = "MYVARIABLE"; 
		Blockly.myvariable.CATEGORY_NAME = "MYVARIABLE"; 
		Blockly.myvariable.NAME_TYPE=Blockly.MYVARIABLE_CATEGORY_NAME;	

		Blockly.myvariable.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_VARIABLE_OTHER}");
			btn.setAttribute("callbackKey","CREATE_MYVARIABLE");
			
			workspace.registerButtonCallback("CREATE_MYVARIABLE", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				Blockly.Variables.createVariableButtonHandler(currentWorkspace, null, 'other');
				
				currentWorkspace.refreshToolboxSelection();			
			});
			blocks.push(btn);
		
	
			const variables = workspace.getVariablesOfType("other");
			if (variables.length > 0) {
				const latestVariable = variables[variables.length - 1];
				
				if (Blockly.Blocks['variables_get_other']) {
					variables.sort(Blockly.VariableModel.compareByName);

					for (const variable of variables) {
						const getBlock = Blockly.utils.xml.createElement('block');
						getBlock.setAttribute('type', 'variables_get_other');
						getBlock.setAttribute('gap', '8');
						
						getBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
						blocks.push(getBlock);
					}
				}
				
				if (Blockly.Blocks['variables_set_other']) {
					const listAddXml = '<block type="variables_set_other" gap="8"><field name="VAR" variabletype="other">'+latestVariable.name+'</field><value name="VALUE"><shadow type="text_noquotes"><field name="TEXT">0</field></shadow></value></block>';
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['math_change_other']) {
					const listAddXml = '<block type="math_change_other" gap="8"><field name="VAR" variabletype="other">'+latestVariable.name+'</field><value name="DELTA"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value></block>';
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));					
				}

				
			}

			return blocks;
		};

		function registerMyListCategory() {
			if (workspace) {
				workspace.registerToolboxCategoryCallback(
					Blockly.MYVARIABLE_CATEGORY_NAME, 
					Blockly.myvariable.flyoutCategory
				);				
			} else {
				setTimeout(registerMyListCategory, 100);
			}
		}
		registerMyListCategory();
	}
	
	function registerMyLists(){
		Blockly.mylist = {};
		Blockly.MYLIST_CATEGORY_NAME = "MYLIST"; 
		Blockly.mylist.CATEGORY_NAME = "MYLIST"; 
		Blockly.mylist.NAME_TYPE=Blockly.MYLIST_CATEGORY_NAME;	

		Blockly.mylist.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_LIST}");
			btn.setAttribute("callbackKey","CREATE_MYLIST");
			
			workspace.registerButtonCallback("CREATE_MYLIST", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				Blockly.Variables.createVariableButtonHandler(currentWorkspace, null, 'Array');
				
				currentWorkspace.refreshToolboxSelection();			
			});
			blocks.push(btn);
		
	
			const variables = workspace.getVariablesOfType("Array");
			if (variables.length > 0) {
				const latestVariable = variables[variables.length - 1];
				variables.sort(Blockly.VariableModel.compareByName);
			
				if (Blockly.Blocks['variables_get_array']) {
					for (const variable of variables) {
						const getBlock = Blockly.utils.xml.createElement('block');
						getBlock.setAttribute('type', 'variables_get_array');
						getBlock.setAttribute('gap', '24');
						
						getBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
						blocks.push(getBlock);
					}
				}
				
				if (Blockly.Blocks['list_addtolist_scratch']) {
					const listAddXml = '<block type="list_addtolist_scratch" gap="24"><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}	
				
				if (Blockly.Blocks['list_itemoflist_scratch']) {
					const listAddXml = '<block type="list_itemoflist_scratch" gap="24"><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_deletealloflist_scratch']) {
					const listAddXml = '<block type="list_deletealloflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}	

				if (Blockly.Blocks['list_lengthoflist_scratch']) {
					const listAddXml = '<block type="list_lengthoflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_insertatlist_scratch']) {
					const listAddXml = '<block type="list_insertatlist_scratch" gap="24"><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}	

				if (Blockly.Blocks['list_replaceitemoflist_scratch']) {
					const listAddXml = '<block type="list_replaceitemoflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_deleteoflist_scratch']) {
					const listAddXml = '<block type="list_deleteoflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_listcontainsitem_scratch']) {
					const listAddXml = '<block type="list_listcontainsitem_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_itemnumoflist_scratch']) {
					const listAddXml = '<block type="list_itemnumoflist_scratch" gap="24"><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}					
			}

			return blocks;
		};

		function registerMyListCategory() {
			if (workspace) {
				workspace.registerToolboxCategoryCallback(
					Blockly.MYLIST_CATEGORY_NAME, 
					Blockly.mylist.flyoutCategory
				);				
			} else {
				setTimeout(registerMyListCategory, 100);
			}
		}
		registerMyListCategory();
	}
	
	const paramContainer = document.getElementById('paramListContainer');
	const createFunctionBlockName = document.getElementById('createFunction_blockName_input');
	
	function registerMyFunction(){
		Blockly.myfunction = {};
		Blockly.MYFUNCTION_CATEGORY_NAME = "MYFUNCTION"; 
		Blockly.myfunction.CATEGORY_NAME = "MYFUNCTION"; 
		Blockly.myfunction.NAME_TYPE=Blockly.MYFUNCTION_CATEGORY_NAME;	

		Blockly.myfunction.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_FUNCTION}");
			btn.setAttribute("callbackKey","CREATE_MYFUNCTION");
			
			workspace.registerButtonCallback("CREATE_MYFUNCTION", function(d) {
				toggleForm(1);
				if (!subWorkspace) {
					subWorkspace = Blockly.inject('createFunctionDiv', {
						renderer: 'zelos',
						zoom: {						
							wheel: true,
							startScale: 0.9,
							maxScale: 0.9,
							minScale: 0.9,
							scaleSpeed: 1.2
						},
						rtl: false,
					});
				}
				
				createFunctionVariable = ["", []];
				createFunctionVariable[0] = Blockly.Msg["JAVASCRIPT_CREATE_BLOCKNAME_INPUT"];
				createFunctionBlockName.value = createFunctionVariable[0];
				paramContainer.innerHTML = "";
				createFunctionBlock();
			});
			blocks.push(btn);
			
			var procedureBlocks = workspace.getBlocksByType("javascript_procedures_defnoreturn_scratch");

			for (var i=0;i<procedureBlocks.length;i++) {
				var procBlock = procedureBlocks[i];
				var varModels = procBlock.argumentVarModels_;
				
				const callBlock = document.createElement('block');
				callBlock.setAttribute('type', 'javascript_procedures_callnoreturn_scratch');

				const mutation = document.createElement('mutation');
				mutation.setAttribute('name', procBlock.getFieldValue("NAME"));
				
				varModels.forEach(function(variable) {
					const arg = document.createElement('arg');
					arg.setAttribute('name', variable.name);
					mutation.appendChild(arg);				  
				});

				callBlock.appendChild(mutation);
				blocks.push(callBlock);	
				
			
				varModels.forEach(function(variable) {
					if (variable.type=="other") {
						if (Blockly.Blocks['variables_get_other']) {
							const getBlock = Blockly.utils.xml.createElement('block');
							getBlock.setAttribute('type', 'variables_get_other');
							getBlock.setAttribute('gap', '24');
							
							getBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
							blocks.push(getBlock);
						}

					} else if (variable.type=="Boolean") {
						if (Blockly.Blocks['variables_get_boolean']) {
							const getBlock = Blockly.utils.xml.createElement('block');
							getBlock.setAttribute('type', 'variables_get_boolean');
							getBlock.setAttribute('gap', '24');
							
							getBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
							blocks.push(getBlock);
						}
					}
				});
			}
			
			return blocks;
		};

		function registerMyListCategory() {
			if (workspace) {
				workspace.registerToolboxCategoryCallback(
					Blockly.MYFUNCTION_CATEGORY_NAME, 
					Blockly.myfunction.flyoutCategory
				);				
			} else {
				setTimeout(registerMyListCategory, 100);
			}
		}
		registerMyListCategory();
	}

	function toggleForm(show) {
		const formDiv = document.getElementById('createFunction');
		if (show) {
			formDiv.style.display = 'flex'; 			
		} else {
			formDiv.style.display = 'none';
		}
	}	
	
    document.getElementById('confirmButton').addEventListener('click', () => {
        toggleForm(false);
		
		var xml = '<xml xmlns="https://developers.google.com/blockly/xml">\n'+
				  '<variables>\n';
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][0].trim()!=""&&createFunctionVariable[1][i][1]!="label")
				xml += '<variable type="'+createFunctionVariable[1][i][1]+'" id="'+createFunctionVariable[1][i][2]+'">'+createFunctionVariable[1][i][0]+'</variable>\n';
		}
		xml += '</variables>\n'+
		'<block type="javascript_procedures_defnoreturn_scratch">\n'+
		'<mutation>\n';
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][0].trim()!=""&&createFunctionVariable[1][i][1]!="label")
				xml += '<arg name="'+createFunctionVariable[1][i][0]+'" varid="'+createFunctionVariable[1][i][2]+'" type="'+createFunctionVariable[1][i][1]+'"></arg>\n';
		}	
		xml += '</mutation>\n'+		
		'<field name="NAME">'+createFunctionVariable[0]+'</field>\n';
		var title = "";
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][0].trim()!=""&&createFunctionVariable[1][i][1]=="label")
				title += createFunctionVariable[1][i][0]+' ';
		}
		xml += '<field name="TITLE">'+title+'</field>\n';
		xml += '<comment pinned="false"></comment>\n'+
		'</block>\n'+
		'</xml>\n';
		
		var domBlock = Blockly.utils.xml.textToDom(xml);
		var topBlocks = Blockly.Xml.domToWorkspace(domBlock, workspace);		
		var block = workspace.getBlockById(topBlocks[0]);
		var blockToCenterXY = getBlockToCenterXY(block);
		block.moveBy(blockToCenterXY.x, blockToCenterXY.y);	
		
		workspace.refreshToolboxSelection();
		workspace.render();
    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        toggleForm(false);
    });	

	function promptAndAddParam(type) {
		var promptText = prompt(Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_TITLE_SCRATCH"]);
		if (promptText) {
			if (createFunctionVariableExist(promptText)) {
				alert(Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"]);
				return;
			}	
			if (promptText.trim()=="") {
				return;
			}
			createFunctionVariableAdd(promptText, type);			
			updateParamContainer();
			createFunctionBlock();
		}			
	}

	function addParamTag(name, type) {
		const tag = document.createElement('div');
		tag.className = `param-tag ${type}`;
		tag.setAttribute('data-name', name);
		tag.setAttribute('data-type', type);

		const deleteBtn = document.createElement('span');
		deleteBtn.className = 'delete-btn';
		deleteBtn.textContent = 'x'; 
		
		deleteBtn.onclick = function(event) {
			event.stopPropagation();
			createFunctionVariableDelete(tag.getAttribute('data-name'));
			paramContainer.removeChild(tag);
		};

		tag.textContent = name;
		tag.appendChild(deleteBtn);
		
		paramContainer.appendChild(tag);
	}
	
	function createFunctionVariableExist(name) {
		const variableModels = workspace.getAllVariables();
		const variableNames = variableModels.map(variableModel => variableModel.name);
		if (variableNames.includes(name))
			return true;		
		
		if (createFunctionVariable[1].flat().includes(name))
			return true;		
		return false;
	}
	
	function createFunctionVariableAdd(name, type) {
		createFunctionVariable[1].push([name, type, generatorVariableUid()]);		
	}
	
	function generatorVariableUid() {
		const ID_SOUP = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+|~-={}[];<>,./`';
		const length = 20;
		let result = '';
		for (let i = 0; i < length; i++) {
		result += ID_SOUP.charAt(Math.floor(Math.random() * ID_SOUP.length));
		}
		return result;
	};	
	
	function createFunctionVariableDelete(name) {
		const index = createFunctionVariable[1].findIndex(item => {
			return item[0] === name;
		});		
		createFunctionVariable[1].splice(index, 1);
        createFunctionBlock();		
	}

	function createFunctionBlock() {
		if (subWorkspace) {	
			var xml = Blockly.utils.xml.textToDom('<xml></xml>');
			subWorkspace.clear();		
			xml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="javascript_createfunction_scratch" x="0" y="0"></block></xml>';
			Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), subWorkspace);
			var singleBlock = subWorkspace.getTopBlocks(false)[0];
			
            singleBlock.appendDummyInput()
                .appendField(createFunctionVariable[0]);		

			for (var i=0;i<createFunctionVariable[1].length;i++) {
				singleBlock.appendValueInput("INPUT_"+createFunctionVariable[1][i][0])
					.setCheck("String");
				addBlockToInput(singleBlock, "INPUT_"+createFunctionVariable[1][i][0], 'text_noquotes', createFunctionVariable[1][i][0]);
			}

			//singleBlock.setEditable(false);
			singleBlock.setDeletable(false);
			singleBlock.setInputsInline(true);
			singleBlock.initSvg(); 
			singleBlock.render(); 

			subWorkspace.centerOnBlock(singleBlock.id);			
		}
	}
	
	function addBlockToInput(block, inputName, shadowType, fieldValue) {
		const input = block.getInput(inputName);
		
		if (!input || !input.connection) {
			return;
		}

		const blockDom = Blockly.utils.xml.createElement('block');
		blockDom.setAttribute('type', shadowType); 
		
		const fieldDom = Blockly.utils.xml.createElement('field');
		fieldDom.setAttribute('name', 'TEXT');
		fieldDom.textContent = fieldValue;
		blockDom.appendChild(fieldDom);
		
		const newBlock = Blockly.Xml.domToBlock(blockDom, block.workspace);
		const newBlockConnection = newBlock.outputConnection;
        input.connection.connect(newBlockConnection);
		
		//newBlock.setEditable(false);
		newBlock.setMovable(false);
		newBlock.setDeletable(false);

		const text_field = newBlock.getField('TEXT');
        
        if (text_field) {
            text_field.setValidator(function(newValue) {
                const oldValue = this.getValue();
				if (newValue !== oldValue) {
					const index = createFunctionVariable[1].findIndex(item => {
						return item[0] === oldValue;
					});		
					createFunctionVariable[1][index][0] = newValue;
					updateParamContainer();
                }
                return newValue;
            });
        }
	}

	function updateParamContainer() {
		paramContainer.innerHTML = "";
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			addParamTag(createFunctionVariable[1][i][0], createFunctionVariable[1][i][1]);
		}
	}
	
    function getBlockToMouseXY(block) {
        var mouseClient = new Blockly.utils.Coordinate(mouse_cursor.pageX - window.scrollX, mouse_cursor.pageY - window.scrollY);
        var mousePos = Blockly.utils.svgMath.screenToWsCoordinates(workspace, mouseClient);
        var blockPos = Blockly.utils.svgMath.getRelativeXY(block.getSvgRoot());
        var blockToMouseXY = {};
        blockToMouseXY.x = mousePos.x - blockPos.x;
        blockToMouseXY.y = mousePos.y - blockPos.y;
        return blockToMouseXY;
    }

    function getBlockToCenterXY(block) {
        var position = Blockly.utils.svgMath.getRelativeXY(block.getSvgRoot());
        var x = position.x;
        var y = position.y;
        var scrollX = workspace.scrollX / workspace.scale;
        var scrollY = workspace.scrollY / workspace.scale;
        var wsWidth = workspace.getParentSvg().width.baseVal.value / workspace.scale;
        var wsHeight = workspace.getParentSvg().height.baseVal.value / workspace.scale;
        var blockToCenterXY = {};
        blockToCenterXY.x = wsWidth / 2 - block.width / 2 - scrollX - x;
        blockToCenterXY.y = wsHeight / 2 - block.height / 2 - scrollY - y;
        return blockToCenterXY;
    }	

	document.getElementById('createFunction_blockName_input').addEventListener('input', () => {
        createFunctionVariable[0] = document.getElementById('createFunction_blockName_input').value;
		createFunctionBlock();
    });	
	
    document.getElementById('createFunction_add_ns').addEventListener('click', () => {
        promptAndAddParam('other');
    });
	
	document.getElementById('createFunction_add_b').addEventListener('click', () => {
        promptAndAddParam('Boolean');
    });	
	
    document.getElementById('createFunction_add_l').addEventListener('click', () => {
        promptAndAddParam('label');
    });
	
	
/*	
	
	class FieldTextHexagon extends Blockly.FieldTextInput {
		static KEY_ = 'field_text_hexagon';

		constructor(value, opt_validator, opt_config) {
			super(value, opt_validator, opt_config);
			
			this.SERIALIZABLE = true;
		}

		initView() {
			super.initView();

			const oldRect = this.fieldBorderRect_;
			if (oldRect) {
				oldRect.remove();
			}

			this.fieldBorderRect_ = Blockly.utils.dom.createSvgElement(
				Blockly.utils.Svg.PATH,
				{
					'fill': this.sourceBlock_ ? this.sourceBlock_.getColour() : '#999999',
					'stroke': this.sourceBlock_ ? this.sourceBlock_.getColour() : '#999999',
					'class': 'blocklyFieldRect blocklyFieldTextHexagonPath',
				},
				this.fieldGroup_
			);

			this.textElement_.style.fill = 'black';
		}

		updateSize_() {
			super.updateSize_();
		}
	}

	Blockly.FieldTextHexagon = FieldTextHexagon;

	Blockly.registry.register(
		Blockly.registry.Type.FIELD,
		FieldTextHexagon.KEY_,
		FieldTextHexagon
	);

*/




		
	setTimeout(function(){
		
		loadToolbox('geras', catSystem, 1.0);
		//loadToolbox('zelos', catSystemScratch, 0.8);
		updateMsg();
		newFile();
		
		//Double Click關閉彈出積木選單
		var blocklyWorkspace = document.getElementsByClassName("blocklyFlyout");
		for (var f=0;f<blocklyWorkspace.length;f++) {
			blocklyWorkspace[f].addEventListener('dblclick', function(){ 
				Blockly.hideChaff();
			});
		}
	}, 1000);

	//新增自訂積木js檔
	function addScript(url) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = location.href.substr(0, location.href.lastIndexOf("/"))+"/"+url;
		$("body").append(s);
	}

	//檢查目錄是否已存在工具箱
	function checkCategoryExist(child) {
		for (var i=1;i<customCategory.length;i++) {
			if (child==customCategory[i][2])
				customCategory.splice(i, 1);
		}
	}	
	
	//程式碼區塊拖曳與調整大小功能	
	$(function() {
		$( "#javascript_content" ).draggable();
		$( "#javascript_content" ).resizable();
		$( "#run_content" ).draggable();
		$( "#run_content" ).resizable();		
	});	
	
	//新增初始化積木
	function newFile() {
		var xmlDoc = Blockly.utils.xml.textToDom('<xml></xml>');
		workspace.clear();
		Blockly.Xml.domToWorkspace(xmlDoc, workspace);
		
		xmlBlockly = "";	
		xmlScratch = "";
		
		resetOutput();
	}
	
	function resetOutput() {
		try {
			var iframe = document.getElementById("iframe_output");
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write("");
			iframe.contentWindow.document.close();
			document.getElementById("iframe_output").focus();
		} catch (e) {
			//alert(e);
		}
	}
	
	//程式碼區塊顯示
	document.getElementById('button_code').onclick = function () {
		var div = document.getElementById('javascript_content');
		if (div.style.display == "none") {
			div.style.display = "block";
		}
		else {
			div.style.display = "none";
		}
	}
	
	//重設工作區
	document.getElementById('button_reset').onclick = function () {
		var result = confirm(Blockly.Msg.BUTTON_RESET);
		if (result) {
			newFile();
			resetOutput();
		}
	}

	//匯出工作區積木與原始檔
	document.getElementById('button_save_xml').onclick = function () {
		try {
			var xml = Blockly.Xml.workspaceToDom(workspace);
			if (scratchStyle)
				xml.setAttribute('platform', 'scratch');
			else
				xml.setAttribute('platform', 'blockly');
			var xmlText = Blockly.Xml.domToText(xml);

			var link = document.createElement('a');
			link.download="project.xml";
			link.href="data:application/octet-stream;utf-8," + encodeURIComponent(xmlText);
			document.body.appendChild(link);
			link.click();
			link.remove();				
		} catch (e) {
			alert(e);
		}
	}
	
	var output_result = "";
	
	var GeminiKey = Blockly.Msg["GEMINI_KEY"];
	gemini_chat_initial((CryptoJS.AES.decrypt(GeminiKey, 'test').toString(CryptoJS.enc.Utf8)), "gemini-2.5-flash", 10000, 0, Blockly.Msg["GEMINI_ROLE"]);

	async function gemini_chat_response(gemini_chat_data) {
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		iframeDocument.body.insertAdjacentHTML("beforeend", "<br>"+gemini_chat_response_br(gemini_chat_data.replace(/\*\*/g,""), 'br'));
		//iframeDocument.body.scrollTop = iframeDocument.body.scrollHeight;
		//iframeDocument.documentElement.scrollTop = iframeDocument.documentElement.scrollHeight;
	}
	window.gemini_chat_response = gemini_chat_response;
	
	document.getElementById('gemini_ask').onclick = async function () {
		//if (!document.getElementById("question_input").value.trim()) return;
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		
		iframeElement.contentWindow.document.open();
		iframeElement.contentWindow.document.write("");
		iframeElement.contentWindow.document.close();
		iframeElement.focus();
		iframeDocument.body.insertAdjacentHTML("beforeend", output_result);
		
		var code = Blockly.Msg["NOCODE"];
		if (workspace.getAllBlocks().length > 0)
			code = Blockly.JavaScript.workspaceToCode(workspace);

		var promptTemplate = Blockly.Msg["GEMINI_PROMPT"];

		var var1 = document.getElementById("question_input").value;
		var var2 = code;
		var var3 = document.getElementById("query_input").value;

		var prompt = promptTemplate
			.replace("%1", var1)
			.replace("%2", var2)
			.replace("%3", var3);

		await gemini_chat_run(prompt);
	}
	
	document.getElementById('gemini_clear').onclick = async function () {
		document.getElementById("query_input").value = "";
		var query = confirm(Blockly.Msg["GEMINI_CLEAR_QUERY"]);
		if (query) {
			gemini_chat_clear();
			var iframe = document.getElementById("iframe_output");
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write("");
			iframe.contentWindow.document.close();
			iframe.focus();
		}
	}
	
	if (!navigator.onLine) {
		document.getElementById('gemini_ask').style.display = "none";
		document.getElementById('gemini_clear').style.display = "none";
	}
	
	//執行程式
	function runCode() {
	  if (scratchStyle) {
		const topBlocks = workspace.getBlocksByType("javascript_start_scratch", false); 
		if (topBlocks.length!=1) {
			alert(Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"]);
			if (topBlocks.length==0) {
				var xml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="javascript_start_scratch" x="10" y="10"></block></xml>';
				var startBlocks = Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
				var block = workspace.getBlockById(startBlocks[0]);
				var blockToCenterXY = getBlockToCenterXY(block);
                block.moveBy(blockToCenterXY.x, blockToCenterXY.y);				
			}
			return;
		}
	  }
		
	  var code = Blockly.JavaScript.workspaceToCode(workspace);
	
	  var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";
	  
	  iframe_code += getScript(0);
		
	  iframe_code += "\<\/head\>\<body\>\<script\>"+js_beautify(code)+"\<\/script\>\<\/body\>\<\/html\>";
	  
	  //console.log(iframe_code);
	  output_result = "";
	  
	  try {
		var iframe = document.getElementById("iframe_output");
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(iframe_code);
		iframe.contentWindow.document.close();
		iframe.focus();
	  } catch (e) {
		alert(e);
	  }
	}
	
	//測試程式
	/*
		Program Validation Function Description:

		Problem: Input the dividend and the divisor, output the quotient.

		Test Data Format: 1st input value; 2nd input value; Correct validation value
		(Semicolon ";" separates numbers or strings, followed by the correct value for validation)

		Window input: 12;4;3 → Automatically input 12 and 4, compare whether the output value equals the validation value 3
	*/
	document.getElementById('button_test').onclick = function () {
		
	  var blocks = workspace.getBlocksByType("javascript_data_output");
	  var blocks_scratch = workspace.getBlocksByType("javascript_data_output_scratch");
	  if (blocks.length!=1&&blocks_scratch.length!=1) {
		alert(Blockly.Msg["TEST_CODE_CHECK"]);
		return;
	  }
	  
	  var input = prompt(Blockly.Msg["TEST_CODE_MESSAGE"]);
	  if (input) {
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		code = code.replace(/variable_input\(/g,"variable_input_test('"+input+"', ");
		code = code.replace(/data_output\(/g,"data_output_test('"+input+"', ");		
		code = 'var variable_data_test_index = -1;\n' + code;
		
		if (!scratchStyle) {
			code += ''+
			'function variable_input_test (input, msg, type){\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+			
			'  variable_data_test_index++;\n'+
			'  var arr = input.split(";");\n'+
			'  if (variable_data_test_index>(arr.length-1)) return "";\n'+
			'  input = arr[variable_data_test_index];\n'+
			'  if (type=="NUMBER")\n'+
			'  	input = Number(input);\n'+
			'  else\n'+
			'  	input = input;\n'+
			'  document.body.insertAdjacentHTML("beforeend", msg+"："+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+
			'  return input;\n'+
			'}';
			
		} else {
			code += ''+
			'function variable_input_test (input, msg){\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+			
			'  variable_data_test_index++;\n'+
			'  var arr = input.split(";");\n'+
			'  if (variable_data_test_index>(arr.length-1)) return "";\n'+
			'  input = arr[variable_data_test_index];\n'+	
			'  document.body.insertAdjacentHTML("beforeend", msg+"："+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+
			'  return input;\n'+
			'}';
		}

		code += ''+
		    'function data_output_test (input, msg, text) {\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+			
			'  var arr = input.split(";");\n'+			
			'  document.body.insertAdjacentHTML("beforeend", msg+"："+String(text).replace(/ /g,"&nbsp;")+"<br>");\n'+
			'  if (text==arr[arr.length-1])\n'+
			'    document.body.insertAdjacentHTML("beforeend", "<BR>'+Blockly.Msg["TEST_CODE_CORRECT"]+'");\n'+
			'  else\n'+
			'    document.body.insertAdjacentHTML("beforeend", "<BR>'+Blockly.Msg["TEST_CODE_ERROR"]+'");\n'+
			'}';		

		var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";

		iframe_code += getScript(0);

		iframe_code += "\<\/head\>\<body\>\<script\>"+js_beautify(code)+"\<\/script\>\<\/body\>\<\/html\>";

		output_result = "";

		try {
			var iframe = document.getElementById("iframe_output");
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write(iframe_code);
			iframe.contentWindow.document.close();
			iframe.focus();
		} catch (e) {
			alert(e);
		}

	  
	  }
	}	
	
	//停止程式
	function stopCode() {
	  document.getElementById("iframe_output").src = "about:blank";
	}		
	
	//開啟程式碼執行視窗
	document.getElementById('button_run').onclick = function () {
		document.getElementById('iframe_output').innerHTML = "";
		stopCode();
		setTimeout(function(){
			runCode();
		}, 100);	
	}	
	
	//更新首頁語系文字
	function updateMsg() {
		if (typeof msg != "undefined") {
			for (var i=0;i<msg.length;i++) {
				if (msg[i][0]=="document") {
					document.title=msg[i][2];
				}				
				else if (msg[i][1]=="innerHTML") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).innerHTML=msg[i][2];
				}
				else if (msg[i][1]=="title") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).title=msg[i][2];
				}	
				else if (msg[i][1]=="value") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).value=msg[i][2];
				}
				else if (msg[i][1]=="placeholder") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).placeholder=msg[i][2];
				}				
			}
		}
	}		
	
	//複製程式碼到剪貼簿
	document.getElementById('button_copycode').onclick = function () {
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		navigator.clipboard.writeText(iframeDocument.body.innerText.trim()).then(function() {
			alert(Blockly.Msg.COPY_CLIPBOARD);
		}, function(err) {
			console.error(err);
		});
	}
	
	//匯入備份積木檔
	document.getElementById('button_open_xml').onclick = function () {
		var e = document.getElementById("importBlocks");
		if (e) {
			e.parentElement.removeChild(e);
		}
		
		var input=document.createElement('input');
		input.type="file";
		input.id="importBlocks";
		input.style.display = "none";
		input.accept=".xml";
		input.onchange = function(element) {
			try {	
				var file = this.files[0];
				if (file) {
					var fr = new FileReader();           
					fr.onload = function (event) {
						var blocks = Blockly.utils.xml.textToDom(event.target.result);
						
						var platformValue = blocks.getAttribute('platform');
						if (platformValue == 'scratch'){
							scratchStyle = true;
							changeToolboxStyle(true);
						} else {
							scratchStyle = false;
							changeToolboxStyle(false);
						}
						workspace.clear();
						Blockly.Xml.domToWorkspace(blocks, workspace);
						javascriptCode();
						resetOutput();
					};
					fr.readAsText(file);
				}
			} catch (e) {
				alert(e);
			}	  
		}

		document.body.appendChild(input);
		setTimeout(function(){
			input.click();
		},500);
	}

	function changeToolboxStyle() {
		if (scratchStyle) {
			Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = "";
			Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = "";
			xmlBlockly = Blockly.Xml.workspaceToDom(this.workspace);
			xmlBlockly = Blockly.Xml.domToText(xmlBlockly);
			this.workspace.dispose();
			this.workspace = null;
			document.getElementById("root").innerHTML = "";
			var workspace = window.loadToolbox('zelos', catSystemScratch, 0.9);
			if (xmlScratch)
				Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xmlScratch), workspace);
		} else {
			Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = Blockly.Msg["PROCEDURES_BEFORE_PARAMS_BACKUP"];
			Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS_BACKUP"];		
			xmlScratch = Blockly.Xml.workspaceToDom(this.workspace);
			xmlScratch = Blockly.Xml.domToText(xmlScratch);
			this.workspace.dispose();
			this.workspace = null;
			document.getElementById("root").innerHTML = "";		
			var workspace = window.loadToolbox('geras', catSystem, 1.0);
			if (xmlBlockly)
				Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xmlBlockly), workspace);
		}
	}	
	
	//切換語言
	document.getElementById('lang-selector').onchange = function () {
		if (this.selectedIndex>0) 
			location.href = "?lang=" + this.options[this.selectedIndex].value;
	}
});	

//切換頁籤
var tabs = ['code_content','xml_content','category_content'];
function displayTab(id) {
	var div = document.getElementById('javascript_content');
	for (var i in tabs) {
		const tab = document.getElementById(tabs[i]);
		tab.style.display = (tabs[i]==id)?"block":"none";
		if (id=='code_content') {
			div.style.display = "none";
			javascriptCode();
		}
		else if (id=='xml_content') {
			div.style.display = "none";
			xmlCode();
		}
		else
			div.style.display = "block";	
	}
}

//JavaScript原始碼顯示
function javascriptCode() {
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	code = js_beautify(code);
	document.getElementById('code_content').innerHTML = code.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/ /g,"&nbsp;");
}

//XML原始碼顯示
function xmlCode() {
	var xml = Blockly.Xml.workspaceToDom(workspace, true);
	var code = Blockly.Xml.domToPrettyText(xml);
	document.getElementById('xml_content').innerHTML = code.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/ /g,"&nbsp;");
}

//視窗最上層顯示
var contents = ['javascript_content'];
function textareaFocus(id) {
	for (var i in contents) {
		const content = document.getElementById(contents[i]);
		content.style.zIndex = (contents[i]==id)?"99":"98";
	}
}

//縮放視窗
function contentZoom(content) {
	const div_title = document.getElementById(content+"_title");
	const div_content = document.getElementById(content+"_content");
	const div_code = document.getElementById(content+"_code");
	if (div_content.style.height!= "40px") {
		div_content.w = div_content.style.width;
		div_content.h = div_content.style.height;
		div_content.l = div_content.style.left;
		div_content.t = div_content.style.top;
		
		div_content.style.width = "calc(20vw)";
		div_content.style.height = "40px";
		div_code.style.display = "none";

		if (content=="javascript") {
			div_content.style.left = "calc(98% - 20vw)";
			div_content.style.top = "64px";
		}
	}
	else {
		div_content.style.width = div_content.w;
		div_content.style.height = div_content.h;
		div_code.style.display = "block";
		
		if (content=="javascript") {
			div_content.style.left = div_content.l;	
			div_content.style.top = div_content.t;
		}			
	}
}

//重設視窗
function reloadZoom(content) {
    const div_content = document.getElementById(content + "_content");

    if (div_content.style.height != "40px") {
        const contentDiv = document.getElementById("javascript_content");

        contentDiv.style.width = '450px';
        contentDiv.style.height = 'calc(100vh - 100px)';
        contentDiv.style.left = 'calc(100vw - 478px)';
        contentDiv.style.top = '64px';
        contentDiv.style.padding = '0em';
        contentDiv.style.fontSize = '14px';
        contentDiv.style.position = 'absolute';

        const questionInput = document.getElementById("question_input");
        const queryInput = document.getElementById("query_input");

		questionInput.style.flex = '1';
		questionInput.style.height = '25%';
		questionInput.style.width = '98%';

		queryInput.style.width = '72%';
		queryInput.style.height = '3.2em';
    }
}

if (typeof require !== "undefined") {
	var http = require('http');
	var fs = require('fs');
	var path = require('path');

	http.createServer(function (request, response) {
		//console.log('request ', request.url.split("?")[0]);

		var filePath = './package.nw' + request.url.split("?")[0];
		if (filePath == './package.nw/') {
			filePath = './package.nw/main.html'
		}

		var extname = String(path.extname(filePath)).toLowerCase();
		var mimeTypes = {
			'.html': 'text/html',
			'.js': 'text/javascript',
			'.css': 'text/css',
			'.json': 'application/json',
			'.png': 'image/png',
			'.jpg': 'image/jpg',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
			'.wav': 'audio/wav',
			'.mp4': 'video/mp4',
			'.woff': 'application/font-woff',
			'.ttf': 'application/font-ttf',
			'.eot': 'application/vnd.ms-fontobject',
			'.otf': 'application/font-otf',
			'.wasm': 'application/wasm'
		};

		var contentType = mimeTypes[extname] || 'application/octet-stream';

		fs.readFile(filePath, function(error, content) {
			if (error) {
				if(error.code == 'ENOENT') {
					fs.readFile('./404.html', function(error, content) {
						response.writeHead(404, { 'Content-Type': 'text/html' });
						response.end(content, 'utf-8');
					});
				}
				else {
					response.writeHead(500);
					response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
				}
			}
			else {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			}
		});

	}).listen(3000);

	// Server: http://127.0.0.1:3000
}
