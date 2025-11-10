Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "javascript_data_input",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "type",
        "options": [
          [
            "%{BKY_TEXT_PROMPT_TYPE_NUMBER}",
            "NUMBER"
          ],
          [
            "%{BKY_TEXT_PROMPT_TYPE_TEXT}",
            "TEXT"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "output": null,
    "inputsInline": true,
    "style": "text_blocks"
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "javascript_data_output",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_label",
        "text": "%{BKY_JAVASCRIPT_DATA_OUTPUT}"
      },
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "text_blocks"
  }
]);

Blockly.Blocks['javascript_start_scratch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_START_HEAD_SCRATCH"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("data:image/png;base64,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", 30, 30, { alt: "*", flipRtl: "FALSE" }));
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_START_TIE_SCRATCH"]);			
    this.setInputsInline(true);	  
	this.setPreviousStatement(0);
	this.setNextStatement(!0);
    this.setStyle('control_blocks');
  }
};

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "javascript_data_input_scratch",
    "message0": "%{BKY_JAVASCRIPT_DATA_INPUT_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "sensing_blocks" 
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "javascript_data_input_get_scratch",
    "message0": "%{BKY_JAVASCRIPT_DATA_INPUT_ANSWER_SCRATCH}",
    "output": null,
    "inputsInline": true,
    "style": "sensing_blocks" 
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "javascript_data_output_scratch",
    "message0": "%{BKY_JAVASCRIPT_DATA_OUTPUT_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "looks_blocks" 
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "controls_if_1_scratch",
    "message0": "%{BKY_JAVASCRIPT_CONTROLS_IF_IF_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "condition",
        "check": "Boolean"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "statement_if"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "control_blocks"
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "controls_if_2_scratch",
    "message0": "%{BKY_JAVASCRIPT_CONTROLS_IF_IF_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "condition",
        "check": "Boolean"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "statement_if",
        "check": "Boolean"
      }
    ],
    "message2": "%{BKY_JAVASCRIPT_CONTROLS_IF_ELSE_SCRATCH}",
    "args2": [
    ],	
    "message3": "%1",
    "args3": [
      {
        "type": "input_statement",
        "name": "statement_else"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "control_blocks"
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "controls_repeat_ext_scratch",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_label",
        "text": "%{BKY_CONTROLS_REPEAT}"
      },
      {
        "type": "input_value",
        "name": "TIMES",
        "check": "Number"
      },
      {
        "type": "field_label",
        "text": "%{BKY_CONTROLS_REPEAT_TIMES}"
      }
    ],
    "message1": "%1 %2",
    "args1": [
      {
        "type": "field_label",
        "text": "%{BKY_CONTROLS_REPEAT_INPUT_DO}"
      },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "control_blocks",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "controls_whileUntil_scratch",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_label",
        "text": "%{BKY_CONTROLS_REPEAT}"
      },
      {
        "type": "field_dropdown",
        "name": "MODE",
        "options": [
          [
            "%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}",
            "WHILE"
          ],
          [
            "%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}",
            "UNTIL"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "BOOL",
        "check": "Boolean"
      }
    ],
    "message1": "%1 %2",
    "args1": [
      {
        "type": "field_label",
        "text": "%{BKY_CONTROLS_REPEAT_INPUT_DO}"
      },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "control_blocks",
    "tooltip": "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}"
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "controls_flow_statements_scratch",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "FLOW",
        "options": [
          [
            "%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}",
            "BREAK"
          ],
          [
            "%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}",
            "CONTINUE"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "control_blocks",
    "tooltip": "%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}"
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "text_join_scratch",
    "message0": "%{BKY_TEXT_JOIN_TITLE_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE1",
        "check": ["String","Number"]
      },
      {
        "type": "input_value",
        "name": "VALUE2",
        "check": ["String","Number"]
      }
    ],
    "output": "String",
    "style": "text_blocks",
    "helpUrl": "",
    "inputsInline": true
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "text_charAt_scratch",
    "message0": "%{BKY_TEXT_CHARAT_TITLE_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "WHERE",
        "check": "Number"
      }
    ],
    "output": "String",
    "style": "text_blocks",
    "helpUrl": "%{BKY_TEXT_CHARAT_HELPURL}",
    "inputsInline": true
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "text_contain_scratch",
    "message0": "%{BKY_TEXT_CONTAIN_TITLE_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FIND",
        "check": "String"
      }
    ],
    "output": "String",
    "style": "text_blocks",
    "helpUrl": "",
    "inputsInline": true
  }
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "text_length_scratch",
    "message0": "%{BKY_TEXT_LENGTH_TITLE_SCRATCH}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "output": "Number",
    "style": "text_blocks",
    "helpUrl": "",
    "inputsInline": true
  }
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "variables_get_other",
	  "message0": "%1",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["other"],
		  "defaultType": "other"
		}
	  ],
	  "output": ["String","Number","other"],
	  "style": "variables_blocks",	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
		type:"variables_set_other"
		,message0:"%{BKY_VARIABLES_SET_OTHER}"
		,args0:[
			{
				"type":"field_variable",
				"name":"VAR",
			    "variableTypes": ["other"],
			    "defaultType": "other"
			},
			{
				"type":"input_value",
				"name":"VALUE"
			}
		]
		,previousStatement:null
		,nextStatement:null
		,style:"variables_blocks"
		,tooltip:"%{BKY_VARIABLES_SET_TOOLTIP}"
		,helpUrl:"%{BKY_VARIABLES_SET_HELPURL}"
		,extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "math_change_other",
    "message0": "%{BKY_MATH_CHANGE_TITLE_OTHER}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
		"variableTypes": ["other"],
		"defaultType": "other"
      },
      {
        "type": "input_value",
        "name": "DELTA",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variables_blocks",
    "helpUrl": "%{BKY_MATH_CHANGE_HELPURL}",
    "extensions": [
      "math_change_tooltip"
    ]
  }
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "variables_get_array",
	  "message0": "%1",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		}
	  ],
	  "output": "Array",
	  "style": "sound_blocks",	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "variables_get_boolean",
	  "message0": "%1",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Boolean"],
		  "defaultType": "Boolean"
		}
	  ],
	  "output": "Boolean",
	  "style": "logic_blocks",	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_addtolist_scratch",
	  "message0": "%{BKY_LIST_ADDTOLIST}",
	  "args0": [
        {
          "type": "input_value",
          "name": "ITEM",
          "check": ["String","Number","Array"]
        },
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		}
	  ],
	  "previousStatement": true,
	  "nextStatement": true,
	  "style": "sound_blocks",	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_itemoflist_scratch",
	  "message0": "%{BKY_LIST_ITEMOFLIST}",
	  "args0": [
        {
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		},
        {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
        }
	  ],
	  "output": null,
	  "style": "sound_blocks",	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_deletealloflist_scratch",
	  "message0": "%{BKY_LIST_DELETEALLOFLIST}",
	  "args0": [
        {
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		}
	  ],
	  "previousStatement": true,
	  "nextStatement": true,
	  "style": "sound_blocks",	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_lengthoflist_scratch",
	  "message0": "%{BKY_LIST_LENGTHOFLIST}",
	  "args0": [
        {
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		}
	  ],
	  "output": "Number",
	  "style": "sound_blocks",	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_insertatlist_scratch",
	  "message0": "%{BKY_LIST_INSERTATLIST}",
	  "args0": [
        {
          "type": "input_value",
          "name": "ITEM",
          "check": ["String","Number","Array"]
        },
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		},
        {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
        }
	  ],
	  "previousStatement": true,
	  "nextStatement": true,
	  "style": "sound_blocks",	
	  "inputsInline": true,	  
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_replaceitemoflist_scratch",
	  "message0": "%{BKY_LIST_REPLACEITEMOFLIST}",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		},
        {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
        },
		{
          "type": "input_value",
          "name": "ITEM",
          "check": ["String","Number","Array"]
        }
	  ],
	  "previousStatement": true,
	  "nextStatement": true,
	  "style": "sound_blocks",
	  "inputsInline": true,
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_deleteoflist_scratch",
	  "message0": "%{BKY_LIST_DELETEOFLIST}",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		},
        {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
        }
	  ],
	  "previousStatement": true,
	  "nextStatement": true,
	  "style": "sound_blocks",
	  "inputsInline": true,
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_listcontainsitem_scratch",
	  "message0": "%{BKY_LIST_LISTCONTAINSITEM}",
	  "args0": [
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		},
		{
          "type": "input_value",
          "name": "ITEM",
          "check": ["String","Number","Array"]
        }
	  ],
	  "output": "Boolean",
	  "style": "sound_blocks",
	  "inputsInline": true,
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

Blockly.common.defineBlocksWithJsonArray([
	{
	  "type": "list_itemnumoflist_scratch",
	  "message0": "%{BKY_LIST_ITEMNUMOFLIST}",
	  "args0": [
		{
          "type": "input_value",
          "name": "ITEM",
          "check": ["String","Number","Array"]
        },
		{
		  "type": "field_variable",
		  "name": "VAR",
		  "variableTypes": ["Array"],
		  "defaultType": "Array"
		}
	  ],
	  "output": "Number",
	  "style": "sound_blocks",
	  "inputsInline": true,
	  extensions:["contextMenu_variableSetterGetter"]
	}
]);

//Blockly.Blocks['javascript_procedures_defnoreturn_scratch'] = Blockly.Blocks['procedures_defnoreturn'];
//Blockly.Blocks['javascript_procedures_callnoreturn_scratch'] = Blockly.Blocks['procedures_callnoreturn'];


Blockly.Blocks['javascript_procedures_defnoreturn_scratch'] = {
    init: function() {
        var defaultName = Blockly.Procedures.findLegalName("", this);
        defaultName = Blockly.fieldRegistry.fromJson({
            type: "field_input",
            text: defaultName
        });
        defaultName.setValidator(Blockly.Procedures.rename);
        defaultName.setSpellcheck(!1);

        this.appendDummyInput()
            .appendField(Blockly.Msg["JAVASCRIPT_CREATE_DEFINITION_SCRATCH"])
            .appendField(defaultName, "NAME")
            .appendField("", "PARAMS");	
		this.appendDummyInput("BACKGROUND");			
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable(""), "TITLE");
        //this.setMutator(new Blockly.icons.MutatorIcon(['procedures_mutatorarg'], this));

        if ((this.workspace.options.comments || (this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"]) {
            this.setCommentText(Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"]);
        }

		this.setStyle('myblocks_blocks');
        this.setTooltip(Blockly.Msg["PROCEDURES_DEFNORETURN_TOOLTIP"]);
        this.setHelpUrl(Blockly.Msg["PROCEDURES_DEFNORETURN_HELPURL"]);

        this.arguments_ = [];
        this.argumentVarModels_ = [];
		this.setInputsInline(true);	
		//this.setStatements_(true);
		this.setPreviousStatement(0);
		this.setNextStatement(1);		
		this.statementConnection_ = null;
    },
    //setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,
    getProcedureDef: Blockly.Blocks['procedures_defnoreturn'].getProcedureDef,
    getVars:function(){return this.arguments_},
    updateParams_:function(){
		let a="";
		this.arguments_.length&&(a=Blockly.Msg["PROCEDURES_BEFORE_PARAMS"]+" "+this.arguments_.join(", "));
		//this.setFieldValue(a, "PARAMS");

		Blockly.Events.disable();
        try {
            const paramsInput = this.getInput('BACKGROUND'); 

            if (paramsInput) {
                for (var i = 0; i < this.arguments_.length; i++) {
                    if (typeof FieldZelosLabelBackground !== 'undefined') {
						const allVariables = workspace.getAllVariables();
						allVariables.find(variableModel => {
							if (variableModel.name === this.arguments_[i]&&variableModel.type=="NS") {
								paramsInput.appendField(new FieldZelosLabelBackground(this.arguments_[i].replace("arg_",""), null, {
									textColor: '#FFFFFF',
									backgroundColor: '#FD6723',
									shapeType: 1
								}), 'ARG'+i);
							} else if (variableModel.name === this.arguments_[i]&&variableModel.type=="Boolean") {
								paramsInput.appendField(new FieldZelosLabelBackground(this.arguments_[i].replace("arg_",""), null, {
									textColor: '#FFFFFF',
									backgroundColor: '#4C97FF',
									shapeType: 2
								}), 'ARG'+i);

							}
						});
                    } else {
                        paramsInput.appendField(this.arguments_[i], 'ARG'+i);
                    }
                }
            }
        } finally {
            Blockly.Events.enable();
        }
	},
    onchange: Blockly.Blocks['procedures_defnoreturn'].onchange,
    getProcedureCall: Blockly.Blocks['procedures_defnoreturn'].getProcedureCall,
    callType_: "javascript_procedures_callnoreturn_scratch"
};

Blockly.Blocks['javascript_procedures_callnoreturn_scratch'] = {
    init: function() {
        this.appendDummyInput("TOPROW").appendField("", "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setStyle("myblocks_blocks");
        this.setHelpUrl(Blockly.Msg["PROCEDURES_CALLNORETURN_HELPURL"]);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.setMutator(new Blockly.icons.MutatorIcon([], this));
        this.previousEnabledState_ = !0;
        this.setInputsInline(true);
    },

    defType_: "javascript_procedures_defnoreturn_scratch",
    mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
    getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
    getVarsModels: Blockly.Blocks['procedures_callnoreturn'].getVarsModels,
    onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
    setProcedureParameters_: Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
    renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
    getVars: function() {
        return this.arguments_
    },
    updateShape_: function() {
        for (var a = 0; a < this.arguments_.length; a++) {
            var b = this.getField("ARGNAME" + a);

            if (b) {
                Blockly.Events.disable();
                try {
                    b.setValue(this.arguments_[a]);
                } finally {
                    Blockly.Events.enable();
                }
            } else {
                b = new Blockly.FieldLabel(this.arguments_[a]);
				c = new Blockly.FieldLabel(this.arguments_[a].replace("arg_",""));
					
				const allVariables = workspace.getAllVariables();
				allVariables.find(variableModel => {
					if (variableModel.name === b.value_&&variableModel.type=="NS") {
						this.appendValueInput("ARG" + a)
							.setAlign(Blockly.Align_RIGHT)
							.setCheck(["String","Number"])
							.appendField(b, "ARGNAME" + a)
							.appendField(c).init();
							
						this.getField("ARGNAME" + a).setVisible(false);
							
						const blockDom = Blockly.utils.xml.createElement('shadow');
						blockDom.setAttribute('type', "text_noquotes");

						const fieldDom = Blockly.utils.xml.createElement('field');
						fieldDom.setAttribute('name', 'TEXT');
						fieldDom.textContent = "";
						blockDom.appendChild(fieldDom);

						const newBlock = Blockly.Xml.domToBlock(blockDom, this.workspace);
						const newBlockConnection = newBlock.outputConnection;


						const input = this.getInput("ARG" + a);
						const inputConnection = input ? input.connection : null;
						if (inputConnection) {
							inputConnection.connect(newBlockConnection);
						}							
					} else if (variableModel.name === b.value_&&variableModel.type=="Boolean") {
						this.appendValueInput("ARG" + a)
							.setAlign(Blockly.Align_RIGHT)
							.setCheck("Boolean")
							.appendField(b, "ARGNAME" + a)
							.appendField(c).init();
							
						this.getField("ARGNAME" + a).setVisible(false);
					}
				});		
            }
        }

        for (a = this.arguments_.length; this.getInput("ARG" + a); a++) {
            this.removeInput("ARG" + a);
        }

        if (a = this.getInput("TOPROW")) {
            this.arguments_.length ?
                this.getField("WITH") || (a.appendField(Blockly.Msg['PROCEDURES_CALL_BEFORE_PARAMS'], "WITH"), a.init()) :
                this.getField("WITH") && a.removeField("WITH")
        }
    },
    decompose: Blockly.Blocks['procedures_callnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_callnoreturn'].compose,
    saveConnections: function(a) {
        var xml = Blockly.Xml.workspaceToDom(a.workspace);
        xml = new XMLSerializer().serializeToString(xml);

        if (xml.indexOf('type="undefined"') != -1) {
            xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
            xml = new XMLSerializer().serializeToString(xml);
            xml = new DOMParser().parseFromString(xml, "text/xml").firstChild.childNodes;

            for (var i = 0; i < xml.length; i++) {
                if (xml[i].getAttribute("type") == "javascript_procedures_defnoreturn_scratch") {
                    for (var j = 0; j < xml[i].childNodes.length; j++) {
                        if (xml[i].childNodes[j].textContent == this.getFieldValue("NAME")) {
							var mutation = xml[i].querySelector('mutation');
                            xml = Blockly.Xml.domToPrettyText(xml[i]);
                            xml = Blockly.utils.xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml">' + xml + '</xml>');
                            a.workspace.clear();
                            Blockly.Xml.domToWorkspace(xml, a.workspace);
                            break;
                        }
                    }
                }
            }
        }
    }
};

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "javascript_variable_ns_scratch",
    "message0": "%1",
    "args0": [
      {
        "type": "field_label_serializable", 
        "name": "variableName",
        "text": "", 
      }
    ],
    "output": ["Number", "String"],
    "inputsInline": true,
    "style": "variables_blocks" 
  }
]);

Blockly.Blocks['javascript_variable_ns_scratch'].onchange = function(event) {
	if (event.blockId === this.id && (event.type === Blockly.Events.MOVE || event.type === Blockly.Events.BLOCK_DRAG)) {
		var blocks = [
		  ...this.workspace.getBlocksByType("javascript_variable_ns_scratch"),
		  ...this.workspace.getBlocksByType("javascript_variable_boolean_scratch")
		];
		blocks.forEach(block => {
		  checkArgVariableRootBlock(block);
		});
	}
}

function checkArgVariableRootBlock(block) {
	const topBlock = block.getRootBlock(true);
	if (topBlock) {
		if (topBlock.type == 'javascript_procedures_defnoreturn_scratch') {
			let argNames = topBlock.arguments_||[];
			for (let i = 0; i < argNames.length; i++) {
				if (argNames[i]=="arg_"+block.getFieldValue("variableName")) {
					block.setWarningText(null);
					block.bringToFront();
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
window.checkArgVariableRootBlock = checkArgVariableRootBlock;

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "javascript_variable_boolean_scratch",
    "message0": "%1",
    "args0": [
      {
        "type": "field_label_serializable", 
        "name": "variableName",
        "text": "", 
      }
    ],
    "output": ["Boolean"],
    "inputsInline": true,
    "style": "logic_blocks" 
  }
]);

Blockly.Blocks['javascript_variable_boolean_scratch'].onchange = Blockly.Blocks['javascript_variable_ns_scratch'].onchange;

Blockly.Blocks['javascript_createfunction_scratch'] = {	
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg["JAVASCRIPT_CREATE_DEFINITION_SCRATCH"]);
		this.appendDummyInput()
			.appendField(new FieldZelosInputBackground(Blockly.Msg["JAVASCRIPT_CREATE_BLOCKNAME_INPUT"], null, {
				textColor: '#000000',
				backgroundColor: '#FFFFFF',
				shapeType: 0
			}), "NAME");
		this.setMovable(false);
		this.setInputsInline(true);	  
		this.setPreviousStatement(0);
		this.setNextStatement(0);
		this.setStyle('myblocks_blocks');
	}
};