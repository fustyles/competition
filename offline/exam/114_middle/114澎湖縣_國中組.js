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
${qHeader("1", `神秘留言解碼器`, `114澎湖縣國中組`)}
${desc(`
學校的資訊社正在舉辦「秘密留言挑戰」，每個人會收到一段被編碼的英文字母訊息。訊息中只有小寫字母與空白。<br/>
解碼規則如下：<br/>
每個英文字母向前移動一個字母 (例如 b→a，c→b，…，a→z)。<br/>
空白保持不變。<br/>
最後輸出解碼後的完整句子。<br/>
請你設計一個程式，讀入一段編碼後的字串，輸出正確解碼後的內容。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一行字串，為一段包含小寫字母與空白的字串 (長度不超過 100)，整行視為一個輸入。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出解碼後的字串。
`)}
${sample(1,
`bqqmf`,
`apple`,
`每個字母往前移一個字母 (b→a、q→p、m→l、f→e)，空白不變。`)}
${sample(2,
`ifmmp xpsme`,
`hello world`,
``)}
${sample(3,
`zoo`,
`ynn`,
``)}
${sample(4,
`uif dpef jt gvo`,
`the code is fun`,
``)}
${sample(5,
`ibwf b ojdf ebz`,
`have a nice day`,
``,
`{"data": ["bqqmf;apple", "ifmmp xpsme;hello world", "zoo;ynn", "uif dpef jt gvo;the code is fun", "ibwf b ojdf ebz;have a nice day"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國中組</td>
<td ${LIST_TD(false)}>神秘留言解碼器</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `剛好的禮券`, `114澎湖縣國中組`)}
${desc(`
小華手上有一張金額固定的禮券，他想要在商店中正好買「兩樣」不同的商品，將禮券金額完全花光，不想要有剩餘，也不想補差額。商店裡的商品價格都列在清單上了。請你幫小華檢查，是否能從商品價格清單中找到兩個不同位置的商品，使得它們的價格總和恰好等於禮券的面額。如果找得到，請輸出這兩個商品的價格 (小的在前，大的在後)；如果同時有多組商品組合符合禮券金額，請輸出商品價差最小的兩樣商品價格。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入兩個整數 N 與 K，N 為商品數量，K 為禮券面額。<br/>
第二行包含 N 個整數，代表各商品的價格。<br/>
<span ${LBL_OUT}>輸出說明</span>若找到符合條件的兩個商品，請輸出其價格 (數值較小者先輸出)；若找不到任何一組兩數之和等於 K，請輸出 No Solution。
`)}
${sample(1,
`3 10<br/>
1 2 3`,
`No Solution`,
``)}
${sample(2,
`5 100<br/>
20 40 50 60 80`,
`40 60`,
`20+80 與 40+60 都等於 100，40 與 60 價差較小，輸出 40 60。`)}
${sample(3,
`4 50<br/>
10 20 30 40`,
`20 30`,
``)}
${sample(4,
`2 20<br/>
10 10`,
`10 10`,
``)}
${sample(5,
`5 15<br/>
1 2 3 4 5`,
`No Solution`,
``,
`{"data": ["3;10;1;2;3;No Solution", "5;100;20;40;50;60;80;40;60", "4;50;10;20;30;40;20;30", "2;20;10;10;10;10", "5;15;1;2;3;4;5;No Solution"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國中組</td>
<td ${LIST_TD(false)}>剛好的禮券</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `細胞分裂模擬`, `114澎湖縣國中組`)}
${desc(`
某種實驗室培養的細胞遵循特定的分裂週期。觀察發現，第 n 天的細胞總數是由前兩天的數量決定的。具體來說，第 1 天有 0 個細胞，第 2 天有 1 個細胞，第 3 天開始，每一天的細胞數量都是「前一天」加上「前前一天」的數量之和。請你列出從第 1 天到第 n 天每天的細胞數量。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 n，代表觀察的天數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 n 個整數，代表第 1 天至第 n 天的細胞數量。
`)}
${sample(1,
`2`,
`0 1`,
``)}
${sample(2,
`3`,
`0 1 1`,
``)}
${sample(3,
`5`,
`0 1 1 2 3`,
``)}
${sample(4,
`6`,
`0 1 1 2 3 5`,
``)}
${sample(5,
`7`,
`0 1 1 2 3 5 8`,
``,
`{"data": ["2;0;1", "3;0;1;1", "5;0;1;1;2;3", "6;0;1;1;2;3;5", "7;0;1;1;2;3;5;8"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國中組</td>
<td ${LIST_TD(false)}>細胞分裂模擬</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `分組報告`, `114澎湖縣國中組`)}
${desc(`
電腦課要同學分組做期末報告，分組的方式為依座號順序，每 3 個人一組。如：1, 2, 3 為第一組，4, 5, 6 為第二組….以此類推。輸入同學的座號，請判斷他在哪一組。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數 n，代表同學的座號。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出該同學的組別。
`)}
${sample(1,
`7`,
`3`,
`座號 7 在第 3 組 (7、8、9)。`)}
${sample(2,
`1`,
`1`,
``)}
${sample(3,
`2`,
`1`,
``)}
${sample(4,
`98`,
`33`,
``)}
${sample(5,
`99`,
`33`,
``)}
${sample(6,
`100`,
`34`,
``,
`{"data": ["7;3", "1;1", "2;1", "98;33", "99;33", "100;34"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國中組</td>
<td ${LIST_TD(false)}>分組報告</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `購買紀念品`, `114澎湖縣國中組`)}
${desc(`
小明趁日幣貶值特別飛去日本旅遊，準備回國時，發現還有一些日幣還沒花完，於是想要去紀念品店買紀念品來送給他的好朋友。他想要盡量把身上的日幣都花完，來買到最多的紀念品。請你寫一個程式幫他判斷，在盡量花完所有剩下日幣的情況下，最多可以買到幾件紀念品。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一個輸入：一個整數 N，代表小明剩下的日幣總數。<br/>
第二個輸入：一個整數 M，代表商品的數量。<br/>
接下來 M 個整數，代表每樣商品的日幣價格。<br/>
再接下來 M 個整數，代表每樣商品對應的剩下數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (可以買到的紀念品總數量)。
`)}
${sample(1,
`1000<br/>
3<br/>
100 300 200<br/>
3 4 2`,
`6`,
`商品總金額 = 100+100+100+300+200+200 = 1000，最多可以買 6 個紀念品。`)}
${sample(2,
`500<br/>
3<br/>
600 700 800<br/>
3 4 5`,
`0`,
`剩下的錢不夠買任何紀念品，所以最多可以買 0 個紀念品。`)}
${sample(3,
`1500<br/>
3<br/>
200 300 100<br/>
2 1 4`,
`7`,
`商品總金額 = 200+200+300+100+100+100+100 &lt; 1500，所以最多可以買 7 個紀念品。`)}
${sample(4,
`1285<br/>
3<br/>
400 300 100<br/>
4 6 3`,
`6`,
`商品總金額 = 300+300+300+100+100+100 &lt; 1285，所以最多可以買 6 個紀念品。`)}
${sample(5,
`1500<br/>
3<br/>
200 100 1000<br/>
3 2 4`,
`5`,
``)}
${sample(6,
`100<br/>
4<br/>
400 200 300 500<br/>
3 5 4 2`,
`0`,
``)}
${sample(7,
`1500<br/>
4<br/>
30 20 10 50<br/>
1 1 3 1`,
`6`,
``)}
${sample(8,
`50<br/>
3<br/>
200 100 300<br/>
4 3 5`,
`0`,
``)}
${sample(9,
`1800<br/>
4<br/>
100 300 200 400<br/>
6 4 8 2`,
`12`,
``,
`{"data": ["1000;3;100;300;200;3;4;2;6", "500;3;600;700;800;3;4;5;0", "1500;3;200;300;100;2;1;4;7", "1285;3;400;300;100;4;6;3;6", "1500;3;200;100;1000;3;2;4;5", "100;4;400;200;300;500;3;5;4;2;0", "1500;4;30;20;10;50;1;1;3;1;6", "50;3;200;100;300;4;3;5;0", "1800;4;100;300;200;400;6;4;8;2;12"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國中組</td>
<td ${LIST_TD(false)}>購買紀念品</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
