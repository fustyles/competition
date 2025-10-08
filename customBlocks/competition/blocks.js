Blockly.Blocks['javascript_data_input'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT) 
        .appendField(new Blockly.FieldDropdown([
			[Blockly.Msg["TEXT_PROMPT_TYPE_NUMBER"],"NUMBER"],		
			[Blockly.Msg["TEXT_PROMPT_TYPE_TEXT"],"TEXT"]		
		]), "type");
	this.appendValueInput("TEXT");			
	this.setInputsInline(true);
	this.setOutput(true, null); 
    this.setColour(60);
  }
};

Blockly.Blocks['javascript_data_output'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_DATA_OUTPUT"]);
	this.appendValueInput("TEXT");			
	this.setInputsInline(true);	  
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
    this.setColour(60);
  }
};

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

Blockly.Blocks['javascript_data_input_scratch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_DATA_INPUT_HEAD_SCRATCH"]);
	this.appendValueInput("TEXT");
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_DATA_INPUT_TIE_SCRATCH"]);	
	this.setInputsInline(true);	  
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
    this.setStyle('sensing_blocks');
  }
};

Blockly.Blocks['javascript_data_input_get_scratch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_DATA_INPUT_ANSWER_SCRATCH"]);
	this.setInputsInline(true);
	this.setOutput(true, null); 
    this.setStyle('sensing_blocks');
  }
};

Blockly.Blocks['javascript_data_output_scratch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_DATA_OUTPUT_SCRATCH"]);
	this.appendValueInput("TEXT");			
	this.setInputsInline(true);	  
	this.setPreviousStatement(!0);
	this.setNextStatement(!0);
    this.setStyle('looks_blocks');
  }
};

Blockly.Blocks['controls_if_1_scratch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_CONTROLS_IF_IF_SCRATCH"]);
    this.appendValueInput("condition")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_CONTROLS_IF_THEN_SCRATCH"]);
    this.appendStatementInput("statement_if")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('control_blocks');
  }
};

Blockly.Blocks['controls_if_2_scratch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_CONTROLS_IF_IF_SCRATCH"]);
    this.appendValueInput("condition")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_CONTROLS_IF_THEN_SCRATCH"]);
    this.appendStatementInput("statement_if")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(Blockly.Msg["JAVASCRIPT_CONTROLS_IF_ELSE_SCRATCH"]);
    this.appendStatementInput("statement_else")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('control_blocks');
  }
};


Blockly.Blocks['controls_repeat_ext_scratch'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField(Blockly.Msg["CONTROLS_REPEAT"]);
    this.appendDummyInput()
        .appendField(Blockly.Msg["CONTROLS_REPEAT_TIMES"]);		
    this.appendStatementInput("DO")
        .appendField(Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('control_blocks');
    this.setTooltip(Blockly.Msg["CONTROLS_REPEAT_TOOLTIP"]);
    this.setHelpUrl(Blockly.Msg["CONTROLS_REPEAT_HELPURL"]);
  }
};

Blockly.Blocks['controls_whileUntil_scratch'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")
        .appendField(Blockly.Msg["CONTROLS_REPEAT"])
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_WHILE"], "WHILE"],
            [Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_UNTIL"], "UNTIL"]
        ]), "MODE");
    this.appendStatementInput("DO")
        .appendField(Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('control_blocks');
    this.setTooltip(Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP"]);
    this.setHelpUrl(Blockly.Msg["CONTROLS_WHILEUNTIL_HELPURL"]);
  }
};

Blockly.Blocks['controls_flow_statements_scratch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK"], "BREAK"],
            [Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE"], "CONTINUE"]
        ]), "FLOW");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('control_blocks');
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP"]);
    this.setHelpUrl(Blockly.Msg["CONTROLS_FLOW_STATEMENTS_HELPURL"]);
  }
};

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
