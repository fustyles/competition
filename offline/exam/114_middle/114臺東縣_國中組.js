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
${qHeader("1", `園遊會訂單總價計算機(示範題)`, `114臺東縣國中組`)}
${desc(`
你是班上園遊會攤位「數位飲料吧」的總務股長。為了快速計算顧客的訂單總金額，你決定編寫一個程式來代替人工計算。<br/>
你的攤位只販賣 5 種編號的飲品，每種飲品的價格是固定的：<br/>
1 號是珍珠奶綠 (每杯 45 元)<br/>
2 號是伯爵奶茶 (每杯 25 元)<br/>
3 號是蜜香紅茶 (每杯 30 元)<br/>
4 號是四季春茶 (每杯 40 元)<br/>
5 號是黑糖珍珠鮮奶茶 (每杯 60 元)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入顧客點選的飲料編號，每次輸入一個編號，輸入 -1 表示結束。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表訂單總價。
`)}
${sample(1,
`1<br/>
2<br/>
3<br/>
-1`,
`100`,
`顧客點選飲料編號依序為 1 號 (45 元)、2 號 (25 元)、3 號 (30 元)，-1 結束。<br/>
總價：45+25+30 = 100`)}
${sample(2,
`1<br/>
2<br/>
1<br/>
2<br/>
3<br/>
-1`,
`170`,
`顧客點選飲料編號依序為 1、2、1、2、3 號，-1 結束。<br/>
總價：45+25+45+25+30 = 170`,
`{"data": ["1;2;3;-1;100", "1;2;1;2;3;-1;170"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國中組</td>
<td ${LIST_TD(false)}>園遊會訂單總價計算機(示範題)</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `魔法公車車票計算`, `114臺東縣國中組`)}
${desc(`
歡迎來到「777 魔法公車」！這條公車線路共有 1 號到 15 號共 15 個站點。在所有站點中，10 號站是一個非常特別的站，我們叫它「魔法分隔站」。<br/>
票價規則：公車票價的計算分兩大步驟，先決定票種，再決定折扣。<br/>
第一步：決定票種 (一段票 vs. 兩段票)<br/>
1. 一段票 (單程票)：基本票價是 10 元。適用情況：你的旅程沒有跨越「魔法分隔站 (10 號站)」。例如：從 3 號站到 8 號站。<br/>
2. 兩段票 (跨區票)：票價變成基本票價的兩倍，是 20 元。適用情況：你的旅程跨越了「魔法分隔站 (10 號站)」。例如：從 7 號站到 12 號站，或從 14 號站到 5 號站。<br/>
第二步：幸運折扣 (半票優惠)<br/>
如果你的年齡是 12 歲以下 (例如 11 歲、10 歲...)，那麼恭喜你！你可以享有「幸運半票」優惠，你計算出來的票價 (無論是 10 元還是 20 元)，都只需要支付一半。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入上車站號、下車站號、年齡。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表應付的車票金額。
`)}
${sample(1,
`5<br/>
8<br/>
18`,
`10`,
`第 5 站搭到第 8 站，1 段全票 10 元。`)}
${sample(2,
`7<br/>
12<br/>
20`,
`20`,
`第 7 站搭到第 12 站，2 段全票 20 元。`)}
${sample(3,
`13<br/>
10<br/>
8`,
`5`,
`第 13 站搭到第 10 站，1 段半票 5 元。`)}
${sample(4,
`1<br/>
9<br/>
30`,
`10`,
``)}
${sample(5,
`2<br/>
11<br/>
15`,
`20`,
``)}
${sample(6,
`10<br/>
15<br/>
40`,
`10`,
``)}
${sample(7,
`15<br/>
1<br/>
7`,
`10`,
``)}
${sample(8,
`9<br/>
10<br/>
5`,
`5`,
``,
`{"data": ["5;8;18;10", "7;12;20;20", "13;10;8;5", "1;9;30;10", "2;11;15;20", "10;15;40;10", "15;1;7;10", "9;10;5;5"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國中組</td>
<td ${LIST_TD(false)}>魔法公車車票計算</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `幸運數字彩虹樂透`, `114臺東縣國中組`)}
${desc(`
為了舉辦校園慈善抽獎活動，我們設計了一個簡單的「幸運數字彩虹樂透」。每張樂透彩券必須選出 6 個數字 (範圍從 1 到 49)。現在，我們需要設計一個抽獎系統來計算彩券是否中獎，以及獎金是多少。<br/>
本次固定開獎號碼為：10, 18, 29, 31, 35, 36<br/>
中獎規則與獎金：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>猜中號碼個數</td><td ${TH}>獎項名稱</td><td ${TH}>獎金</td></tr><tr><td ${TD}>6 個</td><td ${TD}>頭獎</td><td ${TD}>100,000 元</td></tr><tr><td ${TD}>5 個</td><td ${TD}>貳獎</td><td ${TD}>10,000 元</td></tr><tr><td ${TD}>4 個</td><td ${TD}>參獎</td><td ${TD}>1,000 元</td></tr><tr><td ${TD}>3 個</td><td ${TD}>肆獎</td><td ${TD}>100 元</td></tr><tr><td ${TD}>2 個或更少</td><td ${TD}>銘謝惠顧</td><td ${TD}>0 元</td></tr></table><br/>
請設計一個程式，讀入一張彩券上的 6 個選號 (假設號碼已由小到大排列且不重複)，並與固定的開獎號碼進行比對，輸出猜中的號碼個數以及對應的獎金金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 6 個選號。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一行文字，格式為「猜中X個號碼，獎金Y元」(例如：猜中6個號碼，獎金100000元)。
`)}
${sample(1,
`10<br/>
18<br/>
29<br/>
31<br/>
35<br/>
36`,
`猜中6個號碼，獎金100000元`,
`6 個號碼完全相同，獎金 100000 元。`)}
${sample(2,
`1<br/>
2<br/>
3<br/>
4<br/>
5<br/>
6`,
`猜中0個號碼，獎金0元`,
`0 個號碼相同，獎金 0 元。`)}
${sample(3,
`10<br/>
18<br/>
29<br/>
31<br/>
35<br/>
36`,
`猜中6個號碼，獎金100000元`,
``)}
${sample(4,
`10<br/>
18<br/>
29<br/>
31<br/>
35<br/>
45`,
`猜中5個號碼，獎金10000元`,
``)}
${sample(5,
`1<br/>
18<br/>
29<br/>
31<br/>
35<br/>
36`,
`猜中5個號碼，獎金10000元`,
``)}
${sample(6,
`10<br/>
18<br/>
29<br/>
40<br/>
41<br/>
42`,
`猜中3個號碼，獎金100元`,
``)}
${sample(7,
`10<br/>
18<br/>
29<br/>
31<br/>
38<br/>
49`,
`猜中4個號碼，獎金1000元`,
``,
`{"data": ["10;18;29;31;35;36;猜中6個號碼，獎金100000元", "1;2;3;4;5;6;猜中0個號碼，獎金0元", "10;18;29;31;35;36;猜中6個號碼，獎金100000元", "10;18;29;31;35;45;猜中5個號碼，獎金10000元", "1;18;29;31;35;36;猜中5個號碼，獎金10000元", "10;18;29;40;41;42;猜中3個號碼，獎金100元", "10;18;29;31;38;49;猜中4個號碼，獎金1000元"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國中組</td>
<td ${LIST_TD(false)}>幸運數字彩虹樂透</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `我的健康小管家`, `114臺東縣國中組`)}
${desc(`
基礎代謝率 (BMR) 是指您的身體在完全休息狀態下，為了維持基本生命功能所需的熱量，它是您每日總能量消耗中最大的一個組成部分，通常佔您每天燃燒總卡路里的 60% 至 70%，例如：呼吸、器官運作、體溫維持等，即使整天躺著不動也會消耗的最低熱量。BMR 會隨著年紀增加或體重減輕而降低，會隨著肌肉量增加而上升。BMR 就像是我們身體的「待機電力」。<br/>
為了簡化，我們使用一個簡化的 BMR 公式 (參考女性 BMR 公式)，並將年齡固定為 14 歲，只讓程式根據體重和身高來計算。簡化後 BMR 估算公式如下：<br/>
BMR = 655 + (9.6 * 體重(kg)) + (1.8 * 身高(cm)) - (4.7 * 14)<br/>
程式計算出 BMR 數值 (取整數) 後，會用下表標準來分類：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>BMR 數值 (大卡)</td><td ${TH}>基礎能量等級</td></tr><tr><td ${TD}>小於 1200</td><td ${TD}>極低能量</td></tr><tr><td ${TD}>1200 到 1499</td><td ${TD}>較低能量</td></tr><tr><td ${TD}>1500 到 1799</td><td ${TD}>標準能量</td></tr><tr><td ${TD}>1800 到 2099</td><td ${TD}>較高能量</td></tr><tr><td ${TD}>2100 以上</td><td ${TD}>極高能量</td></tr></table><br/>
<span ${LBL_IN}>輸入說明</span>依序輸入身高 (cm)、體重 (kg)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 BMR 值 (整數) 與基礎能量等級。
`)}
${sample(1,
`170<br/>
55`,
`1423 較低能量`,
`655+(9.6*55)+(1.8*170)-(4.7*14) = 1423.2，取整數 1423。<br/>
1423 介於 1200 到 1499，輸出較低能量。`)}
${sample(2,
`175<br/>
70`,
`1576 標準能量`,
`655+(9.6*70)+(1.8*175)-(4.7*14) = 1576.2，取整數 1576。<br/>
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
68`,
`1544 標準能量`,
``,
`{"data": ["170;55;1423;較低能量", "175;70;1576;標準能量", "150;35;1195;極低能量", "160;45;1309;較低能量", "165;50;1366;較低能量", "170;55;1423;較低能量", "168;68;1544;標準能量"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國中組</td>
<td ${LIST_TD(false)}>我的健康小管家</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `東台線上 3C 購物平台`, `114臺東縣國中組`)}
${desc(`
東台 3C 賣場推出線上購物大拍賣平台，以大東支付電子錢包結帳。不同商品的編號與金額如下表。結帳系統會先讀取電子錢包餘額，再依序讀入購買商品編號 (輸入 -1 表示結帳)，顯示結帳結果：<br/>
若電子錢包餘額足夠，請輸出：「結帳成功，餘額剩x元」<br/>
若餘額不足，請輸出：「餘額不足，請另外加值x元」<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>編號</td><td ${TH}>商品</td><td ${TH}>金額</td></tr><tr><td ${TD}>1</td><td ${TD}>電競滑鼠</td><td ${TD}>3490</td></tr><tr><td ${TD}>2</td><td ${TD}>電競鍵盤</td><td ${TD}>7990</td></tr><tr><td ${TD}>3</td><td ${TD}>電腦椅</td><td ${TD}>3990</td></tr><tr><td ${TD}>4</td><td ${TD}>電腦機殼</td><td ${TD}>2590</td></tr><tr><td ${TD}>5</td><td ${TD}>電腦桌</td><td ${TD}>6890</td></tr><tr><td ${TD}>6</td><td ${TD}>記憶體 16GB 一條</td><td ${TD}>3490</td></tr><tr><td ${TD}>7</td><td ${TD}>SSD256GB 一條</td><td ${TD}>1490</td></tr></table><br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為電子錢包餘額，接著依序輸入購買的商品編號，輸入 -1 表示結帳。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一行結帳結果文字 (例如：結帳成功，餘額剩3920元)。
`)}
${sample(1,
`10000<br/>
1<br/>
4<br/>
-1`,
`結帳成功，餘額剩3920元`,
`電子錢包帳戶中原有 10000 元，消費 3490+2590 = 6080。<br/>
結帳成功，餘額剩 3920 元。`)}
${sample(2,
`5000<br/>
3<br/>
5<br/>
-1`,
`餘額不足，請另外加值5880元`,
`電子錢包帳戶中原有 5000 元，消費 3990+6890 = 10880。<br/>
餘額不足，請另外加值 5880 元。`)}
${sample(3,
`5000<br/>
3<br/>
5<br/>
-1`,
`餘額不足，請另外加值5880元`,
``)}
${sample(4,
`10000<br/>
1<br/>
4<br/>
-1`,
`結帳成功，餘額剩3920元`,
``)}
${sample(5,
`8000<br/>
6<br/>
7<br/>
3<br/>
-1`,
`餘額不足，請另外加值970元`,
``)}
${sample(6,
`20000<br/>
5<br/>
1<br/>
6<br/>
-1`,
`結帳成功，餘額剩6130元`,
``)}
${sample(7,
`10000<br/>
1<br/>
4<br/>
-1`,
`結帳成功，餘額剩3920元`,
``,
`{"data": ["10000;1;4;-1;結帳成功，餘額剩3920元", "5000;3;5;-1;餘額不足，請另外加值5880元", "5000;3;5;-1;餘額不足，請另外加值5880元", "10000;1;4;-1;結帳成功，餘額剩3920元", "8000;6;7;3;-1;餘額不足，請另外加值970元", "20000;5;1;6;-1;結帳成功，餘額剩6130元", "10000;1;4;-1;結帳成功，餘額剩3920元"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114臺東縣國中組</td>
<td ${LIST_TD(false)}>東台線上 3C 購物平台</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
