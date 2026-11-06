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
${qHeader("1", `運動會`, `114全國賽國小組`)}
${desc(`
學校要舉行運動會，每一班都會派出 10 秒內可以跑完 50 公尺賽跑的學生參加，因此每一班能派出的學生數可能不一樣，例如 10, 12, 7, 15, 23 表示有五個班級，第 1 班有 10 位同學可參加運動會，第 2 班有 12 位同學可參加運動會，依此類推。為了增加跨班合作，學校把班級分成 A, B 兩群連續的班級，使得每群內的學生人數越接近越好。<br/>
<br/>
舉例來說，若如下表所示有 6 個班級，每個班級派出的學生人數為 10, 12, 7, 15, 23, 24。<br/>
<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>班級</td><td ${TD}>1</td><td ${TD}>2</td><td ${TD}>3</td><td ${TD}>4</td><td ${TD}>5</td><td ${TD}>6</td></tr><tr><td ${TH}>派出人數</td><td ${TD}>10</td><td ${TD}>12</td><td ${TD}>7</td><td ${TD}>15</td><td ${TD}>23</td><td ${TD}>24</td></tr></table>
<br/>
若分成 A, B 兩群，則 A 群應包含班級 1 到班級 4 的學生共 10+12+7+15=44 人，B 群則包含班級 5 與班級 6 的學生共 23+24=47 人，兩群僅相差 3 人。其他分群的方式都會導致更大的人數差異。請寫一個程式幫學校將班級分 A, B 群，並計算每一群的學生人數。應先輸出人數較少的一群，再輸出人數較多的一群。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表班級數。<br/>
第二行：N 個以空白分隔的整數，代表每個班級派出的學生人數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出兩個以空白分隔的整數，先輸出人數較少的一群，再輸出人數較多的一群。
`)}
${sample(1,
`6<br/>
10 12 7 15 23 24`,
`44 47`,
`共 6 個班級，總人數 91。嘗試每一種切法，差距最小的是 A 群（1～4 班）44 人、B 群（5～6 班）47 人，相差 3 人。<br/>先輸出人數較少的 44，再輸出 47。`)}
${sample(2,
`7<br/>
12 0 2 8 2 3 0`,
`13 14`,
`共 7 個班級，總人數 27。嘗試每一種切法，差距最小的是 A 群（1～3 班）14 人、B 群（4～7 班）13 人，相差 1 人。<br/>先輸出人數較少的 13，再輸出 14。`,
`{"data": ["6;10;12;7;15;23;24;44;47", "7;12;0;2;8;2;3;0;13;14"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114全國賽國小組</td>
<td ${LIST_TD(false)}>運動會</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
