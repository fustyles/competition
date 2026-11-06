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
${qHeader("1", `圓柱體積計算`, `114新竹縣國小組`)}
${desc(`
小新正在學習幾何，他知道圓柱體積的計算是測量一個立體形狀容積的重要方法。為了驗證計算結果，請協助他寫一個程式來計算圓柱體的體積。<br/>
(1) π 固定用 3.14。<br/>
(2) 輸出為小數點後兩位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入半徑、高。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出圓柱體體積 (小數點後兩位)。
`)}
${sample(1,
`3<br/>
7`,
`197.82`,
`半徑 = 3，高 = 7。體積為 3.14 × 3 × 3 × 7 = 197.82。`)}
${sample(2,
`9<br/>
9`,
`2289.06`,
`半徑 = 9，高 = 9。體積為 3.14 × 9 × 9 × 9 = 2289.06。`,
`{"data": ["3;7;197.82", "9;9;2289.06"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國小組</td>
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
${qHeader("2", `身體質量指數計算與健康判斷`, `114新竹縣國小組`)}
${desc(`
小筑非常注重身體健康，他想寫一個程式來快速算出自己的 BMI 值 (四捨五入取至小數點後兩位)，並能判斷肥胖程度是標準、過輕還是過重。<br/>
BMI = 體重 (公斤) ÷ (身高 (公尺) × 身高 (公尺))<br/>
肥胖狀態判斷標準：BMI < 18.5 → 過輕；18.5 ≤ BMI < 24 → 標準；BMI ≥ 24 → 過重。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入體重 (公斤)、身高 (公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 BMI 值 (小數點後兩位) 與判斷結果。
`)}
${sample(1,
`60<br/>
1.55`,
`24.97 過重`,
`60 ÷ (1.55 × 1.55) = 24.97，由於 24.97 ≥ 24，判斷結果為「過重」。`)}
${sample(2,
`38<br/>
1.43`,
`18.58 標準`,
`38 ÷ (1.43 × 1.43) = 18.58，由於 18.5 ≤ 18.58 &lt; 24，判斷結果為「標準」。`,
`{"data": ["60;1.55;24.97;過重", "38;1.43;18.58;標準"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國小組</td>
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
${qHeader("3", `房間磁磚的購買計算`, `114新竹縣國小組`)}
${desc(`
小科是位室內設計師，想要為客戶把房間的地板換成「磁磚」。他挑選的磁磚規格是：長 60 公分、寬 60 公分。已知每包磁磚有 12 片，且磁磚可以切割拼鋪。客戶房間地板的長、寬皆是以公尺計算，小科需要計算「最少」要購買幾「包」磁磚才能鋪滿整個房間。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入房間的長 (公尺)、寬 (公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最少需要購買的包數。
`)}
${sample(1,
`4<br/>
4`,
`4`,
`房間面積 4 × 4 = 16 平方公尺。1 包磁磚 12 片：12 × 0.36 = 4.32 平方公尺。<br/>
16 ÷ 4.32 = 3.70...，無條件進位為 4 包。`)}
${sample(2,
`5<br/>
3.5`,
`5`,
`房間面積 5 × 3.5 = 17.5 平方公尺。17.5 ÷ 4.32 = 4.05...，無條件進位為 5 包。`,
`{"data": ["4;4;4", "5;3.5;5"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國小組</td>
<td ${LIST_TD(false)}>房間磁磚的購買計算</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `美味餐車三明治多重折扣與利潤計算`, `114新竹縣國小組`)}
${desc(`
美味餐車販售三明治。老闆決定讓三明治的成本可以彈性輸入。售價是成本再加 50% 來制定。為了促銷，餐車設有兩段折扣：每日 11 點過後 (含 11 點) 實施打八折優惠，而 12 點過後 (含 12 點) 則會實施更低的打六折優惠。<br/>
制定售價需要四捨五入到整數，打折則是依照已經四捨五入的售價下去打折，折扣之後的價錢也需要四捨五入到整數。老闆想知道，在不同折扣時段，三明治是否仍有利潤，以及具體賺或賠多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入三明治的成本、時段。<br/>
<span ${LBL_OUT}>輸出說明</span>有利潤時依序輸出「有利潤」、「賺」、金額、「元」(例如：有利潤 賺 4 元)；否則依序輸出「無利潤」、「賠」、金額、「元」。
`)}
${sample(1,
`20<br/>
11`,
`有利潤 賺 4 元`,
`原售價 20 × 1.5 = 30 元。11 點後打八折，售價為 24 元。利潤 24 - 20 = 4 元。`)}
${sample(2,
`35<br/>
12`,
`無利潤 賠 3 元`,
`原售價 35 × 1.5 = 52.5 元，四捨五入為 53 元。12 點後打六折 53 × 0.6 = 31.8 元，四捨五入為 32 元。利潤 32 - 35 = -3 元，賠 3 元。`,
`{"data": ["20;11;有利潤;賺;4;元", "35;12;無利潤;賠;3;元"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國小組</td>
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
${qHeader("5", `雲端資料備份硬碟統計`, `114新竹縣國小組`)}
${desc(`
雲端資料備份公司需要定期將大量檔案備份至雲端伺服器。公司目前租用了多個不同容量的雲端硬碟空間，每個硬碟的剩餘容量不盡相同。<br/>
備份系統會將檔案依序填入硬碟：當第一個硬碟滿了以後，系統就使用第二個硬碟，依此類推。請計算在本次備份作業中，總共使用了幾個雲端硬碟來儲存資料。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
(1) 一個數字，代表「待備份」的檔案總共多少 MB。<br/>
(2) 一個整數，代表共有幾個雲端硬碟。<br/>
(3) 依序輸入每個雲端硬碟可容納的檔案總容量 (MB)，個數由 (2) 決定。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總共依序動用了幾個雲端硬碟。如果待備份檔案總容量超過所有雲端硬碟加起來的總容量，則輸出「待備份檔案總容量超過雲端硬碟總空間，無法完整備份，請重新輸入。」
`)}
${sample(1,
`50<br/>
2<br/>
100 50`,
`1`,
`第一個硬碟容量 100MB 已足夠存入這 50MB 的資料，總共使用了 1 個硬碟。`)}
${sample(2,
`800<br/>
3<br/>
500 200 300`,
`3`,
`第一個硬碟存入 500MB，剩 300MB；第二個硬碟存入 200MB，剩 100MB；第三個硬碟存入最後 100MB。總共動用了 3 個硬碟。`,
`{"data": ["50;2;100;50;1", "800;3;500;200;300;3"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國小組</td>
<td ${LIST_TD(false)}>雲端資料備份硬碟統計</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `綠色節能競賽：電價分段計費與成本分析`, `114新竹縣國小組`)}
${desc(`
為了鼓勵竹北社區居民節約用電，某電力公司發起了一項綠色節能競賽。參賽者需要計算自己家的用電成本，並找出當月用電總價「最低」及「最高」的那戶 (戶序號) 並計算出電費。電力公司採用以下四段式累進費率標準計算總電費 (電費計算後總額四捨五入為整數元再比較大小)：<br/>
1. 120 度 (含) 以下：每度電費 1.63 元。<br/>
2. 121 ~ 330 度：超出部分的電費率為每度 2.38 元。<br/>
3. 331 ~ 500 度：超出部分的電費率為每度 3.52 元。<br/>
4. 501 度以上：超出部分的電費率為每度 4.80 元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為家庭戶數 N，接下來 N 個輸入依序為每戶的用電度數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出電費最低的戶序號、最低電費、電費最高的戶序號、最高電費。
`)}
${sample(1,
`3<br/>
555<br/>
339<br/>
80`,
`3 130 1 1558`,
`家庭 1 (555 度)：120×1.63 + 210×2.38 + 170×3.52 + 55×4.80 = 1558 元。<br/>
家庭 2 (339 度)：727 元。家庭 3 (80 度)：80×1.63 = 130 元。<br/>
電費最低：家庭 3 的 130 元；電費最高：家庭 1 的 1558 元。`)}
${sample(2,
`4<br/>
222<br/>
911<br/>
349<br/>
119`,
`4 194 2 3267`,
`家庭 1 (222 度)：438 元；家庭 2 (911 度)：3267 元；家庭 3 (349 度)：762 元；家庭 4 (119 度)：194 元。<br/>
電費最低：家庭 4 的 194 元；電費最高：家庭 2 的 3267 元。`,
`{"data": ["3;555;339;80;3;130;1;1558", "4;222;911;349;119;4;194;2;3267"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國小組</td>
<td ${LIST_TD(false)}>綠色節能競賽：電價分段計費與成本分析</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
