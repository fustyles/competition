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
${qHeader("1", `秒數轉換`, `114雲林縣國中組`)}
${desc(`
體育課跑步計時器會記錄「總秒數」，但老師希望顯示成「幾分幾秒」的格式。<br/>
請輸入一個整數，代表「總秒數」，再將其轉換為 X 分鐘數 (整數) 與 Y 剩餘秒數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表總秒數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出格式為「X 分 Y 秒」，依序輸出分鐘數、分、剩餘秒數、秒。
`)}
${sample(1,
`125`,
`2 分 5 秒`,
`總秒數 125，125 秒 = 2 分 5 秒，所以輸出 2 分 5 秒。`)}
${sample(2,
`360`,
`6 分 0 秒`,
`總秒數 360，360 秒 = 6 分 0 秒。`,
`{"data": ["125;2;分;5;秒", "360;6;分;0;秒"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國中組</td>
<td ${LIST_TD(false)}>秒數轉換</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `分段費率計算`, `114雲林縣國中組`)}
${desc(`
某城市推出新的「用電費率計算器」。電費會依照不同使用量有不同費率：<br/>
0 ~ 100 度：每度 1.68 元<br/>
101 ~ 300 度：超過 100 度的部分，每度 2.45 元<br/>
301 度以上：超過 300 度的部分，每度 3.70 元<br/>
例如用電 350 度 → 前 100 度：1.68×100；接著 200 度 (101 ~ 300)：2.45×200；最後 50 度 (超過 300)：3.70×50。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表本月用電度數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出本月總電費 (四捨五入至整數)。若輸入小於 0，輸出 ERROR。
`)}
${sample(1,
`250`,
`536`,
`因使用 250 度，故前 100 度 → 1.68×100 = 168，接著 150 度 → 2.45×150 = 367.5，總計 535.5，四捨五入輸出 536。`)}
${sample(2,
`50`,
`84`,
`使用 50 度，1.68×50 = 84，輸出 84。`,
`{"data": ["250;536", "50;84"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國中組</td>
<td ${LIST_TD(false)}>分段費率計算</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `BMI 健康判定`, `114雲林縣國中組`)}
${desc(`
利用程式計算 BMI，並根據 BMI 判斷健康狀態。<br/>
BMI 的計算方式為：BMI = 體重(公斤) ÷ (身高(公尺) × 身高(公尺))<br/>
健康狀態判定如下：<br/>
BMI < 18.5 → 輸出「過輕」<br/>
18.5 ≤ BMI < 24 → 輸出「正常」<br/>
24 ≤ BMI < 27 → 輸出「過重」<br/>
BMI ≥ 27 → 輸出「肥胖」<br/>
※ 小數點運算後可直接用計算結果判斷，不必四捨五入。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個數字，第一個為體重 (公斤)，第二個為身高 (公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出對應的健康狀態；若輸入的體重或身高 ≤ 0，輸出 ERROR。
`)}
${sample(1,
`58<br/>
1.50`,
`過重`,
`BMI = 58 ÷ (1.50×1.50) ≈ 25.78，介於 24 與 27 之間，輸出過重。`)}
${sample(2,
`68<br/>
1.70`,
`正常`,
`BMI = 68 ÷ (1.70×1.70) ≈ 23.53，介於 18.5 與 24 之間，輸出正常。`,
`{"data": ["58;1.50;過重", "68;1.70;正常"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國中組</td>
<td ${LIST_TD(false)}>BMI 健康判定</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `成績統計`, `114雲林縣國中組`)}
${desc(`
老師要統計班上這次月考的成績情形。請先輸入學生人數 N，接著輸入 N 個整數 (每位學生的分數)。<br/>
你的程式需要：<br/>
1. 計算平均分數 (四捨五入到整數位)。<br/>
2. 計算低於平均分的學生數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為學生人數 N，接下來 N 個輸入依序為每位學生的分數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出平均分數和低於平均的人數。若 N ≤ 0，或資料中出現負分，輸出 ERROR。
`)}
${sample(1,
`5<br/>
80<br/>
75<br/>
90<br/>
60<br/>
100`,
`81 3`,
`平均：405 ÷ 5 = 81，低於 81 的有 80、75、60 共 3 人，所以輸出 81 3。`)}
${sample(2,
`4<br/>
50<br/>
40<br/>
50<br/>
41`,
`45 2`,
`平均：181 ÷ 4 = 45.25，四捨五入為 45，低於 45 的有 40、41 共 2 人，所以輸出 45 2。`,
`{"data": ["5;80;75;90;60;100;81;3", "4;50;40;50;41;45;2"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國中組</td>
<td ${LIST_TD(false)}>成績統計</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `手機電量充電模擬`, `114雲林縣國中組`)}
${desc(`
小華的手機目前電量為 B%。他將手機接上充電器，充電速度為每分鐘增加 2% 電量，最高只能充到 100%。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入兩個整數：B 為目前電量 (0 ~ 100)，T 為充電時間 (分鐘，0 ~ 300)。<br/>
<span ${LBL_OUT}>輸出說明</span>經過 T 分鐘後，輸出最終電量，格式為 X% (例如 70%)。如果輸入的電量或時間不在範圍內 (例如：負數、超過上限)，輸出 ERROR。
`)}
${sample(1,
`50<br/>
10`,
`70%`,
`充電 10 分鐘 → 增加 20%，變成 70%，所以輸出 70%。`)}
${sample(2,
`90<br/>
20`,
`100%`,
`充電 20 分鐘 → 增加 40%，但最高只能充到 100%，所以輸出 100%。`,
`{"data": ["50;10;70%", "90;20;100%"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國中組</td>
<td ${LIST_TD(false)}>手機電量充電模擬</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
