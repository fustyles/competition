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
const ANSWER_GROUP = 'T1-T12題型範例國小組';   // exam/answer/ 底下的資料夾名稱
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
<td ${LIST_TD(false, false)}>生日派對禮物分配</td>
<td ${LIST_TD(false, false)}>T1-1 輸入輸出與公式計算－輸入輸出</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("1", `生日派對禮物分配`, `T1-1 輸入輸出與公式計算－輸入輸出｜國小基礎應用`)}
${desc(`
生日派對要準備禮物，每一位到場的人都要拿到 1 份禮物。請根據到場人數，計算總共需要準備幾份禮物。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
輸入一個非負整數，代表到場的人數。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表需要準備的禮物總份數（與人數相同）。
`)}
${sample(1,
`12`,
`12`,
`到場人數為 12 人，每人 1 份禮物，因此需準備 12 份禮物。`,
`{"data": ["0;0", "1;1", "12;12", "100000;100000"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`生日派對禮物分配`, `國小基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>2</td>
<td ${LIST_TD(false, false)}>【一年級】撲滿裡的錢</td>
<td ${LIST_TD(false, false)}>T1-2 輸入輸出與公式計算－公式計算</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("2", `【一年級】撲滿裡的錢`, `T1-2 輸入輸出與公式計算－公式計算｜國小基礎練習`)}
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
`10×3 + 5×2 + 1×4 = 30 + 10 + 4 = 44，輸出 44。`)}
${sample(2,
`0<br/>
0<br/>
0`,
`0`,
`撲滿裡沒有硬幣，總金額為 0。`,
`{"data": ["3;2;4;44", "0;0;0;0", "10;1;9;114", "5;5;5;80", "50;50;50;800"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【一年級】撲滿裡的錢`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>3</td>
<td ${LIST_TD(false, false)}>【六年級】地圖比例尺</td>
<td ${LIST_TD(false, false)}>T1-3 輸入輸出與公式計算－換算公式</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("3", `【六年級】地圖比例尺`, `T1-3 輸入輸出與公式計算－換算公式｜國小基礎練習`)}
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
`4.5 × 50000 = 225000 公分 = 2250 公尺，輸出 2250。`)}
${sample(2,
`100<br/>
3`,
`3`,
`3 × 100 = 300 公分 = 3 公尺，輸出 3。`,
`{"data": ["50000;4.5;2250", "100;3;3", "2500000;1.2;30000", "10;0.1;0.01", "1000;7;70"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【六年級】地圖比例尺`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>4</td>
<td ${LIST_TD(false, false)}>【一年級】單數和雙數</td>
<td ${LIST_TD(false, false)}>T2-1 整除、餘數與單位換算－整除</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("4", `【一年級】單數和雙數`, `T2-1 整除、餘數與單位換算－整除｜國小基礎練習`)}
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
`單數有 3、11、7 共 3 個；雙數有 8、20 共 2 個，輸出 3 2。`)}
${sample(2,
`3<br/>
2 4 6`,
`0 3`,
`2、4、6 都是雙數，輸出 0 3。`,
`{"data": ["5;3;8;11;20;7;3;2", "3;2;4;6;0;3", "1;1;1;0", "6;10;21;32;43;54;65;3;3", "8;1;2;3;4;5;6;7;99;5;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【一年級】單數和雙數`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>5</td>
<td ${LIST_TD(false, false)}>【三年級】平分與剩下</td>
<td ${LIST_TD(false, false)}>T2-2 整除、餘數與單位換算－餘數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("5", `【三年級】平分與剩下`, `T2-2 整除、餘數與單位換算－餘數｜國小基礎練習`)}
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
`47 ÷ 6 = 7 餘 5，每人 7 張，剩 5 張，輸出 7 5。`)}
${sample(2,
`30<br/>
5`,
`6 0`,
`30 ÷ 5 = 6，剛好分完，輸出 6 0。`,
`{"data": ["47;6;7;5", "30;5;6;0", "3;7;0;3", "1000;33;30;10", "0;4;0;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【三年級】平分與剩下`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>6</td>
<td ${LIST_TD(false, false)}>【二年級】公尺和公分</td>
<td ${LIST_TD(false, false)}>T2-3 整除、餘數與單位換算－單位換算</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("6", `【二年級】公尺和公分`, `T2-3 整除、餘數與單位換算－單位換算｜國小基礎練習`)}
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
`856 公分 = 8 公尺 56 公分，輸出 8 56。`)}
${sample(2,
`99`,
`0 99`,
`99 公分不到 1 公尺，輸出 0 99。`,
`{"data": ["856;8;56", "99;0;99", "100;1;0", "1205;12;5", "10000;100;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【二年級】公尺和公分`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>7</td>
<td ${LIST_TD(false, false)}>免運費計算</td>
<td ${LIST_TD(false, false)}>T3-1 條件判斷：區間分級－二選一</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("7", `免運費計算`, `T3-1 條件判斷：區間分級－二選一｜國小基礎應用`)}
${desc(`
網路購物運費規則：消費金額超過 2000 元（不含 2000 元）可免運費；消費金額為 2000 元（含）以下則需另外支付 100 元運費。請計算顧客最後總共要付多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
輸入一個非負整數，代表商品的總金額（元）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表最後應付的總金額（含運費，若有）。
`)}
${sample(1,
`1500`,
`1600`,
`商品金額 1500 元未超過 2000 元，需加收 100 元運費，故總金額為 1500+100=1600 元。`,
`{"data": ["0;100", "2000;2100", "2001;2001", "1500;1600", "999999;999999"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`免運費計算`, `國小基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>8</td>
<td ${LIST_TD(false, false)}>【四年級】角的分類</td>
<td ${LIST_TD(false, false)}>T3-2 條件判斷：區間分級－區間分級</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("8", `【四年級】角的分類`, `T3-2 條件判斷：區間分級－區間分級｜國小基礎練習`)}
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
`45 度小於 90 度，是 銳角。`)}
${sample(2,
`90`,
`直角`,
`剛好 90 度，是 直角。`,
`{"data": ["45;銳角", "90;直角", "120;鈍角", "180;平角", "89;銳角"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【四年級】角的分類`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>9</td>
<td ${LIST_TD(false, false)}>分段收費</td>
<td ${LIST_TD(false, false)}>T3-3 條件判斷：區間分級－分段計費</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("9", `分段收費`, `T3-3 條件判斷：區間分級－分段計費｜國小基礎應用`)}
${desc(`
存錢筒手續費規則：存入金額為 1000 元（含）以下，收取 10 元手續費；存入金額為 1001 元（含）以上，收取 20 元手續費。請計算最後實際存進去多少錢（存入金額扣除手續費）。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
輸入一個正整數，代表存入的金額（元）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表最後實際存入的金額（元，即存入金額扣除手續費）。
`)}
${sample(1,
`1500`,
`1480`,
`存入 1500 元，已達 1001 元（含）以上，收取 20 元手續費，實際存入 1500-20=1480 元。`,
`{"data": ["1000;990", "1001;981", "1500;1480", "1;-9"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`分段收費`, `國小基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 10 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>10</td>
<td ${LIST_TD(false, false)}>低溫警報</td>
<td ${LIST_TD(false, false)}>T4-1 邏輯運算：且／或／巢狀－且（兩個都要成立）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("10", `低溫警報`, `T4-1 邏輯運算：且／或／巢狀－且（兩個都要成立）｜國小基礎應用`)}
${desc(`
氣象局監測連續 3 天的氣溫，如果這 3 天的氣溫都低於 10 度（不含 10 度），就顯示「太冷了」；否則顯示「正常」。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
依序輸入 3 個整數，分別代表連續 3 天的氣溫（攝氏度）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個字串，內容為「太冷了」或「正常」。
`)}
${sample(1,
`8<br/>
9<br/>
7`,
`太冷了`,
`連續 3 天氣溫皆低於 10 度（8、9、7 度），符合「太冷了」的條件。`,
`{"data": ["8;9;7;太冷了", "10;5;5;正常", "9;9;9;太冷了", "-50;-40;-30;太冷了"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`低溫警報`, `國小基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 11 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>11</td>
<td ${LIST_TD(false, false)}>社團錄取</td>
<td ${LIST_TD(false, false)}>T4-2 邏輯運算：且／或／巢狀－或（一個成立就可以）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("11", `社團錄取`, `T4-2 邏輯運算：且／或／巢狀－或（一個成立就可以）｜國小基礎應用`)}
${desc(`
社團錄取規則：只要分數達到 80 分（含）以上，或是具備特殊才藝，兩個條件符合其中一個即可錄取。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個整數，代表成績。<br/>
第 2 行輸入一個字串，內容為「是」或「否」，代表是否具備特殊才藝。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個字串，內容為「是」或「否」，代表是否錄取。
`)}
${sample(1,
`75<br/>
是`,
`是`,
`成績 75 分未達 80 分，但具備特殊才藝，符合其中一個條件即可錄取，故輸出「是」。`,
`{"data": ["79;否;否", "80;否;是", "75;是;是", "0;否;否"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`社團錄取`, `國小基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 12 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>12</td>
<td ${LIST_TD(false, false)}>會員折扣累計</td>
<td ${LIST_TD(false, false)}>T4-3 邏輯運算：且／或／巢狀－巢狀（判斷裡再判斷）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("12", `會員折扣累計`, `T4-3 邏輯運算：且／或／巢狀－巢狀（判斷裡再判斷）｜國小基礎應用`)}
${desc(`
商店優待規則：若顧客為會員，結帳金額享 9 折優惠；若打完 9 折後的金額仍超過 1000 元（不含 1000 元本身），則再折抵 100 元現金。非會員則沒有任何折扣，以原價付款。若計算過程出現小數，請四捨五入到整數元。請計算顧客最後應付的金額。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個字串，內容為「是」或「否」，代表顧客是否為會員。<br/>
第 2 行輸入一個正整數，代表原始消費金額（元）。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表最後應付的金額（元）。
`)}
${sample(1,
`是<br/>
1200`,
`980`,
`會員身分，原始金額 1200 元先打 9 折為 1080 元，1080 元超過 1000 元，再折抵 100 元，最終應付 1080-100=980 元。`,
`{"data": ["是;1000;900", "是;1200;980", "否;1200;1200", "是;0;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`會員折扣累計`, `國小基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 13 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>13</td>
<td ${LIST_TD(false, false)}>【三年級】磁鐵吸得起來嗎</td>
<td ${LIST_TD(false, false)}>T5-1 迴圈：計數、累加、平均－計數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("13", `【三年級】磁鐵吸得起來嗎`, `T5-1 迴圈：計數、累加、平均－計數｜國小基礎練習`)}
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
`只有兩樣「鐵」會被吸起來，輸出 2。`)}
${sample(2,
`3<br/>
銅 鋁 塑膠`,
`0`,
`銅、鋁、塑膠都不會被磁鐵吸起，輸出 0。`,
`{"data": ["5;鐵;木頭;鋁;鐵;紙;2", "3;銅;鋁;塑膠;0", "1;鐵;1", "6;鐵;鐵;鐵;銅;鐵;木頭;4", "4;紙;紙;塑膠;木頭;0"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【三年級】磁鐵吸得起來嗎`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 14 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>14</td>
<td ${LIST_TD(false, false)}>【二年級】存錢筒越存越多</td>
<td ${LIST_TD(false, false)}>T5-2 迴圈：計數、累加、平均－累加</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("14", `【二年級】存錢筒越存越多`, `T5-2 迴圈：計數、累加、平均－累加｜國小基礎練習`)}
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
`4 天分別存 5、7、9、11 元，共 5 + 7 + 9 + 11 = 32 元，輸出 32。`)}
${sample(2,
`10<br/>
0<br/>
7`,
`70`,
`每天都存 10 元，7 天共 70 元，輸出 70。`,
`{"data": ["5;2;4;32", "10;0;7;70", "1;1;10;55", "100;20;30;11700", "3;5;1;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【二年級】存錢筒越存越多`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 15 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>15</td>
<td ${LIST_TD(false, false)}>寶可夢訓練師-1 平均等級</td>
<td ${LIST_TD(false, false)}>T5-3 迴圈：計數、累加、平均－平均</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("15", `寶可夢訓練師-1 平均等級`, `T5-3 迴圈：計數、累加、平均－平均｜114嘉義縣國小組`)}
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
`{"data": ["4;10;20;30;40;25", "3;7;8;10;8", "1;50;50", "3;10;20;30;20", "4;7;8;9;10;8"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`寶可夢訓練師-1 平均等級`, `114嘉義縣國小組`)}</span>
</td>
</tr>
`;

// ---------------- 第 16 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>16</td>
<td ${LIST_TD(false, false)}>【一年級】哪一枝最長</td>
<td ${LIST_TD(false, false)}>T6-1 極值：最大、最小、全距－最大</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("16", `【一年級】哪一枝最長`, `T6-1 極值：最大、最小、全距－最大｜國小基礎練習`)}
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
`三枝分別是 5、7、4 個迴紋針長，第 2 枝最長，輸出 2。`)}
${sample(2,
`9<br/>
2<br/>
3`,
`1`,
`三枝分別是 9、2、3，第 1 枝最長，輸出 1。`,
`{"data": ["5;7;4;2", "9;2;3;1", "1;2;3;3", "6;5;4;1", "10;20;15;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【一年級】哪一枝最長`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 17 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>17</td>
<td ${LIST_TD(false, false)}>誰走最快</td>
<td ${LIST_TD(false, false)}>T6-2 極值：最大、最小、全距－最小</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("17", `誰走最快`, `T6-2 極值：最大、最小、全距－最小｜國小基礎應用`)}
${desc(`
健走比賽：記錄每位參加者走完 3 公里所花費的時間（秒）。請找出花費時間最少（走最快）的秒數。<br/>
<br/>
<span ${LBL_IN}>輸入格式</span><br/>
第 1 行輸入一個正整數 N，代表參加人數。<br/>
接下來 N 行，每行輸入一個正整數，代表一位參加者花費的秒數。<br/>
<br/>
<span ${LBL_OUT}>輸出格式</span><br/>
輸出一個整數，代表最少花費的秒數。
`)}
${sample(1,
`3<br/>
1500<br/>
1420<br/>
1600`,
`1420`,
`三位參加者花費秒數為 1500、1420、1600，其中最少為 1420 秒，因此輸出 1420。`,
`{"data": ["3;1500;1420;1600;1420", "1;1;1", "3;999999;1;999999;1", "3;100;100;100;100"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`誰走最快`, `國小基礎應用`)}</span>
</td>
</tr>
`;

// ---------------- 第 18 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>18</td>
<td ${LIST_TD(false, false)}>【三年級】一天的溫差</td>
<td ${LIST_TD(false, false)}>T6-3 極值：最大、最小、全距－全距</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("18", `【三年級】一天的溫差`, `T6-3 極值：最大、最小、全距－全距｜國小基礎練習`)}
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
`最高溫 27 度、最低溫 18 度，溫差 27 - 18 = 9，輸出 27 18 9。`)}
${sample(2,
`1<br/>
15`,
`15 15 0`,
`只量了一次 15 度，輸出 15 15 0。`,
`{"data": ["6;18;21;25;27;24;20;27;18;9", "1;15;15;15;0", "5;-3;0;4;2;-1;4;-3;7", "4;30;30;30;30;30;30;0", "8;12;15;19;23;26;22;17;13;26;12;14"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【三年級】一天的溫差`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 19 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>19</td>
<td ${LIST_TD(false, false)}>【三年級】植物澆水日</td>
<td ${LIST_TD(false, false)}>T7-1 規律、數列與逐步模擬－規律</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("19", `【三年級】植物澆水日`, `T7-1 規律、數列與逐步模擬－規律｜國小基礎練習`)}
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
`每隔 3 天澆水：第 1、4、7、10 天，共 4 次，輸出 1 4 7 10 4。`)}
${sample(2,
`5<br/>
5`,
`1 1`,
`只有第 1 天澆水 (第 6 天已超過 5 天)，輸出 1 1。`,
`{"data": ["3;10;1;4;7;10;4", "5;5;1;1", "1;4;1;2;3;4;4", "7;30;1;8;15;22;29;5", "10;60;1;11;21;31;41;51;6"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【三年級】植物澆水日`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 20 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>20</td>
<td ${LIST_TD(false, false)}>【二年級】跳著數數</td>
<td ${LIST_TD(false, false)}>T7-2 規律、數列與逐步模擬－數列</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("20", `【二年級】跳著數數`, `T7-2 規律、數列與逐步模擬－數列｜國小基礎練習`)}
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
`從 10 開始每次加 10，不超過 50 的數是 10 20 30 40 50。`,
`{"data": ["3;5;20;3;8;13;18", "10;10;50;10;20;30;40;50", "0;2;9;0;2;4;6;8", "7;50;7;7", "1;3;30;1;4;7;10;13;16;19;22;25;28"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【二年級】跳著數數`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 21 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>21</td>
<td ${LIST_TD(false, false)}>【一年級】綠豆發芽長高</td>
<td ${LIST_TD(false, false)}>T7-3 規律、數列與逐步模擬－逐步模擬</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("21", `【一年級】綠豆發芽長高`, `T7-3 規律、數列與逐步模擬－逐步模擬｜國小基礎練習`)}
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
`第 1 天 2 公分，第 2 天 5、第 3 天 8、第 4 天 11 公分，第 4 天超過 10 公分，輸出 4。`)}
${sample(2,
`5<br/>
1<br/>
5`,
`1`,
`第 1 天就已經 5 公分，達到目標，輸出 1。`,
`{"data": ["2;3;10;4", "5;1;5;1", "1;10;100;11", "3;2;4;2", "20;5;21;2"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【一年級】綠豆發芽長高`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 22 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>22</td>
<td ${LIST_TD(false, false)}>【四年級】找出所有因數</td>
<td ${LIST_TD(false, false)}>T8-1 數論：因數、質數、公因倍數－因數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("22", `【四年級】找出所有因數`, `T8-1 數論：因數、質數、公因倍數－因數｜國小基礎練習`)}
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
`12 的因數為 1 2 3 4 6 12，共 6 個，輸出 1 2 3 4 6 12 6。`)}
${sample(2,
`1`,
`1 1`,
`1 的因數只有 1，共 1 個，輸出 1 1。`,
`{"data": ["12;1;2;3;4;6;12;6", "1;1;1", "13;1;13;2", "36;1;2;3;4;6;9;12;18;36;9", "1000;1;2;4;5;8;10;20;25;40;50;100;125;200;250;500;1000;16"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【四年級】找出所有因數`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 23 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>23</td>
<td ${LIST_TD(false, false)}>幸運號碼牌</td>
<td ${LIST_TD(false, false)}>T8-2 數論：因數、質數、公因倍數－質數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("23", `幸運號碼牌`, `T8-2 數論：因數、質數、公因倍數－質數｜本公告自編`)}
${desc(`
園遊會的摸彩券上都有一個號碼。主持人宣布：號碼如果是「質數」（大於 1，而且只能被 1 和自己整除），就是幸運號碼，可以多拿一份小禮物。<br/>
請寫一個程式，輸入摸彩券的號碼，判斷它是不是幸運號碼。<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N，代表摸彩券的號碼（1 ~ 100）。<br/>
<span ${LBL_OUT}>輸出說明</span>若 N 是質數，輸出「幸運」；否則輸出「普通」。
`)}
${sample(1,
`13`,
`幸運`,
`13 只能被 1 和 13 整除，是質數，輸出「幸運」。`)}
${sample(2,
`15`,
`普通`,
`15 可以被 3 和 5 整除，不是質數，輸出「普通」。`,
`{"data": ["13;幸運", "15;普通", "2;幸運", "1;普通", "97;幸運"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`幸運號碼牌`, `本公告自編`)}</span>
</td>
</tr>
`;

// ---------------- 第 24 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>24</td>
<td ${LIST_TD(false, false)}>【六年級】最簡整數比</td>
<td ${LIST_TD(false, false)}>T8-3 數論：因數、質數、公因倍數－最大公因數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("24", `【六年級】最簡整數比`, `T8-3 數論：因數、質數、公因倍數－最大公因數｜國小基礎練習`)}
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
`12 和 18 的最大公因數是 6，12 : 18 = 2 : 3，輸出 2 3。`)}
${sample(2,
`7<br/>
5`,
`7 5`,
`7 和 5 互質，已經是最簡整數比，輸出 7 5。`,
`{"data": ["12;18;2;3", "7;5;7;5", "100;100;1;1", "250;1000;1;4", "84;36;7;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【六年級】最簡整數比`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 25 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>25</td>
<td ${LIST_TD(false, false)}>【五年級】兩路公車同時到站</td>
<td ${LIST_TD(false, false)}>T8-4 數論：因數、質數、公因倍數－最小公倍數</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("25", `【五年級】兩路公車同時到站`, `T8-4 數論：因數、質數、公因倍數－最小公倍數｜國小基礎練習`)}
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
`12 的倍數 12、24、36…，18 的倍數 18、36…，最小公倍數是 36，輸出 36。`)}
${sample(2,
`5<br/>
7`,
`35`,
`5 和 7 互質，最小公倍數是 35，輸出 35。`,
`{"data": ["12;18;36", "5;7;35", "10;10;10", "1;99;99", "64;96;192"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【五年級】兩路公車同時到站`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 26 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>26</td>
<td ${LIST_TD(false, false)}>點名報數</td>
<td ${LIST_TD(false, false)}>T9-1 清單：搜尋、統計、排序－搜尋</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("26", `點名報數`, `T9-1 清單：搜尋、統計、排序－搜尋｜114苗栗縣國小組`)}
${desc(`
期待已久的寒假終於快要開始了！但是今天班上有一個同學沒有來上學考試，也沒有請假。老師已經分不清楚是誰沒來了，於是決定請大家點名報數。<br/>
這個班級的座號從 1 開始，依照 1, 2, 3, … 順序編下去，中間不會有跳號，直到最後一號，也就是班級的總人數。大家會依照自己的座號，依照從小到大的順序報數。舉例來說，如果總共有 5 個學生，點名報數時，報的座號是 1, 2, 4, 5，那麼老師就知道座號 3 的同學沒有來。請幫老師找出是誰沒有來上學考試。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為班級的總人數 (2 ~ 20 人)；接著依從小到大的順序輸入每次報數的座號，次數比班級的總人數少一次 (保證座號存在、遞增且不重複)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出沒有來上學考試的座號。
`)}
${sample(1,
`4<br/>
1<br/>
2<br/>
4`,
`3`,
`全班 4 人，報數為 1、2、4，沒有來的是座號 3。`)}
${sample(2,
`5<br/>
1<br/>
2<br/>
3<br/>
4`,
`5`,
`全班 5 人，報數為 1、2、3、4，沒有來的是座號 5。`,
`{"data": ["4;1;2;4;3", "5;1;2;3;4;5"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`點名報數`, `114苗栗縣國小組`)}</span>
</td>
</tr>
`;

// ---------------- 第 27 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>27</td>
<td ${LIST_TD(false, false)}>班服投票</td>
<td ${LIST_TD(false, false)}>T9-2 清單：搜尋、統計、排序－統計</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("27", `班服投票`, `T9-2 清單：搜尋、統計、排序－統計｜114桃園市國小組`)}
${desc(`
可愛國小 601 班要製作紀念班服，本次班服設計有三個款式，分別編號為 1、2、3。班上同學可以自由投票，參與投票者可在選票上寫上一個自己所選擇的班服款式編號，統計後選出投票數最高的款式。<br/>
請設計程式：先計算每款班服設計的得票數 (依 1→3 順序)，輸出最後獲得最高票數的班服款式編號；若有最高票數一樣的狀況，輸出「請重新投票」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行：一個整數 N，代表投票數；第二行：N 個整數，介於 1 ~ 3，代表每張選票的班服設計編號。<br/>
<span ${LBL_OUT}>輸出說明</span>如果有明確的最高票，輸出票數最高的班服編號；如果有最高票數相同情形，輸出「請重新投票」。
`)}
${sample(1,
`8<br/>
1 2 2 3 2 1 3 2`,
`2`,
`8 位同學投票，得票數最高的班服設計編號為 2。`)}
${sample(2,
`6<br/>
1 2 3 1 2 3`,
`請重新投票`,
`6 位同學投票，最高票有同票數情形，需要重新投票。`)}
${sample(3,
`5<br/>
3 3 1 2 3`,
`3`,
`5 位同學投票，得票數最高的班服設計編號為 3。`,
`{"data": ["8;1;2;2;3;2;1;3;2;2", "6;1;2;3;1;2;3;請重新投票", "5;3;3;1;2;3;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`班服投票`, `114桃園市國小組`)}</span>
</td>
</tr>
`;

// ---------------- 第 28 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>28</td>
<td ${LIST_TD(false, false)}>【一年級】由小排到大</td>
<td ${LIST_TD(false, false)}>T9-3 清單：搜尋、統計、排序－排序</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("28", `【一年級】由小排到大`, `T9-3 清單：搜尋、統計、排序－排序｜國小基礎練習`)}
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
`7、7、3 由小到大排為 3 7 7。`,
`{"data": ["35;12;60;12;35;60", "7;7;3;3;7;7", "1;2;3;1;2;3", "100;50;0;0;50;100", "9;9;9;9;9;9"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【一年級】由小排到大`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 29 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>29</td>
<td ${LIST_TD(false, false)}>苗栗項鍊</td>
<td ${LIST_TD(false, false)}>T10-1 字串處理與編碼－字串處理</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("29", `苗栗項鍊`, `T10-1 字串處理與編碼－字串處理｜114苗栗縣國小組`)}
${desc(`
苗栗縣政府決定發放由英文字母 M 與 L 珠子串連的項鍊給市民作紀念。由於每個人需要的尺寸不同，尺寸 1 的項鍊表示英文字母 M 與 L 珠子各一顆，形成字串 ML；尺寸 2 的項鍊表示英文字母 M 與 L 珠子各二顆，也就會形成字串 MLML。尺寸更大的項鍊，就會形成重複該次數的字串 ML。請根據項鍊的尺寸，幫忙印出項鍊的珠子形成的字串。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表項鍊的尺寸 (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出項鍊的珠子形成的字串，中間不可以有空格或任何其他符號。
`)}
${sample(1,
`1`,
`ML`,
`尺寸 1，ML 重複 1 次。`)}
${sample(2,
`2`,
`MLML`,
`尺寸 2，ML 重複 2 次。`)}
${sample(3,
`5`,
`MLMLMLMLML`,
`尺寸 5，ML 重複 5 次。`,
`{"data": ["1;ML", "2;MLML", "5;MLMLMLMLML"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`苗栗項鍊`, `114苗栗縣國小組`)}</span>
</td>
</tr>
`;

// ---------------- 第 30 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>30</td>
<td ${LIST_TD(false, false)}>刮刮樂</td>
<td ${LIST_TD(false, false)}>T10-2 字串處理與編碼－字串檢查</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("30", `刮刮樂`, `T10-2 字串處理與編碼－字串檢查｜114臺南市國小組`)}
${desc(`
小哲彩券公司推出一種六六大順的刮刮樂，規則如下：<br/>
每張刮刮樂上面有三個 0 ~ 9 的數字。<br/>
如果出現一個數字 6，則可以得到 100 元。<br/>
如果出現二個數字 6，則可以得到 200 元。<br/>
如果出現三個數字 6，則可以得到 500 元。<br/>
以上三種得獎方式，你只能選擇獎金最高的一種來領取。<br/>
現在給你一張刮刮樂上的三個數字，請問你可以得到多少獎金。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個由三個數字組成的字串 (例如 666)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表可以得到的獎金。
`)}
${sample(1,
`666`,
`500`,
`出現三個數字 6，可以得到 500 元。`)}
${sample(2,
`600`,
`100`,
`出現一個數字 6，可以得到 100 元。`)}
${sample(3,
`266`,
`200`,
`出現二個數字 6，可以得到 200 元。`)}
${sample(4,
`123`,
`0`,
`出現 0 個數字 6，沒有中獎。`)}
${sample(5,
`616`,
`200`,
``)}
${sample(6,
`911`,
`0`,
``)}
${sample(7,
`336`,
`100`,
``)}
${sample(8,
`666`,
`500`,
``,
`{"data": ["666;500", "600;100", "266;200", "123;0", "616;200"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`刮刮樂`, `114臺南市國小組`)}</span>
</td>
</tr>
`;

// ---------------- 第 31 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>31</td>
<td ${LIST_TD(false, false)}>動態密碼轉換</td>
<td ${LIST_TD(false, false)}>T10-3 字串處理與編碼－編碼與解碼</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("31", `動態密碼轉換`, `T10-3 字串處理與編碼－編碼與解碼｜114嘉義縣國小組`)}
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
`{"data": ["2;banana;dcpcpc", "0;abc;abc", "1;xyz;yza", "26;hello;hello", "28;az;cb"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`動態密碼轉換`, `114嘉義縣國小組`)}</span>
</td>
</tr>
`;

// ---------------- 第 32 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>32</td>
<td ${LIST_TD(false, false)}>【六年級】雞兔同籠</td>
<td ${LIST_TD(false, false)}>T11-1 演算法策略：窮舉、貪婪、DP－窮舉（全部試一遍）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("32", `【六年級】雞兔同籠`, `T11-1 演算法策略：窮舉、貪婪、DP－窮舉（全部試一遍）｜國小基礎練習`)}
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
`假設全部是雞有 20 隻腳，多出 8 隻腳，兔子 8 ÷ 2 = 4 隻，雞 6 隻，輸出 6 4。`)}
${sample(2,
`5<br/>
10`,
`5 0`,
`10 隻腳剛好 5 隻都是雞，輸出 5 0。`,
`{"data": ["10;28;6;4", "5;10;5;0", "3;12;0;3", "35;94;23;12", "100;300;50;50"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`【六年級】雞兔同籠`, `國小基礎練習`)}</span>
</td>
</tr>
`;

// ---------------- 第 33 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>33</td>
<td ${LIST_TD(false, false)}>碼易丁飲料店-3 最少硬幣數找零</td>
<td ${LIST_TD(false, false)}>T11-2 演算法策略：窮舉、貪婪、DP－貪婪（每次先挑最好的）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("33", `碼易丁飲料店-3 最少硬幣數找零`, `T11-2 演算法策略：窮舉、貪婪、DP－貪婪（每次先挑最好的）｜114南投縣國小組`)}
${desc(`
子題三：為了讓收銀機裡的零錢管理更方便，小明希望找錢時盡量使用最少數量的硬幣。假設收銀機裡有充足的 50 元、10 元、5 元、1 元硬幣，請依序使用 50、10、5、1 元硬幣，由大到小進行找零，此幣值組合可保證找零所需的硬幣數量最少。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表需要找零的總金額 (0 ~ 999)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出四個整數，分別代表 50 元、10 元、5 元、1 元硬幣的數量。
`)}
${sample(1,
`88`,
`1 3 1 3`,
`找零 88 元：50 元硬幣 1 個、10 元硬幣 3 個、5 元硬幣 1 個、1 元硬幣 3 個。`)}
${sample(2,
`124`,
`2 2 0 4`,
`找零 124 元：50 元硬幣 2 個、10 元硬幣 2 個、5 元硬幣 0 個、1 元硬幣 4 個。`)}
${sample(3,
`7`,
`0 0 1 2`,
``)}
${sample(4,
`100`,
`2 0 0 0`,
``)}
${sample(5,
`388`,
`7 3 1 3`,
``)}
${sample(6,
`999`,
`19 4 1 4`,
``)}
${sample(7,
`0`,
`0 0 0 0`,
``,
`{"data": ["88;1;3;1;3", "124;2;2;0;4", "7;0;0;1;2", "100;2;0;0;0", "388;7;3;1;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`碼易丁飲料店-3 最少硬幣數找零`, `114南投縣國小組`)}</span>
</td>
</tr>
`;

// ---------------- 第 34 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>34</td>
<td ${LIST_TD(false, false)}>爬樓梯有幾種走法</td>
<td ${LIST_TD(false, false)}>T11-3 演算法策略：窮舉、貪婪、DP－DP 動態規劃（記住算過的答案往上推）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("34", `爬樓梯有幾種走法`, `T11-3 演算法策略：窮舉、貪婪、DP－DP 動態規劃（記住算過的答案往上推）｜本公告自編`)}
${desc(`
小明家門口有 N 階樓梯，他每次可以走 1 階，也可以一次跨 2 階。<br/>
走到第 1 階只有 1 種走法；走到第 2 階有 2 種走法（1+1 或 2）；之後走到每一階的走法數，都等於「前一階的走法數」加上「前兩階的走法數」。<br/>
請寫一個程式，算出走到第 N 階總共有幾種不同的走法。<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N，代表樓梯的階數（1 ~ 15）。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表走到第 N 階的走法總數。
`)}
${sample(1,
`4`,
`5`,
`第 1 階 1 種、第 2 階 2 種、第 3 階 1+2 = 3 種、第 4 階 2+3 = 5 種，輸出 5。`)}
${sample(2,
`1`,
`1`,
`只有 1 階，只能走 1 步，輸出 1。`,
`{"data": ["4;5", "1;1", "5;8", "10;89", "15;987"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`爬樓梯有幾種走法`, `本公告自編`)}</span>
</td>
</tr>
`;

// ---------------- 第 35 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>35</td>
<td ${LIST_TD(false, false)}>傳紙條</td>
<td ${LIST_TD(false, false)}>T12-1 圖與樹結構－圖（連線網路）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("35", `傳紙條`, `T12-1 圖與樹結構－圖（連線網路）｜本公告自編`)}
${desc(`
上課時，班上同學在玩傳紙條遊戲。每位同學拿到紙條後，只會把紙條傳給自己指定的那一位同學。<br/>
紙條一開始在 1 號同學手上。請寫一個程式，算出紙條要傳幾次才會傳到 T 號同學手上（題目保證一定傳得到，而且 T 不是 1）。<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N，代表同學人數（2 ~ 10）；第二行輸入 N 個整數，第 i 個數字代表 i 號同學會把紙條傳給幾號；第三行輸入整數 T，代表要收到紙條的同學。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表傳了幾次。
`)}
${sample(1,
`5<br/>
3 5 2 1 4<br/>
5`,
`3`,
`1 號傳給 3 號、3 號傳給 2 號、2 號傳給 5 號，傳了 3 次，輸出 3。`)}
${sample(2,
`3<br/>
2 3 1<br/>
3`,
`2`,
`1 號傳給 2 號、2 號傳給 3 號，傳了 2 次，輸出 2。`,
`{"data": ["5;3;5;2;1;4;5;3", "3;2;3;1;3;2", "4;4;1;2;3;2;3", "2;2;1;2;1", "6;6;1;2;3;4;5;2;5"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`傳紙條`, `本公告自編`)}</span>
</td>
</tr>
`;

// ---------------- 第 36 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>36</td>
<td ${LIST_TD(false, false)}>家族樹往上數幾代</td>
<td ${LIST_TD(false, false)}>T12-2 圖與樹結構－樹（族譜、組織圖）</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("36", `家族樹往上數幾代`, `T12-2 圖與樹結構－樹（族譜、組織圖）｜本公告自編`)}
${desc(`
小美在整理家族樹。家族裡每個人都有一個編號，1 號是最老的祖先。除了 1 號以外，每個人都會記下自己的爸爸是幾號。<br/>
請寫一個程式，輸入某個人的編號，算出他要往上找幾代才會找到 1 號祖先。<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N，代表家族人數（2 ~ 15）；第二行輸入 N 個整數，第 i 個數字代表 i 號的爸爸編號（1 號沒有爸爸，填 0）；第三行輸入整數 X，代表要查詢的人。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表 X 往上到 1 號祖先共經過幾代。
`)}
${sample(1,
`6<br/>
0 1 1 2 2 4<br/>
6`,
`3`,
`6 號的爸爸是 4 號、4 號的爸爸是 2 號、2 號的爸爸是 1 號，往上 3 代，輸出 3。`)}
${sample(2,
`6<br/>
0 1 1 2 2 4<br/>
1`,
`0`,
`1 號就是祖先本人，輸出 0。`,
`{"data": ["6;0;1;1;2;2;4;6;3", "6;0;1;1;2;2;4;1;0", "6;0;1;1;2;2;4;3;1", "6;0;1;1;2;2;4;5;2", "4;0;1;2;3;4;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons(`家族樹往上數幾代`, `本公告自編`)}</span>
</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
