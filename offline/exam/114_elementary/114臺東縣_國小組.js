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
${qHeader("1", `空氣品質指標(示範題)`, `114臺東縣國小組`)}
${desc(`
AQI 是用來判斷空氣對人體健康影響程度的重要指標。在「AQI 判斷專家」系統中，你需要根據輸入的 AQI 數值，判斷其對應的狀態燈號以及對健康影響的活動建議。<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>AQI 數值範圍</td><td ${TH}>狀態燈號</td><td ${TH}>活動建議</td></tr><tr><td ${TD}>0 ~ 50</td><td ${TD}>綠燈</td><td ${TD}>良好</td></tr><tr><td ${TD}>51 ~ 100</td><td ${TD}>黃燈</td><td ${TD}>普通</td></tr><tr><td ${TD}>101 ~ 150</td><td ${TD}>橘燈</td><td ${TD}>對敏感族群不健康</td></tr><tr><td ${TD}>151 ~ 200</td><td ${TD}>紅燈</td><td ${TD}>對所有族群不健康</td></tr><tr><td ${TD}>201 ~ 300</td><td ${TD}>紫燈</td><td ${TD}>非常不健康</td></tr><tr><td ${TD}>301 ~ 500</td><td ${TD}>深紅燈</td><td ${TD}>危害</td></tr></table><br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 AQI 指標。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出狀態燈號與活動建議。
`)}
${sample(1,
`120`,
`橘燈 對敏感族群不健康`,
`AQI 120 落在 101 ~ 150 範圍。`)}
${sample(2,
`45`,
`綠燈 良好`,
`AQI 45 落在 0 ~ 50 範圍。`,
`{"data": ["120;橘燈;對敏感族群不健康", "45;綠燈;良好"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國小組</td>
<td ${LIST_TD(false)}>空氣品質指標(示範題)</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `奇緣蛋糕特賣`, `114臺東縣國小組`)}
${desc(`
所有蛋糕原價皆為 300 元，每筆訂單運費為 80 元。請根據顧客購買的蛋糕數量，計算出最終應支付的總金額。<br/>
促銷活動規則：<br/>
1. 蛋糕折扣 (根據購買個數 N)：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>購買個數 N</td><td ${TH}>每個蛋糕享有的折扣</td></tr><tr><td ${TD}>1 ~ 5</td><td ${TD}>9 折</td></tr><tr><td ${TD}>6 ~ 10</td><td ${TD}>8 折</td></tr><tr><td ${TD}>11 ~ 15</td><td ${TD}>7 折</td></tr><tr><td ${TD}>16 以上</td><td ${TD}>6 折</td></tr></table><br/>
2. 運費規則：若折扣後滿 1200 元，再享受免運優惠。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入購買蛋糕數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最終應支付的總金額。
`)}
${sample(1,
`4`,
`1160`,
`4 × 300 × 0.9 = 1080，未滿 1200 元需加運費：1080 + 80 = 1160。`)}
${sample(2,
`17`,
`3060`,
`17 × 300 × 0.6 = 3060，滿 1200 元免運：3060 + 0 = 3060。`)}
${sample(3,
`3`,
`890`,
``)}
${sample(4,
`8`,
`1920`,
``)}
${sample(5,
`12`,
`2520`,
``)}
${sample(6,
`17`,
`3060`,
``)}
${sample(7,
`2`,
`620`,
``,
`{"data": ["4;1160", "17;3060", "3;890", "8;1920", "12;2520", "17;3060", "2;620"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國小組</td>
<td ${LIST_TD(false)}>奇緣蛋糕特賣</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `健康小管家`, `114臺東縣國小組`)}
${desc(`
身體質量指數 (BMI) 是一種常用的衡量指標，用於評估一個人的體重是否在健康的範圍內。<br/>
BMI 估算公式：BMI = 體重 (kg) ÷ (身高 (m) × 身高 (m))<br/>
計算範例：身高 165 cm、體重 45 kg，BMI = 45 ÷ (1.65 × 1.65) = 16.52，取小數點後一位為 16.5。<br/>
程式計算出 BMI 數值 (取小數點後一位) 後，用下表標準分類：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>BMI 數值</td><td ${TH}>BMI 分類等級</td></tr><tr><td ${TD}>小於 18.5</td><td ${TD}>體重過輕</td></tr><tr><td ${TD}>18.5 到 24.9</td><td ${TD}>正常範圍</td></tr><tr><td ${TD}>25.0 到 29.9</td><td ${TD}>體重過重</td></tr><tr><td ${TD}>30.0 到 34.9</td><td ${TD}>輕度肥胖</td></tr><tr><td ${TD}>35.0 到 39.9</td><td ${TD}>中度肥胖</td></tr><tr><td ${TD}>40.0 以上</td><td ${TD}>重度肥胖</td></tr></table><br/>
<span ${LBL_IN}>輸入說明</span>依序輸入身高 (cm)、體重 (kg)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 BMI 值 (取小數點後一位) 與 BMI 分類等級。
`)}
${sample(1,
`165<br/>
45`,
`16.5 體重過輕`,
`BMI = 45 ÷ (1.65 × 1.65) ≈ 16.52，取小數點後一位為 16.5，小於 18.5，輸出體重過輕。`)}
${sample(2,
`180<br/>
85`,
`26.2 體重過重`,
`BMI = 85 ÷ (1.8 × 1.8) ≈ 26.23，取小數點後一位為 26.2，在 25.0 到 29.9 之間，輸出體重過重。`)}
${sample(3,
`165<br/>
45`,
`16.5 體重過輕`,
``)}
${sample(4,
`170<br/>
60`,
`20.8 正常範圍`,
``)}
${sample(5,
`180<br/>
85`,
`26.2 體重過重`,
``)}
${sample(6,
`168<br/>
90`,
`31.9 輕度肥胖`,
``)}
${sample(7,
`160<br/>
120`,
`46.9 重度肥胖`,
``,
`{"data": ["165;45;16.5;體重過輕", "180;85;26.2;體重過重", "165;45;16.5;體重過輕", "170;60;20.8;正常範圍", "180;85;26.2;體重過重", "168;90;31.9;輕度肥胖", "160;120;46.9;重度肥胖"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國小組</td>
<td ${LIST_TD(false)}>健康小管家</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `鋼琴小天才計分挑戰`, `114臺東縣國小組`)}
${desc(`
在一年一度的「鋼琴小天才大賽」中，評審團決定採用一套特別的計分方式：<br/>
比賽聘請了 7 位專業評審，他們會給每位選手一個 1 分到 10 分的分數。<br/>
為了避免有評審給分太高或太低，計算總成績時，會將這 7 個分數中最高的 1 個分數和最低的 1 個分數都扣除 (不計算)。<br/>
選手的最終總成績就是剩下那 5 位評審給的分數總和。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序分次輸入 7 位評審給的分數 (順序不一定，可能有小數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出選手的最終總成績。
`)}
${sample(1,
`8<br/>
9<br/>
7<br/>
9<br/>
8<br/>
10<br/>
7`,
`41`,
`最高分 10、最低分 7，扣除後 8 + 9 + 7 + 9 + 8 = 41。`)}
${sample(2,
`1.5<br/>
2.5<br/>
3.5<br/>
4.5<br/>
5.5<br/>
6.5<br/>
7.5`,
`22.5`,
`最高分 7.5、最低分 1.5，扣除後 2.5 + 3.5 + 4.5 + 5.5 + 6.5 = 22.5。`)}
${sample(3,
`6<br/>
6<br/>
6<br/>
6<br/>
6<br/>
6<br/>
6`,
`30`,
``)}
${sample(4,
`7<br/>
8<br/>
9<br/>
8<br/>
7<br/>
8<br/>
9`,
`40`,
``)}
${sample(5,
`9<br/>
9.1<br/>
9.2<br/>
9.3<br/>
9.4<br/>
9.5<br/>
9.6`,
`46.5`,
``)}
${sample(6,
`10<br/>
5<br/>
7<br/>
8<br/>
10<br/>
9<br/>
6`,
`40`,
``)}
${sample(7,
`4<br/>
8<br/>
4<br/>
8<br/>
6<br/>
6<br/>
7`,
`31`,
``,
`{"data": ["8;9;7;9;8;10;7;41", "1.5;2.5;3.5;4.5;5.5;6.5;7.5;22.5", "6;6;6;6;6;6;6;30", "7;8;9;8;7;8;9;40", "9;9.1;9.2;9.3;9.4;9.5;9.6;46.5", "10;5;7;8;10;9;6;40", "4;8;4;8;6;6;7;31"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國小組</td>
<td ${LIST_TD(false)}>鋼琴小天才計分挑戰</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `幸運號碼大樂透`, `114臺東縣國小組`)}
${desc(`
在「玩具王國」裡，大家都在玩一種叫做「幸運數字樂透」的小遊戲！數字的範圍是 1 到 99。<br/>
每位玩家可以從 1 到 99 中，挑選 5 個不同的號碼作為自己的彩券。每期開獎，玩具王國會公布 10 個幸運號碼。玩家的中獎金額取決於他選的 5 個號碼中，有多少個號碼對中了當期的 10 個幸運號碼。<br/>
本期的幸運號碼是：7、24、31、42、45、56、63、78、80、99。<br/>
中獎獎金規則：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>對中號碼的數量</td><td ${TH}>獎金金額 (玩具幣)</td><td ${TH}>獎項名稱</td></tr><tr><td ${TD}>5 個</td><td ${TD}>100,000</td><td ${TD}>頭獎</td></tr><tr><td ${TD}>4 個</td><td ${TD}>10,000</td><td ${TD}>貳獎</td></tr><tr><td ${TD}>3 個</td><td ${TD}>2,000</td><td ${TD}>參獎</td></tr><tr><td ${TD}>2 個</td><td ${TD}>500</td><td ${TD}>肆獎</td></tr><tr><td ${TD}>1 個</td><td ${TD}>200</td><td ${TD}>伍獎</td></tr><tr><td ${TD}>0 個</td><td ${TD}>0</td><td ${TD}>沒中獎</td></tr></table><br/>
<span ${LBL_IN}>輸入說明</span>依序分次輸入玩家選擇的 5 個號碼。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一行文字，格式為「猜中X個號碼，獎金Y元」(例如：猜中2個號碼，獎金500元)。
`)}
${sample(1,
`7<br/>
18<br/>
29<br/>
31<br/>
35`,
`猜中2個號碼，獎金500元`,
`2 個號碼相同，獎金 500 元。`)}
${sample(2,
`1<br/>
2<br/>
3<br/>
4<br/>
5`,
`猜中0個號碼，獎金0元`,
`0 個號碼相同，獎金 0 元。`)}
${sample(3,
`7<br/>
24<br/>
31<br/>
42<br/>
45`,
`猜中5個號碼，獎金100000元`,
``)}
${sample(4,
`1<br/>
2<br/>
3<br/>
4<br/>
5`,
`猜中0個號碼，獎金0元`,
``)}
${sample(5,
`7<br/>
24<br/>
1<br/>
2<br/>
3`,
`猜中2個號碼，獎金500元`,
``)}
${sample(6,
`42<br/>
56<br/>
63<br/>
78<br/>
80`,
`猜中5個號碼，獎金100000元`,
``)}
${sample(7,
`7<br/>
24<br/>
31<br/>
42<br/>
10`,
`猜中4個號碼，獎金10000元`,
``,
`{"data": ["7;18;29;31;35;猜中2個號碼，獎金500元", "1;2;3;4;5;猜中0個號碼，獎金0元", "7;24;31;42;45;猜中5個號碼，獎金100000元", "1;2;3;4;5;猜中0個號碼，獎金0元", "7;24;1;2;3;猜中2個號碼，獎金500元", "42;56;63;78;80;猜中5個號碼，獎金100000元", "7;24;31;42;10;猜中4個號碼，獎金10000元"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國小組</td>
<td ${LIST_TD(false)}>幸運號碼大樂透</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
