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
${qHeader("1", `圓柱體積計算`, `114雲林縣國小組`)}
${desc(`
小明正在學習幾何，他想寫一個程式來計算圓柱體的體積。<br/>
圓柱體積的計算公式為：圓柱體積 = 半徑 × 半徑 × 3.14 × 高<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入圓柱體的底面半徑、圓柱體的高度。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出圓柱體體積。
`)}
${sample(1,
`3<br/>
5`,
`141.3`,
`3 × 3 × 3.14 × 5 = 141.3`)}
${sample(2,
`2<br/>
10`,
`125.6`,
`2 × 2 × 3.14 × 10 = 125.6`)}
${sample(3,
`3<br/>
15`,
`423.9`,
`3 × 3 × 3.14 × 15 = 423.9`,
`{"data": ["3;5;141.3", "2;10;125.6", "3;15;423.9"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國小組</td>
<td ${LIST_TD(false)}>圓柱體積計算</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `身體質量指數計算與健康判斷`, `114雲林縣國小組`)}
${desc(`
小康非常注重身體健康，他知道身體質量指數 (BMI) 是一個常用的健康指標。他想寫一個程式來快速算出自己的 BMI 值，並判斷肥胖程度是標準、過輕還是過重。<br/>
BMI 的計算公式為：BMI = 體重 (公斤) ÷ (身高 (公尺) × 身高 (公尺))<br/>
肥胖狀態判斷標準：<br/>
BMI < 18.5 → 過輕<br/>
18.5 ≤ BMI < 24 → 標準<br/>
BMI ≥ 24 → 過重<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入體重 (公斤)、身高 (公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 BMI 值 (四捨五入至小數點後 2 位) 與肥胖狀態。
`)}
${sample(1,
`60<br/>
1.65`,
`22.04 標準`,
`BMI = 60 ÷ (1.65 × 1.65) ≈ 22.04，介於 18.5 與 24 之間，輸出 22.04 標準。`)}
${sample(2,
`88<br/>
1.8`,
`27.16 過重`,
`BMI = 88 ÷ (1.8 × 1.8) ≈ 27.16，大於等於 24，輸出 27.16 過重。`)}
${sample(3,
`35<br/>
1.65`,
`12.86 過輕`,
`BMI = 35 ÷ (1.65 × 1.65) ≈ 12.86，小於 18.5，輸出 12.86 過輕。`,
`{"data": ["60;1.65;22.04;標準", "88;1.8;27.16;過重", "35;1.65;12.86;過輕"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國小組</td>
<td ${LIST_TD(false)}>身體質量指數計算與健康判斷</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `房間木地板的購買計算`, `114雲林縣國小組`)}
${desc(`
雲雲是一位室內設計師，想要為客戶把房間的地板換成木地板。他挑選的木地板規格是：長 60 公分、寬 20 公分。已知每包木地板有 20 片，且木地板可以切割拼鋪。客戶房間地板的長、寬以公尺計算，雲雲需要計算「最少要購買幾包」才能鋪滿整個房間。(註：一定要買整包的數量，不可以買 3.5 包)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入房間的長度 (公尺)、房間的寬度 (公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最少需要購買的木地板包數。
`)}
${sample(1,
`3<br/>
4`,
`5`,
`房間面積 12 平方公尺，每片木地板 0.6 × 0.2 = 0.12 平方公尺，需要 100 片，每包 20 片，需買 5 包。`)}
${sample(2,
`5<br/>
3.5`,
`8`,
`房間面積 17.5 平方公尺，需要 146 片 (17.5 ÷ 0.12 ≈ 145.8，無條件進位)，需買 8 包。`)}
${sample(3,
`7<br/>
4`,
`12`,
`房間面積 28 平方公尺，需要 234 片 (28 ÷ 0.12 ≈ 233.3，無條件進位)，需買 12 包。`,
`{"data": ["3;4;5", "5;3.5;8", "7;4;12"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國小組</td>
<td ${LIST_TD(false)}>房間木地板的購買計算</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `美味餐車三明治多重折扣與利潤計算`, `114雲林縣國小組`)}
${desc(`
美味餐車販售三明治。老闆決定讓三明治的成本可以彈性輸入，三明治的售價是成本再加 50% 來制定。為了促銷，餐車設有兩段折扣：每日上午 11 點過後實施打八折優惠，而 12 點過後則會實施更低的打六折優惠。老闆想知道，在不同折扣時段，三明治是否仍有利潤，以及具體賺或是賠多少錢。(有利潤就是賺錢；無利潤就是賠錢)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三明治的成本、折扣時段 (11 或 12)。<br/>
<span ${LBL_OUT}>輸出說明</span>有利潤時依序輸出「有利潤」、「賺」、金額、「元」(例如：有利潤 賺 4 元)；賠錢時依序輸出「無利潤」、「賠」、金額、「元」。
`)}
${sample(1,
`20<br/>
11`,
`有利潤 賺 4 元`,
`售價 20 × 1.5 = 30 元，11 點後打八折為 24 元，24 - 20 = 4，有利潤賺 4 元。`)}
${sample(2,
`40<br/>
11`,
`有利潤 賺 8 元`,
`售價 40 × 1.5 = 60 元，11 點後打八折為 48 元，48 - 40 = 8，有利潤賺 8 元。`)}
${sample(3,
`35<br/>
12`,
`無利潤 賠 3.5 元`,
`售價 35 × 1.5 = 52.5 元，12 點後打六折為 31.5 元，31.5 - 35 = -3.5，無利潤賠 3.5 元。`,
`{"data": ["20;11;有利潤;賺;4;元", "40;11;有利潤;賺;8;元", "35;12;無利潤;賠;3.5;元"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國小組</td>
<td ${LIST_TD(false)}>美味餐車三明治多重折扣與利潤計算</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `電費分段計價`, `114雲林縣國小組`)}
${desc(`
為了鼓勵節約用電，電力公司實施分段計價 (累進費率) 制度，電費會依照不同使用量有不同的費率。小蔡想了解他家用電量對應的總電費，因此需要一個程式來進行計算。<br/>
分段計價標準如下：<br/>
1. 0 ~ 120 度：每度電費 1.63 元。<br/>
2. 121 ~ 330 度：超出 120 度至 330 度的部分，每度 2.38 元。<br/>
3. 331 度以上：超出 330 度的部分，每度 3.52 元。<br/>
例如用電度數為 290 度：前 120 度 120 × 1.63 = 195.6 元；121 度至 290 度 170 × 2.38 = 404.6 元；總電費 = 195.6 + 404.6 = 600.2，四捨五入至整數，輸出 600。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入該期總用電度數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出總電費 (四捨五入取整數)。
`)}
${sample(1,
`100`,
`163`,
`100 × 1.63 = 163，輸出 163。`)}
${sample(2,
`350`,
`766`,
`前 120 度：195.6 元；121 ~ 330 度：210 × 2.38 = 499.8 元；超過 330 度的 20 度：20 × 3.52 = 70.4 元。<br/>
總電費 765.8，四捨五入輸出 766。`)}
${sample(3,
`240`,
`481`,
`前 120 度：195.6 元；121 ~ 240 度：120 × 2.38 = 285.6 元，總電費 481.2，四捨五入輸出 481。`,
`{"data": ["100;163", "350;766", "240;481"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114雲林縣國小組</td>
<td ${LIST_TD(false)}>電費分段計價</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
