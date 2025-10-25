Blockly.JavaScript['javascript_data_input'] = function(block) {	
	Blockly.JavaScript.definitions_['javascript_data_input'] = 'function variable_input (msg, type) {\n'+
	'  var input;\n'+
	'  if (input === null) {\n'+
	'      input = "";\n'+
	'  }\n'+
	'  if (type=="NUMBER")\n'+
	'    input = Number(prompt(msg));\n'+
	'  else\n'+
	'  	input = prompt(msg);\n'+
	'  document.body.insertAdjacentHTML("beforeend", msg+"："+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+
	'  return input;\n'+
	'}';

	var type = block.getFieldValue('type');
	var TEXT = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC)|| "''";	
	var code = 'variable_input('+TEXT+', "'+type+'")';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['javascript_data_output'] = function(block) {
	Blockly.JavaScript.definitions_['javascript_data_output'] = 'function data_output (msg, text) {\n'+
	'  document.body.insertAdjacentHTML("beforeend", msg+"："+String(text).replace(/ /g,"&nbsp;")+"<br>");\n'+
	'}';	
	var TEXT = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC)|| "''";
	var code = 'data_output("'+Blockly.Msg["JAVASCRIPT_DATA_OUTPUT"]+'",'+TEXT+');\n';	
	return code;
};
Blockly.JavaScript['javascript_data_output_scratch'] = Blockly.JavaScript['javascript_data_output'];

Blockly.JavaScript['javascript_start_scratch'] = function(block) {
	return '';
};

Blockly.JavaScript['javascript_data_input_scratch'] = function(block) {		
	Blockly.JavaScript.definitions_['javascript_data_input_data'] = 'var input_data;';	
	Blockly.JavaScript.definitions_['javascript_data_input'] = 'function variable_input (msg) {\n'+
	'  var input = prompt(msg);\n'+
	'  if (input === null) {\n'+
	'      input = "";\n'+
	'  }\n'+	
	'  document.body.insertAdjacentHTML("beforeend", msg+"："+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+
	'  if (!isNaN(input) && input.trim() !== "")\n'+
	'      input = Number(input);\n'+
	'  return input;\n'+
	'}';

	var TEXT = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC)|| "''";	
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
  
  code = text1+'+'+text2;
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

Blockly.JavaScript['variables_get_boolean'] = function(block) {
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

//Blockly.JavaScript['javascript_procedures_defnoreturn_scratch'] = Blockly.JavaScript.forBlock['procedures_defnoreturn'];

Blockly.JavaScript['javascript_procedures_defnoreturn_scratch'] = function(block, generator) {
    const functionName = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('NAME'), "PROCEDURE");

    const varNames = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        varNames.push(generator.nameDB_.getName(variables[i], "VARIABLE"));
    }
    const parameterString = varNames.join(', ');

	const nextBlock = block.getNextBlock();
	if (nextBlock)
		var statements = Blockly.JavaScript.blockToCode(nextBlock);
	else
		var statements = "";

    let functionCode = `function ${functionName}(${parameterString}) {\n${statements}}`;

    if (functionCode.includes("await ")) {
        functionCode = `async ${functionCode}`;
    }
    
    const finalCode = generator.scrub_(block, functionCode);

    generator.definitions_["%" + functionName] = finalCode;

    return null;
};


Blockly.JavaScript['javascript_procedures_callnoreturn_scratch'] = Blockly.JavaScript.forBlock['procedures_callnoreturn'];

/*
Blockly.JavaScript['javascript_procedures_defnoreturn_scratch'] = function(block) {
  const generator = Blockly.JavaScript;
  
  const procedureName = generator.nameDB_.getName(
      block.getFieldValue('NAME'),
      Blockly.Names.NameType.PROCEDURE
  );

  let statementPrefixCode = '';
  if (generator.STATEMENT_PREFIX) {
    statementPrefixCode += generator.injectId(generator.STATEMENT_PREFIX, block);
  }
  if (generator.STATEMENT_SUFFIX) {
    statementPrefixCode += generator.injectId(generator.STATEMENT_SUFFIX, block);
  }
  if (statementPrefixCode) {
    statementPrefixCode = generator.prefixLines(statementPrefixCode, generator.INDENT);
  }

  let loopTrapCode = '';
  if (generator.INFINITE_LOOP_TRAP) {
    loopTrapCode = generator.prefixLines(generator.injectId(generator.INFINITE_LOOP_TRAP, block), generator.INDENT);
  }
  
  const branchCode = generator.statementToCode(block, 'STACK');
  
  const variableNames = [];
  const argumentVarModels = block.getVars();
  
  for (let i = 0; i < argumentVarModels.length; i++) {
    variableNames[i] = generator.nameDB_.getName(
        argumentVarModels[i],
        Blockly.Names.NameType.VARIABLE
    );
  }

  let code = 'function ' + procedureName + '(' + variableNames.join(', ') + ') {\n' +
      statementPrefixCode + 
      loopTrapCode + 
      branchCode + 
      '}';

  if (code.includes('await ')) {
    code = 'async ' + code;
  }
  
  code = generator.scrub_(block, code);
  generator.definitions_['%' + procedureName] = code;
  return null;
};
*/