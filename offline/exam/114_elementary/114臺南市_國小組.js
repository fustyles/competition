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
${qHeader("1", `偶數和`, `114臺南市國小組`)}
${desc(`
請設計一個程式，依序輸入二個正整數 (由小到大) 作為起始數與結束數，計算出兩數之間 (含兩數) 所有偶數的和。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入起始數、結束數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表偶數的和。
`)}
${sample(1,
`10<br/>
20`,
`90`,
`輸入起始數 10，結束數 20。<br/>
10 至 20 間的偶數有 10、12、14、16、18、20，偶數的和為 90。`)}
${sample(2,
`31<br/>
39`,
`140`,
`輸入起始數 31，結束數 39。<br/>
31 至 39 間的偶數有 32、34、36、38，偶數的和為 140。`)}
${sample(3,
`1<br/>
20`,
`110`,
``)}
${sample(4,
`20<br/>
41`,
`330`,
``)}
${sample(5,
`99<br/>
111`,
`630`,
``,
`{"data": ["10;20;90", "31;39;140", "1;20;110", "20;41;330", "99;111;630"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺南市國小組</td>
<td ${LIST_TD(false)}>偶數和</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `三角形`, `114臺南市國小組`)}
${desc(`
已知一個三角形的任意兩邊和必定大於第三邊，請寫一個程式，輸入三個正整數，判斷能否組成一個三角形。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三個正整數，代表三個邊長。<br/>
<span ${LBL_OUT}>輸出說明</span>可以組成三角形輸出 yes，否則輸出 no。
`)}
${sample(1,
`9 6 8`,
`yes`,
`符合「任意兩邊和必定大於第三邊」，可以組成一個三角形。`)}
${sample(2,
`1 2 3`,
`no`,
`1+2 = 3，不符合「任意兩邊和必定大於第三邊」，不可以組成一個三角形。`)}
${sample(3,
`10 10 8`,
`yes`,
``)}
${sample(4,
`30 60 100`,
`no`,
``)}
${sample(5,
`8 8 8`,
`yes`,
``)}
${sample(6,
`5 5 10`,
`no`,
``,
`{"data": ["9;6;8;yes", "1;2;3;no", "10;10;8;yes", "30;60;100;no", "8;8;8;yes", "5;5;10;no"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺南市國小組</td>
<td ${LIST_TD(false)}>三角形</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `刮刮樂`, `114臺南市國小組`)}
${desc(`
小哲彩券公司推出一種六六大順的刮刮樂，規則如下：<br/>
每張刮刮樂上面有三個 0 ~ 9 的數字。<br/>
如果出現一個數字 6，則可以得到 100 元。<br/>
如果出現二個數字 6，則可以得到 200 元。<br/>
如果出現三個數字 6，則可以得到 500 元。<br/>
以上三種得獎方式，你只能選擇獎金最高的一種來領取。<br/>
現在給你一張刮刮樂上的三個數字，請問你可以得到多少獎金。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個由三個數字組成的字串 (例如 666)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表可以得到的獎金。
`)}
${sample(1,
`666`,
`500`,
`出現三個數字 6，可以得到 500 元。`)}
${sample(2,
`600`,
`100`,
`出現一個數字 6，可以得到 100 元。`)}
${sample(3,
`266`,
`200`,
`出現二個數字 6，可以得到 200 元。`)}
${sample(4,
`123`,
`0`,
`出現 0 個數字 6，沒有中獎。`)}
${sample(5,
`616`,
`200`,
``)}
${sample(6,
`911`,
`0`,
``)}
${sample(7,
`336`,
`100`,
``)}
${sample(8,
`666`,
`500`,
``,
`{"data": ["666;500", "600;100", "266;200", "123;0", "616;200", "911;0", "336;100", "666;500"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺南市國小組</td>
<td ${LIST_TD(false)}>刮刮樂</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
