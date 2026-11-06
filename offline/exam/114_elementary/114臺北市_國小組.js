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
${qHeader("1", `崔老師的出缺席紀錄表`, `114臺北市國小組`)}
${desc(`
崔老師用清單記錄一週的出席狀況，例如：<br/>
小明 到 到 缺 到 到<br/>
小美 到 缺 缺 到 到<br/>
每一列是一位學生，第一個元素是姓名，後面五個元素代表星期一到星期五的出席狀況 (到 或 缺)。<br/>
任務：輸入學生的出席紀錄，顯示該名學生缺席幾天。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
依序輸入學生姓名及星期一到星期五的出席狀況。<br/>
<span ${LBL_OUT}>輸出說明</span><br/>
每位學生輸出一行，格式為「姓名缺席 X 天」(例如：小明缺席 1 天)。
`)}
${sample(1,
`小明 到 到 缺 到 到<br/>
小美 到 缺 缺 到 到`,
`小明缺席 1 天<br/>
小美缺席 2 天`,
`小明星期三缺席，共 1 天；小美星期二、三缺席，共 2 天。`)}
${sample(2,
`小明 到 到 缺 到 到`,
`小明缺席 1 天`,
``)}
${sample(3,
`小美 到 缺 缺 到 到`,
`小美缺席 2 天`,
``)}
${sample(4,
`阿宏 到 到 到 到 到`,
`阿宏缺席 0 天`,
``)}
${sample(5,
`小安 缺 缺 缺 到 缺`,
`小安缺席 4 天`,
``)}
${sample(6,
`小明 缺 缺 缺 到 到`,
`小明缺席 3 天`,
``,
`{"data": ["小明;到;到;缺;到;到;小美;到;缺;缺;到;到;小明缺席 1 天;小美缺席 2 天", "小明;到;到;缺;到;到;小明缺席 1 天", "小美;到;缺;缺;到;到;小美缺席 2 天", "阿宏;到;到;到;到;到;阿宏缺席 0 天", "小安;缺;缺;缺;到;缺;小安缺席 4 天", "小明;缺;缺;缺;到;到;小明缺席 3 天"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國小組</td>
<td ${LIST_TD(false)}>崔老師的出缺席紀錄表</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `校車安全：有沒有超載？`, `114臺北市國小組`)}
${desc(`
每台校車有一個車號，後面是每站上車人數，總共只會有五站。例如：<br/>
A 車：2 3 4 5 6<br/>
B 車：1 1 2 2 3<br/>
規則：每台校車總人數 > 20 就是超載。<br/>
任務：計算每一台校車的總人數，輸出「車號 車 總人數 人」，例如：A 車 20 人；若總人數超過 20，則改為輸出「車號 車超載」，例如：B 車超載。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三台車，每台先輸入車號 (英文大寫字母)，再輸入五站的上車人數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序每台車輸出一行結果。
`)}
${sample(1,
`A<br/>
5 3 4 4 4<br/>
B<br/>
4 5 4 3 4<br/>
C<br/>
3 3 4 3 3`,
`A 車 20 人<br/>
B 車 20 人<br/>
C 車 16 人`,
`A 車 20 人、B 車 20 人皆未超過 20 人；C 車 16 人。`)}
${sample(2,
`A<br/>
5 3 2 4 6<br/>
B<br/>
6 6 5 5 4<br/>
C<br/>
4 3 2 3 4`,
`A 車 20 人<br/>
B 車超載<br/>
C 車 16 人`,
``)}
${sample(3,
`A<br/>
4 4 4 4 3<br/>
B<br/>
5 5 4 3 3<br/>
C<br/>
5 4 4 4 4`,
`A 車 19 人<br/>
B 車 20 人<br/>
C 車超載`,
``)}
${sample(4,
`A<br/>
3 4 4 4 4<br/>
B<br/>
4 4 4 4 4<br/>
C<br/>
5 3 4 4 3`,
`A 車 19 人<br/>
B 車 20 人<br/>
C 車 19 人`,
``)}
${sample(5,
`A<br/>
5 5 4 4 4<br/>
B<br/>
6 5 5 3 3<br/>
C<br/>
4 4 4 4 5`,
`A 車超載<br/>
B 車超載<br/>
C 車超載`,
``)}
${sample(6,
`A<br/>
3 4 3 4 6<br/>
B<br/>
4 4 4 4 3<br/>
C<br/>
2 6 6 4 3`,
`A 車 20 人<br/>
B 車 19 人<br/>
C 車超載`,
``,
`{"data": ["A;5;3;4;4;4;B;4;5;4;3;4;C;3;3;4;3;3;A 車 20 人;B 車 20 人;C 車 16 人", "A;5;3;2;4;6;B;6;6;5;5;4;C;4;3;2;3;4;A 車 20 人;B 車超載;C 車 16 人", "A;4;4;4;4;3;B;5;5;4;3;3;C;5;4;4;4;4;A 車 19 人;B 車 20 人;C 車超載", "A;3;4;4;4;4;B;4;4;4;4;4;C;5;3;4;4;3;A 車 19 人;B 車 20 人;C 車 19 人", "A;5;5;4;4;4;B;6;5;5;3;3;C;4;4;4;4;5;A 車超載;B 車超載;C 車超載", "A;3;4;3;4;6;B;4;4;4;4;3;C;2;6;6;4;3;A 車 20 人;B 車 19 人;C 車超載"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國小組</td>
<td ${LIST_TD(false)}>校車安全：有沒有超載？</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `成績補考機制`, `114臺北市國小組`)}
${desc(`
學校規定所有低於 60 分的成績都以 60 分計算。請幫老師修正所有學生的成績表。<br/>
任務規則：<br/>
1. 使用者輸入一個數字 N，代表有 N 位學生。<br/>
2. 接著輸入 N 行成績資料，每行代表一位學生的各科分數。<br/>
3. 請檢查每一個分數，若小於 60 則改成 60，否則保持不變。<br/>
4. 輸出修正後的分數表。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>學生數 N 與 N 行成績。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出修正後每位學生的成績 (每位學生一行)。
`)}
${sample(1,
`2<br/>
50 80 90<br/>
40 55 100`,
`60 80 90<br/>
60 60 100`,
`低於 60 分的 50、40、55 都改成 60，其餘不變。`)}
${sample(2,
`1<br/>
10 20 30`,
`60 60 60`,
``)}
${sample(3,
`2<br/>
100 100<br/>
59 60`,
`100 100<br/>
60 60`,
``)}
${sample(4,
`3<br/>
10 10<br/>
80 80<br/>
5 95`,
`60 60<br/>
80 80<br/>
60 95`,
``,
`{"data": ["2;50 80 90;40 55 100;60 80 90;60 60 100", "1;10 20 30;60 60 60", "2;100 100;59 60;100 100;60 60", "3;10 10;80 80;5 95;60 60;80 80;60 95"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國小組</td>
<td ${LIST_TD(false)}>成績補考機制</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `滑動平均值`, `114臺北市國小組`)}
${desc(`
請計算清單中連續 K 個數字的平均值 (Moving Average)。<br/>
任務規則：<br/>
1. 第一次輸入：一串數字，以空白分隔。<br/>
2. 第二次輸入：區間大小 K。<br/>
3. 請依序計算每 K 個相鄰數字的平均值。<br/>
例如數列 10 20 30，K=2。第一組 (10+20)/2 = 15，第二組 (20+30)/2 = 25。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一串數字，第二行輸入整數 K。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出算出的平均值數列。
`)}
${sample(1,
`10 20 30 40 50<br/>
2`,
`15 25 35 45`,
`(10+20)/2 = 15、(20+30)/2 = 25、(30+40)/2 = 35、(40+50)/2 = 45。`)}
${sample(2,
`2 4 6 8<br/>
2`,
`3 5 7`,
``)}
${sample(3,
`10 20 30<br/>
3`,
`20`,
``)}
${sample(4,
`5 5 5 5<br/>
1`,
`5 5 5 5`,
``,
`{"data": ["10 20 30 40 50;2;15;25;35;45", "2 4 6 8;2;3;5;7", "10 20 30;3;20", "5 5 5 5;1;5;5;5;5"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國小組</td>
<td ${LIST_TD(false)}>滑動平均值</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `連續字元分段顯示`, `114臺北市國小組`)}
${desc(`
給一個字串 s，請將連續相同的字元視為一組，並依序顯示「字元＋出現次數」，每組一行。<br/>
例如 s = "aaabbcddd"，輸出：a3、b2、c1、d3 (各一行)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個字串 s。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出每一組的「字元＋出現次數」，每組一行。
`)}
${sample(1,
`aaabbcddd`,
`a3<br/>
b2<br/>
c1<br/>
d3`,
`aaa → a3、bb → b2、c → c1、ddd → d3，每組輸出一行。`)}
${sample(2,
`aabcccddd`,
`a2<br/>
b1<br/>
c3<br/>
d3`,
``,
`{"data": ["aaabbcddd;a3;b2;c1;d3", "aabcccddd;a2;b1;c3;d3"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國小組</td>
<td ${LIST_TD(false)}>連續字元分段顯示</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `移除指定字元後輸出新字串`, `114臺北市國小組`)}
${desc(`
給一個字串 s 與一個字元 target，請用迴圈移除 s 中所有的 target，並輸出新字串。<br/>
例如 s = "banana"，target = "a"，輸出 bnn。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入字串 s，第二行輸入字元 target。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出移除後的新字串。
`)}
${sample(1,
`banana<br/>
a`,
`bnn`,
`banana 移除所有 a 後為 bnn。`)}
${sample(2,
`roblox<br/>
o`,
`rblx`,
``,
`{"data": ["banana;a;bnn", "roblox;o;rblx"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114臺北市國小組</td>
<td ${LIST_TD(false)}>移除指定字元後輸出新字串</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
