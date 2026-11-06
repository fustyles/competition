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
${qHeader("1", `個人綜合所得稅試算`, `114嘉義縣國小組`)}
${desc(`
為了協助民眾了解所得稅的基本計算方式，財政單位設計了一個簡化的個人綜合所得稅試算系統。某位民眾一整年的課稅所得以「萬元」為單位，系統依照下列累進稅率級距計算應繳的所得稅金額：<br/>
1. 所得 1 ~ 30 萬元之間，稅率為 5%。<br/>
2. 所得超過 30 萬：前 30 萬扣稅 15000 元，31 ~ 60 萬元之間的部分稅率為 10%。<br/>
3. 所得超過 60 萬：前 60 萬扣稅 45000 元，61 ~ 100 萬元之間的部分稅率為 15%。<br/>
4. 所得超過 100 萬：前 100 萬扣稅 105000 元，101 萬元以上的部分稅率為 20%。<br/>
本題為教學用簡化模型，不考慮扣除額、免稅額或其他費用。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表個人全年課稅所得 (單位：萬元，1 以上)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應繳的所得稅金額 (單位：元)。
`)}
${sample(1,
`20`,
`10000`,
`全年課稅所得為 20 萬元，適用稅率 5%：20 × 10000 × 0.05 = 10000 元。`)}
${sample(2,
`55`,
`40000`,
`前 30 萬元扣稅 15000 元；31 ~ 55 萬元 (25 萬元) 稅率 10%，扣稅 25000 元。合計 40000 元。`)}
${sample(3,
`10`,
`5000`,
``)}
${sample(4,
`30`,
`15000`,
``)}
${sample(5,
`40`,
`25000`,
``)}
${sample(6,
`80`,
`75000`,
``)}
${sample(7,
`120`,
`145000`,
``,
`{"data": ["20;10000", "55;40000", "10;5000", "30;15000", "40;25000", "80;75000", "120;145000"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>個人綜合所得稅試算</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `跳馬比賽成績計算`, `114嘉義縣國小組`)}
${desc(`
跳馬比賽為求公平性，決議去除評審中較極端的成績。比賽會依賽制等級不同，聘用五至十位不等的評審，各自給予參賽者 0 至 10 分的評價。參賽者的最終得分計算方式如下：<br/>
1. 讀入 N 位評審的分數 (未排序)。<br/>
2. 扣除最高分與最低分各一筆 (若有多筆，只刪除其中一筆)。<br/>
3. 將剩餘分數取平均，並四捨五入至整數。<br/>
請撰寫程式，依照輸入的評審分數，計算並輸出參賽者的最終得分。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N (5 ≤ N ≤ 10)；第二行輸入 N 個整數 (0 ~ 10)，代表評審分數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表去除最高與最低分後的平均得分 (四捨五入至整數)。
`)}
${sample(1,
`5<br/>
9 8 10 6 7`,
`8`,
`刪除最高分 10 與最低分 6，剩下 9、8、7，平均為 (9+8+7) ÷ 3 = 8。`)}
${sample(2,
`5<br/>
5 5 8 9 10`,
`7`,
`刪除最高分 10 與最低分 5，剩下 5、8、9，平均為 (5+8+9) ÷ 3 ≈ 7.33，四捨五入為 7。`)}
${sample(3,
`5<br/>
10 10 10 10 10`,
`10`,
``)}
${sample(4,
`5<br/>
5 5 7 7 10`,
`6`,
``)}
${sample(5,
`5<br/>
9 9 9 10 10`,
`9`,
``)}
${sample(6,
`5<br/>
7 7 8 8 6`,
`7`,
``,
`{"data": ["5;9;8;10;6;7;8", "5;5;5;8;9;10;7", "5;10;10;10;10;10;10", "5;5;5;7;7;10;6", "5;9;9;9;10;10;9", "5;7;7;8;8;6;7"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>跳馬比賽成績計算</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `動態密碼轉換`, `114嘉義縣國小組`)}
${desc(`
小明設計了一種英文字元密碼環編碼規則，密碼環為：abcdefghijklmnopqrstuvwxyz<br/>
編碼規則說明：<br/>
1. 第一行輸入一個整數 N，代表位移值。<br/>
2. 第二行輸入一個由小寫英文字母 (a ~ z) 組成的字串。<br/>
3. 編碼時，字串中的每一個字元皆依密碼環「往後」移動 N 個位置。<br/>
4. 若位移後超出密碼環尾端，則從密碼環開頭繼續計算 (環狀結構)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N (0 ≤ N ≤ 100)；第二行輸入一個字串，僅包含小寫英文字母 a ~ z。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一行字串，代表加密後的結果。
`)}
${sample(1,
`2<br/>
banana`,
`dcpcpc`,
`b → d，a → c，n → p，每個字元皆往後移動 2 個位置。`)}
${sample(2,
`0<br/>
abc`,
`abc`,
``)}
${sample(3,
`1<br/>
xyz`,
`yza`,
``)}
${sample(4,
`26<br/>
hello`,
`hello`,
``)}
${sample(5,
`28<br/>
az`,
`cb`,
``)}
${sample(6,
`100<br/>
a`,
`w`,
``,
`{"data": ["2;banana;dcpcpc", "0;abc;abc", "1;xyz;yza", "26;hello;hello", "28;az;cb", "100;a;w"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>動態密碼轉換</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `籃球機得分計算`, `114嘉義縣國小組`)}
${desc(`
雙打籃球機在每場遊戲中提供 1P、2P 兩位玩家 5 ~ 10 次不等的投籃機會。每投進 1 球得 1 分，未投進得 0 分。<br/>
若某次投籃進球，且「前一次投籃也進球」，則該次投籃得 3 分；若進球但前一次未進球 (或為第一球)，則得 1 分。<br/>
請寫程式模擬籃球機的得分計算，輸入每次投籃結果 (1 表示進球，0 表示未進)，輸出兩位玩家單場遊戲的總得分，以及獲勝的玩家名稱 (1P、2P，若同分則顯示「不分勝負」)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入整數 N (5 ~ 10)。<br/>
第二行輸入 N 個整數 (0 或 1)，代表 1P 玩家每次投籃是否命中。<br/>
第三行輸入 N 個整數 (0 或 1)，代表 2P 玩家每次投籃是否命中。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 1P 總分、2P 總分、勝出玩家名稱。
`)}
${sample(1,
`5<br/>
1 0 1 1 0<br/>
0 1 1 1 1`,
`5 10 2P`,
`1P 得分：1 + 0 + 1 + 3 + 0 = 5；2P 得分：0 + 1 + 3 + 3 + 3 = 10。2P 勝出。`)}
${sample(2,
`7<br/>
1 0 1 1 0 1 0<br/>
0 1 1 0 1 0 1`,
`6 6 不分勝負`,
`1P 得分：1 + 0 + 1 + 3 + 0 + 1 + 0 = 6；2P 得分：0 + 1 + 3 + 0 + 1 + 0 + 1 = 6。同分，不分勝負。`)}
${sample(3,
`5<br/>
0 1 0 1 0<br/>
0 0 0 0 0`,
`2 0 1P`,
``)}
${sample(4,
`6<br/>
1 1 1 0 1 0<br/>
0 1 1 1 1 0`,
`8 10 2P`,
``)}
${sample(5,
`9<br/>
0 1 0 1 0 1 0 1 0<br/>
0 0 0 0 0 0 0 0 0`,
`4 0 1P`,
``)}
${sample(6,
`8<br/>
1 1 0 1 1 0 1 1<br/>
1 1 1 0 1 1 1 0`,
`12 14 2P`,
``)}
${sample(7,
`7<br/>
1 1 0 1 1 0 1<br/>
1 1 0 1 1 0 1`,
`9 9 不分勝負`,
``,
`{"data": ["5;1;0;1;1;0;0;1;1;1;1;5;10;2P", "7;1;0;1;1;0;1;0;0;1;1;0;1;0;1;6;6;不分勝負", "5;0;1;0;1;0;0;0;0;0;0;2;0;1P", "6;1;1;1;0;1;0;0;1;1;1;1;0;8;10;2P", "9;0;1;0;1;0;1;0;1;0;0;0;0;0;0;0;0;0;0;4;0;1P", "8;1;1;0;1;1;0;1;1;1;1;1;0;1;1;1;0;12;14;2P", "7;1;1;0;1;1;0;1;1;1;0;1;1;0;1;9;9;不分勝負"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>籃球機得分計算</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `無人搬運車運送計算`, `114嘉義縣國小組`)}
${desc(`
智慧工廠中使用一輛無人搬運車 (AGV)，負責將零件從倉庫運送到生產線。由於安全與設備限制，每一趟無人搬運車的最大可承載重量為 200 公斤。<br/>
零件會依照完成檢驗的順序排隊裝載，無人搬運車會依序將零件放上車並累加重量。若某一件零件放上車後，累計重量超過 200 公斤，則該零件不放入本趟車次，無人搬運車立刻出發，該零件改由下一趟車次運送。<br/>
請根據輸入的零件重量資料，計算無人搬運車需要出發幾趟，才能將所有零件依序安全運送完成。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行：一個整數 N，代表零件的件數；第二行：N 個整數，代表每件零件的重量 (公斤)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表無人搬運車需要出發的趟數。
`)}
${sample(1,
`6<br/>
50 60 40 70 90 30`,
`2`,
`第一趟：50+60+40 = 150，下一件 70 加入會超過 200 → 出發。第二趟：70+90+30 = 190 → 出發。共需要 2 趟。`)}
${sample(2,
`5<br/>
80 90 60 30 40`,
`2`,
`第一趟：80+90 = 170，下一件 60 加入會超過 200 → 出發。第二趟：60+30+40 = 130 → 出發。共需要 2 趟。`)}
${sample(3,
`9<br/>
50 60 40 70 90 30 80 90 60`,
`4`,
``)}
${sample(4,
`5<br/>
100 50 60 70 80`,
`3`,
``)}
${sample(5,
`3<br/>
100 100 100`,
`2`,
``)}
${sample(6,
`1<br/>
100`,
`1`,
``,
`{"data": ["6;50;60;40;70;90;30;2", "5;80;90;60;30;40;2", "9;50;60;40;70;90;30;80;90;60;4", "5;100;50;60;70;80;3", "3;100;100;100;2", "1;100;1"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>無人搬運車運送計算</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `寶可夢訓練師-1 平均等級`, `114嘉義縣國小組`)}
${desc(`
你是一位剛成為寶可夢訓練師的新手，正在整理你抓到的寶可夢資料，想設計一個程式幫助你分析寶可夢的資料。<br/>
請設計一個程式，輸入多隻寶可夢的等級，計算並輸出牠們的平均等級 (無條件捨去至整數)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個整數 N，代表寶可夢的數量 (1 ≤ N ≤ 20)；第二行輸入 N 個整數，分別代表每隻寶可夢的等級 (1 ≤ 等級 ≤ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所有寶可夢等級的平均值 (無條件捨去)。
`)}
${sample(1,
`4<br/>
10 20 30 40`,
`25`,
`平均值 = (10+20+30+40) ÷ 4 = 25。`)}
${sample(2,
`3<br/>
7 8 10`,
`8`,
`平均值 = 25 ÷ 3 = 8.33，無條件捨去後為 8。`)}
${sample(3,
`1<br/>
50`,
`50`,
``)}
${sample(4,
`3<br/>
10 20 30`,
`20`,
``)}
${sample(5,
`4<br/>
7 8 9 10`,
`8`,
``)}
${sample(6,
`5<br/>
1 100 100 100 100`,
`80`,
``)}
${sample(7,
`20<br/>
10 10 10 10 10 10 10 10 10 10 20 20 20 20 20 20 20 20 20 20`,
`15`,
``,
`{"data": ["4;10;20;30;40;25", "3;7;8;10;8", "1;50;50", "3;10;20;30;20", "4;7;8;9;10;8", "5;1;100;100;100;100;80", "20;10;10;10;10;10;10;10;10;10;10;20;20;20;20;20;20;20;20;20;20;15"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>寶可夢訓練師-1 平均等級</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("7", `寶可夢訓練師-2 最高等級`, `114嘉義縣國小組`)}
${desc(`
你是一位剛成為寶可夢訓練師的新手，正在整理你抓到的寶可夢資料，想設計一個程式幫助你分析寶可夢的資料。<br/>
請設計一個程式，輸入多隻寶可夢的名稱與等級，找出所有寶可夢中最高的等級。(本題保證不會有等級相同的情況，寶可夢名稱不包含空白字元)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個整數 N，代表寶可夢的數量 (1 ≤ N ≤ 20)；第二行輸入 2N 筆資料，依序為「寶可夢名稱 等級」。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最高的寶可夢等級。
`)}
${sample(1,
`3<br/>
皮卡丘 25 小火龍 12 妙蛙種子 18`,
`25`,
`共有 3 隻寶可夢，等級最高的是皮卡丘 (25)。`)}
${sample(2,
`4<br/>
傑尼龜 10 伊布 15 卡比獸 35 胖丁 2`,
`35`,
`共有 4 隻寶可夢，卡比獸等級最高 (35)。`)}
${sample(3,
`1<br/>
皮卡丘 10`,
`10`,
``)}
${sample(4,
`3<br/>
小火龍 12 妙蛙種子 18 傑尼龜 15`,
`18`,
``)}
${sample(5,
`4<br/>
A 5 B 20 C 15 D 8`,
`20`,
``)}
${sample(6,
`5<br/>
皮卡丘 22 伊布 30 卡比獸 28 超夢 100 胖丁 18`,
`100`,
``)}
${sample(7,
`6<br/>
P1 3 P2 6 P3 9 P4 12 P5 15 P6 18`,
`18`,
``,
`{"data": ["3;皮卡丘;25;小火龍;12;妙蛙種子;18;25", "4;傑尼龜;10;伊布;15;卡比獸;35;胖丁;2;35", "1;皮卡丘;10;10", "3;小火龍;12;妙蛙種子;18;傑尼龜;15;18", "4;A;5;B;20;C;15;D;8;20", "5;皮卡丘;22;伊布;30;卡比獸;28;超夢;100;胖丁;18;100", "6;P1;3;P2;6;P3;9;P4;12;P5;15;P6;18;18"]}`)}
'
 onclick='${ONCLICK}'>7
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>寶可夢訓練師-2 最高等級</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("8", `寶可夢訓練師-3 平均等級以上`, `114嘉義縣國小組`)}
${desc(`
你是一位剛成為寶可夢訓練師的新手，正在整理你抓到的寶可夢資料，想設計一個程式幫助你分析寶可夢的資料。<br/>
請輸入寶可夢名稱與等級，計算平均等級後，依照輸入出現順序，輸出所有等級高於平均值的寶可夢名稱。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N，代表寶可夢數量；第二行輸入 N 組資料，每組依序為名稱、等級。<br/>
<span ${LBL_OUT}>輸出說明</span>依照輸入順序，輸出所有等級高於平均值的寶可夢名稱；若沒有任何寶可夢高於平均值，則不輸出任何資料。
`)}
${sample(1,
`3<br/>
皮卡丘 25 小火龍 12 妙蛙種子 18`,
`皮卡丘`,
`平均等級約 18.3，高於平均的只有皮卡丘 (25)。`)}
${sample(2,
`4<br/>
傑尼龜 10 伊布 15 卡比獸 20 胖丁 20`,
`卡比獸 胖丁`,
`平均等級 16.25，高於平均的有卡比獸、胖丁。`)}
${sample(3,
`1<br/>
皮卡丘 10`,
``,
`只有 1 隻寶可夢，等級等於平均，沒有高於平均的寶可夢，無輸出。`)}
${sample(4,
`5<br/>
伊布 15 胖丁 15 乘龍 10 卡比獸 20 妙蛙種子 15`,
`卡比獸`,
``)}
${sample(5,
`4<br/>
妙蛙種子 30 皮卡丘 30 小火龍 30 傑尼龜 30`,
``,
``)}
${sample(6,
`6<br/>
小火龍 100 皮卡丘 0 伊布 50 卡比獸 50 胖丁 50 超夢 100`,
`小火龍 超夢`,
``)}
${sample(7,
`8<br/>
皮卡丘 25 皮卡丘 30 妙蛙種子 18 小火龍 12 傑尼龜 40 伊布 35 卡比獸 28 胖丁 28`,
`皮卡丘 傑尼龜 伊布 卡比獸 胖丁`,
``,
`{"data": ["3;皮卡丘;25;小火龍;12;妙蛙種子;18;皮卡丘", "4;傑尼龜;10;伊布;15;卡比獸;20;胖丁;20;卡比獸;胖丁", "1;皮卡丘;10;", "5;伊布;15;胖丁;15;乘龍;10;卡比獸;20;妙蛙種子;15;卡比獸", "4;妙蛙種子;30;皮卡丘;30;小火龍;30;傑尼龜;30;", "6;小火龍;100;皮卡丘;0;伊布;50;卡比獸;50;胖丁;50;超夢;100;小火龍;超夢", "8;皮卡丘;25;皮卡丘;30;妙蛙種子;18;小火龍;12;傑尼龜;40;伊布;35;卡比獸;28;胖丁;28;皮卡丘;傑尼龜;伊布;卡比獸;胖丁"]}`)}
'
 onclick='${ONCLICK}'>8
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>寶可夢訓練師-3 平均等級以上</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("9", `寶可夢訓練師-4 屬性統計`, `114嘉義縣國小組`)}
${desc(`
你是一位剛成為寶可夢訓練師的新手，正在整理你抓到的寶可夢資料，想設計一個程式幫助你分析寶可夢的資料。<br/>
請設計一個程式，輸入多隻寶可夢的屬性，輸出各屬性寶可夢的數量統計結果。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N，代表寶可夢數量；第二行輸入 N 個寶可夢屬性名稱。<br/>
<span ${LBL_OUT}>輸出說明</span>依照「屬性第一次出現的順序」，依序輸出每個屬性與該屬性寶可夢數量 (屬性 數量)；若屬性重複，只輸出一次。
`)}
${sample(1,
`5<br/>
火 水 火 電 水`,
`火 2 水 2 電 1`,
`依照首次出現順序統計：火 2 水 2 電 1。`)}
${sample(2,
`4<br/>
草 草 毒 草`,
`草 3 毒 1`,
`輸出結果為：草 3 毒 1。`)}
${sample(3,
`9<br/>
火 水 火 電 水 草 草 毒 草`,
`火 2 水 2 電 1 草 3 毒 1`,
``)}
${sample(4,
`8<br/>
水 火 電 水 草 水 電 草`,
`水 3 火 1 電 2 草 2`,
``)}
${sample(5,
`1<br/>
草`,
`草 1`,
``)}
${sample(6,
`5<br/>
水 水 水 水 水`,
`水 5`,
``)}
${sample(7,
`6<br/>
電 火 草 電 火 水`,
`電 2 火 2 草 1 水 1`,
``,
`{"data": ["5;火;水;火;電;水;火;2;水;2;電;1", "4;草;草;毒;草;草;3;毒;1", "9;火;水;火;電;水;草;草;毒;草;火;2;水;2;電;1;草;3;毒;1", "8;水;火;電;水;草;水;電;草;水;3;火;1;電;2;草;2", "1;草;草;1", "5;水;水;水;水;水;水;5", "6;電;火;草;電;火;水;電;2;火;2;草;1;水;1"]}`)}
'
 onclick='${ONCLICK}'>9
</button>
</td>
<td ${LIST_TD(false)}>114嘉義縣國小組</td>
<td ${LIST_TD(false)}>寶可夢訓練師-4 屬性統計</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
