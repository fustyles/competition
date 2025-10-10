var catSystemScratch = '<xml>'+
'    <category name="%{BKY_CATSCRATCH1}" colour="%{BKY_CATSCRATCH1_HUE}">'+
'    <block type="javascript_start_scratch">'+
'    </block>'+
'    <block type="javascript_data_input_scratch">'+
'    <value name="TEXT">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT"></field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="javascript_data_input_get_scratch">'+
'    </block>'+
'    <block type="javascript_data_output_scratch">'+
'    <value name="TEXT">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT"></field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    </category>'+
'    <category name="%{BKY_CATSCRATCH2}" colour="%{BKY_CATSCRATCH2_HUE}">'+
'    <block type="controls_if_1_scratch">'+
'    </block>'+
'    <block type="controls_if_2_scratch">'+
'    </block>'+
'    <block type="controls_repeat_ext_scratch">'+
'    <value name="TIMES">'+
'    <shadow type="math_number">'+
'    <field name="NUM">10</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="controls_whileUntil_scratch">'+
'    <field name="MODE">WHILE</field>'+
'    </block>'+
'    <block type="controls_whileUntil_scratch">'+
'    <field name="MODE">UNTIL</field>'+
'    </block>'+
'    <block type="controls_flow_statements_scratch"></block>'+
'    </category>'+
'    <category name="%{BKY_CATSCRATCH3}" colour="%{BKY_CATSCRATCH3_HUE}">'+
'    <block type="logic_boolean"></block>'+
'    <block type="logic_compare">'+
'    <value name="A">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">0</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="B">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">0</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="logic_operation"></block>'+
'    <block type="logic_negate"></block>'+
'    <block type="math_arithmetic">'+
'    <value name="A">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">0</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="B">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">0</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_single">'+
'    <value name="NUM">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">9</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_round">'+
'    <value name="NUM">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">3.1</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_modulo">'+
'    <value name="DIVIDEND">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">64</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="DIVISOR">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">10</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_random_int">'+
'    <value name="FROM">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">1</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="TO">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">100</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_join_scratch">'+
'    <value name="VALUE1">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="VALUE2">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">def</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_charAt_scratch">'+
'    <value name="VALUE">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="WHERE">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">1</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_contain_scratch">'+
'    <value name="VALUE">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">hello world</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="FIND">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">world</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_length_scratch">'+
'    <value name="VALUE">'+
'    <shadow type="text_noquotes">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    </category>'+
'    <category name="%{BKY_CATVARIABLES}" colour="%{BKY_VARIABLES_HUE}" custom="MYVARIABLE"></category>'+
'    <category name="%{BKY_CATSCRATCH5}" colour="%{BKY_CATSCRATCH5_HUE}" custom="MYLIST"></category>'+
'    <category name="%{BKY_CATFUNCTIONS}" colour="%{BKY_PROCEDURES_HUE}" custom="MYFUNCTION"></category>'+
'</xml>';