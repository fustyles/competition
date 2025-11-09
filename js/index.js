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
var GeminiKey = Blockly.Msg["GEMINI_KEY"];

document.addEventListener('DOMContentLoaded', function() {
	
	initialMoveDiv();	

	function loadToolbox(renderer, categorySystem, scale) {
		category = [
			categorySystem
		];
	
		var xmlToolbox='<xml id="toolbox">';
		try {
			for (var i=0;i<category.length;i++){
				category[i] = category[i].replace(/\<category /g, "<category expanded=\"false\" ");
				var xml = new DOMParser().parseFromString(category[i],"text/xml");
				xmlToolbox+=new XMLSerializer().serializeToString(xml.firstChild).replace("<xml>","").replace("</xml>","");
			}
		} catch (error) {
			console.log(error);
		}		
		xmlToolbox+='</xml>';

		if (renderer=="zelos") {	
			workspace = Blockly.inject('root',{
					renderer: 'zelos'
					,theme: 'classic'				
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
					,plugins: {
					  'flyoutsVerticalToolbox': ContinuousFlyout,
					  'toolbox': ContinuousToolbox,	
					  'metricsManager': ContinuousMetrics,
					}
				});
				
			var continuousFlyout = workspace.toolbox_.flyout_;
			if (continuousFlyout.autoClose)
				continuousFlyout.setVisible(false);
			
			workspace.eventHistory = [];
				
			function onWorkspaceChangedContinuousToolbox(event) {
				workspace.eventHistory.push([event.type, event.oldJson||null, event]);

				if (continuousFlyout.autoClose) {
					if ((event.type=="create"||event.type=="click")&&continuousFlyout.isVisible_==true) {
						continuousFlyout.setVisible(false);
						workspace.toolbox_.clearSelection();
					} else if (event.type=="toolbox_item_select"&&continuousFlyout.isVisible_==false) {
						continuousFlyout.setVisible(true);
					} else if (event.type=="toolbox_item_select"&&(!event.newItem)&&continuousFlyout.isVisible_==true) {
						Blockly.Events.disable();
						try {
							continuousFlyout.setVisible(false);
							workspace.toolbox_.clearSelection();
						} finally {
							Blockly.Events.enable();
							workspace.render();
						}
					}
				}
					
				if (event.type=="change"&&event.blockId&&workspace.getBlockById(event.blockId)&&workspace.getBlockById(event.blockId).type=="javascript_procedures_defnoreturn_scratch") {
					Blockly.Events.disable();
					try {
						workspace.getToolbox().refreshSelection();
					} finally {
						Blockly.Events.enable();
						workspace.render();
					}
				}
			}
			workspace.addChangeListener(onWorkspaceChangedContinuousToolbox);			

		} else {
			workspace = Blockly.inject('root',{
					renderer: renderer
					,theme: 'classic'
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
		}
		
		var workspaceChangeTimer;
		function onWorkspaceChanged(event) {
			if (event.type === Blockly.Events.BLOCK_DELETE) {
				handleBlockDelete(event);
			}
			
			const targetWorkspace = Blockly.getMainWorkspace();
			
			const allowedTypes = [
				Blockly.Events.BLOCK_CREATE,
				Blockly.Events.BLOCK_DELETE,
				Blockly.Events.BLOCK_MOVE,
				Blockly.Events.BLOCK_CHANGE,
				Blockly.Events.VAR_CREATE,
				Blockly.Events.VAR_DELETE,
				Blockly.Events.VAR_RENAME,
				Blockly.Events.FINISHED_LOADING
			];

			clearTimeout(workspaceChangeTimer);
			workspaceChangeTimer = setTimeout(function(){
				if (allowedTypes.includes(event.type)) {
					if (scratchStyle) {
						xmlScratch = Blockly.Xml.workspaceToDom(targetWorkspace);
						xmlScratch = Blockly.Xml.domToText(xmlScratch);
					} else {	
						xmlBlockly = Blockly.Xml.workspaceToDom(targetWorkspace);
						xmlBlockly = Blockly.Xml.domToText(xmlBlockly);
					}
				}
			}, 250);
		}
		workspace.addChangeListener(onWorkspaceChanged);
		
		function handleBlockDelete(event) {
			const deletedXml = event.oldXml;
			if (!deletedXml) {
				return;
			}

			const blockType = deletedXml.getAttribute('type');

			if (blockType === "javascript_procedures_defnoreturn_scratch") {
				const nameField = deletedXml.querySelector('field[name="NAME"]');
				if (!nameField) return;
				
				var workspaceXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
				const mutation = deletedXml.querySelector('mutation');

				Blockly.Events.setGroup(true);
				try {
					if (mutation) {
						var ns = workspace.getBlocksByType("javascript_variable_ns_scratch");
						var b = workspace.getBlocksByType("javascript_variable_boolean_scratch");
						
						const args = mutation.getElementsByTagName('arg');
						for (let i = 0; i < args.length; i++) {
							const varId = args[i].getAttribute('varid');
							const varName = args[i].getAttribute('name');
							const varType = args[i].getAttribute('type');
							
							for (let j=0;j<ns.length;j++) {
								if ("arg_"+ns[j].getFieldValue("variableName")==varName)
									safeDisposeBlock(ns[j]);
							}
							for (let k=0;k<b.length;k++) {
								if ("arg_"+b[k].getFieldValue("variableName")==varName)
									safeDisposeBlock(b[k]);
							}
						}
					}
					
					workspace.getToolbox().refreshSelection();
					workspace.getToolbox().clearSelection();
				} finally {
					Blockly.Events.setGroup(false);
					workspace.render();
				}
			}
		}
		
		registerMyVariable();
		registerMyLists();
		registerMyFunction();

		blocklyFlyoutDblclick();
		workspace.scrollCenter();		
		
		return workspace;
	}
	window.loadToolbox = loadToolbox;
	
	function safeDisposeBlock(block, withEvent = false) {
	  if (!block) return;
	  
	  if (block.getParent()) {
		block.unplug(false);
	  }

	  block.inputList.forEach(input => {
		if (input.connection && input.connection.targetBlock()) {
		  input.connection.targetBlock().unplug();
		}
	  });

	  if (block.outputConnection && block.outputConnection.targetConnection) {
		block.outputConnection.disconnect();
	  }

	  block.dispose(withEvent);
	}	
	
	function blocklyFlyoutDblclick(){
		var blocklyWorkspace = document.getElementsByClassName("blocklyFlyout");
		for (var f=0;f<blocklyWorkspace.length;f++) {
			blocklyWorkspace[f].addEventListener('dblclick', function(){ 
				Blockly.hideChaff();
			});
		}
	}
	
	function registerMyVariable(){
		Blockly.myvariable = {};
		Blockly.MYVARIABLE_CATEGORY_NAME = "MYVARIABLE"; 
		Blockly.myvariable.CATEGORY_NAME = Blockly.MYVARIABLE_CATEGORY_NAME; 
		Blockly.myvariable.NAME_TYPE=Blockly.MYVARIABLE_CATEGORY_NAME;

		Blockly.myvariable.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_VARIABLE_OTHER}");
			btn.setAttribute("callbackKey","CREATE_MYVARIABLE");
			
			workspace.registerButtonCallback("CREATE_MYVARIABLE", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				currentWorkspace.eventHistory = [];
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

		function registerMyVariableCategory() {
			if (workspace) {
				var r = workspace.registerToolboxCategoryCallback(
					Blockly.MYVARIABLE_CATEGORY_NAME, 
					Blockly.myvariable.flyoutCategory
				);			
			} else {
				setTimeout(registerMyVariableCategory, 100);
			}
		}
		registerMyVariableCategory();
	}
	
	function registerMyLists(){
		Blockly.mylist = {};
		Blockly.MYLIST_CATEGORY_NAME = "MYLIST"; 
		Blockly.mylist.CATEGORY_NAME = Blockly.MYLIST_CATEGORY_NAME; 
		Blockly.mylist.NAME_TYPE=Blockly.MYLIST_CATEGORY_NAME;	

		Blockly.mylist.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_LIST}");
			btn.setAttribute("callbackKey","CREATE_MYLIST");
			
			workspace.registerButtonCallback("CREATE_MYLIST", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				currentWorkspace.eventHistory = [];
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
		Blockly.myfunction.CATEGORY_NAME = Blockly.MYFUNCTION_CATEGORY_NAME; 
		Blockly.myfunction.NAME_TYPE=Blockly.MYFUNCTION_CATEGORY_NAME;	

		Blockly.myfunction.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_FUNCTION}");
			btn.setAttribute("callbackKey","CREATE_MYFUNCTION");
			
			workspace.registerButtonCallback("CREATE_MYFUNCTION", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				currentWorkspace.eventHistory = [];
				
				toggleCreateFunctionForm(1);
				if (!subWorkspace) {
					subWorkspace = Blockly.inject('createFunctionDiv', {
						renderer: 'zelos'
						,grid:{spacing: 20,length: 3,colour: '#eee',snap: true}
						,zoom:{wheel: true, startScale: 1, maxScale: 1.8, minScale: 0.6, scaleSpeed: 1.2}
						,move:{
							scrollbars: {
							  horizontal: false,
							  vertical: false
							},
							drag: true,
							wheel: true
						}						
					});
					
					subWorkspace.addChangeListener(function(event) {
						if (event.type === Blockly.Events.VIEWPORT_CHANGE) {
							var blocks = subWorkspace.getAllBlocks();
							if (blocks.length==1)
								subWorkspace.centerOnBlock(blocks[0].id);
						}
					});
				}
				
				createFunctionVariable = ["", []];
				createFunctionVariable[0] = Blockly.Msg["JAVASCRIPT_CREATE_BLOCKNAME_INPUT"];
				createFunctionBlockName.value = createFunctionVariable[0];
				paramContainer.innerHTML = "";
				createFunctionBlock();
				
				currentWorkspace.refreshToolboxSelection();
			});
			blocks.push(btn);
			
			var procedureBlocks = workspace.getBlocksByType("javascript_procedures_defnoreturn_scratch");
	
			for (var i=0;i<procedureBlocks.length;i++) {
				var procBlock = procedureBlocks[i];
				var varModels = procBlock.argumentVarModels_;

				var blockXml = '<block type="javascript_procedures_callnoreturn_scratch"><mutation name="'+procBlock.getFieldValue("NAME")+'">';
				varModels.forEach(function(variable) {
					blockXml += '<arg name="'+variable.name+'" type="'+variable.type+'"></arg>';			  
				});
				blockXml += '</mutation></block>';
				blocks.push(Blockly.utils.xml.textToDom(blockXml));
				
				varModels.forEach(function(variable) {
					if (variable.type=="NS") {
						if (Blockly.Blocks['javascript_variable_ns_scratch']) {
							blocks.push(Blockly.utils.xml.textToDom('<block type="javascript_variable_ns_scratch"><field name="variableName">'+variable.name.replace("arg_","")+'</field></block>'));
						}
					} else if (variable.type=="Boolean") {
						if (Blockly.Blocks['javascript_variable_boolean_scratch']) {
							blocks.push(Blockly.utils.xml.textToDom('<block type="javascript_variable_boolean_scratch"><field name="variableName">'+variable.name.replace("arg_","")+'</field></block>'));
						}
					}
				});
			}
			return blocks;
		};

		function registerMyFunctionCategory() {
			if (workspace) {
				workspace.registerToolboxCategoryCallback(
					Blockly.MYFUNCTION_CATEGORY_NAME, 
					Blockly.myfunction.flyoutCategory
				);				
			} else {
				setTimeout(registerMyFunctionCategory, 100);
			}
		}
		registerMyFunctionCategory();
	}
	
	function createFunctionBlock() {
		if (subWorkspace) {	
			subWorkspace.clear();		
			var xml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="javascript_createfunction_scratch"><field name="NAME">'+createFunctionVariable[0]+'</field></block></xml>';
			var singleBlock_id = Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), subWorkspace);
			var singleBlock = subWorkspace.getBlockById(singleBlock_id[0]);

			for (var i=0;i<createFunctionVariable[1].length;i++) {
				addBlockToInput(singleBlock, "INPUT_"+createFunctionVariable[1][i][0], createFunctionVariable[1][i]);
			}
	 
			singleBlock.render();
			
			subWorkspace.centerOnBlock(singleBlock.id);
		}
	}

	function addBlockToInput(block, inputName, fieldValue) {
		let customField;
		if (fieldValue[1]=="NS") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#FD6723',
				shapeType: 1
			});
		}
		else if (fieldValue[1]=="Boolean") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#3373CC',
				shapeType: 2
			});
		} 
		else if (fieldValue[1]=="label") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#59C059',
				shapeType: 0
			});
		}
		
		if (customField && customField.setValidator) {
			const input_field = block.appendDummyInput(inputName).appendField(customField, 'TEXT');
			customField.setValidator(function(newValue) {
				var fieldTpye = "";
				if (this.backgroundStyle_==1)
					fieldTpye = "NS";
				else if (this.backgroundStyle_==2)
					fieldTpye = "Boolean";
				else if (this.backgroundStyle_==0)
					fieldTpye = "label";			
			
				const oldValue = this.getValue();

				if (newValue !== oldValue) {
					const index = createFunctionVariable[1].findIndex(item => {						
						return item[0] === oldValue&&item[1] === fieldTpye;
					});				
					
					if (index !== -1) {
						 createFunctionVariable[1][index][0] = newValue;
						 updateParamContainer(); 
					}
				}
				return newValue;
			});
		}
	}	

	function toggleCreateFunctionForm(show) {
		const formDiv = document.getElementById('createFunction');
		if (show) {
			formDiv.style.display = 'flex'; 			
		} else {
			formDiv.style.display = 'none';
		}
	}
	
	function createFunctionVariableExist(name) {
		const variableModels = workspace.getAllVariables();
		for (const variableModel of variableModels) {
			if (variableModel.name.toLowerCase() === "arg_" + name.toLowerCase()) {
				return true;
			}
		}
		return false;
	}	

	function hasDuplicateNull(dataArray) {
		const variableModels = workspace.getAllVariables();
		const variableNames = variableModels.map(variableModel => variableModel.name);
	
		if (Array.isArray(dataArray)) {
			for (var i = 0; i < dataArray.length - 1; i++) {
				for (var j = i + 1; j < dataArray.length; j++) {
					if (dataArray[i][0] === dataArray[j][0]&&dataArray[i][1]!="label"&&dataArray[j][1]!="label") {
						return Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"];
					}
				}
			}
		}
		if (Array.isArray(dataArray)) {
			for (var i = 0; i < dataArray.length - 1; i++) {
				if (dataArray[i][0].trim() == "") {
					return Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_NULL_SCRATCH"];
				} 
				else if (variableNames.includes("arg_"+dataArray[i][0])&&dataArray[i][1]!="label") {
					return Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"];
				}
			}
		}
		return "";
	}	
	
    document.getElementById('confirmButton').addEventListener('click', () => {
		var functionBlocks = workspace.getBlocksByType("javascript_procedures_defnoreturn_scratch");
		for (var i=0;i<functionBlocks.length;i++) {
			if (functionBlocks[i].getFieldValue("NAME")==createFunctionVariable[0]) {
				alert(Blockly.Msg["JAVASCRIPT_CREATE_FUNCTION_EXIST_SCRATCH"]);
				return;
			}
		}
		
		var message = hasDuplicateNull(createFunctionVariable[1]);
		if (message) {
			alert(message);
			return;
		}		
		
        toggleCreateFunctionForm(false);
		
		var xml = '<xml xmlns="https://developers.google.com/blockly/xml">\n'+
				  '<variables>\n';
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][0].trim()!=""&&createFunctionVariable[1][i][1]!="label")
				xml += '<variable type="'+createFunctionVariable[1][i][1]+'" id="'+createFunctionVariable[1][i][2]+'">'+"arg_"+createFunctionVariable[1][i][0]+'</variable>\n';
		}
		xml += '</variables>\n'+
		'<block type="javascript_procedures_defnoreturn_scratch">\n'+
		'<mutation>\n';
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][0].trim()!=""&&createFunctionVariable[1][i][1]!="label")
				xml += '<arg name="'+"arg_"+createFunctionVariable[1][i][0]+'" varid="'+createFunctionVariable[1][i][2]+'" type="'+createFunctionVariable[1][i][1]+'"></arg>\n';
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
		
		Blockly.Events.disable();
		try {
			var domBlock = Blockly.utils.xml.textToDom(xml);
			var topBlocks = Blockly.Xml.domToWorkspace(domBlock, workspace);		
			var block = workspace.getBlockById(topBlocks[0]);
			var blockToCenterXY = getBlockToCenterXY(block);
			block.moveBy(blockToCenterXY.x, blockToCenterXY.y);
			
			workspace.getToolbox().refreshSelection();
			workspace.getToolbox().clearSelection();
			
			var continuousFlyout = workspace.toolbox_.flyout_;
			if (continuousFlyout.autoClose)
				continuousFlyout.setVisible(false);				
		} finally {
			Blockly.Events.enable();
			workspace.render();
		}
    });
	
	function toggleImportQuestionForm(show) {
		const formDiv = document.getElementById('importQuestion');
		if (show) {
			formDiv.style.display = 'flex'; 			
		} else {
			formDiv.style.display = 'none';
		}
	}
	window.toggleImportQuestionForm	 = toggleImportQuestionForm;
	
    document.getElementById('button_question').addEventListener('click', () => {
		var id = document.getElementById('importQuestion_sheet_id').value;
		if (id=="") {
			document.getElementById('importQuestion_sheet_id').value = Blockly.Msg["IMPORTQUESTION_SHEET_ID"];
			document.getElementById('importQuestion_sheet_name').value = Blockly.Msg["IMPORTQUESTION_SHEET_NAME"];
		}		
			
        toggleImportQuestionForm(true);
    });

    document.getElementById('importCancelButton').addEventListener('click', () => {
        toggleImportQuestionForm(false);
    });	
	
    document.getElementById('importQuestionsButton').addEventListener('click', () => {
		document.getElementById('importQuestionsList').innerHTML = "";
		
		var sheetID = document.getElementById('importQuestion_sheet_id').value;
		var sheetName = document.getElementById('importQuestion_sheet_name').value;
		var keyword = document.getElementById('importQuestion_sheet_keyword').value;
		
		if (sheetID.indexOf("https")>=0) {
			sheetID = sheetID.match(/\/d\/([a-zA-Z0-9_-]+)/)[0];
			sheetID = sheetID.replace("/d/", "");
		}
			
		function spreadsheetsql_QueryResponse_question(res) {
			spreadsheetsql_QueryResponse(res, "question");
		}
		window.spreadsheetsql_QueryResponse_question = spreadsheetsql_QueryResponse_question;

		async function spreadsheetsql_getDataFinish_question(head_response, response) {
			spreadsheetsql_getQuestionsList('importQuestionsList', "question", true);

		};
		window.spreadsheetsql_getDataFinish_question = spreadsheetsql_getDataFinish_question;

		spreadsheetsql_settings(sheetID, sheetName, "question");
	
		if (!keyword)
			spreadsheetsql_executeSql('select *', "question");
		else
			spreadsheetsql_executeSql("select * where A like '%"+keyword+"%' or B like '%"+keyword+"%' or C like '%" +keyword+"%' or D like '%"+keyword+"%'", "question");
    });
	
    document.getElementById('cancelButton').addEventListener('click', () => {
        toggleCreateFunctionForm(false);
    });	

	function promptAndAddParam(type) {
		var message = hasDuplicateNull(createFunctionVariable[1]);
		if (message) {
			alert(message);
			return;
		}	
		
		var promptText = prompt(Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_TITLE_SCRATCH"]);
		if (promptText) {
			if (type!="label"&&createFunctionVariableExist(promptText)) {
				alert(Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"]);
				return;
			}	

			createFunctionVariableAdd(promptText, type);			
			updateParamContainer();
			createFunctionBlock();
		}			
	}

	function addParamTag(name, type, varid) {
		const tag = document.createElement('div');
		tag.className = `param-tag ${type}`;
		tag.setAttribute('data-name', name);
		tag.setAttribute('data-type', type);
		tag.setAttribute('data-varid', varid);
		tag.classList.add("draggable");

		const deleteBtn = document.createElement('span');
		deleteBtn.className = 'delete-btn';
		deleteBtn.textContent = 'x'; 
		
		deleteBtn.onclick = function(event) {
			event.stopPropagation();
			createFunctionVariableDelete(tag.getAttribute('data-varid'));
			paramContainer.removeChild(tag);
		};

		tag.textContent = name;
		tag.appendChild(deleteBtn);
		
		paramContainer.appendChild(tag);
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
	
	function createFunctionVariableDelete(varid) {
		const index = createFunctionVariable[1].findIndex(item => {
			return (item[2] === varid);
		});		
		createFunctionVariable[1].splice(index, 1);
		updateParamContainer();
		createFunctionBlock();		
	}

	function updateParamContainer() {
		paramContainer.innerHTML = "";
		var createFunctionVariableTemp = [];
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][1] != "label") {
				addParamTag(createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]);
				createFunctionVariableTemp.push([createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]]);
			}
		}
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][1] == "label") {			
				addParamTag(createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]);
				createFunctionVariableTemp.push([createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]]);
			}
		}
		createFunctionVariable[1] = createFunctionVariableTemp;
	}
	
	function showTrashCanIcon(field) {
		var subworkspace = field.sourceBlock_.workspace;
		const fieldCoords = getFieldWorkspaceCoordinates(subworkspace, field);		
		const fieldPageCoords = toPageCoordinates(subworkspace, fieldCoords);
		
		const TRASH_ICON_WIDTH = 22; 
		const TRASH_ICON_HEIGHT = 28;

		const fieldRect = field.getSvgRoot().getBoundingClientRect();
		const fieldWidth = fieldRect.width;
		
		const X_CENTERING_ADJUSTMENT = 0;
		const Y_SPACING_OFFSET = -20;		

		const finalX = fieldPageCoords.x + (fieldWidth / 2) - (TRASH_ICON_WIDTH / 2) + X_CENTERING_ADJUSTMENT;
		const finalY = fieldPageCoords.y - TRASH_ICON_HEIGHT + Y_SPACING_OFFSET;

		const trashIconElement = document.createElement("img");
		trashIconElement.id = "trashIconElement";
		trashIconElement.src = Blockly.Msg["ICON_TRASH"];
		trashIconElement.width = TRASH_ICON_WIDTH;
		trashIconElement.height = TRASH_ICON_HEIGHT;
		trashIconElement.style.position = 'absolute';
		trashIconElement.style.left = `${finalX}px`;
		trashIconElement.style.top = `${finalY}px`;
		trashIconElement.style.display = 'block';
		const createFunctionDiv = document.getElementById("createFunctionDiv");
		createFunctionDiv.appendChild(trashIconElement);
				
		const clickHandler = (event) => {
			event.stopPropagation();
			event.preventDefault();			
			trashClickHandle(field); 
		};
		trashIconElement.addEventListener('click', clickHandler);
	}
	window.showTrashCanIcon = showTrashCanIcon;
	
	function trashClickHandle(field) {
		var fieldName = field.value_;
		var fieldTpye = "";
		if (field.backgroundStyle_==1)
			fieldTpye = "NS";
		else if (field.backgroundStyle_==2)
			fieldTpye = "Boolean";
		else if (field.backgroundStyle_==0)
			fieldTpye = "label";
		const index = createFunctionVariable[1].findIndex(item => {
			return (item[0] === fieldName&&item[1] === fieldTpye);
		});
		if (index!=-1) {
			createFunctionVariableDelete(createFunctionVariable[1][index][2]);
			hideTrashCanIcon(field);
		}
	}
	
	function hideTrashCanIcon(field) {
		var trashIconElement = document.getElementById("trashIconElement");
		if (trashIconElement)
			trashIconElement.parentNode.removeChild(trashIconElement);
	}
	window.hideTrashCanIcon = hideTrashCanIcon;
	
	function getFieldWorkspaceCoordinates(subworkspace, field) {
		const fieldSvgElement = field.getSvgRoot();
		const workspaceCoords = subworkspace.getSvgXY(fieldSvgElement);
		
		if (workspaceCoords && typeof workspaceCoords.x === 'number') {
			return {
				x: workspaceCoords.x,
				y: workspaceCoords.y
			};
		}
	}
	
	function toPageCoordinates(subworkspace, workCoords) {
		const scale = subworkspace.getScale();
		
		const rootElement = subworkspace.getInjectionDiv();
		const svgRect = rootElement.getBoundingClientRect();
		
		const pageX_scaled = workCoords.x;
		const pageY_scaled = workCoords.y;

		const pageX = pageX_scaled + svgRect.left;
		const pageY = pageY_scaled + svgRect.top;

		return { x: pageX, y: pageY };
	}	
	
    var mouse_cursor = {};

    function getMousePosition(e) {
        e = e || window.event;
        mouse_cursor.pageX = e.pageX;
        mouse_cursor.pageY = e.pageY;
        mouse_cursor.offsetX = e.offsetX;
        mouse_cursor.offsetY = e.offsetY;
        mouse_cursor.clientX = e.clientX;
        mouse_cursor.clientY = e.clientY;
        mouse_cursor.screenX = e.screenX;
        mouse_cursor.screenY = e.screenY;
    }
    document.body.addEventListener('mousemove', getMousePosition, false);
	
    function getBlockToMouseXY(block) {
        var mouseClient = new Blockly.utils.Coordinate(mouse_cursor.pageX - window.scrollX, mouse_cursor.pageY - window.scrollY);
        var mousePos = Blockly.utils.svgMath.screenToWsCoordinates(workspace, mouseClient);
        var blockPos = Blockly.utils.svgMath.getRelativeXY(block.getSvgRoot());
        var blockToMouseXY = {};
        blockToMouseXY.x = mousePos.x - blockPos.x;
        blockToMouseXY.y = mousePos.y - blockPos.y;
        return blockToMouseXY;
    }
	window.getBlockToMouseXY = getBlockToMouseXY;

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
	window.getBlockToCenterXY = getBlockToCenterXY;

	function initialMoveDiv() {
		const container = document.getElementById('paramListContainer');
		// 確保這些變數在外部作用域被定義 (例如在 document.addEventListener('DOMContentLoaded', ...) 內部)
		let draggedElement = null; 
		let offsetX = 0;           // 滑鼠點擊點與元素左邊緣的偏移量
		let offsetY = 0;           // 滑鼠點擊點與元素上邊緣的偏移量

		const handleMouseDown = (e) => {
			// 確保只對 .draggable 元素響應，且不是刪除按鈕
			if (!e.target.classList.contains('draggable') || e.target.classList.contains('delete-btn')) {
				return;
			}

			draggedElement = e.target;
			
			// 1. 獲取元素在文檔流中的當前位置 (相對於視口)
			const rect = draggedElement.getBoundingClientRect();
			
			// 2. 計算滑鼠點擊位置和元素左上角位置的【偏移量】
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;

			// 將元素設定為 dragging 狀態 (這會將其 position 設為 absolute)
			document.body.classList.add('no-select');
			draggedElement.classList.add('dragging');
			
			// 3. 設定元素的初始絕對定位位置 (非常重要！)
			// 必須先將 position 設為 absolute 才能透過 style.left/top 定位。
			// 在這一步，元素應該看起來完全沒有移動。
			draggedElement.style.left = rect.left + 'px';
			draggedElement.style.top = rect.top + 'px';
			
			// 註冊 document 上的移動和釋放事件
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			// 阻止瀏覽器默認的拖曳行為 (例如圖片拖曳)
			e.preventDefault(); 
		};
		
		
		/**
		 * 處理滑鼠移動事件 (拖曳中)
		 * @param {MouseEvent} e - 滑鼠事件對象
				 */
		const handleMouseMove = (e) => {
			if (!draggedElement) return;

			// 根據滑鼠當前位置 減去 偏移量，計算元素的新位置
			const newX = e.clientX - offsetX; // <-- 使用了 offsetX
			const newY = e.clientY - offsetY; // <-- 使用了 offsetY

			// 更新元素的位置
			draggedElement.style.left = newX + 'px';
			draggedElement.style.top = newY + 'px';
		};

		/**
		 * 處理滑鼠釋放事件 (拖曳結束)
		 * @param {MouseEvent} e - 滑鼠事件對象
		 */
		const handleMouseUp = (e) => {
			if (!draggedElement) return;

			// 移除 document 上的事件監聽器
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			
			document.body.classList.remove('no-select');
			
			// 獲取所有 div 元素
			const allElements = Array.from(container.children).filter(el => el.classList.contains('draggable'));
			const currentIndex = allElements.indexOf(draggedElement);
			
			if (currentIndex === -1) {
				 // 發生錯誤，重置樣式並退出
				resetDraggedElement();
				return;
			}

			// 被拖曳元素的中心 X 坐標
			const draggedRect = draggedElement.getBoundingClientRect();
			const draggedCenterX = draggedRect.left + draggedRect.width / 2;
			
			let targetElement = null;

			// 1. 檢查右邊的元素 (如果存在)
			const nextIndex = currentIndex + 1;
			if (nextIndex < allElements.length) {
				const nextElement = allElements[nextIndex];
				const nextRect = nextElement.getBoundingClientRect();
				// 如果被拖曳元素的中心點越過了右邊元素的左邊緣
				if (draggedCenterX > nextRect.left + nextRect.width / 2) {
					targetElement = nextElement;
				}
			}

			// 2. 檢查左邊的元素 (如果還沒有找到目標，並且左邊元素存在)
			if (!targetElement) {
				const prevIndex = currentIndex - 1;
				if (prevIndex >= 0) {
					const prevElement = allElements[prevIndex];
					const prevRect = prevElement.getBoundingClientRect();
					// 如果被拖曳元素的中心點越過了左邊元素的右邊緣
					if (draggedCenterX < prevRect.left + prevRect.width / 2) {
						 targetElement = prevElement;
					}
				}
			}
			
			// 執行交換
			if (targetElement) {
				swapElements(draggedElement, targetElement);
			}
			
			// 重置被拖曳元素的樣式和狀態
			resetDraggedElement();
			
			updateVariablesList();
		};
		
		/**
		 * 交換兩個 DOM 元素的位置
		 * @param {HTMLElement} node1 - 元素 A
		 * @param {HTMLElement} node2 - 元素 B
		 */
		const swapElements = (node1, node2) => {
			// node1 (被拖曳的) 和 node2 (目標) 必須在同一個父元素內
			const parent = node1.parentNode;
			
			// 判斷 node1 在 node2 的前面還是後面
			if (Array.from(parent.children).indexOf(node1) < Array.from(parent.children).indexOf(node2)) {
				// node1 在 node2 前面: 將 node2 插入到 node1 的前面，然後將 node1 插入到 node2 的新位置 (即 node2 的下一個元素)
				parent.insertBefore(node2, node1);
				parent.insertBefore(node1, node2.nextSibling);
			} else {
				// node1 在 node2 後面: 將 node1 插入到 node2 的前面，然後將 node2 插入到 node1 的新位置 (即 node1 的下一個元素)
				parent.insertBefore(node1, node2);
				parent.insertBefore(node2, node1.nextSibling);
			}
		};
		
		/**
		 * 重置被拖曳元素的樣式
		 */
		const resetDraggedElement = () => {
			 if (draggedElement) {
				draggedElement.classList.remove('dragging');
				draggedElement.style.position = ''; // 移除 position 屬性，回歸到 CSS 的設定 (relative)
				draggedElement.style.left = '';     // 清除絕對定位的坐標
				draggedElement.style.top = '';
				draggedElement.style.zIndex = '';
				draggedElement = null;              // 清空當前被拖曳元素
				offsetX = 0;
				offsetY = 0;
			}
		};

		container.addEventListener('mousedown', handleMouseDown);
	}

	function updateVariablesList() {
		const container = document.getElementById('paramListContainer');
		
		if (!container) {
			return [];
		}

		const divElements = container.querySelectorAll('div');
		
		var createFunctionVariable1 = ["", []];
		Array.from(divElements).map(div => {
			createFunctionVariable1[0] = createFunctionVariable[0];
			for (var i=0;i<createFunctionVariable[1].length;i++) {
				if (createFunctionVariable[1][i][0]==div.getAttribute('data-name')&&createFunctionVariable[1][i][1]==div.getAttribute('data-type')) {
					createFunctionVariable1[1].push([createFunctionVariable[1][i][0],createFunctionVariable[1][i][1],createFunctionVariable[1][i][2]]);
					break;
				}
			} 
		});
		createFunctionVariable = createFunctionVariable1;
		updateParamContainer();
		createFunctionBlock();
	}

	document.getElementById('createFunction_blockName_input').addEventListener('input', () => {
        createFunctionVariable[0] = document.getElementById('createFunction_blockName_input').value;
		createFunctionBlock();
    });	
	
    document.getElementById('createFunction_add_ns').addEventListener('click', () => {
        promptAndAddParam('NS');
    });
	
	document.getElementById('createFunction_add_b').addEventListener('click', () => {
        promptAndAddParam('Boolean');
    });	
	
    document.getElementById('createFunction_add_l').addEventListener('click', () => {
        promptAndAddParam('label');
    });
		
	setTimeout(function(){
		loadToolbox('geras', catSystem, 1.0);
		//scratchStyle = true;
		//loadToolbox('zelos', catSystemScratch, 0.8);
		updateMsg();
		newFile();
	}, 1000);

	function addScript(url) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = location.href.substr(0, location.href.lastIndexOf("/"))+"/"+url;
		$("body").append(s);
	}

	function checkCategoryExist(child) {
		for (var i=1;i<customCategory.length;i++) {
			if (child==customCategory[i][2])
				customCategory.splice(i, 1);
		}
	}	
		
	$(function() {
		$( "#javascript_content" ).draggable();
		$( "#javascript_content" ).resizable();
		$( "#run_content" ).draggable();
		$( "#run_content" ).resizable();		
	});	
	
	function newFile() {
		workspace.clear(true);
		var xmlDoc = Blockly.utils.xml.textToDom('<xml></xml>');
		Blockly.Xml.domToWorkspace(xmlDoc, workspace);
		workspace.scrollCenter();
		
		xmlBlockly = "";	
		xmlScratch = "";
		
		resetOutput();
		
		//Blockly.getMainWorkspace().clearUndo();
	}
	
	function iframeWrite(iframe_id, iframe_code) {
		var iframe = document.getElementById(iframe_id);
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(iframe_code);
		iframe.contentWindow.document.close();
		iframe.focus();
	}
	
	function resetOutput() {
		iframeWrite("iframe_output", "");
	}
	
	document.getElementById('button_code').onclick = function () {
		var div = document.getElementById('javascript_content');
		if (div.style.display == "none") {
			div.style.display = "block";
		}
		else {
			div.style.display = "none";
		}
	}
	
	document.getElementById('button_reset').onclick = function () {
		var result = confirm(Blockly.Msg.BUTTON_RESET);
		if (result) {
			newFile();
		}
	}

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
	var gemini_model = "gemini-2.5-flash-lite";
	
	gemini_chat_initial(CryptoJS.AES.decrypt(GeminiKey, 'test').toString(CryptoJS.enc.Utf8), gemini_model, 10000, 0, Blockly.Msg["GEMINI_ROLE"]);

	async function gemini_chat_response(gemini_chat_data) {
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		iframeDocument.body.insertAdjacentHTML("beforeend", "<br>"+gemini_chat_response_br(gemini_chat_data.replace(/\*\*/g,""), 'br'));
		if (GeminiKey==Blockly.Msg["GEMINI_KEY"]&&gemini_chat_data.toLowerCase().indexOf("quota")!=-1&&gemini_chat_data.toLowerCase().indexOf("exceeded")!=-1) {
			document.getElementById('button_key').click();
		}
		//iframeDocument.body.scrollTop = iframeDocument.body.scrollHeight;
		//iframeDocument.documentElement.scrollTop = iframeDocument.documentElement.scrollHeight;
	}
	window.gemini_chat_response = gemini_chat_response;
		
	document.getElementById('button_key').onclick = async function () {
		var key = prompt(Blockly.Msg["GEMINI_KEY_INPUT"]);
		if (key) {
			GeminiKey = key;
			gemini_chat_initial(key, gemini_model, 10000, 0, Blockly.Msg["GEMINI_ROLE"]);
			
			iframeWrite("iframe_output", "");			
			await gemini_chat_run("?");
		}
	}
	
	document.getElementById('gemini_ask').onclick = async function () {
		//if (!document.getElementById("question_input").value.trim()) return;
		iframeWrite("iframe_output", "");
		
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
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
			iframeWrite("iframe_output", "");
		}
	}
	
	if (!navigator.onLine) {
		document.getElementById('gemini_ask').style.display = "none";
		document.getElementById('gemini_clear').style.display = "none";
	}
	
	function runCode() {
	  document.getElementById('javascript_content').style.display = "block";
		
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
	  
	  iframe_code += "\<\/head\>\<body\>\<script\>"+js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{"+code+"window.frameElement.title = 'ok';}main();")+"\<\/script\>\<\/body\>\<\/html\>";
	  
	  
	  try {
			let container = document.getElementById('iframeContainer');
			if (container) {
				container.parentNode.removeChild(container);
			}
			container = document.createElement('div');
			container.id = 'iframeContainer';
			document.body.appendChild(container);			
		
			const iframe = document.createElement("iframe");
			iframe.id = "iframe_0";
			iframe.style.width = "0";
			iframe.style.height = "0";
			iframe.style.border = "none";
			
			container.appendChild(iframe);

			iframe.onload = async function() {
			  iframe.onload = null;
			  
			  const checkFinish = async () => {
				const body = iframe.contentWindow.document.body;
				if (!body) return;

				if (iframe.title=="ok") {
				  const bodyContent = body.innerText;
				  var output = bodyContent.replace(/ /g,"&nbsp;").replace(/\n/g, "<br>");
				  iframeWrite("iframe_output", output);
				  if (container) container.remove();
				} else {
				  setTimeout(checkFinish, 100);
				}
			  };

			  checkFinish();
			};	

			
			try {
				iframeWrite(iframe.id, iframe_code);				
			} catch (e) {
				console.log(e);
			}				
	  } catch (e) {
		console.log(e);
	  }
	}
	
	/*
		Program Validation Function Description:

		Question: Input the dividend and the divisor, output the quotient.

		Test Data Format: 1st input value; 2nd input value; Correct validation value
		(Semicolon ";" separates numbers or strings, followed by the correct value for validation)

		Window input: 12;4;3 → Automatically input 12 and 4, compare whether the output value equals the validation value 3
	*/
	document.getElementById('button_test').onclick = function () {
		document.getElementById('javascript_content').style.display = "block";
		
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
	  
		var blocks = workspace.getBlocksByType("javascript_data_output");
		var blocks_scratch = workspace.getBlocksByType("javascript_data_output_scratch");
		if (blocks.length!=1&&blocks_scratch.length!=1) {
			alert(Blockly.Msg["TEST_CODE_CHECK"]);
			return;
		}

		var question_input = document.getElementById("question_input").value;
		const jsonRegex = /\{[\s\S]*?\}/;
		const match = question_input.match(jsonRegex);
		var inputArray = [];
		if (match) {
			try {
				var jsonObject = JSON.parse(match[0]);
				inputArray = jsonObject.data;
			} catch (e) {
				console.error("JSON Parsing Error:", e);
				alert(Blockly.Msg["TEST_DATA_JSON_ERROR"]);
				return;
			}
		} else {
			inputArray.push(prompt(Blockly.Msg["TEST_CODE_MESSAGE"]));
		}	  

		if (inputArray.length>0) {
			runMultipleIframeTests(inputArray);
		}
	}
	
	function runMultipleIframeTests(inputArray, containerId = 'iframeContainer') {
		if (inputArray.length === 0) return;

		let outputResult = "";
		let completedCount = 0;
		const totalTests = inputArray.length;

		let container = document.getElementById(containerId);
		if (container) {
			container.parentNode.removeChild(container);
		}
		container = document.createElement('div');
		container.id = containerId;
		document.body.appendChild(container);		

		inputArray.forEach((testCode, index) => {
			const iframe = document.createElement("iframe");
			iframe.id = "iframe_" + index;
			iframe.style.width = "0";
			iframe.style.height = "0";
			iframe.style.border = "none";
			
			container.appendChild(iframe);

			iframe.onload = async function() {
			  iframe.onload = null;
			  
			  const checkFinish = async () => {
				const body = iframe.contentWindow.document.body;
				if (!body) return;

				if (iframe.title=="ok") {
				  const bodyContent = body.innerText;
				  outputResult += "[ "+ (completedCount+1)+" ]\n\n"+bodyContent + "\n\n";
				  completedCount++;
				  if (completedCount === totalTests) {
					var output = outputResult.replace(/ /g,"&nbsp;").replace(/\n/g, "<br>");
					iframeWrite("iframe_output", output);
					if (container) container.remove();
				  }
				} else {
				  setTimeout(checkFinish, 100);
				}
			  };

			  checkFinish();
			};

			runTest(iframe, testCode);
		});
	}	

	function runTest(iframe, input) {
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
			'    input = input;\n'+
			'  document.body.insertAdjacentHTML("beforeend", (msg?(msg+"："):"")+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+
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
			'  document.body.insertAdjacentHTML("beforeend", (msg?(msg+"："):"")+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+		
			'  return input;\n'+
			'}';
		}

		code += ''+
			'function data_output_test (input, msg, text) {\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+			
			'  var arr = input.split(";");\n'+			
			'  document.body.insertAdjacentHTML("beforeend", (msg?(msg+"："):"")+String(text).replace(/ /g,"&nbsp;")+"<br>");\n'+	
			'  if (text==arr[arr.length-1])\n'+
			'    document.body.insertAdjacentHTML("beforeend", "<BR>"+"'+Blockly.Msg["TEST_CODE_CORRECT"]+'".replace("%1", arr[arr.length-1]));\n'+
			'  else\n'+
			'    document.body.insertAdjacentHTML("beforeend", "<BR>"+"'+Blockly.Msg["TEST_CODE_ERROR"]+'".replace("%1", arr[arr.length-1]));\n'+			
			'}';		

		var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";

		iframe_code += "\<\/head\>\<body\>\<script\>"+js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{"+code+"window.frameElement.title = 'ok';}main();")+"\<\/script\>\<\/body\>\<\/html\>";

		output_result = "";

		try {
			iframeWrite(iframe.id, iframe_code);				
		} catch (e) {
			console.log(e);
		}
	}
	
	function stopCode() {
	  document.getElementById("iframe_output").src = "about:blank";
	}		
	
	document.getElementById('button_run').onclick = function () {
		document.getElementById('iframe_output').innerHTML = "";
		stopCode();
		setTimeout(function(){
			runCode();
		}, 100);	
	}	
	
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
	
	document.getElementById('button_copycode').onclick = function () {
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		navigator.clipboard.writeText(iframeDocument.body.innerText.trim()).then(function() {
			alert(Blockly.Msg.COPY_CLIPBOARD);
		}, function(err) {
			console.error(err);
		});
	}
	
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
						
						workspace.clear(true);
						Blockly.Xml.domToWorkspace(blocks, workspace);
						
						workspace.getToolbox().refreshSelection();
						workspace.getToolbox().clearSelection();
						
						workspace.scrollCenter();
						
						workspace.render();
					
						document.getElementById('javascript_content').style.display = "none";
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
	
	document.getElementById('lang-selector').onchange = function () {
		if (this.selectedIndex>0) 
			location.href = "?lang=" + this.options[this.selectedIndex].value;
	}
});	

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

function javascriptCode() {
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	code = js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{"+code+"}main();");
	document.getElementById('code_content').innerHTML = code.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/ /g,"&nbsp;");
}

function xmlCode() {
	var xml = Blockly.Xml.workspaceToDom(workspace, true);
	var code = Blockly.Xml.domToPrettyText(xml);
	document.getElementById('xml_content').innerHTML = code.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/ /g,"&nbsp;");
}

var contents = ['javascript_content'];
function textareaFocus(id) {
	for (var i in contents) {
		const content = document.getElementById(contents[i]);
		content.style.zIndex = (contents[i]==id)?"99":"98";
	}
}

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
			filePath = './package.nw/index.html'
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
