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
${qHeader("1", `營養午餐分析-1`, `114嘉義市國小組`)}
${desc(`
營養師負責規劃學校兩週 (共 10 天) 的營養午餐菜單，她希望小朋友能從食物中獲得足夠均衡營養，因此需要分析設計的菜單中是否符合規定。其中每天的「主菜種類」用以下字母表示：<br/>
A = 白肉 (雞肉、魚肉)；B = 紅肉 (豬肉、牛肉)；C = 豆製品；D = 蛋類；E = 海鮮 (非魚)；F = 蔬菜主菜 (如蔬菜炒豆乾)<br/>
若規定「每 5 天至少要出現 1 次豆製品 (C) 才算健康」，請檢查：第 1 ~ 5 天是否符合？第 6 ~ 10 天是否符合？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入最近兩週 (第 1 天到第 10 天) 的主菜記錄，共 10 個字母，例如 A B C A E C B A D C。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出第 1 ~ 5 天、第 6 ~ 10 天的結果，Y 代表符合，N 代表不符合。
`)}
${sample(1,
`B A B A B C D E F F`,
`N Y`,
`1 ~ 5 天沒有 C，不符合；6 ~ 10 天有 C，符合。`)}
${sample(2,
`C A B C D A B C D E`,
`Y Y`,
`兩週都有出現 C，皆符合。`)}
${sample(3,
`A A A D C E F B B C`,
`Y Y`,
`兩週都有出現 C，皆符合。`,
`{"data": ["B;A;B;A;B;C;D;E;F;F;N;Y", "C;A;B;C;D;A;B;C;D;E;Y;Y", "A;A;A;D;C;E;F;B;B;C;Y;Y"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>營養午餐分析-1</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `營養午餐分析-2`, `114嘉義市國小組`)}
${desc(`
營養師負責規劃學校兩週 (共 10 天) 的營養午餐菜單，她希望小朋友能從食物中獲得足夠均衡營養，因此需要分析設計的菜單中是否符合規定。其中每天的「主菜種類」用以下字母表示：<br/>
A = 白肉 (雞肉、魚肉)；B = 紅肉 (豬肉、牛肉)；C = 豆製品；D = 蛋類；E = 海鮮 (非魚)；F = 蔬菜主菜 (如蔬菜炒豆乾)<br/>
營養師想知道每週是否「紅肉攝取過量」。規則：「B 的總次數不可超過 A 與 C 次數的總和」。請檢查：第 1 ~ 5 天是否有超量？第 6 ~ 10 天是否有超量？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入最近兩週 (第 1 天到第 10 天) 的主菜記錄，共 10 個字母，例如 A B C A E C B A D C。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出第 1 ~ 5 天、第 6 ~ 10 天的結果，Y 代表有超量，N 代表未超量。
`)}
${sample(1,
`B A B A B C D E F F`,
`Y N`,
`1 ~ 5 天 B 有 3 次，A+C 只有 2 次，超量；6 ~ 10 天未超量。`)}
${sample(2,
`C A B C D A B C D E`,
`N N`,
`兩週皆未超量。`)}
${sample(3,
`A A A D C E F B B C`,
`N Y`,
`1 ~ 5 天未超量；6 ~ 10 天 B 有 2 次，A+C 只有 1 次，超量。`,
`{"data": ["B;A;B;A;B;C;D;E;F;F;Y;N", "C;A;B;C;D;A;B;C;D;E;N;N", "A;A;A;D;C;E;F;B;B;C;N;Y"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>營養午餐分析-2</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `營養午餐分析-3`, `114嘉義市國小組`)}
${desc(`
營養師負責規劃學校兩週 (共 10 天) 的營養午餐菜單，她希望小朋友能從食物中獲得足夠均衡營養，因此需要分析設計的菜單中是否符合規定。其中每天的「主菜種類」用以下字母表示：<br/>
A = 白肉 (雞肉、魚肉)；B = 紅肉 (豬肉、牛肉)；C = 豆製品；D = 蛋類；E = 海鮮 (非魚)；F = 蔬菜主菜 (如蔬菜炒豆乾)<br/>
請分別統計：第 1 ~ 5 天共出現幾次「白肉 (A) 之後緊接著紅肉 (B)」？第 6 ~ 10 天共出現幾次「白肉 (A) 之後緊接著紅肉 (B)」？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入最近兩週 (第 1 天到第 10 天) 的主菜記錄，共 10 個字母，例如 A B C A E C B A D C。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出第一週次數、第二週次數。
`)}
${sample(1,
`B A B A B C D E F F`,
`2 0`,
`1 ~ 5 天 2 次，6 ~ 10 天 0 次。`)}
${sample(2,
`C A B C D A B C D E`,
`1 1`,
`1 ~ 5 天 1 次，6 ~ 10 天 1 次。`)}
${sample(3,
`A A A D C E F B B C`,
`0 0`,
`1 ~ 5 天 0 次，6 ~ 10 天 0 次。`,
`{"data": ["B;A;B;A;B;C;D;E;F;F;2;0", "C;A;B;C;D;A;B;C;D;E;1;1", "A;A;A;D;C;E;F;B;B;C;0;0"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>營養午餐分析-3</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `營養午餐分析-4`, `114嘉義市國小組`)}
${desc(`
營養師負責規劃學校兩週 (共 10 天) 的營養午餐菜單，她希望小朋友能從食物中獲得足夠均衡營養，因此需要分析設計的菜單中是否符合規定。其中每天的「主菜種類」用以下字母表示：<br/>
A = 白肉 (雞肉、魚肉)；B = 紅肉 (豬肉、牛肉)；C = 豆製品；D = 蛋類；E = 海鮮 (非魚)；F = 蔬菜主菜 (如蔬菜炒豆乾)<br/>
在這 10 天裡，哪一種主菜出現次數最多？(假設只有一種主菜是最多)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入最近兩週 (第 1 天到第 10 天) 的主菜記錄，共 10 個字母，例如 A B C A E C B A D C。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出出現次數最多的主菜字母。
`)}
${sample(1,
`B A B A B C D E F F`,
`B`,
``)}
${sample(2,
`C A B C D A B C D E`,
`C`,
``)}
${sample(3,
`A A A D C E F B B C`,
`A`,
``,
`{"data": ["B;A;B;A;B;C;D;E;F;F;B", "C;A;B;C;D;A;B;C;D;E;C", "A;A;A;D;C;E;F;B;B;C;A"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>營養午餐分析-4</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `停車費計算`, `114嘉義市國小組`)}
${desc(`
停車場採用階梯式收費方式，停車 1 小時內有優惠，超過 1 小時後依半小時計費。計費方式如下：<br/>
1. 停車時間小於或等於 30 分鐘，收費 20 元。<br/>
2. 停車時間在 31 ~ 60 分鐘之間，收費 40 元。<br/>
3. 若停車時間超過 60 分鐘，則在 60 分鐘以後的時間，每 30 分鐘加收 30 元，若剩餘不足 30 分鐘，也以 30 分鐘計算。<br/>
另外單日無論停車時間多長，單日最高收費上限為 400 元。若停車超過 24 小時 (1440 分鐘)，剩餘不足 24 小時部分一樣享有 1 小時優惠。請計算本次停車應繳的費用。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入停車分鐘數 (整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出應繳納的費用 (整數)。
`)}
${sample(1,
`100`,
`100`,
`停車 60 分鐘以 40 元計算，超過的 40 分鐘每 30 分鐘加 30 元 (不足 30 分鐘也收 30 元)，40+30+30 = 100 元。`)}
${sample(2,
`820`,
`400`,
`停車 820 分鐘，未超過 1 日，但金額超過單日 400 元上限，故以 400 元計。`)}
${sample(3,
`1443`,
`420`,
`停車 1443 分鐘，超過 1 日，單日 400 元為上限，隔日的 3 分鐘繳費 20 元，合計 400+20 = 420 元。`,
`{"data": ["100;100", "820;400", "1443;420"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>停車費計算</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `班級活動票選`, `114嘉義市國小組`)}
${desc(`
班上將舉辦期末班級活動，本次活動地點有 5 個候選選項，編號為 1、2、3、4、5，每位同學有 1 票。請設計一個程式讀取所有同學投票的地點編號，統計每個地點的得票數，並依下列規則輸出結果：<br/>
1. 若只有一個地點得票最高，輸出該地點編號。<br/>
2. 若最高票有多個地點同票，輸出全部最高票的地點編號，並依照地點編號由小到大依序排列。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行：投票人數；第二行：每票選擇的活動地點編號。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最高票活動地點編號，或全部並列最高票的地點編號 (由小到大)。
`)}
${sample(1,
`4<br/>
1 5 1 5`,
`1 5`,
`地點 1 與地點 5 並列最高票。`)}
${sample(2,
`5<br/>
1 2 1 1 4`,
`1`,
`地點 1 獲得最高票。`)}
${sample(3,
`8<br/>
3 4 5 1 3 4 5 1`,
`1 3 4 5`,
`地點 1、3、4、5 並列最高票。`,
`{"data": ["4;1;5;1;5;1;5", "5;1;2;1;1;4;1", "8;3;4;5;1;3;4;5;1;1;3;4;5"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>班級活動票選</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("7", `班級集星比賽`, `114嘉義市國小組`)}
${desc(`
小波的班上規定，若學生表現良好，老師就會給學生一張星星貼紙。小波希望找出在哪個連續 K 天中，他得到的星星貼紙總數最多。如果出現兩段或兩段以上的連續 K 天星星總數一樣多，請選最早開始的那一段 (第 1 天訂為 1)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行：總天數。<br/>
第 2 行：每一天獲得的星星貼紙數量。<br/>
第 3 行：要計算的連續天數 K。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出開始天數和最大星星總數。
`)}
${sample(1,
`6<br/>
10 2 3 4 1 5<br/>
3`,
`1 15`,
`第 1 天起連續 3 天獲得最多 15 顆星星 (10+2+3)。`)}
${sample(2,
`7<br/>
1 2 10 12 5 3 1<br/>
3`,
`3 27`,
`第 3 天起連續 3 天獲得最多 27 顆星星 (10+12+5)。`)}
${sample(3,
`8<br/>
5 1 5 1 5 1 5 1<br/>
4`,
`1 12`,
`第 1 天起連續 4 天獲得最多 12 顆星星 (5+1+5+1)，與其他同分區段相比最早開始。`,
`{"data": ["6;10;2;3;4;1;5;3;1;15", "7;1;2;10;12;5;3;1;3;3;27", "8;5;1;5;1;5;1;5;1;4;1;12"]}`)}
'
 onclick='${ONCLICK}'>7
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>班級集星比賽</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("8", `森林小火車的能量大冒險`, `114嘉義市國小組`)}
${desc(`
小佳設計了一款桌遊，在森林裡有一列環狀小火車，繞著 5 個車站 (編號 1 到 5) 載客。小火車從 1 號站出發，一開始火車上有 10 顆能量糖果。<br/>
遊戲規則：<br/>
1. 環狀鐵軌：火車開到底會回到起點。例如：在 5 號站再往前開 1 步，就會回到 1 號站。<br/>
2. 前進方式：以丟骰子決定走 N 步，也會同步消耗 N 顆能量糖果。例如在 1 號站時骰子出現 3，火車會直接移動至 4 號站，同時消耗 3 顆能量糖果。<br/>
3. 車站補給：抵達車站後，站長會送糖果 (正數) 或是請你分享糖果給小動物 (負數)。<br/>
特殊狀況：<br/>
【太重了！】火車最多只能載 30 顆糖果。如果領完補給後超過 30 顆，火車上只留 30 顆。<br/>
【沒力了！】如果糖果變成 0 顆或更少，森林國王會緊急救援，直接把糖果設為 5 顆讓火車重新出發。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行：5 個車站個別能量糖果的增減。<br/>
第 2 行：小火車行駛的總次數。<br/>
第 3 行：每次移動距離 (骰子丟出的步數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出所有行程結束後，火車上最終剩餘的能量糖果數量。
`)}
${sample(1,
`0 15 -5 15 -10<br/>
2<br/>
1 2`,
`30`,
`起始 10 顆。移動 1 步到 2 號站：10+15-1 = 24；移動 2 步到 4 號站：24+15-2 = 37，太重了調整成 30。`)}
${sample(2,
`0 15 -5 15 -10<br/>
2<br/>
4 3`,
`5`,
`起始 10 顆。移動 4 步到 5 號站：10-10-4 = -4，沒力了調整成 5；移動 3 步到 3 號站：5-5-3 = -3，調整成 5。`,
`{"data": ["0;15;-5;15;-10;2;1;2;30", "0;15;-5;15;-10;2;4;3;5"]}`)}
'
 onclick='${ONCLICK}'>8
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>森林小火車的能量大冒險</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("9", `玩具收納挑戰`, `114嘉義市國小組`)}
${desc(`
小安負責為玩具夢工場的展覽玩具進行裝箱。工場裡有 N 件 (N 不大於 6) 大小不一的玩具，必須使用容量統一的標準收納箱，每個箱子的玩具總重量都不能超過 20 單位。小安採用以下步驟來裝箱：<br/>
(1) 逐一裝箱：按照玩具重量輸入的順序，一件一件依序處理。<br/>
(2) 對於每件玩具，依序檢查所有已經打開的收納箱：若某個已開啟收納箱的剩餘空間裝得下此玩具，就把這件玩具放入第一個裝得下的收納箱；如果所有已打開的收納箱都裝不下，則開啟一個新的收納箱。<br/>
請你計算依照上述步驟收納這些玩具，需要多少個標準收納箱？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第 1 行：玩具件數；第 2 行：每件玩具的重量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出需要的收納箱數。
`)}
${sample(1,
`4<br/>
10 10 9 1`,
`2`,
`箱 1：10+10；箱 2：9+1。共 2 箱。`)}
${sample(2,
`4<br/>
11 11 11 11`,
`4`,
`每件 11 單位，兩件相加會超過 20，需要 4 箱。`)}
${sample(3,
`5<br/>
19 19 19 1 1`,
`3`,
`三件 19 各佔一箱，兩件 1 分別放入第 1、2 箱，共 3 箱。`,
`{"data": ["4;10;10;9;1;2", "4;11;11;11;11;4", "5;19;19;19;1;1;3"]}`)}
'
 onclick='${ONCLICK}'>9
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國小組</td>
<td ${LIST_TD(false)}>玩具收納挑戰</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
