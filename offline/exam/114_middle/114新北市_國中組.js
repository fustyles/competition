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
${qHeader("1", `航運費用計算`, `114新北市國中組`)}
${desc(`
大運河航道共有 1 號至 20 號停靠站，為了調節不同區域的水位，系統將 10 號站設為核心水門 (閘門)。<br/>
船隻在航行時，若必須開啟水門提升或降低水位，則會產生額外費用。計費規則如下：<br/>
1. 基本通行費：若航行路徑未跨越水門 (起訖站皆在 10 號站(含)之前，或皆在 10 號站(含)之後)，收費 10 點。<br/>
2. 水門操作費：若航行路徑「跨越」第 10 號站 (即其中一站小於(不含) 10 號，另一站大於(不含) 10 號站)，則費用加倍，收費 20 點。<br/>
3. 小船優惠：若船隻排水量數值未滿(不含) 12，則視為小型船隻，通行費享半價優惠 (5 折)。<br/>
請撰寫一個程式，讀入起點站編號、終點站編號與船隻重量，計算應付之通行費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入為三個整數，依次為起點編號、終點編號、船隻重量。起點、終點範圍為 1 ~ 20 的整數；排水量為正整數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應付通行費 (單位：點)。
`)}
${sample(1,
`5 8 18`,
`10`,
`第 5 站航行至第 8 站，排水量 18，屬大型船，沒啟動水門，收費 10 點。`)}
${sample(2,
`7 12 20`,
`20`,
`第 7 站航行到第 12 站，排水量 20，屬大型船，有啟動水門，收費 20 點。`)}
${sample(3,
`13 10 8`,
`5`,
`第 13 站航行到第 10 站，排水量 8，屬小型船，沒啟動水門，打五折，收費 5 點。`)}
${sample(4,
`1 9 30`,
`10`,
``)}
${sample(5,
`2 11 15`,
`20`,
``)}
${sample(6,
`10 15 40`,
`10`,
``)}
${sample(7,
`15 1 7`,
`10`,
``)}
${sample(8,
`9 10 5`,
`5`,
``)}
${sample(9,
`12 14 12`,
`10`,
``)}
${sample(10,
`3 13 11`,
`10`,
``)}
${sample(11,
`8 6 70`,
`10`,
``)}
${sample(12,
`11 10 3`,
`5`,
``)}
${sample(13,
`4 12 12`,
`20`,
``,
`{"data": ["5;8;18;10", "7;12;20;20", "13;10;8;5", "1;9;30;10", "2;11;15;20", "10;15;40;10", "15;1;7;10", "9;10;5;5", "12;14;12;10", "3;13;11;10", "8;6;70;10", "11;10;3;5", "4;12;12;20"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114新北市國中組</td>
<td ${LIST_TD(false)}>航運費用計算</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `我的健康小管家`, `114新北市國中組`)}
${desc(`
BMR 指人體在休息狀態下，維持新陳代謝所需的熱量，例如：呼吸、器官運作、體溫維持等，即使整天躺著不動也會消耗的最低熱量。BMR 會隨著年紀增加或體重減輕而降低，會隨著肌肉量增加而上升。這種維持生命所需消耗的最低熱量，就叫做基礎代謝率 (BMR)。BMR 就像是我們身體的「待機電力」。<br/>
BMR 簡易計算：我們使用一個簡化的 BMR 公式 (參考女性 BMR 公式)，並將年齡固定為 14 歲，只讓程式根據體重和身高來計算。簡化後 BMR 估算公式如下：<br/>
BMR = 655 + (9.6 * 體重(kg)) + (1.8 * 身高(cm)) - (4.7 * 14)<br/>
程式計算出 BMR 數值 (需四捨五入至整數) 後，會用下表標準來分類：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>BMR 數值 (大卡)</td><td ${TH}>基礎能量等級</td></tr><tr><td ${TD}>小於 1200</td><td ${TD}>極低能量</td></tr><tr><td ${TD}>1200 到 1499</td><td ${TD}>較低能量</td></tr><tr><td ${TD}>1500 到 1799</td><td ${TD}>標準能量</td></tr><tr><td ${TD}>1800 到 2099</td><td ${TD}>較高能量</td></tr><tr><td ${TD}>2100 以上</td><td ${TD}>極高能量</td></tr></table><br/>
<span ${LBL_IN}>輸入說明</span>依序輸入身高 (cm)、體重 (kg) 兩個數值。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 BMR 值 (整數) 與基礎能量等級。
`)}
${sample(1,
`170<br/>
55`,
`1423 較低能量`,
`655+(9.6*55)+(1.8*170)-(4.7*14)=1423.2，四捨五入取整數 1423。<br/>
1423 介於 1200 到 1499，輸出較低能量。`)}
${sample(2,
`175<br/>
70`,
`1576 標準能量`,
`655+(9.6*70)+(1.8*175)-(4.7*14)=1576.2，取整數 1576。<br/>
1576 介於 1500 到 1799，輸出標準能量。`)}
${sample(3,
`150<br/>
35`,
`1195 極低能量`,
``)}
${sample(4,
`160<br/>
45`,
`1309 較低能量`,
``)}
${sample(5,
`165<br/>
50`,
`1366 較低能量`,
``)}
${sample(6,
`170<br/>
55`,
`1423 較低能量`,
``)}
${sample(7,
`168<br/>
58`,
`1448 較低能量`,
``)}
${sample(8,
`170<br/>
63`,
`1500 標準能量`,
``)}
${sample(9,
`175<br/>
70`,
`1576 標準能量`,
``)}
${sample(10,
`175<br/>
93.5`,
`1802 較高能量`,
``)}
${sample(11,
`180<br/>
123.5`,
`2099 較高能量`,
``)}
${sample(12,
`180<br/>
124`,
`2104 極高能量`,
``,
`{"data": ["170;55;1423;較低能量", "175;70;1576;標準能量", "150;35;1195;極低能量", "160;45;1309;較低能量", "165;50;1366;較低能量", "170;55;1423;較低能量", "168;58;1448;較低能量", "170;63;1500;標準能量", "175;70;1576;標準能量", "175;93.5;1802;較高能量", "180;123.5;2099;較高能量", "180;124;2104;極高能量"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114新北市國中組</td>
<td ${LIST_TD(false)}>我的健康小管家</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `智慧倉儲`, `114新北市國中組`)}
${desc(`
螃蟹超商是購物頻道的取貨店，店面有三種尺寸的貨物櫃子：大櫃子、中櫃子、小櫃子，各有一定數量。<br/>
今天店員要把一批貨物放進櫃子中，每個貨物都有「長、寬、高」三個尺寸 (單位：公分)，並遵守以下規則：<br/>
1. 一個櫃子只能放一個貨物。<br/>
2. 若貨物在「長、寬、高」任一方向超過 80 公分，只能放進大櫃子。<br/>
3. 否則，若貨物在「長、寬、高」任一方向超過 30 公分但不超過 80 公分 (30 < 尺寸 ≤ 80)，可以放進中櫃子或大櫃子。<br/>
4. 其餘貨物 (三邊尺寸皆 ≤ 30 公分)，可以放進小櫃子、中櫃子或大櫃子。<br/>
5. 在貨物可以擺放進去的前提下，必須盡可能選擇尺寸較小的櫃子 (優先使用小櫃子，其次中櫃子，最後才使用大櫃子)，以節省空間。<br/>
6. 如果對某件貨物來說，所有可使用的櫃子尺寸都已經用完 (沒有空櫃可用)，則該貨物無法被放入任何櫃子。<br/>
請你依照上述規則，計算各尺寸櫃子實際使用了多少個，以及共有幾件貨物無法放進任何櫃子。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
前三個輸入為三個非負整數 L、M、S，分別代表大、中、小櫃子的數量。<br/>
接下來輸入一個正整數 N，代表貨物的件數。<br/>
接下來 3*N 個輸入：每三個一組，分別代表該貨物的長、寬、高 (公分)。<br/>
<span ${LBL_OUT}>輸出說明</span>共有四個輸出，依序為使用的大櫃子數量、使用的中櫃子數量、使用的小櫃子數量、無法放入任何櫃子的貨物件數。
`)}
${sample(1,
`2 2 2<br/>
3<br/>
30 30 30<br/>
30 30 30<br/>
30 30 40`,
`0 1 2 0`,
`1 個貨物放中櫃子，2 個貨物放小櫃子，都依尺寸放置。`)}
${sample(2,
`2 1 1<br/>
3<br/>
30 30 30<br/>
30 30 30<br/>
30 30 40`,
`1 1 1 0`,
`1 個貨物放中櫃子，1 個貨物放小櫃子，另外一個貨物因為中、小櫃子滿了，放大櫃子。`)}
${sample(3,
`1 2 5<br/>
4<br/>
60 30 30<br/>
30 60 30<br/>
30 60 65<br/>
100 5 5`,
`1 2 0 1`,
`2 個貨物放中櫃子，1 個貨物放大櫃子，另外一個貨物因為中、大櫃子滿了，無法放進去任何櫃子。`)}
${sample(4,
`1 1 1<br/>
1<br/>
10 20 30`,
`0 0 1 0`,
``)}
${sample(5,
`1 1 1<br/>
1<br/>
40 20 50`,
`0 1 0 0`,
``)}
${sample(6,
`1 0 1<br/>
1<br/>
10 40 10`,
`1 0 0 0`,
``)}
${sample(7,
`5 5 5<br/>
2<br/>
15 40 100<br/>
5 10 15`,
`1 0 1 0`,
``)}
${sample(8,
`0 0 0<br/>
1<br/>
100 100 100`,
`0 0 0 1`,
``)}
${sample(9,
`1 1 0<br/>
2<br/>
40 20 10<br/>
20 20 10`,
`1 1 0 0`,
``)}
${sample(10,
`2 2 2<br/>
4<br/>
10 15 10<br/>
20 20 10<br/>
10 15 10<br/>
105 10 50`,
`1 1 2 0`,
``)}
${sample(11,
`1 1 3<br/>
4<br/>
10 12 10<br/>
40 50 60<br/>
40 40 40<br/>
50 50 50`,
`1 1 1 1`,
``)}
${sample(12,
`0 2 0<br/>
3<br/>
100 10 10<br/>
50 40 30<br/>
20 10 5`,
`0 2 0 1`,
``)}
${sample(13,
`1 2 2<br/>
5<br/>
30 30 30<br/>
30 40 40<br/>
50 50 80<br/>
80 80 80<br/>
90 80 80`,
`1 2 1 1`,
``,
`{"data": ["2;2;2;3;30;30;30;30;30;30;30;30;40;0;1;2;0", "2;1;1;3;30;30;30;30;30;30;30;30;40;1;1;1;0", "1;2;5;4;60;30;30;30;60;30;30;60;65;100;5;5;1;2;0;1", "1;1;1;1;10;20;30;0;0;1;0", "1;1;1;1;40;20;50;0;1;0;0", "1;0;1;1;10;40;10;1;0;0;0", "5;5;5;2;15;40;100;5;10;15;1;0;1;0", "0;0;0;1;100;100;100;0;0;0;1", "1;1;0;2;40;20;10;20;20;10;1;1;0;0", "2;2;2;4;10;15;10;20;20;10;10;15;10;105;10;50;1;1;2;0", "1;1;3;4;10;12;10;40;50;60;40;40;40;50;50;50;1;1;1;1", "0;2;0;3;100;10;10;50;40;30;20;10;5;0;2;0;1", "1;2;2;5;30;30;30;30;40;40;50;50;80;80;80;80;90;80;80;1;2;1;1"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114新北市國中組</td>
<td ${LIST_TD(false)}>智慧倉儲</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `王牌教練`, `114新北市國中組`)}
${desc(`
你是學校田徑隊的教練，現在有 4 或 5 名選手準備參加 400 公尺接力賽。<br/>
接力賽需要 4 名選手上場，若有第 5 名選手，則作為「替補」，不一定上場。<br/>
對於每一位選手，我們知道兩個數值：跑完全程所需時間 (單位：秒)、接棒動作所需時間 (單位：秒)。<br/>
在比賽中，總時間的計算方式如下：<br/>
1. 總跑步時間 = 實際上場的 4 名選手，各自跑步時間的總和。<br/>
2. 接棒時間：接力共有 4 棒，因此有 3 次接棒：第 1 棒 → 第 2 棒、第 2 棒 → 第 3 棒、第 3 棒 → 第 4 棒。每一次接棒的時間，為這兩位選手的「接棒時間中較大的那一個」。因此，第 1 棒和第 4 棒各只參與 1 次接棒，第 2 棒和第 3 棒各參與 2 次接棒。<br/>
你的目標是：從這 N 名選手 (4 ≤ N ≤ 5) 中選出 4 人上場 (如果剛好是 4 人就全員上場)，並決定他們的出場順序 (第 1 棒到第 4 棒)，讓總時間最小。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>共有 1+2N 個輸入。第 1 個輸入為整數 N，代表選手人數 (4 ≤ N ≤ 5)；接下來 2*N 個輸入，每二個一組，分別代表該選手跑完全程所需時間 r (秒)、接棒動作所需時間 b (秒)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表在最佳安排下，整隊接力的最短總時間 (單位：秒)。
`)}
${sample(1,
`4<br/>
10 1<br/>
10 1<br/>
10 1<br/>
10 1`,
`43`,
`四位選手的素質都一樣，接棒三次，總計 10+10+10+10+1+1+1 共 43 秒。`)}
${sample(2,
`4<br/>
13 1<br/>
9 4<br/>
12 2<br/>
11 3`,
`54`,
`選手編號 2 3 1 4 排列，計算出最短秒數為 9+12+13+11+4+2+3=54 秒。`)}
${sample(3,
`5<br/>
12 3<br/>
15 4<br/>
13 2<br/>
11 6<br/>
11 1`,
`58`,
`選手編號 5 3 1 4 排列，計算出最短秒數為 11+13+12+11+2+3+6=58 秒。`)}
${sample(4,
`4<br/>
11 1<br/>
11 1<br/>
11 1<br/>
11 1`,
`47`,
``)}
${sample(5,
`4<br/>
11 2<br/>
12 4<br/>
13 1<br/>
11 2`,
`55`,
``)}
${sample(6,
`4<br/>
12 3<br/>
15 4<br/>
13 2<br/>
11 6`,
`64`,
``)}
${sample(7,
`4<br/>
11 8<br/>
12 2<br/>
12 2<br/>
12 2`,
`59`,
``)}
${sample(8,
`4<br/>
25 1<br/>
10 3<br/>
10 3<br/>
10 3`,
`64`,
``)}
${sample(9,
`4<br/>
10 5<br/>
11 2<br/>
12 7<br/>
9 3`,
`57`,
``)}
${sample(10,
`4<br/>
9 9<br/>
12 1<br/>
13 2<br/>
14 3`,
`62`,
``)}
${sample(11,
`5<br/>
10 1<br/>
10 2<br/>
10 3<br/>
10 4<br/>
10 5`,
`49`,
``)}
${sample(12,
`5<br/>
18 5<br/>
12 3<br/>
11 4<br/>
16 3<br/>
10 1`,
`59`,
``)}
${sample(13,
`5<br/>
18 1<br/>
16 2<br/>
14 3<br/>
12 4<br/>
10 5`,
`64`,
``,
`{"data": ["4;10;1;10;1;10;1;10;1;43", "4;13;1;9;4;12;2;11;3;54", "5;12;3;15;4;13;2;11;6;11;1;58", "4;11;1;11;1;11;1;11;1;47", "4;11;2;12;4;13;1;11;2;55", "4;12;3;15;4;13;2;11;6;64", "4;11;8;12;2;12;2;12;2;59", "4;25;1;10;3;10;3;10;3;64", "4;10;5;11;2;12;7;9;3;57", "4;9;9;12;1;13;2;14;3;62", "5;10;1;10;2;10;3;10;4;10;5;49", "5;18;5;12;3;11;4;16;3;10;1;59", "5;18;1;16;2;14;3;12;4;10;5;64"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114新北市國中組</td>
<td ${LIST_TD(false)}>王牌教練</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
