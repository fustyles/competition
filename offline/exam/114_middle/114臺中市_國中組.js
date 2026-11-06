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
${qHeader("1", `朱大哥精神`, `114臺中市國中組`)}
${desc(`
朱大哥對成績有自己的一套看法，他認為及格且距離及格分數最近的人是最幸運的，反之不及格且距離及格分數最近的人是最倒楣的。請你設計一隻程式模擬朱大哥的想法並輸出結果。<br/>
首先讀入班級人數，接著輸入各個成績，然後輸出最幸運或最倒楣的分數。(註：及格分數設定為大於等於 65)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入學生人數 (1 ~ 20 的整數)。<br/>
第二行輸入各學生分數 (0 ~ 100 間整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 1 或 2 行：<br/>
第一行輸出「幸運」及最接近及格的及格分數。<br/>
第二行輸出「倒楣」及最接近及格的不及格分數。<br/>
若全班都不及格或全班都及格，則只輸出「幸運」或「倒楣」的一組結果。
`)}
${sample(1,
`6<br/>
40 80 67 34 55 99`,
`幸運 67<br/>
倒楣 55`,
`先輸出最幸運，再輸出最倒楣。<br/>
最幸運：≥65 的分數中，距離 65 最接近者為 67。<br/>
最倒楣：&lt;65 的分數中，距離 65 最接近者為 55。`)}
${sample(2,
`2<br/>
34 1`,
`倒楣 34`,
`全班不及格，故只輸出倒楣 34。`)}
${sample(3,
`1<br/>
66`,
`幸運 66`,
`全班及格，故只輸出幸運 66。`,
`{"data": ["6;40;80;67;34;55;99;幸運;67;倒楣;55", "2;34;1;倒楣;34", "1;66;幸運;66"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國中組</td>
<td ${LIST_TD(false)}>朱大哥精神</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `池化`, `114臺中市國中組`)}
${desc(`
卷積神經網絡 (Convolutional Neural Network，簡稱 CNN) 是現在深度學習課程裡最常見、最熱門的模型。CNN 在影像識別方面非常強大，很多影像辨識的系統都是從 CNN 的架構延伸出來的。<br/>
CNN 分成三大部分：<br/>
(一) 卷積層 (convolution layer)：負責從影像裡「抓特徵」。<br/>
(二) 池化層 (pooling layer)：把資料變小、簡化資訊。<br/>
(三) 全連接層 (fully connected layer)：最後做分類。<br/>
其中池化層最常見的作法叫最大池化 (max pooling)。做法就是把影像切成一塊一塊 2×2 的區域，然後每塊選出裡面的「最大值」當成輸出。<br/>
現在給你一個 N×N 的二維陣列，請你實作最大池化 (N 的值為 2 的倍數，且不大於 8)，池化結果依照原矩陣由左至右、由上至下輸出。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個正整數 N，代表 N×N 的二維陣列。<br/>
第二行依由左到右、由上到下的順序輸入 N×N 個整數。<br/>
<span ${LBL_OUT}>輸出說明</span>依照各區域位置將池化結果輸出 N/2 行，每行 N/2 個整數。
`)}
${sample(1,
`4<br/>
95 84 18 16 25 76 1 7 125687 99 24 16 120 14 8 0`,
`95 18<br/>
125687 24`,
`原陣列為：<br/>
95 84 18 16<br/>
25 76 1 7<br/>
125687 99 24 16<br/>
120 14 8 0<br/>
左上 2×2 區域 (95 84 25 76) 最大值為 95，右上區域最大值為 18，<br/>
左下區域最大值為 125687，右下區域最大值為 24。`)}
${sample(2,
`6<br/>
10 9 8 7 6 5 4 3 2 1 0 -1 -2 -3 -4 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 10 9 8 7`,
`10 8 6<br/>
-1 1 3<br/>
11 10 9`,
``)}
${sample(3,
`8<br/>
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64`,
`10 12 14 16<br/>
26 28 30 32<br/>
42 44 46 48<br/>
58 60 62 64`,
``,
`{"data": ["4;95;84;18;16;25;76;1;7;125687;99;24;16;120;14;8;0;95;18;125687;24", "6;10;9;8;7;6;5;4;3;2;1;0;-1;-2;-3;-4;-5;-4;-3;-2;-1;0;1;2;3;4;5;6;7;8;9;10;11;10;9;8;7;10;8;6;-1;1;3;11;10;9", "8;1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25;26;27;28;29;30;31;32;33;34;35;36;37;38;39;40;41;42;43;44;45;46;47;48;49;50;51;52;53;54;55;56;57;58;59;60;61;62;63;64;10;12;14;16;26;28;30;32;42;44;46;48;58;60;62;64"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國中組</td>
<td ${LIST_TD(false)}>池化</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `書局系統建置`, `114臺中市國中組`)}
${desc(`
你是「NO BEAR 書局」的店長，雖然書局沒什麼員工，但還好資訊老師教會了你編寫系統，所以一直以來都還算從從容容、游刃有餘，沒想到今天突然收銀台的系統異常，沒辦法的你只能發揮畢生所學，把損壞的系統功能補齊。<br/>
你巡視了整間店，書架上只剩下 N 種書 A、B、C、D、E…，數量分別為 5、6、8、8、12…本，價格分別為 20、10、30、80、50…元。<br/>
請把他們列入系統，並依照價格升冪排序輸出書名及數量，價格相同者維持原輸入順序 (穩定排序)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 N，代表書本的種類數。<br/>
第二行：N 個大寫英文字母，代表書本的種類。<br/>
第三行：N 個整數，代表各種書的數量。<br/>
第四行：N 個整數，代表各種書的價格。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
第一行：依價格升冪 (穩定排序) 輸出書本種類。<br/>
第二行：依第一行書本種類的順序輸出對應數量。
`)}
${sample(1,
`5<br/>
A B C D E<br/>
5 6 8 8 12<br/>
20 10 30 80 50`,
`B A C E D<br/>
6 5 8 12 8`,
`書本價格依升冪排序為 10、20、30、50、80，<br/>
故書本種類輸出 B A C E D，<br/>
再依書本種類順序輸出數量 6 5 8 12 8。`)}
${sample(2,
`6<br/>
A B C D E F<br/>
10 18 11 11 14 6<br/>
28 34 60 48 20 25`,
`E F A B D C<br/>
14 6 10 18 11 11`,
`書本價格依升冪排序為 20、25、28、34、48、60，<br/>
故書本種類輸出 E F A B D C，<br/>
再依書本種類順序輸出數量 14 6 10 18 11 11。`)}
${sample(3,
`4<br/>
A B C D<br/>
8 9 10 11<br/>
30 30 28 32`,
`C A B D<br/>
10 8 9 11`,
`書本價格依升冪排序 (穩定排序) 為 28、30、30、32，<br/>
故書本種類輸出 C A B D，<br/>
再依書本種類順序輸出數量 10 8 9 11。`,
`{"data": ["5;A;B;C;D;E;5;6;8;8;12;20;10;30;80;50;B;A;C;E;D;6;5;8;12;8", "6;A;B;C;D;E;F;10;18;11;11;14;6;28;34;60;48;20;25;E;F;A;B;D;C;14;6;10;18;11;11", "4;A;B;C;D;8;9;10;11;30;30;28;32;C;A;B;D;10;8;9;11"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國中組</td>
<td ${LIST_TD(false)}>書局系統建置</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `價格折扣`, `114臺中市國中組`)}
${desc(`
現在系統有 6 種書 A、B、C、D、E、F，詳細資訊如下：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>書本種類</td><td ${TD}>A</td><td ${TD}>B</td><td ${TD}>C</td><td ${TD}>D</td><td ${TD}>E</td><td ${TD}>F</td></tr><tr><td ${TH}>數量</td><td ${TD}>8</td><td ${TD}>10</td><td ${TD}>6</td><td ${TD}>4</td><td ${TD}>5</td><td ${TD}>9</td></tr><tr><td ${TH}>價格</td><td ${TD}>40</td><td ${TD}>45</td><td ${TD}>30</td><td ${TD}>35</td><td ${TD}>55</td><td ${TD}>60</td></tr></table><br/>
為了賺多點零用錢，你打算推出打折活動，打折活動的規則如下：<br/>
1. 組合折扣：同時買 A、B、C 三本為一組，或同時買 D、E 兩本為一組，該組合打 8 折。組合折扣可重複使用，優先套用。<br/>
2. 套用所有可行組合後，若購買本數超過 5 本，則全單再打 8 折。<br/>
3. 若未超過 5 本但超過 3 本，則全單打 95 折。<br/>
4. 折扣皆可疊加，最終價格無條件捨去至整數。<br/>
5. 若購買某種書的數量超過庫存，輸出「庫存不足」。<br/>
請輸出購買書本所需最低價格。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：客人買了幾本書。<br/>
第二行：購買的每一本書的種類 (大寫英文字母)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出套用規則後的最低價格；若庫存不足則輸出「庫存不足」。
`)}
${sample(1,
`6<br/>
A B C D E F`,
`179`,
`原價：40+45+30+35+55+60 = 265<br/>
ABC 組合折扣：(40+45+30)×0.8 = 92<br/>
DE 組合折扣：(35+55)×0.8 = 72<br/>
剩下 F 一本：60<br/>
超過 5 本 → 全單 ×0.8：(92+72+60)×0.8 = 179.2，無條件捨去 → 179`)}
${sample(2,
`4<br/>
A B C C`,
`115`,
`ABC 一套原價 115，折後 115×0.8 = 92<br/>
剩餘 C 一本：30，小計 92+30 = 122<br/>
超過 3 本 → 全單 ×0.95：122×0.95 = 115.9，無條件捨去 → 115`)}
${sample(3,
`7<br/>
C C C C C C C`,
`庫存不足`,
`C 的庫存 = 6，本次購買量 = 7 → 庫存不足`)}
${sample(4,
`10<br/>
A A B B C C D D E E`,
`262`,
`ABC 兩套原價 230，折後 184；DE 兩套原價 180，折後 144。<br/>
組合折扣後小計：184+144 = 328<br/>
超過 5 本 → 全單 ×0.8：328×0.8 = 262.4，無條件捨去 → 262`,
`{"data": ["6;A;B;C;D;E;F;179", "4;A;B;C;C;115", "7;C;C;C;C;C;C;C;庫存不足", "10;A;A;B;B;C;C;D;D;E;E;262"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國中組</td>
<td ${LIST_TD(false)}>價格折扣</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `收銀台`, `114臺中市國中組`)}
${desc(`
因為最近銀行系統也一起壞掉了，所以暫時你的店裡沒辦法兌換零錢，請在顧客購買書籍後，根據他給的錢及購買價格，用最少的硬幣數找零給客人，若無法找出需要的金額，請回答無法找零。<br/>
零錢面額由大到小依序為 100 元、50 元、10 元、5 元、1 元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：書本價格。<br/>
第二行：付款金額。<br/>
第三行：5 個整數，依序為 100 元、50 元、10 元、5 元、1 元零錢的數量。<br/>
<span ${LBL_OUT}>輸出說明</span>以最少硬幣數找零時，依序輸出 100 元、50 元、10 元、5 元、1 元各使用的數量。<br/>
若無需找零，輸出「不須找零」；若無法找零，輸出「無法找零」，皆不需輸出零錢數列。
`)}
${sample(1,
`179<br/>
500<br/>
3 3 5 5 18`,
`3 0 2 0 1`,
`需找零：500 − 179 = 321<br/>
使用最少硬幣之找零方式：100×3 = 300、10×2 = 20、1×1 = 1<br/>
總額 321，硬幣數 6 枚，輸出 3 0 2 0 1。`)}
${sample(2,
`220<br/>
220<br/>
3 3 5 5 18`,
`不須找零`,
`220 − 220 = 0，輸出不須找零。`)}
${sample(3,
`262<br/>
1000<br/>
3 3 5 5 18`,
`無法找零`,
`1000 − 262 = 738<br/>
零錢總額：100×3 + 50×3 + 10×5 + 5×5 + 1×18 = 543<br/>
543 &lt; 738，輸出無法找零。`)}
${sample(4,
`241<br/>
300<br/>
5 0 6 0 8`,
`無法找零`,
`300 − 241 = 59，因 1 元數量不足，輸出無法找零。`,
`{"data": ["179;500;3;3;5;5;18;3;0;2;0;1", "220;220;3;3;5;5;18;不須找零", "262;1000;3;3;5;5;18;無法找零", "241;300;5;0;6;0;8;無法找零"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國中組</td>
<td ${LIST_TD(false)}>收銀台</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
