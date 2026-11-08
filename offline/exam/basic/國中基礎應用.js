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
const ANSWER_GROUP = '國中基礎應用';   // exam/answer/ 底下的資料夾名稱
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
${qHeader("1", `泡沫排序法`, `國中基礎應用`)}
${desc(`
某次數學競賽為取得前幾低分的同學進行輔導。給定人數、依序輸入每個人的分數、排序後由低至高依序輸出所有分數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行：一個正整數 N，代表人數。<br/>
第 2 行：N 個以空白分隔的整數，代表每個人的分數。<br/>
<span ${LBL_OUT}>輸出說明</span>由低至高輸出排序後的所有分數，以空白分隔。
`)}
${sample(1,
`3<br/>
100 85 90`,
`85 90 100`,
`共 3 位同學，分數依序為 100、85、90。<br/>由低至高排序後為 85 90 100。`)}
${sample(2,
`5<br/>
60 80 36 90 100`,
`36 60 80 90 100`,
`共 5 位同學，分數依序為 60、80、36、90、100。<br/>由低至高排序後為 36 60 80 90 100。`,
`{"data": ["3;100;85;90;85;90;100", "5;60;80;36;90;100;36;60;80;90;100"]}`)}
'
 onclick='${ONCLICK}'>1
</button> ${answerButtons('泡沫排序法')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>泡沫排序法</td>
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
${qHeader("2", `電影院票價計算`, `國中基礎應用`)}
${desc(`
電影院門票依年齡收費：未滿 12 歲（不含 12 歲）為兒童，票價 150 元；12 歲至 64 歲（含）為成人，票價 300 元；65 歲（含）以上為老人，票價 200 元。請根據一組觀眾的年齡，計算這群人總共要付多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表觀眾總人數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一位觀眾的年齡。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總票價。
`)}
${sample(1,
`1<br/>
11`,
`150`,
`共 1 位觀眾：11 歲為兒童付 150 元。<br/>總計 150 元。`)}
${sample(2,
`3<br/>
12<br/>
64<br/>
65`,
`800`,
`共 3 位觀眾：12 歲為成人付 300 元；64 歲為成人付 300 元；65 歲為老人付 200 元。<br/>總計 300+300+200 = 800 元。`)}
${sample(3,
`3<br/>
10<br/>
30<br/>
70`,
`650`,
`共 3 位觀眾：10 歲為兒童付 150 元；30 歲為成人付 300 元；70 歲為老人付 200 元。<br/>總計 150+300+200 = 650 元。`)}
${sample(4,
`3<br/>
0<br/>
100<br/>
100`,
`550`,
`共 3 位觀眾：0 歲為兒童付 150 元；100 歲為老人付 200 元；100 歲為老人付 200 元。<br/>總計 150+200+200 = 550 元。`,
`{"data": ["1;11;150", "3;12;64;65;800", "3;10;30;70;650", "3;0;100;100;550"]}`)}
'
 onclick='${ONCLICK}'>2
</button> ${answerButtons('電影院票價計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>電影院票價計算</td>
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
${qHeader("3", `停車場分段計費`, `國中基礎應用`)}
${desc(`
停車場採「分段累進」計費：前 2 小時（第 1、2 小時），每小時 40 元；第 3 小時至第 5 小時，每小時 30 元；超過 5 小時之後的部分，每小時 20 元。停車時數皆為正整數小時。請根據每輛車的停車時數，計算應付的停車費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表車輛數。<br/>
接下來 N 行，每行輸入一個正整數，代表一輛車的停車時數（小時）。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 N 行整數，每行代表對應車輛應付的停車費（元）。
`)}
${sample(1,
`1<br/>
1`,
`40`,
`第 1 輛車停 1 小時：前 1 小時 1×40=40 元，共 40 元。`)}
${sample(2,
`2<br/>
2<br/>
5`,
`80<br/>
170`,
`第 1 輛車停 2 小時：前 2 小時 2×40=80 元，共 80 元。<br/>第 2 輛車停 5 小時：前 2 小時 2×40=80 元，第 3~5 小時 3×30=90 元，共 170 元。`)}
${sample(3,
`2<br/>
3<br/>
7`,
`110<br/>
210`,
`第 1 輛車停 3 小時：前 2 小時 2×40=80 元，第 3~3 小時 1×30=30 元，共 110 元。<br/>第 2 輛車停 7 小時：前 2 小時 2×40=80 元，第 3~5 小時 3×30=90 元，超過 5 小時的 2 小時 2×20=40 元，共 210 元。`)}
${sample(4,
`1<br/>
100`,
`2070`,
`第 1 輛車停 100 小時：前 2 小時 2×40=80 元，第 3~5 小時 3×30=90 元，超過 5 小時的 95 小時 95×20=1900 元，共 2070 元。`,
`{"data": ["1;1;40", "2;2;5;80;170", "2;3;7;110;210", "1;100;2070"]}`)}
'
 onclick='${ONCLICK}'>3
</button> ${answerButtons('停車場分段計費')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>停車場分段計費</td>
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
${qHeader("4", `超商消費點數累計`, `國中基礎應用`)}
${desc(`
超商點數規則：消費金額每滿 50 元（不足 50 元的部分捨去）可獲得 1 點；若顧客為會員，所得點數變為 2 倍；若單筆消費金額達到 1000 元（含）以上，不論是否為會員，最後都額外加送 10 點。請計算顧客最後獲得的總點數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個字串，內容為「Y」或「N」，代表是否為會員。<br/>
第 2 行輸入一個非負整數，代表消費金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表獲得的總點數。
`)}
${sample(1,
`N<br/>
0`,
`0`,
`消費 0 元，每滿 50 元得 1 點，0÷50 取整數得 0 點；不是會員，點數不加倍；未達 1000 元，沒有加送。最後總點數為 0 點。`)}
${sample(2,
`Y<br/>
1200`,
`58`,
`消費 1200 元，每滿 50 元得 1 點，1200÷50 取整數得 24 點；是會員，點數加倍為 48 點；消費達 1000 元以上，再加送 10 點，共 58 點。最後總點數為 58 點。`)}
${sample(3,
`N<br/>
999`,
`19`,
`消費 999 元，每滿 50 元得 1 點，999÷50 取整數得 19 點；不是會員，點數不加倍；未達 1000 元，沒有加送。最後總點數為 19 點。`)}
${sample(4,
`Y<br/>
50`,
`2`,
`消費 50 元，每滿 50 元得 1 點，50÷50 取整數得 1 點；是會員，點數加倍為 2 點；未達 1000 元，沒有加送。最後總點數為 2 點。`,
`{"data": ["N;0;0", "Y;1200;58", "N;999;19", "Y;50;2"]}`)}
'
 onclick='${ONCLICK}'>4
</button> ${answerButtons('超商消費點數累計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>超商消費點數累計</td>
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
${qHeader("5", `購物滿額贈品`, `國中基礎應用`)}
${desc(`
商場促銷活動：顧客消費金額每滿 1000 元（不足 1000 元的部分捨去），就送 1 張 50 元的抵用券。請計算顧客總共可以領到幾張抵用券，以及這些抵用券的總價值。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表消費總金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行整數：<br/>
第 1 行為抵用券張數。<br/>
第 2 行為抵用券的總價值（元）。
`)}
${sample(1,
`0`,
`0<br/>
0`,
`消費 0 元，每滿 1000 元送 1 張，0÷1000 取整數得 0 張；<br/>總價值 0×50 = 0 元。`)}
${sample(2,
`999`,
`0<br/>
0`,
`消費 999 元，每滿 1000 元送 1 張，999÷1000 取整數得 0 張；<br/>總價值 0×50 = 0 元。`)}
${sample(3,
`1000`,
`1<br/>
50`,
`消費 1000 元，每滿 1000 元送 1 張，1000÷1000 取整數得 1 張；<br/>總價值 1×50 = 50 元。`)}
${sample(4,
`3500`,
`3<br/>
150`,
`消費 3500 元，每滿 1000 元送 1 張，3500÷1000 取整數得 3 張；<br/>總價值 3×50 = 150 元。`,
`{"data": ["0;0;0", "999;0;0", "1000;1;50", "3500;3;150"]}`)}
'
 onclick='${ONCLICK}'>5
</button> ${answerButtons('購物滿額贈品')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>購物滿額贈品</td>
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
${qHeader("6", `BMI 健康指標計算`, `國中基礎應用`)}
${desc(`
BMI（身體質量指數）計算公式為 BMI = 體重（公斤）÷ 身高（公尺）的平方。分類標準：BMI 小於 18.5 為「過輕」；18.5（含）至 24（不含 24）為「正常」；24（含）以上為「過重」。BMI 計算結果請四捨五入到小數點後 1 位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正實數，代表身高（公尺）。<br/>
第 2 行輸入一個正實數，代表體重（公斤）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行：<br/>
第 1 行輸出 BMI 數值（四捨五入到小數點後 1 位）。<br/>
第 2 行輸出字串，內容為「過輕」、「正常」或「過重」。
`)}
${sample(1,
`1.7<br/>
70`,
`24.2<br/>
過重`,
`BMI = 70 ÷ (1.7×1.7) = 70 ÷ 2.89 ≈ 24.22，四捨五入為 24.2。<br/>達到 24 以上，分類為「過重」。`)}
${sample(2,
`1.6<br/>
40`,
`15.6<br/>
過輕`,
`BMI = 40 ÷ (1.6×1.6) = 40 ÷ 2.56 ≈ 15.62，四捨五入為 15.6。<br/>小於 18.5，分類為「過輕」。`)}
${sample(3,
`1.8<br/>
60`,
`18.5<br/>
正常`,
`BMI = 60 ÷ (1.8×1.8) = 60 ÷ 3.24 ≈ 18.52，四捨五入為 18.5。<br/>介於 18.5（含）與 24 之間，分類為「正常」。`)}
${sample(4,
`1.5<br/>
100`,
`44.4<br/>
過重`,
`BMI = 100 ÷ (1.5×1.5) = 100 ÷ 2.25 ≈ 44.44，四捨五入為 44.4。<br/>達到 24 以上，分類為「過重」。`,
`{"data": ["1.7;70;24.2;過重", "1.6;40;15.6;過輕", "1.8;60;18.5;正常", "1.5;100;44.4;過重"]}`)}
'
 onclick='${ONCLICK}'>6
</button> ${answerButtons('BMI 健康指標計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>BMI 健康指標計算</td>
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
${qHeader("7", `營業收入累計`, `國中基礎應用`)}
${desc(`
商店記錄了 N 天的營業額，請計算這段期間的總收入，以及平均每天的收入（四捨五入到小數點後 1 位）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表天數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一天的營業額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行：<br/>
第 1 行輸出一個整數，代表總收入。<br/>
第 2 行輸出一個數字（四捨五入到小數點後 1 位），代表平均每天的收入。
`)}
${sample(1,
`1<br/>
0`,
`0<br/>
0`,
`1 天的營業額為 0。<br/>總收入 = 0 = 0 元；<br/>平均 = 0÷1 = 0.0 元。`)}
${sample(2,
`3<br/>
1000<br/>
1500<br/>
2000`,
`4500<br/>
1500`,
`3 天的營業額為 1000、1500、2000。<br/>總收入 = 1000+1500+2000 = 4500 元；<br/>平均 = 4500÷3 = 1500.0 元。`)}
${sample(3,
`2<br/>
1<br/>
2`,
`3<br/>
1.5`,
`2 天的營業額為 1、2。<br/>總收入 = 1+2 = 3 元；<br/>平均 = 3÷2 = 1.5 元。`)}
${sample(4,
`5<br/>
1000000<br/>
1000000<br/>
1000000<br/>
1000000<br/>
1000000`,
`5000000<br/>
1000000`,
`5 天的營業額為 1000000、1000000、1000000、1000000、1000000。<br/>總收入 = 1000000+1000000+1000000+1000000+1000000 = 5000000 元；<br/>平均 = 5000000÷5 = 1000000.0 元。`,
`{"data": ["1;0;0;0", "3;1000;1500;2000;4500;1500", "2;1;2;3;1.5", "5;1000000;1000000;1000000;1000000;1000000;5000000;1000000"]}`)}
'
 onclick='${ONCLICK}'>7
</button> ${answerButtons('營業收入累計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>營業收入累計</td>
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
${qHeader("8", `書展折扣累計`, `國中基礎應用`)}
${desc(`
書展優惠規則：單筆消費金額達到 1000 元（含）以上，可享 85 折；未達 1000 元但達到 500 元（含）以上，可享 9 折；未滿 500 元則無折扣。若結果有小數，請四捨五入到整數元。請根據每位顧客的原始金額，計算折扣後的實際應付金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表顧客人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位顧客的消費金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 N 行整數，每行代表對應顧客折扣後應付的金額。
`)}
${sample(1,
`1<br/>
499`,
`499`,
`第 1 位顧客消費 499 元，未滿 500 元，沒有折扣。`)}
${sample(2,
`2<br/>
500<br/>
999`,
`450<br/>
899`,
`第 1 位顧客消費 500 元，達 500 元未達 1000 元，打 9 折，500×0.9 = 450 元。<br/>第 2 位顧客消費 999 元，達 500 元未達 1000 元，打 9 折，999×0.9 = 899 元。`)}
${sample(3,
`2<br/>
1000<br/>
600`,
`850<br/>
540`,
`第 1 位顧客消費 1000 元，達 1000 元，打 85 折，1000×0.85 = 850 元。<br/>第 2 位顧客消費 600 元，達 500 元未達 1000 元，打 9 折，600×0.9 = 540 元。`)}
${sample(4,
`1<br/>
0`,
`0`,
`第 1 位顧客消費 0 元，未滿 500 元，沒有折扣。`,
`{"data": ["1;499;499", "2;500;999;450;899", "2;1000;600;850;540", "1;0;0"]}`)}
'
 onclick='${ONCLICK}'>8
</button> ${answerButtons('書展折扣累計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>書展折扣累計</td>
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
${qHeader("9", `季節性電費`, `國中基礎應用`)}
${desc(`
電費採夏季（6 月至 9 月）與非夏季分別計費，並採「分段累進」方式：<br/>
夏季（6~9 月）：120 度以下部分，每度 2.1 元；121~330 度部分（即超過 120 度的部分），每度 3.0 元。<br/>
非夏季（1~5 月、10~12 月）：120 度以下部分，每度 2.0 元；121~330 度部分，每度 2.8 元。<br/>
本題保證用電度數不超過 330 度。請計算該月應繳的電費總額（四捨五入到整數元）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個整數（1~12），代表月份。<br/>
第 2 行輸入一個非負整數（0~330），代表本月用電度數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表該月應繳電費總額（元）。
`)}
${sample(1,
`7<br/>
0`,
`0`,
`7 月屬於夏季，用電 0 度。<br/>前 120 度以內：0×2.1 = 0 元。<br/>總電費 0 元。`)}
${sample(2,
`1<br/>
120`,
`240`,
`1 月屬於非夏季，用電 120 度。<br/>前 120 度以內：120×2.0 = 240 元。<br/>總電費 240 元。`)}
${sample(3,
`7<br/>
200`,
`492`,
`7 月屬於夏季，用電 200 度。<br/>前 120 度以內：120×2.1 = 252 元；超過 120 度的 80 度：80×3.0 = 240 元。<br/>總電費 492 元。`)}
${sample(4,
`12<br/>
330`,
`828`,
`12 月屬於非夏季，用電 330 度。<br/>前 120 度以內：120×2.0 = 240 元；超過 120 度的 210 度：210×2.8 = 588 元。<br/>總電費 828 元。`,
`{"data": ["7;0;0", "1;120;240", "7;200;492", "12;330;828"]}`)}
'
 onclick='${ONCLICK}'>9
</button> ${answerButtons('季節性電費')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>季節性電費</td>
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
${qHeader("10", `公車票價計算`, `國中基礎應用`)}
${desc(`
公車票價依身分收費：學生票 10 元、全票（一般乘客）15 元、敬老票 8 元。請根據一組乘客的身分，計算總車資。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表乘客人數。<br/>
接下來 N 行，每行輸入一個字串，內容為「學生」、「一般」或「敬老」三者之一，代表一位乘客的身分。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總車資（元）。
`)}
${sample(1,
`1<br/>
學生`,
`10`,
`共 1 位乘客：學生 10 元。<br/>總車資 10 元。`)}
${sample(2,
`1<br/>
一般`,
`15`,
`共 1 位乘客：一般 15 元。<br/>總車資 15 元。`)}
${sample(3,
`1<br/>
敬老`,
`8`,
`共 1 位乘客：敬老 8 元。<br/>總車資 8 元。`)}
${sample(4,
`3<br/>
學生<br/>
一般<br/>
敬老`,
`33`,
`共 3 位乘客：學生 10 元、一般 15 元、敬老 8 元。<br/>總車資 10+15+8 = 33 元。`,
`{"data": ["1;學生;10", "1;一般;15", "1;敬老;8", "3;學生;一般;敬老;33"]}`)}
'
 onclick='${ONCLICK}'>10
</button> ${answerButtons('公車票價計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>公車票價計算</td>
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
${qHeader("11", `座標象限`, `國中基礎應用`)}
${desc(`
根據平面座標 (x,y) 判斷其所在位置：若 x>0 且 y>0 為「第一象限」；x<0 且 y>0 為「第二象限」；x<0 且 y<0 為「第三象限」；x>0 且 y<0 為「第四象限」；x=0 且 y≠0 為「y軸」；y=0 且 x≠0 為「x軸」；x=0 且 y=0 為「原點」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個整數，代表 x 座標。<br/>
第 2 行輸入一個整數，代表 y 座標。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「第一象限」、「第二象限」、「第三象限」、「第四象限」、「x軸」、「y軸」或「原點」之一。
`)}
${sample(1,
`-3<br/>
5`,
`第二象限`,
`x=-3，y=5，符合「x&lt;0 且 y&gt;0」，位於第二象限。`)}
${sample(2,
`0<br/>
0`,
`原點`,
`x=0，y=0，符合「x=0 且 y=0」，位於原點。`)}
${sample(3,
`5<br/>
0`,
`x軸`,
`x=5，y=0，符合「y=0 且 x≠0」，位於x軸。`)}
${sample(4,
`0<br/>
-5`,
`y軸`,
`x=0，y=-5，符合「x=0 且 y≠0」，位於y軸。`)}
${sample(5,
`-2<br/>
-2`,
`第三象限`,
`x=-2，y=-2，符合「x&lt;0 且 y&lt;0」，位於第三象限。`,
`{"data": ["-3;5;第二象限", "0;0;原點", "5;0;x軸", "0;-5;y軸", "-2;-2;第三象限"]}`)}
'
 onclick='${ONCLICK}'>11
</button> ${answerButtons('座標象限')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>座標象限</td>
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
${qHeader("12", `校園園遊會（單層條件）`, `國中基礎應用`)}
${desc(`
園遊會促銷：單筆消費金額達到 500 元（含）以上，就送 1 個小吊飾；未達 500 元則沒有贈品。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表購買的總金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，內容為 1（達到門檻，贈送 1 個）或 0（未達門檻）。
`)}
${sample(1,
`0`,
`0`,
`消費 0 元，未達 500 元門檻，沒有贈品，輸出 0。`)}
${sample(2,
`499`,
`0`,
`消費 499 元，未達 500 元門檻，沒有贈品，輸出 0。`)}
${sample(3,
`500`,
`1`,
`消費 500 元，已達 500 元門檻，贈送 1 個小吊飾，輸出 1。`)}
${sample(4,
`999999`,
`1`,
`消費 999999 元，已達 500 元門檻，贈送 1 個小吊飾，輸出 1。`,
`{"data": ["0;0", "499;0", "500;1", "999999;1"]}`)}
'
 onclick='${ONCLICK}'>12
</button> ${answerButtons('校園園遊會（單層條件）')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>校園園遊會（單層條件）</td>
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
${qHeader("13", `質數判斷`, `國中基礎應用`)}
${desc(`
判斷一個正整數是否為質數。質數的定義為：大於 1，且除了 1 和自己以外沒有其他因數（注意：1 不是質數）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數 N（N≥1）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出字串「YES」（是質數）或「NO」（不是質數）。
`)}
${sample(1,
`1`,
`NO`,
`1 不是質數（質數必須大於 1），輸出 NO。`)}
${sample(2,
`2`,
`YES`,
`2 只能被 1 和 2 整除，是質數，輸出 YES。`)}
${sample(3,
`17`,
`YES`,
`17 只能被 1 和 17 整除，是質數，輸出 YES。`)}
${sample(4,
`100`,
`NO`,
`100 可以被 2 整除（100÷2=50），不是質數，輸出 NO。`,
`{"data": ["1;NO", "2;YES", "17;YES", "100;NO"]}`)}
'
 onclick='${ONCLICK}'>13
</button> ${answerButtons('質數判斷')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>質數判斷</td>
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
${qHeader("14", `生日派對禮物分配`, `國中基礎應用`)}
${desc(`
派對上有一袋糖果，要平分給現場的小朋友（人數皆為正整數）。請計算每個人平均可以分到幾顆（取整數，無條件捨去餘數），以及最後剩下幾顆沒分完。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表糖果總數。<br/>
第 2 行輸入一個正整數，代表現場小朋友的人數。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行整數：<br/>
第 1 行為每人分到的顆數。<br/>
第 2 行為剩餘的顆數。
`)}
${sample(1,
`0<br/>
5`,
`0<br/>
0`,
`0 顆糖果分給 5 人，每人分到 0÷5 = 0 顆（捨去餘數），<br/>剩下 0-5×0 = 0 顆。`)}
${sample(2,
`23<br/>
5`,
`4<br/>
3`,
`23 顆糖果分給 5 人，每人分到 23÷5 = 4 顆（捨去餘數），<br/>剩下 23-5×4 = 3 顆。`)}
${sample(3,
`10<br/>
10`,
`1<br/>
0`,
`10 顆糖果分給 10 人，每人分到 10÷10 = 1 顆（捨去餘數），<br/>剩下 10-10×1 = 0 顆。`)}
${sample(4,
`999999<br/>
7`,
`142857<br/>
0`,
`999999 顆糖果分給 7 人，每人分到 999999÷7 = 142857 顆（捨去餘數），<br/>剩下 999999-7×142857 = 0 顆。`,
`{"data": ["0;5;0;0", "23;5;4;3", "10;10;1;0", "999999;7;142857;0"]}`)}
'
 onclick='${ONCLICK}'>14
</button> ${answerButtons('生日派對禮物分配')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>生日派對禮物分配</td>
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
${qHeader("15", `體溫測量統計`, `國中基礎應用`)}
${desc(`
校園防疫體溫分類：體溫達到 37.5 度（含）以上為「發燒」；35.0 度（含）至 37.4 度（含）為「正常」；低於 35.0 度（不含 35.0 度）為「低溫」。請統計各類別的人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表總人數。<br/>
接下來 N 行，每行輸入一個實數，代表一位學生的體溫（攝氏度）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出三行整數：<br/>
第 1 行為「發燒」的人數。<br/>
第 2 行為「正常」的人數。<br/>
第 3 行為「低溫」的人數。
`)}
${sample(1,
`1<br/>
37.5`,
`1<br/>
0<br/>
0`,
`37.5 度達 37.5 度以上，屬於發燒。<br/>故發燒 1 人、正常 0 人、低溫 0 人。`)}
${sample(2,
`1<br/>
34.9`,
`0<br/>
0<br/>
1`,
`34.9 度低於 35.0 度，屬於低溫。<br/>故發燒 0 人、正常 0 人、低溫 1 人。`)}
${sample(3,
`4<br/>
38<br/>
36.5<br/>
34.8<br/>
37.5`,
`2<br/>
1<br/>
1`,
`38、37.5 度達 37.5 度以上，屬於發燒；36.5 度介於 35.0～37.4 度，屬於正常；34.8 度低於 35.0 度，屬於低溫。<br/>故發燒 2 人、正常 1 人、低溫 1 人。`)}
${sample(4,
`2<br/>
35<br/>
37.4`,
`0<br/>
2<br/>
0`,
`35、37.4 度介於 35.0～37.4 度，屬於正常。<br/>故發燒 0 人、正常 2 人、低溫 0 人。`,
`{"data": ["1;37.5;1;0;0", "1;34.9;0;0;1", "4;38;36.5;34.8;37.5;2;1;1", "2;35;37.4;0;2;0"]}`)}
'
 onclick='${ONCLICK}'>15
</button> ${answerButtons('體溫測量統計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>體溫測量統計</td>
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
${qHeader("16", `班級考試成績分級`, `國中基礎應用`)}
${desc(`
成績分級標準：90 分（含）以上為 A；80 分至 89 分（含）為 B；70 分至 79 分（含）為 C；未滿 70 分（不含 70 分）為 D。請統計全班各等級的人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表總人數。<br/>
接下來 N 行，每行輸入一個整數（0~100），代表一位學生的分數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出四行整數，分別代表 A、B、C、D 等級的人數。
`)}
${sample(1,
`1<br/>
90`,
`1<br/>
0<br/>
0<br/>
0`,
`90 分為 A。<br/>A、B、C、D 各 1、0、0、0 人。`)}
${sample(2,
`1<br/>
69`,
`0<br/>
0<br/>
0<br/>
1`,
`69 分為 D。<br/>A、B、C、D 各 0、0、0、1 人。`)}
${sample(3,
`4<br/>
95<br/>
85<br/>
72<br/>
60`,
`1<br/>
1<br/>
1<br/>
1`,
`95 分為 A；85 分為 B；72 分為 C；60 分為 D。<br/>A、B、C、D 各 1、1、1、1 人。`)}
${sample(4,
`6<br/>
70<br/>
79<br/>
80<br/>
89<br/>
90<br/>
100`,
`2<br/>
2<br/>
2<br/>
0`,
`70 分為 C；79 分為 C；80 分為 B；89 分為 B；90 分為 A；100 分為 A。<br/>A、B、C、D 各 2、2、2、0 人。`,
`{"data": ["1;90;1;0;0;0", "1;69;0;0;0;1", "4;95;85;72;60;1;1;1;1", "6;70;79;80;89;90;100;2;2;2;0"]}`)}
'
 onclick='${ONCLICK}'>16
</button> ${answerButtons('班級考試成績分級')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>班級考試成績分級</td>
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
${qHeader("17", `快遞運費計算`, `國中基礎應用`)}
${desc(`
快遞公司收費規則：包裹重量在 5 公斤（含）以下，收費 50 元；超過 5 公斤至 10 公斤（含），收費 80 元；超過 10 公斤（不含 10 公斤），收費 100 元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正實數，代表包裹重量（公斤）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總運費（元）。
`)}
${sample(1,
`5`,
`50`,
`5 公斤在 5 公斤（含）以下，收費 50 元。`)}
${sample(2,
`5.5`,
`80`,
`5.5 公斤超過 5 公斤但未超過 10 公斤，收費 80 元。`)}
${sample(3,
`10`,
`80`,
`10 公斤超過 5 公斤但未超過 10 公斤，收費 80 元。`)}
${sample(4,
`10.1`,
`100`,
`10.1 公斤超過 10 公斤，收費 100 元。`)}
${sample(5,
`100`,
`100`,
`100 公斤超過 10 公斤，收費 100 元。`,
`{"data": ["5;50", "5.5;80", "10;80", "10.1;100", "100;100"]}`)}
'
 onclick='${ONCLICK}'>17
</button> ${answerButtons('快遞運費計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>快遞運費計算</td>
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
${qHeader("18", `動物園門票分類統計`, `國中基礎應用`)}
${desc(`
動物園門票收費：未滿 12 歲（不含 12 歲）為兒童票 150 元；12 歲（含）以上為全票 300 元。若參觀人數達到 10 人（含）以上，視為團體，總票價可打 9 折（先計算原始總票價，再視是否為團體給予折扣）。若結果有小數，請四捨五入到整數元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表總人數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一位遊客的年齡。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總票價。
`)}
${sample(1,
`10<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
30`,
`1485`,
`共 10 人，兒童（未滿 12 歲）9 人、全票 1 人，原始總票價 9×150+1×300 = 1650 元。<br/>人數達 10 人以上屬於團體，打 9 折：1650×0.9 = 1485 元。`)}
${sample(2,
`9<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5<br/>
5`,
`1350`,
`共 9 人，兒童（未滿 12 歲）9 人、全票 0 人，原始總票價 9×150+0×300 = 1350 元。<br/>人數未達 10 人，不打折。`)}
${sample(3,
`1<br/>
12`,
`300`,
`共 1 人，兒童（未滿 12 歲）0 人、全票 1 人，原始總票價 0×150+1×300 = 300 元。<br/>人數未達 10 人，不打折。`)}
${sample(4,
`1<br/>
11`,
`150`,
`共 1 人，兒童（未滿 12 歲）1 人、全票 0 人，原始總票價 1×150+0×300 = 150 元。<br/>人數未達 10 人，不打折。`,
`{"data": ["10;5;5;5;5;5;5;5;5;5;30;1485", "9;5;5;5;5;5;5;5;5;5;1350", "1;12;300", "1;11;150"]}`)}
'
 onclick='${ONCLICK}'>18
</button> ${answerButtons('動物園門票分類統計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>動物園門票分類統計</td>
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
${qHeader("19", `停車格使用統計`, `國中基礎應用`)}
${desc(`
停車場統計進場車輛類型，類型只有「小型車」與「大型車」兩種。請統計這兩類車輛分別有多少輛。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表車輛總數。<br/>
接下來 N 行，每行輸入一個字串，內容為「小型車」或「大型車」。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行整數：<br/>
第 1 行為小型車的數量。<br/>
第 2 行為大型車的數量。
`)}
${sample(1,
`1<br/>
小型車`,
`1<br/>
0`,
`1 筆紀錄中「小型車」出現 1 次、「大型車」出現 0 次。`)}
${sample(2,
`1<br/>
大型車`,
`0<br/>
1`,
`1 筆紀錄中「小型車」出現 0 次、「大型車」出現 1 次。`)}
${sample(3,
`3<br/>
小型車<br/>
大型車<br/>
小型車`,
`2<br/>
1`,
`3 筆紀錄中「小型車」出現 2 次、「大型車」出現 1 次。`)}
${sample(4,
`8<br/>
小型車<br/>
小型車<br/>
小型車<br/>
小型車<br/>
大型車<br/>
大型車<br/>
大型車<br/>
大型車`,
`4<br/>
4`,
`8 筆紀錄中「小型車」出現 4 次、「大型車」出現 4 次。`,
`{"data": ["1;小型車;1;0", "1;大型車;0;1", "3;小型車;大型車;小型車;2;1", "8;小型車;小型車;小型車;小型車;大型車;大型車;大型車;大型車;4;4"]}`)}
'
 onclick='${ONCLICK}'>19
</button> ${answerButtons('停車格使用統計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>停車格使用統計</td>
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
${qHeader("20", `遊戲點數累計（會員制）`, `國中基礎應用`)}
${desc(`
玩遊戲解任務基本獎勵為 100 點；若玩家是「黃金會員」，獎勵點數變為 2 倍。請根據基本點數與會員身分，計算最後獲得的點數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表基本點數。<br/>
第 2 行輸入一個字串，內容為「Y」或「N」，代表是否為會員。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最終獲得的點數。
`)}
${sample(1,
`100<br/>
Y`,
`200`,
`基本點數 100 點，是會員，點數加倍為 100×2 = 200 點。`)}
${sample(2,
`100<br/>
N`,
`100`,
`基本點數 100 點，不是會員，點數不變，為 100 點。`)}
${sample(3,
`0<br/>
Y`,
`0`,
`基本點數 0 點，是會員，點數加倍為 0×2 = 0 點。`)}
${sample(4,
`999999<br/>
N`,
`999999`,
`基本點數 999999 點，不是會員，點數不變，為 999999 點。`,
`{"data": ["100;Y;200", "100;N;100", "0;Y;0", "999999;N;999999"]}`)}
'
 onclick='${ONCLICK}'>20
</button> ${answerButtons('遊戲點數累計（會員制）')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>遊戲點數累計（會員制）</td>
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
${qHeader("21", `學生作業完成率統計`, `國中基礎應用`)}
${desc(`
老師登記全班作業繳交情況，1 代表已交，0 代表未交。請統計已繳交與未繳交的人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表全班人數。<br/>
接下來 N 行，每行輸入一個整數（0 或 1），代表一位學生的繳交狀態。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行整數：<br/>
第 1 行為已交人數。<br/>
第 2 行為未交人數。
`)}
${sample(1,
`5<br/>
1<br/>
0<br/>
1<br/>
1<br/>
0`,
`3<br/>
2`,
`共 5 位學生，狀態為 1 0 1 1 0。<br/>1（已交）有 3 人，0（未交）有 2 人。`)}
${sample(2,
`3<br/>
0<br/>
0<br/>
0`,
`0<br/>
3`,
`共 3 位學生，狀態為 0 0 0。<br/>1（已交）有 0 人，0（未交）有 3 人。`)}
${sample(3,
`3<br/>
1<br/>
1<br/>
1`,
`3<br/>
0`,
`共 3 位學生，狀態為 1 1 1。<br/>1（已交）有 3 人，0（未交）有 0 人。`)}
${sample(4,
`1<br/>
1`,
`1<br/>
0`,
`共 1 位學生，狀態為 1。<br/>1（已交）有 1 人，0（未交）有 0 人。`,
`{"data": ["5;1;0;1;1;0;3;2", "3;0;0;0;0;3", "3;1;1;1;3;0", "1;1;1;0"]}`)}
'
 onclick='${ONCLICK}'>21
</button> ${answerButtons('學生作業完成率統計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>學生作業完成率統計</td>
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
${qHeader("22", `校外教學車次安排`, `國中基礎應用`)}
${desc(`
學校安排校外教學，遊覽車有三種可供選擇的容量：40 人車、30 人車、20 人車，每種車輛數量不限，可以任意混合搭配使用。請計算若學生總人數為 N，最少需要租用幾輛車，才能讓所有學生都有位子坐（允許有空位，不要求剛好坐滿）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數 N，代表學生總人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最少需要租用的車輛數量。
`)}
${sample(1,
`1`,
`1`,
`每輛車最多坐 40 人，1÷40 無條件進位得 1 輛。<br/>1 輛 40 人車就能坐得下。`)}
${sample(2,
`40`,
`1`,
`每輛車最多坐 40 人，40÷40 無條件進位得 1 輛。<br/>1 輛 40 人車就能坐得下。`)}
${sample(3,
`41`,
`2`,
`每輛車最多坐 40 人，41÷40 無條件進位得 2 輛。<br/>1 輛車最多只能載 40 人，不夠坐，所以至少需要 2 輛。`)}
${sample(4,
`85`,
`3`,
`每輛車最多坐 40 人，85÷40 無條件進位得 3 輛。<br/>2 輛車最多只能載 80 人，不夠坐，所以至少需要 3 輛。`)}
${sample(5,
`1000000`,
`25000`,
`每輛車最多坐 40 人，1000000÷40 無條件進位得 25000 輛。<br/>24999 輛車最多只能載 999960 人，不夠坐，所以至少需要 25000 輛。`,
`{"data": ["1;1", "40;1", "41;2", "85;3", "1000000;25000"]}`)}
'
 onclick='${ONCLICK}'>22
</button> ${answerButtons('校外教學車次安排')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>校外教學車次安排</td>
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
${qHeader("23", `閏年判斷`, `國中基礎應用`)}
${desc(`
判斷西元年份是否為閏年，規則如下（依序判斷）：<br/>
1. 若年份能被 400 整除，為閏年。<br/>
2. 否則，若能被 100 整除，為平年。<br/>
3. 否則，若能被 4 整除，為閏年。<br/>
4. 以上皆不符合，為平年。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表西元年份。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出字串「閏年」或「平年」。
`)}
${sample(1,
`2000`,
`閏年`,
`2000 能被 400 整除，為閏年。`)}
${sample(2,
`1900`,
`平年`,
`1900 不能被 400 整除，但能被 100 整除，為平年。`)}
${sample(3,
`2024`,
`閏年`,
`2024 不能被 100 整除，但能被 4 整除，為閏年。`)}
${sample(4,
`2023`,
`平年`,
`2023 不能被 4 整除，為平年。`,
`{"data": ["2000;閏年", "1900;平年", "2024;閏年", "2023;平年"]}`)}
'
 onclick='${ONCLICK}'>23
</button> ${answerButtons('閏年判斷')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>閏年判斷</td>
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
${qHeader("24", `分班排名（百分比）`, `國中基礎應用`)}
${desc(`
成績分班規則：將全校學生依分數由高到低排序後，前 10%（取 floor(N×0.1) 人）分到 A 班；接下來第 11% 至 30%（取 floor(N×0.3)-floor(N×0.1) 人）分到 B 班；其餘分到 C 班。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表總人數。<br/>
接下來 N 行，每行輸入一個整數，代表一位學生的原始分數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三行整數，分別代表 A 班、B 班、C 班的人數。
`)}
${sample(1,
`1<br/>
100`,
`0<br/>
0<br/>
1`,
`共 1 人。A 班 = floor(1×0.1) = 0 人；<br/>B 班 = floor(1×0.3) - 0 = 0 - 0 = 0 人；<br/>C 班 = 1 - 0 - 0 = 1 人。`)}
${sample(2,
`3<br/>
100<br/>
99<br/>
98`,
`0<br/>
0<br/>
3`,
`共 3 人。A 班 = floor(3×0.1) = 0 人；<br/>B 班 = floor(3×0.3) - 0 = 0 - 0 = 0 人；<br/>C 班 = 3 - 0 - 0 = 3 人。`)}
${sample(3,
`9<br/>
100<br/>
99<br/>
98<br/>
97<br/>
96<br/>
95<br/>
94<br/>
93<br/>
92`,
`0<br/>
2<br/>
7`,
`共 9 人。A 班 = floor(9×0.1) = 0 人；<br/>B 班 = floor(9×0.3) - 0 = 2 - 0 = 2 人；<br/>C 班 = 9 - 0 - 2 = 7 人。`)}
${sample(4,
`10<br/>
100<br/>
99<br/>
98<br/>
97<br/>
96<br/>
95<br/>
94<br/>
93<br/>
92<br/>
91`,
`1<br/>
2<br/>
7`,
`共 10 人。A 班 = floor(10×0.1) = 1 人；<br/>B 班 = floor(10×0.3) - 1 = 3 - 1 = 2 人；<br/>C 班 = 10 - 1 - 2 = 7 人。`,
`{"data": ["1;100;0;0;1", "3;100;99;98;0;0;3", "9;100;99;98;97;96;95;94;93;92;0;2;7", "10;100;99;98;97;96;95;94;93;92;91;1;2;7"]}`)}
'
 onclick='${ONCLICK}'>24
</button> ${answerButtons('分班排名（百分比）')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>分班排名（百分比）</td>
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
${qHeader("25", `校園園遊會進階`, `國中基礎應用`)}
${desc(`
園遊會贈品規則：消費金額達到 1000 元（含）以上，贈送「大禮物」；未達 1000 元但達到 800 元（含）以上，贈送「中禮物」；未達 800 元但達到 500 元（含）以上，贈送「小禮物」；未滿 500 元，沒有贈品。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表消費金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「大禮物」、「中禮物」、「小禮物」或「沒有贈品」之一。
`)}
${sample(1,
`499`,
`沒有贈品`,
`消費 499 元，未滿 500 元，輸出「沒有贈品」。`)}
${sample(2,
`500`,
`小禮物`,
`消費 500 元，未達 800 元但達到 500 元，輸出「小禮物」。`)}
${sample(3,
`799`,
`小禮物`,
`消費 799 元，未達 800 元但達到 500 元，輸出「小禮物」。`)}
${sample(4,
`800`,
`中禮物`,
`消費 800 元，未達 1000 元但達到 800 元，輸出「中禮物」。`)}
${sample(5,
`1000`,
`大禮物`,
`消費 1000 元，達到 1000 元，輸出「大禮物」。`,
`{"data": ["499;沒有贈品", "500;小禮物", "799;小禮物", "800;中禮物", "1000;大禮物"]}`)}
'
 onclick='${ONCLICK}'>25
</button> ${answerButtons('校園園遊會進階')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>校園園遊會進階</td>
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
${qHeader("26", `氣溫上升趨勢`, `國中基礎應用`)}
${desc(`
輸入連續 5 天的氣溫，判斷是否每一天都比前一天高（嚴格上升，若有任兩天相鄰溫度相等或下降，則不算持續升溫）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 5 個實數，分別代表連續 5 天的氣溫。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出字串「持續升溫」（每天都比前一天高）或「無明顯趨勢」（其他情況）。
`)}
${sample(1,
`20<br/>
22<br/>
23<br/>
25<br/>
28`,
`持續升溫`,
`氣溫依序為 20 → 22 → 23 → 25 → 28，每一天都比前一天高，輸出「持續升溫」。`)}
${sample(2,
`20<br/>
20<br/>
21<br/>
22<br/>
23`,
`無明顯趨勢`,
`氣溫依序為 20 → 20 → 21 → 22 → 23，第 1 天與第 2 天（20 → 20）相等，不是持續升溫，輸出「無明顯趨勢」。`)}
${sample(3,
`30<br/>
25<br/>
20<br/>
15<br/>
10`,
`無明顯趨勢`,
`氣溫依序為 30 → 25 → 20 → 15 → 10，第 1 天與第 2 天（30 → 25）下降，不是持續升溫，輸出「無明顯趨勢」。`)}
${sample(4,
`-5<br/>
-4<br/>
-3<br/>
-2<br/>
-1`,
`持續升溫`,
`氣溫依序為 -5 → -4 → -3 → -2 → -1，每一天都比前一天高，輸出「持續升溫」。`,
`{"data": ["20;22;23;25;28;持續升溫", "20;20;21;22;23;無明顯趨勢", "30;25;20;15;10;無明顯趨勢", "-5;-4;-3;-2;-1;持續升溫"]}`)}
'
 onclick='${ONCLICK}'>26
</button> ${answerButtons('氣溫上升趨勢')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>氣溫上升趨勢</td>
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
${qHeader("27", `學生成績進步獎`, `國中基礎應用`)}
${desc(`
比較每位學生兩次考試的成績，若第二次分數高於第一次，視為「進步」，進步幅度為兩次分數之差。請計算：(1) 全班進步的人數；(2) 這些進步學生的平均進步分數（僅計算有進步的學生，四捨五入到小數點後 1 位；若無人進步則輸出 0）；(3) 全班最大的進步分數（若無人進步則輸出 0）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
輸入總人數。<br/>
接下來依序輸入每一位學生第一次與第二次的成績。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出進步人數（整數）、進步學生的平均進步分數（四捨五入到小數點後 1 位）、全班最大進步分數（整數）。
`)}
${sample(1,
`3<br/>
60 75<br/>
80 78<br/>
50 70`,
`2<br/>
17.5<br/>
20`,
`60→75（進步 15 分）；80→78（沒有進步）；50→70（進步 20 分）。<br/>進步人數 2 人，平均進步 (15+20)÷2 = 17.5 分，最大進步 20 分。`)}
${sample(2,
`2<br/>
50 50<br/>
60 60`,
`0<br/>
0<br/>
0`,
`50→50（沒有進步）；60→60（沒有進步）。<br/>進步人數 0 人，無人進步，平均與最大進步分數都輸出 0。`)}
${sample(3,
`1<br/>
0 100`,
`1<br/>
100<br/>
100`,
`0→100（進步 100 分）。<br/>進步人數 1 人，平均進步 (100)÷1 = 100.0 分，最大進步 100 分。`)}
${sample(4,
`3<br/>
90 100<br/>
80 95<br/>
70 71`,
`3<br/>
8.7<br/>
15`,
`90→100（進步 10 分）；80→95（進步 15 分）；70→71（進步 1 分）。<br/>進步人數 3 人，平均進步 (10+15+1)÷3 = 8.7 分，最大進步 15 分。`,
`{"data": ["3;60;75;80;78;50;70;2;17.5;20", "2;50;50;60;60;0;0;0", "1;0;100;1;100;100", "3;90;100;80;95;70;71;3;8.7;15"]}`)}
'
 onclick='${ONCLICK}'>27
</button> ${answerButtons('學生成績進步獎')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>學生成績進步獎</td>
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
${qHeader("28", `最大公因數`, `國中基礎應用`)}
${desc(`
輸入兩個正整數，計算並輸出兩數的最大公因數（GCD）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數。<br/>
第 2 行輸入一個正整數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表兩數的最大公因數。
`)}
${sample(1,
`24<br/>
36`,
`12`,
`24 與 36 的公因數中最大的是 12（24=12×2，36=12×3）。`)}
${sample(2,
`1<br/>
1`,
`1`,
`1 與 1 的公因數中最大的是 1（1=1×1，1=1×1）。`)}
${sample(3,
`7<br/>
13`,
`1`,
`7 與 13 的公因數中最大的是 1（7=1×7，13=1×13）。`)}
${sample(4,
`1000000<br/>
500000`,
`500000`,
`1000000 與 500000 的公因數中最大的是 500000（1000000=500000×2，500000=500000×1）。`,
`{"data": ["24;36;12", "1;1;1", "7;13;1", "1000000;500000;500000"]}`)}
'
 onclick='${ONCLICK}'>28
</button> ${answerButtons('最大公因數')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>最大公因數</td>
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
${qHeader("29", `單價與總額計費`, `國中基礎應用`)}
${desc(`
購物運費規則：若商品總金額超過 2000 元（不含 2000 元），可享 5% 折扣且免運費；若商品總金額為 2000 元（含）以下，則沒有折扣，並需另外加收 100 元運費。若結果有小數，請四捨五入到整數元。請計算顧客最後應付的總金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表商品總金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後應付的總金額（元）。
`)}
${sample(1,
`2000`,
`2100`,
`商品 2000 元未超過 2000 元，沒有折扣，加收 100 元運費：2000+100 = 2100 元。`)}
${sample(2,
`2001`,
`1901`,
`商品 2001 元超過 2000 元，打 95 折且免運費：2001×0.95 = 1901 元。`)}
${sample(3,
`3000`,
`2850`,
`商品 3000 元超過 2000 元，打 95 折且免運費：3000×0.95 = 2850 元。`)}
${sample(4,
`0`,
`100`,
`商品 0 元未超過 2000 元，沒有折扣，加收 100 元運費：0+100 = 100 元。`,
`{"data": ["2000;2100", "2001;1901", "3000;2850", "0;100"]}`)}
'
 onclick='${ONCLICK}'>29
</button> ${answerButtons('單價與總額計費')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>單價與總額計費</td>
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
${qHeader("30", `中獎機率限制`, `國中基礎應用`)}
${desc(`
模擬單人抽獎遊戲：每人有 3 次抽獎機會。請統計這 3 次中總共中獎了幾次，並判斷最終是否成功（只要中獎次數達到 1 次以上即為成功，3 次都沒中則為沒中）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 3 個字串，分別代表這 3 次抽獎的結果，每個字串為「是」（中獎）或「否」（沒中）。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出兩行：<br/>
第 1 行輸出一個整數，代表 3 次中總共中獎的次數。<br/>
第 2 行輸出字串「成功」或「沒中」。
`)}
${sample(1,
`否<br/>
是<br/>
否`,
`1<br/>
成功`,
`3 次抽獎結果為 否、是、否，共中獎 1 次，至少中 1 次，輸出「成功」。`)}
${sample(2,
`否<br/>
否<br/>
否`,
`0<br/>
沒中`,
`3 次抽獎結果為 否、否、否，共中獎 0 次，3 次都沒中，輸出「沒中」。`)}
${sample(3,
`是<br/>
是<br/>
是`,
`3<br/>
成功`,
`3 次抽獎結果為 是、是、是，共中獎 3 次，至少中 1 次，輸出「成功」。`)}
${sample(4,
`是<br/>
否<br/>
否`,
`1<br/>
成功`,
`3 次抽獎結果為 是、否、否，共中獎 1 次，至少中 1 次，輸出「成功」。`,
`{"data": ["否;是;否;1;成功", "否;否;否;0;沒中", "是;是;是;3;成功", "是;否;否;1;成功"]}`)}
'
 onclick='${ONCLICK}'>30
</button> ${answerButtons('中獎機率限制')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>中獎機率限制</td>
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
${qHeader("31", `購物折扣累計`, `國中基礎應用`)}
${desc(`
購物折扣規則：若顧客為 VIP 會員，結帳金額先打 9 折；打完 9 折後，如果金額仍超過 1000 元（不含 1000 元本身），再折抵 100 元現金。非會員則以原價計價，無任何折扣。若計算過程出現小數，請四捨五入到整數元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個字串，內容為「是」或「否」，代表是否為 VIP 會員。<br/>
第 2 行輸入一個正整數，代表原始金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後結帳金額（元）。
`)}
${sample(1,
`是<br/>
1500`,
`1250`,
`VIP 會員先打 9 折：1500×0.9 = 1350 元，仍超過 1000 元，再折抵 100 元 = 1250 元，四捨五入後為 1250 元。`)}
${sample(2,
`是<br/>
1111.11`,
`1000`,
`VIP 會員先打 9 折：1111.11×0.9 = 999.999 元，未超過 1000 元，不再折抵，四捨五入後為 1000 元。`)}
${sample(3,
`否<br/>
1500`,
`1500`,
`非會員，以原價 1500 元計價。`)}
${sample(4,
`是<br/>
0`,
`0`,
`VIP 會員先打 9 折：0×0.9 = 0 元，未超過 1000 元，不再折抵，四捨五入後為 0 元。`,
`{"data": ["是;1500;1250", "是;1111.11;1000", "否;1500;1500", "是;0;0"]}`)}
'
 onclick='${ONCLICK}'>31
</button> ${answerButtons('購物折扣累計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>購物折扣累計</td>
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
${qHeader("32", `物流分裝`, `國中基礎應用`)}
${desc(`
快遞公司依重量分類貨物：重量達到 10 公斤（含）以上為「大件」；5 公斤（含）至未滿 10 公斤為「中件」；未滿 5 公斤（不含 5 公斤）為「小件」。請統計各類貨物的總數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表貨物總數。<br/>
接下來 N 行，每行輸入一個正實數，代表一件貨物的重量（公斤）。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三行整數，分別代表大件、中件、小件的數量。
`)}
${sample(1,
`1<br/>
4.9`,
`0<br/>
0<br/>
1`,
`4.9 公斤未滿 5 公斤為小件。<br/>大件 0 件、中件 0 件、小件 1 件。`)}
${sample(2,
`1<br/>
5`,
`0<br/>
1<br/>
0`,
`5 公斤介於 5～10 公斤為中件。<br/>大件 0 件、中件 1 件、小件 0 件。`)}
${sample(3,
`4<br/>
12<br/>
5<br/>
9.5<br/>
3`,
`1<br/>
2<br/>
1`,
`12 公斤達 10 公斤以上為大件；5、9.5 公斤介於 5～10 公斤為中件；3 公斤未滿 5 公斤為小件。<br/>大件 1 件、中件 2 件、小件 1 件。`)}
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
0<br/>
0`,
`10、10、10、10、10、10、10、10 公斤達 10 公斤以上為大件。<br/>大件 8 件、中件 0 件、小件 0 件。`,
`{"data": ["1;4.9;0;0;1", "1;5;0;1;0", "4;12;5;9.5;3;1;2;1", "8;10;10;10;10;10;10;10;10;8;0;0"]}`)}
'
 onclick='${ONCLICK}'>32
</button> ${answerButtons('物流分裝')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>物流分裝</td>
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
${qHeader("33", `縣市區域分類`, `國中基礎應用`)}
${desc(`
郵務系統依縣市代碼分類區域，代碼與區域對應如下：1 為北部、2 為中部、3 為南部、4 為東部。輸入的代碼保證為 1~4 之一。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數（1~4），代表縣市代碼。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「北部」、「中部」、「南部」或「東部」之一。
`)}
${sample(1,
`1`,
`北部`,
`代碼 1 對應「北部」。`)}
${sample(2,
`2`,
`中部`,
`代碼 2 對應「中部」。`)}
${sample(3,
`3`,
`南部`,
`代碼 3 對應「南部」。`)}
${sample(4,
`4`,
`東部`,
`代碼 4 對應「東部」。`,
`{"data": ["1;北部", "2;中部", "3;南部", "4;東部"]}`)}
'
 onclick='${ONCLICK}'>33
</button> ${answerButtons('縣市區域分類')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>縣市區域分類</td>
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
${qHeader("34", `儲值卡餘額扣款`, `國中基礎應用`)}
${desc(`
模擬感應卡扣款：原始餘額保證為 500 元以下。首先檢查餘額是否足夠支付本次扣款金額：<br/>
1. 若餘額大於或等於扣款金額，直接扣款，並輸出扣款後的餘額。<br/>
2. 若餘額不足，則讀取是否要自動加值 500 元：若選擇加值，則先將餘額加上 500 元，再扣款，並輸出扣款後的餘額（本題保證加值後餘額必定足夠支付）；若選擇不加值，則不扣款，輸出「餘額不足」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數（0~500），代表原始餘額。<br/>
第 2 行輸入一個非負整數，代表預計扣款金額。<br/>
若餘額不足以支付扣款金額，則額外輸入第 3 行，內容為字串「是」或「否」，代表是否自動加值 500 元（若餘額原本已足夠，則不會有第 3 行輸入）。<br/>
<span ${LBL_OUT}>輸出說明</span>若扣款成功，輸出一個整數，代表扣款後的餘額；若餘額不足且選擇不加值，輸出字串「餘額不足」。
`)}
${sample(1,
`500<br/>
500`,
`0`,
`餘額 500 元 ≥ 扣款 500 元，直接扣款，剩 500-500 = 0 元。`)}
${sample(2,
`300<br/>
600<br/>
是`,
`200`,
`餘額 300 元不足扣款 600 元，選擇自動加值：300+500-600 = 200 元。`)}
${sample(3,
`100<br/>
200<br/>
否`,
`餘額不足`,
`餘額 100 元不足扣款 200 元，且選擇不加值，不扣款，輸出「餘額不足」。`)}
${sample(4,
`0<br/>
0`,
`0`,
`餘額 0 元 ≥ 扣款 0 元，直接扣款，剩 0-0 = 0 元。`,
`{"data": ["500;500;0", "300;600;是;200", "100;200;否;餘額不足", "0;0;0"]}`)}
'
 onclick='${ONCLICK}'>34
</button> ${answerButtons('儲值卡餘額扣款')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>儲值卡餘額扣款</td>
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
${qHeader("35", `自由落體位移`, `國中基礎應用`)}
${desc(`
自由落體公式為 d = 0.5 × g × t²，其中重力加速度 g = 10（公尺/秒²）。請計算物體掉落 t 秒後的位移距離 d。結果請四捨五入到小數點後 1 位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正實數，代表掉落時間 t（秒）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個數字（四捨五入到小數點後 1 位），代表位移距離 d（公尺）。
`)}
${sample(1,
`0.1`,
`0.1`,
`d = 0.5×10×0.1² = 5×0.01 = 0.05，四捨五入到小數點後 1 位為 0.1。`)}
${sample(2,
`1`,
`5`,
`d = 0.5×10×1² = 5×1 = 5，四捨五入到小數點後 1 位為 5.0。`)}
${sample(3,
`3`,
`45`,
`d = 0.5×10×3² = 5×9 = 45，四捨五入到小數點後 1 位為 45.0。`)}
${sample(4,
`10`,
`500`,
`d = 0.5×10×10² = 5×100 = 500，四捨五入到小數點後 1 位為 500.0。`,
`{"data": ["0.1;0.1", "1;5", "3;45", "10;500"]}`)}
'
 onclick='${ONCLICK}'>35
</button> ${answerButtons('自由落體位移')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>自由落體位移</td>
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
${qHeader("36", `最佳折扣選擇`, `國中基礎應用`)}
${desc(`
比較兩種折扣方案購買 N 件同款商品（單價相同）：<br/>
方案 A「買三送一」：每購買 3 件可以免費多得 1 件（即每 4 件只需付 3 件的價錢，不足 4 件的部分不適用送 1 件優惠，依實際付款件數計算）。<br/>
方案 B「全面 75 折」：不論購買數量，一律以定價的 75 折計價。<br/>
請計算並輸出兩種方案中，實際花費較少（較划算）的總金額；若兩方案花費相同，輸出該金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表單價。<br/>
第 2 行輸入一個正整數 N，代表購買數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最便宜的總金額。
`)}
${sample(1,
`100<br/>
10`,
`750`,
`方案 A：10 件中有 2 組「買三送一」，實付 8 件，8×100 = 800 元。<br/>方案 B：10×100×0.75 = 750 元。<br/>方案 B 較便宜，輸出 750 元。`)}
${sample(2,
`100<br/>
1`,
`75`,
`方案 A：1 件中有 0 組「買三送一」，實付 1 件，1×100 = 100 元。<br/>方案 B：1×100×0.75 = 75 元。<br/>方案 B 較便宜，輸出 75 元。`)}
${sample(3,
`100<br/>
4`,
`300`,
`方案 A：4 件中有 1 組「買三送一」，實付 3 件，3×100 = 300 元。<br/>方案 B：4×100×0.75 = 300 元。<br/>兩方案相同，輸出 300 元。`)}
${sample(4,
`50<br/>
1000`,
`37500`,
`方案 A：1000 件中有 250 組「買三送一」，實付 750 件，750×50 = 37500 元。<br/>方案 B：1000×50×0.75 = 37500 元。<br/>兩方案相同，輸出 37500 元。`,
`{"data": ["100;10;750", "100;1;75", "100;4;300", "50;1000;37500"]}`)}
'
 onclick='${ONCLICK}'>36
</button> ${answerButtons('最佳折扣選擇')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>最佳折扣選擇</td>
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
${qHeader("37", `三角形類型判別`, `國中基礎應用`)}
${desc(`
輸入三個正整數，代表三角形的三邊長。請先判斷這三邊是否能組成三角形（任兩邊之和必須大於第三邊，若不滿足則不能組成三角形）；若能組成三角形，再判斷是「等邊三角形」（三邊都相等）、「等腰三角形」（恰好有兩邊相等）或「一般三角形」（三邊都不相等）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個正整數，分別代表三角形的三個邊長。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個字串，內容為「非三角形」、「等邊三角形」、「等腰三角形」或「一般三角形」之一。
`)}
${sample(1,
`1<br/>
1<br/>
3`,
`非三角形`,
`1+1 = 2 不大於 3，無法組成三角形。`)}
${sample(2,
`5<br/>
5<br/>
5`,
`等邊三角形`,
`任兩邊之和都大於第三邊，可組成三角形；5、5、5 三邊都相等，為「等邊三角形」。`)}
${sample(3,
`5<br/>
5<br/>
8`,
`等腰三角形`,
`任兩邊之和都大於第三邊，可組成三角形；5、5、8 恰有兩邊相等，為「等腰三角形」。`)}
${sample(4,
`3<br/>
4<br/>
5`,
`一般三角形`,
`任兩邊之和都大於第三邊，可組成三角形；3、4、5 三邊都不相等，為「一般三角形」。`,
`{"data": ["1;1;3;非三角形", "5;5;5;等邊三角形", "5;5;8;等腰三角形", "3;4;5;一般三角形"]}`)}
'
 onclick='${ONCLICK}'>37
</button> ${answerButtons('三角形類型判別')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>三角形類型判別</td>
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
${qHeader("38", `複利本利和`, `國中基礎應用`)}
${desc(`
複利本利和公式為 A = P × (1+r)ⁿ，其中 P 為本金、r 為年利率（以小數表示，例如 5% 請輸入 0.05）、n 為期數（年）。請計算 n 年後的本利和，結果四捨五入到整數元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表本金 P。<br/>
第 2 行輸入一個實數，代表年利率 r（以小數表示）。<br/>
第 3 行輸入一個正整數，代表年數 n。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表 n 年後的本利和（四捨五入到整數元）。
`)}
${sample(1,
`10000<br/>
0.05<br/>
3`,
`11576`,
`A = 10000×(1+0.05)^3 = 10000×1.157625 ≈ 11576.25，四捨五入為 11576 元。`)}
${sample(2,
`1000<br/>
0<br/>
5`,
`1000`,
`A = 1000×(1+0)^5 = 1000×1 ≈ 1000.00，四捨五入為 1000 元。`)}
${sample(3,
`1<br/>
1<br/>
1`,
`2`,
`A = 1×(1+1)^1 = 1×2 ≈ 2.00，四捨五入為 2 元。`)}
${sample(4,
`1000000<br/>
0.1<br/>
10`,
`2593742`,
`A = 1000000×(1+0.1)^10 = 1000000×2.593742 ≈ 2593742.46，四捨五入為 2593742 元。`,
`{"data": ["10000;0.05;3;11576", "1000;0;5;1000", "1;1;1;2", "1000000;0.1;10;2593742"]}`)}
'
 onclick='${ONCLICK}'>38
</button> ${answerButtons('複利本利和')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>複利本利和</td>
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
${qHeader("39", `醫院掛號費分級`, `國中基礎應用`)}
${desc(`
醫院門診費依年齡收費：未滿 12 歲（不含 12 歲）或 65 歲（含）以上，收取 100 元；12 歲（含）至 64 歲（含），收取 200 元。請統計掛號名單中各類別的人數，以及總收入。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入總人數。<br/>
接下來依序輸入病患的年齡。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出收費 100 元類別（兒童與老人）、收費 200 元類別（一般成人）的人數、總收入。
`)}
${sample(1,
`3<br/>
10<br/>
30<br/>
70`,
`2<br/>
1<br/>
400`,
`10、70 歲屬於兒童或老人（100 元）；30 歲屬於一般成人（200 元）。<br/>100 元類別 2 人、200 元類別 1 人，總收入 2×100+1×200 = 400 元。`)}
${sample(2,
`1<br/>
12`,
`0<br/>
1<br/>
200`,
`12 歲屬於一般成人（200 元）。<br/>100 元類別 0 人、200 元類別 1 人，總收入 0×100+1×200 = 200 元。`)}
${sample(3,
`2<br/>
64<br/>
65`,
`1<br/>
1<br/>
300`,
`65 歲屬於兒童或老人（100 元）；64 歲屬於一般成人（200 元）。<br/>100 元類別 1 人、200 元類別 1 人，總收入 1×100+1×200 = 300 元。`)}
${sample(4,
`8<br/>
11<br/>
11<br/>
11<br/>
11<br/>
11<br/>
11<br/>
11<br/>
11`,
`8<br/>
0<br/>
800`,
`11、11、11、11、11、11、11、11 歲屬於兒童或老人（100 元）。<br/>100 元類別 8 人、200 元類別 0 人，總收入 8×100+0×200 = 800 元。`,
`{"data": ["3;10;30;70;2;1;400", "1;12;0;1;200", "2;64;65;1;1;300", "8;11;11;11;11;11;11;11;11;8;0;800"]}`)}
'
 onclick='${ONCLICK}'>39
</button> ${answerButtons('醫院掛號費分級')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>醫院掛號費分級</td>
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
${qHeader("40", `購物卷扣抵`, `國中基礎應用`)}
${desc(`
購物卷折抵規則：每張購物卷可折抵 100 元，折抵金額不可超過消費金額（即最低實收金額為 0 元）。請計算使用購物卷後的實收金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個非負整數，代表消費金額（元）。<br/>
第 2 行輸入一個非負整數，代表使用的購物卷張數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表實收總金額（元，最低為 0）。
`)}
${sample(1,
`250<br/>
3`,
`0`,
`3 張購物卷可折抵 3×100 = 300 元，超過消費金額 250 元，實收最低為 0 元。`)}
${sample(2,
`1000<br/>
10`,
`0`,
`10 張購物卷可折抵 10×100 = 1000 元，1000-1000 = 0 元。`)}
${sample(3,
`1000<br/>
0`,
`1000`,
`0 張購物卷可折抵 0×100 = 0 元，1000-0 = 1000 元。`)}
${sample(4,
`500<br/>
5`,
`0`,
`5 張購物卷可折抵 5×100 = 500 元，500-500 = 0 元。`,
`{"data": ["250;3;0", "1000;10;0", "1000;0;1000", "500;5;0"]}`)}
'
 onclick='${ONCLICK}'>40
</button> ${answerButtons('購物卷扣抵')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>購物卷扣抵</td>
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
${qHeader("41", `加權成績計算`, `國中基礎應用`)}
${desc(`
加權成績計算公式為：總分 = 平時成績×30% + 期中成績×30% + 期末成績×40%。若總分達到 60 分（含）以上，判定為「及格」；否則為「不及格」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個實數，分別代表平時成績、期中成績、期末成績。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出字串「及格」或「不及格」。
`)}
${sample(1,
`50<br/>
70<br/>
65`,
`及格`,
`總分 = 50×0.3 + 70×0.3 + 65×0.4 = 62，達到 60 分，及格。`)}
${sample(2,
`0<br/>
0<br/>
0`,
`不及格`,
`總分 = 0×0.3 + 0×0.3 + 0×0.4 = 0，未達 60 分，不及格。`)}
${sample(3,
`100<br/>
100<br/>
100`,
`及格`,
`總分 = 100×0.3 + 100×0.3 + 100×0.4 = 100，達到 60 分，及格。`)}
${sample(4,
`60<br/>
60<br/>
60`,
`及格`,
`總分 = 60×0.3 + 60×0.3 + 60×0.4 = 60，達到 60 分，及格。`,
`{"data": ["50;70;65;及格", "0;0;0;不及格", "100;100;100;及格", "60;60;60;及格"]}`)}
'
 onclick='${ONCLICK}'>41
</button> ${answerButtons('加權成績計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>加權成績計算</td>
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
${qHeader("42", `月度營收分析`, `國中基礎應用`)}
${desc(`
記錄一整年 12 個月的營收，請找出營收最高與最低的月份（以月份編號 1~12 表示；若有並列，取月份編號最小者），並計算第四季（10、11、12 月）與第三季（7、8、9 月）的營收總和，判斷第四季是否比第三季成長（第四季總和嚴格大於第三季總和才算成長）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 12 個非負整數，分別代表 1 月至 12 月的營收金額。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出三行：<br/>
第 1 行輸出營收最高的月份編號（整數）。<br/>
第 2 行輸出營收最低的月份編號（整數）。<br/>
第 3 行輸出字串「是」或「否」，代表第四季是否比第三季成長。
`)}
${sample(1,
`100<br/>
120<br/>
90<br/>
110<br/>
130<br/>
140<br/>
150<br/>
160<br/>
170<br/>
200<br/>
210<br/>
220`,
`12<br/>
3<br/>
是`,
`最高營收 220 出現在 12 月，最低營收 90 出現在 3 月（並列取月份最小者）。<br/>第三季 150+160+170 = 480，第四季 200+210+220 = 630，第四季較高，輸出「是」。`)}
${sample(2,
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
`1<br/>
1<br/>
否`,
`最高營收 0 出現在 1 月，最低營收 0 出現在 1 月（並列取月份最小者）。<br/>第三季 0+0+0 = 0，第四季 0+0+0 = 0，第四季沒有大於第三季，輸出「否」。`)}
${sample(3,
`12<br/>
11<br/>
10<br/>
9<br/>
8<br/>
7<br/>
6<br/>
5<br/>
4<br/>
3<br/>
2<br/>
1`,
`1<br/>
12<br/>
否`,
`最高營收 12 出現在 1 月，最低營收 1 出現在 12 月（並列取月份最小者）。<br/>第三季 6+5+4 = 15，第四季 3+2+1 = 6，第四季沒有大於第三季，輸出「否」。`)}
${sample(4,
`100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
100<br/>
50<br/>
50<br/>
50`,
`1<br/>
10<br/>
否`,
`最高營收 100 出現在 1 月，最低營收 50 出現在 10 月（並列取月份最小者）。<br/>第三季 100+100+100 = 300，第四季 50+50+50 = 150，第四季沒有大於第三季，輸出「否」。`,
`{"data": ["100;120;90;110;130;140;150;160;170;200;210;220;12;3;是", "0;0;0;0;0;0;0;0;0;0;0;0;1;1;否", "12;11;10;9;8;7;6;5;4;3;2;1;1;12;否", "100;100;100;100;100;100;100;100;100;50;50;50;1;10;否"]}`)}
'
 onclick='${ONCLICK}'>42
</button> ${answerButtons('月度營收分析')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>月度營收分析</td>
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
${qHeader("43", `智慧停車格管理`, `國中基礎應用`)}
${desc(`
智慧停車場分別管理大車格與小車格。請分別輸入大車格與小車格的總數與目前已停放數，若某類車位已達總數（已停滿），該類輸出「停止進入」；否則輸出該類剩餘的車位數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
分別輸入大車格總數與已停放數。<br/>
分別輸入小車格總數與已停放數。<br/>
<span ${LBL_OUT}>輸出說明</span>接下來依序輸出大車格與小車格的狀態 ( 若已停滿，輸出「停止進入」；否則輸出剩餘車位數 )。
`)}
${sample(1,
`20 20<br/>
15 10`,
`停止進入<br/>
5`,
`大車格共 20 格、已停 20 輛，已停滿，輸出「停止進入」；<br/>小車格共 15 格、已停 10 輛，剩 5 格。`)}
${sample(2,
`10 5<br/>
10 5`,
`5<br/>
5`,
`大車格共 10 格、已停 5 輛，剩 5 格；<br/>小車格共 10 格、已停 5 輛，剩 5 格。`)}
${sample(3,
`1 1<br/>
1 0`,
`停止進入<br/>
1`,
`大車格共 1 格、已停 1 輛，已停滿，輸出「停止進入」；<br/>小車格共 1 格、已停 0 輛，剩 1 格。`)}
${sample(4,
`100 0<br/>
100 0`,
`100<br/>
100`,
`大車格共 100 格、已停 0 輛，剩 100 格；<br/>小車格共 100 格、已停 0 輛，剩 100 格。`,
`{"data": ["20;20;15;10;停止進入;5", "10;5;10;5;5;5", "1;1;1;0;停止進入;1", "100;0;100;0;100;100"]}`)}
'
 onclick='${ONCLICK}'>43
</button> ${answerButtons('智慧停車格管理')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>智慧停車格管理</td>
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
${qHeader("44", `及格考科統計`, `國中基礎應用`)}
${desc(`
輸入 5 科成績，統計該學生共有幾科達到 60 分（含）以上（及格）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 5 個整數（0~100），分別代表 5 科的成績。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表及格的科目總數。
`)}
${sample(1,
`55<br/>
60<br/>
72<br/>
88<br/>
40`,
`3`,
`5 科成績 55、60、72、88、40 中，達 60 分的有 60、72、88，共 3 科。`)}
${sample(2,
`0<br/>
0<br/>
0<br/>
0<br/>
0`,
`0`,
`5 科成績 0、0、0、0、0 中，達 60 分的有 0 科。`)}
${sample(3,
`100<br/>
100<br/>
100<br/>
100<br/>
100`,
`5`,
`5 科成績 100、100、100、100、100 中，達 60 分的有 100、100、100、100、100，共 5 科。`)}
${sample(4,
`59<br/>
60<br/>
61<br/>
60<br/>
59`,
`3`,
`5 科成績 59、60、61、60、59 中，達 60 分的有 60、61、60，共 3 科。`,
`{"data": ["55;60;72;88;40;3", "0;0;0;0;0;0", "100;100;100;100;100;5", "59;60;61;60;59;3"]}`)}
'
 onclick='${ONCLICK}'>44
</button> ${answerButtons('及格考科統計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>及格考科統計</td>
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
${qHeader("45", `校園機關賽總分`, `國中基礎應用`)}
${desc(`
競賽共三回合，每人每回合都有一個分數，總分為三回合分數之和。請計算每位選手的總分，並依總分由高到低排名（名次採「跳號」制：若有選手總分並列，則名次相同，下一名次依人數往後跳，例如兩人並列第 1 名，則接下來的名次為第 3 名）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
輸入選手數。<br/>
接下來依序輸入每一位選手三回合的分數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出該位選手（依輸入順序）的總分與名次。
`)}
${sample(1,
`3<br/>
80 85 90<br/>
90 85 80<br/>
70 60 65`,
`255 1<br/>
255 1<br/>
195 3`,
`第 1 位 80+85+90 = 255 分，第 1 名；第 2 位 90+85+80 = 255 分，第 1 名；第 3 位 70+60+65 = 195 分，第 3 名。<br/>總分相同者名次相同，下一名次依人數往後跳。`)}
${sample(2,
`3<br/>
50 50 50<br/>
50 50 50<br/>
50 50 50`,
`150 1<br/>
150 1<br/>
150 1`,
`第 1 位 50+50+50 = 150 分，第 1 名；第 2 位 50+50+50 = 150 分，第 1 名；第 3 位 50+50+50 = 150 分，第 1 名。<br/>總分相同者名次相同，下一名次依人數往後跳。`)}
${sample(3,
`1<br/>
100 100 100`,
`300 1`,
`第 1 位 100+100+100 = 300 分，第 1 名。`)}
${sample(4,
`3<br/>
0 0 0<br/>
1 1 1<br/>
2 2 2`,
`0 3<br/>
3 2<br/>
6 1`,
`第 1 位 0+0+0 = 0 分，第 3 名；第 2 位 1+1+1 = 3 分，第 2 名；第 3 位 2+2+2 = 6 分，第 1 名。`,
`{"data": ["3;80;85;90;90;85;80;70;60;65;255;1;255;1;195;3", "3;50;50;50;50;50;50;50;50;50;150;1;150;1;150;1", "1;100;100;100;300;1", "3;0;0;0;1;1;1;2;2;2;0;3;3;2;6;1"]}`)}
'
 onclick='${ONCLICK}'>45
</button> ${answerButtons('校園機關賽總分')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>校園機關賽總分</td>
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
${qHeader("46", `公園健走計時排名`, `國中基礎應用`)}
${desc(`
記錄多位民眾健走 3 公里所花費的時間（秒），請找出花費時間最少（走最快）的前三名時間（由小到大輸出；參加人數保證至少為 3 人）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N（N≥3），代表參加人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位參加者花費的時間（秒）。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三行整數，由小到大分別代表前三名的秒數。
`)}
${sample(1,
`5<br/>
1200<br/>
1100<br/>
1500<br/>
1050<br/>
1300`,
`1050<br/>
1100<br/>
1200`,
`5 位參加者的秒數由小到大排序為 1050、1100、1200、1300、1500，前三名為 1050、1100、1200。`)}
${sample(2,
`3<br/>
1<br/>
2<br/>
3`,
`1<br/>
2<br/>
3`,
`3 位參加者的秒數由小到大排序為 1、2、3，前三名為 1、2、3。`)}
${sample(3,
`4<br/>
100<br/>
100<br/>
100<br/>
100`,
`100<br/>
100<br/>
100`,
`4 位參加者的秒數由小到大排序為 100、100、100、100，前三名為 100、100、100。`)}
${sample(4,
`3<br/>
999999<br/>
1<br/>
500000`,
`1<br/>
500000<br/>
999999`,
`3 位參加者的秒數由小到大排序為 1、500000、999999，前三名為 1、500000、999999。`,
`{"data": ["5;1200;1100;1500;1050;1300;1050;1100;1200", "3;1;2;3;1;2;3", "4;100;100;100;100;100;100;100", "3;999999;1;500000;1;500000;999999"]}`)}
'
 onclick='${ONCLICK}'>46
</button> ${answerButtons('公園健走計時排名')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>公園健走計時排名</td>
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
${qHeader("47", `超市週年慶（多重折扣）`, `國中基礎應用`)}
${desc(`
超市週年慶折扣規則：消費金額達到 5000 元（含）以上，打 8 折；未達 5000 元但達到 2000 元（含）以上，打 9 折；未達 2000 元則無折扣。折扣計算後，若顧客為會員，再折抵 100 元現金。若結果有小數，請四捨五入到整數元（若折抵後金額為負，則以 0 元計）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表原始金額（元）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否為會員。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應付總額。
`)}
${sample(1,
`6000<br/>
是`,
`4700`,
`6000 元達 5000 元，打 8 折 = 4800 元；是會員再折抵 100 元 = 4700 元。應付 4700 元。`)}
${sample(2,
`1999<br/>
否`,
`1999`,
`1999 元未達 2000 元，沒有折扣；不是會員，不折抵。應付 1999 元。`)}
${sample(3,
`2000<br/>
是`,
`1700`,
`2000 元達 2000 元未達 5000 元，打 9 折 = 1800 元；是會員再折抵 100 元 = 1700 元。應付 1700 元。`)}
${sample(4,
`100<br/>
是`,
`0`,
`100 元未達 2000 元，沒有折扣；是會員再折抵 100 元 = 0 元。應付 0 元。`,
`{"data": ["6000;是;4700", "1999;否;1999", "2000;是;1700", "100;是;0"]}`)}
'
 onclick='${ONCLICK}'>47
</button> ${answerButtons('超市週年慶（多重折扣）')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>超市週年慶（多重折扣）</td>
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
${qHeader("48", `校園分班分群`, `國中基礎應用`)}
${desc(`
學校依學生的選修志願與分數進行分班：志願為「文科」且分數達到 60 分（含）以上，錄取文科班；志願為「理科」且分數達到 60 分（含）以上，錄取理科班；分數未達 60 分者，不錄取任何班群。請統計文科班、理科班、未錄取的人數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
輸入總人數。<br/>
接下來依序輸入每一位學生的分數與志願（「文科」或「理科」）。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出文科班、理科班、未錄取的人數。
`)}
${sample(1,
`3<br/>
70 文科<br/>
80 理科<br/>
50 文科`,
`1<br/>
1<br/>
1`,
`70 分志願文科：錄取文科班；80 分志願理科：錄取理科班；50 分志願文科：未達 60 分，不錄取。<br/>文科班 1 人、理科班 1 人、未錄取 1 人。`)}
${sample(2,
`1<br/>
59 文科`,
`0<br/>
0<br/>
1`,
`59 分志願文科：未達 60 分，不錄取。<br/>文科班 0 人、理科班 0 人、未錄取 1 人。`)}
${sample(3,
`1<br/>
60 理科`,
`0<br/>
1<br/>
0`,
`60 分志願理科：錄取理科班。<br/>文科班 0 人、理科班 1 人、未錄取 0 人。`)}
${sample(4,
`4<br/>
100 文科<br/>
100 文科<br/>
100 文科<br/>
100 文科`,
`4<br/>
0<br/>
0`,
`100 分志願文科：錄取文科班；100 分志願文科：錄取文科班；100 分志願文科：錄取文科班；100 分志願文科：錄取文科班。<br/>文科班 4 人、理科班 0 人、未錄取 0 人。`,
`{"data": ["3;70;文科;80;理科;50;文科;1;1;1", "1;59;文科;0;0;1", "1;60;理科;0;1;0", "4;100;文科;100;文科;100;文科;100;文科;4;0;0"]}`)}
'
 onclick='${ONCLICK}'>48
</button> ${answerButtons('校園分班分群')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>校園分班分群</td>
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
${qHeader("49", `演唱會座位排定`, `國中基礎應用`)}
${desc(`
演唱會每排設置 20 個座位，座位不可跨排分配給同一組訂票（即每排最多容納 20 人，超過的部分需安排到下一排）。請根據訂票總人數，計算至少需要安排幾排座位（允許最後一排有空位）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個正整數，代表訂票總人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表需要安排的排數。
`)}
${sample(1,
`1`,
`1`,
`每排 20 個座位，1÷20 無條件進位得 1 排。`)}
${sample(2,
`20`,
`1`,
`每排 20 個座位，20÷20 無條件進位得 1 排。`)}
${sample(3,
`21`,
`2`,
`每排 20 個座位，21÷20 無條件進位得 2 排（1 排只能坐 20 人，不夠）。`)}
${sample(4,
`45`,
`3`,
`每排 20 個座位，45÷20 無條件進位得 3 排（2 排只能坐 40 人，不夠）。`)}
${sample(5,
`1000000`,
`50000`,
`每排 20 個座位，1000000÷20 無條件進位得 50000 排（49999 排只能坐 999980 人，不夠）。`,
`{"data": ["1;1", "20;1", "21;2", "45;3", "1000000;50000"]}`)}
'
 onclick='${ONCLICK}'>49
</button> ${answerButtons('演唱會座位排定')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>演唱會座位排定</td>
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
${qHeader("50", `快遞費用累計與加價`, `國中基礎應用`)}
${desc(`
快遞運費規則：基本運費 100 元；若寄送地區為「偏遠地區」，加收 50 元；若重量超過 5 公斤（不含 5 公斤），超過的部分每公斤加收 10 元（不足 1 公斤以 1 公斤計）。請輸出各項加價明細，以及總運費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正實數，代表包裹重量（公斤）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否為偏遠地區。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
依序輸出三行整數：<br/>
第 1 行為偏遠地區加收金額（是則 50，否則 0）。<br/>
第 2 行為超重加收金額。<br/>
第 3 行為總運費。
`)}
${sample(1,
`5<br/>
否`,
`0<br/>
0<br/>
100`,
`非偏遠地區，加收 0 元；重量 5 公斤未超過 5 公斤，超重加收 0 元；<br/>總運費 100+0+0 = 100 元。`)}
${sample(2,
`5.1<br/>
否`,
`0<br/>
10<br/>
110`,
`非偏遠地區，加收 0 元；重量 5.1 公斤，超過 5 公斤的部分 0.1 公斤，以 1 公斤計，加收 1×10 = 10 元；<br/>總運費 100+0+10 = 110 元。`)}
${sample(3,
`7.5<br/>
是`,
`50<br/>
30<br/>
180`,
`偏遠地區加收 50 元；重量 7.5 公斤，超過 5 公斤的部分 2.5 公斤，以 3 公斤計，加收 3×10 = 30 元；<br/>總運費 100+50+30 = 180 元。`)}
${sample(4,
`100<br/>
是`,
`50<br/>
950<br/>
1100`,
`偏遠地區加收 50 元；重量 100 公斤，超過 5 公斤的部分 95 公斤，以 95 公斤計，加收 95×10 = 950 元；<br/>總運費 100+50+950 = 1100 元。`,
`{"data": ["5;否;0;0;100", "5.1;否;0;10;110", "7.5;是;50;30;180", "100;是;50;950;1100"]}`)}
'
 onclick='${ONCLICK}'>50
</button> ${answerButtons('快遞費用累計與加價')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>快遞費用累計與加價</td>
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
${qHeader("51", `水上樂園門票計算`, `國中基礎應用`)}
${desc(`
水上樂園兩人同行優惠：單人票價 1000 元。若這兩人中有人是「本月壽星」，壽星本人可享六折優惠（壽星 600 元，另一人仍為原價 1000 元）；也可以選擇「兩人同行一人半價」優惠（一人 1000 元、另一人半價 500 元，共 1500 元）。兩種優惠只能擇一使用，請輸出兩人總金額中較便宜（划算）的方案金額。若兩人皆非壽星，則只能使用兩人同行的優惠。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數（0、1 或 2），代表這兩人中是壽星的人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最划算的結帳金額（元）。
`)}
${sample(1,
`0`,
`1500`,
`兩人都不是壽星，只能使用兩人同行優惠：1000+500 = 1500 元。`)}
${sample(2,
`1`,
`1500`,
`壽星優惠：600+1000 = 1600 元；兩人同行優惠：1000+500 = 1500 元。<br/>較便宜的是 1500 元。`)}
${sample(3,
`2`,
`1200`,
`壽星優惠：600+600 = 1200 元；兩人同行優惠：1000+500 = 1500 元。<br/>較便宜的是 1200 元。`,
`{"data": ["0;1500", "1;1500", "2;1200"]}`)}
'
 onclick='${ONCLICK}'>51
</button> ${answerButtons('水上樂園門票計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>水上樂園門票計算</td>
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
${qHeader("52", `社團錄取綜合條件`, `國中基礎應用`)}
${desc(`
社團甄選標準：（筆試分數達到 80 分（含）以上，且比賽次數達到 2 次（含）以上）成立，或是具備特殊才藝，只要符合其中一個條件即可錄取。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個整數，代表筆試分數。<br/>
第 2 行輸入一個非負整數，代表比賽次數。<br/>
第 3 行輸入一個字串，內容為「是」或「否」，代表是否具備特殊才藝。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出字串「是」或「否」，代表是否錄取。
`)}
${sample(1,
`85<br/>
1<br/>
否`,
`否`,
`筆試 85 分達 80 分、比賽 1 次未達 2 次，第一個條件不成立；沒有特殊才藝。<br/>兩個條件都不符合，不錄取，輸出「否」。`)}
${sample(2,
`80<br/>
2<br/>
否`,
`是`,
`筆試 80 分達 80 分、比賽 2 次達 2 次，第一個條件成立；沒有特殊才藝。<br/>符合其中一個條件，錄取，輸出「是」。`)}
${sample(3,
`0<br/>
0<br/>
是`,
`是`,
`筆試 0 分未達 80 分、比賽 0 次未達 2 次，第一個條件不成立；具備特殊才藝。<br/>符合其中一個條件，錄取，輸出「是」。`)}
${sample(4,
`79<br/>
5<br/>
否`,
`否`,
`筆試 79 分未達 80 分、比賽 5 次達 2 次，第一個條件不成立；沒有特殊才藝。<br/>兩個條件都不符合，不錄取，輸出「否」。`,
`{"data": ["85;1;否;否", "80;2;否;是", "0;0;是;是", "79;5;否;否"]}`)}
'
 onclick='${ONCLICK}'>52
</button> ${answerButtons('社團錄取綜合條件')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>社團錄取綜合條件</td>
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
${qHeader("53", `購物金額分段累計`, `國中基礎應用`)}
${desc(`
商店採用「分段累進」折扣：金額在 1000 元（含）以下的部分，以原價計算；超過 1000 元至 3000 元（含）的部分，打 9 折；超過 3000 元的部分，打 8 折。計算出分段折扣後的金額後，若顧客為會員身分，再折抵 50 元（若折抵後金額為負，則以 0 元計）。若結果有小數，請四捨五入到整數元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數，代表原始金額（元）。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否為會員身分。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最終應付總金額。
`)}
${sample(1,
`4000<br/>
是`,
`3550`,
`1000 元以內 1000 元；1000~3000 元部分 2000×0.9 = 1800 元；超過 3000 元部分 1000×0.8 = 800 元，合計 3600 元；會員再折抵 50 元 = 3550 元。<br/>應付 3550 元。`)}
${sample(2,
`1000<br/>
否`,
`1000`,
`1000 元以內 1000 元，合計 1000 元；非會員不折抵。<br/>應付 1000 元。`)}
${sample(3,
`3000<br/>
是`,
`2750`,
`1000 元以內 1000 元；1000~3000 元部分 2000×0.9 = 1800 元，合計 2800 元；會員再折抵 50 元 = 2750 元。<br/>應付 2750 元。`)}
${sample(4,
`0<br/>
是`,
`0`,
`1000 元以內 0 元，合計 0 元；會員再折抵 50 元，結果為負以 0 元計 = 0 元。<br/>應付 0 元。`,
`{"data": ["4000;是;3550", "1000;否;1000", "3000;是;2750", "0;是;0"]}`)}
'
 onclick='${ONCLICK}'>53
</button> ${answerButtons('購物金額分段累計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>購物金額分段累計</td>
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
${qHeader("54", `超商消費點數優化`, `國中基礎應用`)}
${desc(`
超商點數規則：每項商品金額每滿 100 元（不足 100 元的部分捨去）可獲得 1 點；若該項商品為「特定商品」，所得點數變為 3 倍。將所有商品的點數加總後，若總點數超過 50 點（不含 50 點），則額外加送 5 點。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
輸入商品項目數。<br/>
接下來依序輸入每項商品的金額與是否為加倍商品（「是」或「否」）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最後獲得的總點數。
`)}
${sample(1,
`2<br/>
2500 是<br/>
800 否`,
`88`,
`2500 元得 25 點，加倍商品 ×3 = 75 點；800 元得 8 點。<br/>總點數 83 點，超過 50 點再加送 5 點 = 88 點。`)}
${sample(2,
`1<br/>
0 否`,
`0`,
`0 元得 0 點。<br/>總點數 0 點，未超過 50 點，沒有加送。`)}
${sample(3,
`1<br/>
100 否`,
`1`,
`100 元得 1 點。<br/>總點數 1 點，未超過 50 點，沒有加送。`)}
${sample(4,
`1<br/>
5000 是`,
`155`,
`5000 元得 50 點，加倍商品 ×3 = 150 點。<br/>總點數 150 點，超過 50 點再加送 5 點 = 155 點。`,
`{"data": ["2;2500;是;800;否;88", "1;0;否;0", "1;100;否;1", "1;5000;是;155"]}`)}
'
 onclick='${ONCLICK}'>54
</button> ${answerButtons('超商消費點數優化')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>超商消費點數優化</td>
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
${qHeader("55", `連續天氣異常偵測`, `國中基礎應用`)}
${desc(`
氣象局監測連續 3 天的氣溫與雨量資料。若連續 3 天中，任兩相鄰日期的氣溫差（絕對值）皆超過 5 度（即第 1、2 天之間與第 2、3 天之間的溫差都大於 5 度），或是連續 2 天的降雨量都超過 50mm（不含 50mm），則顯示「異常」；否則顯示「正常」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 6 個數值，分別代表：第一天氣溫、第一天雨量、第二天氣溫、第二天雨量、第三天氣溫、第三天雨量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出字串「正常」或「異常」。
`)}
${sample(1,
`20<br/>
10<br/>
28<br/>
15<br/>
19<br/>
20`,
`異常`,
`溫差：第 1、2 天 8 度，第 2、3 天 9 度，皆超過 5 度；雨量 10、15、20 mm，沒有連續 2 天超過 50mm。<br/>輸出「異常」。`)}
${sample(2,
`20<br/>
60<br/>
20<br/>
60<br/>
20<br/>
10`,
`異常`,
`溫差：第 1、2 天 0 度，第 2、3 天 0 度，沒有都超過 5 度；雨量 60、60、10 mm，有連續 2 天超過 50mm。<br/>輸出「異常」。`)}
${sample(3,
`20<br/>
10<br/>
20<br/>
10<br/>
20<br/>
10`,
`正常`,
`溫差：第 1、2 天 0 度，第 2、3 天 0 度，沒有都超過 5 度；雨量 10、10、10 mm，沒有連續 2 天超過 50mm。<br/>輸出「正常」。`)}
${sample(4,
`0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0`,
`正常`,
`溫差：第 1、2 天 0 度，第 2、3 天 0 度，沒有都超過 5 度；雨量 0、0、0 mm，沒有連續 2 天超過 50mm。<br/>輸出「正常」。`,
`{"data": ["20;10;28;15;19;20;異常", "20;60;20;60;20;10;異常", "20;10;20;10;20;10;正常", "0;0;0;0;0;0;正常"]}`)}
'
 onclick='${ONCLICK}'>55
</button> ${answerButtons('連續天氣異常偵測')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>連續天氣異常偵測</td>
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
${qHeader("56", `清潔費`, `國中基礎應用`)}
${desc(`
園遊會擺攤清潔費規則：攤位收入金額每滿 500 元（不足 500 元的部分捨去），收取 10 元清潔費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數，代表攤位的收入金額（元）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應繳交的清潔費金額（元）。
`)}
${sample(1,
`0`,
`0`,
`收入 0 元，0÷500 取整數為 0，清潔費 0×10 = 0 元。`)}
${sample(2,
`499`,
`0`,
`收入 499 元，499÷500 取整數為 0，清潔費 0×10 = 0 元。`)}
${sample(3,
`500`,
`10`,
`收入 500 元，500÷500 取整數為 1，清潔費 1×10 = 10 元。`)}
${sample(4,
`1300`,
`20`,
`收入 1300 元，1300÷500 取整數為 2，清潔費 2×10 = 20 元。`,
`{"data": ["0;0", "499;0", "500;10", "1300;20"]}`)}
'
 onclick='${ONCLICK}'>56
</button> ${answerButtons('清潔費')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>清潔費</td>
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
${qHeader("57", `中位數計算`, `國中基礎應用`)}
${desc(`
輸入 5 個整數，將其由小到大排序後，輸出排序後正中間（第 3 個）的數值，即中位數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 5 個整數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表這 5 個數排序後的中位數。
`)}
${sample(1,
`9<br/>
3<br/>
7<br/>
1<br/>
5`,
`5`,
`排序後為 1 3 5 7 9，正中間第 3 個數為 5。`)}
${sample(2,
`1<br/>
1<br/>
1<br/>
1<br/>
1`,
`1`,
`排序後為 1 1 1 1 1，正中間第 3 個數為 1。`)}
${sample(3,
`-5<br/>
-4<br/>
-3<br/>
-2<br/>
-1`,
`-3`,
`排序後為 -5 -4 -3 -2 -1，正中間第 3 個數為 -3。`)}
${sample(4,
`100<br/>
1<br/>
50<br/>
2<br/>
99`,
`50`,
`排序後為 1 2 50 99 100，正中間第 3 個數為 50。`,
`{"data": ["9;3;7;1;5;5", "1;1;1;1;1;1", "-5;-4;-3;-2;-1;-3", "100;1;50;2;99;50"]}`)}
'
 onclick='${ONCLICK}'>57
</button> ${answerButtons('中位數計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>中位數計算</td>
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
${qHeader("58", `餐廳訂位多重優先`, `國中基礎應用`)}
${desc(`
餐廳帶位規則：有預約的客人優先帶位；沒有預約的客人，依現場登記人數由多到少依序帶位（人數較多者優先，人數相同則依登記順序，先登記者優先）。多組有預約的客人之間，也依登記順序帶位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
輸入登記的客人組數。<br/>
接下來依序輸入一個字串（「是」或「否」，是否有預約）與一個整數（該組人數）。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出帶位順序中，第幾組（以輸入順序編號，從 1 開始）客人被帶位。
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
`2<br/>
是 1<br/>
是 1`,
`1<br/>
2`,
`有預約的組別：第 1 組、第 2 組，依登記順序優先帶位。<br/>帶位順序為 1 → 2。`)}
${sample(4,
`3<br/>
否 3<br/>
否 3<br/>
否 9`,
`3<br/>
1<br/>
2`,
`沒有預約的組別依人數由多到少：第 3 組（9 人）、第 1 組（3 人）、第 2 組（3 人）。<br/>帶位順序為 3 → 1 → 2。`,
`{"data": ["3;否;4;是;2;否;6;2;3;1", "1;否;1;1", "2;是;1;是;1;1;2", "3;否;3;否;3;否;9;3;1;2"]}`)}
'
 onclick='${ONCLICK}'>58
</button> ${answerButtons('餐廳訂位多重優先')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>餐廳訂位多重優先</td>
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
${qHeader("59", `多筆消費折扣計算`, `國中基礎應用`)}
${desc(`
模擬購物車結帳：輸入多樣商品的金額。若商品總金額達到 3000 元（含）以上，或購買的商品件數達到 3 件（含）以上，只要符合其中一個條件，即可使用 85 折優惠券折抵；若使用者選擇不使用優惠券，即使符合資格也不折扣。若結果有小數，請四捨五入到整數元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入一個正整數 N，代表商品件數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一項商品的金額。<br/>
最後一行輸入一個字串，內容為「是」或「否」，代表是否使用優惠券。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表實收金額總計。
`)}
${sample(1,
`2<br/>
1500<br/>
2000<br/>
是`,
`2975`,
`商品總金額 1500+2000 = 3500 元，共 2 件，符合優惠資格（總金額達 3000 元）；使用優惠券，3500×0.85 = 2975 元。`)}
${sample(2,
`3<br/>
100<br/>
100<br/>
100<br/>
是`,
`255`,
`商品總金額 100+100+100 = 300 元，共 3 件，符合優惠資格（件數達 3 件）；使用優惠券，300×0.85 = 255 元。`)}
${sample(3,
`1<br/>
100<br/>
是`,
`100`,
`商品總金額 100 = 100 元，共 1 件，總金額未達 3000 元且件數未達 3 件，不符合優惠資格，實收 100 元。`)}
${sample(4,
`1<br/>
2000<br/>
否`,
`2000`,
`商品總金額 2000 = 2000 元，共 1 件，總金額未達 3000 元且件數未達 3 件，不符合優惠資格；選擇不使用優惠券，實收 2000 元。`,
`{"data": ["2;1500;2000;是;2975", "3;100;100;100;是;255", "1;100;是;100", "1;2000;否;2000"]}`)}
'
 onclick='${ONCLICK}'>59
</button> ${answerButtons('多筆消費折扣計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>多筆消費折扣計算</td>
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
${qHeader("60", `學習達標異常統計`, `國中基礎應用`)}
${desc(`
背單字挑戰規則：連續 5 天，若每天背誦數量都超過 50 個（不含 50 個），或是 5 天的總數超過 300 個（不含 300 個），只要符合其中一個條件，就視為「達標」（輸出 YES）；否則為「待加強」（輸出 NO）。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 5 個非負整數，分別代表這 5 天每天背誦的單字數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出字串「YES」（達標）或「NO」（待加強）。
`)}
${sample(1,
`51<br/>
51<br/>
51<br/>
51<br/>
51`,
`YES`,
`5 天分別為 51、51、51、51、51，每天都超過 50 個；總數 255 個，未超過 300 個。<br/>符合其中一個條件，輸出「YES」。`)}
${sample(2,
`10<br/>
10<br/>
10<br/>
10<br/>
310`,
`YES`,
`5 天分別為 10、10、10、10、310，不是每天都超過 50 個；總數 350 個，超過 300 個。<br/>符合其中一個條件，輸出「YES」。`)}
${sample(3,
`50<br/>
50<br/>
50<br/>
50<br/>
50`,
`NO`,
`5 天分別為 50、50、50、50、50，不是每天都超過 50 個；總數 250 個，未超過 300 個。<br/>兩個條件都不符合，輸出「NO」。`)}
${sample(4,
`0<br/>
0<br/>
0<br/>
0<br/>
0`,
`NO`,
`5 天分別為 0、0、0、0、0，不是每天都超過 50 個；總數 0 個，未超過 300 個。<br/>兩個條件都不符合，輸出「NO」。`,
`{"data": ["51;51;51;51;51;YES", "10;10;10;10;310;YES", "50;50;50;50;50;NO", "0;0;0;0;0;NO"]}`)}
'
 onclick='${ONCLICK}'>60
</button> ${answerButtons('學習達標異常統計')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>學習達標異常統計</td>
</tr>
`;

// ---------------- 第 61 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("61", `電費計算`, `國中基礎應用`)}
${desc(`
模擬台電累進電費計算（不分季節）：用電度數在 120 度（含）以下的部分，每度 2.1 元；超過 120 度至 330 度（含）的部分，每度 3.0 元。本題保證用電度數不超過 330 度。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個非負整數（0~330），代表本月用電度數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表本月應繳電費（四捨五入到整數元）。
`)}
${sample(1,
`0`,
`0`,
`120 度以內：0×2.1 = 0 元。<br/>總電費 0 元。`)}
${sample(2,
`120`,
`252`,
`120 度以內：120×2.1 = 252 元。<br/>總電費 252 元。`)}
${sample(3,
`121`,
`255`,
`120 度以內：120×2.1 = 252 元；超過 120 度的 1 度：1×3.0 = 3 元。<br/>總電費 255 元。`)}
${sample(4,
`200`,
`492`,
`120 度以內：120×2.1 = 252 元；超過 120 度的 80 度：80×3.0 = 240 元。<br/>總電費 492 元。`)}
${sample(5,
`330`,
`882`,
`120 度以內：120×2.1 = 252 元；超過 120 度的 210 度：210×3.0 = 630 元。<br/>總電費 882 元。`,
`{"data": ["0;0", "120;252", "121;255", "200;492", "330;882"]}`)}
'
 onclick='${ONCLICK}'>61
</button> ${answerButtons('電費計算')}
</td>
<td ${LIST_TD(false)}>國中基礎應用</td>
<td ${LIST_TD(false)}>電費計算</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
