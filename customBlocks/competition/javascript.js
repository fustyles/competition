Blockly.JavaScript['javascript_data_input'] = function(block) {
	Blockly.JavaScript.definitions_['javascript_data_input'] = 'function data_input(msg, type) {\n'+
	'  var input;\n'+
	'  if (type=="NUMBER")\n'+
	'  	input = Number(prompt(msg));\n'+
	'  else\n'+
	'  	input = prompt(msg);\n'+
	'  document.body.insertAdjacentHTML("beforeend", msg+"："+input+"<br>");\n'+
	'  return input;\n'+
	'}';
	var type = block.getFieldValue('type');
	var TEXT = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC)||" ";	
	var code = 'data_input('+TEXT+', "'+type+'")';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['javascript_data_output'] = function(block) {
	Blockly.JavaScript.definitions_['javascript_data_output'] = 'function data_output(msg, text) {\n'+
	'  document.body.insertAdjacentHTML("beforeend", msg+"："+text+"<br>");\n'+
	'}';	
	var TEXT = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC)||" ";
	var code = 'data_output("'+Blockly.Msg["JAVASCRIPT_DATA_OUTPUT"]+'",'+TEXT+');\n';	
	return code;
};