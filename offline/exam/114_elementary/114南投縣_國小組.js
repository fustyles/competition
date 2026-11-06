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
${qHeader("1", `遊樂園的自動售票機`, `114南投縣國小組`)}
${desc(`
遊樂園引進了一套自動售票機系統，用來快速計算團體遊客的門票總金額。每位遊客依據「是否持有縣民卡」、「年齡」、「身高」等條件，適用不同的票價。<br/>
收費規則 (依下列順序判斷)：<br/>
1. 縣民卡免費：持有縣民卡者，門票為 0 元。<br/>
2. 敬老票：年齡大於等於 65 歲者，票價為 150 元。<br/>
3. 兒童票：身高小於 120 公分或年齡小於 6 歲者，票價為 180 元。<br/>
4. 全票：不符合以上條件者，票價為 300 元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個整數 N，代表遊客人數。<br/>
第二行輸入 3×N 個整數，每 3 個為一組，依序代表：身高 (公分)、年齡 (歲)、縣民卡 (1 表示有，0 表示無)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表這一團遊客的門票總金額。
`)}
${sample(1,
`2<br/>
170 25 1 100 8 0`,
`180`,
`第一位：有縣民卡 → 0 元。第二位：無卡，身高 100 (小於 120) → 兒童票 180 元。總計 180 元。`)}
${sample(2,
`3<br/>
180 30 0 160 70 0 110 5 1`,
`450`,
`第一位：全票 300 元。第二位：敬老票 150 元。第三位：有縣民卡 → 0 元。總計 450 元。`)}
${sample(3,
`1<br/>
170 30 0`,
`300`,
``)}
${sample(4,
`1<br/>
110 10 0`,
`180`,
``)}
${sample(5,
`2<br/>
160 70 0 130 40 0`,
`450`,
``)}
${sample(6,
`3<br/>
150 5 0 180 30 1 160 65 0`,
`330`,
``)}
${sample(7,
`4<br/>
170 40 0 115 7 0 140 70 1 180 20 0`,
`780`,
``,
`{"data": ["2;170;25;1;100;8;0;180", "3;180;30;0;160;70;0;110;5;1;450", "1;170;30;0;300", "1;110;10;0;180", "2;160;70;0;130;40;0;450", "3;150;5;0;180;30;1;160;65;0;330", "4;170;40;0;115;7;0;140;70;1;180;20;0;780"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>遊樂園的自動售票機</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `勇者的挑戰`, `114南投縣國小組`)}
${desc(`
勇者正在地下城探險。他會遇到怪物 (扣血) 或撿到藥水 (補血)。請模擬他的血量變化。要注意的是，血量有上限，補血不能補超過上限；且一旦血量歸零或變負數，勇者就倒下了，血量歸零，之後的事件都不會發生，輸出為 0。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 H，代表初始血量 (同時也是血量上限)。<br/>
第二行：一個整數 N (N > 0)，代表發生了 N 個事件。<br/>
第三行：N 個整數，代表 N 個事件造成的數值變化。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最終血量。
`)}
${sample(1,
`100<br/>
4<br/>
-30 50 -10 -5`,
`85`,
`事件 1：100-30 = 70；事件 2：70+50 = 120，超過上限，修正為 100；事件 3：100-10 = 90；事件 4：90-5 = 85。`)}
${sample(2,
`50<br/>
3<br/>
-60 20 -10`,
`0`,
`事件 1：50-60 = -10，勇者陣亡，血量為 0，之後的事件不會發生。`)}
${sample(3,
`100<br/>
1<br/>
-20`,
`80`,
``)}
${sample(4,
`100<br/>
2<br/>
-30 80`,
`100`,
``)}
${sample(5,
`50<br/>
3<br/>
-60 200 -10`,
`0`,
``)}
${sample(6,
`120<br/>
4<br/>
-30 -50 -50 200`,
`0`,
``)}
${sample(7,
`77<br/>
6<br/>
-20 10 10 -35 20 15`,
`77`,
``,
`{"data": ["100;4;-30;50;-10;-5;85", "50;3;-60;20;-10;0", "100;1;-20;80", "100;2;-30;80;100", "50;3;-60;200;-10;0", "120;4;-30;-50;-50;200;0", "77;6;-20;10;10;-35;20;15;77"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>勇者的挑戰</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `跳水比賽成績計算`, `114南投縣國小組`)}
${desc(`
跳水比賽為求公平性，會去除評審中較極端的成績。比賽共聘用 5 ~ 10 位評審，每位評審會給予參賽者 0 ~ 10 分的評價。參賽者的總成績計算方式如下：<br/>
1. 讀入 N 位評審的分數 (未排序)。<br/>
2. 去除一個最高分與一個最低分。<br/>
3. 剩餘評審分數的總和即為該選手的最終得分。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個整數 N (5 ≤ N ≤ 10)，代表評審人數；第二行輸入 N 個整數 (0 ~ 10)，代表每位評審給的分數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表去除最高分與最低分後的總成績。
`)}
${sample(1,
`5<br/>
9 8 10 6 7`,
`24`,
`去除最高分 10 與最低分 6，剩餘分數 9 + 8 + 7 = 24。`)}
${sample(2,
`6<br/>
8 8 8 8 8 8`,
`32`,
``)}
${sample(3,
`7<br/>
10 9 8 7 6 5 4`,
`35`,
``)}
${sample(4,
`10<br/>
0 10 5 6 7 8 9 4 3 2`,
`44`,
``)}
${sample(5,
`5<br/>
0 0 10 10 5`,
`15`,
``,
`{"data": ["5;9;8;10;6;7;24", "6;8;8;8;8;8;8;32", "7;10;9;8;7;6;5;4;35", "10;0;10;5;6;7;8;9;4;3;2;44", "5;0;0;10;10;5;15"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>跳水比賽成績計算</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `籃球機得分計算`, `114南投縣國小組`)}
${desc(`
雙打籃球機在每場遊戲中提供 1P、2P 兩位玩家 5 ~ 10 次不等的投籃機會。每投進 1 球得 1 分，未投進得 0 分。<br/>
若某次投籃進球，且「前一次投籃也進球」，則該次投籃得 3 分；若進球但前一次未進球 (或為第一球)，則得 1 分。<br/>
請寫程式模擬籃球機的得分計算，輸入每次投籃結果 (1 表示進球，0 表示未進)，輸出兩位玩家單場遊戲的總得分，以及獲勝的玩家名稱 (1P、2P，若同分則顯示「不分勝負」)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入整數 N (5 ~ 10)。<br/>
第二行輸入 N 個整數 (0 或 1)，代表 1P 玩家每次投籃是否命中。<br/>
第三行輸入 N 個整數 (0 或 1)，代表 2P 玩家每次投籃是否命中。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 1P 總分、2P 總分、勝出玩家名稱。
`)}
${sample(1,
`5<br/>
1 0 1 1 0<br/>
0 1 1 1 1`,
`5 10 2P`,
`1P 得分：1 + 0 + 1 + 3 + 0 = 5；2P 得分：0 + 1 + 3 + 3 + 3 = 10。2P 總分較高，勝出。`)}
${sample(2,
`5<br/>
0 1 0 1 0<br/>
0 0 0 0 0`,
`2 0 1P`,
``)}
${sample(3,
`6<br/>
1 1 1 0 1 0<br/>
0 1 1 1 1 0`,
`8 10 2P`,
``)}
${sample(4,
`9<br/>
0 1 0 1 0 1 0 1 0<br/>
0 0 0 0 0 0 0 0 0`,
`4 0 1P`,
``)}
${sample(5,
`8<br/>
1 1 0 1 1 0 1 1<br/>
1 1 1 0 1 1 1 0`,
`12 14 2P`,
``)}
${sample(6,
`7<br/>
1 1 0 1 1 0 1<br/>
1 1 0 1 1 0 1`,
`9 9 不分勝負`,
``,
`{"data": ["5;1;0;1;1;0;0;1;1;1;1;5;10;2P", "5;0;1;0;1;0;0;0;0;0;0;2;0;1P", "6;1;1;1;0;1;0;0;1;1;1;1;0;8;10;2P", "9;0;1;0;1;0;1;0;1;0;0;0;0;0;0;0;0;0;0;4;0;1P", "8;1;1;0;1;1;0;1;1;1;1;1;0;1;1;1;0;12;14;2P", "7;1;1;0;1;1;0;1;1;1;0;1;1;0;1;9;9;不分勝負"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>籃球機得分計算</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `玩具收納運送計算`, `114南投縣國小組`)}
${desc(`
夢想玩具工坊每天需要將完成的玩具裝箱後，運送到展示倉庫。為了確保運送安全，每一個標準收納箱最多只能承載 20 公斤的玩具重量。<br/>
玩具會依照製作完成的順序，一件一件依序處理。當嘗試將某件玩具放入目前使用的收納箱時，若箱內現有玩具重量加上該玩具後超過 20 公斤，則該玩具不可放入此箱，該箱立即封箱，並改使用一個新的收納箱來放置該玩具。<br/>
請根據輸入的玩具重量資料，計算需要多少個收納箱，才能將所有玩具依序安全裝箱完成。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行：一個整數 N，代表玩具的件數；第二行：N 個整數，代表每件玩具的重量 (公斤)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表需要的收納箱數量。
`)}
${sample(1,
`6<br/>
5 6 4 7 9 3`,
`2`,
`第一箱：5+6+4 = 15，加入 7 會超過 20 → 封箱。第二箱：7+9+3 = 19，未超過 20。共需要 2 個收納箱。`)}
${sample(2,
`5<br/>
8 9 6 3 4`,
`2`,
`第一箱：8+9 = 17，加入 6 會超過 20 → 封箱。第二箱：6+3+4 = 13 → 封箱。共需要 2 個收納箱。`)}
${sample(3,
`1<br/>
20`,
`1`,
``)}
${sample(4,
`4<br/>
5 5 5 5`,
`1`,
``)}
${sample(5,
`5<br/>
9 9 9 9 9`,
`3`,
``)}
${sample(6,
`6<br/>
12 3 4 6 5 2`,
`2`,
``)}
${sample(7,
`8<br/>
2 2 2 2 2 2 2 2`,
`1`,
``,
`{"data": ["6;5;6;4;7;9;3;2", "5;8;9;6;3;4;2", "1;20;1", "4;5;5;5;5;1", "5;9;9;9;9;9;3", "6;12;3;4;6;5;2;2", "8;2;2;2;2;2;2;2;2;1"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>玩具收納運送計算</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `碼易丁飲料店-1 飲料總金額計算`, `114南投縣國小組`)}
${desc(`
小明家的巷口開了一間名叫「碼易丁」的飲料店。身為資訊科技高手的你，決定要寫幾個小程式來幫助小明解決店裡遇到的各種計算問題。<br/>
子題一：客人買了數杯飲料時，計算總共需要付多少錢。飲料店販售 5 種飲料：<br/>
1 號：珍珠奶茶 (每杯 45 元)<br/>
2 號：伯爵紅茶 (每杯 25 元)<br/>
3 號：烏龍綠茶 (每杯 30 元)<br/>
4 號：四季春茶 (每杯 40 元)<br/>
5 號：黑糖珍珠鮮奶茶 (每杯 60 元)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入數字 N，表示總共 N 杯飲料；第二行依序輸入每杯飲料的編號 (1 ~ 5)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出此次訂單的總金額。
`)}
${sample(1,
`3<br/>
1 3 5`,
`135`,
`1 → 45 元、3 → 30 元、5 → 60 元，總金額 = 45 + 30 + 60 = 135 元。`)}
${sample(2,
`5<br/>
2 2 4 1 3`,
`165`,
`2 → 25 元、2 → 25 元、4 → 40 元、1 → 45 元、3 → 30 元，總金額 = 165 元。`)}
${sample(3,
`4<br/>
5 5 5 5`,
`240`,
``)}
${sample(4,
`1<br/>
1`,
`45`,
``)}
${sample(5,
`10<br/>
2 2 2 2 2 1 1 1 1 1`,
`350`,
``,
`{"data": ["3;1;3;5;135", "5;2;2;4;1;3;165", "4;5;5;5;5;240", "1;1;45", "10;2;2;2;2;2;1;1;1;1;1;350"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>碼易丁飲料店-1 飲料總金額計算</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("7", `碼易丁飲料店-2 付款與找零`, `114南投縣國小組`)}
${desc(`
子題二：請修改程式，讓程式可以依序輸入飲料編號及數量，計算總金額後，再讀取客人支付的金額，並計算應該找給客人多少錢；如果客人付的錢不夠，也要提醒小明。飲料價格如下：<br/>
1 號：珍珠奶茶 (每杯 45 元)<br/>
2 號：伯爵紅茶 (每杯 25 元)<br/>
3 號：烏龍綠茶 (每杯 30 元)<br/>
4 號：四季春茶 (每杯 40 元)<br/>
5 號：黑糖珍珠鮮奶茶 (每杯 60 元)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入整數 N，表示有 N 項飲料訂單。<br/>
第二行輸入 2N 個數字，依序代表飲料編號 (1 ~ 5) 與數量 (1 ~ 20)。<br/>
第三行輸入數字 M，代表客人支付金額。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
付款足夠：依序輸出「總金額」、X、「應找錢」、Y (例如：總金額 240 應找錢 260)。<br/>
付款不足：依序輸出「總金額」、X、「付款不足」、Y (例如：總金額 365 付款不足 15)。
`)}
${sample(1,
`2<br/>
5 2 4 3<br/>
500`,
`總金額 240 應找錢 260`,
`5 號飲料 2 杯 (120 元)、4 號飲料 3 杯 (120 元)，合計總金額 240 元；客人付款 500 元，應找錢 260 元。`)}
${sample(2,
`3<br/>
1 5 3 3 2 2<br/>
350`,
`總金額 365 付款不足 15`,
`1 號 5 杯 (225 元)、3 號 3 杯 (90 元)、2 號 2 杯 (50 元)，合計 365 元；客人付款 350 元，付款不足 15 元。`)}
${sample(3,
`3<br/>
1 3 2 2 4 1<br/>
300`,
`總金額 225 應找錢 75`,
``)}
${sample(4,
`1<br/>
1 5<br/>
200`,
`總金額 225 付款不足 25`,
``)}
${sample(5,
`2<br/>
1 2 3 1<br/>
100`,
`總金額 120 付款不足 20`,
``)}
${sample(6,
`4<br/>
1 5 2 4 3 3 5 2<br/>
600`,
`總金額 535 應找錢 65`,
``,
`{"data": ["2;5;2;4;3;500;總金額;240;應找錢;260", "3;1;5;3;3;2;2;350;總金額;365;付款不足;15", "3;1;3;2;2;4;1;300;總金額;225;應找錢;75", "1;1;5;200;總金額;225;付款不足;25", "2;1;2;3;1;100;總金額;120;付款不足;20", "4;1;5;2;4;3;3;5;2;600;總金額;535;應找錢;65"]}`)}
'
 onclick='${ONCLICK}'>7
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>碼易丁飲料店-2 付款與找零</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("8", `碼易丁飲料店-3 最少硬幣數找零`, `114南投縣國小組`)}
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
`{"data": ["88;1;3;1;3", "124;2;2;0;4", "7;0;0;1;2", "100;2;0;0;0", "388;7;3;1;3", "999;19;4;1;4", "0;0;0;0;0"]}`)}
'
 onclick='${ONCLICK}'>8
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>碼易丁飲料店-3 最少硬幣數找零</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("9", `碼易丁飲料店-4 每日銷售數量結算`, `114南投縣國小組`)}
${desc(`
子題四：到了晚上，小明需要結算一整天賣出了多少杯飲料，以及總共多少利潤。假設店內共有 K 種飲料 (編號為 1 ~ K)，每種飲料的「每杯利潤」皆不同。今天共有 N 筆訂單，每筆訂單包含「飲料編號」與「購買杯數」。請你設計一個程式，計算：<br/>
1. 各種飲料的總銷售杯數 (依照 1 ~ K 順序)。<br/>
2. 當天的總利潤。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個整數 K (3 ≤ K ≤ 10)，代表飲料種類數。<br/>
第二行輸入 K 個整數，依序代表第 1 種到第 K 種飲料的「每杯利潤」。<br/>
第三行輸入一個整數 N (1 ≤ N ≤ 20)，代表今天共有 N 筆訂單。<br/>
第四行輸入 2N 個整數，依序代表「飲料編號 (1 ~ K)」與「杯數 (1 ~ 20)」。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 K+1 個整數，前 K 個數字依序為第 1 ~ K 種飲料的總銷售杯數，最後一個數字為當天的總利潤。
`)}
${sample(1,
`5<br/>
15 10 15 20 25<br/>
3<br/>
5 5 2 2 2 10`,
`0 12 0 0 5 245`,
`三筆訂單：5 號 5 杯、2 號 2 杯、2 號 10 杯。各飲料銷售量為 0 12 0 0 5，總利潤 = 12×10 + 5×25 = 245。`)}
${sample(2,
`5<br/>
5 8 8 6 5<br/>
5<br/>
2 4 1 3 5 2 3 3 4 4`,
`3 4 3 4 2 105`,
`各飲料銷售量為 3 4 3 4 2，總利潤 = 3×5 + 4×8 + 3×8 + 4×6 + 2×5 = 105。`)}
${sample(3,
`3<br/>
10 20 30<br/>
1<br/>
2 5`,
`0 5 0 100`,
``)}
${sample(4,
`4<br/>
5 10 15 20<br/>
3<br/>
1 2 2 3 4 1`,
`2 3 0 1 60`,
``)}
${sample(5,
`5<br/>
15 10 15 20 25<br/>
4<br/>
1 2 3 3 5 2 1 1`,
`3 0 3 0 2 140`,
``)}
${sample(6,
`6<br/>
8 12 20 15 10 25<br/>
6<br/>
6 2 2 5 4 3 6 1 2 2 1 4`,
`4 7 0 3 0 3 236`,
``)}
${sample(7,
`10<br/>
5 6 7 8 9 10 11 12 13 14<br/>
10<br/>
1 1 2 2 3 3 4 4 5 5 6 1 7 2 8 1 9 2 10 3`,
`1 2 3 4 5 1 2 1 2 3 227`,
``,
`{"data": ["5;15;10;15;20;25;3;5;5;2;2;2;10;0;12;0;0;5;245", "5;5;8;8;6;5;5;2;4;1;3;5;2;3;3;4;4;3;4;3;4;2;105", "3;10;20;30;1;2;5;0;5;0;100", "4;5;10;15;20;3;1;2;2;3;4;1;2;3;0;1;60", "5;15;10;15;20;25;4;1;2;3;3;5;2;1;1;3;0;3;0;2;140", "6;8;12;20;15;10;25;6;6;2;2;5;4;3;6;1;2;2;1;4;4;7;0;3;0;3;236", "10;5;6;7;8;9;10;11;12;13;14;10;1;1;2;2;3;3;4;4;5;5;6;1;7;2;8;1;9;2;10;3;1;2;3;4;5;1;2;1;2;3;227"]}`)}
'
 onclick='${ONCLICK}'>9
</button>
</td>
<td ${LIST_TD(false)}>114南投縣國小組</td>
<td ${LIST_TD(false)}>碼易丁飲料店-4 每日銷售數量結算</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
