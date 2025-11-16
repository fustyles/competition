var catSystemScratch = '<xml>'+
'    <category css-icon="customIcon fa fa-cog" name="%{BKY_CATSCRATCH1}" categorystyle="events_category">'+
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
'    <category name="%{BKY_CATSCRATCH2}" categorystyle="loop_category">'+
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
'    <category name="%{BKY_CATSCRATCH3}" categorystyle="logic_category">'+
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
'    <shadow type="math_number">'+
'    <field name="NUM">0</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="B">'+
'    <shadow type="math_number">'+
'    <field name="NUM">0</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_single">'+
'    <value name="NUM">'+
'    <shadow type="math_number">'+
'    <field name="NUM">9</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_round">'+
'    <value name="NUM">'+
'    <shadow type="math_number">'+
'    <field name="NUM">3.1</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_modulo">'+
'    <value name="DIVIDEND">'+
'    <shadow type="math_number">'+
'    <field name="NUM">64</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="DIVISOR">'+
'    <shadow type="math_number">'+
'    <field name="NUM">10</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_random_int">'+
'    <value name="FROM">'+
'    <shadow type="math_number">'+
'    <field name="NUM">1</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="TO">'+
'    <shadow type="math_number">'+
'    <field name="NUM">100</field>'+
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
'    <shadow type="math_number">'+
'    <field name="NUM">1</field>'+
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
'    <category name="%{BKY_CATSCRATCH4}" categorystyle="variable_category" custom="MYVARIABLE"></category>'+
'    <category name="%{BKY_CATSCRATCH5}" categorystyle="list_category" custom="MYLIST"></category>'+
'    <category name="%{BKY_CATSCRATCH6}" categorystyle="procedure_category" custom="MYFUNCTION"></category>'+
'    <category name="%{BKY_CATSCRATCH7}" categorystyle="element_category" elementname="autoclose"></category>'+
'</xml>';