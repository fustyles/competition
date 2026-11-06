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
${qHeader("1", `壓縮機的編碼`, `114臺北市國中組`)}
${desc(`
為了節省儲存空間，探勘機器人將採集到的連續訊號進行了壓縮處理。壓縮演算法採用了「行程長度編碼 (Run-Length Encoding, RLE)」的原理：<br/>
當訊號中出現連續重複的字元時，將其替換為「該字元 + 重複次數」。例如：<br/>
原始訊號：AAABBBBC，壓縮後：A3B4C1<br/>
原始訊號：WWWWWWWWWW，壓縮後：W10<br/>
請撰寫一個程式，將輸入的原始字串轉換為壓縮格式。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>一個非空字串 S，由英文字母或數字組成，長度 1 ≤ Length ≤ 1000。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一行壓縮後的字串，格式為：[字元][次數][字元][次數]...
`)}
${sample(1,
`AAAB`,
`A3B1`,
`A 連續出現 3 次，B 出現 1 次，壓縮為 A3B1。`)}
${sample(2,
`A`,
`A1`,
``)}
${sample(3,
`BB`,
`B2`,
``)}
${sample(4,
`XY`,
`X1Y1`,
``)}
${sample(5,
`ABABABABAB`,
`A1B1A1B1A1B1A1B1A1B1`,
``)}
${sample(6,
`ZZZZZZZZZZZZZZZZZZZZ`,
`Z20`,
``,
`{"data": ["AAAB;A3B1", "A;A1", "BB;B2", "XY;X1Y1", "ABABABABAB;A1B1A1B1A1B1A1B1A1B1", "ZZZZZZZZZZZZZZZZZZZZ;Z20"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國中組</td>
<td ${LIST_TD(false)}>壓縮機的編碼</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `探險隊員名單排序`, `114臺北市國中組`)}
${desc(`
星際探險隊即將出發前往新的殖民星，人事部門需要對所有候選隊員進行排序，以決定登船的優先順序。每位隊員有三個關鍵屬性：貢獻度 (Contribution)、年資 (Seniority) 以及隊員 ID (ID)。<br/>
排序的規則如下 (優先權由高到低)：<br/>
1. 貢獻度：由高到低排序 (遞減)。<br/>
2. 年資：如果貢獻度相同，則年資由高到低排序 (遞減)。<br/>
3. 隊員 ID：如果貢獻度與年資皆相同，則依據隊員 ID 的字典順序由小到大排序 (遞增)。<br/>
隊員 ID 統一格式為 ID 後接三位數字 (例如：ID001, ID042, ID999)，且在同一筆資料中不會重複。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
1. 第一行為一個正整數 N，代表隊員的總人數 (1 ≤ N ≤ 1000)。<br/>
2. 接下來有 N 行，每行包含一位隊員的資訊，依序為：ID、貢獻度、年資 (貢獻度與年資介於 0 ~ 1000)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出排序後的隊員名單，每位隊員佔一行，格式與輸入相同。
`)}
${sample(1,
`3<br/>
ID001 100 5<br/>
ID002 100 8<br/>
ID003 150 2`,
`ID003 150 2<br/>
ID002 100 8<br/>
ID001 100 5`,
`ID003 貢獻度最高排名第一。<br/>
ID001 與 ID002 貢獻度相同，但 ID002 年資 (8) 高於 ID001 (5)，故 ID002 較前。`)}
${sample(2,
`1<br/>
ID359 100 5`,
`ID359 100 5`,
``)}
${sample(3,
`2<br/>
ID380 50 1<br/>
ID313 100 2`,
`ID313 100 2<br/>
ID380 50 1`,
``)}
${sample(4,
`2<br/>
ID951 100 1<br/>
ID318 100 5`,
`ID318 100 5<br/>
ID951 100 1`,
``)}
${sample(5,
`2<br/>
ID237 100 1<br/>
ID139 100 1`,
`ID139 100 1<br/>
ID237 100 1`,
``)}
${sample(6,
`5<br/>
ID221 10 10<br/>
ID708 10 10<br/>
ID007 10 10<br/>
ID741 10 10<br/>
ID479 10 10`,
`ID007 10 10<br/>
ID221 10 10<br/>
ID479 10 10<br/>
ID708 10 10<br/>
ID741 10 10`,
``,
`{"data": ["3;ID001;100;5;ID002;100;8;ID003;150;2;ID003;150;2;ID002;100;8;ID001;100;5", "1;ID359;100;5;ID359;100;5", "2;ID380;50;1;ID313;100;2;ID313;100;2;ID380;50;1", "2;ID951;100;1;ID318;100;5;ID318;100;5;ID951;100;1", "2;ID237;100;1;ID139;100;1;ID139;100;1;ID237;100;1", "5;ID221;10;10;ID708;10;10;ID007;10;10;ID741;10;10;ID479;10;10;ID007;10;10;ID221;10;10;ID479;10;10;ID708;10;10;ID741;10;10"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國中組</td>
<td ${LIST_TD(false)}>探險隊員名單排序</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `通訊網路廣播`, `114臺北市國中組`)}
${desc(`
探險隊在一個星團中建立了 N 個通訊節點 (編號 0 ~ N-1)。這些節點之間存在 M 條雙向的通訊連結。<br/>
當探險隊從 0 號節點 (基地台) 發送廣播訊號時，訊號會沿著連結逐層向外擴散：<br/>
第 0 層：0 號節點接收到訊號，距離為 0。<br/>
第 1 層：直接與 0 號節點相連的所有節點接收到訊號，距離為 1。<br/>
第 2 層：與第 1 層節點相連、且先前未接收過訊號的所有節點，距離為 2。以此類推。<br/>
請撰寫一個程式，計算從 0 號節點出發，所有可抵達的節點及其與 0 號節點的最短距離。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
1. 第一行為兩個整數 N、M，代表節點數與連結數 (1 ≤ N ≤ 1000，0 ≤ M ≤ 2000)。<br/>
2. 接下來有 M 行，每行包含兩個整數 u、v，代表節點 u 與 v 之間有一條通訊連結。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一行包含所有可抵達節點的編號與距離，格式為 ID:Distance，依節點 ID 由小到大排列，以空白分隔。
`)}
${sample(1,
`4 3<br/>
0 1<br/>
1 2<br/>
2 3`,
`0:0 1:1 2:2 3:3`,
`訊號從 0 傳到 1 (距離 1)，再從 1 傳到 2 (距離 2)，依此類推。`)}
${sample(2,
`1 0`,
`0:0`,
``)}
${sample(3,
`2 1<br/>
0 1`,
`0:0 1:1`,
``)}
${sample(4,
`2 0`,
`0:0`,
``)}
${sample(5,
`5 4<br/>
0 1<br/>
0 2<br/>
0 3<br/>
0 4`,
`0:0 1:1 2:1 3:1 4:1`,
``,
`{"data": ["4;3;0;1;1;2;2;3;0:0 1:1 2:2 3:3", "1;0;0:0", "2;1;0;1;0:0 1:1", "2;0;0:0", "5;4;0;1;0;2;0;3;0;4;0:0 1:1 2:1 3:1 4:1"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國中組</td>
<td ${LIST_TD(false)}>通訊網路廣播</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `區域網路連線檢測`, `114臺北市國中組`)}
${desc(`
在一個大型研究基地中，有 N 台電腦 (編號 0 ~ N-1)。初期，所有電腦都是獨立的。隨著任務需求，工程師會不斷在兩台電腦之間建立區域網路 (LAN) 連線。<br/>
你被要求開發一個檢測系統，處理以下兩種類型的指令：<br/>
1. CONNECT U V：在電腦 U 與 V 之間建立一條雙向連線。<br/>
2. QUERY U V：查詢電腦 U 與 V 是否在同一個連動網絡中 (即 U 與 V 之間是否存在直接或間接的路徑)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
1. 第一行為兩個正整數 N 與 M，分別代表電腦數量與操作指令的數量 (1 ≤ N ≤ 1000，1 ≤ M ≤ 2000)。<br/>
2. 接下來有 M 行，每行包含一個指令 (CONNECT 或 QUERY) 以及兩個整數 U、V (0 ≤ U, V < N)。<br/>
<span ${LBL_OUT}>輸出說明</span>針對每一個 QUERY 指令，若兩台電腦連通輸出 YES，否則輸出 NO，每個結果一行。
`)}
${sample(1,
`5 6<br/>
QUERY 0 1<br/>
CONNECT 0 1<br/>
CONNECT 1 2<br/>
QUERY 0 2<br/>
QUERY 0 3<br/>
CONNECT 3 4`,
`NO<br/>
YES<br/>
NO`,
``)}
${sample(2,
`2 1<br/>
QUERY 0 1`,
`NO`,
``)}
${sample(3,
`2 2<br/>
CONNECT 0 1<br/>
QUERY 0 1`,
`YES`,
``)}
${sample(4,
`5 4<br/>
CONNECT 0 1<br/>
CONNECT 1 2<br/>
CONNECT 2 3<br/>
QUERY 0 3`,
`YES`,
``)}
${sample(5,
`4 5<br/>
CONNECT 0 1<br/>
CONNECT 2 3<br/>
QUERY 0 2<br/>
QUERY 1 0<br/>
QUERY 3 2`,
`NO<br/>
YES<br/>
YES`,
``)}
${sample(6,
`3 2<br/>
CONNECT 0 0<br/>
QUERY 0 0`,
`YES`,
``,
`{"data": ["5;6;QUERY;0;1;CONNECT;0;1;CONNECT;1;2;QUERY;0;2;QUERY;0;3;CONNECT;3;4;NO;YES;NO", "2;1;QUERY;0;1;NO", "2;2;CONNECT;0;1;QUERY;0;1;YES", "5;4;CONNECT;0;1;CONNECT;1;2;CONNECT;2;3;QUERY;0;3;YES", "4;5;CONNECT;0;1;CONNECT;2;3;QUERY;0;2;QUERY;1;0;QUERY;3;2;NO;YES;YES", "3;2;CONNECT;0;0;QUERY;0;0;YES"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國中組</td>
<td ${LIST_TD(false)}>區域網路連線檢測</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `最近恆星點對`, `114臺北市國中組`)}
${desc(`
星際探測器掃描了一片未知的星域，並回傳了 N 顆恆星的二維平面座標。為了尋找可能存在的雙星系統或互相牽引的天體，請你在這 N 個點中，找出距離最近的兩個點，並輸出它們之間的距離。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
1. 第一行為一個正整數 N，代表恆星數量 (2 ≤ N ≤ 1000)。<br/>
2. 接下來有 N 行，每行包含兩個浮點數 X 與 Y，代表恆星的座標 (0 ≤ X, Y ≤ 10000)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最近點對的距離，四捨五入至小數點後 4 位 (例如 1.4142)。
`)}
${sample(1,
`3<br/>
0 0<br/>
3 4<br/>
1 1`,
`1.4142`,
`(0,0) 與 (1,1) 距離最近，為 1.4142。`)}
${sample(2,
`3<br/>
0 0<br/>
10 10<br/>
20 20`,
`14.1421`,
``)}
${sample(3,
`4<br/>
0 0<br/>
0 1<br/>
1 0<br/>
1 1`,
`1.0000`,
``)}
${sample(4,
`2<br/>
1.5 1.5<br/>
1.5 1.5`,
`0.0000`,
``)}
${sample(5,
`5<br/>
0 0<br/>
1 1<br/>
2 2<br/>
0.1 0.1<br/>
5 5`,
`0.1414`,
``,
`{"data": ["3;0;0;3;4;1;1;1.4142", "3;0;0;10;10;20;20;14.1421", "4;0;0;0;1;1;0;1;1;1.0000", "2;1.5;1.5;1.5;1.5;0.0000", "5;0;0;1;1;2;2;0.1;0.1;5;5;0.1414"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國中組</td>
<td ${LIST_TD(false)}>最近恆星點對</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `巨型結構的建造排程`, `114臺北市國中組`)}
${desc(`
星際聯邦計畫建造一座戴森球 (Dyson Sphere)。這是一個極為複雜的工程，包含 N 個建造任務 (編號 0 ~ N-1)。每個任務都有一個所需工時 (Duration) Di。<br/>
此外，任務之間存在依賴關係 (Dependencies)：某些任務必須在其他任務完成後才能開始。<br/>
為了盡快完成戴森球，所有沒有依賴關係或前置任務已完成的任務都可以並行 (Parallel) 進行。請計算完成整個工程所需的最短總工期。如果工程因循環依賴而無法完成，請輸出 IMPOSSIBLE。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
1. 第一行為兩個整數 N、M，代表任務數量與依賴關係數量 (1 ≤ N ≤ 1000，0 ≤ M ≤ 2000)。<br/>
2. 第二行為 N 個整數，代表每個任務的工時 D0, D1, …, DN-1 (1 ≤ Di ≤ 10000)。<br/>
3. 接下來有 M 行，每行包含兩個整數 U、V，代表任務 U 必須在任務 V 開始之前完成 (U→V)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最短總工期；若無法完成，輸出 IMPOSSIBLE。
`)}
${sample(1,
`3 2<br/>
10 20 30<br/>
0 1<br/>
1 2`,
`60`,
`0→1→2，總工期 10+20+30=60。`)}
${sample(2,
`1 0<br/>
10`,
`10`,
``)}
${sample(3,
`2 1<br/>
10 20<br/>
0 1`,
`30`,
``)}
${sample(4,
`3 3<br/>
10 10 10<br/>
0 1<br/>
1 2<br/>
2 0`,
`IMPOSSIBLE`,
`0→1→2→0 形成循環依賴，無法完成。`)}
${sample(5,
`3 2<br/>
10 20 30<br/>
0 1<br/>
0 2`,
`40`,
``)}
${sample(6,
`4 3<br/>
10 10 10 10<br/>
0 1<br/>
1 2<br/>
2 3`,
`40`,
``,
`{"data": ["3;2;10;20;30;0;1;1;2;60", "1;0;10;10", "2;1;10;20;0;1;30", "3;3;10;10;10;0;1;1;2;2;0;IMPOSSIBLE", "3;2;10;20;30;0;1;0;2;40", "4;3;10;10;10;10;0;1;1;2;2;3;40"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國中組</td>
<td ${LIST_TD(false)}>巨型結構的建造排程</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
