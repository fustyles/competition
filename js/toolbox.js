var catSystem = '<xml>'+
'    <category name="%{BKY_CATEVENTS}" colour="%{BKY_LOGIC_HUE}">'+
'    <block type="javascript_data_output">'+
'    <value name="TEXT">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="javascript_data_input">'+
'    <value name="TEXT">'+
'    <shadow type="text">'+
'    <field name="TEXT"></field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    </category>'+
'    <category name="%{BKY_CATLOGIC}" colour="%{BKY_LOGIC_HUE}">'+
'    <block type="controls_if"></block>'+
'    <block type="logic_compare"></block>'+
'    <block type="logic_operation"></block>'+
'    <block type="logic_negate"></block>'+
'    <block type="logic_boolean"></block>'+
'    <block type="logic_null"></block>'+
'    <block type="logic_ternary"></block>'+
'    </category>'+
'    <category name="%{BKY_CATLOOPS}" colour="%{BKY_LOOPS_HUE}">'+
'    <block type="controls_repeat_ext">'+
'    <value name="TIMES">'+
'    <shadow type="math_number">'+
'    <field name="NUM">10</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="controls_whileUntil"></block>'+
'    <block type="controls_for">'+
'    <value name="FROM">'+
'    <shadow type="math_number">'+
'    <field name="NUM">1</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="TO">'+
'    <shadow type="math_number">'+
'    <field name="NUM">10</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="BY">'+
'    <shadow type="math_number">'+
'    <field name="NUM">1</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="controls_forEach"></block>'+
'    <block type="controls_flow_statements"></block>'+
'    </category>'+
'    <category name="%{BKY_CATMATH}" colour="%{BKY_MATH_HUE}">'+
'    <block type="math_number">'+
'    <field name="NUM">0</field>'+
'    </block>'+
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
'    <block type="math_trig">'+
'    <value name="NUM">'+
'    <shadow type="math_number">'+
'    <field name="NUM">45</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="math_constant"></block>'+
'    <block type="math_number_property">'+
'    <value name="NUMBER_TO_CHECK">'+
'    <shadow type="math_number">'+
'    <field name="NUM">0</field>'+
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
'    <block type="math_on_list"></block>'+
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
'    <block type="math_constrain">'+
'    <value name="VALUE">'+
'    <shadow type="math_number">'+
'    <field name="NUM">50</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="LOW">'+
'    <shadow type="math_number">'+
'    <field name="NUM">1</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="HIGH">'+
'    <shadow type="math_number">'+
'    <field name="NUM">100</field>'+
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
'    <block type="math_random_float"></block>'+
'    </category>'+
'    <category name="%{BKY_CATTEXT}" colour="%{BKY_TEXTS_HUE}">'+
'    <block type="text"></block>'+
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
'    <block type="text_append">'+
'    <value name="TEXT">'+
'    <shadow type="text"></shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_length">'+
'    <value name="VALUE">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_isEmpty">'+
'    <value name="VALUE">'+
'    <shadow type="text">'+
'    <field name="TEXT"></field>'+
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
'    <block type="text_getSubstring">'+
'    <value name="STRING">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="AT1">'+
'    <shadow type="math_number">'+
'    <field name="NUM">1</field>'+
'    </shadow>'+
'    </value>'+
'    <value name="AT2">'+
'    <shadow type="math_number">'+
'    <field name="NUM">2</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_changeCase">'+
'    <value name="TEXT">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="text_trim">'+
'    <value name="TEXT">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="javascript_data_output">'+
'    <value name="TEXT">'+
'    <shadow type="text">'+
'    <field name="TEXT">abc</field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    <block type="javascript_data_input">'+
'    <value name="TEXT">'+
'    <shadow type="text">'+
'    <field name="TEXT"></field>'+
'    </shadow>'+
'    </value>'+
'    </block>'+
'    </category>'+
'    <category name="%{BKY_CATLISTS}" colour="%{BKY_LISTS_HUE}">'+
'    <block type="lists_create_with">'+
'    <mutation items="0"></mutation>'+
'    </block>'+
'    <block type="lists_create_with"></block>'+
'    <block type="lists_repeat">'+
'    <value name="NUM">'+
'    </value>'+
'    </block>'+
'    <block type="lists_length"></block>'+
'    <block type="lists_isEmpty"></block>'+
'    <block type="lists_indexOf">'+
'    <value name="VALUE">'+
'    </value>'+
'    </block>'+
'    <block type="lists_getIndex">'+
'    <value name="VALUE">'+
'    </value>'+
'    </block>'+
'    <block type="lists_setIndex">'+
'    <value name="LIST">'+
'    </value>'+
'    </block>'+
'    <block type="lists_getSublist">'+
'    <value name="LIST">'+
'    </value>'+
'    </block>'+
'    <block type="lists_sort"></block>'+
'    <block type="lists_split">'+
'    <value name="DELIM">'+
'    </value>'+
'    </block>'+
'    <block type="lists_reverse">'+
'    <value name="LIST">'+
'    </value>'+
'    </block>'+
'    </category>'+
'    <category name="%{BKY_CATVARIABLES}" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>'+
'    <category name="%{BKY_CATFUNCTIONS}" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></category>'+
'</xml>';
