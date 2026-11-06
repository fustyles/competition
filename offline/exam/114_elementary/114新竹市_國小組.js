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
${qHeader("1", `考試座位安排`, `114新竹市國小組`)}
${desc(`
小明的班級即將舉辦期末考試，老師需要安排座位以防止作弊。教室裡有 N 排座位，每排有 M 個位子。學生們會依照座號順序 (從 1 開始) 進入教室，並按照「由前往後、由左往右」的規則依序就座。<br/>
老師想要快速知道：給定某個座號 K 的學生，他會坐在第幾排的第幾個位子？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：兩個整數 N、M，N 為排數 (1 ≤ N ≤ 100)，M 為每排座位數 (1 ≤ M ≤ 100)。<br/>
第二行：一個整數 K，代表學生座號 (1 ≤ K ≤ N×M)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數：該學生所在的排數、該學生在該排的位置 (皆從 1 開始計算)。
`)}
${sample(1,
`5 4<br/>
7`,
`2 3`,
`教室有 5 排，每排 4 個位子。第 1 排：學生 1 ~ 4；第 2 排：學生 5 ~ 8。學生 7 坐在第 2 排第 3 個位子。`)}
${sample(2,
`3 5<br/>
13`,
`3 3`,
`教室有 3 排，每排 5 個位子。第 3 排為學生 11 ~ 15，學生 13 坐在第 3 排第 3 個位子。`)}
${sample(3,
`4 6<br/>
1`,
`1 1`,
``)}
${sample(4,
`10 10<br/>
100`,
`10 10`,
``)}
${sample(5,
`1 50<br/>
25`,
`1 25`,
``)}
${sample(6,
`50 1<br/>
30`,
`30 1`,
``)}
${sample(7,
`7 8<br/>
35`,
`5 3`,
``,
`{"data": ["5;4;7;2;3", "3;5;13;3;3", "4;6;1;1;1", "10;10;100;10;10", "1;50;25;1;25", "50;1;30;30;1", "7;8;35;5;3"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國小組</td>
<td ${LIST_TD(false)}>考試座位安排</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `智慧氣候監測系統——氣溫變動分析`, `114新竹市國小組`)}
${desc(`
在智慧城市的環境監測系統中，感測器每小時會回傳大量的氣溫數據。為了評估該地區當日的氣候穩定性，系統將複雜的氣象資料抽象化為一個簡單指標：氣溫全距。<br/>
所謂抽象化，是指在處理問題時忽略不必要的細節 (如測量時間、風速或溼度)，僅保留與問題核心相關的資訊，也就是數據中的最大值與最小值。<br/>
請你設計一個程式，找出當日的最高溫與最低溫，並計算兩者的差值 (全距)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N (1 ≤ N ≤ 1000)，代表氣溫資料筆數。<br/>
第二行：N 個整數，代表各感測點的氣溫紀錄 (可為正數、0 或負數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表該組氣溫的全距 (最大值 − 最小值)。
`)}
${sample(1,
`5<br/>
10 50 30 20 40`,
`40`,
`最高溫 50，最低溫 10，全距 = 40。`)}
${sample(2,
`6<br/>
5 8 12 3 9 3`,
`9`,
`含重複數值，最高 12，最低 3，全距 9。`)}
${sample(3,
`4<br/>
15 15 15 15`,
`0`,
``)}
${sample(4,
`5<br/>
-2 10 18 -5 2`,
`23`,
``)}
${sample(5,
`1<br/>
7`,
`0`,
``)}
${sample(6,
`8<br/>
3 1 4 1 5 9 2 6`,
`8`,
``)}
${sample(7,
`10<br/>
-10 -20 -30 -5 -15 -25 -35 -1 -40 -3`,
`39`,
``,
`{"data": ["5;10;50;30;20;40;40", "6;5;8;12;3;9;3;9", "4;15;15;15;15;0", "5;-2;10;18;-5;2;23", "1;7;0", "8;3;1;4;1;5;9;2;6;8", "10;-10;-20;-30;-5;-15;-25;-35;-1;-40;-3;39"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國小組</td>
<td ${LIST_TD(false)}>智慧氣候監測系統——氣溫變動分析</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `快遞物流中心分類系統`, `114新竹市國小組`)}
${desc(`
小華在物流中心打工，負責將包裹依照配送規則進行分類上車。物流中心的智慧配送系統會根據包裹的「重量」來決定配送順序：<br/>
奇數重量的包裹屬於「標準配送」；偶數重量的包裹屬於「重物配送」。<br/>
裝車規則：<br/>
標準配送的包裹要先裝車，重物配送的包裹要後裝車。<br/>
標準配送中，重量輕的先裝。<br/>
重物配送中，重量重的先裝。<br/>
請你幫小華設計一個程式，自動計算包裹的裝車順序。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N (1 ≤ N ≤ 50)，代表包裹數量。<br/>
第二行：N 個整數，代表每個包裹的重量 (0 ≤ 重量 ≤ 100，單位公斤)。<br/>
<span ${LBL_OUT}>輸出說明</span>依裝車順序輸出包裹重量。
`)}
${sample(1,
`6<br/>
5 12 3 8 7 10`,
`3 5 7 12 10 8`,
`標準配送 (奇數)：5, 3, 7 → 由輕到重：3, 5, 7；重物配送 (偶數)：12, 8, 10 → 由重到輕：12, 10, 8。`)}
${sample(2,
`8<br/>
15 20 11 6 9 14 2 13`,
`9 11 13 15 20 14 6 2`,
`標準配送：9, 11, 13, 15；重物配送：20, 14, 6, 2。`)}
${sample(3,
`5<br/>
1 2 3 4 5`,
`1 3 5 4 2`,
``)}
${sample(4,
`10<br/>
50 49 48 47 46 45 44 43 42 41`,
`41 43 45 47 49 50 48 46 44 42`,
``)}
${sample(5,
`1<br/>
88`,
`88`,
``)}
${sample(6,
`7<br/>
10 10 10 5 5 5 0`,
`5 5 5 10 10 10 0`,
``)}
${sample(7,
`12<br/>
23 45 67 89 12 34 56 78 90 11 22 33`,
`11 23 33 45 67 89 90 78 56 34 22 12`,
``,
`{"data": ["6;5;12;3;8;7;10;3;5;7;12;10;8", "8;15;20;11;6;9;14;2;13;9;11;13;15;20;14;6;2", "5;1;2;3;4;5;1;3;5;4;2", "10;50;49;48;47;46;45;44;43;42;41;41;43;45;47;49;50;48;46;44;42", "1;88;88", "7;10;10;10;5;5;5;0;5;5;5;10;10;10;0", "12;23;45;67;89;12;34;56;78;90;11;22;33;11;23;33;45;67;89;90;78;56;34;22;12"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國小組</td>
<td ${LIST_TD(false)}>快遞物流中心分類系統</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `寶可夢聯盟大挑戰`, `114新竹市國小組`)}
${desc(`
小智終於來到了寶可夢聯盟大賽，他的隊伍中共有 N 隻寶可夢，每隻寶可夢都有名字、攻擊力、防禦力。<br/>
在比賽前，小智會依照以下規則計算每隻寶可夢的戰鬥力：戰鬥力 = (攻擊力 + 防禦力) × 戰技加成<br/>
戰技加成倍率：攻擊力 > 防禦力 → 2；攻擊力 = 防禦力 → 3；攻擊力 < 防禦力 → 1。<br/>
小智要把最強的寶可夢保留到最後，因此現在只能派出戰鬥力排名第二高的寶可夢。已保證每隻寶可夢的戰鬥力值皆不相同。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N (1 ≤ N ≤ 100)，表示寶可夢的數量。<br/>
接下來 N 行：每行依序為寶可夢名稱 (不含空格)、攻擊力、防禦力 (皆為 ≤ 100 的正整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出戰鬥力第二高的寶可夢的名稱、攻擊力、防禦力、戰鬥力。
`)}
${sample(1,
`4<br/>
皮卡丘 10 5<br/>
小火龍 7 7<br/>
傑尼龜 6 9<br/>
伊布 8 8`,
`小火龍 7 7 42`,
`皮卡丘 (10+5)×2 = 30；小火龍 (7+7)×3 = 42；傑尼龜 (6+9)×1 = 15；伊布 (8+8)×3 = 48。戰鬥力第二高為小火龍。`)}
${sample(2,
`5<br/>
妙蛙種子 6 6<br/>
波波 5 3<br/>
可達鴨 4 7<br/>
尼多力諾 9 4<br/>
喵喵 3 3`,
`尼多力諾 9 4 26`,
`妙蛙種子 36、波波 16、可達鴨 11、尼多力諾 26、喵喵 18。戰鬥力第二高為尼多力諾。`)}
${sample(3,
`2<br/>
皮丘 1 2<br/>
雷丘 2 1`,
`皮丘 1 2 3`,
``)}
${sample(4,
`3<br/>
綠毛蟲 2 2<br/>
獨角蟲 3 3<br/>
波波 1 2`,
`綠毛蟲 2 2 12`,
``)}
${sample(5,
`3<br/>
怪力 100 50<br/>
卡比獸 100 100<br/>
隆隆岩 50 100`,
`怪力 100 50 300`,
``)}
${sample(6,
`10<br/>
皮卡丘 10 10<br/>
小火龍 9 9<br/>
傑尼龜 8 8<br/>
伊布 7 7<br/>
妙蛙種子 6 6<br/>
波波 5 5<br/>
可達鴨 4 4<br/>
尼多力諾 3 3<br/>
喵喵 2 2<br/>
皮丘 1 1`,
`小火龍 9 9 54`,
``)}
${sample(7,
`6<br/>
皮卡丘 5 5<br/>
小火龍 6 2<br/>
傑尼龜 4 6<br/>
妙蛙種子 7 3<br/>
波波 3 7<br/>
伊布 2 8`,
`妙蛙種子 7 3 20`,
``,
`{"data": ["4;皮卡丘;10;5;小火龍;7;7;傑尼龜;6;9;伊布;8;8;小火龍;7;7;42", "5;妙蛙種子;6;6;波波;5;3;可達鴨;4;7;尼多力諾;9;4;喵喵;3;3;尼多力諾;9;4;26", "2;皮丘;1;2;雷丘;2;1;皮丘;1;2;3", "3;綠毛蟲;2;2;獨角蟲;3;3;波波;1;2;綠毛蟲;2;2;12", "3;怪力;100;50;卡比獸;100;100;隆隆岩;50;100;怪力;100;50;300", "10;皮卡丘;10;10;小火龍;9;9;傑尼龜;8;8;伊布;7;7;妙蛙種子;6;6;波波;5;5;可達鴨;4;4;尼多力諾;3;3;喵喵;2;2;皮丘;1;1;小火龍;9;9;54", "6;皮卡丘;5;5;小火龍;6;2;傑尼龜;4;6;妙蛙種子;7;3;波波;3;7;伊布;2;8;妙蛙種子;7;3;20"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國小組</td>
<td ${LIST_TD(false)}>寶可夢聯盟大挑戰</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `省電大作戰`, `114新竹市國小組`)}
${desc(`
小明的房間有一台變頻冷氣，他研究了冷氣的耗電規則：<br/>
1. 運轉費：只要冷氣是開著的，每個小時都要消耗 1 度電。<br/>
2. 啟動費：每次把冷氣「從關機變成開機」的瞬間，需要額外消耗 5 度電 (包含開機和之後關機所需要的電)。如果冷氣本來就是開著的，保持開機進入下一個小時，就不需要再付這 5 度電。<br/>
3. 關機省電：如果把冷氣關掉，就不會耗電 (0 度)。<br/>
小明列出了他一天 N 個小時的行程表 (以 0 和 1 表示)：1 代表小明在房間，冷氣必須是開著的；0 代表小明不在房間，他可以選擇把冷氣關掉，也可以選擇讓冷氣維持開著 (可以省下下次開機的 5 度啟動費)。<br/>
請計算在滿足所有在房間的時段都有冷氣吹的情況下，一整天最少總共要消耗多少度電？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行：一個整數 N，代表總時數；第二行：N 個整數 (0 或 1)，代表每個小時是否在房間。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最少的總耗電度數。
`)}
${sample(1,
`5<br/>
1 1 1 1 1`,
`10`,
`第 1 小時開機 (啟動費 5 + 運轉費 1 = 6 度)，第 2 ~ 5 小時保持開機 (4 度)，總共 10 度。`)}
${sample(2,
`8<br/>
1 0 0 1 0 1 0 0`,
`11`,
`第 1 小時開機 6 度；第 2 ~ 5 小時空檔都短，保持開機比重開機省電 (共 3 度)；第 4、6 小時運轉 2 度；第 7 ~ 8 小時關機。總計 11 度。`)}
${sample(3,
`5<br/>
0 0 0 0 0`,
`0`,
``)}
${sample(4,
`6<br/>
1 0 0 0 0 1`,
`11`,
``)}
${sample(5,
`7<br/>
1 0 0 0 0 0 1`,
`12`,
``)}
${sample(6,
`8<br/>
1 0 0 0 0 0 0 1`,
`12`,
``)}
${sample(7,
`15<br/>
1 0 0 1 0 0 0 0 0 0 1 0 1 0 0`,
`17`,
``,
`{"data": ["5;1;1;1;1;1;10", "8;1;0;0;1;0;1;0;0;11", "5;0;0;0;0;0;0", "6;1;0;0;0;0;1;11", "7;1;0;0;0;0;0;1;12", "8;1;0;0;0;0;0;0;1;12", "15;1;0;0;1;0;0;0;0;0;0;1;0;1;0;0;17"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國小組</td>
<td ${LIST_TD(false)}>省電大作戰</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `數位顯示器`, `114新竹市國小組`)}
${desc(`
七段顯示器由 7 條 LED 燈條組成，可用來顯示數字 0 ~ 9。每個數字所需點亮的 LED 燈條數量如下表：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>數字</td><td ${TD}>0</td><td ${TD}>1</td><td ${TD}>2</td><td ${TD}>3</td><td ${TD}>4</td><td ${TD}>5</td><td ${TD}>6</td><td ${TD}>7</td><td ${TD}>8</td><td ${TD}>9</td></tr><tr><td ${TH}>燈條數</td><td ${TD}>6</td><td ${TD}>2</td><td ${TD}>5</td><td ${TD}>5</td><td ${TD}>4</td><td ${TD}>5</td><td ${TD}>6</td><td ${TD}>3</td><td ${TD}>7</td><td ${TD}>6</td></tr></table><br/>
現在給定 N 條可用的 LED 燈條，請你剛好用完這些燈條組成一個數字，並且必須符合以下規則：<br/>
1. 數字 (0 ~ 9) 最多只能各使用一次。<br/>
2. 組成的數字不可有前導零 (除非答案本身就是 0)。<br/>
3. 組成的數字最多只能有 2 位。<br/>
請找出可以組成的最大值；若無法使用 1 位數或 2 位數剛好用完所有 N 條 LED 燈條，請輸出 -1。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 N (2 ≤ N ≤ 30)，代表可用的 LED 燈條數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出可組成的最大值，或 -1。
`)}
${sample(1,
`3`,
`7`,
`3 條燈條可以組成數字 7。`)}
${sample(2,
`7`,
`74`,
`7 (3 條) + 4 (4 條) = 7 條，可組成 74 或 47，最大值為 74。`)}
${sample(3,
`30`,
`-1`,
``)}
${sample(4,
`2`,
`1`,
``)}
${sample(5,
`4`,
`4`,
``)}
${sample(6,
`11`,
`95`,
``)}
${sample(7,
`9`,
`97`,
``,
`{"data": ["3;7", "7;74", "30;-1", "2;1", "4;4", "11;95", "9;97"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國小組</td>
<td ${LIST_TD(false)}>數位顯示器</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
