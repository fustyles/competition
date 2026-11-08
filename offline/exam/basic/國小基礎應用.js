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
// 尺寸由 CSS 的 .test-button 控制（createFunction.css）；這裡設成行內排列，並防止系統 CSS 改變按鈕位置
const BTN_STYLE = 'display:inline-block !important; float:none !important; position:static !important; left:auto !important; right:auto !important; transform:none !important; box-sizing:border-box !important;';
// 每格都明確設定四邊框線，避免系統原本的 CSS（黑色直線）混進來
const CELL = 'padding: 10px 16px; text-align: center; vertical-align: middle; border: 0; color: #374151; background: #fff;';
const LIST_TH = (first) => `style="${CELL} background: #eef1f7; color: #3a4a6b; font-weight: bold; ${first ? 'width: 190px !important; min-width: 190px !important; white-space: nowrap; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : 'border-left: 1px solid #dde2ec;'}"`;
const LIST_TD = (first) => `style="${CELL} border-top: 1px solid #e5e8ef; ${first ? 'width: 190px !important; min-width: 190px !important; white-space: nowrap; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : 'border-left: 1px solid #e5e8ef;'}"`;
const ONCLICK = `document.getElementById("javascript_content").style.display = "block";document.getElementById("question_input").innerHTML = this.getAttribute("data-q");document.getElementById("question_input").scrollTop = 0;window.toggleImportQuestionForm(false);var iframe = document.getElementById("iframe_output");iframe.contentWindow.document.open();iframe.contentWindow.document.write("");iframe.contentWindow.document.close();iframe.focus();loadExam();`;

// =====================================================
//  參考答案按鈕（Blockly / Scratch）
//  網頁在 網站主目錄/offline/index.html，答案在 網站主目錄/exam/answer/
//  檔案路徑：../exam/answer/{ANSWER_GROUP}/{題目名稱}_Blockly.xml、_Scratch.xml
// =====================================================
const ANSWER_DIR   = '../exam/answer/';
const ANSWER_GROUP = '國小基礎應用';   // exam/answer/ 底下的資料夾名稱
const ICON_BLOCKLY = 'data:image/png;base64,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';
const ICON_SCRATCH = 'data:image/png;base64,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';
const ANSWER_BTN_STYLE = 'width:40px !important; height:40px !important; padding:4px !important; margin:2px !important; display:inline-block !important; float:none !important; position:static !important; left:auto !important; right:auto !important; transform:none !important; box-sizing:border-box !important; vertical-align:middle; cursor:pointer;';
const ANSWER_IMG_STYLE = 'width:100%; height:100%; object-fit:contain; display:block; pointer-events:none;';
const answerMsg = (key, def) => (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) || def;
const answerPath = (name, platform, group) => ANSWER_DIR + encodeURIComponent(group) + '/' + encodeURIComponent(name + '_' + platform + '.xml');
// group 可省略，預設用 ANSWER_GROUP；題本混合不同來源時可逐題指定資料夾
const answerButtons = (name, group = ANSWER_GROUP) => `<span style="white-space:nowrap;"><button class="answer-button" style="${ANSWER_BTN_STYLE}" title="${answerMsg('BUTTON_ANSWER_BLOCKLY', '匯入 Blockly 參考答案')}" data-path="${answerPath(name, 'Blockly', group)}" onclick="showAnswer(this.dataset.path);"><img src="${ICON_BLOCKLY}" alt="Blockly" style="${ANSWER_IMG_STYLE}"></button>
<button class="answer-button" style="${ANSWER_BTN_STYLE}" title="${answerMsg('BUTTON_ANSWER_SCRATCH', '匯入 Scratch 參考答案')}" data-path="${answerPath(name, 'Scratch', group)}" onclick="showAnswer(this.dataset.path);"><img src="${ICON_SCRATCH}" alt="Scratch" style="${ANSWER_IMG_STYLE}"></button></span>`;

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
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("1", `超商購物點數計算`, `國小基礎應用`)}
${desc(`
超商正在舉辦集點活動：顧客只要消費金額每滿 100 元（不足 100 元的部分捨去不計），就可以兌換 1 張貼紙。請根據顧客的發票金額，計算最後總共可以兌換幾張貼紙。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表發票的消費總金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表可兌換的貼紙總張數。
`)}
${sample(1,
`0`,
`0`,
`消費 0 元，每滿 100 元換 1 張，0÷100 取整數為 0 張。`)}
${sample(2,
`99`,
`0`,
`消費 99 元，每滿 100 元換 1 張，99÷100 取整數為 0 張。`)}
${sample(3,
`100`,
`1`,
`消費 100 元，每滿 100 元換 1 張，100÷100 取整數為 1 張。`)}
${sample(4,
`250`,
`2`,
`消費 250 元，每滿 100 元換 1 張，250÷100 取整數為 2 張。`)}
${sample(5,
`999999`,
`9999`,
`消費 999999 元，每滿 100 元換 1 張，999999÷100 取整數為 9999 張。`,
`{"data": ["0;0", "99;0", "100;1", "250;2", "999999;9999"]}`)}
'
 onclick='${ONCLICK}'>1
</button> ${answerButtons('超商購物點數計算')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>超商購物點數計算</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("2", `電車票價計算`, `國小基礎應用`)}
${desc(`
電車票價依年齡分為兩種：未滿 12 歲（即 12 歲以下，不含 12 歲本身）的兒童票為 100 元；12 歲（含）以上的大人票為 200 元。請根據一群乘客的年齡，計算這群人總共要付多少電車票錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表乘客總人數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一位乘客的年齡（依序輸入）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表這群乘客的總票價。
`)}
${sample(1,
`1<br/>
0`,
`100`,
`0歲兒童票 100 元。<br/>總計 100 元。`)}
${sample(2,
`2<br/>
11<br/>
12`,
`300`,
`11歲兒童票 100 元；12歲大人票 200 元。<br/>總計 100+200 = 300 元。`)}
${sample(3,
`4<br/>
5<br/>
12<br/>
30<br/>
100`,
`700`,
`5歲兒童票 100 元；12歲大人票 200 元；30歲大人票 200 元；100歲大人票 200 元。<br/>總計 100+200+200+200 = 700 元。`)}
${sample(4,
`5<br/>
12<br/>
12<br/>
12<br/>
12<br/>
12`,
`1000`,
`12歲大人票 200 元；12歲大人票 200 元；12歲大人票 200 元；12歲大人票 200 元；12歲大人票 200 元。<br/>總計 200+200+200+200+200 = 1000 元。`,
`{"data": ["1;0;100", "2;11;12;300", "4;5;12;30;100;700", "5;12;12;12;12;12;1000"]}`)}
'
 onclick='${ONCLICK}'>2
</button> ${answerButtons('電車票價計算')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>電車票價計算</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("3", `停車計費`, `國小基礎應用`)}
${desc(`
停車場收費規則如下：停車時間在 2 小時（含）以內，一律收費 30 元；超過 2 小時的部分，每滿 1 小時加收 20 元，不滿 1 小時的零頭時間也視為 1 小時計費（無條件進位）。請計算應付的停車費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表本次停車的總分鐘數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應付的停車費（元）。
`)}
${sample(1,
`1`,
`30`,
`停車 1 分鐘，在 2 小時（120 分鐘）以內，收費 30 元。`)}
${sample(2,
`120`,
`30`,
`停車 120 分鐘，在 2 小時（120 分鐘）以內，收費 30 元。`)}
${sample(3,
`121`,
`50`,
`停車 121 分鐘，超過 2 小時的部分為 1 分鐘，無條件進位為 1 小時，<br/>費用 30+1×20 = 50 元。`)}
${sample(4,
`130`,
`50`,
`停車 130 分鐘，超過 2 小時的部分為 10 分鐘，無條件進位為 1 小時，<br/>費用 30+1×20 = 50 元。`)}
${sample(5,
`500`,
`170`,
`停車 500 分鐘，超過 2 小時的部分為 380 分鐘，無條件進位為 7 小時，<br/>費用 30+7×20 = 170 元。`,
`{"data": ["1;30", "120;30", "121;50", "130;50", "500;170"]}`)}
'
 onclick='${ONCLICK}'>3
</button> ${answerButtons('停車計費')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>停車計費</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("4", `校園午餐熱量分類`, `國小基礎應用`)}
${desc(`
營養午餐依熱量分為三種等級：熱量小於 400 大卡為「輕食」；介於 400 至 700 大卡（含 400 與 700）為「正常」；超過 700 大卡為「大份量」。請統計每一種等級各有多少份餐點。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表餐點總數。<br/>
接下來 N 行，每行輸入一個正整數，代表一份餐點的熱量（大卡）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出三行整數：<br/>
第 1 行為「輕食」的份數。<br/>
第 2 行為「正常」的份數。<br/>
第 3 行為「大份量」的份數。
`)}
${sample(1,
`1<br/>
399`,
`1<br/>
0<br/>
0`,
`399 大卡小於 400 為輕食。<br/>輕食 1 份、正常 0 份、大份量 0 份。`)}
${sample(2,
`2<br/>
400<br/>
700`,
`0<br/>
2<br/>
0`,
`400、700 大卡介於 400～700 為正常。<br/>輕食 0 份、正常 2 份、大份量 0 份。`)}
${sample(3,
`5<br/>
350<br/>
400<br/>
650<br/>
700<br/>
900`,
`1<br/>
3<br/>
1`,
`350 大卡小於 400 為輕食；400、650、700 大卡介於 400～700 為正常；900 大卡超過 700 為大份量。<br/>輕食 1 份、正常 3 份、大份量 1 份。`)}
${sample(4,
`3<br/>
1<br/>
1000<br/>
400`,
`1<br/>
1<br/>
1`,
`1 大卡小於 400 為輕食；400 大卡介於 400～700 為正常；1000 大卡超過 700 為大份量。<br/>輕食 1 份、正常 1 份、大份量 1 份。`,
`{"data": ["1;399;1;0;0", "2;400;700;0;2;0", "5;350;400;650;700;900;1;3;1", "3;1;1000;400;1;1;1"]}`)}
'
 onclick='${ONCLICK}'>4
</button> ${answerButtons('校園午餐熱量分類')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>校園午餐熱量分類</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("5", `水費分段計算`, `國小基礎應用`)}
${desc(`
自來水公司採用「分段累進」計費方式：用水量在 20 度以內的部分，每度收費 10 元；超過 20 度至 50 度的部分（即第 21 度到第 50 度），每度收費 15 元；超過 50 度的部分（第 51 度以上），每度收費 20 元。請計算本月應繳的水費總額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表本月的用水度數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應繳的水費金額（元）。
`)}
${sample(1,
`0`,
`0`,
`用水 0 度：20 度以內 0×10 = 0 元。<br/>總計 0 元。`)}
${sample(2,
`21`,
`215`,
`用水 21 度：20 度以內 20×10 = 200 元；第 21~50 度 1×15 = 15 元。<br/>總計 215 元。`)}
${sample(3,
`50`,
`650`,
`用水 50 度：20 度以內 20×10 = 200 元；第 21~50 度 30×15 = 450 元。<br/>總計 650 元。`)}
${sample(4,
`51`,
`670`,
`用水 51 度：20 度以內 20×10 = 200 元；第 21~50 度 30×15 = 450 元；第 51 度以上 1×20 = 20 元。<br/>總計 670 元。`)}
${sample(5,
`999`,
`19630`,
`用水 999 度：20 度以內 20×10 = 200 元；第 21~50 度 30×15 = 450 元；第 51 度以上 949×20 = 18980 元。<br/>總計 19630 元。`,
`{"data": ["0;0", "21;215", "50;650", "51;670", "999;19630"]}`)}
'
 onclick='${ONCLICK}'>5
</button> ${answerButtons('水費分段計算')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>水費分段計算</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("6", `遊樂園門票`, `國小基礎應用`)}
${desc(`
遊樂園依身高收費：身高未滿 120 公分（不含 120 公分）購買半票，票價 150 元；身高 120 公分（含）以上購買全票，票價 300 元。請根據一群遊客的身高，計算門票總收入。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表遊客人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位遊客的身高（公分）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表門票總收入（元）。
`)}
${sample(1,
`1<br/>
119`,
`150`,
`119 公分半票 150 元。<br/>總計 150 元。`)}
${sample(2,
`1<br/>
120`,
`300`,
`120 公分全票 300 元。<br/>總計 300 元。`)}
${sample(3,
`3<br/>
110<br/>
120<br/>
150`,
`750`,
`110 公分半票 150 元；120 公分全票 300 元；150 公分全票 300 元。<br/>總計 150+300+300 = 750 元。`)}
${sample(4,
`8<br/>
120<br/>
120<br/>
120<br/>
120<br/>
120<br/>
120<br/>
120<br/>
120`,
`2400`,
`120 公分全票 300 元；120 公分全票 300 元；120 公分全票 300 元；120 公分全票 300 元；120 公分全票 300 元；120 公分全票 300 元；120 公分全票 300 元；120 公分全票 300 元。<br/>總計 300+300+300+300+300+300+300+300 = 2400 元。`,
`{"data": ["1;119;150", "1;120;300", "3;110;120;150;750", "8;120;120;120;120;120;120;120;120;2400"]}`)}
'
 onclick='${ONCLICK}'>6
</button> ${answerButtons('遊樂園門票')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>遊樂園門票</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("7", `購物折扣`, `國小基礎應用`)}
${desc(`
超市優惠：消費金額達到 500 元（含）以上，結帳時可享 9 折優惠；未滿 500 元則無折扣，原價付款。若結果出現小數，請四捨五入到整數元。請計算客人實際要付的金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表消費的原始金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表折扣後實際應付的金額（元）。
`)}
${sample(1,
`0`,
`0`,
`消費 0 元未滿 500 元，沒有折扣，付 0 元。`)}
${sample(2,
`499`,
`499`,
`消費 499 元未滿 500 元，沒有折扣，付 499 元。`)}
${sample(3,
`500`,
`450`,
`消費 500 元達 500 元，打 9 折：500×0.9 = 450，四捨五入為 450 元。`)}
${sample(4,
`680`,
`612`,
`消費 680 元達 500 元，打 9 折：680×0.9 = 612，四捨五入為 612 元。`)}
${sample(5,
`1000001`,
`900001`,
`消費 1000001 元達 500 元，打 9 折：1000001×0.9 = 900000.9，四捨五入為 900001 元。`,
`{"data": ["0;0", "499;499", "500;450", "680;612", "1000001;900001"]}`)}
'
 onclick='${ONCLICK}'>7
</button> ${answerButtons('購物折扣')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>購物折扣</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("8", `商品分類`, `國小基礎應用`)}
${desc(`
商店將貨物依價格分為三區：0~100 元（含 100 元）為 A 區；101~500 元（含 500 元）為 B 區；501 元以上為 C 區。請統計每個價格區間各有幾件商品。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表商品總數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一件商品的價格（元）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出三行整數：<br/>
第 1 行為 A 區（0~100 元）的商品數量。<br/>
第 2 行為 B 區（101~500 元）的商品數量。<br/>
第 3 行為 C 區（501 元以上）的商品數量。
`)}
${sample(1,
`1<br/>
0`,
`1<br/>
0<br/>
0`,
`0 元屬於 A 區。<br/>A 區 1 件、B 區 0 件、C 區 0 件。`)}
${sample(2,
`4<br/>
100<br/>
101<br/>
500<br/>
501`,
`1<br/>
2<br/>
1`,
`100 元屬於 A 區；101、500 元屬於 B 區；501 元屬於 C 區。<br/>A 區 1 件、B 區 2 件、C 區 1 件。`)}
${sample(3,
`4<br/>
100<br/>
250<br/>
500<br/>
600`,
`1<br/>
2<br/>
1`,
`100 元屬於 A 區；250、500 元屬於 B 區；600 元屬於 C 區。<br/>A 區 1 件、B 區 2 件、C 區 1 件。`)}
${sample(4,
`1<br/>
999999`,
`0<br/>
0<br/>
1`,
`999999 元屬於 C 區。<br/>A 區 0 件、B 區 0 件、C 區 1 件。`,
`{"data": ["1;0;1;0;0", "4;100;101;500;501;1;2;1", "4;100;250;500;600;1;2;1", "1;999999;0;0;1"]}`)}
'
 onclick='${ONCLICK}'>8
</button> ${answerButtons('商品分類')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>商品分類</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("9", `社團初選錄取`, `國小基礎應用`)}
${desc(`
籃球隊初選：體能測驗分數達到 80 分（含）以上者，即通過初選。請統計總共有幾位參加者通過初選。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表參加人數。<br/>
接下來 N 行，每行輸入一個整數（0~100），代表一位參加者的體能測驗分數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表通過初選的人數。
`)}
${sample(1,
`1<br/>
79`,
`0`,
`1 位的分數為 79，達到 80 以上的有 0 人。`)}
${sample(2,
`1<br/>
80`,
`1`,
`1 位的分數為 80，達到 80 以上的有 80，共 1 人。`)}
${sample(3,
`4<br/>
75<br/>
80<br/>
95<br/>
60`,
`2`,
`4 位的分數為 75、80、95、60，達到 80 以上的有 80、95，共 2 人。`)}
${sample(4,
`8<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100`,
`8`,
`8 位的分數為 100、100、100、100、100、100、100、100，達到 80 以上的有 100、100、100、100、100、100、100、100，共 8 人。`,
`{"data": ["1;79;0", "1;80;1", "4;75;80;95;60;2", "8;100;100;100;100;100;100;100;100;8"]}`)}
'
 onclick='${ONCLICK}'>9
</button> ${answerButtons('社團初選錄取')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>社團初選錄取</td>
</tr>
`;

// ---------------- 第 10 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("10", `生日派對禮物分配`, `國小基礎應用`)}
${desc(`
生日派對要準備禮物，每一位到場的人都要拿到 1 份禮物。請根據到場人數，計算總共需要準備幾份禮物。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表到場的人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表需要準備的禮物總份數（與人數相同）。
`)}
${sample(1,
`0`,
`0`,
`到場 0 人，每人 1 份，需準備 0 份禮物。`)}
${sample(2,
`1`,
`1`,
`到場 1 人，每人 1 份，需準備 1 份禮物。`)}
${sample(3,
`12`,
`12`,
`到場 12 人，每人 1 份，需準備 12 份禮物。`)}
${sample(4,
`100000`,
`100000`,
`到場 100000 人，每人 1 份，需準備 100000 份禮物。`,
`{"data": ["0;0", "1;1", "12;12", "100000;100000"]}`)}
'
 onclick='${ONCLICK}'>10
</button> ${answerButtons('生日派對禮物分配')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>生日派對禮物分配</td>
</tr>
`;

// ---------------- 第 11 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("11", `校園跑步比賽成績`, `國小基礎應用`)}
${desc(`
班際跑步比賽結束後，請根據每位參賽者完成比賽所花費的秒數，找出跑最快（花費時間最短）的那位選手所花的秒數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表參賽人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位選手完成比賽的秒數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最短的完成秒數。
`)}
${sample(1,
`4<br/>
58<br/>
45<br/>
50<br/>
45`,
`45`,
`4 位的秒數為 58、45、50、45，其中最小（最快）的是 45 秒。`)}
${sample(2,
`1<br/>
1`,
`1`,
`1 位的秒數為 1，其中最小（最快）的是 1 秒。`)}
${sample(3,
`3<br/>
100<br/>
100<br/>
100`,
`100`,
`3 位的秒數為 100、100、100，其中最小（最快）的是 100 秒。`)}
${sample(4,
`2<br/>
999999<br/>
1`,
`1`,
`2 位的秒數為 999999、1，其中最小（最快）的是 1 秒。`,
`{"data": ["4;58;45;50;45;45", "1;1;1", "3;100;100;100;100", "2;999999;1;1"]}`)}
'
 onclick='${ONCLICK}'>11
</button> ${answerButtons('校園跑步比賽成績')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>校園跑步比賽成績</td>
</tr>
`;

// ---------------- 第 12 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("12", `動物園門票`, `國小基礎應用`)}
${desc(`
動物園門票依年齡收費：未滿 18 歲（即低於 18 歲，不含 18 歲）為兒童票 100 元；18 歲（含）以上為成人票 200 元。請根據一群遊客的年齡，計算大家總共要付多少入園費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表遊客人數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一位遊客的年齡。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總入園費（元）。
`)}
${sample(1,
`1<br/>
0`,
`100`,
`0歲兒童票 100 元。<br/>總計 100 元。`)}
${sample(2,
`2<br/>
17<br/>
18`,
`300`,
`17歲兒童票 100 元；18歲成人票 200 元。<br/>總計 100+200 = 300 元。`)}
${sample(3,
`3<br/>
10<br/>
18<br/>
25`,
`500`,
`10歲兒童票 100 元；18歲成人票 200 元；25歲成人票 200 元。<br/>總計 100+200+200 = 500 元。`)}
${sample(4,
`5<br/>
18<br/>
18<br/>
18<br/>
18<br/>
18`,
`1000`,
`18歲成人票 200 元；18歲成人票 200 元；18歲成人票 200 元；18歲成人票 200 元；18歲成人票 200 元。<br/>總計 200+200+200+200+200 = 1000 元。`,
`{"data": ["1;0;100", "2;17;18;300", "3;10;18;25;500", "5;18;18;18;18;18;1000"]}`)}
'
 onclick='${ONCLICK}'>12
</button> ${answerButtons('動物園門票')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>動物園門票</td>
</tr>
`;

// ---------------- 第 13 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("13", `遊戲點數累計`, `國小基礎應用`)}
${desc(`
玩家每達成一個任務，就會獲得 100 點獎勵點數。請根據玩家達成任務的總次數，計算最後總共獲得多少點數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表達成任務的總次數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表獲得的總點數。
`)}
${sample(1,
`0`,
`0`,
`完成 0 次任務，每次 100 點，共 0×100 = 0 點。`)}
${sample(2,
`1`,
`100`,
`完成 1 次任務，每次 100 點，共 1×100 = 100 點。`)}
${sample(3,
`7`,
`700`,
`完成 7 次任務，每次 100 點，共 7×100 = 700 點。`)}
${sample(4,
`1000000`,
`100000000`,
`完成 1000000 次任務，每次 100 點，共 1000000×100 = 100000000 點。`,
`{"data": ["0;0", "1;100", "7;700", "1000000;100000000"]}`)}
'
 onclick='${ONCLICK}'>13
</button> ${answerButtons('遊戲點數累計')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>遊戲點數累計</td>
</tr>
`;

// ---------------- 第 14 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("14", `學生作業完成率統計`, `國小基礎應用`)}
${desc(`
老師依學生的作業平均分數判斷是否「及格」：平均分數達到 80 分（含）以上者為及格。請統計全班達到及格標準的人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表學生人數。<br/>
接下來 N 行，每行輸入一個實數（可有小數），代表一位學生的作業平均分數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表及格的人數。
`)}
${sample(1,
`1<br/>
79.9`,
`0`,
`1 位的平均分數為 79.9，達到 80 以上的有 0 人。`)}
${sample(2,
`1<br/>
80`,
`1`,
`1 位的平均分數為 80，達到 80 以上的有 80，共 1 人。`)}
${sample(3,
`4<br/>
79.5<br/>
80<br/>
88<br/>
60`,
`2`,
`4 位的平均分數為 79.5、80、88、60，達到 80 以上的有 80、88，共 2 人。`)}
${sample(4,
`8<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100`,
`8`,
`8 位的平均分數為 100、100、100、100、100、100、100、100，達到 80 以上的有 100、100、100、100、100、100、100、100，共 8 人。`,
`{"data": ["1;79.9;0", "1;80;1", "4;79.5;80;88;60;2", "8;100;100;100;100;100;100;100;100;8"]}`)}
'
 onclick='${ONCLICK}'>14
</button> ${answerButtons('學生作業完成率統計')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>學生作業完成率統計</td>
</tr>
`;

// ---------------- 第 15 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("15", `公車票價`, `國小基礎應用`)}
${desc(`
公車收費：學生票每張 20 元，大人票每張 50 元。請根據這班公車學生與大人的人數，計算車資總收入。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表學生票人數。<br/>
第 2 行輸入一個非負整數，代表大人票人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表車資總收入（元）。
`)}
${sample(1,
`0<br/>
0`,
`0`,
`學生票 0×20 = 0 元，大人票 0×50 = 0 元，<br/>總收入 0+0 = 0 元。`)}
${sample(2,
`5<br/>
3`,
`250`,
`學生票 5×20 = 100 元，大人票 3×50 = 150 元，<br/>總收入 100+150 = 250 元。`)}
${sample(3,
`1<br/>
0`,
`20`,
`學生票 1×20 = 20 元，大人票 0×50 = 0 元，<br/>總收入 20+0 = 20 元。`)}
${sample(4,
`0<br/>
1`,
`50`,
`學生票 0×20 = 0 元，大人票 1×50 = 50 元，<br/>總收入 0+50 = 50 元。`)}
${sample(5,
`1000<br/>
1000`,
`70000`,
`學生票 1000×20 = 20000 元，大人票 1000×50 = 50000 元，<br/>總收入 20000+50000 = 70000 元。`,
`{"data": ["0;0;0", "5;3;250", "1;0;20", "0;1;50", "1000;1000;70000"]}`)}
'
 onclick='${ONCLICK}'>15
</button> ${answerButtons('公車票價')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>公車票價</td>
</tr>
`;

// ---------------- 第 16 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("16", `停車格使用統計`, `國小基礎應用`)}
${desc(`
停車場統計進場車輛類型，類型只有「小車」與「大車」兩種。請統計這段時間內，小車與大車分別進場了幾台。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表進場車輛總數。<br/>
接下來 N 行，每行輸入一個字串，內容為「小車」或「大車」，代表一台車的類型。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行整數：<br/>
第 1 行為小車的數量。<br/>
第 2 行為大車的數量。
`)}
${sample(1,
`1<br/>
小車`,
`1<br/>
0`,
`1 台車中「小車」有 1 台、「大車」有 0 台。`)}
${sample(2,
`1<br/>
大車`,
`0<br/>
1`,
`1 台車中「小車」有 0 台、「大車」有 1 台。`)}
${sample(3,
`4<br/>
小車<br/>
大車<br/>
小車<br/>
小車`,
`3<br/>
1`,
`4 台車中「小車」有 3 台、「大車」有 1 台。`)}
${sample(4,
`8<br/>
小車<br/>
小車<br/>
小車<br/>
小車<br/>
大車<br/>
大車<br/>
大車<br/>
大車`,
`4<br/>
4`,
`8 台車中「小車」有 4 台、「大車」有 4 台。`,
`{"data": ["1;小車;1;0", "1;大車;0;1", "4;小車;大車;小車;小車;3;1", "8;小車;小車;小車;小車;大車;大車;大車;大車;4;4"]}`)}
'
 onclick='${ONCLICK}'>16
</button> ${answerButtons('停車格使用統計')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>停車格使用統計</td>
</tr>
`;

// ---------------- 第 17 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("17", `水上樂園票價`, `國小基礎應用`)}
${desc(`
水上樂園票價依身高收費：身高 130 公分（含）以上購買全票，票價 500 元；未滿 130 公分購買半票，票價 250 元。請計算這群好朋友總共要付多少票錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位朋友的身高（公分）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表票價總收入（元）。
`)}
${sample(1,
`1<br/>
129`,
`250`,
`129 公分半票 250 元。<br/>總計 250 元。`)}
${sample(2,
`1<br/>
130`,
`500`,
`130 公分全票 500 元。<br/>總計 500 元。`)}
${sample(3,
`3<br/>
120<br/>
130<br/>
150`,
`1250`,
`120 公分半票 250 元；130 公分全票 500 元；150 公分全票 500 元。<br/>總計 250+500+500 = 1250 元。`)}
${sample(4,
`8<br/>
130<br/>
130<br/>
130<br/>
130<br/>
130<br/>
130<br/>
130<br/>
130`,
`4000`,
`130 公分全票 500 元；130 公分全票 500 元；130 公分全票 500 元；130 公分全票 500 元；130 公分全票 500 元；130 公分全票 500 元；130 公分全票 500 元；130 公分全票 500 元。<br/>總計 500+500+500+500+500+500+500+500 = 4000 元。`,
`{"data": ["1;129;250", "1;130;500", "3;120;130;150;1250", "8;130;130;130;130;130;130;130;130;4000"]}`)}
'
 onclick='${ONCLICK}'>17
</button> ${answerButtons('水上樂園票價')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>水上樂園票價</td>
</tr>
`;

// ---------------- 第 18 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("18", `迷你遊戲積分`, `國小基礎應用`)}
${desc(`
小朋友玩迷你遊戲，每玩一次可以得到 1 分。請根據總共玩的次數，計算最後累積的總分數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表玩遊戲的總次數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表累積的總分數。
`)}
${sample(1,
`0`,
`0`,
`玩了 0 次，每次 1 分，共 0 分。`)}
${sample(2,
`1`,
`1`,
`玩了 1 次，每次 1 分，共 1 分。`)}
${sample(3,
`9`,
`9`,
`玩了 9 次，每次 1 分，共 9 分。`)}
${sample(4,
`999999`,
`999999`,
`玩了 999999 次，每次 1 分，共 999999 分。`,
`{"data": ["0;0", "1;1", "9;9", "999999;999999"]}`)}
'
 onclick='${ONCLICK}'>18
</button> ${answerButtons('迷你遊戲積分')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>迷你遊戲積分</td>
</tr>
`;

// ---------------- 第 19 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("19", `書展購書折扣`, `國小基礎應用`)}
${desc(`
書展優惠：買書金額達到 300 元（含）以上，可享 9 折優惠；未滿 300 元則無折扣。若結果有小數，請四捨五入到整數元。請計算客人打折後應付的金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表買書的總金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表折扣後應付的金額（元）。
`)}
${sample(1,
`0`,
`0`,
`買書 0 元未滿 300 元，不打折，付 0 元。`)}
${sample(2,
`299`,
`299`,
`買書 299 元未滿 300 元，不打折，付 299 元。`)}
${sample(3,
`300`,
`270`,
`買書 300 元達 300 元，打 9 折：300×0.9 = 270 元。`)}
${sample(4,
`450`,
`405`,
`買書 450 元達 300 元，打 9 折：450×0.9 = 405 元。`)}
${sample(5,
`100000`,
`90000`,
`買書 100000 元達 300 元，打 9 折：100000×0.9 = 90000 元。`,
`{"data": ["0;0", "299;299", "300;270", "450;405", "100000;90000"]}`)}
'
 onclick='${ONCLICK}'>19
</button> ${answerButtons('書展購書折扣')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>書展購書折扣</td>
</tr>
`;

// ---------------- 第 20 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("20", `學校活動報名統計`, `國小基礎應用`)}
${desc(`
學校統計活動報名人數。請先輸入報名資料的總筆數，再依序讀取每一筆報名者的姓名資料（此姓名資料僅供讀取，不影響計算結果）。請輸出最後的報名總人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數 N，代表報名資料的筆數。<br/>
接下來 N 行，每行輸入一個字串，代表一筆報名者的姓名。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後的報名總人數（即等於 N）。
`)}
${sample(1,
`0`,
`0`,
`共 0 筆報名資料，報名總人數為 0。`)}
${sample(2,
`1<br/>
小明`,
`1`,
`共 1 筆報名資料（小明），報名總人數為 1。`)}
${sample(3,
`3<br/>
小明<br/>
小華<br/>
小美`,
`3`,
`共 3 筆報名資料（小明、小華、小美），報名總人數為 3。`)}
${sample(4,
`8<br/>
報名者1<br/>
報名者2<br/>
報名者3<br/>
報名者4<br/>
報名者5<br/>
報名者6<br/>
報名者7<br/>
報名者8`,
`8`,
`共 8 筆報名資料（報名者1、報名者2、報名者3、報名者4、報名者5、報名者6、報名者7、報名者8），報名總人數為 8。`,
`{"data": ["0;0", "1;小明;1", "3;小明;小華;小美;3", "8;報名者1;報名者2;報名者3;報名者4;報名者5;報名者6;報名者7;報名者8;8"]}`)}
'
 onclick='${ONCLICK}'>20
</button> ${answerButtons('學校活動報名統計')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>學校活動報名統計</td>
</tr>
`;

// ---------------- 第 21 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("21", `校外教學車次`, `國小基礎應用`)}
${desc(`
校外教學包車：每台小巴限乘 20 人。請計算若全班共有 N 位同學，最少需要租用幾台小巴才能讓所有人都坐得下（若有剩餘不滿 20 人，仍需再加開一台車）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數 N，代表同學的總人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最少需要租用的小巴數量。
`)}
${sample(1,
`1`,
`1`,
`每台小巴限乘 20 人，1÷20 無條件進位得 1 台。`)}
${sample(2,
`20`,
`1`,
`每台小巴限乘 20 人，20÷20 無條件進位得 1 台。`)}
${sample(3,
`21`,
`2`,
`每台小巴限乘 20 人，21÷20 無條件進位得 2 台（1 台只能坐 20 人，不夠）。`)}
${sample(4,
`45`,
`3`,
`每台小巴限乘 20 人，45÷20 無條件進位得 3 台（2 台只能坐 40 人，不夠）。`)}
${sample(5,
`1000000`,
`50000`,
`每台小巴限乘 20 人，1000000÷20 無條件進位得 50000 台（49999 台只能坐 999980 人，不夠）。`,
`{"data": ["1;1", "20;1", "21;2", "45;3", "1000000;50000"]}`)}
'
 onclick='${ONCLICK}'>21
</button> ${answerButtons('校外教學車次')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>校外教學車次</td>
</tr>
`;

// ---------------- 第 22 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("22", `社團錄取進階`, `國小基礎應用`)}
${desc(`
羽球隊選拔：每位參加者需經過兩次體能測驗，只有當第一次與第二次的分數都達到 80 分（含）以上時，才算錄取。請統計最後有幾人錄取。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
輸入參加人數。<br/>
接下來依序輸入每一位參加者第一次與第二次的測驗分數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最後錄取的人數。
`)}
${sample(1,
`1<br/>
79 90`,
`0`,
`79 與 90：有一次未達 80 分，不錄取。<br/>共錄取 0 人。`)}
${sample(2,
`1<br/>
80 80`,
`1`,
`80 與 80：兩次都達 80 分，錄取。<br/>共錄取 1 人。`)}
${sample(3,
`3<br/>
85 90<br/>
80 75<br/>
95 100`,
`2`,
`85 與 90：兩次都達 80 分，錄取；80 與 75：有一次未達 80 分，不錄取；95 與 100：兩次都達 80 分，錄取。<br/>共錄取 2 人。`)}
${sample(4,
`4<br/>
100 100<br/>
100 100<br/>
100 100<br/>
100 100`,
`4`,
`100 與 100：兩次都達 80 分，錄取；100 與 100：兩次都達 80 分，錄取；100 與 100：兩次都達 80 分，錄取；100 與 100：兩次都達 80 分，錄取。<br/>共錄取 4 人。`,
`{"data": ["1;79;90;0", "1;80;80;1", "3;85;90;80;75;95;100;2", "4;100;100;100;100;100;100;100;100;4"]}`)}
'
 onclick='${ONCLICK}'>22
</button> ${answerButtons('社團錄取進階')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>社團錄取進階</td>
</tr>
`;

// ---------------- 第 23 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("23", `分班排名`, `國小基礎應用`)}
${desc(`
老師依成績排名分組：將全班依分數由高到低排序，前 10% 的人分到 A 組，其餘分到 B 組。若 10% 計算結果非整數，A 組人數請無條件捨去取整數（即 A 組人數 = floor(N×0.1)），其餘為 B 組人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表總人數。<br/>
接下來 N 行，每行輸入一個整數，代表一位學生的分數。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行整數：<br/>
第 1 行為 A 組人數。<br/>
第 2 行為 B 組人數。
`)}
${sample(1,
`1<br/>
50`,
`0<br/>
1`,
`共 1 人。A 組 = floor(1×0.1) = 0 人；B 組 = 1-0 = 1 人。`)}
${sample(2,
`3<br/>
50<br/>
50<br/>
50`,
`0<br/>
3`,
`共 3 人。A 組 = floor(3×0.1) = 0 人；B 組 = 3-0 = 3 人。`)}
${sample(3,
`4<br/>
50<br/>
50<br/>
50<br/>
50`,
`0<br/>
4`,
`共 4 人。A 組 = floor(4×0.1) = 0 人；B 組 = 4-0 = 4 人。`)}
${sample(4,
`9<br/>
50<br/>
50<br/>
50<br/>
50<br/>
50<br/>
50<br/>
50<br/>
50<br/>
50`,
`0<br/>
9`,
`共 9 人。A 組 = floor(9×0.1) = 0 人；B 組 = 9-0 = 9 人。`,
`{"data": ["1;50;0;1", "3;50;50;50;0;3", "4;50;50;50;50;0;4", "9;50;50;50;50;50;50;50;50;50;0;9"]}`)}
'
 onclick='${ONCLICK}'>23
</button> ${answerButtons('分班排名')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>分班排名</td>
</tr>
`;

// ---------------- 第 24 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("24", `園遊會贈品進階`, `國小基礎應用`)}
${desc(`
園遊會贈品規則：消費金額達到 1000 元（含）以上，贈送大娃娃；未達 1000 元但達到 500 元（含）以上，贈送小玩具；未滿 500 元則沒有贈品。請輸出每位顧客獲得的贈品名稱。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表顧客的消費金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「大娃娃」、「小玩具」或「沒有贈品」三者之一。
`)}
${sample(1,
`0`,
`沒有贈品`,
`消費 0 元，未滿 500 元，輸出「沒有贈品」。`)}
${sample(2,
`499`,
`沒有贈品`,
`消費 499 元，未滿 500 元，輸出「沒有贈品」。`)}
${sample(3,
`500`,
`小玩具`,
`消費 500 元，未達 1000 元但達到 500 元，輸出「小玩具」。`)}
${sample(4,
`1000`,
`大娃娃`,
`消費 1000 元，達到 1000 元，輸出「大娃娃」。`)}
${sample(5,
`999999`,
`大娃娃`,
`消費 999999 元，達到 1000 元，輸出「大娃娃」。`,
`{"data": ["0;沒有贈品", "499;沒有贈品", "500;小玩具", "1000;大娃娃", "999999;大娃娃"]}`)}
'
 onclick='${ONCLICK}'>24
</button> ${answerButtons('園遊會贈品進階')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>園遊會贈品進階</td>
</tr>
`;

// ---------------- 第 25 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("25", `低溫警報`, `國小基礎應用`)}
${desc(`
氣象局監測連續 3 天的氣溫，如果這 3 天的氣溫都低於 10 度（不含 10 度），就顯示「太冷了」；否則顯示「正常」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 3 個整數，分別代表連續 3 天的氣溫（攝氏度）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「太冷了」或「正常」。
`)}
${sample(1,
`8<br/>
9<br/>
7`,
`太冷了`,
`3 天氣溫為 8、9、7，都低於 10 度，輸出「太冷了」。`)}
${sample(2,
`10<br/>
5<br/>
5`,
`正常`,
`3 天氣溫為 10、5、5，其中 10 度沒有低於 10 度，輸出「正常」。`)}
${sample(3,
`9<br/>
9<br/>
9`,
`太冷了`,
`3 天氣溫為 9、9、9，都低於 10 度，輸出「太冷了」。`)}
${sample(4,
`-50<br/>
-40<br/>
-30`,
`太冷了`,
`3 天氣溫為 -50、-40、-30，都低於 10 度，輸出「太冷了」。`,
`{"data": ["8;9;7;太冷了", "10;5;5;正常", "9;9;9;太冷了", "-50;-40;-30;太冷了"]}`)}
'
 onclick='${ONCLICK}'>25
</button> ${answerButtons('低溫警報')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>低溫警報</td>
</tr>
`;

// ---------------- 第 26 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("26", `進步獎統計`, `國小基礎應用`)}
${desc(`
比較全班每位學生兩次小考的成績，若第二次分數高於第一次，視為「進步」，進步幅度為兩次分數之差。請找出全班進步最多的分數（若沒有人進步，輸出 0）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入學生人數。<br/>
接下來依序輸入每一位學生第一次與第二次的成績。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表全班最大的進步分數（若無人進步則輸出 0）。
`)}
${sample(1,
`1<br/>
100 100`,
`0`,
`100→100（沒有進步）。<br/>沒有人進步，輸出 0。`)}
${sample(2,
`3<br/>
70 85<br/>
90 88<br/>
60 60`,
`15`,
`70→85（進步 15 分）；90→88（沒有進步）；60→60（沒有進步）。<br/>最大進步分數為 15 分。`)}
${sample(3,
`1<br/>
0 100`,
`100`,
`0→100（進步 100 分）。<br/>最大進步分數為 100 分。`)}
${sample(4,
`2<br/>
50 49<br/>
50 48`,
`0`,
`50→49（沒有進步）；50→48（沒有進步）。<br/>沒有人進步，輸出 0。`,
`{"data": ["1;100;100;0", "3;70;85;90;88;60;60;15", "1;0;100;100", "2;50;49;50;48;0"]}`)}
'
 onclick='${ONCLICK}'>26
</button> ${answerButtons('進步獎統計')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>進步獎統計</td>
</tr>
`;

// ---------------- 第 27 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("27", `退貨退錢`, `國小基礎應用`)}
${desc(`
商店退貨規則：購買後 7 天內（含第 7 天）退貨，退回全額；第 8 天至第 30 天（含）退貨，只退回一半金額（四捨五入取整數元）；超過 30 天則不接受退貨，退回金額為 0 元。請計算客人最後能拿回多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表購買後至退貨當天經過的天數。<br/>
第 2 行輸入一個正整數，代表商品原本的價錢（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表退還的金額（元）。
`)}
${sample(1,
`7<br/>
1000`,
`1000`,
`第 7 天退貨，在 7 天內，退回全額 1000 元。`)}
${sample(2,
`8<br/>
1000`,
`500`,
`第 8 天退貨，在第 8～30 天內，退回一半：1000÷2 = 500，四捨五入為 500 元。`)}
${sample(3,
`30<br/>
399`,
`200`,
`第 30 天退貨，在第 8～30 天內，退回一半：399÷2 = 199.5，四捨五入為 200 元。`)}
${sample(4,
`31<br/>
500`,
`0`,
`第 31 天退貨，已超過 30 天，不接受退貨，退回 0 元。`)}
${sample(5,
`10<br/>
1`,
`1`,
`第 10 天退貨，在第 8～30 天內，退回一半：1÷2 = 0.5，四捨五入為 1 元。`,
`{"data": ["7;1000;1000", "8;1000;500", "30;399;200", "31;500;0", "10;1;1"]}`)}
'
 onclick='${ONCLICK}'>27
</button> ${answerButtons('退貨退錢')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>退貨退錢</td>
</tr>
`;

// ---------------- 第 28 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("28", `免運費計算`, `國小基礎應用`)}
${desc(`
網路購物運費規則：消費金額超過 2000 元（不含 2000 元）可免運費；消費金額為 2000 元（含）以下則需另外支付 100 元運費。請計算顧客最後總共要付多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表商品的總金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後應付的總金額（含運費，若有）。
`)}
${sample(1,
`0`,
`100`,
`消費 0 元未超過 2000 元，加 100 元運費：0+100 = 100 元。`)}
${sample(2,
`2000`,
`2100`,
`消費 2000 元未超過 2000 元，加 100 元運費：2000+100 = 2100 元。`)}
${sample(3,
`2001`,
`2001`,
`消費 2001 元超過 2000 元，免運費，付 2001 元。`)}
${sample(4,
`1500`,
`1600`,
`消費 1500 元未超過 2000 元，加 100 元運費：1500+100 = 1600 元。`)}
${sample(5,
`999999`,
`999999`,
`消費 999999 元超過 2000 元，免運費，付 999999 元。`,
`{"data": ["0;100", "2000;2100", "2001;2001", "1500;1600", "999999;999999"]}`)}
'
 onclick='${ONCLICK}'>28
</button> ${answerButtons('免運費計算')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>免運費計算</td>
</tr>
`;

// ---------------- 第 29 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("29", `抽獎機率`, `國小基礎應用`)}
${desc(`
抽獎轉盤活動：每個人有 3 次抽獎機會，只要其中至少 1 次結果為「中獎」，就算成功中獎。請統計最後總共有幾個人成功中獎。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入抽獎的人數。<br/>
接下來每行依序輸入一位參加者連續 3 次抽獎的結果。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表成功中獎的人數。
`)}
${sample(1,
`1<br/>
失敗 失敗 失敗`,
`0`,
`第 1 人（失敗、失敗、失敗）都沒中。<br/>共 0 人成功中獎。`)}
${sample(2,
`1<br/>
中獎 中獎 中獎`,
`1`,
`第 1 人（中獎、中獎、中獎）有中獎。<br/>共 1 人成功中獎。`)}
${sample(3,
`2<br/>
失敗 中獎 失敗<br/>
失敗 失敗 失敗`,
`1`,
`第 1 人（失敗、中獎、失敗）有中獎；第 2 人（失敗、失敗、失敗）都沒中。<br/>共 1 人成功中獎。`)}
${sample(4,
`3<br/>
失敗 失敗 失敗<br/>
失敗 中獎 失敗<br/>
中獎 中獎 中獎`,
`2`,
`第 1 人（失敗、失敗、失敗）都沒中；第 2 人（失敗、中獎、失敗）有中獎；第 3 人（中獎、中獎、中獎）有中獎。<br/>共 2 人成功中獎。`,
`{"data": ["1;失敗;失敗;失敗;0", "1;中獎;中獎;中獎;1", "2;失敗;中獎;失敗;失敗;失敗;失敗;1", "3;失敗;失敗;失敗;失敗;中獎;失敗;中獎;中獎;中獎;2"]}`)}
'
 onclick='${ONCLICK}'>29
</button> ${answerButtons('抽獎機率')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>抽獎機率</td>
</tr>
`;

// ---------------- 第 30 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("30", `會員折扣累計`, `國小基礎應用`)}
${desc(`
商店優待規則：若顧客為會員，結帳金額享 9 折優惠；若打完 9 折後的金額仍超過 1000 元（不含 1000 元本身），則再折抵 100 元現金。非會員則沒有任何折扣，以原價付款。若計算過程出現小數，請四捨五入到整數元。請計算顧客最後應付的金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個字串，內容為「是」或「否」，代表顧客是否為會員。<br/>
第 2 行輸入一個正整數，代表原始消費金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後應付的金額（元）。
`)}
${sample(1,
`是<br/>
1000`,
`900`,
`VIP 會員先打 9 折：1000×0.9 = 900 元，未超過 1000 元，不再折抵，四捨五入後為 900 元。`)}
${sample(2,
`是<br/>
1200`,
`980`,
`VIP 會員先打 9 折：1200×0.9 = 1080 元，仍超過 1000 元，再折抵 100 元 = 980 元，四捨五入後為 980 元。`)}
${sample(3,
`否<br/>
1200`,
`1200`,
`非會員，以原價 1200 元計價。`)}
${sample(4,
`是<br/>
0`,
`0`,
`VIP 會員先打 9 折：0×0.9 = 0 元，未超過 1000 元，不再折抵，四捨五入後為 0 元。`,
`{"data": ["是;1000;900", "是;1200;980", "否;1200;1200", "是;0;0"]}`)}
'
 onclick='${ONCLICK}'>30
</button> ${answerButtons('會員折扣累計')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>會員折扣累計</td>
</tr>
`;

// ---------------- 第 31 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("31", `貨物分大小`, `國小基礎應用`)}
${desc(`
搬家公司依重量將箱子分類：重量達到 10 公斤（含）以上為「大箱」；未滿 10 公斤為「小箱」。請統計大箱與小箱各有多少個。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表箱子總數。<br/>
接下來 N 行，每行輸入一個正整數或實數，代表一個箱子的重量（公斤）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行整數：<br/>
第 1 行為大箱的數量。<br/>
第 2 行為小箱的數量。
`)}
${sample(1,
`1<br/>
9.9`,
`0<br/>
1`,
`9.9 公斤未滿 10 公斤為小箱。<br/>大箱 0 個、小箱 1 個。`)}
${sample(2,
`1<br/>
10`,
`1<br/>
0`,
`10 公斤達 10 公斤為大箱。<br/>大箱 1 個、小箱 0 個。`)}
${sample(3,
`4<br/>
12<br/>
8<br/>
10<br/>
5`,
`2<br/>
2`,
`12、10 公斤達 10 公斤為大箱；8、5 公斤未滿 10 公斤為小箱。<br/>大箱 2 個、小箱 2 個。`)}
${sample(4,
`8<br/>
10<br/>
10<br/>
10<br/>
10<br/>
10<br/>
10<br/>
10<br/>
10`,
`8<br/>
0`,
`10、10、10、10、10、10、10、10 公斤達 10 公斤為大箱。<br/>大箱 8 個、小箱 0 個。`,
`{"data": ["1;9.9;0;1", "1;10;1;0", "4;12;8;10;5;2;2", "8;10;10;10;10;10;10;10;10;8;0"]}`)}
'
 onclick='${ONCLICK}'>31
</button> ${answerButtons('貨物分大小')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>貨物分大小</td>
</tr>
`;

// ---------------- 第 32 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("32", `城市找找看`, `國小基礎應用`)}
${desc(`
請根據輸入的城市名稱，判斷該城市屬於台灣的哪個區域。城市與區域的對應如下：台北屬於「北部」；台中屬於「中部」；高雄屬於「南部」。輸入的城市名稱保證只會是台北、台中或高雄三者之一。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個字串，內容為「台北」、「台中」或「高雄」三者之一。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「北部」、「中部」或「南部」三者之一，代表該城市所屬的區域。
`)}
${sample(1,
`台北`,
`北部`,
`台北屬於「北部」。`)}
${sample(2,
`台中`,
`中部`,
`台中屬於「中部」。`)}
${sample(3,
`高雄`,
`南部`,
`高雄屬於「南部」。`,
`{"data": ["台北;北部", "台中;中部", "高雄;南部"]}`)}
'
 onclick='${ONCLICK}'>32
</button> ${answerButtons('城市找找看')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>城市找找看</td>
</tr>
`;

// ---------------- 第 33 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("33", `零用錢扣款`, `國小基礎應用`)}
${desc(`
悠遊卡扣款規則：先檢查卡片餘額是否足夠支付本次消費。如果餘額大於或等於消費金額，就從餘額中扣除消費金額，並輸出扣款後剩下的餘額；如果餘額不足以支付，則輸出「錢不夠」，且不進行扣款。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表卡片目前的餘額。<br/>
第 2 行輸入一個非負整數，代表本次要花費的金額。<br/>
<span ${LBL_OUT}>輸出說明</span>若餘額足夠，輸出一個整數，代表扣款後剩下的餘額；若餘額不足，輸出字串「錢不夠」。
`)}
${sample(1,
`100<br/>
30`,
`70`,
`餘額 100 元 ≥ 消費 30 元，扣款後剩 100-30 = 70 元。`)}
${sample(2,
`100<br/>
100`,
`0`,
`餘額 100 元 ≥ 消費 100 元，扣款後剩 100-100 = 0 元。`)}
${sample(3,
`50<br/>
51`,
`錢不夠`,
`餘額 50 元小於消費 51 元，不扣款，輸出「錢不夠」。`)}
${sample(4,
`0<br/>
0`,
`0`,
`餘額 0 元 ≥ 消費 0 元，扣款後剩 0-0 = 0 元。`,
`{"data": ["100;30;70", "100;100;0", "50;51;錢不夠", "0;0;0"]}`)}
'
 onclick='${ONCLICK}'>33
</button> ${answerButtons('零用錢扣款')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>零用錢扣款</td>
</tr>
`;

// ---------------- 第 34 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("34", `比賽等級`, `國小基礎應用`)}
${desc(`
跑步測驗依秒數分為三個等級：秒數未滿 12 秒（不含 12 秒）為「超快」；12 秒（含）至 15 秒（含）為「普通」；超過 15 秒（不含 15 秒）為「加油」。請統計各等級的人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表參加測驗的人數。<br/>
接下來 N 行，每行輸入一個實數，代表一位參加者的秒數。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出三行整數：<br/>
第 1 行為「超快」的人數。<br/>
第 2 行為「普通」的人數。<br/>
第 3 行為「加油」的人數。
`)}
${sample(1,
`1<br/>
11.9`,
`1<br/>
0<br/>
0`,
`11.9 秒未滿 12 秒為超快。<br/>超快 1 人、普通 0 人、加油 0 人。`)}
${sample(2,
`2<br/>
12<br/>
15`,
`0<br/>
2<br/>
0`,
`12、15 秒介於 12～15 秒為普通。<br/>超快 0 人、普通 2 人、加油 0 人。`)}
${sample(3,
`4<br/>
10<br/>
12<br/>
15<br/>
18`,
`1<br/>
2<br/>
1`,
`10 秒未滿 12 秒為超快；12、15 秒介於 12～15 秒為普通；18 秒超過 15 秒為加油。<br/>超快 1 人、普通 2 人、加油 1 人。`)}
${sample(4,
`1<br/>
100`,
`0<br/>
0<br/>
1`,
`100 秒超過 15 秒為加油。<br/>超快 0 人、普通 0 人、加油 1 人。`,
`{"data": ["1;11.9;1;0;0", "2;12;15;0;2;0", "4;10;12;15;18;1;2;1", "1;100;0;0;1"]}`)}
'
 onclick='${ONCLICK}'>34
</button> ${answerButtons('比賽等級')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>比賽等級</td>
</tr>
`;

// ---------------- 第 35 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("35", `買多打折`, `國小基礎應用`)}
${desc(`
文具店優惠：一次購買數量超過 50 個（不含 50 個）可享 8 折優惠；購買 50 個（含）以下則無折扣，以原價計費。若結果有小數，請四捨五入到整數元。請計算客人最後應付的總金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表文具的單價（元）。<br/>
第 2 行輸入一個正整數，代表購買的數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應付的總金額（元）。
`)}
${sample(1,
`10<br/>
50`,
`500`,
`購買 50 個未超過 50 個，不打折：10×50 = 500 元。`)}
${sample(2,
`10<br/>
51`,
`408`,
`購買 51 個超過 50 個，打 8 折：10×51×0.8 = 408 元。`)}
${sample(3,
`10<br/>
60`,
`480`,
`購買 60 個超過 50 個，打 8 折：10×60×0.8 = 480 元。`)}
${sample(4,
`1<br/>
1000000`,
`800000`,
`購買 1000000 個超過 50 個，打 8 折：1×1000000×0.8 = 800000 元。`,
`{"data": ["10;50;500", "10;51;408", "10;60;480", "1;1000000;800000"]}`)}
'
 onclick='${ONCLICK}'>35
</button> ${answerButtons('買多打折')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>買多打折</td>
</tr>
`;

// ---------------- 第 36 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("36", `教室座位`, `國小基礎應用`)}
${desc(`
教室座位安排規則：每一排固定坐 8 人，座號從 1 號開始依序排列（第 1 排為座號 1~8，第 2 排為座號 9~16，以此類推）。請根據學生的座號，計算他坐在第幾排、第幾個位置（每排內的位置編號從 1 開始）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表學生的座號。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，第一個數字為第幾排，第二個數字為該排的第幾個位置。
`)}
${sample(1,
`1`,
`1<br/>
1`,
`每排 8 人，第 1 排為座號 1～8，<br/>1 號是這排的第 1 個位置（1-0 = 1）。`)}
${sample(2,
`8`,
`1<br/>
8`,
`每排 8 人，第 1 排為座號 1～8，<br/>8 號是這排的第 8 個位置（8-0 = 8）。`)}
${sample(3,
`9`,
`2<br/>
1`,
`每排 8 人，第 2 排為座號 9～16，<br/>9 號是這排的第 1 個位置（9-8 = 1）。`)}
${sample(4,
`10`,
`2<br/>
2`,
`每排 8 人，第 2 排為座號 9～16，<br/>10 號是這排的第 2 個位置（10-8 = 2）。`)}
${sample(5,
`1000`,
`125<br/>
8`,
`每排 8 人，第 125 排為座號 993～1000，<br/>1000 號是這排的第 8 個位置（1000-992 = 8）。`,
`{"data": ["1;1;1", "8;1;8", "9;2;1", "10;2;2", "1000;125;8"]}`)}
'
 onclick='${ONCLICK}'>36
</button> ${answerButtons('教室座位')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>教室座位</td>
</tr>
`;

// ---------------- 第 37 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("37", `寄包裹運費`, `國小基礎應用`)}
${desc(`
寄送包裹的運費規則：第 1 公斤（含不足 1 公斤）收費 80 元；超過第 1 公斤之後，每增加 1 公斤（不足 1 公斤的部分也視為 1 公斤）加收 20 元。請計算寄送此包裹需要多少運費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正實數，代表包裹的總重量（公斤）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總運費（元）。
`)}
${sample(1,
`1`,
`80`,
`重量 1 公斤，在第 1 公斤以內，運費 80 元。`)}
${sample(2,
`1.1`,
`100`,
`重量 1.1 公斤，超過 1 公斤的部分 0.1 公斤以 1 公斤計，<br/>運費 80+1×20 = 100 元。`)}
${sample(3,
`3.2`,
`140`,
`重量 3.2 公斤，超過 1 公斤的部分 2.2 公斤以 3 公斤計，<br/>運費 80+3×20 = 140 元。`)}
${sample(4,
`100`,
`2060`,
`重量 100 公斤，超過 1 公斤的部分 99 公斤以 99 公斤計，<br/>運費 80+99×20 = 2060 元。`,
`{"data": ["1;80", "1.1;100", "3.2;140", "100;2060"]}`)}
'
 onclick='${ONCLICK}'>37
</button> ${answerButtons('寄包裹運費')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>寄包裹運費</td>
</tr>
`;

// ---------------- 第 38 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("38", `看病掛號費`, `國小基礎應用`)}
${desc(`
診所依身分收取掛號費：成人 200 元，小朋友與老人各 100 元。請根據今天掛號名單中三種身分的人數，計算今天總共收了多少掛號費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表「成人」的人數。<br/>
第 2 行輸入一個非負整數，代表「小朋友」的人數。<br/>
第 3 行輸入一個非負整數，代表「老人」的人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表掛號費總收入（元）。
`)}
${sample(1,
`0<br/>
0<br/>
0`,
`0`,
`成人 0×200 = 0 元，小朋友 0×100 = 0 元，老人 0×100 = 0 元，<br/>總計 0 元。`)}
${sample(2,
`3<br/>
2<br/>
1`,
`900`,
`成人 3×200 = 600 元，小朋友 2×100 = 200 元，老人 1×100 = 100 元，<br/>總計 900 元。`)}
${sample(3,
`1<br/>
0<br/>
0`,
`200`,
`成人 1×200 = 200 元，小朋友 0×100 = 0 元，老人 0×100 = 0 元，<br/>總計 200 元。`)}
${sample(4,
`0<br/>
100<br/>
100`,
`20000`,
`成人 0×200 = 0 元，小朋友 100×100 = 10000 元，老人 100×100 = 10000 元，<br/>總計 20000 元。`,
`{"data": ["0;0;0;0", "3;2;1;900", "1;0;0;200", "0;100;100;20000"]}`)}
'
 onclick='${ONCLICK}'>38
</button> ${answerButtons('看病掛號費')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>看病掛號費</td>
</tr>
`;

// ---------------- 第 39 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("39", `購物金折價`, `國小基礎應用`)}
${desc(`
滿額送折價券活動：消費金額達到 1000 元（含）以上，可以使用一張 100 元的折價券折抵；未達 1000 元則不能使用折價券。請計算客人最後需要付多少錢（若消費金額未達 1000 元，即使輸入有折價券，也視為不能使用）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表消費金額（元）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表顧客是否持有折價券。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後結帳金額（元）。
`)}
${sample(1,
`1200<br/>
是`,
`1100`,
`消費 1200 元達 1000 元，且有折價券，折抵 100 元：1200-100 = 1100 元。`)}
${sample(2,
`999<br/>
是`,
`999`,
`消費 999 元未達 1000 元，不能使用折價券，付 999 元。`)}
${sample(3,
`1000<br/>
否`,
`1000`,
`消費 1000 元雖達 1000 元，但沒有折價券，付 1000 元。`)}
${sample(4,
`1000<br/>
是`,
`900`,
`消費 1000 元達 1000 元，且有折價券，折抵 100 元：1000-100 = 900 元。`,
`{"data": ["1200;是;1100", "999;是;999", "1000;否;1000", "1000;是;900"]}`)}
'
 onclick='${ONCLICK}'>39
</button> ${answerButtons('購物金折價')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>購物金折價</td>
</tr>
`;

// ---------------- 第 40 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("40", `闖關成功嗎？`, `國小基礎應用`)}
${desc(`
遊戲三關過關條件：三關的「平均分數」須達到 70 分（含）以上，而且每一關的分數都不能低於 60 分（即每關皆須達到 60 分（含）以上），兩個條件必須同時成立才算過關。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數，分別代表第一關、第二關、第三關的分數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「是」（過關）或「否」（未過關）。
`)}
${sample(1,
`90<br/>
55<br/>
80`,
`否`,
`平均 (90+55+80)÷3 = 75，達 70 分；有關卡低於 60 分（55）。<br/>條件沒有同時成立，未過關，輸出「否」。`)}
${sample(2,
`70<br/>
70<br/>
70`,
`是`,
`平均 (70+70+70)÷3 = 70，達 70 分；每關都達 60 分。<br/>兩個條件都成立，過關，輸出「是」。`)}
${sample(3,
`100<br/>
100<br/>
0`,
`否`,
`平均 (100+100+0)÷3 = 66.67，未達 70 分；有關卡低於 60 分（0）。<br/>條件沒有同時成立，未過關，輸出「否」。`)}
${sample(4,
`60<br/>
60<br/>
60`,
`否`,
`平均 (60+60+60)÷3 = 60，未達 70 分；每關都達 60 分。<br/>條件沒有同時成立，未過關，輸出「否」。`,
`{"data": ["90;55;80;否", "70;70;70;是", "100;100;0;否", "60;60;60;否"]}`)}
'
 onclick='${ONCLICK}'>40
</button> ${answerButtons('闖關成功嗎？')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>闖關成功嗎？</td>
</tr>
`;

// ---------------- 第 41 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("41", `存錢統計`, `國小基礎應用`)}
${desc(`
記錄一整年 12 個月的存錢金額，請找出存最多的月份金額、存最少的月份金額，以及這一年總共存了多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 12 個非負整數，分別代表 1 月至 12 月每個月存的金額。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出三行整數：<br/>
第 1 行為最高的月存金額。<br/>
第 2 行為最低的月存金額。<br/>
第 3 行為全年總金額。
`)}
${sample(1,
`0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0`,
`0<br/>
0<br/>
0`,
`12 個月中最高的月存金額為 0（1 月），最低為 0（1 月），<br/>全年總和 = 0 元。`)}
${sample(2,
`500<br/>
300<br/>
800<br/>
200<br/>
600<br/>
700<br/>
900<br/>
100<br/>
400<br/>
1000<br/>
250<br/>
350`,
`1000<br/>
100<br/>
6100`,
`12 個月中最高的月存金額為 1000（10 月），最低為 100（8 月），<br/>全年總和 = 6100 元。`)}
${sample(3,
`100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100`,
`100<br/>
100<br/>
1200`,
`12 個月中最高的月存金額為 100（1 月），最低為 100（1 月），<br/>全年總和 = 1200 元。`)}
${sample(4,
`1<br/>
2<br/>
3<br/>
4<br/>
5<br/>
6<br/>
7<br/>
8<br/>
9<br/>
10<br/>
11<br/>
12`,
`12<br/>
1<br/>
78`,
`12 個月中最高的月存金額為 12（12 月），最低為 1（1 月），<br/>全年總和 = 78 元。`,
`{"data": ["0;0;0;0;0;0;0;0;0;0;0;0;0;0;0", "500;300;800;200;600;700;900;100;400;1000;250;350;1000;100;6100", "100;100;100;100;100;100;100;100;100;100;100;100;100;100;1200", "1;2;3;4;5;6;7;8;9;10;11;12;12;1;78"]}`)}
'
 onclick='${ONCLICK}'>41
</button> ${answerButtons('存錢統計')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>存錢統計</td>
</tr>
`;

// ---------------- 第 42 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("42", `車位剩多少`, `國小基礎應用`)}
${desc(`
停車場管理：若目前已停放的車輛數已達到總車位數，即代表車位已滿，顯示「車位已滿」；否則顯示剩餘的車位數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表停車場的總車位數。<br/>
第 2 行輸入一個非負整數，代表目前已經停放的車輛數（不會超過總車位數）。<br/>
<span ${LBL_OUT}>輸出說明</span>若車位已滿，輸出字串「車位已滿」；否則輸出一個整數，代表剩餘的車位數。
`)}
${sample(1,
`50<br/>
50`,
`車位已滿`,
`總車位 50 個，已停 50 輛，車位已滿。`)}
${sample(2,
`50<br/>
0`,
`50`,
`總車位 50 個，已停 0 輛，剩 50-0 = 50 個車位。`)}
${sample(3,
`1<br/>
0`,
`1`,
`總車位 1 個，已停 0 輛，剩 1-0 = 1 個車位。`)}
${sample(4,
`100<br/>
99`,
`1`,
`總車位 100 個，已停 99 輛，剩 100-99 = 1 個車位。`,
`{"data": ["50;50;車位已滿", "50;0;50", "1;0;1", "100;99;1"]}`)}
'
 onclick='${ONCLICK}'>42
</button> ${answerButtons('車位剩多少')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>車位剩多少</td>
</tr>
`;

// ---------------- 第 43 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("43", `加分鼓勵`, `國小基礎應用`)}
${desc(`
老師加分規則：若全班平均分數低於 60 分（不含 60 分），則每位學生的成績都加 5 分，但加分後任何人的分數都不能超過 100 分（超過則以 100 分計）。請計算加分處理後的全班新平均分數（四捨五入到小數點後 1 位；若原本平均已達 60 分（含）以上，則不加分，直接輸出原平均）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表學生人數。<br/>
接下來 N 行，每行輸入一個整數（0~100），代表一位學生的成績。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個數字（四捨五入到小數點後 1 位），代表調整後的全班平均分數。
`)}
${sample(1,
`3<br/>
40<br/>
50<br/>
60`,
`55`,
`原平均 150÷3 = 50 分，低於 60 分，每人加 5 分（最高 100 分）後為 45、55、65，<br/>新平均 165÷3 = 55 分。`)}
${sample(2,
`2<br/>
59<br/>
59`,
`64`,
`原平均 118÷2 = 59 分，低於 60 分，每人加 5 分（最高 100 分）後為 64、64，<br/>新平均 128÷2 = 64 分。`)}
${sample(3,
`3<br/>
60<br/>
60<br/>
60`,
`60`,
`原平均 180÷3 = 60 分，已達 60 分，不加分，直接輸出原平均。`)}
${sample(4,
`3<br/>
98<br/>
99<br/>
100`,
`99`,
`原平均 297÷3 = 99 分，已達 60 分，不加分，直接輸出原平均。`,
`{"data": ["3;40;50;60;55", "2;59;59;64", "3;60;60;60;60", "3;98;99;100;99"]}`)}
'
 onclick='${ONCLICK}'>43
</button> ${answerButtons('加分鼓勵')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>加分鼓勵</td>
</tr>
`;

// ---------------- 第 44 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("44", `三戰兩勝排名`, `國小基礎應用`)}
${desc(`
兩位選手進行三回合比賽，每回合分數較高者贏得該回合；若兩人分數相同，該回合不分勝負。若某位選手在三回合中贏得的回合數達到 2 回合（含）以上，則該選手贏得整場比賽。請輸出比賽結果：1 代表第一人獲勝、2 代表第二人獲勝、0 代表兩人都未贏得 2 回合以上（平手）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行依序輸入第一人第一、第二、第三回合的成績。<br/>
第 2 行依序輸入第二人第一、第二、第三回合的成績。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，內容為 1、2 或 0。
`)}
${sample(1,
`90 70 85<br/>
80 75 60`,
`1`,
`第 1 回合 90 比 80，第一人勝；第 2 回合 70 比 75，第二人勝；第 3 回合 85 比 60，第一人勝。<br/>第一人贏 2 回合、第二人贏 1 回合，輸出 1。`)}
${sample(2,
`50 50 50<br/>
50 50 50`,
`0`,
`第 1 回合 50 比 50，平手；第 2 回合 50 比 50，平手；第 3 回合 50 比 50，平手。<br/>第一人贏 0 回合、第二人贏 0 回合，輸出 0。`)}
${sample(3,
`10 10 10<br/>
20 20 20`,
`2`,
`第 1 回合 10 比 20，第二人勝；第 2 回合 10 比 20，第二人勝；第 3 回合 10 比 20，第二人勝。<br/>第一人贏 0 回合、第二人贏 3 回合，輸出 2。`)}
${sample(4,
`100 0 100<br/>
0 100 0`,
`1`,
`第 1 回合 100 比 0，第一人勝；第 2 回合 0 比 100，第二人勝；第 3 回合 100 比 0，第一人勝。<br/>第一人贏 2 回合、第二人贏 1 回合，輸出 1。`,
`{"data": ["90;70;85;80;75;60;1", "50;50;50;50;50;50;0", "10;10;10;20;20;20;2", "100;0;100;0;100;0;1"]}`)}
'
 onclick='${ONCLICK}'>44
</button> ${answerButtons('三戰兩勝排名')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>三戰兩勝排名</td>
</tr>
`;

// ---------------- 第 45 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("45", `誰走最快`, `國小基礎應用`)}
${desc(`
健走比賽：記錄每位參加者走完 3 公里所花費的時間（秒）。請找出花費時間最少（走最快）的秒數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表參加人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位參加者花費的秒數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最少花費的秒數。
`)}
${sample(1,
`3<br/>
1500<br/>
1420<br/>
1600`,
`1420`,
`3 位的秒數為 1500、1420、1600，其中最小（最快）的是 1420 秒。`)}
${sample(2,
`1<br/>
1`,
`1`,
`1 位的秒數為 1，其中最小（最快）的是 1 秒。`)}
${sample(3,
`3<br/>
999999<br/>
1<br/>
999999`,
`1`,
`3 位的秒數為 999999、1、999999，其中最小（最快）的是 1 秒。`)}
${sample(4,
`3<br/>
100<br/>
100<br/>
100`,
`100`,
`3 位的秒數為 100、100、100，其中最小（最快）的是 100 秒。`,
`{"data": ["3;1500;1420;1600;1420", "1;1;1", "3;999999;1;999999;1", "3;100;100;100;100"]}`)}
'
 onclick='${ONCLICK}'>45
</button> ${answerButtons('誰走最快')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>誰走最快</td>
</tr>
`;

// ---------------- 第 46 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("46", `超級折扣`, `國小基礎應用`)}
${desc(`
商店優待規則：若出示學生證，原本金額可打 9 折；若不出示學生證則不打折。之後若需要購買袋子，則在折扣後的金額上再加收 1 元袋子費。若結果有小數，請四捨五入到整數元。請計算最後結帳金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表原本金額（元）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否出示學生證。<br/>
第 3 行輸入一個字串，內容為「是」或「否」，代表是否購買袋子。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後應付的金額（元）。
`)}
${sample(1,
`200<br/>
是<br/>
是`,
`181`,
`原本 200 元，出示學生證打 9 折 = 180 元；購買袋子加 1 元 = 181 元。<br/>應付 181 元。`)}
${sample(2,
`200<br/>
否<br/>
否`,
`200`,
`原本 200 元，沒有出示學生證，不打折；不買袋子。<br/>應付 200 元。`)}
${sample(3,
`0<br/>
是<br/>
是`,
`1`,
`原本 0 元，出示學生證打 9 折 = 0 元；購買袋子加 1 元 = 1 元。<br/>應付 1 元。`)}
${sample(4,
`999<br/>
否<br/>
是`,
`1000`,
`原本 999 元，沒有出示學生證，不打折；購買袋子加 1 元 = 1000 元。<br/>應付 1000 元。`,
`{"data": ["200;是;是;181", "200;否;否;200", "0;是;是;1", "999;否;是;1000"]}`)}
'
 onclick='${ONCLICK}'>46
</button> ${answerButtons('超級折扣')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>超級折扣</td>
</tr>
`;

// ---------------- 第 47 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("47", `挑選小隊長`, `國小基礎應用`)}
${desc(`
根據每位學生的考試分數挑選小隊長：分數最高的同學當選；如果有多位學生的分數並列最高分，則以最先被輸入（最早輸入）的那一位為準。請依序輸入每位學生的成績，輸出小隊長是第幾位被輸入的學生（從 1 開始計數）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表學生人數。<br/>
接下來 N 行，每行輸入一個整數，代表依序輸入的每位學生分數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表小隊長是第幾位被輸入的學生（輸入順序編號從 1 開始）。
`)}
${sample(1,
`4<br/>
80<br/>
95<br/>
95<br/>
70`,
`2`,
`4 位學生分數為 80、95、95、70，最高分 95，最早出現的是第 2 位（並列最高分取最先輸入者）。`)}
${sample(2,
`1<br/>
100`,
`1`,
`1 位學生分數為 100，最高分 100，最早出現的是第 1 位。`)}
${sample(3,
`3<br/>
50<br/>
50<br/>
50`,
`1`,
`3 位學生分數為 50、50、50，最高分 50，最早出現的是第 1 位（並列最高分取最先輸入者）。`)}
${sample(4,
`5<br/>
1<br/>
2<br/>
3<br/>
100<br/>
100`,
`4`,
`5 位學生分數為 1、2、3、100、100，最高分 100，最早出現的是第 4 位（並列最高分取最先輸入者）。`,
`{"data": ["4;80;95;95;70;2", "1;100;1", "3;50;50;50;1", "5;1;2;3;100;100;4"]}`)}
'
 onclick='${ONCLICK}'>47
</button> ${answerButtons('挑選小隊長')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>挑選小隊長</td>
</tr>
`;

// ---------------- 第 48 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("48", `電影院位置`, `國小基礎應用`)}
${desc(`
電影院一排固定有 10 個座位。請根據想買的票數，判斷該排座位是否足夠容納（即買票張數不超過 10 張視為夠坐），並計算購票後剩餘的座位數（若座位不足，剩餘座位以 0 表示）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表想買的票數。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行：<br/>
第 1 行輸出字串「是」（夠坐）或「否」（不夠坐）。<br/>
第 2 行輸出一個整數，代表購票後剩餘的座位數（若不夠坐則輸出 0）。
`)}
${sample(1,
`7`,
`是<br/>
3`,
`買 7 張，不超過 10 張，夠坐；剩下 10-7 = 3 個座位。`)}
${sample(2,
`10`,
`是<br/>
0`,
`買 10 張，不超過 10 張，夠坐；剩下 10-10 = 0 個座位。`)}
${sample(3,
`11`,
`否<br/>
0`,
`買 11 張，超過 10 張，不夠坐；剩餘座位輸出 0。`)}
${sample(4,
`1`,
`是<br/>
9`,
`買 1 張，不超過 10 張，夠坐；剩下 10-1 = 9 個座位。`,
`{"data": ["7;是;3", "10;是;0", "11;否;0", "1;是;9"]}`)}
'
 onclick='${ONCLICK}'>48
</button> ${answerButtons('電影院位置')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>電影院位置</td>
</tr>
`;

// ---------------- 第 49 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("49", `偏遠加費`, `國小基礎應用`)}
${desc(`
寄送快遞的運費規則：基本運費 100 元；重量超過 5 公斤的部分，每多 1 公斤（不足 1 公斤以 1 公斤計）加收 20 元；若寄送地點為偏遠地區，另外加收 50 元。請計算總運費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正實數，代表包裹重量（公斤）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否為偏遠地區。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總運費（元）。
`)}
${sample(1,
`5<br/>
否`,
`100`,
`基本 100 元；5 公斤未超過 5 公斤，不加價；非偏遠地區。<br/>總運費 100 元。`)}
${sample(2,
`5.1<br/>
否`,
`120`,
`基本 100 元；超過 5 公斤的 0.1 公斤以 1 公斤計，加 1×20 = 20 元；非偏遠地區。<br/>總運費 120 元。`)}
${sample(3,
`7.5<br/>
是`,
`210`,
`基本 100 元；超過 5 公斤的 2.5 公斤以 3 公斤計，加 3×20 = 60 元；偏遠地區加 50 元。<br/>總運費 210 元。`)}
${sample(4,
`100<br/>
是`,
`2050`,
`基本 100 元；超過 5 公斤的 95 公斤以 95 公斤計，加 95×20 = 1900 元；偏遠地區加 50 元。<br/>總運費 2050 元。`,
`{"data": ["5;否;100", "5.1;否;120", "7.5;是;210", "100;是;2050"]}`)}
'
 onclick='${ONCLICK}'>49
</button> ${answerButtons('偏遠加費')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>偏遠加費</td>
</tr>
`;

// ---------------- 第 50 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("50", `門票優惠`, `國小基礎應用`)}
${desc(`
門票優惠規則：「兩人同行一人半價」，即每兩位一組，一人付全票 200 元、另一人付半票 100 元，一組共收 300 元。如果人數為奇數，最後剩下的一人須付全票 200 元（因為沒有同行的夥伴）。請計算這群人的結帳總金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表總人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表結帳總金額（元）。
`)}
${sample(1,
`0`,
`0`,
`0 人可分成 0 組，每組 300 元 = 0 元；沒有剩下的人，共 0 元。`)}
${sample(2,
`1`,
`200`,
`1 人可分成 0 組，每組 300 元 = 0 元；剩 1 人付全票 200 元，共 200 元。`)}
${sample(3,
`2`,
`300`,
`2 人可分成 1 組，每組 300 元 = 300 元；沒有剩下的人，共 300 元。`)}
${sample(4,
`5`,
`800`,
`5 人可分成 2 組，每組 300 元 = 600 元；剩 1 人付全票 200 元，共 800 元。`)}
${sample(5,
`101`,
`15200`,
`101 人可分成 50 組，每組 300 元 = 15000 元；剩 1 人付全票 200 元，共 15200 元。`,
`{"data": ["0;0", "1;200", "2;300", "5;800", "101;15200"]}`)}
'
 onclick='${ONCLICK}'>50
</button> ${answerButtons('門票優惠')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>門票優惠</td>
</tr>
`;

// ---------------- 第 51 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("51", `社團錄取`, `國小基礎應用`)}
${desc(`
社團錄取規則：只要分數達到 80 分（含）以上，或是具備特殊才藝，兩個條件符合其中一個即可錄取。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個整數，代表成績。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否具備特殊才藝。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「是」或「否」，代表是否錄取。
`)}
${sample(1,
`79<br/>
否`,
`否`,
`成績 79 分未達 80 分，沒有特殊才藝，兩個條件都不符合，不錄取，輸出「否」。`)}
${sample(2,
`80<br/>
否`,
`是`,
`成績 80 分達到 80 分，沒有特殊才藝，符合其中一個條件，錄取，輸出「是」。`)}
${sample(3,
`75<br/>
是`,
`是`,
`成績 75 分未達 80 分，具備特殊才藝，符合其中一個條件，錄取，輸出「是」。`)}
${sample(4,
`0<br/>
否`,
`否`,
`成績 0 分未達 80 分，沒有特殊才藝，兩個條件都不符合，不錄取，輸出「否」。`,
`{"data": ["79;否;否", "80;否;是", "75;是;是", "0;否;否"]}`)}
'
 onclick='${ONCLICK}'>51
</button> ${answerButtons('社團錄取')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>社團錄取</td>
</tr>
`;

// ---------------- 第 52 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("52", `分段收費`, `國小基礎應用`)}
${desc(`
存錢筒手續費規則：存入金額為 1000 元（含）以下，收取 10 元手續費；存入金額為 1001 元（含）以上，收取 20 元手續費。請計算最後實際存進去多少錢（存入金額扣除手續費）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表存入的金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後實際存入的金額（元，即存入金額扣除手續費）。
`)}
${sample(1,
`1000`,
`990`,
`存入 1000 元，在 1000 元（含）以下，手續費 10 元，實際存入 1000-10 = 990 元。`)}
${sample(2,
`1001`,
`981`,
`存入 1001 元，在 1001 元（含）以上，手續費 20 元，實際存入 1001-20 = 981 元。`)}
${sample(3,
`1500`,
`1480`,
`存入 1500 元，在 1001 元（含）以上，手續費 20 元，實際存入 1500-20 = 1480 元。`)}
${sample(4,
`1`,
`-9`,
`存入 1 元，在 1000 元（含）以下，手續費 10 元，實際存入 1-10 = -9 元。`,
`{"data": ["1000;990", "1001;981", "1500;1480", "1;-9"]}`)}
'
 onclick='${ONCLICK}'>52
</button> ${answerButtons('分段收費')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>分段收費</td>
</tr>
`;

// ---------------- 第 53 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("53", `點數加倍送`, `國小基礎應用`)}
${desc(`
買零食集點規則：每滿 100 元（不足 100 元的部分捨去不計）可獲得 1 點；若購買的是「特別促銷品」，獲得的點數變為 3 倍。請計算最後拿到幾點。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表消費金額（元）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否為特別促銷品。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後獲得的總點數。
`)}
${sample(1,
`0<br/>
否`,
`0`,
`消費 0 元，每滿 100 元 1 點，得 0 點；不是促銷品，點數不變。`)}
${sample(2,
`99<br/>
是`,
`0`,
`消費 99 元，每滿 100 元 1 點，得 0 點；特別促銷品點數 3 倍 = 0 點。`)}
${sample(3,
`350<br/>
是`,
`9`,
`消費 350 元，每滿 100 元 1 點，得 3 點；特別促銷品點數 3 倍 = 9 點。`)}
${sample(4,
`1000000<br/>
否`,
`10000`,
`消費 1000000 元，每滿 100 元 1 點，得 10000 點；不是促銷品，點數不變。`,
`{"data": ["0;否;0", "99;是;0", "350;是;9", "1000000;否;10000"]}`)}
'
 onclick='${ONCLICK}'>53
</button> ${answerButtons('點數加倍送')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>點數加倍送</td>
</tr>
`;

// ---------------- 第 54 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("54", `天氣怪怪的`, `國小基礎應用`)}
${desc(`
氣象觀察：針對一週（7 天）的氣溫資料，如果存在任何連續 3 天，其中每相鄰兩天的溫差（絕對值）都超過 5 度，就視為「天氣不穩定」，顯示「是」；否則顯示「否」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 7 個整數，分別代表一週 7 天的氣溫。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「是」或「否」。
`)}
${sample(1,
`20<br/>
28<br/>
15<br/>
16<br/>
17<br/>
18<br/>
19`,
`是`,
`第 1～3 天氣溫 20、28、15，相鄰溫差 8 與 13 都超過 5 度，天氣不穩定，輸出「是」。`)}
${sample(2,
`10<br/>
10<br/>
10<br/>
10<br/>
10<br/>
10<br/>
10`,
`否`,
`氣溫為 10、10、10、10、10、10、10，找不到連續 3 天相鄰溫差都超過 5 度的情形，輸出「否」。`)}
${sample(3,
`0<br/>
10<br/>
0<br/>
10<br/>
0<br/>
10<br/>
0`,
`是`,
`第 1～3 天氣溫 0、10、0，相鄰溫差 10 與 10 都超過 5 度，天氣不穩定，輸出「是」。`)}
${sample(4,
`-10<br/>
10<br/>
-10<br/>
10<br/>
-10<br/>
10<br/>
-10`,
`是`,
`第 1～3 天氣溫 -10、10、-10，相鄰溫差 20 與 20 都超過 5 度，天氣不穩定，輸出「是」。`,
`{"data": ["20;28;15;16;17;18;19;是", "10;10;10;10;10;10;10;否", "0;10;0;10;0;10;0;是", "-10;10;-10;10;-10;10;-10;是"]}`)}
'
 onclick='${ONCLICK}'>54
</button> ${answerButtons('天氣怪怪的')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>天氣怪怪的</td>
</tr>
`;

// ---------------- 第 55 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("55", `獎品要準備多少`, `國小基礎應用`)}
${desc(`
園遊會擺攤獎勵規則：每個攤位的營收金額只要達到 500 元（含）以上，就送 1 份獎品（每個攤位最多送 1 份）。請計算總共需要準備幾份獎品。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表攤位數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一個攤位的營收金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表需要準備的獎品總數量。
`)}
${sample(1,
`1<br/>
499`,
`0`,
`1 位的營收為 499，達到 500 以上的有 0 份。`)}
${sample(2,
`1<br/>
500`,
`1`,
`1 位的營收為 500，達到 500 以上的有 500，共 1 份。`)}
${sample(3,
`3<br/>
600<br/>
400<br/>
500`,
`2`,
`3 位的營收為 600、400、500，達到 500 以上的有 600、500，共 2 份。`)}
${sample(4,
`8<br/>
500<br/>
500<br/>
500<br/>
500<br/>
500<br/>
500<br/>
500<br/>
500`,
`8`,
`8 位的營收為 500、500、500、500、500、500、500、500，達到 500 以上的有 500、500、500、500、500、500、500、500，共 8 份。`,
`{"data": ["1;499;0", "1;500;1", "3;600;400;500;2", "8;500;500;500;500;500;500;500;500;8"]}`)}
'
 onclick='${ONCLICK}'>55
</button> ${answerButtons('獎品要準備多少')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>獎品要準備多少</td>
</tr>
`;

// ---------------- 第 56 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("56", `同分怎麼辦`, `國小基礎應用`)}
${desc(`
比賽排名規則：依成績由高到低排序；如果兩位選手成績相同，則序號較小的排在前面。請輸出排序後的名單。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入參賽人數。<br/>
接下來每行依序輸入一位選手的序號與成績。<br/>
<span ${LBL_OUT}>輸出說明</span>每行輸出一個整數，代表排序後每個名次對應的選手序號（由第 1 名到最後一名）。
`)}
${sample(1,
`3<br/>
1 80<br/>
2 90<br/>
3 80`,
`2<br/>
1<br/>
3`,
`依成績由高到低排序（同分時序號小者在前）：2 號 90 分、1 號 80 分、3 號 80 分。`)}
${sample(2,
`1<br/>
1 50`,
`1`,
`依成績由高到低排序（同分時序號小者在前）：1 號 50 分。`)}
${sample(3,
`3<br/>
1 50<br/>
2 50<br/>
3 50`,
`1<br/>
2<br/>
3`,
`依成績由高到低排序（同分時序號小者在前）：1 號 50 分、2 號 50 分、3 號 50 分。`)}
${sample(4,
`4<br/>
4 20<br/>
3 20<br/>
2 30<br/>
1 30`,
`1<br/>
2<br/>
3<br/>
4`,
`依成績由高到低排序（同分時序號小者在前）：1 號 30 分、2 號 30 分、3 號 20 分、4 號 20 分。`,
`{"data": ["3;1;80;2;90;3;80;2;1;3", "1;1;50;1", "3;1;50;2;50;3;50;1;2;3", "4;4;20;3;20;2;30;1;30;1;2;3;4"]}`)}
'
 onclick='${ONCLICK}'>56
</button> ${answerButtons('同分怎麼辦')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>同分怎麼辦</td>
</tr>
`;

// ---------------- 第 57 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("57", `餐廳排隊`, `國小基礎應用`)}
${desc(`
餐廳帶位規則：有事先預約的客人優先帶位；沒有預約的客人，依現場登記人數由多到少依序帶位（人數較多的團體優先，人數相同則依登記順序，先登記者優先）。多組有預約的客人之間，也依登記（輸入）順序帶位。請輸出帶位順序。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
輸入登記的客人組數。<br/>
接下來依序輸入每位客人第一個為字串「是」或「否」（是否有預約），第二個為整數（該組人數）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出帶位順序中，第幾組（以輸入順序編號，從 1 開始）客人被帶位。
`)}
${sample(1,
`3<br/>
否 4<br/>
是 2<br/>
否 6`,
`2<br/>
3<br/>
1`,
`有預約的組別：第 2 組，依登記順序優先帶位。<br/>沒有預約的組別依人數由多到少：第 3 組（6 人）、第 1 組（4 人）。<br/>帶位順序為 2 → 3 → 1。`)}
${sample(2,
`1<br/>
否 1`,
`1`,
`沒有預約的組別依人數由多到少：第 1 組（1 人）。<br/>帶位順序為 1。`)}
${sample(3,
`3<br/>
是 1<br/>
是 1<br/>
是 1`,
`1<br/>
2<br/>
3`,
`有預約的組別：第 1 組、第 2 組、第 3 組，依登記順序優先帶位。<br/>帶位順序為 1 → 2 → 3。`)}
${sample(4,
`3<br/>
否 5<br/>
否 5<br/>
否 10`,
`3<br/>
1<br/>
2`,
`沒有預約的組別依人數由多到少：第 3 組（10 人）、第 1 組（5 人）、第 2 組（5 人）。<br/>帶位順序為 3 → 1 → 2。`,
`{"data": ["3;否;4;是;2;否;6;2;3;1", "1;否;1;1", "3;是;1;是;1;是;1;1;2;3", "3;否;5;否;5;否;10;3;1;2"]}`)}
'
 onclick='${ONCLICK}'>57
</button> ${answerButtons('餐廳排隊')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>餐廳排隊</td>
</tr>
`;

// ---------------- 第 58 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("58", `買三送一嗎？`, `國小基礎應用`)}
${desc(`
商店優惠規則：消費金額超過 3000 元（不含 3000 元），或是同一種商品購買達到 3 個（含）以上，只要符合其中一個條件，結帳金額就打 85 折。若結果有小數，請四捨五入到整數元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表消費金額（元）。<br/>
第 2 行輸入一個正整數，代表購買的件數（同一種商品）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表結帳金額（元）。
`)}
${sample(1,
`2000<br/>
3`,
`1700`,
`購買 3 個達 3 個，打 85 折：2000×0.85 = 1700，四捨五入為 1700 元。`)}
${sample(2,
`3001<br/>
1`,
`2551`,
`金額超過 3000 元，打 85 折：3001×0.85 = 2550.85，四捨五入為 2551 元。`)}
${sample(3,
`3000<br/>
2`,
`3000`,
`金額 3000 元未超過 3000 元，且件數 2 未達 3 個，不打折，付 3000 元。`)}
${sample(4,
`0<br/>
0`,
`0`,
`金額 0 元未超過 3000 元，且件數 0 未達 3 個，不打折，付 0 元。`,
`{"data": ["2000;3;1700", "3001;1;2551", "3000;2;3000", "0;0;0"]}`)}
'
 onclick='${ONCLICK}'>58
</button> ${answerButtons('買三送一嗎？')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>買三送一嗎？</td>
</tr>
`;

// ---------------- 第 59 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("59", `每日挑戰`, `國小基礎應用`)}
${desc(`
背單字挑戰規則：連續 5 天，只要「每天」都背超過 50 個（不含 50 個，需大於 50 個），或是 5 天的總數超過 300 個（不含 300 個），只要符合其中一個條件就算過關。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 5 個非負整數，分別代表這 5 天每天背誦的單字數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「是」或「否」，代表是否過關。
`)}
${sample(1,
`51<br/>
51<br/>
51<br/>
51<br/>
51`,
`是`,
`5 天分別為 51、51、51、51、51，每天都超過 50 個；總數 255 個，未超過 300 個。<br/>符合其中一個條件，輸出「是」。`)}
${sample(2,
`10<br/>
10<br/>
10<br/>
10<br/>
310`,
`是`,
`5 天分別為 10、10、10、10、310，不是每天都超過 50 個；總數 350 個，超過 300 個。<br/>符合其中一個條件，輸出「是」。`)}
${sample(3,
`50<br/>
50<br/>
50<br/>
50<br/>
50`,
`否`,
`5 天分別為 50、50、50、50、50，不是每天都超過 50 個；總數 250 個，未超過 300 個。<br/>兩個條件都不符合，輸出「否」。`)}
${sample(4,
`0<br/>
0<br/>
0<br/>
0<br/>
0`,
`否`,
`5 天分別為 0、0、0、0、0，不是每天都超過 50 個；總數 0 個，未超過 300 個。<br/>兩個條件都不符合，輸出「否」。`,
`{"data": ["51;51;51;51;51;是", "10;10;10;10;310;是", "50;50;50;50;50;否", "0;0;0;0;0;否"]}`)}
'
 onclick='${ONCLICK}'>59
</button> ${answerButtons('每日挑戰')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>每日挑戰</td>
</tr>
`;

// ---------------- 第 60 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("60", `超級結帳機`, `國小基礎應用`)}
${desc(`
超級結帳機規則：當消費金額達到 500 元（含）以上，且顧客為會員時，可享 8 折優惠；打完折之後，如果顧客有優惠券，再折抵 20 元（即使未達 500 元或非會員，只要有優惠券，仍可折抵 20 元）。請計算最終應付的收據金額（若結果為負，以 0 元計）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表購買的總金額（元）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否為會員。<br/>
第 3 行輸入一個字串，內容為「是」或「否」，代表是否有優惠券。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最終收據總金額（元）。
`)}
${sample(1,
`800<br/>
是<br/>
是`,
`620`,
`消費 800 元達 500 元且是會員，打 8 折 = 640 元；有優惠券再折 20 元 = 620 元。<br/>應付 620 元。`)}
${sample(2,
`499<br/>
是<br/>
是`,
`479`,
`消費 499 元未達 500 元，不打折；有優惠券再折 20 元 = 479 元。<br/>應付 479 元。`)}
${sample(3,
`0<br/>
否<br/>
是`,
`0`,
`消費 0 元未達 500 元且不是會員，不打折；有優惠券再折 20 元 = -20 元，結果為負以 0 元計。<br/>應付 0 元。`)}
${sample(4,
`500<br/>
是<br/>
否`,
`400`,
`消費 500 元達 500 元且是會員，打 8 折 = 400 元；沒有優惠券。<br/>應付 400 元。`,
`{"data": ["800;是;是;620", "499;是;是;479", "0;否;是;0", "500;是;否;400"]}`)}
'
 onclick='${ONCLICK}'>60
</button> ${answerButtons('超級結帳機')}
</td>
<td ${LIST_TD(false)}>國小基礎應用</td>
<td ${LIST_TD(false)}>超級結帳機</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
