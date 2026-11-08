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
const ANSWER_GROUP = '114南投縣國中組';   // exam/answer/ 底下的資料夾名稱
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
${qHeader("1", `智慧溫室的自動監控`, `114南投縣國中組`)}
${desc(`
隨著農業科技的發展，小明在學校的生物實驗室中參與了一項「智慧溫室」計畫。這個溫室利用高精度的感測器，每隔一小時會自動記錄一次溫室內的「溫度」與「濕度」。為了讓農作物在最適合的環境下生長，同時落實環境永續與節能減碳的目標，溫室內的自動噴霧灑水系統設定了一套嚴格的啟動規範。<br/>
系統規則定義如下：假設在連續的 N 小時內，第 i 小時測得的溫度為 T 度，濕度為 H%。只有當該小時同時滿足「溫度 > 30 度」且「濕度 < 50%」這兩個條件時，噴霧系統才會自動開啟運作 1 次；若其中任一條件不滿足，系統將保持待機狀態以節省電力與水資源。<br/>
請你編寫程式，根據小明提供的 N 小時觀測記錄，計算這段時間內噴霧系統總共被觸發了幾次。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表記錄的總小時數。<br/>
第二行：N 個整數，代表每小時測得的溫度數據。<br/>
第三行：N 個整數，代表每小時測得的濕度數據。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表在這 N 小時內系統開啟的總次數。
`)}
${sample(1,
`3<br/>
32 28 35<br/>
45 60 40`,
`2`,
`第 1 筆 (32, 45) 符合；第 2 筆溫度不足；第 3 筆 (35, 40) 符合，輸出 2。`)}
${sample(2,
`2<br/>
31 32<br/>
40 30`,
`2`,
`2 筆均符合溫度大於 30、濕度小於 50，輸出 2。`)}
${sample(3,
`1<br/>
35<br/>
40`,
`1`,
``)}
${sample(4,
`5<br/>
31 32 33 34 35<br/>
49 48 47 46 45`,
`5`,
``)}
${sample(5,
`4<br/>
25 35 25 35<br/>
60 40 60 40`,
`2`,
``)}
${sample(6,
`6<br/>
30 31 29 40 31 35<br/>
50 49 40 50 51 30`,
`2`,
``)}
${sample(7,
`10<br/>
30 31 29 40 31 30 31 29 40 32<br/>
50 49 40 50 51 50 41 40 50 48`,
`3`,
``,
`{"data": ["3;32;28;35;45;60;40;2", "2;31;32;40;30;2", "1;35;40;1", "5;31;32;33;34;35;49;48;47;46;45;5", "4;25;35;25;35;60;40;60;40;2", "6;30;31;29;40;31;35;50;49;40;50;51;30;2", "10;30;31;29;40;31;30;31;29;40;32;50;49;40;50;51;50;41;40;50;48;3"]}`)}
'
 onclick='${ONCLICK}'>1
</button> ${answerButtons('智慧溫室的自動監控')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>智慧溫室的自動監控</td>
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
${qHeader("2", `熱門影片的流量密碼`, `114南投縣國中組`)}
${desc(`
小雅是一名熱愛經營頻道的國中生 YouTuber，她非常在意自己影片的流量趨勢。她從後台導出了過去 N 天的每日觀看次數紀錄。為了找出最有效的發片節奏與演算法推播規律，她想要找出一段長度剛好為「連續 K 天」的黃金時期。在這連續的 K 天中，所有影片觀看次數的加總必須是所有可能區段中最高的。<br/>
例如 N=5，5 天輸入資料為 10 20 30 40 50，K=3，表示要計算連續三天最大值，可能連續 3 天的區間有：(10+20+30=60)、(20+30+40=90)、(30+40+50=120)，三個區間最大為 120。因此輸出 120。<br/>
請你寫一個程式，幫小雅快速地算出這段連續 K 天的最大觀看次數總和。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：輸入整數 N，代表總記錄天數。<br/>
第二行：輸入整數 K，代表欲分析的連續天數。<br/>
第三行：輸入 N 個整數，代表每天的影片觀看次數紀錄。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所有連續 K 天區間中最大的觀看總和。
`)}
${sample(1,
`8<br/>
3<br/>
1 5 2 10 8 3 7 2`,
`21`,
`連續 3 天：(10+8+3) = 21 為全域最高。`)}
${sample(2,
`5<br/>
2<br/>
10 20 30 20 10`,
`50`,
`連續 2 天：(20+30) = 50 為最高。`)}
${sample(3,
`3<br/>
3<br/>
100 200 300`,
`600`,
``)}
${sample(4,
`5<br/>
1<br/>
10 50 20 90 30`,
`90`,
``)}
${sample(5,
`6<br/>
2<br/>
1 2 9 8 6 1`,
`17`,
``)}
${sample(6,
`10<br/>
9<br/>
1 1 5 5 1 1 8 8 1 1`,
`31`,
``)}
${sample(7,
`10<br/>
4<br/>
1 1 5 5 1 1 8 8 1 1`,
`18`,
``,
`{"data": ["8;3;1;5;2;10;8;3;7;2;21", "5;2;10;20;30;20;10;50", "3;3;100;200;300;600", "5;1;10;50;20;90;30;90", "6;2;1;2;9;8;6;1;17", "10;9;1;1;5;5;1;1;8;8;1;1;31", "10;4;1;1;5;5;1;1;8;8;1;1;18"]}`)}
'
 onclick='${ONCLICK}'>2
</button> ${answerButtons('熱門影片的流量密碼')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>熱門影片的流量密碼</td>
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
${qHeader("3", `神秘的煉金術配對`, `114南投縣國中組`)}
${desc(`
在一個充滿神祕氣息的古代實驗室中，煉金術士小特發現了 N 瓶裝有不同成分的藥水。幸運的是，這些藥水已經依照重量「由輕到重」整齊排列好了。根據實驗室留下的羊皮卷記載，要開啟通往地下密室的機關，必須從這 N 瓶中選出「剛好兩瓶」藥水，這兩瓶藥水的重量相加必須恰好等於目標值 T。<br/>
由於機關可能不只一種配對方式，規則特別註明：如果有多組兩兩配對的重量和都等於目標值 T，為了確保實驗的穩定性，必須優先選擇「兩瓶藥水重量差最小」的那一組。例如：若目標值 T 為 10，配重 (1,9)、(4,6) 皆符合目標值，(1,9) 兩數差為 8、(4,6) 兩數差為 2，應選擇兩瓶重量差較小的 (4,6)。<br/>
請你寫一個程式，找出這組最優配對。如果搜尋完整個架子都找不到任何兩瓶藥水相加等於目標值 T，請輸出 -1。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表實驗室中的藥水總瓶數。<br/>
第二行：N 個已排序的整數，代表各瓶藥水的重量。<br/>
第三行：一個整數 T，代表機關觸發所需的目標值總重量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出兩個整數 (由小到大排列)；若無解則輸出 -1。
`)}
${sample(1,
`6<br/>
1 3 4 6 8 10<br/>
10`,
`4 6`,
`目標值 10，唯一符合目標值 4+6 = 10。`)}
${sample(2,
`5<br/>
1 3 5 7 9<br/>
10`,
`3 7`,
`(1,9)、(3,7) 都符合目標值，(3,7) 兩數相差較小，輸出 3 7。`)}
${sample(3,
`5<br/>
1 3 5 7 9<br/>
7`,
`-1`,
`全部配對都不符合，輸出 -1。`)}
${sample(4,
`3<br/>
1 2 3<br/>
5`,
`2 3`,
``)}
${sample(5,
`5<br/>
1 3 5 7 9<br/>
20`,
`-1`,
``)}
${sample(6,
`6<br/>
1 3 4 6 8 10<br/>
14`,
`6 8`,
``)}
${sample(7,
`8<br/>
1 2 5 7 9 11 15 20<br/>
16`,
`7 9`,
``)}
${sample(8,
`8<br/>
1 2 3 4 5 6 100 200<br/>
7`,
`3 4`,
``,
`{"data": ["6;1;3;4;6;8;10;10;4;6", "5;1;3;5;7;9;10;3;7", "5;1;3;5;7;9;7;-1", "3;1;2;3;5;2;3", "5;1;3;5;7;9;20;-1", "6;1;3;4;6;8;10;14;6;8", "8;1;2;5;7;9;11;15;20;16;7;9", "8;1;2;3;4;5;6;100;200;7;3;4"]}`)}
'
 onclick='${ONCLICK}'>3
</button> ${answerButtons('神秘的煉金術配對')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>神秘的煉金術配對</td>
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
${qHeader("4", `量子訊號的接力傳輸`, `114南投縣國中組`)}
${desc(`
為了在廣大的星際基地之間建立通訊，工程師架設了一套「單向接力」的傳輸系統。這套系統共有 N 個訊號站，編號為 1 到 N 號。<br/>
其中有一個最重要的「主伺服器」，所有的資料最終都必須傳送到這裡。為了節省電力，每個訊號站 (除了主伺服器外) 都只會設定一個固定的「上游接收站」。當它收到資料時，就會直接丟給它的上游，就像大隊接力一樣，一站傳一站，直到資料抵達主伺服器為止。<br/>
請你寫一個程式，找出整個系統中最高的轉傳次數。<br/>
運算規則範例：輸入 5 個站點，上游分別為 0 1 2 2 3：<br/>
1 號站上游為 0，表示 1 號站為主機，轉傳次數為 0。<br/>
2 號站傳遞路徑為 2→1，轉傳次數為 1。<br/>
3 號站傳遞路徑為 3→2→1，轉傳次數為 2。<br/>
4 號站傳遞路徑為 4→2→1，轉傳次數為 2。<br/>
5 號站傳遞路徑為 5→3→2→1，轉傳次數為 3。<br/>
最高轉傳次數為 3。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表訊號站總數。<br/>
第二行：N 個整數，代表第 1 站至第 N 站每個站點的上游接收站編號 (若數值為 0，代表該站點就是主伺服器)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表整個系統中最高的轉傳次數。
`)}
${sample(1,
`5<br/>
0 1 2 2 3`,
`3`,
`5→3→2→1，5 號站出發轉傳次數為 3 最多。`)}
${sample(2,
`3<br/>
2 3 0`,
`2`,
`1→2→3，1 號站出發轉傳次數為 2 最多。`)}
${sample(3,
`6<br/>
2 6 6 0 1 4`,
`4`,
`5→1→2→6→4，5 號站出發轉傳 4 次最多。`)}
${sample(4,
`3<br/>
0 1 1`,
`1`,
``)}
${sample(5,
`5<br/>
2 3 4 5 0`,
`4`,
``)}
${sample(6,
`10<br/>
2 3 4 0 1 2 3 4 5 6`,
`5`,
``)}
${sample(7,
`8<br/>
0 1 2 3 2 5 6 7`,
`5`,
``)}
${sample(8,
`8<br/>
0 1 2 0 4 5 2 3`,
`3`,
``,
`{"data": ["5;0;1;2;2;3;3", "3;2;3;0;2", "6;2;6;6;0;1;4;4", "3;0;1;1;1", "5;2;3;4;5;0;4", "10;2;3;4;0;1;2;3;4;5;6;5", "8;0;1;2;3;2;5;6;7;5", "8;0;1;2;0;4;5;2;3;3"]}`)}
'
 onclick='${ONCLICK}'>4
</button> ${answerButtons('量子訊號的接力傳輸')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>量子訊號的接力傳輸</td>
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
${qHeader("5", `古文明的能量融合`, `114南投縣國中組`)}
${desc(`
考古學家在遺跡中發現了兩塊圓形的能量石板，上面刻著古老的數字代碼。若想啟動遺跡的核心能源，必須將這兩股能量數值進行「大數加法」融合，所得的總和就是啟動核心的密碼。請你編寫程式，根據考古學家輸入的兩塊石板數字，計算出融合後的最終能量數值。<br/>
注意：Scratch 與 Blockly 積木運算大於 16 位的數字時已無法精確運算，因此輸入及輸出的數字字串最後方會強制加上一個英文字母 a (例如 12345a)，請將其視為字串處理，讀取時請記得忽略最後一個字元，輸出時請用字串結合的方式在最後面結合一個英文字母 a。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個數字字串 (含後置 a)，代表第一塊石板上的數值 A。<br/>
第二行：一個數字字串 (含後置 a)，代表第二塊石板上的數值 B。<br/>
(註：字串長度介於 1 到 100 之間)<br/>
<span ${LBL_OUT}>輸出說明</span>輸出計算結果字串 (含後置 a)。
`)}
${sample(1,
`192a<br/>
81a`,
`273a`,
`輸入忽略後置 a，192+81 = 273，輸出 273a。`)}
${sample(2,
`999999999999000000000001a<br/>
999999999999a`,
`1000000000000000000000000a`,
`999999999999000000000001 和 999999999999 相加為 1000000000000000000000000，輸出時加上後置 a。`)}
${sample(3,
`11a<br/>
22a`,
`33a`,
``)}
${sample(4,
`14a<br/>
61a`,
`75a`,
``)}
${sample(5,
`333333333333111111111111a<br/>
444444444444222222222222a`,
`777777777777333333333333a`,
``)}
${sample(6,
`111987654321111987654321a<br/>
999a`,
`111987654321111987655320a`,
``)}
${sample(7,
`777777888888999999999999a<br/>
222222222222999999999999a`,
`1000000111111999999999998a`,
``,
`{"data": ["192a;81a;273a", "999999999999000000000001a;999999999999a;1000000000000000000000000a", "11a;22a;33a", "14a;61a;75a", "333333333333111111111111a;444444444444222222222222a;777777777777333333333333a", "111987654321111987654321a;999a;111987654321111987655320a", "777777888888999999999999a;222222222222999999999999a;1000000111111999999999998a"]}`)}
'
 onclick='${ONCLICK}'>5
</button> ${answerButtons('古文明的能量融合')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>古文明的能量融合</td>
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
${qHeader("6", `星際物資運補任務-神祕的配重`, `114南投縣國中組`)}
${desc(`
人類已經成功在火星的各個極地與赤道區建立了殖民基地。「星際物流中心」的運輸船上設有一道特殊的「配重艙門」。這道門鎖的機制非常嚴格：它不會自動開啟，除非你放入兩件貨物總重量「剛好等於」系統指定的目標重量 W。<br/>
倉庫中目前存放著 N 件貨物，每一件貨物的重量分別為 W1, W2, …, WN。<br/>
請撰寫程式判斷是否能從倉庫中挑選出兩件不同的貨物，使重量總和 Wi+Wj 恰好等於目標 W，如果可以找到該組合就輸出 YES，否則輸出 NO。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表貨物數量。<br/>
第二行：N 個整數，代表各件貨物重量 Wi。<br/>
第三行：一個整數 W，代表目標配重 (W > 0)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 YES 或 NO。
`)}
${sample(1,
`3<br/>
10 20 30<br/>
50`,
`YES`,
`挑選 20 與 30 兩件貨物，總重 50。`)}
${sample(2,
`4<br/>
1 5 2 10<br/>
4`,
`NO`,
`無法組成剛好為 4 的重量。`)}
${sample(3,
`5<br/>
1 7 5 3 9<br/>
12`,
`YES`,
`可以挑選 3、9 或 5、7。`)}
${sample(4,
`3<br/>
5 10 15<br/>
20`,
`YES`,
``)}
${sample(5,
`4<br/>
11 11 11 12<br/>
10`,
`NO`,
``)}
${sample(6,
`5<br/>
10 10 10 10 10<br/>
25`,
`NO`,
``)}
${sample(7,
`12<br/>
1 2 3 4 5 6 7 8 9 10 11 12<br/>
23`,
`YES`,
``)}
${sample(8,
`12<br/>
1 2 3 4 5 6 7 8 9 10 11 12<br/>
24`,
`NO`,
``,
`{"data": ["3;10;20;30;50;YES", "4;1;5;2;10;4;NO", "5;1;7;5;3;9;12;YES", "3;5;10;15;20;YES", "4;11;11;11;12;10;NO", "5;10;10;10;10;10;25;NO", "12;1;2;3;4;5;6;7;8;9;10;11;12;23;YES", "12;1;2;3;4;5;6;7;8;9;10;11;12;24;NO"]}`)}
'
 onclick='${ONCLICK}'>6
</button> ${answerButtons('星際物資運補任務-神祕的配重')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>星際物資運補任務-神祕的配重</td>
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
${qHeader("7", `星際物資運補任務-疏散飛船的乘客名單`, `114南投縣國中組`)}
${desc(`
星際艦隊需要緊急撤離一個太空站的人員。目前停機坪上有 N 位乘客等待撤離，每個人的體重分別為 W1, W2, …, WN。<br/>
撤離用的逃生小艇非常精密，每艘小艇有兩項嚴格限制：<br/>
1. 載重上限：小艇上所有人的體重總和不能超過 Limit。<br/>
2. 人數上限：每艘小艇最多只能搭載 2 人 (因為座位只有兩個)。<br/>
為了節省能源與時間，指揮官希望使用「最少」數量的逃生小艇將所有人安全撤離。請你設計一個程式，計算出最少需要派出幾艘小艇？<br/>
(提示：為了讓小艇數量最少，我們應該盡可能讓兩人共乘一艘船。你可以試著先將大家的體重排序，讓最重的人嘗試與最輕的人搭配看看。) 例如：假設載重上限 Limit = 10，有 4 人體重為 1, 2, 8, 9。若隨意配對讓輕的先走，(1)、(2) 同船，剩下的 (8) 和 (9) 因為太重無法同船，結果需要 3 艘船。但若採用「最重配最輕」的策略，讓 (9) 帶上 (1) 變成一艘，(8) 帶上 (2) 變成一艘，這樣只需要 2 艘船就能完成任務。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表乘客總數。<br/>
第二行：N 個整數，代表每位乘客的體重 Wi (由小到大排列)。<br/>
第三行：一個整數 Limit，代表小艇載重上限。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所需最少數量的逃生小艇。
`)}
${sample(1,
`4<br/>
1 2 2 3<br/>
3`,
`3`,
`每艘限重 3。配對方式：(1, 2) 一艘，剩下的 (2) 一艘，(3) 一艘，共 3 艘。注意：(2, 2) 會超重變成 4，所以不能同船。`)}
${sample(2,
`4<br/>
1 2 8 9<br/>
10`,
`2`,
`最佳策略是讓最重的配最輕的：(9, 1) 一艘，(8, 2) 一艘，剛好 2 艘解決。`)}
${sample(3,
`5<br/>
50 50 50 50 50<br/>
100`,
`3`,
``)}
${sample(4,
`6<br/>
4 5 6 7 8 9<br/>
10`,
`5`,
``)}
${sample(5,
`6<br/>
1 2 3 7 8 9<br/>
10`,
`3`,
``)}
${sample(6,
`8<br/>
1 2 5 10 10 15 18 19<br/>
20`,
`4`,
``)}
${sample(7,
`15<br/>
55 60 65 65 66 66 67 67 70 70 75 80 85 90 100<br/>
145`,
`8`,
``,
`{"data": ["4;1;2;2;3;3;3", "4;1;2;8;9;10;2", "5;50;50;50;50;50;100;3", "6;4;5;6;7;8;9;10;5", "6;1;2;3;7;8;9;10;3", "8;1;2;5;10;10;15;18;19;20;4", "15;55;60;65;65;66;66;67;67;70;70;75;80;85;90;100;145;8"]}`)}
'
 onclick='${ONCLICK}'>7
</button> ${answerButtons('星際物資運補任務-疏散飛船的乘客名單')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>星際物資運補任務-疏散飛船的乘客名單</td>
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
${qHeader("8", `星際物資運補任務-火星樣本回收`, `114南投縣國中組`)}
${desc(`
火星探測車「好奇二號」在基地的周圍採集了 N 個相異的岩石樣本，並給予編號：編號 1、編號 2…編號 N。每個樣本都有兩個屬性：「研究價值」與「重量」。為了節省運回地球的燃料，指揮中心制定了一套嚴格的回收優先順序規則，請你幫忙將這些樣本重新排列，並列出它們原本的編號。<br/>
排序規則：<br/>
第一優先：依照「研究價值」由大到小排序 (越有價值的排越前面)。<br/>
第二優先：如果兩個樣本的「研究價值」相同，則依照「重量」由小到大排序 (價值一樣時，越輕的越好)。<br/>
不存在研究價值及重量皆相同的相異岩石樣本。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表樣本的數量。<br/>
第二行：N 個整數，代表編號 1、編號 2…編號 N 樣本的研究價值。<br/>
第三行：N 個整數，代表編號 1、編號 2…編號 N 樣本的重量。<br/>
<span ${LBL_OUT}>輸出說明</span>依排序後的順序輸出 N 個樣本編號。
`)}
${sample(1,
`3<br/>
80 100 80<br/>
5 10 2`,
`2 3 1`,
`編號 2 研究價值最高，排在第一位。編號 1 和編號 3 研究價值一樣，但編號 3 重量較輕，排在編號 1 前面。`)}
${sample(2,
`3<br/>
10 50 30<br/>
5 5 5`,
`2 3 1`,
``)}
${sample(3,
`4<br/>
99 99 99 99<br/>
20 5 30 10`,
`2 4 1 3`,
``)}
${sample(4,
`5<br/>
60 80 60 80 20<br/>
10 5 20 8 3`,
`2 4 1 3 5`,
``)}
${sample(5,
`4<br/>
1 2 3 4<br/>
100 100 100 100`,
`4 3 2 1`,
``)}
${sample(6,
`6<br/>
10 50 50 10 100 49<br/>
9 3 2 5 50 2`,
`5 3 2 6 4 1`,
``,
`{"data": ["3;80;100;80;5;10;2;2;3;1", "3;10;50;30;5;5;5;2;3;1", "4;99;99;99;99;20;5;30;10;2;4;1;3", "5;60;80;60;80;20;10;5;20;8;3;2;4;1;3;5", "4;1;2;3;4;100;100;100;100;4;3;2;1", "6;10;50;50;10;100;49;9;3;2;5;50;2;5;3;2;6;4;1"]}`)}
'
 onclick='${ONCLICK}'>8
</button> ${answerButtons('星際物資運補任務-火星樣本回收')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>星際物資運補任務-火星樣本回收</td>
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
${qHeader("9", `星際物資運補任務-防禦塔的能量負載`, `114南投縣國中組`)}
${desc(`
基地外圍有 N 座依序排列的雷射防禦塔，其能量需求分別為 E1, E2, …, EN。現有 M 台發電機需負責供電，配置規則如下：每台發電機必須負責供應「連續區間」的防禦塔 (不可跳號)。所有防禦塔都必須被供電，且每座塔僅由一台發電機負責。請規劃 M 台發電機的負責範圍，使得所有發電機中「負擔最重 (能量總和最大)」的那一台，其數值盡可能小，即求出「各區段和的最大值」的最小值。<br/>
例如：N=3 (能量需求：2, 5, 8)，M=2。<br/>
分法一：第一台負責第 1 座 (能量 2)；第二台負責第 2 ~ 3 座 (能量 13)，最大負荷 13。<br/>
分法二：第一台負責第 1 ~ 2 座 (能量 7)；第二台負責第 3 座 (能量 8)，最大負荷 8。<br/>
分法二的最大負荷較小，故最佳解為 8。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表防禦塔數量。<br/>
第二行：一個整數 M，代表發電機數量。<br/>
第三行：N 個整數，依序代表第 1 座到第 N 座防禦塔的能量需求。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表經過最佳規劃後的「最小化的最大負荷值」。
`)}
${sample(1,
`5<br/>
2<br/>
7 2 5 10 8`,
`18`,
`切分成 (7, 2, 5) 與 (10, 8)，第一台負擔 14，第二台負擔 18，是所有分法中最大負荷最小的結果。`)}
${sample(2,
`4<br/>
4<br/>
1 2 3 4`,
`4`,
`發電機數量剛好跟塔一樣多，每台各負責一座，最大的負荷是 4。`)}
${sample(3,
`6<br/>
3<br/>
1 1 1 5 1 1`,
`5`,
`第一台負責第 1 ~ 3 座 (3)，第二台負責第 4 座 (5)，第三台負責第 5 ~ 6 座 (2)，最大值為 5。`)}
${sample(4,
`5<br/>
1<br/>
10 20 30 40 50`,
`150`,
``)}
${sample(5,
`5<br/>
5<br/>
10 20 30 40 50`,
`50`,
``)}
${sample(6,
`5<br/>
2<br/>
5 1 2 2 3`,
`7`,
``)}
${sample(7,
`8<br/>
3<br/>
1 10 2 9 3 8 4 7`,
`19`,
``)}
${sample(8,
`15<br/>
5<br/>
10 3 5 2 9 11 1 4 8 3 20 21 22 14 13`,
`40`,
``,
`{"data": ["5;2;7;2;5;10;8;18", "4;4;1;2;3;4;4", "6;3;1;1;1;5;1;1;5", "5;1;10;20;30;40;50;150", "5;5;10;20;30;40;50;50", "5;2;5;1;2;2;3;7", "8;3;1;10;2;9;3;8;4;7;19", "15;5;10;3;5;2;9;11;1;4;8;3;20;21;22;14;13;40"]}`)}
'
 onclick='${ONCLICK}'>9
</button> ${answerButtons('星際物資運補任務-防禦塔的能量負載')}
</td>
<td ${LIST_TD(false)}>114南投縣國中組</td>
<td ${LIST_TD(false)}>星際物資運補任務-防禦塔的能量負載</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
