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
${qHeader("1", `尋找第 K 個訊號字母`, `114基隆市國中組`)}
${desc(`
在通訊工程中，為了過濾掉重複的雜訊，我們需要找出一段訊號中「不同字母」出現的順序。現在給你一個由大寫英文字母組成的字串 S，以及一個正整數 k，請找出該字串中第 k 個出現的不同字母。<br/>
規則說明：<br/>
1. 由左往右掃描字串。<br/>
2. 忽略所有已經出現過的字母 (不論是連續出現還是間隔出現，都不重複計算)。<br/>
3. 輸出第 k 個新出現的字母。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個大寫英文字母字串 S。<br/>
第二行輸入一個正整數 k。保證字串中不同字母的數量至少有 k 個。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個大寫字母，代表第 k 個出現的不同字母。
`)}
${sample(1,
`KEELUNG<br/>
3`,
`L`,
`字串掃描：K, E, (E 重複), L, U, N, G。<br/>
不同字母順序為：1.K, 2.E, 3.L, 4.U, 5.N, 6.G。<br/>
第 3 個不同字母為 L。`)}
${sample(2,
`GOOGLE<br/>
4`,
`E`,
`字串掃描：G, O, (O 重複), (G 重複), L, E。<br/>
第二個 G 雖然與第一個 G 中間隔著 O，但仍視為重複。<br/>
不同字母順序為：1.G, 2.O, 3.L, 4.E。第 4 個不同字母為 E。`)}
${sample(3,
`KEELUNG<br/>
3`,
`L`,
``)}
${sample(4,
`GOOGLE<br/>
4`,
`E`,
``)}
${sample(5,
`INTERNATIONAL<br/>
5`,
`R`,
``)}
${sample(6,
`PETERPIPERPICKED<br/>
6`,
`C`,
``)}
${sample(7,
`MISSISSIPPI<br/>
4`,
`P`,
``)}
${sample(8,
`ALPHABET<br/>
1`,
`A`,
``)}
${sample(9,
`SUCCESSFULNESS<br/>
5`,
`F`,
``)}
${sample(10,
`BANANABOAT<br/>
2`,
`A`,
``)}
${sample(11,
`ZYZYZYXYZ<br/>
3`,
`X`,
``)}
${sample(12,
`COMMUNICATION<br/>
8`,
`T`,
``,
`{"data": ["KEELUNG;3;L", "GOOGLE;4;E", "KEELUNG;3;L", "GOOGLE;4;E", "INTERNATIONAL;5;R", "PETERPIPERPICKED;6;C", "MISSISSIPPI;4;P", "ALPHABET;1;A", "SUCCESSFULNESS;5;F", "BANANABOAT;2;A", "ZYZYZYXYZ;3;X", "COMMUNICATION;8;T"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國中組</td>
<td ${LIST_TD(false)}>尋找第 K 個訊號字母</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `到底是誰沒來？`, `114基隆市國中組`)}
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
`{"data": ["5;5;5;2;4;1;3;全勤", "10;4;3;1;5;8;2;4;6;7;9;10", "15;7;3;8;1;12;5;10;14;2;4;6;7;9;11;13;15", "3;3;1;2;3;全勤", "7;5;5;2;4;1;3;6;7", "10;9;1;2;3;4;5;6;7;8;9;10", "4;1;2;1;3;4", "15;7;3;8;1;12;5;10;14;2;4;6;7;9;11;13;15"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國中組</td>
<td ${LIST_TD(false)}>到底是誰沒來？</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `終極特務的動態密碼`, `114基隆市國中組`)}
${desc(`
敵方為了防止暗號被輕易破解，開發了一種「動態位移系統」。你是特務組織的首席解碼專家，發現這組暗號的還原規則如下：<br/>
第 1 個字母要往前推移 1 格，例如第 1 個字母為 c，往前推移 1 格的字母為 b。<br/>
第 2 個字母要往前推移 2 格，例如第 2 個字母為 f，往前推移 2 格的字母為 d。<br/>
...以此類推，第 i 個字母要往前推移 i 格。<br/>
同樣地，如果往前推移超過了 a，必須繞回到 z 繼續計算。請寫一個程式，幫忙將這串動態加密的暗號還原成原本的訊息。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個由英文小寫字母組成的字串，代表敵方的動態暗號 (長度小於 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出還原後的原本訊息。
`)}
${sample(1,
`swq`,
`run`,
`s 往前 1 格為 r，w 往前 2 格為 u，q 往前 3 格為 n，還原為 run。`)}
${sample(2,
`fzlx`,
`exit`,
``)}
${sample(3,
`aaaa`,
`zyxw`,
``)}
${sample(4,
`b`,
`a`,
``)}
${sample(5,
`uqs`,
`top`,
``)}
${sample(6,
`ay`,
`zw`,
``)}
${sample(7,
`jtrr`,
`iron`,
``)}
${sample(8,
`qtrkwgturxr`,
`programming`,
``,
`{"data": ["swq;run", "fzlx;exit", "aaaa;zyxw", "b;a", "uqs;top", "ay;zw", "jtrr;iron", "qtrkwgturxr;programming"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國中組</td>
<td ${LIST_TD(false)}>終極特務的動態密碼</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `優質橘子裝箱策略`, `114基隆市國中組`)}
${desc(`
果農阿北將橘子依照品質分為「優級」、「良級」與「普級」。為了確保收益最大化，阿北制定了一套裝箱規則：<br/>
1. 固定裝箱：每箱必須湊滿固定數量 N 顆才能出貨計價。未滿 N 顆不計價。<br/>
2. 降級遞補：高品質的橘子如果湊不滿一箱，可以「降級」混入低一階的箱子中湊數。優級剩餘的可撥入良級；良級剩餘的 (含接收自優級的) 可撥入普級。<br/>
3. 計價規則：有裝成箱才計價，優級每箱 Pa 元、良級每箱 Pb 元、普級每箱 Pc 元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：四個整數 Qa、Qb、Qc、N (分別代表優級、良級、普級顆數與每箱容量)。<br/>
第二行：三個整數 Pa、Pb、Pc (分別代表優級、良級、普級單箱價格)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最終總收入。
`)}
${sample(1,
`45 10 15 20<br/>
1000 600 300`,
`2300`,
`優級 (45 顆)：裝滿 2 箱 (40 顆)，剩 5 顆。收入：2×1000 = 2000。<br/>
良級 (10+5 顆)：共 15 顆，未滿 20 顆，剩 15 顆。收入：0。<br/>
普級 (15+15 顆)：共 30 顆，裝滿 1 箱 (20 顆)，剩 10 顆。收入：1×300 = 300。<br/>
總收入：2300。`)}
${sample(2,
`45 10 15 20<br/>
1000 600 300`,
`2300`,
``)}
${sample(3,
`10 10 10 20<br/>
500 300 100`,
`300`,
``)}
${sample(4,
`60 60 60 20<br/>
100 50 10`,
`480`,
``)}
${sample(5,
`19 19 19 20<br/>
1000 500 100`,
`600`,
``)}
${sample(6,
`100 0 0 30<br/>
1000 500 100`,
`3000`,
``)}
${sample(7,
`10 20 30 10<br/>
100 50 10`,
`230`,
``)}
${sample(8,
`50 50 50 100<br/>
1000 500 100`,
`500`,
``)}
${sample(9,
`1 1 1 5<br/>
100 50 10`,
`0`,
``)}
${sample(10,
`100 100 100 1<br/>
10 5 1`,
`1600`,
``)}
${sample(11,
`20 20 20 20<br/>
1000 500 100`,
`1600`,
``,
`{"data": ["45;10;15;20;1000;600;300;2300", "45;10;15;20;1000;600;300;2300", "10;10;10;20;500;300;100;300", "60;60;60;20;100;50;10;480", "19;19;19;20;1000;500;100;600", "100;0;0;30;1000;500;100;3000", "10;20;30;10;100;50;10;230", "50;50;50;100;1000;500;100;500", "1;1;1;5;100;50;10;0", "100;100;100;1;10;5;1;1600", "20;20;20;20;1000;500;100;1600"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國中組</td>
<td ${LIST_TD(false)}>優質橘子裝箱策略</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `同樂會飲料訂單統計`, `114基隆市國中組`)}
${desc(`
期末同樂會需要寫一個程式把各組的訂購單彙整起來。同學會輸入想喝的「飲料名稱」與「杯數」，請你統計每一種飲料總共要幾杯。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個整數 N，代表共有 N 筆訂購資料。<br/>
第二行輸入 N 組資料，每組依序為「飲料名稱」與「杯數」。<br/>
<span ${LBL_OUT}>輸出說明</span>依照飲料第一次出現的順序，依序輸出每種飲料的「飲料名稱」與「總杯數」。
`)}
${sample(1,
`3<br/>
珍珠奶茶 2 綠茶 5 珍珠奶茶 3`,
`珍珠奶茶 5 綠茶 5`,
``)}
${sample(2,
`5<br/>
可樂 10 雪碧 5 可樂 2 紅茶 8 雪碧 3`,
`可樂 12 雪碧 8 紅茶 8`,
``)}
${sample(3,
`1<br/>
柳橙汁 20`,
`柳橙汁 20`,
``)}
${sample(4,
`1<br/>
可樂 5`,
`可樂 5`,
``)}
${sample(5,
`3<br/>
紅茶 2 綠茶 1 奶茶 4`,
`紅茶 2 綠茶 1 奶茶 4`,
``)}
${sample(6,
`2<br/>
多多綠 5 多多綠 5`,
`多多綠 10`,
``)}
${sample(7,
`5<br/>
黑糖檸檬 2 仙草凍奶茶 10 綠豆沙加牛奶 5 黑糖檸檬 3 仙草凍奶茶 2`,
`黑糖檸檬 5 仙草凍奶茶 12 綠豆沙加牛奶 5`,
``)}
${sample(8,
`6<br/>
可樂 10 雪碧 5 可樂 2 紅茶 8 雪碧 3 紅茶 1`,
`可樂 12 雪碧 8 紅茶 9`,
``,
`{"data": ["3;珍珠奶茶;2;綠茶;5;珍珠奶茶;3;珍珠奶茶;5;綠茶;5", "5;可樂;10;雪碧;5;可樂;2;紅茶;8;雪碧;3;可樂;12;雪碧;8;紅茶;8", "1;柳橙汁;20;柳橙汁;20", "1;可樂;5;可樂;5", "3;紅茶;2;綠茶;1;奶茶;4;紅茶;2;綠茶;1;奶茶;4", "2;多多綠;5;多多綠;5;多多綠;10", "5;黑糖檸檬;2;仙草凍奶茶;10;綠豆沙加牛奶;5;黑糖檸檬;3;仙草凍奶茶;2;黑糖檸檬;5;仙草凍奶茶;12;綠豆沙加牛奶;5", "6;可樂;10;雪碧;5;可樂;2;紅茶;8;雪碧;3;紅茶;1;可樂;12;雪碧;8;紅茶;9"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國中組</td>
<td ${LIST_TD(false)}>同樂會飲料訂單統計</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `過年大考驗——親等計算機`, `114基隆市國中組`)}
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
`{"data": ["3;A;A;B;B;C;D;C;D;3", "2;E;F;G;H;E;F;不是親戚", "3;A;A;B;B;C;D;C;D;3", "2;A;A;B;C;B;C;2", "3;A;B;C;B;C;D;A;D;3", "2;P;P;A;B;A;P;1", "4;G;G;A;B;A;B;C;D;C;D;4", "2;E;F;G;H;E;F;不是親戚", "1;K;P;K;P;1", "3;I;J;K;L;M;N;L;N;不是親戚", "8;R;S;T;T;U;V;W;X;S;T;U;V;W;X;Y;Z;Y;Z;6", "2;Z;Z;X;Y;X;Y;2"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114基隆市國中組</td>
<td ${LIST_TD(false)}>過年大考驗——親等計算機</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
