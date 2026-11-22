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
const ANSWER_GROUP = 'T1-T12題型範例國中組';   // exam/answer/ 底下的資料夾名稱
const ICON_IMPORT  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAvCAYAAACc5fiSAAACuUlEQVR42u3Zb0gTYRwH8O/dhGyjV1lbTjM7XTQ5rZDQykGpkRFFwSgGaUQYkYhhQpgvgnyZERVGvYhcmIFaiIQpDvRQZw3BLf/UZOZaWUJv1LWsF7vetDDZblue3tO436txz3PHhx+/53fP7gHkkCO2gwo1kFls2A5AI6Htp8PM9UcMzyw25AK4BWA3AYmdB3DHYeauLh1QLEFnJyZoXs37vFpCKmINgDx1Vop6xu5+sXiAXjLRNP31C3H1rIpXXsgsNuQLwTNIXIjfFnwAsHfxtTihGxpq7mJHOisJ9n5bA+qfPQw5Tv+v7VCGr3bEifUgbtgK16f3gnPysw3YrE4iCz7udgouJgDYqWNFg8s1LsNleCy1Qz/P4+VgN2of3QzsIyKKktqyP79ZRo/r564gNTFl9TJOUxQO5RSguuQSVPHKqO9nGT2una36Z/SySoWmKBzOLYwaH0CnJW2VrsZpikJRTj4umy5GhGcZPapPVywbLcriVNAKHMsrCosPoPWp28jpKuHwYqNFbYcBfLmx9C+8LplBlalMVLSom6wA3njgKADgdvMDaDdsQs2ZSmSlZZC7rQ2G1yUzK4JeEXgAf6rguPzKjzrjN5rqsW6tKuS4Ml6JipPnkbwxuu9H3bZetPa0C84J931HEP7GNRYWYSo8ERXcz/OY+DiJgRGbtKUyOvUOfp6PeL7X58WEZ1L6Gm/v64T784eIs83ZrbAMcdLDnR4XHnc2Y9Y7F3bu2yknnnY/J6cdtva0w7fgQ7mxFIkJmqCZfj02hLqmejg9LrL6eMegBQMjNhzZcxD7d+0Do92C7z8WMD7lRFtfB7hhK7kvoFnvHBq7WtDY1SL/54x5+CiJyN/b5H4h+JNgXQHSn0jcc5g5S8jDqxm7e1qZvr4LAAtAS8ipW53DzFUiVs455Vjt+AXUONVRZTT++QAAAABJRU5ErkJggg==';
const ICON_BLOCKLY = 'data:image/png;base64,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';
const ICON_SCRATCH = 'data:image/png;base64,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';
const ANSWER_BTN_STYLE = 'width:40px !important; height:40px !important; padding:4px !important; margin:2px !important; display:inline-block !important; float:none !important; position:static !important; left:auto !important; right:auto !important; transform:none !important; box-sizing:border-box !important; vertical-align:middle; cursor:pointer;';
const ANSWER_IMG_STYLE = 'width:100%; height:100%; object-fit:contain; display:block; pointer-events:none;';
const answerMsg = (key, def) => (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) || def;
// 產生兩個路徑，用 | 分隔；showAnswer() 會依序嘗試，前一個找不到才試下一個
const answerPath = (name, platform, group) => [ANSWER_DIR, ANSWER_DIR2].map(dir => dir + encodeURIComponent(group) + '/' + encodeURIComponent(name + '_' + platform + '.xml')).join('|');
// 本題本混合多個來源，每題都會指定原始來源資料夾；group 可省略，預設用 ANSWER_GROUP；題本混合不同來源時可逐題指定資料夾
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
<td ${LIST_TD(false, false)}>【七年級】數線上的距離</td>
<td ${LIST_TD(false, false)}>T1-1 輸入輸出與公式計算－輸入輸出</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("1", `【七年級】數線上的距離`, `T1-1 輸入輸出與公式計算－輸入輸出｜國中基礎練習`)}
${desc(`
七年級學到數線與絕對值：數線上兩點 A、B 的距離 = |A - B|。登山隊記錄了各休息點的海拔變化，以出發點為 0，往上為正、往下為負。<br/>
請寫一個程式，輸入兩個點在數線上的位置，輸出兩點距離以及兩點的中點位置。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數 A、B (-10000 ~ 10000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩點距離、中點位置 (中點若不是整數，輸出一位小數，例如 -2.5)。
`)}
${sample(1,
`-3<br/>
5`,
`8 1`,
`距離 |-3 - 5| = 8，中點 (-3 + 5) ÷ 2 = 1，輸出 8 1。`)}
${sample(2,
`-7<br/>
2`,
`9 -2.5`,
`距離 |-7 - 2| = 9，中點 (-7 + 2) ÷ 2 = -2.5，輸出 9 -2.5。`,
`{"data": ["-3;5;8;1", "-7;2;9;-2.5", "0;0;0;0", "10000;-10000;20000;0", "-15;-4;11;-9.5"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【七年級】數線上的距離`, `國中基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>2</td>
<td ${LIST_TD(false, false)}>【七年級】每分鐘的心輸出量</td>
<td ${LIST_TD(false, false)}>T1-2 輸入輸出與公式計算－公式計算</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("2", `【七年級】每分鐘的心輸出量`, `T1-2 輸入輸出與公式計算－公式計算｜國中基礎練習`)}
${desc(`
心臟每跳動一次會打出一定量的血液 (每搏輸出量，毫升)。每分鐘心輸出量 = 心跳數 × 每搏輸出量。<br/>
請寫一個程式，輸入每分鐘心跳數與每搏輸出量，輸出每分鐘心輸出量是幾公升 (去掉末尾的 0)，以及 1 小時共打出幾公升。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：每分鐘心跳數 (40 ~ 200)、每搏輸出量 (毫升，30 ~ 150)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出每分鐘心輸出量與每小時心輸出量 (公升，去掉末尾的 0)。
`)}
${sample(1,
`72<br/>
70`,
`5.04 302.4`,
`72 × 70 = 5040 毫升 = 5.04 公升；每小時 5.04 × 60 = 302.4 公升，輸出 5.04 302.4。`)}
${sample(2,
`100<br/>
50`,
`5 300`,
`100 × 50 = 5000 毫升 = 5 公升；每小時 300 公升，輸出 5 300。`,
`{"data": ["72;70;5.04;302.4", "100;50;5;300", "60;100;6;360", "45;120;5.4;324", "180;33;5.94;356.4"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【七年級】每分鐘的心輸出量`, `國中基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>3</td>
<td ${LIST_TD(false, false)}>【七年級】攝氏與華氏溫度</td>
<td ${LIST_TD(false, false)}>T1-3 輸入輸出與公式計算－換算公式</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("3", `【七年級】攝氏與華氏溫度`, `T1-3 輸入輸出與公式計算－換算公式｜國中基礎練習`)}
${desc(`
溫度的兩種單位換算：華氏 = 攝氏 × 9 ÷ 5 + 32；攝氏 = (華氏 - 32) × 5 ÷ 9。<br/>
請寫一個程式，輸入一個溫度與它的單位 (C 代表攝氏、F 代表華氏)，換算成另一種單位，四捨五入到小數點後第 1 位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入：溫度 (整數，-100 ~ 500)、單位 (C 或 F)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出換算後的溫度 (四捨五入到小數第 1 位，末尾的 0 不輸出) 與單位 (F 或 C)。
`)}
${sample(1,
`100<br/>
C`,
`212 F`,
`100 × 9 ÷ 5 + 32 = 212，輸出 212 F。`)}
${sample(2,
`98<br/>
F`,
`36.7 C`,
`(98 - 32) × 5 ÷ 9 = 36.66…，四捨五入為 36.7，輸出 36.7 C。`,
`{"data": ["100;C;212;F", "98;F;36.7;C", "37;C;98.6;F", "-40;F;-40;C", "0;F;-17.8;C"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【七年級】攝氏與華氏溫度`, `國中基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>4</td>
<td ${LIST_TD(false, false)}>清潔費</td>
<td ${LIST_TD(false, false)}>T2-1 整除、餘數與單位換算－整除</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("4", `清潔費`, `T2-1 整除、餘數與單位換算－整除｜國中基礎應用`)}
${desc(`
園遊會擺攤清潔費規則：攤位收入金額每滿 500 元（不足 500 元的部分捨去），收取 10 元清潔費。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
輸入一個非負整數，代表攤位的收入金額（元）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表應繳交的清潔費金額（元）。
`)}
${sample(1,
`1300`,
`20`,
`收入 1300 元，每滿 500 元收 10 元清潔費，1300÷500=2（捨去餘數 300 元），故清潔費為 2×10=20 元。`,
`{"data": ["0;0", "499;0", "500;10", "1300;20"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`清潔費`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>5</td>
<td ${LIST_TD(false, false)}>生日派對禮物分配</td>
<td ${LIST_TD(false, false)}>T2-2 整除、餘數與單位換算－餘數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("5", `生日派對禮物分配`, `T2-2 整除、餘數與單位換算－餘數｜國中基礎應用`)}
${desc(`
派對上有一袋糖果，要平分給現場的小朋友（人數皆為正整數）。請計算每個人平均可以分到幾顆（取整數，無條件捨去餘數），以及最後剩下幾顆沒分完。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個非負整數，代表糖果總數。<br/>
第 2 行輸入一個正整數，代表現場小朋友的人數。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
依序輸出兩行整數：<br/>
第 1 行為每人分到的顆數。<br/>
第 2 行為剩餘的顆數。
`)}
${sample(1,
`23<br/>
5`,
`4<br/>
3`,
`23 顆糖果分給 5 人，每人可分到 23÷5=4 顆（捨去餘數），剩下 23-5×4=3 顆。`,
`{"data": ["0;5;0;0", "23;5;4;3", "10;10;1;0", "999999;7;142857;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`生日派對禮物分配`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>6</td>
<td ${LIST_TD(false, false)}>秒數轉換</td>
<td ${LIST_TD(false, false)}>T2-3 整除、餘數與單位換算－單位換算</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("6", `秒數轉換`, `T2-3 整除、餘數與單位換算－單位換算｜114雲林縣國中組`)}
${desc(`
體育課跑步計時器會記錄「總秒數」，但老師希望顯示成「幾分幾秒」的格式。<br/>
請輸入一個整數，代表「總秒數」，再將其轉換為 X 分鐘數 (整數) 與 Y 剩餘秒數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表總秒數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出格式為「X 分 Y 秒」，依序輸出分鐘數、分、剩餘秒數、秒。
`)}
${sample(1,
`125`,
`2 分 5 秒`,
`總秒數 125，125 秒 = 2 分 5 秒，所以輸出 2 分 5 秒。`)}
${sample(2,
`360`,
`6 分 0 秒`,
`總秒數 360，360 秒 = 6 分 0 秒。`,
`{"data": ["125;2;分;5;秒", "360;6;分;0;秒"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`秒數轉換`, `114雲林縣國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>7</td>
<td ${LIST_TD(false, false)}>加權成績計算</td>
<td ${LIST_TD(false, false)}>T3-1 條件判斷：區間分級－二選一</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("7", `加權成績計算`, `T3-1 條件判斷：區間分級－二選一｜國中基礎應用`)}
${desc(`
加權成績計算公式為：總分 = 平時成績×30% + 期中成績×30% + 期末成績×40%。若總分達到 60 分（含）以上，判定為「及格」；否則為「不及格」。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
依序輸入三個實數，分別代表平時成績、期中成績、期末成績。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出字串「及格」或「不及格」。
`)}
${sample(1,
`50<br/>
70<br/>
65`,
`及格`,
`總分=50×0.3+70×0.3+65×0.4=15+21+26=62 分，達到 60 分（含）以上，故判定為及格。`,
`{"data": ["50;70;65;及格", "0;0;0;不及格", "100;100;100;及格", "60;60;60;及格"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`加權成績計算`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>8</td>
<td ${LIST_TD(false, false)}>班級考試成績分級</td>
<td ${LIST_TD(false, false)}>T3-2 條件判斷：區間分級－區間分級</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("8", `班級考試成績分級`, `T3-2 條件判斷：區間分級－區間分級｜國中基礎應用`)}
${desc(`
成績分級標準：90 分（含）以上為 A；80 分至 89 分（含）為 B；70 分至 79 分（含）為 C；未滿 70 分（不含 70 分）為 D。請統計全班各等級的人數。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個正整數 N，代表總人數。<br/>
接下來 N 行，每行輸入一個整數（0~100），代表一位學生的分數。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
依序輸出四行整數，分別代表 A、B、C、D 等級的人數。
`)}
${sample(1,
`4<br/>
95<br/>
85<br/>
72<br/>
60`,
`1<br/>
1<br/>
1<br/>
1`,
`95 分為 A，85 分為 B，72 分為 C，60 分未滿 70 分為 D。`,
`{"data": ["1;90;1;0;0;0", "1;69;0;0;0;1", "4;95;85;72;60;1;1;1;1", "6;70;79;80;89;90;100;2;2;2;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`班級考試成績分級`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>9</td>
<td ${LIST_TD(false, false)}>快遞運費計算</td>
<td ${LIST_TD(false, false)}>T3-3 條件判斷：區間分級－分段計費</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("9", `快遞運費計算`, `T3-3 條件判斷：區間分級－分段計費｜國中基礎應用`)}
${desc(`
快遞公司收費規則：包裹重量在 5 公斤（含）以下，收費 50 元；超過 5 公斤至 10 公斤（含），收費 80 元；超過 10 公斤（不含 10 公斤），收費 100 元。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
輸入一個正實數，代表包裹重量（公斤）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表總運費（元）。
`)}
${sample(1,
`7.5`,
`80`,
`7.5 公斤超過 5 公斤但未超過 10 公斤，收費 80 元。`,
`{"data": ["5;50", "5.5;80", "10;80", "10.1;100", "100;100"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`快遞運費計算`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 10 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>10</td>
<td ${LIST_TD(false, false)}>三角形類型判別</td>
<td ${LIST_TD(false, false)}>T4-1 邏輯運算：且／或／巢狀－且（兩個都要成立）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("10", `三角形類型判別`, `T4-1 邏輯運算：且／或／巢狀－且（兩個都要成立）｜國中基礎應用`)}
${desc(`
輸入三個正整數，代表三角形的三邊長。請先判斷這三邊是否能組成三角形（任兩邊之和必須大於第三邊，若不滿足則不能組成三角形）；若能組成三角形，再判斷是「等邊三角形」（三邊都相等）、「等腰三角形」（恰好有兩邊相等）或「一般三角形」（三邊都不相等）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
依序輸入三個正整數，分別代表三角形的三個邊長。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個字串，內容為「非三角形」、「等邊三角形」、「等腰三角形」或「一般三角形」之一。
`)}
${sample(1,
`5<br/>
5<br/>
8`,
`等腰三角形`,
`5+5&gt;8、5+8&gt;5、5+8&gt;5，能組成三角形；其中有兩邊相等（5=5），故為等腰三角形。`,
`{"data": ["1;1;3;非三角形", "5;5;5;等邊三角形", "5;5;8;等腰三角形", "3;4;5;一般三角形"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`三角形類型判別`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 11 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>11</td>
<td ${LIST_TD(false, false)}>社團錄取綜合條件</td>
<td ${LIST_TD(false, false)}>T4-2 邏輯運算：且／或／巢狀－或（一個成立就可以）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("11", `社團錄取綜合條件`, `T4-2 邏輯運算：且／或／巢狀－或（一個成立就可以）｜國中基礎應用`)}
${desc(`
社團甄選標準：（筆試分數達到 80 分（含）以上，且比賽次數達到 2 次（含）以上）成立，或是具備特殊才藝，只要符合其中一個條件即可錄取。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個整數，代表筆試分數。<br/>
第 2 行輸入一個非負整數，代表比賽次數。<br/>
第 3 行輸入一個字串，內容為「是」或「否」，代表是否具備特殊才藝。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出字串「是」或「否」，代表是否錄取。
`)}
${sample(1,
`85<br/>
1<br/>
否`,
`否`,
`筆試 85 分達到 80 分以上，但比賽次數只有 1 次，未達 2 次以上，「且」條件不成立；又沒有特殊才藝，兩個條件皆不符合，故不予錄取。`,
`{"data": ["85;1;否;否", "80;2;否;是", "0;0;是;是", "79;5;否;否"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`社團錄取綜合條件`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 12 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>12</td>
<td ${LIST_TD(false, false)}>閏年判斷</td>
<td ${LIST_TD(false, false)}>T4-3 邏輯運算：且／或／巢狀－巢狀（判斷裡再判斷）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("12", `閏年判斷`, `T4-3 邏輯運算：且／或／巢狀－巢狀（判斷裡再判斷）｜國中基礎應用`)}
${desc(`
判斷西元年份是否為閏年，規則如下（依序判斷）：<br/>
1. 若年份能被 400 整除，為閏年。<br/>
2. 否則，若能被 100 整除，為平年。<br/>
3. 否則，若能被 4 整除，為閏年。<br/>
4. 以上皆不符合，為平年。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
輸入一個正整數，代表西元年份。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出字串「閏年」或「平年」。
`)}
${sample(1,
`2000`,
`閏年`,
`2000 能被 400 整除，依規則 1 判定為閏年。`,
`{"data": ["2000;閏年", "1900;平年", "2024;閏年", "2023;平年"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`閏年判斷`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 13 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>13</td>
<td ${LIST_TD(false, false)}>及格考科統計</td>
<td ${LIST_TD(false, false)}>T5-1 迴圈：計數、累加、平均－計數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("13", `及格考科統計`, `T5-1 迴圈：計數、累加、平均－計數｜國中基礎應用`)}
${desc(`
輸入 5 科成績，統計該學生共有幾科達到 60 分（含）以上（及格）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
依序輸入 5 個整數（0~100），分別代表 5 科的成績。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表及格的科目總數。
`)}
${sample(1,
`55<br/>
60<br/>
72<br/>
88<br/>
40`,
`3`,
`5 科成績中，60、72、88 皆達到 60 分（含）以上，共 3 科及格。`,
`{"data": ["55;60;72;88;40;3", "0;0;0;0;0;0", "100;100;100;100;100;5", "59;60;61;60;59;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`及格考科統計`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 14 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>14</td>
<td ${LIST_TD(false, false)}>營業收入累計</td>
<td ${LIST_TD(false, false)}>T5-2 迴圈：計數、累加、平均－累加</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("14", `營業收入累計`, `T5-2 迴圈：計數、累加、平均－累加｜國中基礎應用`)}
${desc(`
商店記錄了 N 天的營業額，請計算這段期間的總收入，以及平均每天的收入（四捨五入到小數點後 1 位）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個正整數 N，代表天數。<br/>
接下來 N 行，每行輸入一個非負整數，代表一天的營業額（元）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
依序輸出兩行：<br/>
第 1 行輸出一個整數，代表總收入。<br/>
第 2 行輸出一個數字（四捨五入到小數點後 1 位），代表平均每天的收入。
`)}
${sample(1,
`3<br/>
1000<br/>
1500<br/>
2000`,
`4500<br/>
1500.0`,
`3 天總收入為 1000+1500+2000=4500 元，平均每天收入為 4500÷3=1500.0 元。`,
`{"data": ["1;0;0;0", "3;1000;1500;2000;4500;1500", "2;1;2;3;1.5", "5;1000000;1000000;1000000;1000000;1000000;5000000;1000000"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`營業收入累計`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 15 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>15</td>
<td ${LIST_TD(false, false)}>成績統計</td>
<td ${LIST_TD(false, false)}>T5-3 迴圈：計數、累加、平均－平均</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("15", `成績統計`, `T5-3 迴圈：計數、累加、平均－平均｜114雲林縣國中組`)}
${desc(`
老師要統計班上這次月考的成績情形。請先輸入學生人數 N，接著輸入 N 個整數 (每位學生的分數)。<br/>
你的程式需要：<br/>
1. 計算平均分數 (四捨五入到整數位)。<br/>
2. 計算低於平均分的學生數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為學生人數 N，接下來 N 個輸入依序為每位學生的分數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出平均分數和低於平均的人數。若 N ≤ 0，或資料中出現負分，輸出 ERROR。
`)}
${sample(1,
`5<br/>
80<br/>
75<br/>
90<br/>
60<br/>
100`,
`81 3`,
`平均：405 ÷ 5 = 81，低於 81 的有 80、75、60 共 3 人，所以輸出 81 3。`)}
${sample(2,
`4<br/>
50<br/>
40<br/>
50<br/>
41`,
`45 2`,
`平均：181 ÷ 4 = 45.25，四捨五入為 45，低於 45 的有 40、41 共 2 人，所以輸出 45 2。`,
`{"data": ["5;80;75;90;60;100;81;3", "4;50;40;50;41;45;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`成績統計`, `114雲林縣國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 16 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>16</td>
<td ${LIST_TD(false, false)}>月度營收分析</td>
<td ${LIST_TD(false, false)}>T6-1 極值：最大、最小、全距－最大</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("16", `月度營收分析`, `T6-1 極值：最大、最小、全距－最大｜國中基礎應用`)}
${desc(`
記錄一整年 12 個月的營收，請找出營收最高與最低的月份（以月份編號 1~12 表示；若有並列，取月份編號最小者），並計算第四季（10、11、12 月）與第三季（7、8、9 月）的營收總和，判斷第四季是否比第三季成長（第四季總和嚴格大於第三季總和才算成長）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
依序輸入 12 個非負整數，分別代表 1 月至 12 月的營收金額。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
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
`最高營收為 220 元（12 月），最低為 90 元（3 月）。第三季（7、8、9 月）總和=150+160+170=480；第四季（10、11、12 月）總和=200+210+220=630，630&gt;480，故成長，輸出「是」。`,
`{"data": ["100;120;90;110;130;140;150;160;170;200;210;220;12;3;是", "0;0;0;0;0;0;0;0;0;0;0;0;1;1;否", "12;11;10;9;8;7;6;5;4;3;2;1;1;12;否", "100;100;100;100;100;100;100;100;100;50;50;50;1;10;否"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`月度營收分析`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 17 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>17</td>
<td ${LIST_TD(false, false)}>公園健走計時排名</td>
<td ${LIST_TD(false, false)}>T6-2 極值：最大、最小、全距－最小</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("17", `公園健走計時排名`, `T6-2 極值：最大、最小、全距－最小｜國中基礎應用`)}
${desc(`
記錄多位民眾健走 3 公里所花費的時間（秒），請找出花費時間最少（走最快）的前三名時間（由小到大輸出；參加人數保證至少為 3 人）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個正整數 N（N≥3），代表參加人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位參加者花費的時間（秒）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
依序輸出三行整數，由小到大分別代表前三名的秒數。
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
`所有時間排序後由小到大為 1050、1100、1200、1300、1500，前三名（最快的三個時間）為 1050、1100、1200。`,
`{"data": ["5;1200;1100;1500;1050;1300;1050;1100;1200", "3;1;2;3;1;2;3", "4;100;100;100;100;100;100;100", "3;999999;1;500000;1;500000;999999"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`公園健走計時排名`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 18 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>18</td>
<td ${LIST_TD(false, false)}>溫差最大的一天</td>
<td ${LIST_TD(false, false)}>T6-3 極值：最大、最小、全距－全距</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("18", `溫差最大的一天`, `T6-3 極值：最大、最小、全距－全距｜本公告自編`)}
${desc(`
氣象小組記錄了連續 N 天的最高溫與最低溫，每天的溫差 = 最高溫 − 最低溫。<br/>
請寫一個程式，找出溫差最大的是第幾天，以及那一天的溫差。若有好幾天溫差一樣大，輸出最早的那一天。<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N（1 ~ 31）；接下來 N 行，每行輸入兩個整數，分別是當天的最高溫與最低溫（-20 ~ 45）。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數：溫差最大的是第幾天、那一天的溫差。
`)}
${sample(1,
`4<br/>
30 22<br/>
28 24<br/>
33 23<br/>
31 25`,
`3 10`,
`4 天的溫差依序是 8、4、10、6，第 3 天溫差 10 度最大，輸出 3 10。`)}
${sample(2,
`3<br/>
30 20<br/>
35 25<br/>
28 18`,
`1 10`,
`3 天的溫差都是 10 度，輸出最早的第 1 天，輸出 1 10。`,
`{"data": ["4;30;22;28;24;33;23;31;25;3;10", "1;25;20;1;5", "3;30;20;35;25;28;18;1;10", "2;10;-2;5;-10;2;15", "5;18;12;22;9;20;7;16;10;24;11;2;13"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`溫差最大的一天`, `本公告自編`)}</span>
</td>
</tr>
`;

// ---------------- 第 19 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>19</td>
<td ${LIST_TD(false, false)}>【七年級】細菌分裂</td>
<td ${LIST_TD(false, false)}>T7-1 規律、數列與逐步模擬－規律</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("19", `【七年級】細菌分裂`, `T7-1 規律、數列與逐步模擬－規律｜國中基礎練習`)}
${desc(`
生物課學到細菌以「分裂生殖」繁殖：1 個細菌每經過 T 分鐘就分裂成 2 個。一開始有 A 個細菌，在適合的環境下不斷分裂。<br/>
請寫一個程式，輸入 A、T 與經過的時間 M 分鐘，輸出細菌的數量。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：初始數量 A (1 ~ 100)、分裂一次所需時間 T (1 ~ 60 分鐘)、經過的時間 M (0 ~ 1200 分鐘)。題目保證答案不超過 10¹⁵。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表 M 分鐘後的細菌數量。
`)}
${sample(1,
`1<br/>
20<br/>
60`,
`8`,
`60 分鐘分裂 3 次，1 × 2 × 2 × 2 = 8，輸出 8。`)}
${sample(2,
`3<br/>
30<br/>
100`,
`24`,
`100 分鐘內分裂 3 次 (第 30、60、90 分鐘)，3 × 8 = 24，輸出 24。`,
`{"data": ["1;20;60;8", "3;30;100;24", "5;10;0;5", "100;25;1000;109951162777600", "1;1;49;562949953421312"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【七年級】細菌分裂`, `國中基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 20 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>20</td>
<td ${LIST_TD(false, false)}>【八年級】等差數列與等差級數</td>
<td ${LIST_TD(false, false)}>T7-2 規律、數列與逐步模擬－數列</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("20", `【八年級】等差數列與等差級數`, `T7-2 規律、數列與逐步模擬－數列｜國中基礎練習`)}
${desc(`
八年級學到等差數列：首項 a₁、公差 d，第 n 項 aₙ = a₁ + (n - 1)d；前 n 項和 Sₙ = (a₁ + aₙ) × n ÷ 2。<br/>
請寫一個程式，輸入 a₁、d、n，輸出第 n 項與前 n 項和。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數：首項 a₁ (-1000 ~ 1000)、公差 d (-100 ~ 100)、項數 n (1 ~ 1000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出第 n 項與前 n 項和。
`)}
${sample(1,
`3<br/>
4<br/>
10`,
`39 210`,
`a₁₀ = 3 + 9 × 4 = 39，S₁₀ = (3 + 39) × 10 ÷ 2 = 210，輸出 39 210。`)}
${sample(2,
`100<br/>
-7<br/>
15`,
`2 765`,
`a₁₅ = 100 + 14 × (-7) = 2，S₁₅ = (100 + 2) × 15 ÷ 2 = 765，輸出 2 765。`,
`{"data": ["3;4;10;39;210", "100;-7;15;2;765", "5;0;1;5;5", "1;1;1000;1000;500500", "-50;3;40;67;340"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【八年級】等差數列與等差級數`, `國中基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 21 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>21</td>
<td ${LIST_TD(false, false)}>手機電量充電模擬</td>
<td ${LIST_TD(false, false)}>T7-3 規律、數列與逐步模擬－逐步模擬</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("21", `手機電量充電模擬`, `T7-3 規律、數列與逐步模擬－逐步模擬｜114雲林縣國中組`)}
${desc(`
小華的手機目前電量為 B%。他將手機接上充電器，充電速度為每分鐘增加 2% 電量，最高只能充到 100%。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：B 為目前電量 (0 ~ 100)，T 為充電時間 (分鐘，0 ~ 300)。<br/>
<span ${LBL_OUT}>輸出說明</span>經過 T 分鐘後，輸出最終電量，格式為 X% (例如 70%)。如果輸入的電量或時間不在範圍內 (例如：負數、超過上限)，輸出 ERROR。
`)}
${sample(1,
`50<br/>
10`,
`70%`,
`充電 10 分鐘 → 增加 20%，變成 70%，所以輸出 70%。`)}
${sample(2,
`90<br/>
20`,
`100%`,
`充電 20 分鐘 → 增加 40%，但最高只能充到 100%，所以輸出 100%。`,
`{"data": ["50;10;70%", "90;20;100%"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`手機電量充電模擬`, `114雲林縣國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 22 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>22</td>
<td ${LIST_TD(false, false)}>【七年級】質因數分解</td>
<td ${LIST_TD(false, false)}>T8-1 數論：因數、質數、公因倍數－因數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("22", `【七年級】質因數分解`, `T8-1 數論：因數、質數、公因倍數－因數｜國中基礎練習`)}
${desc(`
七年級學到質因數分解：把一個大於 1 的整數寫成質數的乘積，例如 360 = 2 × 2 × 2 × 3 × 3 × 5。<br/>
請寫一個程式，輸入一個整數，由小到大輸出它所有的質因數 (重複的也要輸出)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N (2 ~ 1000000)。<br/>
<span ${LBL_OUT}>輸出說明</span>由小到大依序輸出 N 的質因數 (含重複)。
`)}
${sample(1,
`360`,
`2 2 2 3 3 5`,
`360 = 2 × 2 × 2 × 3 × 3 × 5，輸出 2 2 2 3 3 5。`)}
${sample(2,
`97`,
`97`,
`97 是質數，輸出 97。`,
`{"data": ["360;2;2;2;3;3;5", "97;97", "1024;2;2;2;2;2;2;2;2;2;2", "999999;3;3;3;7;11;13;37", "2;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【七年級】質因數分解`, `國中基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 23 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>23</td>
<td ${LIST_TD(false, false)}>質數判斷</td>
<td ${LIST_TD(false, false)}>T8-2 數論：因數、質數、公因倍數－質數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("23", `質數判斷`, `T8-2 數論：因數、質數、公因倍數－質數｜國中基礎應用`)}
${desc(`
判斷一個正整數是否為質數。質數的定義為：大於 1，且除了 1 和自己以外沒有其他因數（注意：1 不是質數）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
輸入一個正整數 N（N≥1）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出字串「YES」（是質數）或「NO」（不是質數）。
`)}
${sample(1,
`17`,
`YES`,
`17 只能被 1 和 17 整除，沒有其他因數，是質數，故輸出 YES。`,
`{"data": ["1;NO", "2;YES", "17;YES", "100;NO"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`質數判斷`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 24 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>24</td>
<td ${LIST_TD(false, false)}>最大公因數</td>
<td ${LIST_TD(false, false)}>T8-3 數論：因數、質數、公因倍數－最大公因數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("24", `最大公因數`, `T8-3 數論：因數、質數、公因倍數－最大公因數｜國中基礎應用`)}
${desc(`
輸入兩個正整數，計算並輸出兩數的最大公因數（GCD）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個正整數。<br/>
第 2 行輸入一個正整數。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表兩數的最大公因數。
`)}
${sample(1,
`24<br/>
36`,
`12`,
`24 與 36 的最大公因數為 12。`,
`{"data": ["24;36;12", "1;1;1", "7;13;1", "1000000;500000;500000"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`最大公因數`, `國中基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 25 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>25</td>
<td ${LIST_TD(false, false)}>三路公車同時發車</td>
<td ${LIST_TD(false, false)}>T8-4 數論：因數、質數、公因倍數－最小公倍數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("25", `三路公車同時發車`, `T8-4 數論：因數、質數、公因倍數－最小公倍數｜本公告自編`)}
${desc(`
轉運站有三路公車同時在早上發出第一班車，之後 A 路每 a 分鐘一班、B 路每 b 分鐘一班、C 路每 c 分鐘一班。<br/>
請寫一個程式，算出最少再經過幾分鐘，三路公車會再一次同時發車。<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數 a、b、c（1 ~ 60）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表經過幾分鐘後三路公車再次同時發車。
`)}
${sample(1,
`6<br/>
8<br/>
12`,
`24`,
`6、8、12 的最小公倍數是 24，輸出 24。`)}
${sample(2,
`10<br/>
15<br/>
20`,
`60`,
`10、15、20 的最小公倍數是 60，輸出 60。`,
`{"data": ["6;8;12;24", "10;15;20;60", "7;7;7;7", "4;6;9;36", "5;7;9;315"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`三路公車同時發車`, `本公告自編`)}</span>
</td>
</tr>
`;

// ---------------- 第 26 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>26</td>
<td ${LIST_TD(false, false)}>到底是誰沒來？</td>
<td ${LIST_TD(false, false)}>T9-1 清單：搜尋、統計、排序－搜尋</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("26", `到底是誰沒來？`, `T9-1 清單：搜尋、統計、排序－搜尋｜114基隆市國中組`)}
${desc(`
最近流感大爆發，今天全校有很多同學缺席。請寫一個程式，根據出席清單，找出缺席的座號。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個正整數 N (1 ≤ N ≤ 30)，代表全班總人數。<br/>
第二行輸入一個正整數 K (K ≤ N)，代表出席人數。<br/>
第三行輸入 K 個正整數，代表有出席同學的座號。注意：出席的座號不一定會照座號大小順序輸入。<br/>
<span ${LBL_OUT}>輸出說明</span>依照座號從小到大，輸出缺席的座號；如果全班都到了，請輸出「全勤」。
`)}
${sample(1,
`5<br/>
5<br/>
5 2 4 1 3`,
`全勤`,
``)}
${sample(2,
`10<br/>
4<br/>
3 1 5 8`,
`2 4 6 7 9 10`,
``)}
${sample(3,
`15<br/>
7<br/>
3 8 1 12 5 10 14`,
`2 4 6 7 9 11 13 15`,
``)}
${sample(4,
`3<br/>
3<br/>
1 2 3`,
`全勤`,
``)}
${sample(5,
`7<br/>
5<br/>
5 2 4 1 3`,
`6 7`,
``)}
${sample(6,
`10<br/>
9<br/>
1 2 3 4 5 6 7 8 9`,
`10`,
``)}
${sample(7,
`4<br/>
1<br/>
2`,
`1 3 4`,
``)}
${sample(8,
`15<br/>
7<br/>
3 8 1 12 5 10 14`,
`2 4 6 7 9 11 13 15`,
``,
`{"data": ["5;5;5;2;4;1;3;全勤", "10;4;3;1;5;8;2;4;6;7;9;10", "15;7;3;8;1;12;5;10;14;2;4;6;7;9;11;13;15", "3;3;1;2;3;全勤", "7;5;5;2;4;1;3;6;7"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`到底是誰沒來？`, `114基隆市國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 27 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>27</td>
<td ${LIST_TD(false, false)}>【九年級】眾數</td>
<td ${LIST_TD(false, false)}>T9-2 清單：搜尋、統計、排序－統計</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("27", `【九年級】眾數`, `T9-2 清單：搜尋、統計、排序－統計｜國中基礎練習`)}
${desc(`
統計資料中出現次數最多的數值稱為眾數，眾數可能不只一個。自然課記錄了全班測量的植物高度。<br/>
請寫一個程式，輸入所有高度，由小到大輸出所有眾數，最後輸出眾數出現的次數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入一個整數 N (1 ~ 50)；接著依序輸入 N 個整數 (1 ~ 1000)。<br/>
<span ${LBL_OUT}>輸出說明</span>由小到大輸出所有眾數，最後輸出眾數出現的次數。
`)}
${sample(1,
`8<br/>
12 15 12 18 15 12 20 15`,
`12 15 3`,
`12 和 15 各出現 3 次，輸出 12 15 3。`)}
${sample(2,
`5<br/>
7 3 9 3 1`,
`3 2`,
`3 出現 2 次最多，輸出 3 2。`,
`{"data": ["8;12;15;12;18;15;12;20;15;12;15;3", "5;7;3;9;3;1;3;2", "1;100;100;1", "6;5;5;5;5;5;5;5;6", "7;1;2;3;4;5;6;7;1;2;3;4;5;6;7;1"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【九年級】眾數`, `國中基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 28 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>28</td>
<td ${LIST_TD(false, false)}>列出成績排名</td>
<td ${LIST_TD(false, false)}>T9-3 清單：搜尋、統計、排序－排序</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("28", `列出成績排名`, `T9-3 清單：搜尋、統計、排序－排序｜114彰化縣國中組`)}
${desc(`
海豐國小派出五位學生去參加程式設計比賽，假設五個人的成績分別是：72、68、89、92、54。<br/>
現在老師要將這五個人的分數採遞增排序，請印出排序後第三個分數為多少？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>共有五筆成績，依序分次輸入，皆為整數分數 (0 ≤ 分數 ≤ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出遞增排序後第三個分數。
`)}
${sample(1,
`72<br/>
68<br/>
89<br/>
92<br/>
54`,
`72`,
``)}
${sample(2,
`47<br/>
32<br/>
13<br/>
8<br/>
66`,
`32`,
``)}
${sample(3,
`72<br/>
62<br/>
11<br/>
55<br/>
12`,
`55`,
``)}
${sample(4,
`67<br/>
7<br/>
89<br/>
42<br/>
0`,
`42`,
``)}
${sample(5,
`95<br/>
23<br/>
60<br/>
48<br/>
64`,
`60`,
``)}
${sample(6,
`40<br/>
6<br/>
37<br/>
24<br/>
31`,
`31`,
``,
`{"data": ["72;68;89;92;54;72", "47;32;13;8;66;32", "72;62;11;55;12;55", "67;7;89;42;0;42", "95;23;60;48;64;60"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`列出成績排名`, `114彰化縣國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 29 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>29</td>
<td ${LIST_TD(false, false)}>卡住的鍵盤</td>
<td ${LIST_TD(false, false)}>T10-1 字串處理與編碼－字串處理</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("29", `卡住的鍵盤`, `T10-1 字串處理與編碼－字串處理｜114花蓮縣國中組`)}
${desc(`
小明的鍵盤壞掉了，有時候按一個鍵，螢幕上卻會連續出現好幾個一樣的字 (例如按 A 變成 AAAA)。現在給你一串小明打出來的亂碼，請你幫忙分析看看，是哪一個按鍵卡住最久 (連續出現最多次)？<br/>
規則：<br/>
1. 請找出字串中，連續出現最多次的字母是哪一個。<br/>
2. 輸出該字母以及它連續出現的次數。<br/>
3. 平手規則：如果有兩個字母的連續次數一樣多，請輸出最先出現的那一個。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個由大寫英文字母組成的字串 S (例如：AAABCCCCDD)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出該字母與次數。
`)}
${sample(1,
`WWWWWWWWWWWWBBWW`,
`W 12`,
`前面的 W 連續出現 12 次，是最多的。`)}
${sample(2,
`AAABCCCC`,
`C 4`,
`C 連續出現 4 次是最多的。`,
`{"data": ["WWWWWWWWWWWWBBWW;W;12", "AAABCCCC;C;4"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`卡住的鍵盤`, `114花蓮縣國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 30 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>30</td>
<td ${LIST_TD(false, false)}>檢查碼</td>
<td ${LIST_TD(false, false)}>T10-2 字串處理與編碼－字串檢查</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("30", `檢查碼`, `T10-2 字串處理與編碼－字串檢查｜114桃園市國中組`)}
${desc(`
書店的會員卡買書可以 8 折優惠，書店老闆為了避免有人偽造會員卡，於是在會員卡號上加入檢查碼。會員卡的編號格式：一個英文字母 + 4 個數字 + 一個檢查碼。<br/>
英文字母對應的數字如下表：<br/>
A        B        C        D<br/>
11        13        15        17<br/>
如果 (英文字母對應的數字 + 4 個數字 + 檢查碼) 除以 5 的餘數是 4，就是正確的會員卡號，其他餘數都是不正確的。<br/>
正確的會員卡號例如 B + 2013 + 檢查碼 5：B20135 = 13+2+0+1+3+5 = 24，24÷5=4 餘 4，所以這是一個正確的會員卡。<br/>
不正確的會員卡號例如 A + 1527 + 檢查碼 4：A15274 = 11+1+5+2+7+4 = 30，30÷5=6 餘 0，所以這是一個不正確的會員卡。<br/>
請你寫一個程式，讓書店老闆可以快速知道會員卡號碼是否正確，正確請輸出 yes，不正確請輸出 no。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個會員卡號字串 (一個大寫英文字母接 5 個數字)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 yes 或 no。
`)}
${sample(1,
`C20351`,
`no`,
`C20351 = 15+2+0+3+5+1 = 26，26÷5=5 餘 1，所以這不是一個正確的會員卡。`)}
${sample(2,
`D15713`,
`yes`,
`D15713 = 17+1+5+7+1+3 = 34，34÷5=6 餘 4，所以這是一個正確的會員卡。`,
`{"data": ["C20351;no", "D15713;yes"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`檢查碼`, `114桃園市國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 31 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>31</td>
<td ${LIST_TD(false, false)}>神秘留言解碼器</td>
<td ${LIST_TD(false, false)}>T10-3 字串處理與編碼－編碼與解碼</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("31", `神秘留言解碼器`, `T10-3 字串處理與編碼－編碼與解碼｜114澎湖縣國中組`)}
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
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`神秘留言解碼器`, `114澎湖縣國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 32 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>32</td>
<td ${LIST_TD(false, false)}>遊樂場</td>
<td ${LIST_TD(false, false)}>T11-1 演算法策略：窮舉、貪婪、DP－窮舉（全部試一遍）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("32", `遊樂場`, `T11-1 演算法策略：窮舉、貪婪、DP－窮舉（全部試一遍）｜114臺南市國中組`)}
${desc(`
三六九主題遊樂園，門票分成兒童票、成人票兩種。兒童票每張票價 400 元，成人票每張票價 500 元，另有親子套票組 (1 張兒童票及 1 張成人票) 每組 800 元。<br/>
請設計一個程式，依序輸入兒童人數、成人人數，算出最優惠的價格。
`)}
${sample(1,
`5<br/>
5`,
`4000`,
`輸入兒童人數：5<br/>
輸入成人人數：5<br/>
可購買 5 組親子套票組，總價 4000 元。`)}
${sample(2,
`6<br/>
3`,
`3600`,
`輸入兒童人數：6<br/>
輸入成人人數：3<br/>
可購買 3 組親子套票組、3 張兒童票，總價 3600 元。`)}
${sample(3,
`0<br/>
10`,
`5000`,
`輸入兒童人數：0<br/>
輸入成人人數：10<br/>
可購買 10 張成人票，總價 5000 元。`)}
${sample(4,
`8<br/>
4`,
`4800`,
`輸入兒童人數：8<br/>
輸入成人人數：4<br/>
可購買 4 組親子套票組、4 張兒童票，總價 4800 元。`)}
${sample(5,
`10<br/>
10`,
`8000`,
`輸入兒童人數：10<br/>
輸入成人人數：10<br/>
可購買 10 組親子套票組，總價 8000 元。`,
`{"data": ["5;5;4000", "6;3;3600", "0;10;5000", "8;4;4800", "10;10;8000"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`遊樂場`, `114臺南市國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 33 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>33</td>
<td ${LIST_TD(false, false)}>收銀台</td>
<td ${LIST_TD(false, false)}>T11-2 演算法策略：窮舉、貪婪、DP－貪婪（每次先挑最好的）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("33", `收銀台`, `T11-2 演算法策略：窮舉、貪婪、DP－貪婪（每次先挑最好的）｜114臺中市國中組`)}
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
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`收銀台`, `114臺中市國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 34 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>34</td>
<td ${LIST_TD(false, false)}>機器人跳樓梯</td>
<td ${LIST_TD(false, false)}>T11-3 演算法策略：窮舉、貪婪、DP－DP 動態規劃（記住算過的答案往上推）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("34", `機器人跳樓梯`, `T11-3 演算法策略：窮舉、貪婪、DP－DP 動態規劃（記住算過的答案往上推）｜114新竹縣國中組`)}
${desc(`
在未來城市的高塔中，機器人電梯發生故障，它只能靠跳躍上升！<br/>
機器人跳躍模組一次最多可以上升 K 階，但至少要跳 1 階。<br/>
如果樓梯共有 N 階，且機器人一次最多可跳 K 階，請計算機器人能剛好到達第 N 階的不同跳法總數。<br/>
輸入中 N 與 K 皆為正整數，且 1 ≤ K ≤ N ≤ 30。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 N，代表樓梯總階數。<br/>
第二行：整數 K，代表一次最多可跳的階數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所有可能的跳法總數。
`)}
${sample(1,
`4<br/>
2`,
`5`,
`N=4，K=2<br/>
跳法為：(1+1+1+1)、(1+1+2)、(1+2+1)、(2+1+1)、(2+2)，共 5 種。`)}
${sample(2,
`4<br/>
3`,
`7`,
`N=4，K=3<br/>
跳法為：(1+1+1+1)、(1+1+2)、(1+2+1)、(2+1+1)、(2+2)、(1+3)、(3+1)，共 7 種。`,
`{"data": ["4;2;5", "4;3;7"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`機器人跳樓梯`, `114新竹縣國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 35 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>35</td>
<td ${LIST_TD(false, false)}>校園密室逃脫-社團聯絡網</td>
<td ${LIST_TD(false, false)}>T12-1 圖與樹結構－圖（連線網路）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("35", `校園密室逃脫-社團聯絡網`, `T12-1 圖與樹結構－圖（連線網路）｜114嘉義市國中組`)}
${desc(`
來到最後一層，主控電腦顯示了一張複雜的「社團關係網絡圖」。圖上有 N 個社團成員節點與 M 條單向連線 (代表上級指揮下級)。系統會以「連線列表」的方式給你資料，每一條連線包含「起點 (上級)」與「終點 (下級)」。這是一個樹狀的分層結構，每一個人都只會有一個上級指導人，請找出從最高指揮 (編號 1) 傳到最底層的人，中間經過的層數最大是多少。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表社團總人數 (編號 1 ~ N)。<br/>
第二行：一個整數 M，代表關係連線總數。<br/>
第三行：M 個整數，代表每條連線的「起點列表」。<br/>
第四行：M 個整數，代表每條連線的「終點列表」(第三行第 i 個數字與第四行第 i 個數字構成一條連線)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表聯絡網的最大層數。
`)}
${sample(1,
`3<br/>
2<br/>
1 2<br/>
2 3`,
`2`,
`3 個人，2 條連線 (1→2、2→3)。路徑：1 → 2 → 3，最大傳遞層數為 2。`)}
${sample(2,
`4<br/>
3<br/>
1 1 3<br/>
2 3 4`,
`2`,
`4 個人，3 條連線 (1→2、1→3、3→4)。路徑一：1 → 2；路徑二：1 → 3 → 4。最大傳遞層數為 2。`)}
${sample(3,
`2<br/>
1<br/>
1<br/>
2`,
`1`,
``)}
${sample(4,
`5<br/>
4<br/>
1 2 3 4<br/>
2 3 4 5`,
`4`,
``)}
${sample(5,
`5<br/>
4<br/>
1 2 1 4<br/>
2 3 4 5`,
`2`,
``)}
${sample(6,
`6<br/>
5<br/>
1 2 3 4 1<br/>
2 3 4 6 5`,
`4`,
``)}
${sample(7,
`7<br/>
6<br/>
1 2 3 4 2 3<br/>
2 3 4 5 6 7`,
`4`,
``,
`{"data": ["3;2;1;2;2;3;2", "4;3;1;1;3;2;3;4;2", "2;1;1;2;1", "5;4;1;2;3;4;2;3;4;5;4", "5;4;1;2;1;4;2;3;4;5;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`校園密室逃脫-社團聯絡網`, `114嘉義市國中組`)}</span>
</td>
</tr>
`;

// ---------------- 第 36 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>36</td>
<td ${LIST_TD(false, false)}>過年大考驗——親等計算機</td>
<td ${LIST_TD(false, false)}>T12-2 圖與樹結構－樹（族譜、組織圖）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("36", `過年大考驗——親等計算機`, `T12-2 圖與樹結構－樹（族譜、組織圖）｜114基隆市國中組`)}
${desc(`
過年回老家，最難的就是分清楚親戚關係。我們定義「親等」為兩個人之間到「最近共同祖先」的距離總和。<br/>
規則說明：<br/>
1. 距離計算：你與父母距離為 1，與祖父母距離為 2。依此類推 (自己與自己的距離為 0)。<br/>
2. 親等公式：親等 = (X 往上到共同祖先的步數) + (Y 往上到共同祖先的步數)。<br/>
3. 唯一性：若有多位共同祖先，以親等最小 (路徑最近) 的為準。<br/>
4. 無關係：若兩人在名單中完全沒有共同祖先，輸出「不是親戚」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表親戚關係的數量。<br/>
第二行：N 個父親代號 (大寫字母)。<br/>
第三行：N 個兒子代號 (與父親代號依序對應)。<br/>
第四行：兩個欲查詢親等關係的代號 X 與 Y。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數代表親等值；若無共同祖先則輸出「不是親戚」。
`)}
${sample(1,
`3<br/>
A A B<br/>
B C D<br/>
C D`,
`3`,
`C 的父親是 A (1 步)；D 的父親是 B，B 的父親是 A (2 步)。<br/>
最近共同祖先為 A，親等 = 1 + 2 = 3。`)}
${sample(2,
`2<br/>
E F<br/>
G H<br/>
E F`,
`不是親戚`,
`E 與 F 分屬不同家族血緣，完全沒有共同祖先，故輸出不是親戚。`)}
${sample(3,
`3<br/>
A A B<br/>
B C D<br/>
C D`,
`3`,
``)}
${sample(4,
`2<br/>
A A<br/>
B C<br/>
B C`,
`2`,
``)}
${sample(5,
`3<br/>
A B C<br/>
B C D<br/>
A D`,
`3`,
``)}
${sample(6,
`2<br/>
P P<br/>
A B<br/>
A P`,
`1`,
``)}
${sample(7,
`4<br/>
G G A B<br/>
A B C D<br/>
C D`,
`4`,
``)}
${sample(8,
`2<br/>
E F<br/>
G H<br/>
E F`,
`不是親戚`,
``)}
${sample(9,
`1<br/>
K<br/>
P<br/>
K P`,
`1`,
``)}
${sample(10,
`3<br/>
I J K<br/>
L M N<br/>
L N`,
`不是親戚`,
``)}
${sample(11,
`8<br/>
R S T T U V W X<br/>
S T U V W X Y Z<br/>
Y Z`,
`6`,
``)}
${sample(12,
`2<br/>
Z Z<br/>
X Y<br/>
X Y`,
`2`,
``,
`{"data": ["3;A;A;B;B;C;D;C;D;3", "2;E;F;G;H;E;F;不是親戚", "3;A;A;B;B;C;D;C;D;3", "2;A;A;B;C;B;C;2", "3;A;B;C;B;C;D;A;D;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`過年大考驗——親等計算機`, `114基隆市國中組`)}</span>
</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
