// =====================================================
//  樣式設定（要換配色只要改這裡）
//  注意：題目內容放在 data-q='...' 裡，樣式中不可出現單引號
// =====================================================
const FONT = 'font-family: Microsoft JhengHei, PingFang TC, Noto Sans TC, sans-serif;';
const MONO = 'font-family: Consolas, Menlo, Courier New, monospace;';

// 題首：題號徽章 + 題目名稱
const qHeader = (no, name, tag) => `
<div style="${FONT} background: linear-gradient(135deg, #4a5d85, #66709a); color: #fff; padding: 16px 20px; border-radius: 12px; margin-bottom: 14px; box-shadow: 0 3px 10px rgba(60,70,100,0.18);">
<div style="font-size: 13px; opacity: 0.85; margin-bottom: 6px;">${tag}</div>
<span style="display: inline-block; background: #fff; color: #4a5d85; font-weight: bold; border-radius: 999px; padding: 2px 12px; margin-right: 10px; font-size: 15px; vertical-align: middle;">第 ${no} 題</span>
<span style="font-size: 24px; font-weight: bold; letter-spacing: 2px; vertical-align: middle;">${name}</span>
</div>`;

// 題目描述卡片
const desc = (html) => `
<div style="${FONT} font-size: 17px; line-height: 1.85; color: #1f2937; background: #ffffff; border: 1px solid #e5e7eb; border-left: 6px solid #7d8bb0; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;">
<div style="color: #4a5d85; font-weight: bold; font-size: 18px; margin-bottom: 6px;">📘 題目描述</div>
${html}
</div>`;

// 範例：輸入（藍）｜輸出（綠）＋ 說明（黃）
// data 只放在最後一個範例，保留原本隱藏的 {"data":[...]} 列供 loadExam() 使用
const sample = (i, input, output, explain, data) => `
<table style="${FONT} width: 100%; border-collapse: separate; border-spacing: 0; border: 2px solid #c7d2fe; border-radius: 10px; overflow: hidden; margin-bottom: 18px; font-size: 16px; background: #fff;">
<tr>
<td colspan="2" style="background: #eef2ff; color: #3730a3; font-weight: bold; font-size: 17px; padding: 8px 14px; border-bottom: 1px solid #c7d2fe;">🧪 範例 ${i}</td>
</tr>
<tr>
<td style="width: 50%; vertical-align: top; padding: 0; border-right: 1px solid #c7d2fe; background: #eff6ff;">
<div style="background: #3b82f6; color: #fff; padding: 4px 12px; font-weight: bold; font-size: 14px;">▶ 輸入</div>
<div style="${MONO} background: #eff6ff; color: #1e3a8a; padding: 10px 14px; line-height: 1.7; font-size: 17px;">${input}</div>
</td>
<td style="width: 50%; vertical-align: top; padding: 0; background: #ecfdf5;">
<div style="background: #10b981; color: #fff; padding: 4px 12px; font-weight: bold; font-size: 14px;">◀ 輸出</div>
<div style="${MONO} background: #ecfdf5; color: #065f46; padding: 10px 14px; line-height: 1.7; font-size: 17px;">${output}</div>
</td>
</tr>
${explain ? `<tr>
<td colspan="2" style="background: #fffbeb; border-top: 1px solid #c7d2fe; padding: 10px 14px; line-height: 1.85; color: #78350f;">
<b style="color: #b45309;">💡 說明</b><br>
${explain}
</td>
</tr>` : ''}
${data ? `<tr>
<td colspan="2" style="display:none">
${data}
</td>
</tr>` : ''}
</table>`;

// 題目描述中的「輸入說明／輸出說明」標籤
const LBL_IN = 'style="display: inline-block; background: #3b82f6; color: #fff; font-weight: bold; font-size: 14px; border-radius: 6px; padding: 1px 8px; margin-right: 6px;"';
const LBL_OUT = 'style="display: inline-block; background: #10b981; color: #fff; font-weight: bold; font-size: 14px; border-radius: 6px; padding: 1px 8px; margin-right: 6px;"';

// 題目內的小表格（例如短片場次表）
const TH = 'style="background: #7d8bb0; color: #fff; padding: 6px 14px; border: 1px solid #c7d2fe; text-align: center;"';
const TD = 'style="padding: 5px 14px; border: 1px solid #c7d2fe; text-align: center;"';
const TD_HL = 'style="padding: 5px 14px; border: 1px solid #c7d2fe; text-align: center; background: #fef3c7; font-weight: bold; color: #b45309;"';

// 題目列表的按鈕
// 按鈕維持原本瀏覽器預設外觀，只加上置中（用 !important 蓋過系統 CSS 對按鈕位置的設定）
const BTN_STYLE = 'width:100px !important; display:block !important; margin:0 auto !important; float:none !important; position:static !important; left:auto !important; right:auto !important; transform:none !important; box-sizing:border-box !important;';
// 每格都明確設定四邊框線，避免系統原本的 CSS（黑色直線）混進來
const CELL = 'padding: 10px 16px; text-align: center; vertical-align: middle; border: 0; color: #374151; background: #fff;';
const LIST_TH = (first) => `style="${CELL} background: #eef1f7; color: #3a4a6b; font-weight: bold; ${first ? 'width: 140px !important; min-width: 140px !important; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : 'border-left: 1px solid #dde2ec;'}"`;
const LIST_TD = (first) => `style="${CELL} border-top: 1px solid #e5e8ef; ${first ? 'width: 140px !important; min-width: 140px !important; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : 'border-left: 1px solid #e5e8ef;'}"`;
const ONCLICK = `document.getElementById("javascript_content").style.display = "block";document.getElementById("question_input").innerHTML = this.getAttribute("data-q");document.getElementById("question_input").scrollTop = 0;window.toggleImportQuestionForm(false);var iframe = document.getElementById("iframe_output");iframe.contentWindow.document.open();iframe.contentWindow.document.write("");iframe.contentWindow.document.close();iframe.focus();loadExam();`;

// =====================================================
//  題目列表
// =====================================================
let contest = `
<table id="importQuestionTable" style="${FONT} border-collapse: separate; border-spacing: 0; table-layout: auto !important; border: 1px solid #d6dbe6; border-radius: 10px; overflow: hidden; font-size: 16px; background: #fff;">
<tbody>
<tr>
<td ${LIST_TH(true)}>序號</td>
<td ${LIST_TH(false)}>分類</td>
<td ${LIST_TH(false)}>名稱</td>
</tr>
`;



// ---------------- 第 1 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("1", `魔法寶石的盤點`, `114基隆市國小組`)}
${desc(`
在遙遠的魔法王國裡，每一位見習魔法師都有一個專屬的寶石袋，裡面裝滿了各式各樣擁有不同魔力的「數字寶石」。每一顆寶石上都刻著一個編號，代表它的屬性 (例如：1 號是火、2 號是水、5 號是雷電...等等)。<br/>
今天，大法師想要考驗大家的細心程度。他會給你一個任務，請你檢查寶石袋裡所有的寶石，然後告訴大法師，某個「特定編號」的寶石，你總共收集到了幾顆？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行是一個整數 N，代表寶石袋裡總共有幾顆寶石。<br/>
第二行有 N 個整數，代表袋子裡每一顆寶石上的編號。<br/>
第三行是一個整數 K，代表大法師指定要查詢的「特定編號」。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表編號為 K 的寶石在袋子裡出現的總次數。
`)}
${sample(1,
`10<br/>
1 5 3 2 5 8 5 9 1 5<br/>
5`,
`4`,
`寶石袋裡共有 10 顆寶石，大法師要找的編號是 5。<br/>
編號 5 的寶石分別出現在第 2、5、7、10 的位置，總共有 4 顆。`)}
${sample(2,
`4<br/>
6 12 31 24<br/>
2`,
`0`,
`編號 2 的寶石並沒有在寶石袋裡，所以輸出 0。`)}
${sample(3,
`6<br/>
10 20 30 40 50 60<br/>
20`,
`1`,
``)}
${sample(4,
`5<br/>
1 1 1 1 1<br/>
1`,
`5`,
``)}
${sample(5,
`8<br/>
5 2 9 3 7 4 6 8<br/>
10`,
`0`,
``)}
${sample(6,
`7<br/>
3 3 5 3 5 5 3<br/>
3`,
`4`,
``)}
${sample(7,
`1<br/>
100<br/>
100`,
`1`,
``)}
${sample(8,
`1<br/>
100<br/>
99`,
`0`,
``)}
${sample(9,
`10<br/>
0 5 0 2 0 8 0 0 1 0<br/>
0`,
`6`,
``)}
${sample(10,
`12<br/>
1 2 3 4 5 6 7 8 9 10 11 12<br/>
7`,
`1`,
``)}
${sample(11,
`15<br/>
2 4 6 8 10 2 4 6 8 10 2 4 6 8 10<br/>
2`,
`3`,
``)}
${sample(12,
`20<br/>
7 7 7 8 8 9 9 9 9 1 2 3 7 7 8 8 9 5 5 4<br/>
9`,
`5`,
``,
`{"data": ["10;1;5;3;2;5;8;5;9;1;5;5;4", "4;6;12;31;24;2;0", "6;10;20;30;40;50;60;20;1", "5;1;1;1;1;1;1;5", "8;5;2;9;3;7;4;6;8;10;0", "7;3;3;5;3;5;5;3;3;4", "1;100;100;1", "1;100;99;0", "10;0;5;0;2;0;8;0;0;1;0;0;6", "12;1;2;3;4;5;6;7;8;9;10;11;12;7;1", "15;2;4;6;8;10;2;4;6;8;10;2;4;6;8;10;2;3", "20;7;7;7;8;8;9;9;9;9;1;2;3;7;7;8;8;9;5;5;4;9;5"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國小組</td>
<td ${LIST_TD(false)}>魔法寶石的盤點</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `遊戲績分排行榜`, `114基隆市國小組`)}
${desc(`
您正在開發一款簡單的益智遊戲。每次遊戲結束後，系統會記錄玩家的最終得分。為了激勵玩家，您需要編寫一個程式來快速計算並顯示當前所有紀錄中的前三名最高得分。如果總得分記錄數少於三筆，則輸出所有可用的得分。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行是一個整數 N (0 ≤ N ≤ 100)，表示玩家的總得分紀錄數；第二行是 N 個整數，代表每位玩家的得分 (0 ~ 1000)。N 為 0 時沒有第二行。<br/>
<span ${LBL_OUT}>輸出說明</span>由高到低輸出前三個最高的得分；如果得分紀錄少於三筆，則輸出所有得分。如果 N=0 (沒有任何紀錄)，則輸出「目前沒有績分」。
`)}
${sample(1,
`6<br/>
50 420 80 500 410 210`,
`500 420 410`,
`6 位玩家的分數中，前三名是 500 分、420 分以及 410 分。`)}
${sample(2,
`4<br/>
75 75 75 60`,
`75 75 75`,
`前三名都是 75 分。`)}
${sample(3,
`0`,
`目前沒有績分`,
`沒有玩家的得分紀錄，輸出「目前沒有績分」。`)}
${sample(4,
`1<br/>
99`,
`99`,
``)}
${sample(5,
`2<br/>
777 666`,
`777 666`,
``)}
${sample(6,
`3<br/>
18 520 18`,
`520 18 18`,
``,
`{"data": ["6;50;420;80;500;410;210;500;420;410", "4;75;75;75;60;75;75;75", "0;目前沒有績分", "1;99;99", "2;777;666;777;666", "3;18;520;18;520;18;18"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國小組</td>
<td ${LIST_TD(false)}>遊戲績分排行榜</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `隊伍的旋轉舞步`, `114基隆市國小組`)}
${desc(`
一年一度的運動會到了，六年級的同學們正在練習大會舞。一開始，N 位同學排成一直排，每個人身上都有一個號碼牌。當教練吹哨子並喊出一個數字 K 時，隊伍就要進行「向右旋轉移動」K 格。<br/>
「向右旋轉移動」規則：站在最右邊 (排尾) 的同學，要跑到最左邊 (排頭) 去。如果教練喊 K=1，代表所有人都往右走一步，而最後一位同學跑到第一個位置；如果教練喊 K=2，代表這個動作連續做兩次。<br/>
例如隊伍是 [1, 2, 3, 4, 5]，教練喊「向右移 2 格」：第一次移動後變成 [5, 1, 2, 3, 4]；第二次移動後變成 [4, 5, 1, 2, 3]。<br/>
請你寫一個程式，根據同學初始隊伍順序以及移動步數 K，算出最後大家站的位置順序。注意：教練喊出的步數 K 可能會比隊伍的人數還要多喔！<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行是一個整數 N，代表隊伍中共有幾位同學。<br/>
第二行有 N 個整數，代表一開始隊伍中同學的號碼順序。<br/>
第三行是一個整數 K，代表向右移動的步數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出移動完成後，新的隊伍號碼順序。
`)}
${sample(1,
`5<br/>
10 20 30 40 50<br/>
2`,
`40 50 10 20 30`,
`原本隊伍是 10 20 30 40 50。<br/>
向右移 1 格：50 10 20 30 40；向右移 2 格：40 50 10 20 30。`)}
${sample(2,
`4<br/>
1 3 5 7<br/>
6`,
`5 7 1 3`,
`原本隊伍是 1 3 5 7，向右移 4 格會回到原本的隊伍，<br/>
所以向右移 6 格等於向右移 2 格：5 7 1 3。`)}
${sample(3,
`5<br/>
10 20 30 40 50<br/>
1`,
`50 10 20 30 40`,
``)}
${sample(4,
`5<br/>
10 20 30 40 50<br/>
2`,
`40 50 10 20 30`,
``)}
${sample(5,
`3<br/>
1 2 3<br/>
3`,
`1 2 3`,
``)}
${sample(6,
`4<br/>
1 2 3 4<br/>
5`,
`4 1 2 3`,
``)}
${sample(7,
`5<br/>
1 2 3 4 5<br/>
0`,
`1 2 3 4 5`,
``)}
${sample(8,
`2<br/>
99 88<br/>
101`,
`88 99`,
``)}
${sample(9,
`1<br/>
5<br/>
10`,
`5`,
``)}
${sample(10,
`6<br/>
7 7 7 7 7 7<br/>
3`,
`7 7 7 7 7 7`,
``)}
${sample(11,
`7<br/>
1 2 3 4 5 6 7<br/>
4`,
`4 5 6 7 1 2 3`,
``)}
${sample(12,
`10<br/>
0 1 2 3 4 5 6 7 8 9<br/>
15`,
`5 6 7 8 9 0 1 2 3 4`,
``,
`{"data": ["5;10;20;30;40;50;2;40;50;10;20;30", "4;1;3;5;7;6;5;7;1;3", "5;10;20;30;40;50;1;50;10;20;30;40", "5;10;20;30;40;50;2;40;50;10;20;30", "3;1;2;3;3;1;2;3", "4;1;2;3;4;5;4;1;2;3", "5;1;2;3;4;5;0;1;2;3;4;5", "2;99;88;101;88;99", "1;5;10;5", "6;7;7;7;7;7;7;3;7;7;7;7;7;7", "7;1;2;3;4;5;6;7;4;4;5;6;7;1;2;3", "10;0;1;2;3;4;5;6;7;8;9;15;5;6;7;8;9;0;1;2;3;4"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國小組</td>
<td ${LIST_TD(false)}>隊伍的旋轉舞步</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `找出連續整數中所缺失的數字`, `114基隆市國小組`)}
${desc(`
有一位剛學數字的小朋友，他喜歡在紙上書寫連續數字，但是在書寫的過程中經常會有數字被他遺漏，例如 3、4、7、10，表示他從 3 寫到 10，但中間遺漏了 5、6、8、9 等 4 個數字。請你當小老師，設計程式找出這位小朋友在連續數字當中缺失的數字。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個整數 N，代表小朋友所寫的數字個數；第二行輸入 N 個整數，數值介於 0 到 200 之間 (不一定排序，可能重複)。<br/>
<span ${LBL_OUT}>輸出說明</span>以輸入數列中的最小值與最大值為範圍，由小到大輸出缺失的數值；若無缺失則輸出「無缺失」。
`)}
${sample(1,
`3<br/>
1 3 5`,
`2 4`,
`最小是 1，最大是 5，中間缺了 2 及 4 兩個數字。`)}
${sample(2,
`3<br/>
100 101 102`,
`無缺失`,
`100、101、102 是完整的連續數字，中間沒有缺失。`)}
${sample(3,
`4<br/>
3 4 4 6`,
`5`,
`最小是 3、最大是 6，雖然 4 重複寫了 2 個但沒有關係，缺的數字是 5。`)}
${sample(4,
`5<br/>
7 9 15 18 19`,
`8 10 11 12 13 14 16 17`,
``)}
${sample(5,
`3<br/>
90 87 85`,
`86 88 89`,
``)}
${sample(6,
`4<br/>
10 3 7 4`,
`5 6 8 9`,
``)}
${sample(7,
`1<br/>
5`,
`無缺失`,
``,
`{"data": ["3;1;3;5;2;4", "3;100;101;102;無缺失", "4;3;4;4;6;5", "5;7;9;15;18;19;8;10;11;12;13;14;16;17", "3;90;87;85;86;88;89", "4;10;3;7;4;5;6;8;9", "1;5;無缺失"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國小組</td>
<td ${LIST_TD(false)}>找出連續整數中所缺失的數字</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `數學王國的連續階梯`, `114基隆市國小組`)}
${desc(`
在數學王國裡，有一座通往天空的神秘城堡。城堡的大門上只有一個巨大的數字螢幕，顯示著一個目標數字 N。<br/>
傳說中，想要打開這扇門，必須找到一組或多組「連續的正整數階梯」，這些階梯上的數字加起來的總和，必須剛好等於門上的數字 N。<br/>
例如，如果門上的數字是 15，你可以找到以下 3 組階梯：<br/>
1. 1 2 3 4 5 (因為 1+2+3+4+5=15)<br/>
2. 4 5 6 (因為 4+5+6=15)<br/>
3. 7 8 (因為 7+8=15)<br/>
請注意，階梯至少要由兩個數字組成 (不能只有一個數字)，而且必須是連續的正整數。請你寫一個程式，列出所有能夠湊出目標數字 N 的連續正整數組合。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數 N (本題測資 2 ≤ N ≤ 500)。<br/>
<span ${LBL_OUT}>輸出說明</span>每一組組合輸出一行字串，格式為「數字 + 數字 + ... = N」(例如：7 + 8 = 15)，依照起始數字由小到大排列。如果找不到任何一組符合條件的連續整數，則輸出 No。
`)}
${sample(1,
`15`,
`1 + 2 + 3 + 4 + 5 = 15<br/>
4 + 5 + 6 = 15<br/>
7 + 8 = 15`,
`連續整數加起來是 15 的有三組，依起始數字由小到大輸出。`)}
${sample(2,
`4`,
`No`,
`4 只能 1+3 或 2+2，沒有辦法用兩個以上的連續整數相加，所以輸出 No。`)}
${sample(3,
`15`,
`1 + 2 + 3 + 4 + 5 = 15<br/>
4 + 5 + 6 = 15<br/>
7 + 8 = 15`,
``)}
${sample(4,
`10`,
`1 + 2 + 3 + 4 = 10`,
``)}
${sample(5,
`3`,
`1 + 2 = 3`,
``)}
${sample(6,
`9`,
`2 + 3 + 4 = 9<br/>
4 + 5 = 9`,
``)}
${sample(7,
`100`,
`9 + 10 + 11 + 12 + 13 + 14 + 15 + 16 = 100<br/>
18 + 19 + 20 + 21 + 22 = 100`,
``)}
${sample(8,
`2`,
`No`,
``)}
${sample(9,
`4`,
`No`,
``)}
${sample(10,
`21`,
`1 + 2 + 3 + 4 + 5 + 6 = 21<br/>
6 + 7 + 8 = 21<br/>
10 + 11 = 21`,
``)}
${sample(11,
`27`,
`2 + 3 + 4 + 5 + 6 + 7 = 27<br/>
8 + 9 + 10 = 27<br/>
13 + 14 = 27`,
``)}
${sample(12,
`35`,
`2 + 3 + 4 + 5 + 6 + 7 + 8 = 35<br/>
5 + 6 + 7 + 8 + 9 = 35<br/>
17 + 18 = 35`,
``,
`{"data": ["15;1 + 2 + 3 + 4 + 5 = 15;4 + 5 + 6 = 15;7 + 8 = 15", "4;No", "15;1 + 2 + 3 + 4 + 5 = 15;4 + 5 + 6 = 15;7 + 8 = 15", "10;1 + 2 + 3 + 4 = 10", "3;1 + 2 = 3", "9;2 + 3 + 4 = 9;4 + 5 = 9", "100;9 + 10 + 11 + 12 + 13 + 14 + 15 + 16 = 100;18 + 19 + 20 + 21 + 22 = 100", "2;No", "4;No", "21;1 + 2 + 3 + 4 + 5 + 6 = 21;6 + 7 + 8 = 21;10 + 11 = 21", "27;2 + 3 + 4 + 5 + 6 + 7 = 27;8 + 9 + 10 = 27;13 + 14 = 27", "35;2 + 3 + 4 + 5 + 6 + 7 + 8 = 35;5 + 6 + 7 + 8 + 9 = 35;17 + 18 = 35"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國小組</td>
<td ${LIST_TD(false)}>數學王國的連續階梯</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `平均分配物品`, `114基隆市國小組`)}
${desc(`
陳老師有 N 種不同種類及不同數量的文具，所有的文具都要平分給小朋友，讓每位小朋友分到的每一種文具的數量要一樣多。按照這樣的分法，請問老師準備的 N 種文具最多可以分給幾位小朋友？<br/>
例如：陳老師有 3 種文具，分別是鉛筆 12 枝、橡皮擦 36 個、筆記本 15 本，所有的文具都分完，最多可以分給 3 個小朋友，每個人有鉛筆 4 枝、橡皮擦 12 個、筆記本 5 本。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個整數 N，為老師所準備的文具種類；第二行輸入 N 個整數，為各種文具的數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出可分給小朋友的最多人數。
`)}
${sample(1,
`2<br/>
15 45`,
`15`,
`有 2 種文具，A 文具有 15 份，B 文具有 45 份，最多可分給 15 位小朋友。`)}
${sample(2,
`3<br/>
24 16 12`,
`4`,
`有 3 種文具，分別有 24、16、12 份，最多可分給 4 位小朋友。`)}
${sample(3,
`2<br/>
2 9`,
`1`,
`有 2 種文具，分別有 2、9 份，最多可分給 1 位小朋友。`)}
${sample(4,
`1<br/>
8`,
`8`,
``)}
${sample(5,
`3<br/>
100 200 1`,
`1`,
``)}
${sample(6,
`3<br/>
6 6 6`,
`6`,
``,
`{"data": ["2;15;45;15", "3;24;16;12;4", "2;2;9;1", "1;8;8", "3;100;200;1;1", "3;6;6;6;6"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國小組</td>
<td ${LIST_TD(false)}>平均分配物品</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
