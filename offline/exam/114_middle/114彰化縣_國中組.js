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
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>校外教學合照大挑戰</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>向左走向右走</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>生命值的最終審判</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>科技新創的擴張佈局</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>捉迷藏</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>停車場計費器</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>7
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>分組活動</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>8
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>列出成績排名</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>9
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>密碼移動</td>
</tr>
`;

// ---------------- 第 10 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
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
 onclick='${ONCLICK}'>10
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國中組</td>
<td ${LIST_TD(false)}>種花計畫</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
