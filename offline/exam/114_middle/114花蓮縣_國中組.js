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
${qHeader("1", `公車時刻表`, `114花蓮縣國中組`)}
${desc(`
前往學校的公車路線非常準時，從早上 06:00 發出首班車，之後每隔 M 分鐘發一班車。現在小明看手錶，時間是 H 點 S 分。請問小明最少還需要等幾分鐘，下一班車才會來？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個整數 H、S、M。假設小明到達時間一定在末班車之前。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表需要等待的分鐘數。若小明到達時剛好有車 (等待時間為 0)，請輸出 0。
`)}
${sample(1,
`6 15 20`,
`5`,
`首班 06:00，下一班 06:20。現在 06:15，需再等 5 分鐘。`)}
${sample(2,
`5 50 20`,
`10`,
`首班車 06:00 才發車。小明 05:50 到，必須等到 06:00。`,
`{"data": ["6;15;20;5", "5;50;20;10"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國中組</td>
<td ${LIST_TD(false)}>公車時刻表</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `連續成績進步分析`, `114花蓮縣國中組`)}
${desc(`
老師連續記錄了你 N 天的測驗成績，依照時間順序存放在一份成績清單中。老師希望透過這些資料，了解你在學習過程中是否有持續進步的表現。<br/>
這份成績清單中一定會有 N 筆成績資料，代表第 1 天到第 N 天的測驗成績。請從第 2 天開始，將每天的成績與前一天的成績進行比較，並依下列規則判斷：<br/>
若當天成績大於前一天成績，則視為「成績進步」。<br/>
若當天成績沒有比前一天高，則中斷連續進步的計算。<br/>
請找出並輸出「連續成績進步」的最長天數。<br/>
注意：第 1 天沒有前一天可比較，因此不列入計算。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入整數 N，第二行輸入 N 個整數，依序為第 1 天到第 N 天的成績。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表連續成績進步的最長天數。
`)}
${sample(1,
`5<br/>
60 65 70 68 72`,
`2`,
`連續進步區段：<br/>
1. 60 → 65 → 70 (連續 2 次進步)<br/>
2. 68 → 72 (連續 1 次進步)<br/>
最大值為 2。`)}
${sample(2,
`5<br/>
50 60 55 56 57`,
`2`,
`連續進步區段：<br/>
1. 50 → 60 (連續 1 次進步)<br/>
2. 55 → 56 → 57 (連續 2 次進步)<br/>
最大值為 2。`,
`{"data": ["5;60;65;70;68;72;2", "5;50;60;55;56;57;2"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國中組</td>
<td ${LIST_TD(false)}>連續成績進步分析</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `卡住的鍵盤`, `114花蓮縣國中組`)}
${desc(`
小明的鍵盤壞掉了，有時候按一個鍵，螢幕上卻會連續出現好幾個一樣的字 (例如按 A 變成 AAAA)。現在給你一串小明打出來的亂碼，請你幫忙分析看看，是哪一個按鍵卡住最久 (連續出現最多次)？<br/>
規則：<br/>
1. 請找出字串中，連續出現最多次的字母是哪一個。<br/>
2. 輸出該字母以及它連續出現的次數。<br/>
3. 平手規則：如果有兩個字母的連續次數一樣多，請輸出最先出現的那一個。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個由大寫英文字母組成的字串 S (例如：AAABCCCCDD)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出該字母與次數。
`)}
${sample(1,
`WWWWWWWWWWWWBBWW`,
`W 12`,
`前面的 W 連續出現 12 次，是最多的。`)}
${sample(2,
`AAABCCCC`,
`C 4`,
`C 連續出現 4 次是最多的。`,
`{"data": ["WWWWWWWWWWWWBBWW;W;12", "AAABCCCC;C;4"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國中組</td>
<td ${LIST_TD(false)}>卡住的鍵盤</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `外送員的接單策略`, `114花蓮縣國中組`)}
${desc(`
你是外送平台的演算法工程師，需要設計一套系統來幫助外送員計算「最多接單數量」。已知系統中有 N 張待接的訂單，每一張訂單都有固定的「開始時間」與「結束時間」。外送員同一時間只能執行一張訂單 (不能同時送兩單)。請問在時間不衝突的情況下，這位外送員最多可以接下幾張訂單？<br/>
重要規則：<br/>
1. 如果一張訂單的「結束時間」剛好等於下一張訂單的「開始時間」，則視為不衝突，可以順利銜接。例如：接了 (1, 3) 的單，可以馬上接 (3, 5) 的單。<br/>
2. 你的目標是「數量最大化」，而不是總時長最大化。<br/>
3. 提示：輸入的訂單未經過排序，你可能需要自行整理資料才能找出最佳解。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個正整數 N (1 ≤ N ≤ 50)，代表訂單總數。<br/>
接下來有 N 組各兩個整數 Start、End，代表每張訂單的開始與結束時間 (0 ≤ Start ≤ End ≤ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最多可以接下的訂單數。
`)}
${sample(1,
`4<br/>
1 3 2 4 3 5 5 7`,
`3`,
`1. 先選擇最早結束的訂單 A (1-3)，此時時間來到 3。<br/>
2. 訂單 B (2-4) 的開始時間是 2，因為 2 &lt; 3，與 A 衝突，無法選擇。<br/>
3. 訂單 C (3-5) 的開始時間是 3，剛好可以銜接 A，選擇 C，此時時間來到 5。<br/>
4. 訂單 D (5-7) 的開始時間是 5，剛好可以銜接 C，選擇 D。<br/>
總共接了 3 張單 (A, C, D)。`)}
${sample(2,
`3<br/>
1 10 10 20 20 30`,
`3`,
`訂單 A (1-10)、訂單 B (10-20)、訂單 C (20-30) 三張單時間完全剛好接上，共 3 張。`,
`{"data": ["4;1;3;2;4;3;5;5;7;3", "3;1;10;10;20;20;30;3"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國中組</td>
<td ${LIST_TD(false)}>外送員的接單策略</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
