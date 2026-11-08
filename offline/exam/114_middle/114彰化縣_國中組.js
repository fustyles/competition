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
const ANSWER_GROUP = '114彰化縣國中組';   // exam/answer/ 底下的資料夾名稱
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
<td ${LIST_TD(false, false)}>校外教學合照大挑戰</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("1", `校外教學合照大挑戰`, `114彰化縣國中組`)}
${desc(`
今天是你和同學們的校外教學，你們 5 個好朋友 (夯吉寶、彰之助、歐邦倪、古力彰、志多星) 準備在遊樂園門口排成一橫列拍大合照。這 5 個人排成一列，總共有幾種不同的排法？<br/>
請寫一個程式，只要輸入人數 N (2 < N < 21)，就能自動計算出 N! (階乘) 的結果，告訴你們總共有幾種排隊方式。<br/>
數學小撇步～「階乘」的概念就像是：第 1 個位置有 5 種人選可以站，第 2 個位置剩下 4 種人選，...以此類推。總共有 5 x 4 x 3 x 2 x 1 = 120 種排法。數學符號記作 5!。<br/>
2! = 2x1 = 2<br/>
3! = 3x2x1 = 6<br/>
4! = 4x3x2x1 = 24<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 N! 的結果。
`)}
${sample(1,
`5`,
`120`,
`5! = 5 x 4 x 3 x 2 x 1 = 120`)}
${sample(2,
`8`,
`40320`,
``)}
${sample(3,
`16`,
`20922789888000`,
``)}
${sample(4,
`7`,
`5040`,
``)}
${sample(5,
`6`,
`720`,
``)}
${sample(6,
`20`,
`2432902008176640000`,
``,
`{"data": ["5;120", "8;40320", "16;20922789888000", "7;5040", "6;720", "20;2432902008176640000"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('校外教學合照大挑戰')}</span>
</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>2</td>
<td ${LIST_TD(false, false)}>向左走向右走</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("2", `向左走向右走`, `114彰化縣國中組`)}
${desc(`
迴文 (Palindrome) 是指一字串從左邊讀和從右邊讀都完全相同的序列，例如「abcba」是迴文。請設計程式來判斷這個輸入字串是否為迴文。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個字串，其中可能包含英文字母 (a-z)、數字 (0-9)。<br/>
<span ${LBL_OUT}>輸出說明</span>如果輸入的字串是迴文，輸出「是迴文」，否則輸出「不是迴文」。
`)}
${sample(1,
`123321`,
`是迴文`,
``)}
${sample(2,
`rotor`,
`是迴文`,
``)}
${sample(3,
`ab25ab`,
`不是迴文`,
``)}
${sample(4,
`123abcab321`,
`不是迴文`,
``)}
${sample(5,
`top1001pot`,
`是迴文`,
``)}
${sample(6,
`amanaplanacanalpanama`,
`是迴文`,
``,
`{"data": ["123321;是迴文", "rotor;是迴文", "ab25ab;不是迴文", "123abcab321;不是迴文", "top1001pot;是迴文", "amanaplanacanalpanama;是迴文"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('向左走向右走')}</span>
</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>3</td>
<td ${LIST_TD(false, false)}>生命值的最終審判</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("3", `生命值的最終審判`, `114彰化縣國中組`)}
${desc(`
在聖光與陰影交織的艾澤大陸上，傳說中的命運之塔 (The Spire of Fates) 聳立於世界中央。這座塔並非用於囚禁，而是作為大陸最高議會對候選勇者進行「生命見證」的最終考驗。只有通過此試煉的勇者，才能獲得與大陸守護神訂立古老契約的資格。<br/>
我們的英雄，亞瑟·黎明之刃，帶著他從數百場戰鬥中累積的初始生命力 h，踏入了這座神秘的高塔。<br/>
試煉的機制：命運之塔共有 n 層，每一層都設有一道「迴響之門」。當亞瑟通過這道門時，他的心靈會與古老的能量場產生共鳴，觸發一個隨機的「命運事件」，直接作用於他的生命值 (HP)。你是被議會指派的「命運追蹤者」，職責是精準記錄並計算亞瑟在 n 個回合中生命值的波動，以判定他是否具備簽訂契約的資格。<br/>
若命運事件中發生「精靈的祝福」或「光輝的記憶」，簡記符號為：＋ (生命值 +10)<br/>
若命運事件中發生「失落的詛咒」或「愧疚的印記」，簡記符號為：－ (生命值 -5)<br/>
最終審判的條件：<br/>
契約訂立成功：亞瑟必須成功通過所有 n 個回合 (層) 的考驗，且在離開高塔時，其最終生命值 x 仍為正數或零。<br/>
契約訂立失敗：如果亞瑟在任何一個回合結束後，生命值 x 降至負數 (x < 0)，則試煉中止。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>共三個輸入。<br/>
第一個為初始生命值正整數 h (100 ≤ h ≤ 3000)。<br/>
第二個為經過回合數正整數 n (1 ≤ n ≤ 100)。<br/>
第三個為經歷事件，為 n 個連續之全形加 (＋) 減 (－) 符號組成的字串。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 x，表示最終生命值。若過程中 x < 0 則輸出 Error。
`)}
${sample(1,
`100<br/>
7<br/>
＋－＋－＋＋－`,
`125`,
`100+10-5+10-5+10+10-5 = 125`)}
${sample(2,
`2533<br/>
22<br/>
＋＋＋＋－－－＋－＋－＋＋－－－＋＋＋－－－`,
`2588`,
``)}
${sample(3,
`10<br/>
9<br/>
＋＋－－－－－－－`,
`Error`,
``)}
${sample(4,
`1234<br/>
28<br/>
＋－＋－＋＋－－＋＋－＋－－－－＋＋－－＋＋－－－－－－`,
`1259`,
``)}
${sample(5,
`500<br/>
33<br/>
＋＋＋＋＋＋－－－－－＋＋＋＋－－－－＋＋－－＋＋－－＋＋＋－－－`,
`590`,
``)}
${sample(6,
`30<br/>
16<br/>
－－－－－－－－－－－－－－－－`,
`Error`,
``,
`{"data": ["100;7;＋－＋－＋＋－;125", "2533;22;＋＋＋＋－－－＋－＋－＋＋－－－＋＋＋－－－;2588", "10;9;＋＋－－－－－－－;Error", "1234;28;＋－＋－＋＋－－＋＋－＋－－－－＋＋－－＋＋－－－－－－;1259", "500;33;＋＋＋＋＋＋－－－－－＋＋＋＋－－－－＋＋－－＋＋－－＋＋＋－－－;590", "30;16;－－－－－－－－－－－－－－－－;Error"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('生命值的最終審判')}</span>
</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>4</td>
<td ${LIST_TD(false, false)}>科技新創的擴張佈局</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("4", `科技新創的擴張佈局`, `114彰化縣國中組`)}
${desc(`
有一家科技公司為了拓展業務，一直成立分公司，原始公司是 A，第一個分公司是 B，陸續有第二家、第三家、第四家分公司成立，依序命名為 C、D、E...。<br/>
母公司 A 的資本額為 0，第一家分公司 B 資本額為 1，第二家分公司的資本額為前兩個公司的和為 1 (0+1)，公司規定以後每成立一家分公司，資本額必須是前兩個公司資本額的和，如此推算資本額分別是：0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 ...以此類推。<br/>
第一個數字 0 是母公司資本額；第二個數字 1 是第一家分公司資本額；第三個數字 1 是第二家分公司資本額；第四個數字 2 是第三家分公司資本額 (以此類推)。<br/>
請你寫一個程式計算第 N 家分公司的資本額為多少？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N，代表第 N 家分公司。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出第 N 家分公司的資本額。
`)}
${sample(1,
`1`,
`1`,
``)}
${sample(2,
`2`,
`1`,
``)}
${sample(3,
`3`,
`2`,
``)}
${sample(4,
`11`,
`89`,
``)}
${sample(5,
`15`,
`610`,
``)}
${sample(6,
`25`,
`75025`,
``,
`{"data": ["1;1", "2;1", "3;2", "11;89", "15;610", "25;75025"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('科技新創的擴張佈局')}</span>
</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>5</td>
<td ${LIST_TD(false, false)}>捉迷藏</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("5", `捉迷藏`, `114彰化縣國中組`)}
${desc(`
在一場捉迷藏遊戲中，小明沿著一條路線前進。他用 0 和 1 記錄每一格是否安全：0 代表安全，1 代表有危險。<br/>
例如：0 1 1 0 0 0 1，代表第 1 格安全、第 2、3 格危險、第 4 ~ 6 格安全、第 7 格危險。<br/>
請你幫忙計算：這條路線中，最長連續安全 (連續 0) 的長度是多少？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>共有 N+1 個輸入 (分次輸入)。第一個輸入 N，代表接續有 N 筆資料；接下來分別輸入 N 個 0 或 1，代表道路每一格的安全性。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最長連續安全 (連續 0) 的長度。
`)}
${sample(1,
`7<br/>
0<br/>
1<br/>
1<br/>
0<br/>
0<br/>
0<br/>
1`,
`3`,
``)}
${sample(2,
`10<br/>
1<br/>
0<br/>
0<br/>
1<br/>
0<br/>
0<br/>
0<br/>
0<br/>
1<br/>
1`,
`4`,
``)}
${sample(3,
`5<br/>
1<br/>
1<br/>
1<br/>
1<br/>
1`,
`0`,
``)}
${sample(4,
`6<br/>
0<br/>
0<br/>
1<br/>
0<br/>
1<br/>
0`,
`2`,
``)}
${sample(5,
`8<br/>
1<br/>
0<br/>
0<br/>
0<br/>
0<br/>
1<br/>
0<br/>
0`,
`4`,
``)}
${sample(6,
`9<br/>
0<br/>
1<br/>
0<br/>
1<br/>
0<br/>
0<br/>
0<br/>
1<br/>
0`,
`3`,
``,
`{"data": ["7;0;1;1;0;0;0;1;3", "10;1;0;0;1;0;0;0;0;1;1;4", "5;1;1;1;1;1;0", "6;0;0;1;0;1;0;2", "8;1;0;0;0;0;1;0;0;4", "9;0;1;0;1;0;0;0;1;0;3"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('捉迷藏')}</span>
</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>6</td>
<td ${LIST_TD(false, false)}>停車場計費器</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("6", `停車場計費器`, `114彰化縣國中組`)}
${desc(`
某停車場採用分段計費，每滿一小時收費 40 元，未滿一小時的部分，仍以一小時計算。另外停車場有優惠：入場後停車 30 分鐘 (含) 以內免費，每日最高收費為 300 元。請根據輸入的進場與出場時間，計算應繳的停車費用。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 2 個四位數 HHMM_1、HHMM_2 (分次輸入)。HHMM_1 代表進場的時和分 (24 小時制)，HHMM_2 代表出場的時和分 (24 小時制)。假設進場與出場在同一天，且出場時間晚於進場時間。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出應繳的總停車費用。
`)}
${sample(1,
`0900<br/>
0930`,
`0`,
``)}
${sample(2,
`0830<br/>
1830`,
`300`,
``)}
${sample(3,
`1200<br/>
1726`,
`240`,
`停車 5 小時 26 分，未滿一小時以一小時計，共 6 小時，6×40 = 240 元。`)}
${sample(4,
`1053<br/>
1123`,
`0`,
``)}
${sample(5,
`1550<br/>
1818`,
`120`,
``)}
${sample(6,
`0907<br/>
1610`,
`300`,
``,
`{"data": ["0900;0930;0", "0830;1830;300", "1200;1726;240", "1053;1123;0", "1550;1818;120", "0907;1610;300"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('停車場計費器')}</span>
</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>7</td>
<td ${LIST_TD(false, false)}>分組活動</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("7", `分組活動`, `114彰化縣國中組`)}
${desc(`
學校要舉辦二場社團活動，老師希望二場活動都能分成「人數一樣的小組」，而且每一組人數是最多、組數是最少，這樣活動設計才公平。<br/>
例如：第一場有 84 位學生，第二場有 54 位學生，最佳的分組人數為每組 6 人 (可分為 14 組及 9 組，每組人數一樣且最多、分組數最少)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數 A、B (0 < A, B < 500)，代表兩場活動的學生人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出每一組的人數。
`)}
${sample(1,
`84<br/>
54`,
`6`,
`最佳的分組人數為每組 6 人 (可分為 14 組及 9 組，每組人數一樣且最多、分組數最少)。`)}
${sample(2,
`24<br/>
36`,
`12`,
``)}
${sample(3,
`407<br/>
481`,
`37`,
``)}
${sample(4,
`15<br/>
45`,
`15`,
``)}
${sample(5,
`48<br/>
72`,
`24`,
``)}
${sample(6,
`546<br/>
429`,
`39`,
``,
`{"data": ["84;54;6", "24;36;12", "407;481;37", "15;45;15", "48;72;24", "546;429;39"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('分組活動')}</span>
</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>8</td>
<td ${LIST_TD(false, false)}>列出成績排名</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("8", `列出成績排名`, `114彰化縣國中組`)}
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
`{"data": ["72;68;89;92;54;72", "47;32;13;8;66;32", "72;62;11;55;12;55", "67;7;89;42;0;42", "95;23;60;48;64;60", "40;6;37;24;31;31"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('列出成績排名')}</span>
</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>9</td>
<td ${LIST_TD(false, false)}>密碼移動</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("9", `密碼移動`, `114彰化縣國中組`)}
${desc(`
小華正在玩一個字母密碼遊戲。密碼是一串由大寫英文字母組成的字串 (只有 A ~ Z)。<br/>
每一個位置上的字母，會依照「這字串的長度」向後移動幾個字母，例如字串「ABC」就會向後移動 3 個字母。向後移動時，如果超過 Z，就從 A 繼續算起。<br/>
例如：A 向後移動 3 個字母 → D；Y 向後移動 2 個字母 → A；Z 向後移動 3 個字母 → C。<br/>
請你輸入字串長度 N 和原始字串，算出密碼移動後的新字串。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一個輸入：N (N < 30)。<br/>
第二個輸入：一個長度為 N 的大寫字母字串。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出密碼移動後的新字串。例如「ABC」字串長度 3，每個字母移動 3 個 → 「DEF」。
`)}
${sample(1,
`3<br/>
ABC`,
`DEF`,
``)}
${sample(2,
`5<br/>
AZBYC`,
`FEGDH`,
``)}
${sample(3,
`4<br/>
WXYZ`,
`ABCD`,
``)}
${sample(4,
`4<br/>
ABCD`,
`EFGH`,
``)}
${sample(5,
`3<br/>
XYZ`,
`ABC`,
``)}
${sample(6,
`6<br/>
MNTQRS`,
`STZWXY`,
``,
`{"data": ["3;ABC;DEF", "5;AZBYC;FEGDH", "4;WXYZ;ABCD", "4;ABCD;EFGH", "3;XYZ;ABC", "6;MNTQRS;STZWXY"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('密碼移動')}</span>
</td>
</tr>
`;

// ---------------- 第 10 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>10</td>
<td ${LIST_TD(false, false)}>種花計畫</td>
<td ${LIST_TD(false, false)}>114彰化縣國中組</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button'
 style='${ANSWER_BTN_STYLE}'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("10", `種花計畫`, `114彰化縣國中組`)}
${desc(`
在你家的後院，有一條長長的花圃，花圃中有些區塊已經種了花，其他區塊還是空的，為了讓花圃更加美麗，你打算再種下 n 朵花。<br/>
不過，為了讓花有足夠的空間和養分，兩朵花不能種在相鄰的區塊，也就是說，如果某個區塊已經有花，它左右相鄰的區塊就不能再種花。<br/>
你的任務是判斷：在不違反「不能相鄰」規則的情況下，花圃是否能再種下 n 朵花。<br/>
<br/>
輸入說明 (分次輸入)：<br/>
先輸入 i，代表接續有 i 筆資料 (0 < i < 20)。<br/>
接下來分別輸入 i 個 0 或 1，0 代表該區塊沒有種花，1 代表該區塊已經種花。<br/>
再輸入一個正整數 n，代表你打算再種下幾朵花 (0 < n < 20)。<br/>
<span ${LBL_OUT}>輸出說明</span>可以種下 n 朵花則輸出 True，不可以就輸出 False。
`)}
${sample(1,
`5<br/>
1<br/>
0<br/>
0<br/>
0<br/>
1<br/>
1`,
`True`,
`可以在第 3 區塊種下 1 朵花。`)}
${sample(2,
`5<br/>
1<br/>
0<br/>
0<br/>
0<br/>
1<br/>
2`,
`False`,
`只有第 3 區塊可以種下 1 朵花，無法種第 2 朵。`)}
${sample(3,
`7<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
0<br/>
4`,
`True`,
`可以在第 1、3、5、7 區塊共種下 4 朵花。`)}
${sample(4,
`8<br/>
1<br/>
0<br/>
0<br/>
0<br/>
1<br/>
0<br/>
0<br/>
1<br/>
2`,
`False`,
``)}
${sample(5,
`14<br/>
0<br/>
0<br/>
1<br/>
1<br/>
0<br/>
1<br/>
0<br/>
1<br/>
1<br/>
0<br/>
0<br/>
0<br/>
1<br/>
0<br/>
2`,
`True`,
``)}
${sample(6,
`14<br/>
0<br/>
0<br/>
0<br/>
0<br/>
1<br/>
0<br/>
0<br/>
0<br/>
1<br/>
1<br/>
0<br/>
0<br/>
0<br/>
0<br/>
5`,
`True`,
``,
`{"data": ["5;1;0;0;0;1;1;True", "5;1;0;0;0;1;2;False", "7;0;0;0;0;0;0;0;4;True", "8;1;0;0;0;1;0;0;1;2;False", "14;0;0;1;1;0;1;0;1;1;0;0;0;1;0;2;True", "14;0;0;0;0;1;0;0;0;1;1;0;0;0;0;5;True"]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${ANSWER_IMG_STYLE}">
</button>
${answerButtons('種花計畫')}</span>
</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
