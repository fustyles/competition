// =====================================================
//  樣式設定（要換配色只要改這裡）
//  注意：題目內容放在 data-q='...' 裡，樣式中不可出現單引號
// =====================================================
const FONT = 'font-family: Microsoft JhengHei, PingFang TC, Noto Sans TC, sans-serif;';
const MONO = 'font-family: Consolas, Menlo, Courier New, monospace;';

// 題首：題號徽章 + 題目名稱
const qHeader = (no, name, tag) => `
<div style="${FONT} background: linear-gradient(135deg, #4a5d85, #66709a); color: #fff; padding: 16px 20px; border-radius: 12px; margin-bottom: 14px; box-shadow: 0 3px 10px rgba(60,70,100,0.18);">
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
// data 只放在最後一個範例（隱藏列）：正式評分用測資與配分，格式 {"data": [["輸入;…;輸出", 配分1~3], ...]}
// 評分測資不可與範例相同
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
// 尺寸由 CSS 的 .test-button 控制（createFunction.css）；這裡設成行內排列，並防止系統 CSS 改變按鈕位置
const BTN_STYLE = 'display:inline-block !important; float:none !important; position:static !important; left:auto !important; right:auto !important; transform:none !important; box-sizing:border-box !important;';
// 每格都明確設定四邊框線，避免系統原本的 CSS（黑色直線）混進來
const CELL = 'padding: 10px 16px; text-align: center; vertical-align: middle; border: 0; color: #374151; background: #fff;';
// 欄位樣式：btn = 按鈕欄（匯入題目按鈕）（固定寬度、不換行），first = 最左欄（不加左框線）
const LIST_TH = (btn, first) => `style="${CELL} background: #eef1f7; color: #3a4a6b; font-weight: bold; ${btn ? 'width: 160px !important; min-width: 160px !important; white-space: nowrap; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : ''} ${first ? '' : 'border-left: 1px solid #dde2ec;'}"`;
const LIST_TD = (btn, first) => `style="${CELL} border-top: 1px solid #e5e8ef; ${btn ? 'width: 160px !important; min-width: 160px !important; white-space: nowrap; padding-left: 12px !important; padding-right: 12px !important; box-sizing: border-box !important;' : ''} ${first ? '' : 'border-left: 1px solid #e5e8ef;'}"`;
const ONCLICK = `window.selectExamQuestion(this);`;

// =====================================================
//  匯入題目按鈕
//  按鈕上的 data-no（題號）、data-name（題目名稱）會在點選時由
//  index.js 的 selectExamQuestion(this) 寫入全域變數 examQuestionNo / examQuestionName
// =====================================================
const ICON_IMPORT  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAvCAYAAACc5fiSAAACuUlEQVR42u3Zb0gTYRwH8O/dhGyjV1lbTjM7XTQ5rZDQykGpkRFFwSgGaUQYkYhhQpgvgnyZERVGvYhcmIFaiIQpDvRQZw3BLf/UZOZaWUJv1LWsF7vetDDZblue3tO436txz3PHhx+/53fP7gHkkCO2gwo1kFls2A5AI6Htp8PM9UcMzyw25AK4BWA3AYmdB3DHYeauLh1QLEFnJyZoXs37vFpCKmINgDx1Vop6xu5+sXiAXjLRNP31C3H1rIpXXsgsNuQLwTNIXIjfFnwAsHfxtTihGxpq7mJHOisJ9n5bA+qfPQw5Tv+v7VCGr3bEifUgbtgK16f3gnPysw3YrE4iCz7udgouJgDYqWNFg8s1LsNleCy1Qz/P4+VgN2of3QzsIyKKktqyP79ZRo/r564gNTFl9TJOUxQO5RSguuQSVPHKqO9nGT2una36Z/SySoWmKBzOLYwaH0CnJW2VrsZpikJRTj4umy5GhGcZPapPVywbLcriVNAKHMsrCosPoPWp28jpKuHwYqNFbYcBfLmx9C+8LplBlalMVLSom6wA3njgKADgdvMDaDdsQs2ZSmSlZZC7rQ2G1yUzK4JeEXgAf6rguPzKjzrjN5rqsW6tKuS4Ml6JipPnkbwxuu9H3bZetPa0C84J931HEP7GNRYWYSo8ERXcz/OY+DiJgRGbtKUyOvUOfp6PeL7X58WEZ1L6Gm/v64T784eIs83ZrbAMcdLDnR4XHnc2Y9Y7F3bu2yknnnY/J6cdtva0w7fgQ7mxFIkJmqCZfj02hLqmejg9LrL6eMegBQMjNhzZcxD7d+0Do92C7z8WMD7lRFtfB7hhK7kvoFnvHBq7WtDY1SL/54x5+CiJyN/b5H4h+JNgXQHSn0jcc5g5S8jDqxm7e1qZvr4LAAtAS8ipW53DzFUiVs455Vjt+AXUONVRZTT++QAAAABJRU5ErkJggg==';
const IMPORT_BTN_STYLE = 'display:inline-flex !important; align-items:center; justify-content:center; gap:8px; float:none !important; position:static !important; transform:none !important; box-sizing:border-box !important; width:auto !important; min-width:120px; height:52px !important; padding:6px 16px !important; margin:2px !important; font-size:17px; font-weight:bold; cursor:pointer; vertical-align:middle;';
const IMPORT_IMG_STYLE = 'width:34px; height:34px; object-fit:contain; display:block; pointer-events:none;';
const answerMsg = (key, def) => (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) || def;

// =====================================================
//  題目列表
// =====================================================
let contest = `
<table id="importQuestionTable" style="${FONT} border-collapse: separate; border-spacing: 0; table-layout: auto !important; border: 1px solid #d6dbe6; border-radius: 10px; overflow: hidden; font-size: 16px; background: #fff;">
<tbody>
<tr>
<td ${LIST_TH(false, true)}>序號</td>
<td ${LIST_TH(false, false)}>名稱</td>
<td ${LIST_TH(false, false)}>分類</td>
<td ${LIST_TH(true, false)}></td>
</tr>
`;



// ---------------- 第 1 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>1</td>
<td ${LIST_TD(false, false)}>投籃大挑戰</td>
<td ${LIST_TD(false, false)}>115學年度科技教育競賽範例</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button import-question-button'
 style='${IMPORT_BTN_STYLE}'
 data-no='1'
 data-name='投籃大挑戰'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("1", `投籃大挑戰`, `115學年度科技教育競賽範例`)}
${desc(`
體育課玩投籃遊戲，場上有遠、中、近三個籃框。投進遠籃得 10 分，投進中籃得 5 分，投進近籃得 1 分。<br/>
請設計程式，輸入投進三個籃框的球數，輸出總得分。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 3 個值：投進遠籃、中籃、近籃的球數 (皆為 0 ~ 50 的整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 1 個值：總得分。
`)}
${sample(1,
`3<br/>
2<br/>
4`,
`44`,
`第 1 個值：投進遠籃 3 球；第 2 個值：投進中籃 2 球；第 3 個值：投進近籃 4 球。<br/>
10 × 3 + 5 × 2 + 1 × 4 = 30 + 10 + 4 = 44，輸出 44。`)}
${sample(2,
`0<br/>
0<br/>
0`,
`0`,
`三個籃框都沒有投進。<br/>
一球都沒進，總得分為 0。`)}
${sample(3,
`10<br/>
1<br/>
9`,
`114`,
`第 1 個值：投進遠籃 10 球；第 2 個值：投進中籃 1 球；第 3 個值：投進近籃 9 球。<br/>
10 × 10 + 5 × 1 + 1 × 9 = 100 + 5 + 9 = 114，輸出 114。`,
`{"data": [["50;50;50;800", 3], ["0;0;1;1", 2], ["0;7;0;35", 2], ["1;0;0;10", 1], ["12;25;33;278", 1]]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${IMPORT_IMG_STYLE}"><span>${answerMsg('IMPORT_QUESTION_BUTTON', '匯入題目')}</span>
</button></span>
</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>2</td>
<td ${LIST_TD(false, false)}>綠豆發芽長高</td>
<td ${LIST_TD(false, false)}>115學年度科技教育競賽範例</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button import-question-button'
 style='${IMPORT_BTN_STYLE}'
 data-no='2'
 data-name='綠豆發芽長高'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("2", `綠豆發芽長高`, `115學年度科技教育競賽範例`)}
${desc(`
小明在杯子裡種綠豆。第 1 天先量好綠豆芽的高度，之後每天都會長高一樣多的公分數。<br/>
請設計程式，算出綠豆芽在第幾天，高度第一次達到目標高度 (和目標一樣高或比目標高，都算達到)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 3 個值：第 1 天的高度 (1 到 20 公分)、每天長高幾公分 (1 到 10 公分)、目標高度 (1 到 100 公分)，都是整數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 1 個值：第幾天達到目標高度。
`)}
${sample(1,
`2<br/>
3<br/>
10`,
`4`,
`第 1 個值：第 1 天高 2 公分；第 2 個值：每天長高 3 公分；第 3 個值：目標高度 10 公分。<br/>
第 1 天 2 公分、第 2 天 5 公分、第 3 天 8 公分、第 4 天 11 公分。<br/>
第 4 天第一次達到 10 公分以上，輸出 4。`)}
${sample(2,
`5<br/>
1<br/>
5`,
`1`,
`第 1 個值：第 1 天高 5 公分；第 2 個值：每天長高 1 公分；第 3 個值：目標高度 5 公分。<br/>
第 1 天就已經 5 公分，達到目標，輸出 1。`)}
${sample(3,
`1<br/>
10<br/>
100`,
`11`,
`第 1 個值：第 1 天高 1 公分；第 2 個值：每天長高 10 公分；第 3 個值：目標高度 100 公分。<br/>
第 10 天為 1 + 10 × 9 = 91 公分，還不到 100 公分；第 11 天為 101 公分。<br/>
第 11 天第一次達到目標，輸出 11。`,
`{"data": [["20;10;1;1", 3], ["1;1;100;100", 2], ["3;4;15;4", 2], ["1;1;1;1", 1], ["7;10;98;11", 1]]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${IMPORT_IMG_STYLE}"><span>${answerMsg('IMPORT_QUESTION_BUTTON', '匯入題目')}</span>
</button></span>
</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>3</td>
<td ${LIST_TD(false, false)}>訂飲料優惠</td>
<td ${LIST_TD(false, false)}>115學年度科技教育競賽範例</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button import-question-button'
 style='${IMPORT_BTN_STYLE}'
 data-no='3'
 data-name='訂飲料優惠'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("3", `訂飲料優惠`, `115學年度科技教育競賽範例`)}
${desc(`
某間茶飲店新開幕推出優惠活動。紅茶一杯售價 30 元，每購買滿五杯就免費贈送一杯。若是外送服務需要額外收服務費 50 元，不含贈送杯數的總杯數超過 20 杯則不用收服務費。請設計程式，輸入訂購外送的紅茶杯數，最後輸出總共要付多少錢？<br/>
<b>注意：</b>輸入的紅茶杯數是「拿到的總杯數」，已包含贈送的杯數，也就是每 6 杯紅茶中有 1 杯免費 (例如 6 杯只需付 5 杯的錢)。服務費以付費杯數判斷，付費杯數剛好 20 杯時仍要收服務費。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入 1 個值：紅茶杯數 (1 ~ 100 的整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 1 個值：總共要付的金額。
`)}
${sample(1,
`6`,
`200`,
`第 1 個值：紅茶 6 杯。<br/>
紅茶 6 杯中有 1 杯為贈送，付費 5 杯，5 × 30 = 150 元。<br/>
付費 5 杯，未超過 20 杯，加收服務費 50 元。<br/>
總共 150 + 50 = 200 元。`)}
${sample(2,
`15`,
`440`,
`第 1 個值：紅茶 15 杯。<br/>
紅茶 15 杯中有 2 杯為贈送，付費 13 杯，13 × 30 = 390 元。<br/>
付費 13 杯，未超過 20 杯，加收服務費 50 元。<br/>
總共 390 + 50 = 440 元。`)}
${sample(3,
`24`,
`650`,
`第 1 個值：紅茶 24 杯。<br/>
紅茶 24 杯中有 4 杯為贈送，付費 20 杯，20 × 30 = 600 元。<br/>
付費 20 杯，剛好 20 杯，沒有超過 20 杯，仍要收服務費 50 元。<br/>
總共 600 + 50 = 650 元。`)}
${sample(4,
`25`,
`630`,
`第 1 個值：紅茶 25 杯。<br/>
紅茶 25 杯中有 4 杯為贈送，付費 21 杯，21 × 30 = 630 元。<br/>
付費 21 杯，超過 20 杯，免收服務費。<br/>
總共 630 元。`,
`{"data": [["1;80", 3], ["5;200", 2], ["23;650", 2], ["26;660", 1], ["100;2520", 1]]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${IMPORT_IMG_STYLE}"><span>${answerMsg('IMPORT_QUESTION_BUTTON', '匯入題目')}</span>
</button></span>
</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>4</td>
<td ${LIST_TD(false, false)}>看得見舞台嗎</td>
<td ${LIST_TD(false, false)}>115學年度科技教育競賽範例</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button import-question-button'
 style='${IMPORT_BTN_STYLE}'
 data-no='4'
 data-name='看得見舞台嗎'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("4", `看得見舞台嗎`, `115學年度科技教育競賽範例`)}
${desc(`
全班同學從前到後排成一列，要觀看前方舞台上的表演。一位同學只有在比他前面「所有」同學都高的時候，才看得見舞台；只要前面有任何一位同學和他一樣高或比他高，他就會被擋住。排在第一位的同學前面沒有人，一定看得見。<br/>
請設計程式，算出全班有幾位同學看得見舞台。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>先輸入人數 (最少 1 人，最多 30 人)，再從前到後依序輸入每位同學的身高 (100 ~ 180 的整數，單位為公分)。例如 5 人，就要輸入 1 個人數加上 5 個身高，一共 6 個值。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 1 個值：看得見舞台的人數。
`)}
${sample(1,
`5<br/>
120 130 125<br/>
140 140`,
`3`,
`第 1 個值：共 5 人；第 2 ~ 6 個值：從前到後的身高依序為 120、130、125、140、140。<br/>
120 排第一，看得見；130 比前面都高，看得見；125 被 130 擋住；140 比前面都高，看得見；最後的 140 和前面的 140 一樣高，被擋住。<br/>
共 3 人看得見，輸出 3。`)}
${sample(2,
`4<br/>
150 140 130 120`,
`1`,
`第 1 個值：共 4 人；第 2 ~ 5 個值：從前到後的身高依序為 150、140、130、120。<br/>
第一位 150 公分最高，後面的人都被擋住，只有 1 人看得見，輸出 1。`)}
${sample(3,
`1<br/>
135`,
`1`,
`第 1 個值：共 1 人；第 2 個值：身高 135 公分。<br/>
只有一位同學，前面沒有人，看得見，輸出 1。`,
`{"data": [["1;100;1", 3], ["5;100;100;100;100;100;1", 2], ["6;101;102;103;104;105;106;6", 2], ["7;160;150;170;170;180;120;179;3", 1], ["30;100;101;102;103;104;105;106;107;108;109;110;111;112;113;114;115;116;117;118;119;120;121;122;123;124;125;126;127;128;129;30", 1]]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${IMPORT_IMG_STYLE}"><span>${answerMsg('IMPORT_QUESTION_BUTTON', '匯入題目')}</span>
</button></span>
</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>5</td>
<td ${LIST_TD(false, false)}>餅乾裝盒</td>
<td ${LIST_TD(false, false)}>115學年度科技教育競賽範例</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button import-question-button'
 style='${IMPORT_BTN_STYLE}'
 data-no='5'
 data-name='餅乾裝盒'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("5", `餅乾裝盒`, `115學年度科技教育競賽範例`)}
${desc(`
烘焙社烤好了一批餅乾，要裝進盒子裡送給大家。盒子有三種：大盒裝 15 片、中盒裝 8 片、小盒裝 5 片，每一盒都必須裝滿。每種盒子都可以用好幾個，也可以不用。社長規定餅乾必須剛好裝完，不能有剩下的餅乾。只要有一種盒子用的數量不一樣，就算是不同的裝法。<br/>
請設計程式，算出總共有幾種不同的裝法可以剛好把餅乾裝完，以及在這些裝法中，最少只需要用幾個盒子。如果沒有任何裝法可以剛好裝完，兩個值都輸出 0。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入 1 個值：餅乾片數 (1 到 100 的整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 2 個值：裝法的數量、最少的盒子數。
`)}
${sample(1,
`23`,
`2<br/>
2`,
`第 1 個值：共 23 片餅乾。<br/>
裝法一：大盒 1 個 + 中盒 1 個 = 15 + 8 = 23 片，共 2 盒。<br/>
裝法二：中盒 1 個 + 小盒 3 個 = 8 + 15 = 23 片，共 4 盒。<br/>
共 2 種裝法，最少 2 盒。`)}
${sample(2,
`30`,
`3<br/>
2`,
`第 1 個值：共 30 片餅乾。<br/>
裝法一：大盒 2 個，共 2 盒。<br/>
裝法二：大盒 1 個 + 小盒 3 個，共 4 盒。<br/>
裝法三：小盒 6 個，共 6 盒。<br/>
共 3 種裝法，最少 2 盒。`)}
${sample(3,
`7`,
`0<br/>
0`,
`第 1 個值：共 7 片餅乾。<br/>
7 片比 15、8 都少，也不是 5 的倍數，沒有任何裝法能剛好裝完，兩個值都輸出 0。`,
`{"data": [["1;0;0", 3], ["15;2;1", 2], ["100;14;8", 2], ["40;4;4", 1], ["13;1;2", 1]]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${IMPORT_IMG_STYLE}"><span>${answerMsg('IMPORT_QUESTION_BUTTON', '匯入題目')}</span>
</button></span>
</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(false, true)}>6</td>
<td ${LIST_TD(false, false)}>誰來當鬼</td>
<td ${LIST_TD(false, false)}>115學年度科技教育競賽範例</td>
<td ${LIST_TD(true, false)}>
<span style="white-space:nowrap;"><button
 class='answer-button import-question-button'
 style='${IMPORT_BTN_STYLE}'
 data-no='6'
 data-name='誰來當鬼'
 title="${answerMsg('IMPORTQUESTION_HEADER', '匯入題目與測資數據')}"
 data-q='
${qHeader("6", `誰來當鬼`, `115學年度科技教育競賽範例`)}
${desc(`
在一次的團體遊戲中，老師要從班級學生中挑出兩位學生擔任遊戲中鬼的角色，於是請所有學生先排成一行隊伍，由左到右每人依序編號 1、2、3…。接著老師指定一個數字，開始由編號 1 的同學從左向右依序報數 1、2、3…，當報數到最右邊的同學後就從最左邊的同學接續報數，不斷地循環由左向右報數。若報數的數字等於老師說出的數字的同學則離開報數隊伍擔任鬼，剩餘學生不重新編號，再由最左方的同學從 1 開始重新報數依相同方式找出第二位擔任鬼的同學。<br/>
請設計程式，先輸入學生班級人數，再輸入老師指定的數字，輸出第二位擔任鬼的學生編號。但此遊戲最少需要 3 人才能進行，所以輸入班級人數低於 3 則輸出 0。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 2 個值：班級人數 (0 ~ 150 的整數)、老師指定的數字 (1 ~ 100000 的整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 1 個值：第二位擔任鬼的學生編號。
`)}
${sample(1,
`2<br/>
15`,
`0`,
`第 1 個值：班級人數 2 人；第 2 個值：老師指定的數字 15。<br/>
班級人數少於 3 人，遊戲無法進行，輸出 0。`)}
${sample(2,
`12<br/>
30`,
`9`,
`第 1 個值：班級人數 12 人；第 2 個值：老師指定的數字 30。<br/>
第一輪 12 人循環報數，30 = 12 × 2 + 6，報到 30 的是 6 號，6 號擔任第一位鬼。<br/>
剩下 11 人由最左方重新報數，30 = 11 × 2 + 8，報到 30 的是第 8 位同學；因 6 號已離開且不重新編號，第 8 位是 9 號。<br/>
因此輸出 9。`)}
${sample(3,
`10<br/>
10`,
`1`,
`第 1 個值：班級人數 10 人；第 2 個值：老師指定的數字 10。<br/>
第一輪報到 10 的是最右邊的 10 號，10 號擔任第一位鬼。<br/>
剩下 9 人由最左方重新報數，10 = 9 × 1 + 1，報到 10 的是第 1 位同學，也就是 1 號 (在第一位鬼左邊，編號不變)。<br/>
因此輸出 1。`)}
${sample(4,
`150<br/>
365`,
`68`,
`第 1 個值：班級人數 150 人；第 2 個值：老師指定的數字 365。<br/>
第一輪 365 = 150 × 2 + 65，65 號擔任第一位鬼。<br/>
剩下 149 人重新報數，365 = 149 × 2 + 67，報到的是第 67 位同學；因 65 號已離開，第 67 位是 68 號。<br/>
因此輸出 68。`,
`{"data": [["0;1;0", 3], ["3;1;2", 2], ["3;100000;3", 2], ["150;1;2", 1], ["7;7;1", 1]]}`)}
'
 onclick='${ONCLICK}'><img src="${ICON_IMPORT}" alt="Import" style="${IMPORT_IMG_STYLE}"><span>${answerMsg('IMPORT_QUESTION_BUTTON', '匯入題目')}</span>
</button></span>
</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
