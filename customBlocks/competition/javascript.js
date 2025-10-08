Blockly.JavaScript['javascript_start_scratch'] = function(block) {
	return '';
};

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

Blockly.JavaScript['javascript_data_input_scratch'] = function(block) {
	Blockly.JavaScript.definitions_['javascript_data_input_data'] = 'var input_data;';	
	Blockly.JavaScript.definitions_['javascript_data_input'] = 'function data_input(msg) {\n'+
	'  input = prompt(msg);\n'+
	'  document.body.insertAdjacentHTML("beforeend", msg+"："+input+"<br>");\n'+
	'  return input;\n'+
	'}';
	var TEXT = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC)||" ";	
	var code = 'input_data = data_input('+TEXT+');\n';
	return code;
};

Blockly.JavaScript['javascript_data_input_get_scratch'] = function(block) {
	var code = 'input_data';
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
Blockly.JavaScript['javascript_data_output_scratch'] = Blockly.JavaScript['javascript_data_output'];

Blockly.JavaScript['controls_if_1_scratch'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_statement_if = Blockly.JavaScript.statementToCode(block, 'statement_if');
  var code = 'if ('+value_condition+') {\n'+statements_statement_if+'\n}\n';
  return code;
};

Blockly.JavaScript['controls_if_2_scratch'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_statement_if = Blockly.JavaScript.statementToCode(block, 'statement_if');
  var statements_statement_else = Blockly.JavaScript.statementToCode(block, 'statement_else');
  var code = 'if ('+value_condition+') {\n'+statements_statement_if+'\n}\nelse{\n'+statements_statement_else+'\n}\n';
  return code;
};

Blockly.JavaScript['controls_repeat_ext_scratch'] = Blockly.JavaScript.forBlock['controls_repeat_ext'];
Blockly.JavaScript['controls_whileUntil_scratch'] = Blockly.JavaScript.forBlock['controls_whileUntil'];
Blockly.JavaScript['controls_flow_statements_scratch'] = Blockly.JavaScript.forBlock['controls_flow_statements'];
Blockly.JavaScript['logic_boolean_scratch'] = Blockly.JavaScript.forBlock['logic_boolean'];
Blockly.JavaScript['logic_comparev'] = Blockly.JavaScript.forBlock['logic_compare'];
Blockly.JavaScript['logic_operation_scratch'] = Blockly.JavaScript.forBlock['logic_operation'];
Blockly.JavaScript['logic_negate_scratch'] = Blockly.JavaScript.forBlock['logic_negate'];
Blockly.JavaScript['math_arithmetic_scratch'] = Blockly.JavaScript.forBlock['math_arithmetic'];
Blockly.JavaScript['math_single_scratch'] = Blockly.JavaScript.forBlock['math_single'];
Blockly.JavaScript['math_round_scratch'] = Blockly.JavaScript.forBlock['math_round'];
Blockly.JavaScript['math_modulo_scratch'] = Blockly.JavaScript.forBlock['math_modulo'];
Blockly.JavaScript['math_random_int_scratch'] = Blockly.JavaScript.forBlock['math_random_int'];
Blockly.JavaScript['text_join_scratch'] = Blockly.JavaScript.forBlock['text_join'];
Blockly.JavaScript['text_charAt_scratch'] = Blockly.JavaScript.forBlock['text_charAt'];
Blockly.JavaScript['text_indexOf_scratch'] = Blockly.JavaScript.forBlock['text_indexOf'];
Blockly.JavaScript['text_length_scratch'] = Blockly.JavaScript.forBlock['text_length'];