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
${qHeader("1", `以禮相待`, `114臺中市國小組`)}
${desc(`
在「上古時期」，還沒有電子載具及雲端發票的存在前，每兩個月全家坐在一起拿著發票、聊著天一同兌獎的畫面是許多人的回憶。<br/>
蘇洵為避免兩個兒子蘇軾、蘇轍彼此對中發票吵架，於是訂定了他們家的規則：<br/>
(1) 對中發票後，中獎金額先補貼中獎發票的花費金額。<br/>
(2) 若還有盈餘 (剩下)，獎金由對中獎的人收下。<br/>
(3) 盈餘的金額假如大於 200，要對手足以禮相待，分享 100 元。<br/>
請輸出對中獎項的人可以拿到多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入花費金額，第二行輸入中獎金額。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出對中獎項的人可以實拿多少錢，格式為「金額元」(例如 390元)；若沒有盈餘則輸出「無盈餘」。
`)}
${sample(1,
`10<br/>
500`,
`390元`,
`先扣除花費金額 500 - 10 = 490。<br/>
因為盈餘大於 200 (490 &gt; 200)，所以進行「以禮相待」：490 - 100 = 390。<br/>
故輸出 390元。`)}
${sample(2,
`400<br/>
200`,
`無盈餘`,
`200 - 400 = -200，故輸出無盈餘。`)}
${sample(3,
`100<br/>
200`,
`100元`,
`先扣除花費金額 200 - 100 = 100。<br/>
因為盈餘小於 200，所以直接收下獎金 100 元。`,
`{"data": ["10;500;390元", "400;200;無盈餘", "100;200;100元"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國小組</td>
<td ${LIST_TD(false)}>以禮相待</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `統一發票`, `114臺中市國小組`)}
${desc(`
蘇家父子三人拿著統一發票滿懷期待的兌獎，中獎號碼如下：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>獎別</td><td ${TH}>中獎號碼</td><td ${TH}>說明</td></tr><tr><td ${TD}>特別獎</td><td ${TD}>25834483</td><td ${TD}>8 位數號碼與特別獎號碼相同</td></tr><tr><td ${TD}>特獎</td><td ${TD}>46587380</td><td ${TD}>8 位數號碼與特獎號碼相同</td></tr><tr><td ${TD}>頭獎</td><td ${TD}>41016094、98081574、07309261</td><td ${TD}>8 位數號碼與頭獎號碼相同</td></tr><tr><td ${TD}>二獎</td><td ${TD}></td><td ${TD}>末 7 位數與頭獎號碼末 7 位相同</td></tr><tr><td ${TD}>三獎</td><td ${TD}></td><td ${TD}>末 6 位數與頭獎號碼末 6 位相同</td></tr><tr><td ${TD}>四獎</td><td ${TD}></td><td ${TD}>末 5 位數與頭獎號碼末 5 位相同</td></tr><tr><td ${TD}>五獎</td><td ${TD}></td><td ${TD}>末 4 位數與頭獎號碼末 4 位相同</td></tr><tr><td ${TD}>六獎</td><td ${TD}></td><td ${TD}>末 3 位數與頭獎號碼末 3 位相同</td></tr></table><br/>
兌獎規則：<br/>
(1) 若發票數字末 X 碼對上頭獎數字末 X 碼，即得對應獎項 (取最高獎項)。例如發票數字 41235094，與第一組頭獎號碼末 3 碼相同，即得六獎。<br/>
(2) 若 8 碼與特獎或特別獎相同即得此獎項。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個發票號碼字串。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出所中獎項 (特別獎、特獎、頭獎、二獎 ~ 六獎)；沒對中輸出「無中獎」；若輸入不是 8 位數字，輸出「非統一編號」。
`)}
${sample(1,
`47887495`,
`無中獎`,
`號碼沒對中。`)}
${sample(2,
`54309261`,
`三獎`,
`與第三組頭獎 07309261 末 6 碼相同 (309261)，得三獎。`)}
${sample(3,
`451232`,
`非統一編號`,
`輸入數字不符合 8 碼規範。`)}
${sample(4,
`41235094`,
`六獎`,
`與第一組頭獎 41016094 末 3 碼相同。`,
`{"data": ["47887495;無中獎", "54309261;三獎", "451232;非統一編號", "41235094;六獎"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國小組</td>
<td ${LIST_TD(false)}>統一發票</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `閃電十一人`, `114臺中市國小組`)}
${desc(`
小明承辦了校際足球賽，需要一套自動計分與判定系統。每一場比賽會記錄進球、犯規情形，他想要將過程輸入後直接輸出是誰獲勝，請你幫忙完成這個系統。<br/>
基本規則：<br/>
一場比賽只有兩隊，且這場比賽只會發生兩種事情：進球 Goal、犯規 Foul。<br/>
進 1 球即得一分。<br/>
每犯規 3 次該隊扣 1 分。<br/>
扣分不會讓分數低於 0 分 (最後得分若小於 0 以 0 計)。<br/>
事件代碼：GA 為 A 隊進球、GB 為 B 隊進球、FA 為 A 隊犯規、FB 為 B 隊犯規。<br/>
請輸出球賽兩隊最終得分及比賽結果。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個正整數 N，代表比賽中事件數量；接下來 N 行，每一行輸入一個事件代碼 (GA、GB、FA、FB)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三行：A 隊最後得分、B 隊最後得分、比賽結果 (A Win、B Win 或 Draw)。
`)}
${sample(1,
`7<br/>
GA<br/>
FA<br/>
GA<br/>
FB<br/>
FB<br/>
FB<br/>
GB`,
`2<br/>
0<br/>
A Win`,
`A 隊：2 球、1 次犯規 → 得 2 分<br/>
B 隊：1 球、3 次犯規 → 得 1 - 1 = 0 分`)}
${sample(2,
`6<br/>
GA<br/>
GB<br/>
FA<br/>
FA<br/>
FA<br/>
GB`,
`0<br/>
2<br/>
B Win`,
`A 隊：1 球、3 次犯規 → 得 1 - 1 = 0 分<br/>
B 隊：2 球、0 次犯規 → 得 2 分`)}
${sample(3,
`4<br/>
GA<br/>
GB<br/>
FA<br/>
FB`,
`1<br/>
1<br/>
Draw`,
`A 隊：1 球、1 次犯規 → 得 1 分<br/>
B 隊：1 球、1 次犯規 → 得 1 分`,
`{"data": ["7;GA;FA;GA;FB;FB;FB;GB;2;0;A Win", "6;GA;GB;FA;FA;FA;GB;0;2;B Win", "4;GA;GB;FA;FB;1;1;Draw"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國小組</td>
<td ${LIST_TD(false)}>閃電十一人</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `紅牌與黃牌`, `114臺中市國小組`)}
${desc(`
小明發現，比賽過程中太沒有運動家精神了，因此他決定升級系統，加入黃牌與紅牌的判定。<br/>
基本規則：<br/>
一場比賽只有兩隊，且這場比賽只會發生兩種事情：進球 Goal、犯規 Foul。<br/>
進 1 球即得一分。<br/>
每犯規 3 次該隊扣 1 分。<br/>
扣分不會讓分數低於 0 分 (最後得分若小於 0 以 0 計)。<br/>
事件代碼：GA 為 A 隊進球、GB 為 B 隊進球、FA 為 A 隊犯規、FB 為 B 隊犯規。<br/>
新增規則：<br/>
每犯規 2 次 → 得 1 張黃牌。<br/>
同一隊累積 2 張黃牌 → 自動轉為 1 張紅牌。<br/>
一旦出現紅牌，該隊再扣 1 分。<br/>
紅牌只會影響一次，不會重複扣分。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個正整數 N，代表比賽中事件數量；接下來 N 行，每一行輸入一個事件代碼 (GA、GB、FA、FB)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三行：A 隊最後得分、B 隊最後得分、比賽結果 (A Win、B Win 或 Draw)。
`)}
${sample(1,
`6<br/>
GA<br/>
FA<br/>
FA<br/>
FA<br/>
FA<br/>
GB`,
`0<br/>
1<br/>
B Win`,
`A 隊：1 球 +1；4 次犯規 → 扣 1 分；2 張黃牌 → 1 張紅牌 → 再扣 1 分；總分 1 - 2 &lt; 0，以 0 計。<br/>
B 隊：1 球 → 1 分。`)}
${sample(2,
`5<br/>
GA<br/>
FA<br/>
FA<br/>
GB<br/>
FB`,
`1<br/>
1<br/>
Draw`,
`A 隊：1 球 +1；2 次犯規 → 1 張黃牌 (不扣分)；總分 1。<br/>
B 隊：1 球 +1；1 次犯規 → 無事發生；總分 1。`)}
${sample(3,
`8<br/>
GA<br/>
GA<br/>
FA<br/>
FA<br/>
FA<br/>
FA<br/>
GB<br/>
GB`,
`0<br/>
2<br/>
B Win`,
`A 隊：2 球 +2；4 次犯規 → 扣 1 分；2 張黃牌 → 1 張紅牌 → 扣 1 分；總分 2 - 2 = 0。<br/>
B 隊：2 球 +2；0 犯規；總分 2。`,
`{"data": ["6;GA;FA;FA;FA;FA;GB;0;1;B Win", "5;GA;FA;FA;GB;FB;1;1;Draw", "8;GA;GA;FA;FA;FA;FA;GB;GB;0;2;B Win"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國小組</td>
<td ${LIST_TD(false)}>紅牌與黃牌</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `提前結束`, `114臺中市國小組`)}
${desc(`
有隊伍因為被扣太多分所以轉而不斷犯規，因此小明加入提前結束比賽機制保護選手們。<br/>
基本規則：<br/>
一場比賽只有兩隊，且這場比賽只會發生兩種事情：進球 Goal、犯規 Foul。<br/>
進 1 球即得一分。<br/>
每犯規 3 次該隊扣 1 分。<br/>
扣分不會讓分數低於 0 分 (最後得分若小於 0 以 0 計)。<br/>
事件代碼：GA 為 A 隊進球、GB 為 B 隊進球、FA 為 A 隊犯規、FB 為 B 隊犯規。<br/>
黃牌紅牌規則：<br/>
每犯規 2 次 → 得 1 張黃牌；同一隊累積 2 張黃牌 → 自動轉為 1 張紅牌；一旦出現紅牌，該隊再扣 1 分 (只扣一次)。<br/>
提前結束規則：<br/>
任一隊出現 1 張紅牌 → 比賽立刻結束。<br/>
後續事件全部忽略。<br/>
輸出結果以「結束當下」為準。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個正整數 N，代表比賽中事件數量；接下來 N 行，每一行輸入一個事件代碼 (GA、GB、FA、FB)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三行：A 隊最後得分、B 隊最後得分、比賽結果 (A Win、B Win 或 Draw)。
`)}
${sample(1,
`7<br/>
GA<br/>
FA<br/>
FA<br/>
FA<br/>
GB<br/>
FA<br/>
GB`,
`0<br/>
1<br/>
B Win`,
`A 隊：1 球 +1；3 次犯規 → 扣 1 分；第 4 次犯規時 2 黃 → 1 紅 → 扣 1 分。<br/>
B 隊：1 球 → 1 分。<br/>
紅牌出現 → 比賽結束，後面的 GB 不計。`)}
${sample(2,
`6<br/>
GB<br/>
FB<br/>
FB<br/>
FB<br/>
FB<br/>
GA`,
`0<br/>
0<br/>
Draw`,
`B 隊：1 球 +1；4 次犯規 → 扣 1 分，並得 1 紅 → 再扣 1 分，以 0 計。<br/>
比賽提前結束，最後的 GA 不算。`)}
${sample(3,
`8<br/>
GA<br/>
GA<br/>
FA<br/>
FA<br/>
FA<br/>
FA<br/>
GB<br/>
GB`,
`0<br/>
0<br/>
Draw`,
`A 隊：2 球 +2；3 次犯規 → 扣 1 分；2 黃 → 1 紅 → 扣 1 分；總分 0。<br/>
A 隊拿紅牌後比賽結束，B 隊的 2 球不計，總分 0。`,
`{"data": ["7;GA;FA;FA;FA;GB;FA;GB;0;1;B Win", "6;GB;FB;FB;FB;FB;GA;0;0;Draw", "8;GA;GA;FA;FA;FA;FA;GB;GB;0;0;Draw"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114臺中市國小組</td>
<td ${LIST_TD(false)}>提前結束</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
