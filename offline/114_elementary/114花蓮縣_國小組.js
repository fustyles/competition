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
// 欄位樣式：btn = 序號按鈕欄（固定寬度、不換行），first = 最左欄（不加左框線）
const LIST_TH = (btn, first) => `style="${CELL} background: #eef1f7; color: #3a4a6b; font-weight: bold; ${btn ? 'width: 190px !important; min-width: 190px !important; white-space: nowrap; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : ''} ${first ? '' : 'border-left: 1px solid #dde2ec;'}"`;
const LIST_TD = (btn, first) => `style="${CELL} border-top: 1px solid #e5e8ef; ${btn ? 'width: 190px !important; min-width: 190px !important; white-space: nowrap; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : ''} ${first ? '' : 'border-left: 1px solid #e5e8ef;'}"`;
const ONCLICK = `document.getElementById("javascript_content").style.display = "block";document.getElementById("question_input").innerHTML = this.getAttribute("data-q");document.getElementById("question_input").scrollTop = 0;window.toggleImportQuestionForm(false);var iframe = document.getElementById("iframe_output");iframe.contentWindow.document.open();iframe.contentWindow.document.write("");iframe.contentWindow.document.close();iframe.focus();loadExam();`;

// =====================================================
//  參考答案按鈕（Blockly / Scratch）
//  網頁在 網站主目錄/offline/index.html，答案在 網站主目錄/exam/answer/
//  檔案路徑：../exam/answer/{ANSWER_GROUP}/{題目名稱}_Blockly.xml、_Scratch.xml
// =====================================================
const ANSWER_DIR   = '../exam/answer/';   // 優先查詢的路徑
const ANSWER_DIR2  = 'exam/answer/';      // 上面找不到時，改查這個路徑
const ANSWER_GROUP = '114花蓮縣國小組';   // exam/answer/ 底下的資料夾名稱
const ICON_BLOCKLY = 'data:image/png;base64,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';
const ICON_SCRATCH = 'data:image/png;base64,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';
const ANSWER_BTN_STYLE = 'width:40px !important; height:40px !important; padding:4px !important; margin:2px !important; display:inline-block !important; float:none !important; position:static !important; left:auto !important; right:auto !important; transform:none !important; box-sizing:border-box !important; vertical-align:middle; cursor:pointer;';
const ANSWER_IMG_STYLE = 'width:100%; height:100%; object-fit:contain; display:block; pointer-events:none;';
const answerMsg = (key, def) => (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) || def;
// 產生兩個路徑，用 | 分隔；showAnswer() 會依序嘗試，前一個找不到才試下一個
const answerPath = (name, platform, group) => [ANSWER_DIR, ANSWER_DIR2].map(dir => dir + encodeURIComponent(group) + '/' + encodeURIComponent(name + '_' + platform + '.xml')).join('|');
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
<td ${LIST_TH(false, true)}>名稱</td>
<td ${LIST_TH(false, false)}>分類</td>
<td ${LIST_TH(true, false)}>序號</td>
</tr>
`;



// ---------------- 第 1 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>零用錢是否足夠</td>
<td ${LIST_TD(false, false)}>114花蓮縣國小組</td>
<td ${LIST_TD(true, false)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("1", `零用錢是否足夠`, `114花蓮縣國小組`)}
${desc(`
你有一個錢包，裡面裝著固定的零用錢。這幾天你想買一些東西，請你幫忙算算看，你的錢夠不夠買這些東西？<br/>
系統會提供：一個整數，代表你的零用錢總額；一份固定包含 4 筆資料的花費清單，依序代表第 1 天到第 4 天的花費金額。<br/>
請從第 1 天開始，依序扣除每日花費金額，並依下列規則輸出結果：<br/>
若在某一天扣除花費後，剩餘金額小於 0，表示零用錢已不足，請立即輸出「第X天不夠用」(X 為發生不足的天數，例如：第4天不夠用)。<br/>
若 4 天的花費皆能成功扣除完成，請輸出「錢剛好或有剩」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入零用錢總額；第二行輸入 4 個整數，依序為第 1 天到第 4 天的花費。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出「第X天不夠用」或「錢剛好或有剩」。
`)}
${sample(1,
`100<br/>
20 30 40 20`,
`第4天不夠用`,
`第一天有 100 元，花了 20 元剩 80 元。<br/>
第二天花了 30 元剩 50 元。<br/>
第三天花了 40 元剩 10 元，到了第四天不夠用了。`)}
${sample(2,
`100<br/>
10 20 30 40`,
`錢剛好或有剩`,
`4 天共花 100 元，剛好用完。`,
`{"data": ["100;20;30;40;20;第4天不夠用", "100;10;20;30;40;錢剛好或有剩"]}`)}
'
 onclick='${ONCLICK}'>1
</button> ${answerButtons('零用錢是否足夠')}
</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>機器人戰鬥力比對</td>
<td ${LIST_TD(false, false)}>114花蓮縣國小組</td>
<td ${LIST_TD(true, false)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("2", `機器人戰鬥力比對`, `114花蓮縣國小組`)}
${desc(`
一年一度的機器人武鬥大會開始了！場上有 N 隻機器人參賽，每隻機器人都有一個「戰鬥力數值」。大會規定採取「積分循環賽」制：每一隻機器人都要跟場上「所有其他機器人」進行一對一的較量。如果你的戰鬥力比對手高，你就可以獲得 1 分積分；如果比對手低或平手，則得 0 分。<br/>
計算規則：<br/>
對於清單中的每一個機器人，都要去跟清單中其他所有的機器人比對數值。<br/>
若 (自己數值) > (對手數值)，則積分 + 1。<br/>
若 (自己數值) ≤ (對手數值)，則積分不變。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個數字 N，代表機器人的數量；第二行依序輸入 N 個整數，代表每一隻機器人的戰鬥力。<br/>
<span ${LBL_OUT}>輸出說明</span>依照機器人的輸入順序，依序輸出這 N 隻機器人的總積分。
`)}
${sample(1,
`3<br/>
10 50 30`,
`0 2 1`,
`第 1 隻 (10)：比輸 50、比輸 30 → 0 分<br/>
第 2 隻 (50)：贏過 10、贏過 30 → 2 分<br/>
第 3 隻 (30)：贏過 10、比輸 50 → 1 分`)}
${sample(2,
`3<br/>
10 20 30`,
`0 1 2`,
`第 1 隻 (10)：比輸 20、比輸 30 → 0 分<br/>
第 2 隻 (20)：贏過 10、比輸 30 → 1 分<br/>
第 3 隻 (30)：贏過 10、贏過 20 → 2 分`,
`{"data": ["3;10;50;30;0;2;1", "3;10;20;30;0;1;2"]}`)}
'
 onclick='${ONCLICK}'>2
</button> ${answerButtons('機器人戰鬥力比對')}
</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>字串內的秘密數字</td>
<td ${LIST_TD(false, false)}>114花蓮縣國小組</td>
<td ${LIST_TD(true, false)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("3", `字串內的秘密數字`, `114花蓮縣國小組`)}
${desc(`
「緊急任務！我們攔截到一串加密訊息！」壞人在傳遞的文字訊息中藏了許多數字，情報總部發現，只要將訊息中「所有的數字加總起來」，就能得到解鎖金庫的密碼。例如在 Key5Word2 中，藏著 5 和 2，密碼就是 7。請你寫一個程式，幫忙計算出這個神祕的總和數字！<br/>
規則：<br/>
1. 請檢查字串中的每一個字元。<br/>
2. 如果該字元是數字 (0 ~ 9)，請將它加入總和。<br/>
3. 如果該字元是英文或符號，請忽略它。<br/>
4. 注意：請將每個數字視為「個位數」來相加 (例如 12 代表 1 加 2，而不是十二)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個包含英文與數字的字串。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所有數字的總和。
`)}
${sample(1,
`A1B2C3`,
`6`,
`找到 1、2、3，總和 6。`)}
${sample(2,
`Key5Word2`,
`7`,
`找到 5、2，總和 7。`,
`{"data": ["A1B2C3;6", "Key5Word2;7"]}`)}
'
 onclick='${ONCLICK}'>3
</button> ${answerButtons('字串內的秘密數字')}
</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>最佳派對地點</td>
<td ${LIST_TD(false, false)}>114花蓮縣國小組</td>
<td ${LIST_TD(true, false)}>
<button
 class='test-button'
 style='${BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("4", `最佳派對地點`, `114花蓮縣國小組`)}
${desc(`
有 N 個好朋友住在同一條筆直的大馬路上，每個人的家都有一個座標數字。他們決定舉辦一場派對，但是為了公平，大家約定：<br/>
1. 必須選在其中一個人的家裡舉辦。<br/>
2. 所有人從自己家走到派對地點的「距離總和」必須是最小的。<br/>
請你寫一個程式，找出最佳的舉辦地點，並算出這個最小的總距離是多少。若有多個地點距離總和一樣小，輸出座標較小的那一個。<br/>
提示：距離不會是負的。如果你在 2 號，要去 10 號，距離是 8 步；如果你在 10 號，要去 2 號，距離也是 8 步。可以使用「絕對值」積木，例如 (2 - 10) 的絕對值會變成 8。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個整數 N (朋友的數量)；第二行依序輸入 N 個整數座標。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出最佳地點的座標與最小的距離總和。
`)}
${sample(1,
`3<br/>
2 10 5`,
`5 8`,
`若辦在 2：距離和為 11；若辦在 10：距離和為 13；若辦在 5：距離和為 8 (最小)。`)}
${sample(2,
`3<br/>
1 9 3`,
`3 8`,
`若辦在 1：距離和為 10；若辦在 9：距離和為 14；若辦在 3：距離和為 8 (最小)。`,
`{"data": ["3;2;10;5;5;8", "3;1;9;3;3;8"]}`)}
'
 onclick='${ONCLICK}'>4
</button> ${answerButtons('最佳派對地點')}
</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
