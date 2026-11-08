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
const ANSWER_GROUP = '114嘉義縣國中組';   // exam/answer/ 底下的資料夾名稱
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
${qHeader("1", `自動販賣機的補貨通知`, `114嘉義縣國中組`)}
${desc(`
學校走廊上有一台受歡迎的自動販賣機。為了確保飲料隨時充足，管理員小華每天會查看 N 個飲料格位的剩餘數量。請你幫小華寫一個程式，計算整台販賣機目前「總共還剩多少瓶飲料」，並且計算有幾個格位「缺貨」(剩餘數量低於 5 瓶)，需要小華去補貨。<br/>
任務一：把所有格位的剩餘量加起來，得到總數。<br/>
任務二：檢查每個格位，如果剩餘量小於 5，則補貨次數加 1。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表格位數量。<br/>
第二行：N 個整數，代表每個格位的飲料剩餘量。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數，代表整台機器的飲料總剩餘量及需要補貨的格位數量 (剩餘量小於 5)。
`)}
${sample(1,
`5<br/>
10 2 8 3 20`,
`43 2`,
`總剩餘量：10+2+8+3+20 = 43。缺貨判斷：2 和 3 小於 5，共有 2 個格位需要補貨。`)}
${sample(2,
`3<br/>
0 4 0`,
`4 3`,
`總剩餘量：4。缺貨判斷：0、4、0 皆小於 5，全部 3 個格位都需要補貨。`)}
${sample(3,
`3<br/>
10 10 10`,
`30 0`,
``)}
${sample(4,
`4<br/>
4 4 4 4`,
`16 4`,
``)}
${sample(5,
`5<br/>
1 2 3 4 5`,
`15 4`,
``)}
${sample(6,
`6<br/>
0 10 0 10 0 10`,
`30 3`,
``)}
${sample(7,
`5<br/>
20 20 1 20 20`,
`81 1`,
``,
`{"data": ["5;10;2;8;3;20;43;2", "3;0;4;0;4;3", "3;10;10;10;30;0", "4;4;4;4;4;16;4", "5;1;2;3;4;5;15;4", "6;0;10;0;10;0;10;30;3", "5;20;20;1;20;20;81;1"]}`)}
'
 onclick='${ONCLICK}'>1
</button> ${answerButtons('自動販賣機的補貨通知')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>自動販賣機的補貨通知</td>
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
${qHeader("2", `5 進位解碼`, `114嘉義縣國中組`)}
${desc(`
程式設計社的入社考題是一串神秘代碼。代碼由 A、B、C、D、E 五個字母組成，這其實是一個「5 進位」數字系統：A=0, B=1, C=2, D=3, E=4。<br/>
例如密碼 B C 代表 5 進位的 12，換算成 10 進位就是 1 × 5 + 2 = 7。請編寫程式將密碼解碼為 10 進位數字。<br/>
權重計算：最右邊位數是 5 的 0 次方 (任何數的 0 次方為 1)，左邊一位是 5 的 1 次方，以此類推。將每個字母轉換為對應數值後，計算總和。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 L，代表密碼長度。<br/>
第二行：L 個字母 (A ~ E)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (10 進位數值)。
`)}
${sample(1,
`2<br/>
B C`,
`7`,
`B=1, C=2。1 × 5 + 2 = 7。`)}
${sample(2,
`3<br/>
B A E`,
`29`,
`B=1, A=0, E=4。1 × 25 + 0 × 5 + 4 × 1 = 29。`)}
${sample(3,
`1<br/>
A`,
`0`,
``)}
${sample(4,
`2<br/>
E E`,
`24`,
``)}
${sample(5,
`3<br/>
B A A`,
`25`,
``)}
${sample(6,
`4<br/>
B A A A`,
`125`,
``)}
${sample(7,
`5<br/>
C D E A B`,
`1726`,
``,
`{"data": ["2;B;C;7", "3;B;A;E;29", "1;A;0", "2;E;E;24", "3;B;A;A;25", "4;B;A;A;A;125", "5;C;D;E;A;B;1726"]}`)}
'
 onclick='${ONCLICK}'>2
</button> ${answerButtons('5 進位解碼')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>5 進位解碼</td>
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
${qHeader("3", `圖書館的舊書打包`, `114嘉義縣國中組`)}
${desc(`
學校圖書館正在進行舊書義賣，小華負責將舊書裝箱。為了節省箱子，小華決定採用一個策略：先把書按重量「由重到輕」排好。每次拿出一個新箱子時，優先嘗試放入最重的書，箱子剩下的空間如果放得下就放進去，放不下就跳過這本，試下一本較輕的書，直到所有書都檢查過一輪，這個箱子就封箱。接著拿新箱子重複上述步驟，直到所有書都裝完。<br/>
注意：箱子在封箱前要由重到輕，確認已經裝不下任何一本未裝箱的書了。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 W (箱子最大承重)。<br/>
第二行：一個整數 N (書本數量)。<br/>
第三行：N 個整數 (每本書重量，已由重到輕排序)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總共需要的箱子數量。
`)}
${sample(1,
`10<br/>
5<br/>
8 5 4 3 2`,
`3`,
`箱 1：裝 8 (剩 2)，5、4、3 放不下，裝 2。(內容：8, 2)<br/>
箱 2：剩 5, 4, 3。裝 5 (剩 5)，裝 4 (剩 1)，3 放不下。(內容：5, 4)<br/>
箱 3：裝 3。共 3 箱。`)}
${sample(2,
`20<br/>
3<br/>
10 10 10`,
`2`,
`箱 1：裝 10、裝 10 (滿)。箱 2：裝 10。共 2 箱。`)}
${sample(3,
`5<br/>
3<br/>
2 2 2`,
`2`,
``)}
${sample(4,
`10<br/>
5<br/>
9 9 5 1 1`,
`3`,
``)}
${sample(5,
`100<br/>
4<br/>
60 50 40 30`,
`2`,
``)}
${sample(6,
`15<br/>
6<br/>
8 7 6 5 4 3`,
`3`,
``)}
${sample(7,
`25<br/>
13<br/>
20 19 18 17 16 10 9 8 7 6 3 2 1`,
`6`,
``,
`{"data": ["10;5;8;5;4;3;2;3", "20;3;10;10;10;2", "5;3;2;2;2;2", "10;5;9;9;5;1;1;3", "100;4;60;50;40;30;2", "15;6;8;7;6;5;4;3;3", "25;13;20;19;18;17;16;10;9;8;7;6;3;2;1;6"]}`)}
'
 onclick='${ONCLICK}'>3
</button> ${answerButtons('圖書館的舊書打包')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>圖書館的舊書打包</td>
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
${qHeader("4", `校車廣播系統熱血指數統計`, `114嘉義縣國中組`)}
${desc(`
快樂國中一年級的戶外教學日終於到了！全班同學搭上了前往遊樂園的校車。然而，去程的高速公路意外地塞車了，同學們一個個開始打哈欠，甚至有人睡著了。<br/>
身為康樂股長的小明，手中掌握著一份班上同學投票選出的「熱門歌曲清單」。這份清單上的每一首歌都有一個對應的「熱血指數」。指數越高，代表這首歌越能讓大家 High 起來 (抒情歌的指數可能很低，甚至可能是負的)。<br/>
校車的廣播系統有一個特殊的限制：一次設定只能連續播放 K 首歌曲。小明需要從這份歌單中，挑選出連續的 K 首歌，使得這段時間內的「熱血指數總和」達到最高。請你寫一個程式幫助小明，在給定的歌單順序中，找出那一段連續 K 首歌的熱血總和最大是多少。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 K，代表廣播系統一次必須連續播放的歌曲數量。<br/>
第二行：整數 N，代表歌單中總共有 N 首歌。<br/>
第三行：N 個整數，依序代表歌單中第 1 首到第 N 首歌的「熱血指數」。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (最大總和)。
`)}
${sample(1,
`3<br/>
5<br/>
10 20 30 10 50`,
`90`,
`(10+20+30) = 60、(20+30+10) = 60、(30+10+50) = 90 (最大)`)}
${sample(2,
`2<br/>
4<br/>
5 100 100 5`,
`200`,
`連續 2 首的組合：(5+100) = 105、(100+100) = 200、(100+5) = 105。最大值為 200。`)}
${sample(3,
`2<br/>
4<br/>
1 2 3 4`,
`7`,
``)}
${sample(4,
`3<br/>
5<br/>
5 5 5 5 5`,
`15`,
``)}
${sample(5,
`2<br/>
5<br/>
100 10 10 10 100`,
`110`,
``)}
${sample(6,
`4<br/>
8<br/>
1 2 100 100 100 2 1 1`,
`302`,
``)}
${sample(7,
`3<br/>
6<br/>
50 10 50 10 50 10`,
`110`,
``,
`{"data": ["3;5;10;20;30;10;50;90", "2;4;5;100;100;5;200", "2;4;1;2;3;4;7", "3;5;5;5;5;5;5;15", "2;5;100;10;10;10;100;110", "4;8;1;2;100;100;100;2;1;1;302", "3;6;50;10;50;10;50;10;110"]}`)}
'
 onclick='${ONCLICK}'>4
</button> ${answerButtons('校車廣播系統熱血指數統計')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>校車廣播系統熱血指數統計</td>
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
${qHeader("5", `大風吹搶位子`, `114嘉義縣國中組`)}
${desc(`
隔宿露營的晚會高潮，班聯會設計了一個刺激的「電子傳球大風吹」遊戲。全班 N 位同學圍繞營火坐成一圈，每個人身上都有一個原本的號碼牌 (從 1 號到 N 號)。遊戲開始時，一顆發光的電子球從 1 號同學手中開始順時針傳遞。這顆電子球設定為傳遞 M 次爆炸：從目前拿球的人開始算第 1 次，傳給下一位算第 2 次…一直數到第 M 個人，持有球的那個人就被淘汰，必須立刻離開圓圈。被淘汰的人離開後，圓圈會縮小，球交給下一位還在圈子裡的同學，重新開始從 1 數到 M。遊戲持續進行，直到圓圈只剩下最後一位同學。請設計一個程式，算出最後留下的那位同學原本的號碼是多少。<br/>
例如 N=5，M=2：<br/>
第 1 輪：從 1 號開始數 (1, 2)，2 號淘汰。剩下：1, 3, 4, 5。<br/>
第 2 輪：從 3 號開始數 (3, 4)，4 號淘汰。剩下：1, 3, 5。<br/>
第 3 輪：從 5 號開始數 (5, 1)，1 號淘汰。剩下：3, 5。<br/>
第 4 輪：從 3 號開始數 (3, 5)，5 號淘汰。剩下：3。<br/>
最後贏家是 3 號。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 N (人數)。<br/>
第二行：整數 M (間隔)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (贏家編號)。
`)}
${sample(1,
`5<br/>
2`,
`3`,
`依序淘汰 2、4、1、5，最後剩下 3。`)}
${sample(2,
`4<br/>
1`,
`4`,
`每次數 1 人 (即立刻淘汰當前的人)，淘汰順序：1 → 2 → 3，最後剩下 4。`)}
${sample(3,
`3<br/>
1`,
`3`,
``)}
${sample(4,
`4<br/>
2`,
`1`,
``)}
${sample(5,
`5<br/>
3`,
`4`,
``)}
${sample(6,
`7<br/>
4`,
`2`,
``)}
${sample(7,
`10<br/>
3`,
`4`,
``,
`{"data": ["5;2;3", "4;1;4", "3;1;3", "4;2;1", "5;3;4", "7;4;2", "10;3;4"]}`)}
'
 onclick='${ONCLICK}'>5
</button> ${answerButtons('大風吹搶位子')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>大風吹搶位子</td>
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
${qHeader("6", `園遊會攤位熱度分析`, `114嘉義縣國中組`)}
${desc(`
園遊會地圖由「路口」和「走道」組成。學生會想知道哪個路口連接了最多條走道 (最熱門交會點)，以便安排引導人員。<br/>
1. 給定路口數 N 與走道數 E。<br/>
2. 統計每個路口連接的走道數量。<br/>
3. 輸出連接數最多的路口編號 (若數量相同，輸出編號較小的)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 N (路口數)。<br/>
第二行：整數 E (走道數)。<br/>
第三行：E 個整數，代表每條走道的一端 (起點列表)。<br/>
第四行：E 個整數，代表每條走道的另一端 (終點列表)。<br/>
(第三行的第 i 個數字與第四行的第 i 個數字代表一條連接的走道。例如：第三行是 1 2 3，第四行是 2 3 4，代表連接為 1-2、2-3、3-4)<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (最熱門路口編號)。
`)}
${sample(1,
`3<br/>
2<br/>
1 1<br/>
2 3`,
`1`,
`走道：(1-2)、(1-3)。路口 1 連了 2 條，路口 2、3 各連了 1 條，輸出 1。`)}
${sample(2,
`4<br/>
3<br/>
1 2 3<br/>
2 3 4`,
`2`,
`連線：(1-2)、(2-3)、(3-4)。路口 2 和 3 都連了 2 條，輸出較小的 2。`)}
${sample(3,
`3<br/>
2<br/>
1 2<br/>
2 3`,
`2`,
``)}
${sample(4,
`4<br/>
3<br/>
1 1 1<br/>
2 3 4`,
`1`,
``)}
${sample(5,
`5<br/>
4<br/>
1 2 3 4<br/>
2 3 4 5`,
`2`,
``)}
${sample(6,
`5<br/>
5<br/>
1 2 3 4 5<br/>
2 3 4 5 1`,
`1`,
``)}
${sample(7,
`6<br/>
4<br/>
1 3 4 6<br/>
2 2 5 5`,
`2`,
``,
`{"data": ["3;2;1;1;2;3;1", "4;3;1;2;3;2;3;4;2", "3;2;1;2;2;3;2", "4;3;1;1;1;2;3;4;1", "5;4;1;2;3;4;2;3;4;5;2", "5;5;1;2;3;4;5;2;3;4;5;1;1", "6;4;1;3;4;6;2;2;5;5;2"]}`)}
'
 onclick='${ONCLICK}'>6
</button> ${answerButtons('園遊會攤位熱度分析')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>園遊會攤位熱度分析</td>
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
${qHeader("7", `園遊會尋找幸運抽獎號`, `114嘉義縣國中組`)}
${desc(`
園遊會中最熱門的攤位是「幸運跳格子」挑戰賽。地上畫了一排共有 N 格的格子 (編號從 1 到 N)。參賽者從起點 (第 0 格) 出發，每次跳躍只能選擇「跳 1 格」或「跳 2 格」。<br/>
例如：要跳到第 3 格，可以有三種跳法：(1, 1, 1)、(1, 2)、(2, 1)。<br/>
學生會長想知道，如果要剛好停在第 N 格領取大獎，總共有多少種不同的跳法組合？若剛好停在第 N 格可能的走法數為 F(N) 種，我們可觀察到：<br/>
F(1) = 1，F(2) = 2，F(3) = F(2) + F(1) = 3，F(4) = F(3) + F(2) = 5，…<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>一個整數 N，代表目標格子。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表到達第 N 格的總跳法數。
`)}
${sample(1,
`3`,
`3`,
`共有 3 種跳法：(1, 1, 1)、(1, 2)、(2, 1)。`)}
${sample(2,
`4`,
`5`,
`共有 5 種跳法：(1,1,1,1)、(1,1,2)、(1,2,1)、(2,1,1)、(2,2)。`)}
${sample(3,
`1`,
`1`,
``)}
${sample(4,
`5`,
`8`,
``)}
${sample(5,
`7`,
`21`,
``)}
${sample(6,
`10`,
`89`,
``)}
${sample(7,
`20`,
`10946`,
``,
`{"data": ["3;3", "4;5", "1;1", "5;8", "7;21", "10;89", "20;10946"]}`)}
'
 onclick='${ONCLICK}'>7
</button> ${answerButtons('園遊會尋找幸運抽獎號')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>園遊會尋找幸運抽獎號</td>
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
${qHeader("8", `園遊會人潮高峰期`, `114嘉義縣國中組`)}
${desc(`
一年一度的校慶園遊會順利落幕了！學生會決定用數據來說話。他們在校門口和各個攤位區安裝了「人流感測器」，感測器每隔一段時間就會記錄一次「人潮淨流量」：<br/>
如果是正數 (例如 +50)：代表進來的人比出去的人多，人潮正在累積。<br/>
如果是負數 (例如 -30)：代表離開的人比進來的人多，人潮正在消散。<br/>
學生會會長小華想要找出一段連續的時間區間，這段時間內的「淨流量總和」是最大的。請注意，如果所有可能的區間總和都是負數，請直接輸出 0。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表總共記錄了 N 筆時段的數據。<br/>
第二行：N 個整數，依序代表第 1 個時段到第 N 個時段的人潮淨流量 (有正有負)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (最大和)；如果所有可能的區間總和都是負數，請輸出 0。
`)}
${sample(1,
`3<br/>
-1 2 -1`,
`2`,
`所有連續區間中，只取第 2 個時段 (2) 的總和最大，輸出 2。`)}
${sample(2,
`4<br/>
-5 -2 -9 -1`,
`0`,
`所有人流皆為負成長，沒有人潮高峰，輸出 0。`)}
${sample(3,
`3<br/>
1 2 3`,
`6`,
``)}
${sample(4,
`4<br/>
-1 -2 -3 -4`,
`0`,
``)}
${sample(5,
`5<br/>
2 -1 2 -1 2`,
`4`,
``)}
${sample(6,
`6<br/>
-2 5 -1 5 -10 2`,
`9`,
``)}
${sample(7,
`5<br/>
10 -20 30 -5 10`,
`35`,
``,
`{"data": ["3;-1;2;-1;2", "4;-5;-2;-9;-1;0", "3;1;2;3;6", "4;-1;-2;-3;-4;0", "5;2;-1;2;-1;2;4", "6;-2;5;-1;5;-10;2;9", "5;10;-20;30;-5;10;35"]}`)}
'
 onclick='${ONCLICK}'>8
</button> ${answerButtons('園遊會人潮高峰期')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>園遊會人潮高峰期</td>
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
${qHeader("9", `園遊會場地復原大作戰`, `114嘉義縣國中組`)}
${desc(`
熱鬧的園遊會終於圓滿落幕了！現在是最後的場地復原時間。操場的跑道旁整齊地排列著 N 堆分類好的垃圾包。為了避免混亂，每位志工必須負責清理「連續」的幾堆垃圾，不能跳著拿 (例如：小明不能拿了第 1 堆又跑去拿第 3 堆，他必須拿第 1、2、3 堆這樣連續的一段)。你是衛生組長，你有 M 位志工可以調度。你的目標是：「讓工作量最重的那位志工，搬運的重量越輕越好」。<br/>
換句話說，你要把這一列垃圾切成 M 段，分配給 M 個人，請你計算出在最完美的分配策略下，那個「搬最多重量的人」，他最少只需要搬多少公斤？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 M (志工人數)。<br/>
第二行：整數 N (垃圾堆數)。<br/>
第三行：N 個整數 (垃圾重量)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (最小化的最大工作量)。
`)}
${sample(1,
`2<br/>
5<br/>
2 4 3 6 5`,
`11`,
`最理想的狀況為分成 (2, 4, 3) 和 (6, 5) 兩段，重量分別為 9 與 11，最小化最大工作量為 11。`)}
${sample(2,
`3<br/>
3<br/>
10 20 30`,
`30`,
`3 個志工，剛好每人負責一堆，工作量分別為 10、20、30，最小化最大工作量為 30。`)}
${sample(3,
`2<br/>
3<br/>
1 1 1`,
`2`,
``)}
${sample(4,
`3<br/>
3<br/>
10 20 30`,
`30`,
``)}
${sample(5,
`2<br/>
4<br/>
10 20 30 40`,
`60`,
``)}
${sample(6,
`3<br/>
6<br/>
1 2 3 4 5 6`,
`9`,
``)}
${sample(7,
`1<br/>
5<br/>
1 2 3 4 5`,
`15`,
``,
`{"data": ["2;5;2;4;3;6;5;11", "3;3;10;20;30;30", "2;3;1;1;1;2", "3;3;10;20;30;30", "2;4;10;20;30;40;60", "3;6;1;2;3;4;5;6;9", "1;5;1;2;3;4;5;15"]}`)}
'
 onclick='${ONCLICK}'>9
</button> ${answerButtons('園遊會場地復原大作戰')}
</td>
<td ${LIST_TD(false)}>114嘉義縣國中組</td>
<td ${LIST_TD(false)}>園遊會場地復原大作戰</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
