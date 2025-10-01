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
    this.setColour(150);
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
    this.setColour(150);
  }
};