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
'    <block type="controls_if_1_scratch"></block>'+
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
'    <block type="logic_compare"></block>'+
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
'    <block type="text_join">'+
'      <mutation items="2"></mutation>'+
'      <value name="ADD0">'+
'        <shadow type="text">'+
'          <field name="TEXT"></field>'+
'        </shadow>'+
'      </value>'+
'      <value name="ADD1">'+
'        <shadow type="text">'+
'          <field name="TEXT"></field>'+
'        </shadow>'+
'      </value>'+
'    </block>'+
'    <block type="text_charAt">'+
'    <value name="VALUE">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="AT">'+
'    <shadow type="math_number">'+
'    <field name="NUM">1</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_indexOf">'+
'    <value name="VALUE">'+
'    <shadow type="text">'+
'    <field name="TEXT">hello world</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="FIND">'+
'    <block type="text">'+
'    <field name="TEXT">world</field>'+
'    </block>'+
'    </value>'+
'    </block>'+
'    <block type="text_length">'+
'    <value name="VALUE">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    </category>'+
'</xml>';