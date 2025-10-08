var catSystemScratch = '<xml>'+
'    <category name="%{BKY_CATSCRATCH1}" colour="%{BKY_CATSCRATCH1_HUE}">'+
'    <block type="javascript_start_scratch">'+
'    </block>'+
'    <block type="javascript_data_input_scratch">'+
'    <value name="TEXT">'+
'    <block type="text_noquotes">'+
'    <field name="TEXT"></field>'+
'    </block>'+
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
'    <block type="controls_if_1_scratch"></block>'+
'    <block type="controls_if_2_scratch">'+
'    </block>'+
'    <block type="controls_repeat_ext">'+
'    <value name="TIMES">'+
'    <shadow type="math_number">'+
'    <field name="NUM">10</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="controls_whileUntil">'+
'    <field name="MODE">WHILE</field>'+
'    </block>'+
'    <block type="controls_whileUntil">'+
'    <field name="MODE">UNTIL</field>'+
'    </block>'+
'    <block type="controls_flow_statements"></block>'+
'    </category>'+
'</xml>';