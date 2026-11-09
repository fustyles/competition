/*
@license
Copyright 2026 Taiwan (ChungYi Fu)

@author https://www.facebook.com/francefu/
@Update 19/10/2026 00:00 (Taiwan Standard Time)
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
var workspaceChangeTimer;
var blockChangeTimer;
var createFunctionVariable = ["", []];
var GeminiKey = Blockly.Msg["GEMINI_KEY"];

document.addEventListener('DOMContentLoaded', function() {

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
			registerContinuoutToolboxCustomFlyout();
			
			workspace = Blockly.inject('root',{
					renderer: 'zelos'
					,theme: 'zelos'				
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
		
		function onWorkspaceChanged(event) {
			const targetWorkspace = Blockly.getMainWorkspace();
			
			if (event.type === Blockly.Events.BLOCK_DELETE) {
				handleBlockDelete(event);
			}
			
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
		
			if (event.type === Blockly.Events.MOVE || event.type === Blockly.Events.BLOCK_DRAG) {
					clearTimeout(blockChangeTimer);
					blockChangeTimer = setTimeout(function(){
						let eventBlock = targetWorkspace.getBlockById(event.blockId);
						if (eventBlock){
							eventBlock.bringToFront();
							var blocks = [
							  ...this.workspace.getBlocksByType("javascript_variable_ns_scratch"),
							  ...this.workspace.getBlocksByType("javascript_variable_boolean_scratch")
							];
							blocks.forEach(block => {
								if (block)
									checkArgVariableRootBlock(block);
							});
						}
					}, 1000);
			} else if (event.type==Blockly.Events.CREATE) {
				let eventBlock = targetWorkspace.getBlockById(event.blockId);
				if (eventBlock) {
					if (eventBlock.type == "procedures_defnoreturn" || eventBlock.type == "procedures_defreturn") {
						targetWorkspace.getToolbox().refreshSelection();
					}
				}
			} else if (event.type==Blockly.Events.DELETE) {
				if (event.oldJson.type == "procedures_defnoreturn" || event.oldJson.type == "procedures_defreturn") {
					targetWorkspace.getToolbox().refreshSelection();
				}
			}			
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
							workspace.deleteVariableById(args[i].getAttribute('varid'));
							
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
		
		function checkArgVariableRootBlock(block) {
			const topBlock = block.getRootBlock(true);
			if (topBlock) {
				block.bringToFront();
				if (topBlock.type == 'javascript_procedures_defnoreturn_scratch') {
					let argNames = topBlock.arguments_||[];
					for (let i = 0; i < argNames.length; i++) {
						if (argNames[i]=="arg_"+block.getFieldValue("variableName")) {
							block.setWarningText(null);
							return;
						}
					}
				}
				/*
				if (topBlock.type !== 'javascript_procedures_defnoreturn_scratch') {
					try {
						const outputConn = block.outputConnection;
						if (outputConn && outputConn.targetConnection) {
						  const parentConn = outputConn.targetConnection;
						  parentConn.disconnect();
						}
					} finally {
						block.bringToFront();
					}
				}
				*/
			}
			block.setWarningText(Blockly.Msg["JAVASCRIPT_CONNECT_MESSAGE_SCRATCH"]);
		}		
		


		handleFlyoutDoubleClick();
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
	
	function handleFlyoutDoubleClick(){
		var blocklyWorkspace = document.getElementsByClassName("blocklyFlyout");
		for (var f=0;f<blocklyWorkspace.length;f++) {
			blocklyWorkspace[f].addEventListener('dblclick', function(){ 
				Blockly.hideChaff();
			});
		}
	}
	
	function registerContinuoutToolboxCustomFlyout() {
		registerMyVariable();
		registerMyLists();
		registerMyFunction();
		
		Blockly.Flyout.prototype.getDynamicCategoryContents = function(a){
			this.workspace_.targetWorkspace.toolboxCategoryCallbacks.set('MYVARIABLE' ,Blockly.myvariable.flyoutCategory);
			this.workspace_.targetWorkspace.toolboxCategoryCallbacks.set('MYLIST' ,Blockly.mylist.flyoutCategory);
			this.workspace_.targetWorkspace.toolboxCategoryCallbacks.set('MYFUNCTION' ,Blockly.myfunction.flyoutCategory);		

			a=this.workspace_.targetWorkspace.getToolboxCategoryCallback(a);
			if("function"!==typeof a) {
				throw TypeError("Couldn't find a callback function when opening a toolbox category.");
				return null;
			} else
				return a(this.workspace_.targetWorkspace)
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
				
                if (subWorkspace)
                    subWorkspace.dispose();
				
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
					if (event.type == "viewport_change"||event.type == "create") {
						var blocks = subWorkspace.getAllBlocks();
						if (blocks.length==1)
							subWorkspace.centerOnBlock(blocks[0].id);
					} else if (event.type == "block_field_intermediate_change") {
						if (event.blockId) {
							var block = subWorkspace.getBlockById(event.blockId);
							createFunctionVariable[0] = block.getFieldValue("NAME");
						}
					}
				});
				
				createFunctionVariable = ["", []];
				createFunctionVariable[0] = Blockly.Msg["JAVASCRIPT_CREATE_BLOCKNAME_INPUT"];
				paramContainer.innerHTML = "";
				createFunctionBlock();
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
			var xml = '<block type="javascript_createfunction_scratch"><field name="NAME">'+createFunctionVariable[0]+'</field></block>';
			var singleBlock = Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(xml), subWorkspace);

			for (var i=0;i<createFunctionVariable[1].length;i++) {
				addBlockToInput(singleBlock, "INPUT_"+createFunctionVariable[1][i][0], createFunctionVariable[1][i]);
			}
		}
	}

	function addBlockToInput(block, inputName, fieldValue) {
		let customField;
		if (fieldValue[1]=="NS") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#FF8C1A',
				shapeType: 1
			});
		}
		else if (fieldValue[1]=="Boolean") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#4C97FF',
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
					//return Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"];
				}
			}
		}
		return "";
	}	
	
    document.getElementById('confirmButton').addEventListener('click', () => {
		createFunctionVariable[0] = subWorkspace.getBlocksByType("javascript_createfunction_scratch")[0].getFieldValue("NAME");
		
		var functionBlocks = workspace.getBlocksByType("javascript_procedures_defnoreturn_scratch");
		for (var i=0;i<functionBlocks.length;i++) {
			if (functionBlocks[i].getFieldValue("NAME")==createFunctionVariable[0]) {
				alert(Blockly.Msg["JAVASCRIPT_CREATE_FUNCTION_EXIST_SCRATCH"]);
				//return;
			}
		}
		
		var message = hasDuplicateNull(createFunctionVariable[1]);
		if (message) {
			alert(message);
			return;
		}
		
        toggleCreateFunctionForm(false);
		
		var xml = '<block type="javascript_procedures_defnoreturn_scratch">\n'+
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
		'</block>';
		
		var domBlock = Blockly.utils.xml.textToDom(xml);
		var block = Blockly.Xml.domToBlock(domBlock, workspace);
			
		Blockly.Events.disable();
		try {
			workspace.getToolbox().refreshSelection();
			workspace.getToolbox().clearSelection();
		} catch (e) {
			console.error(e);
		} finally {
			Blockly.Events.enable();
			workspace.render();
			document.getElementById('javascript_content').style.display = "none";
		}
    });
	
    document.getElementById('cancelButton').addEventListener('click', () => {
        toggleCreateFunctionForm(false);
		
		workspace.getToolbox().clearSelection();
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
        toggleImportQuestionForm(true);
        fillExamSelect();
    });

    document.getElementById('importCancelButton').addEventListener('click', () => {
        toggleImportQuestionForm(false);
    });	
    
    document.getElementById('button_page').addEventListener('click', () => {
		window.location.href = "../";
    }); 
    
	function toggleConsoleForm(show) {
		const formDiv = document.getElementById('consoleLog');
		if (show) {
			formDiv.style.display = 'flex'; 

            var metrics = Blockly.getMainWorkspace().getMetrics();
            formDiv.style.left = (metrics.toolboxWidth + 100) + 'px';
            formDiv.style.top = (metrics.viewHeight - 280) + 'px';
            formDiv.style.width = '200px';
            formDiv.style.height = '300px';
            
            var div = document.getElementById('console_output');
            div.innerHTML = '';

		} else {
			formDiv.style.display = 'none';
		}
	}
	window.toggleConsoleForm = toggleConsoleForm;

    document.getElementById('consoleCancelButton').addEventListener('click', () => {
        toggleConsoleForm(false);
    });	
    
    var box = document.getElementById('consoleLog');
    var header = document.getElementById('console_header');
    var offsetX = 0, offsetY = 0, dragging = false;

    header.addEventListener('pointerdown', function (e) {
        // 點到 × 按鈕時不拖曳
        if (e.target.closest('#consoleCancelButton')) return;

        var rect = box.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // 從 right/bottom 定位改成 left/top，方便移動
        box.style.left = rect.left + 'px';
        box.style.top = rect.top + 'px';
        box.style.right = 'auto';
        box.style.bottom = 'auto';

        dragging = true;
        header.setPointerCapture(e.pointerId);   // 滑鼠經過 iframe 時也不會中斷
        e.preventDefault();
    });

    header.addEventListener('pointermove', function (e) {
        if (!dragging) return;

        // 限制在可視範圍內
        var maxX = window.innerWidth - box.offsetWidth;
        var maxY = window.innerHeight - box.offsetHeight;
        var x = Math.min(Math.max(0, e.clientX - offsetX), maxX);
        var y = Math.min(Math.max(0, e.clientY - offsetY), maxY);

        box.style.left = x + 'px';
        box.style.top = y + 'px';
    });

    function stopDrag(e) {
        if (!dragging) return;
        dragging = false;
        header.releasePointerCapture(e.pointerId);
    }
    header.addEventListener('pointerup', stopDrag);
    header.addEventListener('pointercancel', stopDrag);        

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
		createFunctionVariable[1].push([name, type, Blockly.utils.idGenerator.genUid()]);		
	}
	
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
		if (field.name == "NAME") return;

		var subworkspace = field.sourceBlock_.workspace;
		const fieldCoords = getFieldWorkspaceCoordinates(subworkspace, field);		
		const fieldPageCoords = toPageCoordinates(subworkspace, fieldCoords);
		
		const ICON_WIDTH = 22; 
		const ICON_HEIGHT = 28;

		const fieldRect = field.getSvgRoot().getBoundingClientRect();
		const fieldWidth = fieldRect.width;
		
		const X_CENTERING_ADJUSTMENT = 0;
		const Y_SPACING_OFFSET = -20;		

		const finalX = fieldPageCoords.x + (fieldWidth / 2) - (ICON_WIDTH / 2) + X_CENTERING_ADJUSTMENT;
		const finalY = fieldPageCoords.y - ICON_HEIGHT + Y_SPACING_OFFSET;

		const createFunctionDiv = document.getElementById("createFunctionDiv");
		
		const trashIconElement = document.createElement("img");
		trashIconElement.id = "trashIconElement";
		trashIconElement.src = Blockly.Msg["ICON_TRASH"];
		trashIconElement.width = ICON_WIDTH;
		trashIconElement.height = ICON_HEIGHT;
		trashIconElement.style.position = 'absolute';
		trashIconElement.style.left = `${finalX}px`;
		trashIconElement.style.top = `${finalY}px`;
		trashIconElement.style.display = 'block';
		
		createFunctionDiv.appendChild(trashIconElement);
		const trashClickHandler = (event) => {
			event.stopPropagation();
			event.preventDefault();			
			trashClickHandle(field); 
		};
		trashIconElement.addEventListener('click', trashClickHandler);
		
		const leftIconElement = document.createElement("img");
		leftIconElement.id = "leftIconElement";
		leftIconElement.src = Blockly.Msg["ICON_LEFT"];
		leftIconElement.width = ICON_WIDTH;
		leftIconElement.height = ICON_HEIGHT;
		leftIconElement.style.position = 'absolute';
		leftIconElement.style.left = `${finalX-ICON_WIDTH*2}px`;
		leftIconElement.style.top = `${finalY}px`;
		leftIconElement.style.display = 'block';
		
		createFunctionDiv.appendChild(leftIconElement);
		const leftClickHandler = (event) => {
			event.stopPropagation();
			event.preventDefault();			
			leftClickHandle(field); 
		};
		leftIconElement.addEventListener('click', leftClickHandler);

		const rightIconElement = document.createElement("img");
		rightIconElement.id = "rightIconElement";
		rightIconElement.src = Blockly.Msg["ICON_RIGHT"];
		rightIconElement.width = ICON_WIDTH;
		rightIconElement.height = ICON_HEIGHT;
		rightIconElement.style.position = 'absolute';
		rightIconElement.style.left = `${finalX+ICON_WIDTH*2}px`;
		rightIconElement.style.top = `${finalY}px`;
		rightIconElement.style.display = 'block';
		
		createFunctionDiv.appendChild(rightIconElement);
		const rightClickHandler = (event) => {
			event.stopPropagation();
			event.preventDefault();			
			rightClickHandle(field); 
		};
		rightIconElement.addEventListener('click', rightClickHandler);		
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
	
	function leftClickHandle(field) {
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
			if (createFunctionVariable[1][index-1]) {
				var exchangeItem = createFunctionVariable[1][index];
				createFunctionVariable[1][index] = createFunctionVariable[1][index-1];
				createFunctionVariable[1][index-1] = exchangeItem;
				
				updateParamContainer();
				createFunctionBlock();				
			}
		}
	}

	function rightClickHandle(field) {
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
			if (createFunctionVariable[1][index+1]) {
				var exchangeItem = createFunctionVariable[1][index];
				createFunctionVariable[1][index] = createFunctionVariable[1][index+1];
				createFunctionVariable[1][index+1] = exchangeItem;
				
				updateParamContainer();
				createFunctionBlock();				
			}
		}
	}	
	
	function hideTrashCanIcon(field) {
		var trashIconElement = document.getElementById("trashIconElement");
		if (trashIconElement)
			trashIconElement.parentNode.removeChild(trashIconElement);
		var leftIconElement = document.getElementById("leftIconElement");
		if (leftIconElement)
			leftIconElement.parentNode.removeChild(leftIconElement);
		var rightIconElement = document.getElementById("rightIconElement");
		if (rightIconElement)
			rightIconElement.parentNode.removeChild(rightIconElement);		
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
		loadToolbox('geras', catSystem, 0.9);
		//scratchStyle = true;
		//loadToolbox('zelos', catSystemScratch, 0.9);
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
        $( "#javascript_content" ).draggable({
            handle: "#javascript_title",
            cancel: "a, i, button, input, textarea, select"
        });
        $( "#javascript_content" ).resizable({
            containment: "#main",          // 不能拉超過主畫面
            minWidth: 250,
            minHeight: 150
        });
        $( "#run_content" ).draggable();
        $( "#run_content" ).resizable();
        initQuestionSplitter();
    });

	// 試題欄位與執行結果欄位之間的分隔條：上下拖曳調整兩區高度，雙擊還原 60% / 35%
	function initQuestionSplitter() {
		var splitter = document.getElementById('question_splitter');
		var codeDiv  = document.getElementById('javascript_code');
		var topEl    = document.getElementById('question_input');
		var bottomEl = document.getElementById('iframe_output');
		if (!splitter || !codeDiv || !topEl || !bottomEl) return;

		var MIN = 40;   // 每一區最少保留的高度 (px)
		var startY, startTop, total;
		var shield = null;   // 拖曳時暫時覆蓋畫面的透明遮罩

		splitter.addEventListener('pointerdown', function (e) {
			if (e.button !== 0) return;
			e.preventDefault();
			startY   = e.clientY;
			startTop = topEl.offsetHeight;
			total    = topEl.offsetHeight + bottomEl.offsetHeight;   // 兩區總高度維持不變
			splitter.setPointerCapture(e.pointerId);
			codeDiv.classList.add('splitting');
			// 拖曳中用透明遮罩蓋住 iframe，避免游標滑進輸出區時事件被 iframe 吃掉。
			// 注意：不可直接切換 iframe 的 pointer-events，Chrome 在拖曳結束後會讓 iframe 收不到滑鼠滾輪。
			if (!shield) {
				shield = document.createElement('div');
				shield.style.cssText = 'position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:2147483647;cursor:row-resize;background:transparent;';
			}
			document.body.appendChild(shield);
		});

		splitter.addEventListener('pointermove', function (e) {
			if (!splitter.hasPointerCapture(e.pointerId)) return;
			var newTop = Math.max(MIN, Math.min(total - MIN, startTop + (e.clientY - startY)));
			// 百分比是以內容區高度計算，需扣掉上下 padding（底部預留給縮放把手的空間）
			var cs = getComputedStyle(codeDiv);
			var h = codeDiv.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
			// 用百分比設定，之後縮放整個視窗時兩區仍維持比例
			topEl.style.height    = (newTop / h * 100) + '%';
			bottomEl.style.height = ((total - newTop) / h * 100) + '%';
		});

		function endDrag(e) {
			if (splitter.hasPointerCapture(e.pointerId)) splitter.releasePointerCapture(e.pointerId);
			codeDiv.classList.remove('splitting');
			if (shield && shield.parentNode) shield.parentNode.removeChild(shield);
		}
		splitter.addEventListener('pointerup', endDrag);
		splitter.addEventListener('pointercancel', endDrag);
		splitter.addEventListener('lostpointercapture', endDrag);

		splitter.addEventListener('dblclick', function () {
			topEl.style.height    = '60%';
			bottomEl.style.height = '35%';
		});
	}
	
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
		// 執行結果區是 iframe，外層 CSS 管不到裡面的捲軸，需在 iframe 內另外寫入捲軸樣式
		var scrollbarStyle = '<style>' +
			'::-webkit-scrollbar{width:10px;height:10px;}' +
			'::-webkit-scrollbar-track{background:#EEF1F8;border-radius:5px;}' +
			'::-webkit-scrollbar-thumb{background:#B7BFD6;border-radius:5px;border:2px solid #EEF1F8;}' +
			'::-webkit-scrollbar-thumb:hover{background:#8E98B8;}' +
			'::-webkit-scrollbar-thumb:active{background:#4C5C8F;}' +
			'::-webkit-scrollbar-corner{background:#EEF1F8;}' +
			'@supports not selector(::-webkit-scrollbar){html{scrollbar-color:#B7BFD6 #EEF1F8;scrollbar-width:thin;}}' +
			'</style>';
		iframe.contentWindow.document.write(scrollbarStyle + iframe_code);
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
    
	document.getElementById('button_hide').onclick = function () {
		var div = document.getElementById('javascript_content');
		div.style.display = "none";
	}    
	
	document.getElementById('button_reset').onclick = function () {
		var result = confirm(Blockly.Msg.BUTTON_RESET);
		if (result) {
			newFile();
		}
	}
    
	document.getElementById('button_enlarge').onclick = function () {
		var div = document.getElementById('javascript_content');

        var metrics = Blockly.getMainWorkspace().getMetrics();
        div.style.left = (metrics.toolboxWidth + 272) + 'px';
        div.style.top = "70px";
        div.style.width = (metrics.viewWidth - 300) + 'px';
        div.style.height = (metrics.viewHeight - 45) + 'px';
        
        document.getElementById("question_input").style.width = "100%";
        document.getElementById("question_input").style.height = "100%";
        document.getElementById("iframe_output").style.display = "none";
        document.getElementById("question_splitter").style.display = "none";
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
			link.download="id_number.xml";
			link.href="data:application/octet-stream;utf-8," + encodeURIComponent(xmlText);
			document.body.appendChild(link);
			link.click();
			link.remove();
/*
			var code = Blockly.JavaScript.workspaceToCode(workspace);
			code = js_beautify(code);

			var link = document.createElement('a');
			link.download="id_number.js";
			link.href="data:application/octet-stream;utf-8," + encodeURIComponent(code);
			document.body.appendChild(link);
			link.click();
			link.remove();	
*/
		} catch (e) {
			alert(e);
		}
	}
	
	function runCode() {
	  var code = Blockly.JavaScript.workspaceToCode(workspace);
	
	  var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";
	  
	  iframe_code += "\<\/head\>\<body\>\<script\>"+js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{try{"+code+"}catch(e){console.log(e);window.frameElement.title = 'err';return;}window.frameElement.title = 'ok';}main();")+"\<\/script\>\<\/body\>\<\/html\>";
	  
	  
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
				iframeWrite("iframe_output", Blockly.Msg["TEST_RUNNING"]);
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
		reloadZoom();
        document.getElementById("question_input").style.height = "35%";
        document.getElementById("iframe_output").style.height = "60%";
		
	    if (scratchStyle) {
		  const topBlocks = workspace.getBlocksByType("javascript_start_scratch", false); 
		  if (topBlocks.length!=1) {
			iframeWrite("iframe_output", Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"]);
			//alert(Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"]);
			if (topBlocks.length==0) {
				var xml = '<block type="javascript_start_scratch" x="10" y="10"></block>';
				//Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(xml), workspace);			
			}
			return;
		  }
	    }
		
		const blocks_blockly = workspace.getBlocksByType("javascript_data_output", false); 
		const blocks_scratch = workspace.getBlocksByType("javascript_data_output_scratch", false);
		if (blocks_blockly.length==0 && blocks_scratch.length==0) {
			if (scratchStyle)
				iframeWrite("iframe_output", Blockly.Msg["JAVASCRIPT_OUTPUT_ALERT_SCRATCH"]);
			else
				iframeWrite("iframe_output", Blockly.Msg["JAVASCRIPT_OUTPUT_ALERT"]);
			return;
		}		
        
        toggleConsoleForm(false);
		
		var question_input = document.getElementById("question_input").innerHTML;
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
            iframeWrite("iframe_output", "");
            var input;
            var i = 0;
            while (true) {
                i++;
                input = prompt(Blockly.Msg["TEST_CODE_MESSAGE"].replace("%1", i));
                if (input === null || input.trim() === "") {
                    break;
                }
                inputArray.push(input);
            }
		}	  

		if (inputArray.length>0) {
			iframeWrite("iframe_output", Blockly.Msg["TEST_RUNNING"]);
			runMultipleIframeTests(inputArray);
		}
	}
	
	function runMultipleIframeTests(inputArray, containerId = 'iframeContainer') {
		if (inputArray.length === 0) return;

		let outputResult = "";
		let completedCount = 0;
		let rightCount = 0;
		let totalTests = inputArray.length;

		let container = document.getElementById(containerId);
		if (container) {
			container.parentNode.removeChild(container);
		}
		container = document.createElement('div');
		container.id = containerId;
		document.body.appendChild(container);		

		inputArray.forEach((testCode, index) => {
			if (testCode=="")
				totalTests--;
			else {
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

					if (iframe.title=="ok"||iframe.title=="err") {
						
					  const bodyContent = body.innerText;
					  outputResult += "【 "+ Blockly.Msg["TEST_CODE_TEST"].replace("%1", completedCount+1)+" 】"+bodyContent + "\n\n";
					  completedCount++;
					  if (iframe.title=="ok")
						  rightCount++;
					  if (completedCount === totalTests) {
						outputResult += "\n" + Blockly.Msg["TEST_CODE_CORRECT_COUNT"] + "： [red]" + rightCount + "[/red] / " + completedCount;
                        var output = outputResult
                            .replace(/ /g, "&nbsp;")
                            .replace(/\n/g, "<br>")
                            .replace(/\[orange\]/g, "<span style='color: orange;'>")
                            .replace(/\[\/orange\]/g, "</span>")
                            .replace(/\[blue\]/g, "<span style='color: blue;'>")
                            .replace(/\[\/blue\]/g, "</span>")
                            .replace(/\[red\]/g, "<span style='color: red;'>")
                            .replace(/\[\/red\]/g, "</span>");
						iframeWrite("iframe_output", output);
						if (container) container.remove();
					  }
					} else {
					  setTimeout(checkFinish, 100);
					}
				  };

				  checkFinish();
				};

				runTest(iframe, testCode.trim());
			}
		});
	}	

	function runTest(iframe, input) {
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		code = code.replace(/variable_input\(/g,"variable_input_test('"+input.replace(/\\/g, "\\\\").replace(/\'/g, "\\\'")+"', ");
		code = code.replace(/data_output\(/g,"data_output_test('"+input.replace(/\\/g, "\\\\").replace(/\'/g, "\\\'")+"', ");	
		code = 'var systemAnswer = "'+input+'"; var userAnswer = ""; var userAnswerHTML = ""; var variable_data_test_index = -1;\n' + code;
    
		var blocks_scratch = workspace.getBlocksByType("javascript_data_input_scratch");       

		if (blocks_scratch.length==0) {
			code += ''+
			'async function variable_input_test (input, msg, type){\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+			
			'  variable_data_test_index++;\n'+
			'  var arr = input.split(";");\n'+
			'  if (variable_data_test_index>(arr.length-1)) return "";\n'+				
			'  input = arr[variable_data_test_index];\n'+
			'  userAnswer += (variable_data_test_index>0 ? ";" : "") + input;\n'+
			'  userAnswerHTML += (variable_data_test_index>0 ? ";" : "") + "[orange]" + input + "[/orange]";\n'+ 				
			'  if (type=="NUMBER")\n'+
			'  	input = Number(input);\n'+
			'  else\n'+
			'    input = input;\n'+
			'  //document.body.insertAdjacentHTML("beforeend", (msg?(msg+"："):"")+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+
			'  return input;\n'+
			'}';
			
		} else {
			code += ''+
			'async function variable_input_test (input, msg){\n'+
			'  if (input === null || input === undefined) {'+
			'      input = "";'+
			'  }'+			
			'  variable_data_test_index++;\n'+
			'  var arr = input.split(";");\n'+
			'  if (variable_data_test_index>(arr.length-1)) return "";\n'+			
			'  input = arr[variable_data_test_index];\n'+					
			'  userAnswer += (variable_data_test_index>0 ? ";" : "") + input;\n'+	
			'  userAnswerHTML += (variable_data_test_index>0 ? ";" : "") + "[orange]" + input + "[/orange]";\n'+ 			
            '  if (input.trim() !== "" && !isNaN(input) && input.replace(/[+\\-.]/g, "").length <= 15)\n'+
            '      input = Number(input);\n'+
			'  //document.body.insertAdjacentHTML("beforeend", (msg?(msg+"："):"")+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+		
			'  return input;\n'+
			'}\n';
		}

		code += ''+
			'async function data_output_test (input, msg, text) {\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+
			'  variable_data_test_index++;\n'+			
			'  var arr = input.split(";");\n'+				
			'  input = arr[variable_data_test_index];\n'+
			'  userAnswer += (variable_data_test_index>0 ? ";" : "") + text;\n'+
			'  userAnswerHTML += (variable_data_test_index>0 ? ";" : "") + "[blue]" + text + "[/blue]";\n'+ 
			'  //document.body.insertAdjacentHTML("beforeend", "<BR>"+(msg?(msg+"："):"")+String(text).replace(/ /g,"&nbsp;"));\n'+				
			'}\n';

		code += ''+
		
			'if (userAnswer.trim()==systemAnswer.trim()) {\n'+		
			'  document.body.insertAdjacentHTML("beforeend", "<BR><BR>"+"'+Blockly.Msg["TEST_CODE_TEST"]+'".replace("%1", systemAnswer.trim()));\n'+					
			'  document.body.insertAdjacentHTML("beforeend", "<BR>"+"'+Blockly.Msg["TEST_CODE_CORRECT"]+'".replace("%1", userAnswerHTML));\n'+            
			'} else {\n'+
			'  document.body.insertAdjacentHTML("beforeend", "<BR><BR>"+"'+Blockly.Msg["TEST_CODE_TEST"]+'".replace("%1", systemAnswer.trim()));\n'+					
			'  document.body.insertAdjacentHTML("beforeend", "<BR>"+"'+Blockly.Msg["TEST_CODE_ERROR"]+'".replace("%1", userAnswerHTML));\n'+            
			'}\n';				
			
		var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";

		iframe_code += "\<\/head\>\<body\>\<script\>"+js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{try{"+code+"}catch(e){console.log(e);window.frameElement.title = 'err';return;}window.frameElement.title = ((document.body.innerText.indexOf('🔴')!=-1)?'err':'ok');}main();")+"\<\/script\>\<\/body\>\<\/html\>";

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
        document.getElementById('javascript_content').style.display = "block";

        if (scratchStyle) {
            const topBlocks = workspace.getBlocksByType("javascript_start_scratch", false); 
            if (topBlocks.length!=1) {
                iframeWrite("iframe_output", Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"]);
                //alert(Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"]);
                if (topBlocks.length==0) {
                    var xml = '<block type="javascript_start_scratch" x="10" y="10"></block>';
                    //Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(xml), workspace);				
                }
                return;
            }
        }
      
		const scratchBlocks = workspace.getBlocksByType("javascript_console_scratch", false);
        const blocklyBlocks = workspace.getBlocksByType("javascript_console", false);
		const printBlocks = workspace.getBlocksByType("text_print", false);		
		if (scratchBlocks.length>0||blocklyBlocks.length>0||printBlocks.length>0)
            toggleConsoleForm(true);
        else
            toggleConsoleForm(false);

        document.getElementById('javascript_content').style.display = "block";
        reloadZoom();	
        document.getElementById("question_input").style.height = "35%";
        document.getElementById("iframe_output").style.height = "60%";

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
						
						workspace.getToolbox().clearSelection();
						workspace.getToolbox().refreshSelection();
						
						workspace.scrollCenter();
					
						reloadZoom();
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
			var workspace = window.loadToolbox('geras', catSystem, 0.9);
			if (xmlBlockly)
				Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xmlBlockly), workspace);
		}
	}	
    
    // ===== 題庫選單 =====
    const examSelect  = document.getElementById('importQuestion_list');
    const examListDiv = document.getElementById('importQuestionsList');
    const examCache   = {};

    // 依 list.js 的 examList 產生選項
    if (typeof examList !== 'undefined') {
        examList.forEach(exam => examSelect.add(new Option(exam.name, exam.file)));
    }

    // 讀取 exam/xxx.js，取出其中的 contest 變數
    async function loadExam(file) {
        if (examCache[file]) return examCache[file];

        const url = 'exam/' + file.split('/').map(encodeURIComponent).join('/');
        const res = await fetch(url, { cache: 'no-cache' });
        
        if (!res.ok) throw new Error('讀取 ' + file + ' 失敗：' + res.status);
        const code = await res.text();

        const contest = new Function(code + '\nreturn contest;')();
        examCache[file] = contest;
        return contest;
    }

    async function showExam() {
        const file = examSelect.value;
        if (!file) { examListDiv.innerHTML = ''; return; }

        examListDiv.innerHTML = '載入中…';
        try {
            examListDiv.innerHTML = await loadExam(file);
        } catch (err) {
            examListDiv.innerHTML = '題庫載入失敗';
            console.error(err);
        }
    }

    // 按「查詢題庫」或切換選單時載入
    document.getElementById('importQuestionsButton').addEventListener('click', showExam);
    examSelect.addEventListener('change', showExam);

    // 開啟頁面時先載入第一份題庫
    if (examSelect.options.length > 0) showExam();    
    
    function fillExamSelect() {
        if (examSelect.options.length > 0) return;
        examSelect.innerHTML = '';
        if (typeof examList !== 'undefined') {
            examList.forEach(exam => examSelect.add(new Option(exam.name, exam.file)));
        }
        if (examSelect.options.length > 0) showExam();
    }

	// 載入參考答案：path 例如 exam/answer/114南投縣國小組/勇者的挑戰_Blockly.xml（已 URL 編碼）
	// path 可放多個路徑，用 | 分隔，依序嘗試，前一個找不到才試下一個
	// 例如 ../exam/answer/113全國賽/飲食兌換券_Blockly.xml|exam/answer/113全國賽/飲食兌換券_Blockly.xml
	function showAnswer(path) {
		if (!path) return;
		var paths = String(path).split("|").filter(function (p) { return p; });
		if (paths.length == 0) return;

		// 工作區已有積木時先確認，避免覆蓋學生自己的作答
		if (workspace && workspace.getAllBlocks(false).length > 0) {
			var ok = confirm(Blockly.Msg["SHOW_ANSWER_CONFIRM"] || Blockly.Msg["SHOWANSWER_QUEST"]);
			if (!ok) return;
		}

		// 依序讀取，回傳第一個讀得到且是有效 XML 的檔案
		function fetchFirst(i) {
			return fetch(paths[i], { cache: "no-cache" })
				.then(function (response) {
					if (!response.ok) throw new Error("HTTP " + response.status);
					return response.text();
				})
				.then(function (xmlText) {
					var dom = Blockly.utils.xml.textToDom(xmlText);   // 不是有效 XML 會丟出錯誤
					return dom;
				})
				.catch(function (err) {
					console.log(paths[i], err);
					if (i + 1 < paths.length) return fetchFirst(i + 1);
					throw err;
				});
		}

		fetchFirst(0)
			.then(function (blocks) {
				// 依 XML 的 platform 屬性切換 Blockly / Scratch 外觀，只在不同時才切換
				var isScratch = (blocks.getAttribute('platform') == 'scratch');
				if (isScratch != scratchStyle) {
					scratchStyle = isScratch;
					changeToolboxStyle();
				}

				workspace.clear(true);
				Blockly.Xml.domToWorkspace(blocks, workspace);

				workspace.getToolbox().clearSelection();
				workspace.getToolbox().refreshSelection();
				workspace.scrollCenter();

				toggleImportQuestionForm(false);
				reloadZoom();
				resetOutput();
			})
			.catch(function (err) {
				console.log(err);
				var names = paths.map(function (p) {
					try { return decodeURIComponent(p); } catch (e) { return p; }
				});
				alert((Blockly.Msg["SHOW_ANSWER_ERROR"] || Blockly.Msg["SHOWANSWER_ERROR"]) + "\n" + names.join("\n"));
			});
	}
	window.showAnswer = showAnswer;

    const langToggle = document.getElementById("lang-toggle");
    const langPanel  = document.getElementById("lang-panel");

    // 點圖示：顯示 / 隱藏
    langToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        langPanel.classList.toggle("show");
    });

    // 點選語言：跳轉
    langPanel.querySelectorAll(".lang-option").forEach(function (opt) {
        opt.addEventListener("click", function () {
            location.href = "?lang=" + this.dataset.lang;
        });
    });

    // 點其他地方：收起
    document.addEventListener("click", function (e) {
        if (!langPanel.contains(e.target)) {
            langPanel.classList.remove("show");
        }
    });

    // 標示目前語言
    const currentLang = new URLSearchParams(location.search).get("lang");
    if (currentLang) {
        const cur = langPanel.querySelector('[data-lang="' + currentLang + '"]');
        if (cur) cur.classList.add("active");
    }   
});	

var contents = ['javascript_content'];
function textareaFocus(id) {
	for (var i in contents) {
		const content = document.getElementById(contents[i]);
		content.style.zIndex = (contents[i]==id)?"99":"98";
	}
}

function contentZoom(content) {
	if (!content) content = "javascript";
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
			div_content.style.top = "70px";
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
	if (!content) content = "javascript";

	const codeDiv = document.getElementById(content+"_code");
	codeDiv.style.display = "block";

    const contentDiv = document.getElementById(content + "_content");
	contentDiv.style.width = '450px';
	contentDiv.style.height = 'calc(100vh - 100px)';
	contentDiv.style.left = 'calc(100vw - 478px)';
	contentDiv.style.top = '70px';
	contentDiv.style.padding = '0em';
	contentDiv.style.fontSize = '14px';
	contentDiv.style.position = 'absolute';
    
	const questionInput = document.getElementById("question_input");

	questionInput.style.flex = '1';
	questionInput.style.height = '60%';
	questionInput.style.width = '100%';
    questionInput.scrollTop = 0; 
    
    document.getElementById("iframe_output").style.display = "flex";
    document.getElementById("iframe_output").style.height = "35%";
    document.getElementById("question_splitter").style.display = "";
}

function loadExam() {
	document.getElementById("question_input").style.height = '60%';
    document.getElementById("question_input").scrollTop = 0;
    document.getElementById("iframe_output").style.display = "block";
    document.getElementById("iframe_output").style.height = "35%";
}

if (typeof require !== "undefined") {
	var http = require('http');
	var fs = require('fs');
	var path = require('path');

	http.createServer(function (request, response) {

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
