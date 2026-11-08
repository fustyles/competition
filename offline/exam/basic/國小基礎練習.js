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
// 欄位樣式：btn = 按鈕欄（題目 / Blockly / Scratch 三顆圖示）（固定寬度、不換行），first = 最左欄（不加左框線）
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
const ANSWER_GROUP = '國小基礎練習';   // exam/answer/ 底下的資料夾名稱
const ICON_IMPORT  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAvCAYAAACc5fiSAAACuUlEQVR42u3Zb0gTYRwH8O/dhGyjV1lbTjM7XTQ5rZDQykGpkRFFwSgGaUQYkYhhQpgvgnyZERVGvYhcmIFaiIQpDvRQZw3BLf/UZOZaWUJv1LWsF7vetDDZblue3tO436txz3PHhx+/53fP7gHkkCO2gwo1kFls2A5AI6Htp8PM9UcMzyw25AK4BWA3AYmdB3DHYeauLh1QLEFnJyZoXs37vFpCKmINgDx1Vop6xu5+sXiAXjLRNP31C3H1rIpXXsgsNuQLwTNIXIjfFnwAsHfxtTihGxpq7mJHOisJ9n5bA+qfPQw5Tv+v7VCGr3bEifUgbtgK16f3gnPysw3YrE4iCz7udgouJgDYqWNFg8s1LsNleCy1Qz/P4+VgN2of3QzsIyKKktqyP79ZRo/r564gNTFl9TJOUxQO5RSguuQSVPHKqO9nGT2una36Z/SySoWmKBzOLYwaH0CnJW2VrsZpikJRTj4umy5GhGcZPapPVywbLcriVNAKHMsrCosPoPWp28jpKuHwYqNFbYcBfLmx9C+8LplBlalMVLSom6wA3njgKADgdvMDaDdsQs2ZSmSlZZC7rQ2G1yUzK4JeEXgAf6rguPzKjzrjN5rqsW6tKuS4Ml6JipPnkbwxuu9H3bZetPa0C84J931HEP7GNRYWYSo8ERXcz/OY+DiJgRGbtKUyOvUOfp6PeL7X58WEZ1L6Gm/v64T784eIs83ZrbAMcdLDnR4XHnc2Y9Y7F3bu2yknnnY/J6cdtva0w7fgQ7mxFIkJmqCZfj02hLqmejg9LrL6eMegBQMjNhzZcxD7d+0Do92C7z8WMD7lRFtfB7hhK7kvoFnvHBq7WtDY1SL/54x5+CiJyN/b5H4h+JNgXQHSn0jcc5g5S8jDqxm7e1qZvr4LAAtAS8ipW53DzFUiVs455Vjt+AXUONVRZTT++QAAAABJRU5ErkJggg==';
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
<td ${LIST_TH(false, true)}>序號</td>
<td ${LIST_TH(false, false)}>名稱</td>
<td ${LIST_TH(false, false)}>分類</td>
<td ${LIST_TH(true, false)}></td>
</tr>
`;



// ---------------- 第 1 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>1</td>
<td ${LIST_TD(false, false)}>【一年級】幾個十和幾個一</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("1", `【一年級】幾個十和幾個一`, `國小基礎練習`)}
${desc(`
數學課上，老師用花片教大家認識「十」和「一」：每 10 個一數一數就可以換成 1 條「十」，剩下不滿 10 個的就是「一」。例如 37 個花片可以換成 3 條「十」和 7 個「一」。<br/>
請寫一個程式，輸入花片的數量，算出可以換成幾個十和幾個一。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表花片的數量 (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表幾個十、幾個一。
`)}
${sample(1,
`37`,
`3 7`,
`37 個花片每 10 個換 1 條十：37 ÷ 10 = 3 餘 7，是 3 個十和 7 個一。`)}
${sample(2,
`100`,
`10 0`,
`100 個花片每 10 個換 1 條十：100 ÷ 10 = 10 餘 0，是 10 個十和 0 個一。`)}
${sample(3,
`8`,
`0 8`,
`8 個花片每 10 個換 1 條十：8 ÷ 10 = 0 餘 8，是 0 個十和 8 個一。`)}
${sample(4,
`60`,
`6 0`,
`60 個花片每 10 個換 1 條十：60 ÷ 10 = 6 餘 0，是 6 個十和 0 個一。`)}
${sample(5,
`99`,
`9 9`,
`99 個花片每 10 個換 1 條十：99 ÷ 10 = 9 餘 9，是 9 個十和 9 個一。`,
`{"data": ["37;3;7", "100;10;0", "8;0;8", "60;6;0", "99;9;9"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】幾個十和幾個一')}</span>
</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>2</td>
<td ${LIST_TD(false, false)}>【一年級】誰比較多</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("2", `【一年級】誰比較多`, `國小基礎練習`)}
${desc(`
小華和小美在比賽撿落葉，老師請大家比一比誰撿得比較多，並算出多了幾片。<br/>
請寫一個程式，輸入兩人撿到的落葉數量，輸出撿得比較多的人，以及多了幾片；如果一樣多，輸出「一樣多」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數，分別代表小華、小美撿到的落葉數量 (0 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>若小華比較多，輸出「小華」與多幾片；若小美比較多，輸出「小美」與多幾片；若一樣多，只輸出「一樣多」。
`)}
${sample(1,
`12<br/>
9`,
`小華 3`,
`小華撿 12 片、小美撿 9 片，小華多 12 - 9 = 3 片。`)}
${sample(2,
`15<br/>
15`,
`一樣多`,
`兩人都撿 15 片，一樣多。`)}
${sample(3,
`3<br/>
20`,
`小美 17`,
`小華撿 3 片、小美撿 20 片，小美多 20 - 3 = 17 片。`)}
${sample(4,
`0<br/>
1`,
`小美 1`,
`小華撿 0 片、小美撿 1 片，小美多 1 - 0 = 1 片。`)}
${sample(5,
`100<br/>
0`,
`小華 100`,
`小華撿 100 片、小美撿 0 片，小華多 100 - 0 = 100 片。`,
`{"data": ["12;9;小華;3", "15;15;一樣多", "3;20;小美;17", "0;1;小美;1", "100;0;小華;100"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】誰比較多')}</span>
</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>3</td>
<td ${LIST_TD(false, false)}>【一年級】撲滿裡的錢</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("3", `【一年級】撲滿裡的錢`, `國小基礎練習`)}
${desc(`
小明打開撲滿，裡面有 10 元、5 元、1 元三種硬幣。請幫小明數一數撲滿裡總共有多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數，分別代表 10 元、5 元、1 元硬幣的枚數 (0 ~ 50)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總金額。
`)}
${sample(1,
`3<br/>
2<br/>
4`,
`44`,
`10×3 + 5×2 + 1×4 = 30 + 10 + 4 = 44 元。`)}
${sample(2,
`0<br/>
0<br/>
0`,
`0`,
`10×0 + 5×0 + 1×0 = 0 + 0 + 0 = 0 元。`)}
${sample(3,
`10<br/>
1<br/>
9`,
`114`,
`10×10 + 5×1 + 1×9 = 100 + 5 + 9 = 114 元。`)}
${sample(4,
`5<br/>
5<br/>
5`,
`80`,
`10×5 + 5×5 + 1×5 = 50 + 25 + 5 = 80 元。`)}
${sample(5,
`50<br/>
50<br/>
50`,
`800`,
`10×50 + 5×50 + 1×50 = 500 + 250 + 50 = 800 元。`,
`{"data": ["3;2;4;44", "0;0;0;0", "10;1;9;114", "5;5;5;80", "50;50;50;800"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】撲滿裡的錢')}</span>
</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>4</td>
<td ${LIST_TD(false, false)}>【一年級】時鐘轉一轉</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("4", `【一年級】時鐘轉一轉`, `國小基礎練習`)}
${desc(`
認識時鐘時，老師把時針撥到某個整點，再請大家往後撥幾個小時。時鐘上只有 1 到 12 點，超過 12 點會從 1 點重新開始。<br/>
請寫一個程式，輸入現在是幾點與要往後撥幾個小時，輸出撥完後時針指著幾點。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：現在的整點 (1 ~ 12)、往後撥的小時數 (0 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表撥完後是幾點 (1 ~ 12)。
`)}
${sample(1,
`9<br/>
5`,
`2`,
`9 點往後撥 5 小時，每 12 小時轉一圈，9 + 5 = 14，減去 12 的倍數後是 2 點。`)}
${sample(2,
`12<br/>
12`,
`12`,
`12 點往後撥 12 小時，每 12 小時轉一圈，12 + 12 = 24，減去 12 的倍數後是 12 點。`)}
${sample(3,
`3<br/>
4`,
`7`,
`3 點往後撥 4 小時，每 12 小時轉一圈，3 + 4 = 7，是 7 點。`)}
${sample(4,
`11<br/>
1`,
`12`,
`11 點往後撥 1 小時，每 12 小時轉一圈，11 + 1 = 12，是 12 點。`)}
${sample(5,
`7<br/>
100`,
`11`,
`7 點往後撥 100 小時，每 12 小時轉一圈，7 + 100 = 107，減去 12 的倍數後是 11 點。`,
`{"data": ["9;5;2", "12;12;12", "3;4;7", "11;1;12", "7;100;11"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】時鐘轉一轉')}</span>
</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>5</td>
<td ${LIST_TD(false, false)}>【一年級】排隊數一數</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("5", `【一年級】排隊數一數`, `國小基礎練習`)}
${desc(`
全班在走廊排成一排，小明從前面數過來是第 A 個。老師想知道：如果從後面數過來，小明是第幾個？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：全班人數 N (1 ~ 40)、小明從前面數的位置 A (1 ≤ A ≤ N)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表小明從後面數是第幾個。
`)}
${sample(1,
`10<br/>
3`,
`8`,
`共 10 人，前面數第 3 個，後面數是 10 - 3 + 1 = 8。`)}
${sample(2,
`1<br/>
1`,
`1`,
`共 1 人，前面數第 1 個，後面數是 1 - 1 + 1 = 1。`)}
${sample(3,
`25<br/>
25`,
`1`,
`共 25 人，前面數第 25 個，後面數是 25 - 25 + 1 = 1。`)}
${sample(4,
`30<br/>
1`,
`30`,
`共 30 人，前面數第 1 個，後面數是 30 - 1 + 1 = 30。`)}
${sample(5,
`40<br/>
17`,
`24`,
`共 40 人，前面數第 17 個，後面數是 40 - 17 + 1 = 24。`,
`{"data": ["10;3;8", "1;1;1", "25;25;1", "30;1;30", "40;17;24"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】排隊數一數')}</span>
</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>6</td>
<td ${LIST_TD(false, false)}>【一年級】單數和雙數</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("6", `【一年級】單數和雙數`, `國小基礎練習`)}
${desc(`
老師發給每位同學一張數字卡，請大家分成「單數」組和「雙數」組。雙數是 2、4、6、8…這樣兩個兩個數的數；單數是 1、3、5、7…。<br/>
請寫一個程式，數一數兩組各有幾個人。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N，代表卡片張數 (1 ~ 30)；接著依序輸入 N 個整數，代表每張卡片上的數字 (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表單數組人數、雙數組人數。
`)}
${sample(1,
`5<br/>
3 8 11 20 7`,
`3 2`,
`單數有 3、11、7 共 3 個；雙數有 8、20 共 2 個。`)}
${sample(2,
`3<br/>
2 4 6`,
`0 3`,
`單數有 0 個；雙數有 2、4、6 共 3 個。`)}
${sample(3,
`1<br/>
1`,
`1 0`,
`單數有 1 共 1 個；雙數有 0 個。`)}
${sample(4,
`6<br/>
10 21 32 43 54 65`,
`3 3`,
`單數有 21、43、65 共 3 個；雙數有 10、32、54 共 3 個。`)}
${sample(5,
`8<br/>
1 2 3 4 5 6 7 99`,
`5 3`,
`單數有 1、3、5、7、99 共 5 個；雙數有 2、4、6 共 3 個。`,
`{"data": ["5;3;8;11;20;7;3;2", "3;2;4;6;0;3", "1;1;1;0", "6;10;21;32;43;54;65;3;3", "8;1;2;3;4;5;6;7;99;5;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】單數和雙數')}</span>
</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>7</td>
<td ${LIST_TD(false, false)}>【一年級】哪一枝最長</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("7", `【一年級】哪一枝最長`, `國小基礎練習`)}
${desc(`
數學課用迴紋針量鉛筆的長度，每位同學量了三枝鉛筆，記錄每枝鉛筆大約是幾個迴紋針長。<br/>
請寫一個程式，找出最長的是第幾枝鉛筆。題目保證三枝鉛筆長度都不一樣。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數，分別代表第 1、2、3 枝鉛筆的長度 (以迴紋針個數表示，1 ~ 20)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最長的是第幾枝鉛筆。
`)}
${sample(1,
`5<br/>
7<br/>
4`,
`2`,
`三枝分別是 5、7、4 個迴紋針長，最長的是第 2 枝（7 個）。`)}
${sample(2,
`9<br/>
2<br/>
3`,
`1`,
`三枝分別是 9、2、3 個迴紋針長，最長的是第 1 枝（9 個）。`)}
${sample(3,
`1<br/>
2<br/>
3`,
`3`,
`三枝分別是 1、2、3 個迴紋針長，最長的是第 3 枝（3 個）。`)}
${sample(4,
`6<br/>
5<br/>
4`,
`1`,
`三枝分別是 6、5、4 個迴紋針長，最長的是第 1 枝（6 個）。`)}
${sample(5,
`10<br/>
20<br/>
15`,
`2`,
`三枝分別是 10、20、15 個迴紋針長，最長的是第 2 枝（20 個）。`,
`{"data": ["5;7;4;2", "9;2;3;1", "1;2;3;3", "6;5;4;1", "10;20;15;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】哪一枝最長')}</span>
</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>8</td>
<td ${LIST_TD(false, false)}>【一年級】一週天氣紀錄</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("8", `【一年級】一週天氣紀錄`, `國小基礎練習`)}
${desc(`
生活課要觀察天氣，小朋友用英文字母記錄每天的天氣：S 代表晴天、C 代表陰天、R 代表雨天。<br/>
請寫一個程式，輸入天氣紀錄，分別數出晴天、陰天、雨天各有幾天。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個字串，由 S、C、R 組成，代表每天的天氣 (長度 1 ~ 31)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三個整數，分別代表晴天、陰天、雨天的天數。
`)}
${sample(1,
`SSCRRSC`,
`3 2 2`,
`SSCRRSC 中 S 晴天 3 天、C 陰天 2 天、R 雨天 2 天。`)}
${sample(2,
`RRRR`,
`0 0 4`,
`RRRR 中 S 晴天 0 天、C 陰天 0 天、R 雨天 4 天。`)}
${sample(3,
`S`,
`1 0 0`,
`S 中 S 晴天 1 天、C 陰天 0 天、R 雨天 0 天。`)}
${sample(4,
`SCRSCRSCR`,
`3 3 3`,
`SCRSCRSCR 中 S 晴天 3 天、C 陰天 3 天、R 雨天 3 天。`)}
${sample(5,
`SSSSSSSSSSCCCCCCCCCCRRRRRRRRRRS`,
`11 10 10`,
`SSSSSSSSSSCCCCCCCCCCRRRRRRRRRRS 中 S 晴天 11 天、C 陰天 10 天、R 雨天 10 天。`,
`{"data": ["SSCRRSC;3;2;2", "RRRR;0;0;4", "S;1;0;0", "SCRSCRSCR;3;3;3", "SSSSSSSSSSCCCCCCCCCCRRRRRRRRRRS;11;10;10"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】一週天氣紀錄')}</span>
</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>9</td>
<td ${LIST_TD(false, false)}>【一年級】綠豆發芽長高</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("9", `【一年級】綠豆發芽長高`, `國小基礎練習`)}
${desc(`
小明在杯子裡種綠豆，第 1 天量到綠豆芽高度為 H 公分，之後每天都長高 A 公分。<br/>
請寫一個程式，算出第幾天綠豆芽的高度會「大於或等於」目標高度 T 公分。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：第 1 天的高度 H (1 ~ 20)、每天長高的公分數 A (1 ~ 10)、目標高度 T (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表第幾天高度第一次達到 T 公分以上。
`)}
${sample(1,
`2<br/>
3<br/>
10`,
`4`,
`每天高度：第 1 天 2、第 2 天 5、第 3 天 8、第 4 天 11 公分，第 4 天達到 10 公分以上。`)}
${sample(2,
`5<br/>
1<br/>
5`,
`1`,
`每天高度：第 1 天 5 公分，第 1 天達到 5 公分以上。`)}
${sample(3,
`1<br/>
10<br/>
100`,
`11`,
`每天高度：第 1 天 1、第 2 天 11、第 3 天 21、第 4 天 31、第 5 天 41、第 6 天 51、第 7 天 61、第 8 天 71、第 9 天 81、第 10 天 91、第 11 天 101 公分，第 11 天達到 100 公分以上。`)}
${sample(4,
`3<br/>
2<br/>
4`,
`2`,
`每天高度：第 1 天 3、第 2 天 5 公分，第 2 天達到 4 公分以上。`)}
${sample(5,
`20<br/>
5<br/>
21`,
`2`,
`每天高度：第 1 天 20、第 2 天 25 公分，第 2 天達到 21 公分以上。`,
`{"data": ["2;3;10;4", "5;1;5;1", "1;10;100;11", "3;2;4;2", "20;5;21;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】綠豆發芽長高')}</span>
</td>
</tr>
`;

// ---------------- 第 10 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>10</td>
<td ${LIST_TD(false, false)}>【一年級】由小排到大</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("10", `【一年級】由小排到大`, `國小基礎練習`)}
${desc(`
老師拿出三張數字卡，請小朋友把卡片由小到大排好。<br/>
請寫一個程式，輸入三個數字，由小到大輸出。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數 (0 ~ 100，可能相同)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序由小到大輸出三個整數。
`)}
${sample(1,
`35<br/>
12<br/>
60`,
`12 35 60`,
`35、12、60 由小到大排為 12 35 60。`)}
${sample(2,
`7<br/>
7<br/>
3`,
`3 7 7`,
`7、7、3 由小到大排為 3 7 7。`)}
${sample(3,
`1<br/>
2<br/>
3`,
`1 2 3`,
`1、2、3 由小到大排為 1 2 3。`)}
${sample(4,
`100<br/>
50<br/>
0`,
`0 50 100`,
`100、50、0 由小到大排為 0 50 100。`)}
${sample(5,
`9<br/>
9<br/>
9`,
`9 9 9`,
`9、9、9 由小到大排為 9 9 9。`,
`{"data": ["35;12;60;12;35;60", "7;7;3;3;7;7", "1;2;3;1;2;3", "100;50;0;0;50;100", "9;9;9;9;9;9"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【一年級】由小排到大')}</span>
</td>
</tr>
`;

// ---------------- 第 11 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>11</td>
<td ${LIST_TD(false, false)}>【二年級】九九乘法表</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("11", `【二年級】九九乘法表`, `國小基礎練習`)}
${desc(`
二年級要背九九乘法表。請寫一個程式，輸入一個數字 N，依序輸出 N×1、N×2、…、N×9 的答案。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N (1 ~ 9)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 9 個整數，分別是 N×1 到 N×9 的答案。
`)}
${sample(1,
`7`,
`7 14 21 28 35 42 49 56 63`,
`7 的乘法：7×1=7、7×2=14、7×3=21、7×4=28、7×5=35、7×6=42、7×7=49、7×8=56、7×9=63。`)}
${sample(2,
`1`,
`1 2 3 4 5 6 7 8 9`,
`1 的乘法：1×1=1、1×2=2、1×3=3、1×4=4、1×5=5、1×6=6、1×7=7、1×8=8、1×9=9。`)}
${sample(3,
`9`,
`9 18 27 36 45 54 63 72 81`,
`9 的乘法：9×1=9、9×2=18、9×3=27、9×4=36、9×5=45、9×6=54、9×7=63、9×8=72、9×9=81。`)}
${sample(4,
`2`,
`2 4 6 8 10 12 14 16 18`,
`2 的乘法：2×1=2、2×2=4、2×3=6、2×4=8、2×5=10、2×6=12、2×7=14、2×8=16、2×9=18。`)}
${sample(5,
`5`,
`5 10 15 20 25 30 35 40 45`,
`5 的乘法：5×1=5、5×2=10、5×3=15、5×4=20、5×5=25、5×6=30、5×7=35、5×8=40、5×9=45。`,
`{"data": ["7;7;14;21;28;35;42;49;56;63", "1;1;2;3;4;5;6;7;8;9", "9;9;18;27;36;45;54;63;72;81", "2;2;4;6;8;10;12;14;16;18", "5;5;10;15;20;25;30;35;40;45"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】九九乘法表')}</span>
</td>
</tr>
`;

// ---------------- 第 12 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>12</td>
<td ${LIST_TD(false, false)}>【二年級】公尺和公分</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("12", `【二年級】公尺和公分`, `國小基礎練習`)}
${desc(`
量教室的長度時，捲尺上讀到的是「公分」。1 公尺 = 100 公分。<br/>
請寫一個程式，把量到的公分數換成「幾公尺幾公分」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表量到的長度 (公分，1 ~ 10000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表幾公尺、幾公分。
`)}
${sample(1,
`856`,
`8 56`,
`1 公尺 = 100 公分，856 ÷ 100 = 8 餘 56，是 8 公尺 56 公分。`)}
${sample(2,
`99`,
`0 99`,
`1 公尺 = 100 公分，99 ÷ 100 = 0 餘 99，是 0 公尺 99 公分。`)}
${sample(3,
`100`,
`1 0`,
`1 公尺 = 100 公分，100 ÷ 100 = 1 餘 0，是 1 公尺 0 公分。`)}
${sample(4,
`1205`,
`12 5`,
`1 公尺 = 100 公分，1205 ÷ 100 = 12 餘 5，是 12 公尺 5 公分。`)}
${sample(5,
`10000`,
`100 0`,
`1 公尺 = 100 公分，10000 ÷ 100 = 100 餘 0，是 100 公尺 0 公分。`,
`{"data": ["856;8;56", "99;0;99", "100;1;0", "1205;12;5", "10000;100;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】公尺和公分')}</span>
</td>
</tr>
`;

// ---------------- 第 13 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>13</td>
<td ${LIST_TD(false, false)}>【二年級】百位十位個位</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("13", `【二年級】百位十位個位`, `國小基礎練習`)}
${desc(`
認識三位數時，老師請大家說出一個數的百位、十位、個位各是多少。例如 507 的百位是 5、十位是 0、個位是 7。<br/>
請寫一個程式，輸入一個三位數，依序輸出它的百位、十位、個位數字。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個三位數整數 (100 ~ 999)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三個整數，分別代表百位、十位、個位的數字。
`)}
${sample(1,
`507`,
`5 0 7`,
`507 的百位是 5、十位是 0、個位是 7。`)}
${sample(2,
`999`,
`9 9 9`,
`999 的百位是 9、十位是 9、個位是 9。`)}
${sample(3,
`100`,
`1 0 0`,
`100 的百位是 1、十位是 0、個位是 0。`)}
${sample(4,
`468`,
`4 6 8`,
`468 的百位是 4、十位是 6、個位是 8。`)}
${sample(5,
`230`,
`2 3 0`,
`230 的百位是 2、十位是 3、個位是 0。`,
`{"data": ["507;5;0;7", "999;9;9;9", "100;1;0;0", "468;4;6;8", "230;2;3;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】百位十位個位')}</span>
</td>
</tr>
`;

// ---------------- 第 14 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>14</td>
<td ${LIST_TD(false, false)}>【二年級】公升和毫公升</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("14", `【二年級】公升和毫公升`, `國小基礎練習`)}
${desc(`
自然課量水時用到容量單位：1 公升 = 1000 毫公升。<br/>
請寫一個程式，把量到的毫公升換成「幾公升幾毫公升」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表水量 (毫公升，1 ~ 100000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表幾公升、幾毫公升。
`)}
${sample(1,
`2350`,
`2 350`,
`1 公升 = 1000 毫公升，2350 ÷ 1000 = 2 餘 350，是 2 公升 350 毫公升。`)}
${sample(2,
`500`,
`0 500`,
`1 公升 = 1000 毫公升，500 ÷ 1000 = 0 餘 500，是 0 公升 500 毫公升。`)}
${sample(3,
`1000`,
`1 0`,
`1 公升 = 1000 毫公升，1000 ÷ 1000 = 1 餘 0，是 1 公升 0 毫公升。`)}
${sample(4,
`12005`,
`12 5`,
`1 公升 = 1000 毫公升，12005 ÷ 1000 = 12 餘 5，是 12 公升 5 毫公升。`)}
${sample(5,
`100000`,
`100 0`,
`1 公升 = 1000 毫公升，100000 ÷ 1000 = 100 餘 0，是 100 公升 0 毫公升。`,
`{"data": ["2350;2;350", "500;0;500", "1000;1;0", "12005;12;5", "100000;100;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】公升和毫公升')}</span>
</td>
</tr>
`;

// ---------------- 第 15 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>15</td>
<td ${LIST_TD(false, false)}>【二年級】過了多久是幾點</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("15", `【二年級】過了多久是幾點`, `國小基礎練習`)}
${desc(`
學校活動從某個時刻開始，進行了一段時間後結束。請寫一個程式，算出結束的時刻 (24 小時制，當天之內結束)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：開始的「時」(0 ~ 23)、開始的「分」(0 ~ 59)、活動進行的分鐘數 (1 ~ 600)。題目保證活動在當天 23 時 59 分以前結束。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表結束時刻的「時」與「分」。
`)}
${sample(1,
`8<br/>
40<br/>
35`,
`9 15`,
`8 時 40 分過 35 分鐘：40 + 35 = 75 分 = 1 時 15 分，結束時刻是 9 時 15 分。`)}
${sample(2,
`13<br/>
0<br/>
60`,
`14 0`,
`13 時 0 分過 60 分鐘：0 + 60 = 60 分 = 1 時 0 分，結束時刻是 14 時 0 分。`)}
${sample(3,
`9<br/>
15<br/>
10`,
`9 25`,
`9 時 15 分過 10 分鐘：15 + 10 = 25 分 = 0 時 25 分，結束時刻是 9 時 25 分。`)}
${sample(4,
`10<br/>
50<br/>
130`,
`13 0`,
`10 時 50 分過 130 分鐘：50 + 130 = 180 分 = 3 時 0 分，結束時刻是 13 時 0 分。`)}
${sample(5,
`0<br/>
0<br/>
600`,
`10 0`,
`0 時 0 分過 600 分鐘：0 + 600 = 600 分 = 10 時 0 分，結束時刻是 10 時 0 分。`,
`{"data": ["8;40;35;9;15", "13;0;60;14;0", "9;15;10;9;25", "10;50;130;13;0", "0;0;600;10;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】過了多久是幾點')}</span>
</td>
</tr>
`;

// ---------------- 第 16 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>16</td>
<td ${LIST_TD(false, false)}>【二年級】存錢筒越存越多</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("16", `【二年級】存錢筒越存越多`, `國小基礎練習`)}
${desc(`
小美決定每天存錢：第 1 天存 A 元，之後每天都比前一天多存 D 元。<br/>
請寫一個程式，算出 N 天後總共存了多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：第 1 天存的錢 A (1 ~ 100)、每天多存的錢 D (0 ~ 20)、天數 N (1 ~ 30)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表 N 天總共存的錢。
`)}
${sample(1,
`5<br/>
2<br/>
4`,
`32`,
`4 天分別存 5、7、9、11 元，共 32 元。`)}
${sample(2,
`10<br/>
0<br/>
7`,
`70`,
`7 天分別存 10、10、10、…、10 元，共 70 元。`)}
${sample(3,
`1<br/>
1<br/>
10`,
`55`,
`10 天分別存 1、2、3、…、10 元，共 55 元。`)}
${sample(4,
`100<br/>
20<br/>
30`,
`11700`,
`30 天分別存 100、120、140、…、680 元，共 11700 元。`)}
${sample(5,
`3<br/>
5<br/>
1`,
`3`,
`只有 1 天，存 3 元。`,
`{"data": ["5;2;4;32", "10;0;7;70", "1;1;10;55", "100;20;30;11700", "3;5;1;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】存錢筒越存越多')}</span>
</td>
</tr>
`;

// ---------------- 第 17 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>17</td>
<td ${LIST_TD(false, false)}>【二年級】跳著數數</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("17", `【二年級】跳著數數`, `國小基礎練習`)}
${desc(`
老師教大家「跳著數」：從起點開始，每次加上固定的數字。例如從 3 開始 5 個 5 個跳：3、8、13、18…<br/>
請寫一個程式，輸入起點、每次跳的數字與上限，依序輸出所有不超過上限的數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：起點 S (0 ~ 100)、每次跳的數字 K (1 ~ 50)、上限 L (S ≤ L ≤ 200)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出所有從 S 開始、每次加 K、且不超過 L 的數。
`)}
${sample(1,
`3<br/>
5<br/>
20`,
`3 8 13 18`,
`從 3 開始每次加 5，不超過 20 的數是 3 8 13 18。`)}
${sample(2,
`10<br/>
10<br/>
50`,
`10 20 30 40 50`,
`從 10 開始每次加 10，不超過 50 的數是 10 20 30 40 50。`)}
${sample(3,
`0<br/>
2<br/>
9`,
`0 2 4 6 8`,
`從 0 開始每次加 2，不超過 9 的數是 0 2 4 6 8。`)}
${sample(4,
`7<br/>
50<br/>
7`,
`7`,
`從 7 開始每次加 50，不超過 7 的數是 7。`)}
${sample(5,
`1<br/>
3<br/>
30`,
`1 4 7 10 13 16 19 22 25 28`,
`從 1 開始每次加 3，不超過 30 的數是 1 4 7 10 13 16 19 22 25 28。`,
`{"data": ["3;5;20;3;8;13;18", "10;10;50;10;20;30;40;50", "0;2;9;0;2;4;6;8", "7;50;7;7", "1;3;30;1;4;7;10;13;16;19;22;25;28"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】跳著數數')}</span>
</td>
</tr>
`;

// ---------------- 第 18 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>18</td>
<td ${LIST_TD(false, false)}>【二年級】蝸牛爬水井</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("18", `【二年級】蝸牛爬水井`, `國小基礎練習`)}
${desc(`
自然觀察時，大家看到一隻蝸牛掉進水井裡。水井深 H 公分，蝸牛白天可以往上爬 U 公分，但晚上睡覺時會往下滑 D 公分。只要白天爬到井口 (高度大於或等於 H)，蝸牛就爬出去了。<br/>
請寫一個程式，算出蝸牛在第幾天白天爬出水井。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：井深 H (1 ~ 1000)、白天往上爬 U (1 ~ 100)、晚上往下滑 D (0 ≤ D < U)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表蝸牛在第幾天爬出水井。
`)}
${sample(1,
`10<br/>
3<br/>
1`,
`5`,
`每天白天爬完後的高度：第 1 天 3、第 2 天 5、第 3 天 7、第 4 天 9、第 5 天 11 公分，第 5 天爬出井口（井深 10）。`)}
${sample(2,
`5<br/>
5<br/>
2`,
`1`,
`每天白天爬完後的高度：第 1 天 5 公分，第 1 天爬出井口（井深 5）。`)}
${sample(3,
`100<br/>
10<br/>
9`,
`91`,
`每天淨爬升 10 - 9 = 1 公分，第 90 天晚上在 90 公分，第 91 天白天爬到 100 公分，第 91 天爬出井口（井深 100）。`)}
${sample(4,
`1<br/>
1<br/>
0`,
`1`,
`每天白天爬完後的高度：第 1 天 1 公分，第 1 天爬出井口（井深 1）。`)}
${sample(5,
`20<br/>
4<br/>
2`,
`9`,
`每天淨爬升 4 - 2 = 2 公分，第 8 天晚上在 16 公分，第 9 天白天爬到 20 公分，第 9 天爬出井口（井深 20）。`,
`{"data": ["10;3;1;5", "5;5;2;1", "100;10;9;91", "1;1;0;1", "20;4;2;9"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】蝸牛爬水井')}</span>
</td>
</tr>
`;

// ---------------- 第 19 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>19</td>
<td ${LIST_TD(false, false)}>【二年級】數一數邊有幾條</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("19", `【二年級】數一數邊有幾條`, `國小基礎練習`)}
${desc(`
老師用吸管和黏土做了很多平面圖形：三角形有 3 條邊、四邊形有 4 條邊、五邊形有 5 條邊。<br/>
請寫一個程式，輸入三種圖形各做了幾個，算出總共用了幾根吸管 (每條邊用一根)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數，分別代表三角形、四邊形、五邊形的個數 (0 ~ 50)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總共用了幾根吸管。
`)}
${sample(1,
`2<br/>
3<br/>
1`,
`23`,
`3×2 + 4×3 + 5×1 = 6 + 12 + 5 = 23 根。`)}
${sample(2,
`0<br/>
0<br/>
0`,
`0`,
`3×0 + 4×0 + 5×0 = 0 + 0 + 0 = 0 根。`)}
${sample(3,
`1<br/>
1<br/>
1`,
`12`,
`3×1 + 4×1 + 5×1 = 3 + 4 + 5 = 12 根。`)}
${sample(4,
`10<br/>
0<br/>
5`,
`55`,
`3×10 + 4×0 + 5×5 = 30 + 0 + 25 = 55 根。`)}
${sample(5,
`50<br/>
50<br/>
50`,
`600`,
`3×50 + 4×50 + 5×50 = 150 + 200 + 250 = 600 根。`,
`{"data": ["2;3;1;23", "0;0;0;0", "1;1;1;12", "10;0;5;55", "50;50;50;600"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】數一數邊有幾條')}</span>
</td>
</tr>
`;

// ---------------- 第 20 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>20</td>
<td ${LIST_TD(false, false)}>【二年級】要準備幾個袋子</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("20", `【二年級】要準備幾個袋子`, `國小基礎練習`)}
${desc(`
校慶要把糖果分裝，每個袋子最多裝 K 顆。所有糖果都要裝進袋子裡，最後一袋不滿也要用一個袋子。<br/>
請寫一個程式，算出至少要準備幾個袋子。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：糖果總數 N (1 ~ 1000)、每袋最多裝幾顆 K (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表至少需要的袋子數。
`)}
${sample(1,
`23<br/>
5`,
`5`,
`23 顆每袋 5 顆：裝滿 4 袋還剩 3 顆，需要再一袋，共 5 袋。`)}
${sample(2,
`30<br/>
10`,
`3`,
`30 顆每袋 10 顆：裝滿 3 袋剛好裝完，共 3 袋。`)}
${sample(3,
`1<br/>
100`,
`1`,
`1 顆每袋 100 顆：裝滿 0 袋還剩 1 顆，需要再一袋，共 1 袋。`)}
${sample(4,
`99<br/>
9`,
`11`,
`99 顆每袋 9 顆：裝滿 11 袋剛好裝完，共 11 袋。`)}
${sample(5,
`1000<br/>
7`,
`143`,
`1000 顆每袋 7 顆：裝滿 142 袋還剩 6 顆，需要再一袋，共 143 袋。`,
`{"data": ["23;5;5", "30;10;3", "1;100;1", "99;9;11", "1000;7;143"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【二年級】要準備幾個袋子')}</span>
</td>
</tr>
`;

// ---------------- 第 21 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>21</td>
<td ${LIST_TD(false, false)}>【三年級】平分與剩下</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("21", `【三年級】平分與剩下`, `國小基礎練習`)}
${desc(`
老師有 N 張貼紙，要平分給 K 位同學，每人拿到一樣多，分不完的留給老師。<br/>
請寫一個程式，算出每位同學拿到幾張，以及剩下幾張。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：貼紙總數 N (0 ~ 1000)、同學人數 K (1 ~ 50)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表每人拿到的張數、剩下的張數。
`)}
${sample(1,
`47<br/>
6`,
`7 5`,
`47 ÷ 6 = 7 餘 5，每人 7 張，剩 5 張。`)}
${sample(2,
`30<br/>
5`,
`6 0`,
`30 ÷ 5 = 6 餘 0，每人 6 張，剩 0 張。`)}
${sample(3,
`3<br/>
7`,
`0 3`,
`3 ÷ 7 = 0 餘 3，每人 0 張，剩 3 張。`)}
${sample(4,
`1000<br/>
33`,
`30 10`,
`1000 ÷ 33 = 30 餘 10，每人 30 張，剩 10 張。`)}
${sample(5,
`0<br/>
4`,
`0 0`,
`0 ÷ 4 = 0 餘 0，每人 0 張，剩 0 張。`,
`{"data": ["47;6;7;5", "30;5;6;0", "3;7;0;3", "1000;33;30;10", "0;4;0;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】平分與剩下')}</span>
</td>
</tr>
`;

// ---------------- 第 22 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>22</td>
<td ${LIST_TD(false, false)}>【三年級】花圃圍籬笆</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("22", `【三年級】花圃圍籬笆`, `國小基礎練習`)}
${desc(`
學校要在長方形花圃的四周圍上籬笆。長方形的周長 = (長 + 寬) × 2。<br/>
請寫一個程式，輸入花圃的長和寬，算出需要多少公尺的籬笆；另外如果長和寬一樣 (正方形)，請再輸出「正方形」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：長 (1 ~ 1000 公尺)、寬 (1 ~ 1000 公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>先輸出周長；若長和寬相等，再輸出「正方形」。
`)}
${sample(1,
`12<br/>
5`,
`34`,
`(12 + 5) × 2 = 34 公尺，長寬不同。`)}
${sample(2,
`8<br/>
8`,
`32 正方形`,
`(8 + 8) × 2 = 32 公尺，長和寬相等，是正方形。`)}
${sample(3,
`1<br/>
1`,
`4 正方形`,
`(1 + 1) × 2 = 4 公尺，長和寬相等，是正方形。`)}
${sample(4,
`100<br/>
37`,
`274`,
`(100 + 37) × 2 = 274 公尺，長寬不同。`)}
${sample(5,
`1000<br/>
999`,
`3998`,
`(1000 + 999) × 2 = 3998 公尺，長寬不同。`,
`{"data": ["12;5;34", "8;8;32;正方形", "1;1;4;正方形", "100;37;274", "1000;999;3998"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】花圃圍籬笆')}</span>
</td>
</tr>
`;

// ---------------- 第 23 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>23</td>
<td ${LIST_TD(false, false)}>【三年級】公斤和公克</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("23", `【三年級】公斤和公克`, `國小基礎練習`)}
${desc(`
自然課用磅秤量物品，1 公斤 = 1000 公克。老師把幾樣物品一起放在磅秤上量。<br/>
請寫一個程式，輸入每樣物品的重量 (公克)，算出總重量是幾公斤幾公克。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N，代表物品數量 (1 ~ 20)；接著依序輸入 N 個整數，代表每樣物品的重量 (公克，1 ~ 5000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表總重量的公斤數與公克數。
`)}
${sample(1,
`3<br/>
450 800 125`,
`1 375`,
`450 + 800 + 125 = 1375 公克 = 1 公斤 375 公克。`)}
${sample(2,
`2<br/>
500 500`,
`1 0`,
`500 + 500 = 1000 公克 = 1 公斤 0 公克。`)}
${sample(3,
`1<br/>
999`,
`0 999`,
`總重 999 公克 = 0 公斤 999 公克。`)}
${sample(4,
`4<br/>
1000 2000 3000 5`,
`6 5`,
`1000 + 2000 + 3000 + 5 = 6005 公克 = 6 公斤 5 公克。`)}
${sample(5,
`5<br/>
5000 5000 5000 5000 4999`,
`24 999`,
`5000 + 5000 + 5000 + 5000 + 4999 = 24999 公克 = 24 公斤 999 公克。`,
`{"data": ["3;450;800;125;1;375", "2;500;500;1;0", "1;999;0;999", "4;1000;2000;3000;5;6;5", "5;5000;5000;5000;5000;4999;24;999"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】公斤和公克')}</span>
</td>
</tr>
`;

// ---------------- 第 24 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>24</td>
<td ${LIST_TD(false, false)}>【三年級】毛毛蟲變蝴蝶</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("24", `【三年級】毛毛蟲變蝴蝶`, `國小基礎練習`)}
${desc(`
自然課觀察紋白蝶的一生：卵 → 幼蟲 → 蛹 → 成蟲。已知卵期有 A 天、幼蟲期有 B 天、蛹期有 C 天，之後就是成蟲。從產卵當天算第 1 天。<br/>
請寫一個程式，輸入第幾天，輸出紋白蝶在那天是哪一個階段 (卵、幼蟲、蛹、成蟲)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入四個整數：卵期天數 A、幼蟲期天數 B、蛹期天數 C (皆 1 ~ 30)、要查詢的第 D 天 (1 ~ 200)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出「卵」、「幼蟲」、「蛹」或「成蟲」。
`)}
${sample(1,
`5<br/>
14<br/>
7<br/>
10`,
`幼蟲`,
`第 1 ~ 5 天是卵、第 6 ~ 19 天是幼蟲、第 20 ~ 26 天是蛹、第 27 天起是成蟲，<br/>第 10 天是幼蟲。`)}
${sample(2,
`5<br/>
14<br/>
7<br/>
27`,
`成蟲`,
`第 1 ~ 5 天是卵、第 6 ~ 19 天是幼蟲、第 20 ~ 26 天是蛹、第 27 天起是成蟲，<br/>第 27 天是成蟲。`)}
${sample(3,
`3<br/>
10<br/>
8<br/>
3`,
`卵`,
`第 1 ~ 3 天是卵、第 4 ~ 13 天是幼蟲、第 14 ~ 21 天是蛹、第 22 天起是成蟲，<br/>第 3 天是卵。`)}
${sample(4,
`3<br/>
10<br/>
8<br/>
21`,
`蛹`,
`第 1 ~ 3 天是卵、第 4 ~ 13 天是幼蟲、第 14 ~ 21 天是蛹、第 22 天起是成蟲，<br/>第 21 天是蛹。`)}
${sample(5,
`4<br/>
12<br/>
9<br/>
25`,
`蛹`,
`第 1 ~ 4 天是卵、第 5 ~ 16 天是幼蟲、第 17 ~ 25 天是蛹、第 26 天起是成蟲，<br/>第 25 天是蛹。`,
`{"data": ["5;14;7;10;幼蟲", "5;14;7;27;成蟲", "3;10;8;3;卵", "3;10;8;21;蛹", "4;12;9;25;蛹"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】毛毛蟲變蝴蝶')}</span>
</td>
</tr>
`;

// ---------------- 第 25 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>25</td>
<td ${LIST_TD(false, false)}>【三年級】同分母分數比大小</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("25", `【三年級】同分母分數比大小`, `國小基礎練習`)}
${desc(`
三年級學到分母相同的分數：分母相同時，分子越大，分數就越大。例如 5/8 比 3/8 大。<br/>
請寫一個程式，輸入分母以及兩個分數的分子，輸出比較大的分數；如果一樣大，輸出「一樣大」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：共同分母 M (2 ~ 20)、第一個分數的分子 A、第二個分數的分子 B (1 ~ M)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出較大的分數，格式為「分子/分母」(例如 5/8)；若一樣大則輸出「一樣大」。
`)}
${sample(1,
`8<br/>
3<br/>
5`,
`5/8`,
`分母都是 8，分子 5 比 3 大，所以 5/8 比較大。`)}
${sample(2,
`6<br/>
4<br/>
4`,
`一樣大`,
`分母都是 6，分子都是 4，一樣大。`)}
${sample(3,
`10<br/>
9<br/>
1`,
`9/10`,
`分母都是 10，分子 9 比 1 大，所以 9/10 比較大。`)}
${sample(4,
`4<br/>
1<br/>
3`,
`3/4`,
`分母都是 4，分子 3 比 1 大，所以 3/4 比較大。`)}
${sample(5,
`20<br/>
13<br/>
17`,
`17/20`,
`分母都是 20，分子 17 比 13 大，所以 17/20 比較大。`,
`{"data": ["8;3;5;5/8", "6;4;4;一樣大", "10;9;1;9/10", "4;1;3;3/4", "20;13;17;17/20"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】同分母分數比大小')}</span>
</td>
</tr>
`;

// ---------------- 第 26 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>26</td>
<td ${LIST_TD(false, false)}>【三年級】一天的溫差</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("26", `【三年級】一天的溫差`, `國小基礎練習`)}
${desc(`
自然課每小時用溫度計量一次教室外的氣溫 (攝氏)。溫差 = 最高溫 - 最低溫。<br/>
請寫一個程式，輸入一天中量到的氣溫，輸出最高溫、最低溫與溫差。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N，代表測量次數 (1 ~ 24)；接著依序輸入 N 個整數，代表每次量到的氣溫 (-10 ~ 45)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三個整數：最高溫、最低溫、溫差。
`)}
${sample(1,
`6<br/>
18 21 25 27 24 20`,
`27 18 9`,
`最高溫 27 度、最低溫 18 度，溫差 27 - 18 = 9。`)}
${sample(2,
`1<br/>
15`,
`15 15 0`,
`最高溫 15 度、最低溫 15 度，溫差 15 - 15 = 0。`)}
${sample(3,
`5<br/>
-3 0 4 2 -1`,
`4 -3 7`,
`最高溫 4 度、最低溫 -3 度，溫差 4 - (-3) = 7。`)}
${sample(4,
`4<br/>
30 30 30 30`,
`30 30 0`,
`最高溫 30 度、最低溫 30 度，溫差 30 - 30 = 0。`)}
${sample(5,
`8<br/>
12 15 19 23 26 22 17 13`,
`26 12 14`,
`最高溫 26 度、最低溫 12 度，溫差 26 - 12 = 14。`,
`{"data": ["6;18;21;25;27;24;20;27;18;9", "1;15;15;15;0", "5;-3;0;4;2;-1;4;-3;7", "4;30;30;30;30;30;30;0", "8;12;15;19;23;26;22;17;13;26;12;14"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】一天的溫差')}</span>
</td>
</tr>
`;

// ---------------- 第 27 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>27</td>
<td ${LIST_TD(false, false)}>【三年級】磁鐵吸得起來嗎</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("27", `【三年級】磁鐵吸得起來嗎`, `國小基礎練習`)}
${desc(`
自然課做磁鐵實驗：磁鐵只能吸起「鐵」做的東西，銅、鋁、木頭、塑膠、紙都吸不起來。老師準備了 N 樣物品，並寫下每樣物品的材質。<br/>
請寫一個程式，算出有幾樣物品會被磁鐵吸起來。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N (1 ~ 20)；接著依序輸入 N 個材質名稱，可能是：鐵、銅、鋁、木頭、塑膠、紙。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表會被磁鐵吸起來的物品數量。
`)}
${sample(1,
`5<br/>
鐵 木頭 鋁 鐵 紙`,
`2`,
`5 樣物品中有 2 樣是「鐵」，會被吸起來。`)}
${sample(2,
`3<br/>
銅 鋁 塑膠`,
`0`,
`3 樣物品都不是鐵，吸不起來，輸出 0。`)}
${sample(3,
`1<br/>
鐵`,
`1`,
`1 樣物品中有 1 樣是「鐵」，會被吸起來。`)}
${sample(4,
`6<br/>
鐵 鐵 鐵 銅 鐵 木頭`,
`4`,
`6 樣物品中有 4 樣是「鐵」，會被吸起來。`)}
${sample(5,
`4<br/>
紙 紙 塑膠 木頭`,
`0`,
`4 樣物品都不是鐵，吸不起來，輸出 0。`,
`{"data": ["5;鐵;木頭;鋁;鐵;紙;2", "3;銅;鋁;塑膠;0", "1;鐵;1", "6;鐵;鐵;鐵;銅;鐵;木頭;4", "4;紙;紙;塑膠;木頭;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】磁鐵吸得起來嗎')}</span>
</td>
</tr>
`;

// ---------------- 第 28 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>28</td>
<td ${LIST_TD(false, false)}>【三年級】植物澆水日</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("28", `【三年級】植物澆水日`, `國小基礎練習`)}
${desc(`
班上種了一盆植物，老師規定從第 1 天開始澆水，之後每隔 K 天澆一次 (第 1 天、第 1+K 天、第 1+2K 天…)。<br/>
請寫一個程式，輸入 K 和總天數 N，依序輸出所有要澆水的日子，最後再輸出總共澆了幾次。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：K (1 ~ 10)、總天數 N (1 ~ 60)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出所有澆水的日子，最後輸出澆水的總次數。
`)}
${sample(1,
`3<br/>
10`,
`1 4 7 10 4`,
`每隔 3 天澆水：第 1、4、7、10 天，共 4 次。`)}
${sample(2,
`5<br/>
5`,
`1 1`,
`每隔 5 天澆水：第 1 天，共 1 次。`)}
${sample(3,
`1<br/>
4`,
`1 2 3 4 4`,
`每隔 1 天澆水：第 1、2、3、4 天，共 4 次。`)}
${sample(4,
`7<br/>
30`,
`1 8 15 22 29 5`,
`每隔 7 天澆水：第 1、8、15、22、29 天，共 5 次。`)}
${sample(5,
`10<br/>
60`,
`1 11 21 31 41 51 6`,
`每隔 10 天澆水：第 1、11、21、31、41、51 天，共 6 次。`,
`{"data": ["3;10;1;4;7;10;4", "5;5;1;1", "1;4;1;2;3;4;4", "7;30;1;8;15;22;29;5", "10;60;1;11;21;31;41;51;6"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】植物澆水日')}</span>
</td>
</tr>
`;

// ---------------- 第 29 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>29</td>
<td ${LIST_TD(false, false)}>【三年級】一位小數的長度</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("29", `【三年級】一位小數的長度`, `國小基礎練習`)}
${desc(`
勞作課要把幾段緞帶接起來，每段緞帶的長度都是一位小數 (公分)，例如 12.5 公分。<br/>
請寫一個程式，算出所有緞帶接起來的總長度。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N (1 ~ 10)；接著依序輸入 N 個一位小數或整數，代表每段緞帶的長度 (0.1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出總長度 (公分)。若總長度是整數，只輸出整數 (例如 20.0 輸出 20)。
`)}
${sample(1,
`3<br/>
12.5 8.3 4.2`,
`25`,
`12.5 + 8.3 + 4.2 = 25 公分。`)}
${sample(2,
`2<br/>
0.5 0.4`,
`0.9`,
`0.5 + 0.4 = 0.9 公分。`)}
${sample(3,
`1<br/>
100`,
`100`,
`只有一段，長 100 公分。`)}
${sample(4,
`4<br/>
1.1 2.2 3.3 4.4`,
`11`,
`1.1 + 2.2 + 3.3 + 4.4 = 11 公分。`)}
${sample(5,
`5<br/>
10.9 20.8 30.7 5 0.1`,
`67.5`,
`10.9 + 20.8 + 30.7 + 5 + 0.1 = 67.5 公分。`,
`{"data": ["3;12.5;8.3;4.2;25", "2;0.5;0.4;0.9", "1;100;100", "4;1.1;2.2;3.3;4.4;11", "5;10.9;20.8;30.7;5;0.1;67.5"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】一位小數的長度')}</span>
</td>
</tr>
`;

// ---------------- 第 30 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>30</td>
<td ${LIST_TD(false, false)}>【三年級】公里和公尺</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("30", `【三年級】公里和公尺`, `國小基礎練習`)}
${desc(`
校外教學時，老師記錄了遊覽車每一段行駛的距離 (公尺)。1 公里 = 1000 公尺。<br/>
請寫一個程式，算出總距離是幾公里幾公尺。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N (1 ~ 10)；接著依序輸入 N 個整數，代表每一段的距離 (公尺，1 ~ 100000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，分別代表總距離的公里數與公尺數。
`)}
${sample(1,
`3<br/>
2500 1800 700`,
`5 0`,
`2500 + 1800 + 700 = 5000 公尺 = 5 公里 0 公尺。`)}
${sample(2,
`1<br/>
999`,
`0 999`,
`總距離 999 公尺 = 0 公里 999 公尺。`)}
${sample(3,
`2<br/>
1000 1000`,
`2 0`,
`1000 + 1000 = 2000 公尺 = 2 公里 0 公尺。`)}
${sample(4,
`4<br/>
12345 678 9 1`,
`13 33`,
`12345 + 678 + 9 + 1 = 13033 公尺 = 13 公里 33 公尺。`)}
${sample(5,
`5<br/>
100000 100000 100000 100000 100000`,
`500 0`,
`100000 + 100000 + 100000 + 100000 + 100000 = 500000 公尺 = 500 公里 0 公尺。`,
`{"data": ["3;2500;1800;700;5;0", "1;999;0;999", "2;1000;1000;2;0", "4;12345;678;9;1;13;33", "5;100000;100000;100000;100000;100000;500;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【三年級】公里和公尺')}</span>
</td>
</tr>
`;

// ---------------- 第 31 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>31</td>
<td ${LIST_TD(false, false)}>【四年級】長方形的面積</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("31", `【四年級】長方形的面積`, `國小基礎練習`)}
${desc(`
四年級學到面積：長方形面積 = 長 × 寬，正方形面積 = 邊長 × 邊長。老師要大家算出教室地板鋪巧拼的面積。<br/>
請寫一個程式，輸入長和寬 (公分)，輸出面積 (平方公分)，並判斷是否超過 1 平方公尺 (10000 平方公分)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：長、寬 (1 ~ 1000 公分)。<br/>
<span ${LBL_OUT}>輸出說明</span>先輸出面積；若面積大於 10000，再輸出「超過1平方公尺」。
`)}
${sample(1,
`30<br/>
20`,
`600`,
`30 × 20 = 600 平方公分，沒有超過 1 平方公尺。`)}
${sample(2,
`200<br/>
150`,
`30000 超過1平方公尺`,
`200 × 150 = 30000 平方公分，大於 10000，超過 1 平方公尺。`)}
${sample(3,
`100<br/>
100`,
`10000`,
`100 × 100 = 10000 平方公分，剛好 10000，沒有超過。`)}
${sample(4,
`1<br/>
1`,
`1`,
`1 × 1 = 1 平方公分，沒有超過 1 平方公尺。`)}
${sample(5,
`1000<br/>
11`,
`11000 超過1平方公尺`,
`1000 × 11 = 11000 平方公分，大於 10000，超過 1 平方公尺。`,
`{"data": ["30;20;600", "200;150;30000;超過1平方公尺", "100;100;10000", "1;1;1", "1000;11;11000;超過1平方公尺"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】長方形的面積')}</span>
</td>
</tr>
`;

// ---------------- 第 32 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>32</td>
<td ${LIST_TD(false, false)}>【四年級】概數：四捨五入到萬位</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("32", `【四年級】概數：四捨五入到萬位`, `國小基礎練習`)}
${desc(`
報紙上常用概數報導大數目，例如某縣人口 548,762 人，四捨五入到萬位是 550,000 人。<br/>
請寫一個程式，輸入一個大數，輸出它四捨五入到萬位的結果。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 (1 ~ 999999999)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出四捨五入到萬位後的整數。
`)}
${sample(1,
`548762`,
`550000`,
`548762 的千位是 8，要進位，四捨五入到萬位是 550000。`)}
${sample(2,
`4999`,
`0`,
`4999 的千位是 4，要捨去，四捨五入到萬位是 0。`)}
${sample(3,
`5000`,
`10000`,
`5000 的千位是 5，要進位，四捨五入到萬位是 10000。`)}
${sample(4,
`123456789`,
`123460000`,
`123456789 的千位是 6，要進位，四捨五入到萬位是 123460000。`)}
${sample(5,
`999999999`,
`1000000000`,
`999999999 的千位是 9，要進位，四捨五入到萬位是 1000000000。`,
`{"data": ["548762;550000", "4999;0", "5000;10000", "123456789;123460000", "999999999;1000000000"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】概數：四捨五入到萬位')}</span>
</td>
</tr>
`;

// ---------------- 第 33 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>33</td>
<td ${LIST_TD(false, false)}>【四年級】找出所有因數</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("33", `【四年級】找出所有因數`, `國小基礎練習`)}
${desc(`
如果 A 可以被 B 整除，B 就是 A 的因數。例如 12 的因數有 1、2、3、4、6、12。<br/>
請寫一個程式，輸入一個整數，由小到大輸出它所有的因數，最後再輸出因數的個數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N (1 ~ 1000)。<br/>
<span ${LBL_OUT}>輸出說明</span>由小到大輸出 N 的所有因數，最後輸出因數的個數。
`)}
${sample(1,
`12`,
`1 2 3 4 6 12 6`,
`12 的因數有 1、2、3、4、6、12，共 6 個。`)}
${sample(2,
`1`,
`1 1`,
`1 的因數有 1，共 1 個。`)}
${sample(3,
`13`,
`1 13 2`,
`13 的因數有 1、13，共 2 個。`)}
${sample(4,
`36`,
`1 2 3 4 6 9 12 18 36 9`,
`36 的因數有 1、2、3、4、6、9、12、18、36，共 9 個。`)}
${sample(5,
`1000`,
`1 2 4 5 8 10 20 25 40 50 100 125 200 250 500 1000 16`,
`1000 的因數有 1、2、4、5、8、10、20、25、40、50、100、125、200、250、500、1000，共 16 個。`,
`{"data": ["12;1;2;3;4;6;12;6", "1;1;1", "13;1;13;2", "36;1;2;3;4;6;9;12;18;36;9", "1000;1;2;4;5;8;10;20;25;40;50;100;125;200;250;500;1000;16"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】找出所有因數')}</span>
</td>
</tr>
`;

// ---------------- 第 34 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>34</td>
<td ${LIST_TD(false, false)}>【四年級】數一數倍數</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("34", `【四年級】數一數倍數`, `國小基礎練習`)}
${desc(`
數學課玩「倍數拍手」遊戲：從 1 數到 N，只要是 K 的倍數就要拍手。<br/>
請寫一個程式，算出從 1 數到 N 總共要拍幾次手，並輸出最後一次拍手時數到的數字 (若都不用拍手，最後一個數字輸出 0)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：N (1 ~ 1000)、K (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數：拍手次數、最後一次拍手的數字。
`)}
${sample(1,
`50<br/>
7`,
`7 49`,
`1 ~ 50 中 7 的倍數有 7、14、…、49，共 7 個，最後是 49。`)}
${sample(2,
`5<br/>
9`,
`0 0`,
`5 小於 9，一次都不用拍手，輸出 0 0。`)}
${sample(3,
`100<br/>
1`,
`100 100`,
`1 ~ 100 中 1 的倍數有 1、2、…、100，共 100 個，最後是 100。`)}
${sample(4,
`1000<br/>
33`,
`30 990`,
`1 ~ 1000 中 33 的倍數有 33、66、…、990，共 30 個，最後是 990。`)}
${sample(5,
`36<br/>
12`,
`3 36`,
`1 ~ 36 中 12 的倍數有 12、24、…、36，共 3 個，最後是 36。`,
`{"data": ["50;7;7;49", "5;9;0;0", "100;1;100;100", "1000;33;30;990", "36;12;3;36"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】數一數倍數')}</span>
</td>
</tr>
`;

// ---------------- 第 35 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>35</td>
<td ${LIST_TD(false, false)}>【四年級】角的分類</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("35", `【四年級】角的分類`, `國小基礎練習`)}
${desc(`
用量角器量角度後，可以把角分類：小於 90 度是銳角、等於 90 度是直角、大於 90 度且小於 180 度是鈍角、等於 180 度是平角。<br/>
請寫一個程式，輸入角度，輸出角的種類。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表角度 (1 ~ 180)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出「銳角」、「直角」、「鈍角」或「平角」。
`)}
${sample(1,
`45`,
`銳角`,
`45 度小於 90 度，是銳角。`)}
${sample(2,
`90`,
`直角`,
`90 度等於 90 度，是直角。`)}
${sample(3,
`120`,
`鈍角`,
`120 度大於 90 度且小於 180 度，是鈍角。`)}
${sample(4,
`180`,
`平角`,
`180 度等於 180 度，是平角。`)}
${sample(5,
`89`,
`銳角`,
`89 度小於 90 度，是銳角。`,
`{"data": ["45;銳角", "90;直角", "120;鈍角", "180;平角", "89;銳角"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】角的分類')}</span>
</td>
</tr>
`;

// ---------------- 第 36 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>36</td>
<td ${LIST_TD(false, false)}>【四年級】今晚的月相</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("36", `【四年級】今晚的月相`, `國小基礎練習`)}
${desc(`
自然課觀察月亮：月亮的形狀會隨著農曆日期改變。本題簡化規則如下：<br/>
農曆 1 日、30 日：新月<br/>
農曆 2 ~ 6 日：眉月<br/>
農曆 7 ~ 9 日：上弦月<br/>
農曆 10 ~ 14 日：盈凸月<br/>
農曆 15 ~ 16 日：滿月<br/>
農曆 17 ~ 21 日：虧凸月<br/>
農曆 22 ~ 24 日：下弦月<br/>
農曆 25 ~ 29 日：殘月<br/>
請寫一個程式，輸入農曆日期，輸出當晚的月相。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表農曆日期 (1 ~ 30)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出月相名稱。
`)}
${sample(1,
`15`,
`滿月`,
`農曆 15 日是滿月。`)}
${sample(2,
`8`,
`上弦月`,
`農曆 8 日是上弦月。`)}
${sample(3,
`1`,
`新月`,
`農曆 1 日是新月。`)}
${sample(4,
`23`,
`下弦月`,
`農曆 23 日是下弦月。`)}
${sample(5,
`27`,
`殘月`,
`農曆 27 日是殘月。`,
`{"data": ["15;滿月", "8;上弦月", "1;新月", "23;下弦月", "27;殘月"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】今晚的月相')}</span>
</td>
</tr>
`;

// ---------------- 第 37 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>37</td>
<td ${LIST_TD(false, false)}>【四年級】水的三態</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("37", `【四年級】水的三態`, `國小基礎練習`)}
${desc(`
在一大氣壓下，水在 0°C 以下是固態 (冰)，高於 0°C 且低於 100°C 是液態 (水)，100°C 以上是氣態 (水蒸氣)。本題規定剛好 0°C 算固態、剛好 100°C 算氣態。<br/>
請寫一個程式，輸入多次量到的溫度，分別數出固態、液態、氣態各有幾次。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N (1 ~ 20)；接著依序輸入 N 個整數，代表每次量到的溫度 (-50 ~ 200)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三個整數：固態、液態、氣態的次數。
`)}
${sample(1,
`5<br/>
-5 25 100 0 60`,
`2 2 1`,
`-5、0 是固態 (2 次)，25、60 是液態 (2 次)，100 是氣態 (1 次)。`)}
${sample(2,
`3<br/>
1 99 50`,
`0 3 0`,
`1、99、50 是液態 (3 次)。`)}
${sample(3,
`1<br/>
100`,
`0 0 1`,
`100 是氣態 (1 次)。`)}
${sample(4,
`6<br/>
-50 -1 0 1 150 200`,
`3 1 2`,
`-50、-1、0 是固態 (3 次)，1 是液態 (1 次)，150、200 是氣態 (2 次)。`)}
${sample(5,
`4<br/>
20 20 20 20`,
`0 4 0`,
`20、20、20、20 是液態 (4 次)。`,
`{"data": ["5;-5;25;100;0;60;2;2;1", "3;1;99;50;0;3;0", "1;100;0;0;1", "6;-50;-1;0;1;150;200;3;1;2", "4;20;20;20;20;0;4;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】水的三態')}</span>
</td>
</tr>
`;

// ---------------- 第 38 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>38</td>
<td ${LIST_TD(false, false)}>【四年級】串聯電路亮不亮</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("38", `【四年級】串聯電路亮不亮`, `國小基礎練習`)}
${desc(`
自然課做電路實驗：把好幾個開關「串聯」在一起接上燈泡，只有所有開關都打開 (接通) 時，燈泡才會亮。老師用 1 代表開關接通、0 代表開關切斷。<br/>
請寫一個程式，判斷燈泡會不會亮；如果不會亮，輸出還有幾個開關沒有接通。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N，代表開關數量 (1 ~ 20)；接著依序輸入 N 個 0 或 1。<br/>
<span ${LBL_OUT}>輸出說明</span>若燈泡會亮，輸出「亮」；否則輸出「不亮」以及沒有接通的開關數量。
`)}
${sample(1,
`3<br/>
1 1 1`,
`亮`,
`3 個開關都接通，燈泡亮。`)}
${sample(2,
`4<br/>
1 0 1 0`,
`不亮 2`,
`有 2 個開關是 0（切斷），串聯電路不通，燈泡不亮。`)}
${sample(3,
`1<br/>
0`,
`不亮 1`,
`有 1 個開關是 0（切斷），串聯電路不通，燈泡不亮。`)}
${sample(4,
`5<br/>
1 1 1 1 0`,
`不亮 1`,
`有 1 個開關是 0（切斷），串聯電路不通，燈泡不亮。`)}
${sample(5,
`2<br/>
1 1`,
`亮`,
`2 個開關都接通，燈泡亮。`,
`{"data": ["3;1;1;1;亮", "4;1;0;1;0;不亮;2", "1;0;不亮;1", "5;1;1;1;1;0;不亮;1", "2;1;1;亮"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】串聯電路亮不亮')}</span>
</td>
</tr>
`;

// ---------------- 第 39 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>39</td>
<td ${LIST_TD(false, false)}>【四年級】24 時制和 12 時制</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("39", `【四年級】24 時制和 12 時制`, `國小基礎練習`)}
${desc(`
火車時刻表用 24 時制，但平常說話常用「上午、下午」的 12 時制。規則：0 時是上午 12 時；1 ~ 11 時是上午；12 時是下午 12 時；13 ~ 23 時是下午 (減 12)。<br/>
請寫一個程式，把 24 時制的時刻轉成 12 時制。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：時 (0 ~ 23)、分 (0 ~ 59)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出「上午」或「下午」、時 (1 ~ 12)、分。
`)}
${sample(1,
`15<br/>
30`,
`下午 3 30`,
`15 時減 12 是下午 3 時 30 分。`)}
${sample(2,
`0<br/>
5`,
`上午 12 5`,
`0 時是上午 12 時 5 分。`)}
${sample(3,
`12<br/>
0`,
`下午 12 0`,
`12 時是下午 12 時 0 分。`)}
${sample(4,
`9<br/>
45`,
`上午 9 45`,
`9 時在 1 ~ 11 時，是上午 9 時 45 分。`)}
${sample(5,
`23<br/>
59`,
`下午 11 59`,
`23 時減 12 是下午 11 時 59 分。`,
`{"data": ["15;30;下午;3;30", "0;5;上午;12;5", "12;0;下午;12;0", "9;45;上午;9;45", "23;59;下午;11;59"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】24 時制和 12 時制')}</span>
</td>
</tr>
`;

// ---------------- 第 40 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>40</td>
<td ${LIST_TD(false, false)}>【四年級】假分數變帶分數</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("40", `【四年級】假分數變帶分數`, `國小基礎練習`)}
${desc(`
分子大於或等於分母的分數叫做假分數，可以寫成帶分數。例如 17/5 = 3 又 2/5。<br/>
請寫一個程式，輸入假分數的分子和分母，輸出帶分數的整數部分、分子、分母 (真分數部分不用約分)；若可以整除，只輸出整數部分。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：分子 A (1 ~ 1000)、分母 B (2 ~ 100)，保證 A ≥ B。<br/>
<span ${LBL_OUT}>輸出說明</span>若 A 可被 B 整除，只輸出整數；否則依序輸出整數部分、分子、分母。
`)}
${sample(1,
`17<br/>
5`,
`3 2 5`,
`17 ÷ 5 = 3 餘 2，17/5 = 3 又 2/5。`)}
${sample(2,
`12<br/>
4`,
`3`,
`12 ÷ 4 = 3，可以整除，輸出 3。`)}
${sample(3,
`9<br/>
8`,
`1 1 8`,
`9 ÷ 8 = 1 餘 1，9/8 = 1 又 1/8。`)}
${sample(4,
`100<br/>
7`,
`14 2 7`,
`100 ÷ 7 = 14 餘 2，100/7 = 14 又 2/7。`)}
${sample(5,
`1000<br/>
99`,
`10 10 99`,
`1000 ÷ 99 = 10 餘 10，1000/99 = 10 又 10/99。`,
`{"data": ["17;5;3;2;5", "12;4;3", "9;8;1;1;8", "100;7;14;2;7", "1000;99;10;10;99"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【四年級】假分數變帶分數')}</span>
</td>
</tr>
`;

// ---------------- 第 41 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>41</td>
<td ${LIST_TD(false, false)}>【五年級】三角形的面積</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("41", `【五年級】三角形的面積`, `國小基礎練習`)}
${desc(`
三角形面積 = 底 × 高 ÷ 2。老師請大家算出三角形旗子需要多少布料。<br/>
請寫一個程式，輸入底和高，輸出三角形面積。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：底、高 (1 ~ 1000 公分)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出面積 (平方公分)，若為整數只輸出整數，否則輸出一位小數 (例如 7.5)。
`)}
${sample(1,
`6<br/>
4`,
`12`,
`6 × 4 ÷ 2 = 12 平方公分。`)}
${sample(2,
`5<br/>
3`,
`7.5`,
`5 × 3 ÷ 2 = 7.5 平方公分。`)}
${sample(3,
`1<br/>
1`,
`0.5`,
`1 × 1 ÷ 2 = 0.5 平方公分。`)}
${sample(4,
`1000<br/>
999`,
`499500`,
`1000 × 999 ÷ 2 = 499500 平方公分。`)}
${sample(5,
`13<br/>
8`,
`52`,
`13 × 8 ÷ 2 = 52 平方公分。`,
`{"data": ["6;4;12", "5;3;7.5", "1;1;0.5", "1000;999;499500", "13;8;52"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】三角形的面積')}</span>
</td>
</tr>
`;

// ---------------- 第 42 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>42</td>
<td ${LIST_TD(false, false)}>【五年級】梯形的面積</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("42", `【五年級】梯形的面積`, `國小基礎練習`)}
${desc(`
梯形面積 = (上底 + 下底) × 高 ÷ 2。學校的花圃是梯形，老師請大家算面積。<br/>
請寫一個程式，輸入上底、下底和高，輸出梯形面積。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：上底、下底、高 (1 ~ 1000 公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出面積 (平方公尺)，若為整數只輸出整數，否則輸出一位小數。
`)}
${sample(1,
`4<br/>
8<br/>
5`,
`30`,
`(4 + 8) × 5 ÷ 2 = 30 平方公尺。`)}
${sample(2,
`3<br/>
4<br/>
5`,
`17.5`,
`(3 + 4) × 5 ÷ 2 = 17.5 平方公尺。`)}
${sample(3,
`10<br/>
10<br/>
10`,
`100`,
`(10 + 10) × 10 ÷ 2 = 100 平方公尺。`)}
${sample(4,
`1<br/>
2<br/>
1`,
`1.5`,
`(1 + 2) × 1 ÷ 2 = 1.5 平方公尺。`)}
${sample(5,
`999<br/>
1000<br/>
777`,
`776611.5`,
`(999 + 1000) × 777 ÷ 2 = 776611.5 平方公尺。`,
`{"data": ["4;8;5;30", "3;4;5;17.5", "10;10;10;100", "1;2;1;1.5", "999;1000;777;776611.5"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】梯形的面積')}</span>
</td>
</tr>
`;

// ---------------- 第 43 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>43</td>
<td ${LIST_TD(false, false)}>【五年級】兩路公車同時到站</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("43", `【五年級】兩路公車同時到站`, `國小基礎練習`)}
${desc(`
兩路公車同時從總站出發，甲路每 A 分鐘發一班，乙路每 B 分鐘發一班。兩路公車下一次同時發車，要經過 A 和 B 的最小公倍數分鐘。<br/>
請寫一個程式，算出經過幾分鐘後兩路公車會再次同時發車。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數 A、B (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表 A 與 B 的最小公倍數。
`)}
${sample(1,
`12<br/>
18`,
`36`,
`12 和 18 的最大公因數是 6，最小公倍數 = 12 × 18 ÷ 6 = 36，36 分鐘後再次同時發車。`)}
${sample(2,
`5<br/>
7`,
`35`,
`5 和 7 的最大公因數是 1，最小公倍數 = 5 × 7 ÷ 1 = 35，35 分鐘後再次同時發車。`)}
${sample(3,
`10<br/>
10`,
`10`,
`10 和 10 的最大公因數是 10，最小公倍數 = 10 × 10 ÷ 10 = 10，10 分鐘後再次同時發車。`)}
${sample(4,
`1<br/>
99`,
`99`,
`1 和 99 的最大公因數是 1，最小公倍數 = 1 × 99 ÷ 1 = 99，99 分鐘後再次同時發車。`)}
${sample(5,
`64<br/>
96`,
`192`,
`64 和 96 的最大公因數是 32，最小公倍數 = 64 × 96 ÷ 32 = 192，192 分鐘後再次同時發車。`,
`{"data": ["12;18;36", "5;7;35", "10;10;10", "1;99;99", "64;96;192"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】兩路公車同時到站')}</span>
</td>
</tr>
`;

// ---------------- 第 44 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>44</td>
<td ${LIST_TD(false, false)}>【五年級】小數乘法：彩帶總長</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("44", `【五年級】小數乘法：彩帶總長`, `國小基礎練習`)}
${desc(`
勞作課每位同學需要一段 L 公尺長的彩帶 (L 是一位小數)，全班有 N 位同學。<br/>
請寫一個程式，算出全班總共需要幾公尺的彩帶。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個數：每人所需長度 L (一位小數或整數，0.1 ~ 10)、人數 N (整數，1 ~ 40)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出總長度 (公尺)。若為整數只輸出整數，否則輸出小數 (去掉末尾的 0)。
`)}
${sample(1,
`1.5<br/>
28`,
`42`,
`1.5 × 28 = 42 公尺。`)}
${sample(2,
`0.3<br/>
7`,
`2.1`,
`0.3 × 7 = 2.1 公尺。`)}
${sample(3,
`2<br/>
25`,
`50`,
`2 × 25 = 50 公尺。`)}
${sample(4,
`0.1<br/>
1`,
`0.1`,
`0.1 × 1 = 0.1 公尺。`)}
${sample(5,
`9.9<br/>
40`,
`396`,
`9.9 × 40 = 396 公尺。`,
`{"data": ["1.5;28;42", "0.3;7;2.1", "2;25;50", "0.1;1;0.1", "9.9;40;396"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】小數乘法：彩帶總長')}</span>
</td>
</tr>
`;

// ---------------- 第 45 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>45</td>
<td ${LIST_TD(false, false)}>【五年級】長方體的體積</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("45", `【五年級】長方體的體積`, `國小基礎練習`)}
${desc(`
長方體體積 = 長 × 寬 × 高。1 公升 = 1000 立方公分。<br/>
請寫一個程式，輸入水族箱的長、寬、高 (公分)，輸出體積 (立方公分)，以及可以裝幾公升的水 (無條件捨去到整數)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：長、寬、高 (1 ~ 200 公分)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數：體積 (立方公分)、可裝的公升數 (無條件捨去)。
`)}
${sample(1,
`60<br/>
30<br/>
40`,
`72000 72`,
`60 × 30 × 40 = 72000 立方公分，72000 ÷ 1000 = 72，無條件捨去為 72 公升。`)}
${sample(2,
`10<br/>
10<br/>
9`,
`900 0`,
`10 × 10 × 9 = 900 立方公分，900 ÷ 1000 = 0.9，無條件捨去為 0 公升。`)}
${sample(3,
`10<br/>
10<br/>
10`,
`1000 1`,
`10 × 10 × 10 = 1000 立方公分，1000 ÷ 1000 = 1，無條件捨去為 1 公升。`)}
${sample(4,
`200<br/>
200<br/>
200`,
`8000000 8000`,
`200 × 200 × 200 = 8000000 立方公分，8000000 ÷ 1000 = 8000，無條件捨去為 8000 公升。`)}
${sample(5,
`45<br/>
25<br/>
30`,
`33750 33`,
`45 × 25 × 30 = 33750 立方公分，33750 ÷ 1000 = 33.75，無條件捨去為 33 公升。`,
`{"data": ["60;30;40;72000;72", "10;10;9;900;0", "10;10;10;1000;1", "200;200;200;8000000;8000", "45;25;30;33750;33"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】長方體的體積')}</span>
</td>
</tr>
`;

// ---------------- 第 46 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>46</td>
<td ${LIST_TD(false, false)}>【五年級】放入石頭水位上升</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("46", `【五年級】放入石頭水位上升`, `國小基礎練習`)}
${desc(`
自然課用排水法量石頭的體積：長方體水箱的底面是長 L 公分、寬 W 公分，放入石頭後水位上升了 H 公分，石頭的體積就是 L × W × H 立方公分。<br/>
老師放了好幾顆石頭，每次記錄水位上升的高度。請寫一個程式，算出所有石頭的總體積。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入：水箱長 L、寬 W (整數，1 ~ 100)，石頭數量 N (1 ~ 10)，接著 N 個數代表每顆石頭造成的水位上升高度 (一位小數或整數，0.1 ~ 20)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出所有石頭的總體積 (立方公分)，若為整數只輸出整數，否則輸出小數。
`)}
${sample(1,
`20<br/>
10<br/>
2<br/>
0.5 1.2`,
`340`,
`水位共上升 0.5 + 1.2 = 1.7 公分，總體積 20 × 10 × 1.7 = 340 立方公分。`)}
${sample(2,
`10<br/>
10<br/>
1<br/>
3`,
`300`,
`水位上升 3 公分，總體積 10 × 10 × 3 = 300 立方公分。`)}
${sample(3,
`30<br/>
25<br/>
3<br/>
0.1 0.1 0.1`,
`225`,
`水位共上升 0.1 + 0.1 + 0.1 = 0.3 公分，總體積 30 × 25 × 0.3 = 225 立方公分。`)}
${sample(4,
`100<br/>
100<br/>
1<br/>
0.1`,
`1000`,
`水位上升 0.1 公分，總體積 100 × 100 × 0.1 = 1000 立方公分。`)}
${sample(5,
`15<br/>
12<br/>
4<br/>
1.5 2.5 0.3 4`,
`1494`,
`水位共上升 1.5 + 2.5 + 0.3 + 4 = 8.3 公分，總體積 15 × 12 × 8.3 = 1494 立方公分。`,
`{"data": ["20;10;2;0.5;1.2;340", "10;10;1;3;300", "30;25;3;0.1;0.1;0.1;225", "100;100;1;0.1;1000", "15;12;4;1.5;2.5;0.3;4;1494"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】放入石頭水位上升')}</span>
</td>
</tr>
`;

// ---------------- 第 47 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>47</td>
<td ${LIST_TD(false, false)}>【五年級】單擺擺動一次要多久</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("47", `【五年級】單擺擺動一次要多久`, `國小基礎練習`)}
${desc(`
自然課做單擺實驗：為了減少誤差，每次測量擺動 10 次所花的時間 (秒)，共測量 3 次，求平均後再除以 10，就是擺動 1 次所需的時間 (週期)。<br/>
請寫一個程式，輸入三次測量的秒數，輸出週期，四捨五入到小數點後第 2 位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個數，代表三次擺動 10 次的時間 (秒，一位小數或整數，1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出擺動 1 次的時間，四捨五入到小數點後第 2 位 (末尾的 0 不輸出，例如 1.50 輸出 1.5)。
`)}
${sample(1,
`14.2<br/>
14.5<br/>
14.3`,
`1.43`,
`平均 (14.2 + 14.5 + 14.3) ÷ 3 = 14.3333，再除以 10 = 1.4333，四捨五入為 1.43 秒。`)}
${sample(2,
`12<br/>
12<br/>
12`,
`1.2`,
`平均 (12 + 12 + 12) ÷ 3 = 12，再除以 10 = 1.2，四捨五入為 1.2 秒。`)}
${sample(3,
`20.1<br/>
19.8<br/>
20.0`,
`2`,
`平均 (20.1 + 19.8 + 20.0) ÷ 3 = 19.9667，再除以 10 = 1.9967，四捨五入為 2 秒。`)}
${sample(4,
`9.9<br/>
10.1<br/>
10.3`,
`1.01`,
`平均 (9.9 + 10.1 + 10.3) ÷ 3 = 10.1，再除以 10 = 1.01，四捨五入為 1.01 秒。`)}
${sample(5,
`15<br/>
16<br/>
16`,
`1.57`,
`平均 (15 + 16 + 16) ÷ 3 = 15.6667，再除以 10 = 1.5667，四捨五入為 1.57 秒。`,
`{"data": ["14.2;14.5;14.3;1.43", "12;12;12;1.2", "20.1;19.8;20.0;2", "9.9;10.1;10.3;1.01", "15;16;16;1.57"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】單擺擺動一次要多久')}</span>
</td>
</tr>
`;

// ---------------- 第 48 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>48</td>
<td ${LIST_TD(false, false)}>【五年級】水溶液的酸鹼性</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("48", `【五年級】水溶液的酸鹼性`, `國小基礎練習`)}
${desc(`
自然課用 pH 值判斷水溶液的酸鹼性：pH 小於 7 是酸性、等於 7 是中性、大於 7 是鹼性。老師準備了幾杯水溶液並測出 pH 值。<br/>
請寫一個程式，數出酸性、中性、鹼性各有幾杯。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N (1 ~ 20)；接著依序輸入 N 個 pH 值 (一位小數或整數，0 ~ 14)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三個整數：酸性、中性、鹼性的杯數。
`)}
${sample(1,
`5<br/>
3 7 12.5 6.8 8`,
`2 1 2`,
`酸性有 3、6.8 共 2 杯，中性 7 共 1 杯，鹼性有 12.5、8 共 2 杯。`)}
${sample(2,
`3<br/>
7 7 7`,
`0 3 0`,
`中性 7、7、7 共 3 杯。`)}
${sample(3,
`1<br/>
0`,
`1 0 0`,
`酸性有 0 共 1 杯。`)}
${sample(4,
`6<br/>
1.5 2.5 13 14 7.1 6.9`,
`3 0 3`,
`酸性有 1.5、2.5、6.9 共 3 杯，鹼性有 13、14、7.1 共 3 杯。`)}
${sample(5,
`4<br/>
7.0 9 4 10`,
`1 1 2`,
`酸性有 4 共 1 杯，中性 7.0 共 1 杯，鹼性有 9、10 共 2 杯。`,
`{"data": ["5;3;7;12.5;6.8;8;2;1;2", "3;7;7;7;0;3;0", "1;0;1;0;0", "6;1.5;2.5;13;14;7.1;6.9;3;0;3", "4;7.0;9;4;10;1;1;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】水溶液的酸鹼性')}</span>
</td>
</tr>
`;

// ---------------- 第 49 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>49</td>
<td ${LIST_TD(false, false)}>【五年級】影子朝哪邊</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("49", `【五年級】影子朝哪邊`, `國小基礎練習`)}
${desc(`
自然課觀察竿影：影子會出現在太陽的相反方向。本題簡化：上午 (6 ~ 11 時) 太陽在東方，影子朝西；12 時太陽在南方偏高處，影子朝北；下午 (13 ~ 18 時) 太陽在西方，影子朝東。其他時間沒有太陽，沒有影子。<br/>
請寫一個程式，輸入時刻，輸出影子的方向。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表時刻 (0 ~ 23 時)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出「西」、「北」、「東」或「沒有影子」。
`)}
${sample(1,
`9`,
`西`,
`上午 9 時太陽在東方，影子朝西。`)}
${sample(2,
`15`,
`東`,
`下午 15 時太陽在西方，影子朝東。`)}
${sample(3,
`12`,
`北`,
`12 時太陽在南方偏高處，影子朝北。`)}
${sample(4,
`20`,
`沒有影子`,
`20 時沒有太陽，沒有影子。`)}
${sample(5,
`6`,
`西`,
`上午 6 時太陽在東方，影子朝西。`,
`{"data": ["9;西", "15;東", "12;北", "20;沒有影子", "6;西"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】影子朝哪邊')}</span>
</td>
</tr>
`;

// ---------------- 第 50 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>50</td>
<td ${LIST_TD(false, false)}>【五年級】種子發芽率</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("50", `【五年級】種子發芽率`, `國小基礎練習`)}
${desc(`
自然課做種子發芽實驗，每組種下一些種子，記錄發芽的數量。發芽率 = 發芽數 ÷ 種子數 × 100%。<br/>
請寫一個程式，輸入各組的種子數與發芽數，輸出全班的發芽率 (四捨五入到整數 %)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N，代表組數 (1 ~ 10)；接著每組依序輸入兩個整數：種子數 (1 ~ 100)、發芽數 (0 ~ 種子數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出全班發芽率 (整數，四捨五入，不含 % 符號)。
`)}
${sample(1,
`3<br/>
20 15<br/>
20 18<br/>
20 12`,
`75`,
`共 60 顆種子，發芽 45 顆，45 ÷ 60 × 100 = 75，四捨五入為 75。`)}
${sample(2,
`1<br/>
10 10`,
`100`,
`共 10 顆種子，發芽 10 顆，10 ÷ 10 × 100 = 100，四捨五入為 100。`)}
${sample(3,
`2<br/>
7 0<br/>
3 0`,
`0`,
`共 10 顆種子，發芽 0 顆，0 ÷ 10 × 100 = 0，四捨五入為 0。`)}
${sample(4,
`4<br/>
9 5<br/>
8 7<br/>
6 1<br/>
7 4`,
`57`,
`共 30 顆種子，發芽 17 顆，17 ÷ 30 × 100 = 56.67，四捨五入為 57。`)}
${sample(5,
`2<br/>
3 1<br/>
3 1`,
`33`,
`共 6 顆種子，發芽 2 顆，2 ÷ 6 × 100 = 33.33，四捨五入為 33。`,
`{"data": ["3;20;15;20;18;20;12;75", "1;10;10;100", "2;7;0;3;0;0", "4;9;5;8;7;6;1;7;4;57", "2;3;1;3;1;33"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【五年級】種子發芽率')}</span>
</td>
</tr>
`;

// ---------------- 第 51 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>51</td>
<td ${LIST_TD(false, false)}>【六年級】圓的周長和面積</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("51", `【六年級】圓的周長和面積`, `國小基礎練習`)}
${desc(`
六年級學到圓：圓周長 = 直徑 × 3.14，圓面積 = 半徑 × 半徑 × 3.14。<br/>
請寫一個程式，輸入圓的半徑，輸出圓周長與圓面積 (圓周率用 3.14)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表半徑 (1 ~ 100 公分)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出圓周長與圓面積 (去掉末尾的 0，例如 31.40 輸出 31.4)。
`)}
${sample(1,
`5`,
`31.4 78.5`,
`周長 10 × 3.14 = 31.4，面積 5 × 5 × 3.14 = 78.5。`)}
${sample(2,
`10`,
`62.8 314`,
`周長 20 × 3.14 = 62.8，面積 10 × 10 × 3.14 = 314。`)}
${sample(3,
`1`,
`6.28 3.14`,
`周長 2 × 3.14 = 6.28，面積 1 × 1 × 3.14 = 3.14。`)}
${sample(4,
`7`,
`43.96 153.86`,
`周長 14 × 3.14 = 43.96，面積 7 × 7 × 3.14 = 153.86。`)}
${sample(5,
`100`,
`628 31400`,
`周長 200 × 3.14 = 628，面積 100 × 100 × 3.14 = 31400。`,
`{"data": ["5;31.4;78.5", "10;62.8;314", "1;6.28;3.14", "7;43.96;153.86", "100;628;31400"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】圓的周長和面積')}</span>
</td>
</tr>
`;

// ---------------- 第 52 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>52</td>
<td ${LIST_TD(false, false)}>【六年級】最簡整數比</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("52", `【六年級】最簡整數比`, `國小基礎練習`)}
${desc(`
調配果汁時，果汁和水的比是 A : B。把比的前項和後項同除以最大公因數，就是最簡整數比，例如 12 : 18 = 2 : 3。<br/>
請寫一個程式，輸入 A 和 B，輸出最簡整數比。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數 A、B (1 ~ 1000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出最簡整數比的前項與後項。
`)}
${sample(1,
`12<br/>
18`,
`2 3`,
`12 和 18 的最大公因數是 6，12 : 18 = 2 : 3。`)}
${sample(2,
`7<br/>
5`,
`7 5`,
`7 和 5 的最大公因數是 1，7 : 5 = 7 : 5。`)}
${sample(3,
`100<br/>
100`,
`1 1`,
`100 和 100 的最大公因數是 100，100 : 100 = 1 : 1。`)}
${sample(4,
`250<br/>
1000`,
`1 4`,
`250 和 1000 的最大公因數是 250，250 : 1000 = 1 : 4。`)}
${sample(5,
`84<br/>
36`,
`7 3`,
`84 和 36 的最大公因數是 12，84 : 36 = 7 : 3。`,
`{"data": ["12;18;2;3", "7;5;7;5", "100;100;1;1", "250;1000;1;4", "84;36;7;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】最簡整數比')}</span>
</td>
</tr>
`;

// ---------------- 第 53 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>53</td>
<td ${LIST_TD(false, false)}>【六年級】速率：時速是多少</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("53", `【六年級】速率：時速是多少`, `國小基礎練習`)}
${desc(`
速率 = 距離 ÷ 時間。一台腳踏車騎了 D 公尺，花了 M 分鐘。<br/>
請寫一個程式，換算成時速 (公里/時)，四捨五入到小數點後第 1 位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：距離 D (公尺，1 ~ 100000)、時間 M (分鐘，1 ~ 600)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出時速 (公里/時)，四捨五入到小數點後第 1 位 (末尾的 0 不輸出)。
`)}
${sample(1,
`3000<br/>
12`,
`15`,
`3 公里 ÷ (12/60) 小時 = 3 × 60 ÷ 12 = 15，四捨五入為 15 公里/時。`)}
${sample(2,
`5000<br/>
20`,
`15`,
`5 公里 ÷ (20/60) 小時 = 5 × 60 ÷ 20 = 15，四捨五入為 15 公里/時。`)}
${sample(3,
`1000<br/>
7`,
`8.6`,
`1 公里 ÷ (7/60) 小時 = 1 × 60 ÷ 7 = 8.571，四捨五入為 8.6 公里/時。`)}
${sample(4,
`42195<br/>
180`,
`14.1`,
`42.195 公里 ÷ (180/60) 小時 = 42.195 × 60 ÷ 180 = 14.065，四捨五入為 14.1 公里/時。`)}
${sample(5,
`100<br/>
1`,
`6`,
`0.1 公里 ÷ (1/60) 小時 = 0.1 × 60 ÷ 1 = 6，四捨五入為 6 公里/時。`,
`{"data": ["3000;12;15", "5000;20;15", "1000;7;8.6", "42195;180;14.1", "100;1;6"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】速率：時速是多少')}</span>
</td>
</tr>
`;

// ---------------- 第 54 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>54</td>
<td ${LIST_TD(false, false)}>【六年級】地圖比例尺</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("54", `【六年級】地圖比例尺`, `國小基礎練習`)}
${desc(`
地圖上的比例尺 1 : S 表示地圖上 1 公分代表實際 S 公分。<br/>
請寫一個程式，輸入比例尺的 S 以及地圖上量到的距離 (公分)，輸出實際距離是幾公尺 (若不是整數，輸出小數)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個數：比例尺分母 S (整數，1 ~ 10000000)、地圖上的距離 (一位小數或整數，0.1 ~ 100 公分)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出實際距離 (公尺)，去掉末尾的 0。
`)}
${sample(1,
`50000<br/>
4.5`,
`2250`,
`4.5 × 50000 = 225000 公分 = 2250 公尺。`)}
${sample(2,
`100<br/>
3`,
`3`,
`3 × 100 = 300 公分 = 3 公尺。`)}
${sample(3,
`2500000<br/>
1.2`,
`30000`,
`1.2 × 2500000 = 3000000 公分 = 30000 公尺。`)}
${sample(4,
`10<br/>
0.1`,
`0.01`,
`0.1 × 10 = 1 公分 = 0.01 公尺。`)}
${sample(5,
`1000<br/>
7`,
`70`,
`7 × 1000 = 7000 公分 = 70 公尺。`,
`{"data": ["50000;4.5;2250", "100;3;3", "2500000;1.2;30000", "10;0.1;0.01", "1000;7;70"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】地圖比例尺')}</span>
</td>
</tr>
`;

// ---------------- 第 55 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>55</td>
<td ${LIST_TD(false, false)}>【六年級】雞兔同籠</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("55", `【六年級】雞兔同籠`, `國小基礎練習`)}
${desc(`
農場的籠子裡有雞和兔子，雞有 2 隻腳、兔子有 4 隻腳。已知總共有 H 個頭和 F 隻腳。<br/>
請寫一個程式，算出雞和兔子各有幾隻。題目保證一定有整數解。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：頭數 H (1 ~ 100)、腳數 F。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數：雞的隻數、兔子的隻數。
`)}
${sample(1,
`10<br/>
28`,
`6 4`,
`假設全部是雞有 20 隻腳，多出 28 - 20 = 8 隻腳，兔子 8 ÷ 2 = 4 隻，雞 10 - 4 = 6 隻。`)}
${sample(2,
`5<br/>
10`,
`5 0`,
`假設全部是雞有 10 隻腳，多出 10 - 10 = 0 隻腳，兔子 0 ÷ 2 = 0 隻，雞 5 - 0 = 5 隻。`)}
${sample(3,
`3<br/>
12`,
`0 3`,
`假設全部是雞有 6 隻腳，多出 12 - 6 = 6 隻腳，兔子 6 ÷ 2 = 3 隻，雞 3 - 3 = 0 隻。`)}
${sample(4,
`35<br/>
94`,
`23 12`,
`假設全部是雞有 70 隻腳，多出 94 - 70 = 24 隻腳，兔子 24 ÷ 2 = 12 隻，雞 35 - 12 = 23 隻。`)}
${sample(5,
`100<br/>
300`,
`50 50`,
`假設全部是雞有 200 隻腳，多出 300 - 200 = 100 隻腳，兔子 100 ÷ 2 = 50 隻，雞 100 - 50 = 50 隻。`,
`{"data": ["10;28;6;4", "5;10;5;0", "3;12;0;3", "35;94;23;12", "100;300;50;50"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】雞兔同籠')}</span>
</td>
</tr>
`;

// ---------------- 第 56 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>56</td>
<td ${LIST_TD(false, false)}>【六年級】槓桿平衡了嗎</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("56", `【六年級】槓桿平衡了嗎`, `國小基礎練習`)}
${desc(`
自然課做槓桿實驗：支點左邊掛的砝碼重量 × 距離 = 左邊的力矩；右邊也一樣。左邊力矩較大時槓桿往左傾，右邊較大往右傾，一樣大就平衡。<br/>
請寫一個程式，判斷槓桿的狀態。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入四個整數：左邊砝碼重量、左邊距離、右邊砝碼重量、右邊距離 (皆 1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出「左傾」、「右傾」或「平衡」。
`)}
${sample(1,
`3<br/>
4<br/>
2<br/>
6`,
`平衡`,
`左邊 3 × 4 = 12，右邊 2 × 6 = 12，一樣大，平衡。`)}
${sample(2,
`5<br/>
2<br/>
3<br/>
3`,
`左傾`,
`左邊 5 × 2 = 10，右邊 3 × 3 = 9，左邊較大，左傾。`)}
${sample(3,
`1<br/>
10<br/>
2<br/>
6`,
`右傾`,
`左邊 1 × 10 = 10，右邊 2 × 6 = 12，右邊較大，右傾。`)}
${sample(4,
`10<br/>
10<br/>
25<br/>
4`,
`平衡`,
`左邊 10 × 10 = 100，右邊 25 × 4 = 100，一樣大，平衡。`)}
${sample(5,
`7<br/>
3<br/>
2<br/>
11`,
`右傾`,
`左邊 7 × 3 = 21，右邊 2 × 11 = 22，右邊較大，右傾。`,
`{"data": ["3;4;2;6;平衡", "5;2;3;3;左傾", "1;10;2;6;右傾", "10;10;25;4;平衡", "7;3;2;11;右傾"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】槓桿平衡了嗎')}</span>
</td>
</tr>
`;

// ---------------- 第 57 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>57</td>
<td ${LIST_TD(false, false)}>【六年級】燃燒三要素</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("57", `【六年級】燃燒三要素`, `國小基礎練習`)}
${desc(`
自然課學到燃燒需要三個條件：可燃物、助燃物 (氧氣)、溫度達到燃點。三個條件缺一不可，滅火就是去除其中一個條件。<br/>
請寫一個程式，輸入三個條件是否具備 (1 代表有、0 代表沒有)，判斷能否燃燒；若不能，依序輸出缺少的條件名稱。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數 (0 或 1)：可燃物、助燃物、達到燃點。<br/>
<span ${LBL_OUT}>輸出說明</span>若能燃燒輸出「會燃燒」；否則依序輸出缺少的條件：「可燃物」、「助燃物」、「燃點」。
`)}
${sample(1,
`1<br/>
1<br/>
1`,
`會燃燒`,
`三個條件都具備，會燃燒。`)}
${sample(2,
`1<br/>
0<br/>
1`,
`助燃物`,
`缺少 助燃物，不能燃燒。`)}
${sample(3,
`0<br/>
0<br/>
0`,
`可燃物 助燃物 燃點`,
`缺少 可燃物、助燃物、燃點，不能燃燒。`)}
${sample(4,
`1<br/>
1<br/>
0`,
`燃點`,
`缺少 燃點，不能燃燒。`)}
${sample(5,
`0<br/>
1<br/>
1`,
`可燃物`,
`缺少 可燃物，不能燃燒。`,
`{"data": ["1;1;1;會燃燒", "1;0;1;助燃物", "0;0;0;可燃物;助燃物;燃點", "1;1;0;燃點", "0;1;1;可燃物"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】燃燒三要素')}</span>
</td>
</tr>
`;

// ---------------- 第 58 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>58</td>
<td ${LIST_TD(false, false)}>【六年級】電磁鐵吸迴紋針</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("58", `【六年級】電磁鐵吸迴紋針`, `國小基礎練習`)}
${desc(`
自然課做電磁鐵實驗，發現：線圈圈數越多、電池越多 (串聯)，電磁鐵磁力越強。本題假設每 10 圈線圈、每 1 顆電池可以吸起 1 根迴紋針，也就是「可吸起的根數 = (圈數 ÷ 10，無條件捨去) × 電池數」。<br/>
老師準備了幾組實驗，請寫一個程式算出哪一組吸起的迴紋針最多 (若同樣多，輸出組號較小的)，以及吸起幾根。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N，代表組數 (1 ~ 10)；接著每組依序輸入兩個整數：線圈圈數 (1 ~ 500)、電池數 (1 ~ 4)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數：吸最多的組號、吸起的根數。
`)}
${sample(1,
`3<br/>
50 1<br/>
30 2<br/>
100 1`,
`3 10`,
`第 1 組 (50÷10 取整數) × 1 = 5 根、第 2 組 (30÷10 取整數) × 2 = 6 根、第 3 組 (100÷10 取整數) × 1 = 10 根，<br/>第 3 組最多。`)}
${sample(2,
`2<br/>
25 3<br/>
65 1`,
`1 6`,
`第 1 組 (25÷10 取整數) × 3 = 6 根、第 2 組 (65÷10 取整數) × 1 = 6 根，<br/>第 1 組最多（同樣多取組號較小的）。`)}
${sample(3,
`1<br/>
9 4`,
`1 0`,
`第 1 組 (9÷10 取整數) × 4 = 0 根，<br/>第 1 組最多。`)}
${sample(4,
`4<br/>
120 2<br/>
80 3<br/>
240 1<br/>
60 4`,
`1 24`,
`第 1 組 (120÷10 取整數) × 2 = 24 根、第 2 組 (80÷10 取整數) × 3 = 24 根、第 3 組 (240÷10 取整數) × 1 = 24 根、第 4 組 (60÷10 取整數) × 4 = 24 根，<br/>第 1 組最多（同樣多取組號較小的）。`)}
${sample(5,
`3<br/>
500 4<br/>
499 4<br/>
10 1`,
`1 200`,
`第 1 組 (500÷10 取整數) × 4 = 200 根、第 2 組 (499÷10 取整數) × 4 = 196 根、第 3 組 (10÷10 取整數) × 1 = 1 根，<br/>第 1 組最多。`,
`{"data": ["3;50;1;30;2;100;1;3;10", "2;25;3;65;1;1;6", "1;9;4;1;0", "4;120;2;80;3;240;1;60;4;1;24", "3;500;4;499;4;10;1;1;200"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】電磁鐵吸迴紋針')}</span>
</td>
</tr>
`;

// ---------------- 第 59 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>59</td>
<td ${LIST_TD(false, false)}>【六年級】排桌子可坐幾人</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("59", `【六年級】排桌子可坐幾人`, `國小基礎練習`)}
${desc(`
六年級學到找規律：把正方形桌子排成一長排，1 張桌子可以坐 4 人，2 張併在一起可以坐 6 人，3 張可以坐 8 人……每多一張桌子就多 2 人。<br/>
請寫一個程式，輸入全班人數，算出至少要排幾張桌子才坐得下。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表人數 (1 ~ 200)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表至少需要的桌子數。
`)}
${sample(1,
`27`,
`13`,
`n 張桌子可坐 2n + 2 人，13 張可坐 28 人，12 張只能坐 26 人，至少 13 張。`)}
${sample(2,
`4`,
`1`,
`n 張桌子可坐 2n + 2 人，1 張可坐 4 人，1 張就夠坐 4 人。`)}
${sample(3,
`1`,
`1`,
`n 張桌子可坐 2n + 2 人，1 張可坐 4 人，1 張就夠坐 1 人。`)}
${sample(4,
`6`,
`2`,
`n 張桌子可坐 2n + 2 人，2 張可坐 6 人，1 張只能坐 4 人，至少 2 張。`)}
${sample(5,
`200`,
`99`,
`n 張桌子可坐 2n + 2 人，99 張可坐 200 人，98 張只能坐 198 人，至少 99 張。`,
`{"data": ["27;13", "4;1", "1;1", "6;2", "200;99"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】排桌子可坐幾人')}</span>
</td>
</tr>
`;

// ---------------- 第 60 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>60</td>
<td ${LIST_TD(false, false)}>【六年級】放大圖的面積</td>
<td ${LIST_TD(false, false)}>國小基礎練習</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("60", `【六年級】放大圖的面積`, `國小基礎練習`)}
${desc(`
六年級學到放大圖與縮小圖：把長方形的長和寬都放大 K 倍，面積會變成原來的 K × K 倍。<br/>
請寫一個程式，輸入長方形的長、寬與放大倍數，輸出放大後的長、寬、面積，以及面積是原來的幾倍。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：長、寬 (1 ~ 100 公分)、放大倍數 K (1 ~ 10)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出四個整數：放大後的長、寬、面積、面積倍數。
`)}
${sample(1,
`4<br/>
3<br/>
2`,
`8 6 48 4`,
`長 4 × 2 = 8、寬 3 × 2 = 6，面積 8 × 6 = 48，是原來 4 × 3 = 12 的 2 × 2 = 4 倍。`)}
${sample(2,
`5<br/>
5<br/>
3`,
`15 15 225 9`,
`長 5 × 3 = 15、寬 5 × 3 = 15，面積 15 × 15 = 225，是原來 5 × 5 = 25 的 3 × 3 = 9 倍。`)}
${sample(3,
`1<br/>
1<br/>
1`,
`1 1 1 1`,
`長 1 × 1 = 1、寬 1 × 1 = 1，面積 1 × 1 = 1，是原來 1 × 1 = 1 的 1 × 1 = 1 倍。`)}
${sample(4,
`10<br/>
7<br/>
10`,
`100 70 7000 100`,
`長 10 × 10 = 100、寬 7 × 10 = 70，面積 100 × 70 = 7000，是原來 10 × 7 = 70 的 10 × 10 = 100 倍。`)}
${sample(5,
`12<br/>
8<br/>
5`,
`60 40 2400 25`,
`長 12 × 5 = 60、寬 8 × 5 = 40，面積 60 × 40 = 2400，是原來 12 × 8 = 96 的 5 × 5 = 25 倍。`,
`{"data": ["4;3;2;8;6;48;4", "5;5;3;15;15;225;9", "1;1;1;1;1;1;1", "10;7;10;100;70;7000;100", "12;8;5;60;40;2400;25"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('【六年級】放大圖的面積')}</span>
</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
