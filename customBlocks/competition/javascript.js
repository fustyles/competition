Blockly.JavaScript['javascript_data_input'] = function(block) {
	Blockly.JavaScript.definitions_['javascript_data_input_data_test'] = 'var variable_data_test_index = -1;';	
	Blockly.JavaScript.definitions_['javascript_data_input'] = 'function variable_input (msg, type) {\n'+
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
	var code = 'variable_input('+TEXT+', "'+type+'")';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
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

Blockly.JavaScript['javascript_start_scratch'] = function(block) {
	return '';
};

Blockly.JavaScript['javascript_data_input_scratch'] = function(block) {
	Blockly.JavaScript.definitions_['javascript_data_input_data_test'] = 'var variable_data_test_index = -1;';		
	Blockly.JavaScript.definitions_['javascript_data_input_data'] = 'var input_data;';	
	Blockly.JavaScript.definitions_['javascript_data_input'] = 'function variable_input (msg) {\n'+
	'  var input = prompt(msg);\n'+
	'  document.body.insertAdjacentHTML("beforeend", msg+"："+input+"<br>");\n'+
	'  if (isNaN(input))'+
	'  	input = String(input);'+
	'  else'+
	'  	input = Number(input);'+
	'  return input;\n'+
	'}';

	var TEXT = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC)||" ";	
	var code = 'input_data = variable_input('+TEXT+');\n';
	return code;
};

Blockly.JavaScript['javascript_data_input_get_scratch'] = function(block) {
	var code = 'input_data';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

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

Blockly.JavaScript['text_join_scratch'] = function(block) {
  var text1 = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	
  var text2 = Blockly.JavaScript.valueToCode(block, 'VALUE2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	

  var code;
  
  code = 'String('+text1 + ')+String('+text2+')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['text_charAt_scratch'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	
  var where = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);

  var code;
  
  code = 'String('+text + ').charAt(Number('+where+')-1)';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['text_contain_scratch'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	
  var find = Blockly.JavaScript.valueToCode(block, 'FIND', Blockly.JavaScript.ORDER_ATOMIC);

  var code;
  
  code = 'String('+text + ').includes(String('+find+'))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['text_length_scratch'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";

  var code;
  
  code = 'String('+text + ').length';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['variables_get_other'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = VAR;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['variables_set_other'] = Blockly.JavaScript.forBlock['variables_set_local'];
Blockly.JavaScript['math_change_other'] = Blockly.JavaScript.forBlock['math_change'];

Blockly.JavaScript['variables_get_array'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = VAR;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['variables_get_array'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = VAR;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['list_addtolist_scratch'] = function(block) {
  var item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = VAR+'.push('+item+');\n';
  return code;
};

Blockly.JavaScript['list_itemoflist_scratch'] = function(block) {
  var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_FUNCTION_CALL);	
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = VAR+'['+index+'-1]';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['list_deletealloflist_scratch'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = VAR+' = [];\n';
  return code;
};

Blockly.JavaScript['list_lengthoflist_scratch'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var code = VAR+'.length';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['list_insertatlist_scratch'] = function(block) {
  var item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";		
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME); 
  var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_FUNCTION_CALL);  
  var code = VAR+'.splice('+index+'-1, 0, '+item+');\n';
  return code;
};

Blockly.JavaScript['list_replaceitemoflist_scratch'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	  
  var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_FUNCTION_CALL);  
  var code = VAR+'.splice('+index+'-1, 1, '+item+');\n';
  return code;
};

Blockly.JavaScript['list_deleteoflist_scratch'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_FUNCTION_CALL);  
  var code = VAR+'.splice('+index+'-1, 1);\n';
  return code;
};

Blockly.JavaScript['list_listcontainsitem_scratch'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	  
  var code = VAR+'.includes('+item+')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['list_itemnumoflist_scratch'] = function(block) {
  var VAR = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";	  
  var code = VAR+'.indexOf('+item+')+1';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};