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
<tr>
<td colspan="2" style="background: #fffbeb; border-top: 1px solid #c7d2fe; padding: 10px 14px; line-height: 1.85; color: #78350f;">
<b style="color: #b45309;">💡 說明</b><br>
${explain}
</td>
</tr>
${data ? `<tr>
<td colspan="2" style="display:none">
${data}
</td>
</tr>` : ''}
</table>`;

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
${qHeader(1, '飲食兌換券', '113全國示範賽')}
${desc(`
遊樂園推出購票入園抽飲食兌換券活動。兌換券上各有一組介於 100000 與 999999 的編號，依抽出兌換券的編號，可兌換優惠券如下：<br>
1. 若編號可以被 61、71、81 或 91 整除，可兌換價值 <b style="color:#dc2626;">$500</b> 的套餐優惠券，<br>
2. 否則若編號可以被 21、31 或 41 整除，可兌換價值 <b style="color:#ea580c;">$300</b> 的套餐優惠券，<br>
3. 否則若編號可以被 11 或 51 整除，可兌換價值 <b style="color:#16a34a;">$200</b> 的套餐兌換券，<br>
4. 否則若編號不被上述任一數字整除，即可在園內兌換任一飲品一份。<br>
給定當天所有抽出的兌換券編號，請計算總各給出多少張 $500、$300、$200 的套餐優惠券。
`)}
${sample(1,
`5<br>
226981<br>
266910<br>
533820<br>
355880<br>
117810`,
`1 4 0`,
`總共抽出 5 張兌換券，編號依序為：<br>
226981 可被 61 整除，兌換 $500 優惠券；<br>
266910 可被 21、31、41 整除，兌換 $300 優惠券；<br>
533820 可被 21、31、41 整除，兌換 $300 優惠券；<br>
355880 可被 31、41 整除，兌換 $300 優惠券；<br>
117810 可被 21 整除 (雖也可被 11, 51 整除)，兌換 $300 優惠券。<br>
因此總共抽出 1 張 $500 優惠券、4 張 $300 優惠券、0 張 $200 優惠券。`)}
${sample(2,
`1<br>
500000`,
`0 0 0`,
`總共抽出 1 張兌換券，編號依序為：<br>
500000 無法被可兌換優惠券之數字整除。<br>
因此總共抽出 0 張 $500 優惠券、0 張 $300 優惠券、0 張 $200 優惠券。`,
`{"data":["5;226981;266910;533820;355880;117810;1;4;0","1;500000;0;0;0"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>113全國示範賽</td>
<td ${LIST_TD(false)}>飲食兌換券</td>
</tr>
`;


// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader(2, '防災演習', '113全國示範賽')}
${desc(`
為了在自然災害發生時，可以將災民快速送往收容所，防災中心定期舉行防災演習，將災民以運輸車送往收容所。收容所有多個臨時屋 (<b>最多 12 間</b>)，每個臨時屋可容納人數不盡相同，當第一個臨時屋滿了以後，就開放第二個臨時屋，滿了之後再開放第三個臨時屋，依此類推。請幫防災中心統計防災演習期間<b style="color:#dc2626;">共開放了幾個臨時屋</b>。
`)}
${sample(1,
`9<br>
3<br>
10 5 15`,
`1`,
`此次演習運輸車總共運輸了 9 人。<br>
收容所共有 3 間臨時屋。<br>
臨時屋依序各可容納 10、5、15 人。<br>
第一間臨時屋即可容納這 9 人，因此只開放了 1 間臨時屋。`)}
${sample(2,
`50<br>
4<br>
30 20 15 55`,
`2`,
`此次演習運輸車總共運輸了 50 人。<br>
收容所共有 4 間臨時屋。<br>
臨時屋依序各可容納 30、20、15、55 人。<br>
第一間臨時屋收容了 30 人；第二間臨時屋收容了 20 人，因此總共開放了 2 間臨時屋。`)}
${sample(3,
`0<br>
2<br>
30 20`,
`0`,
`此次演習運輸車總共運輸了 0 人。<br>
收容所共有 2 間臨時屋。<br>
臨時屋依序各可容納 30、20 人。<br>
此次演習沒有任何人被運送，因此總共開放了 0 間臨時屋。`)}
${sample(4,
`37<br>
2<br>
10 20`,
`2`,
`此次演習運輸車總共運輸了 37 人。<br>
收容所共有 2 間臨時屋。<br>
臨時屋依序各可容納 10、20 人。<br>
此次演習所有的臨時屋都要開放，雖然仍容不下所有人，但總共開放了 2 間臨時屋。`,
`{"data":["9;3;10;5;15;1","50;4;30;20;15;55;2","0;2;30;20;0","37;2;10;20;2"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>113全國示範賽</td>
<td ${LIST_TD(false)}>防災演習</td>
</tr>
`;


// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader(3, '可口便當', '113全國示範賽')}
${desc(`
可口便當主廚每天早上會先檢視每筆訂單上的套餐 （<b>最多 9 種套餐</b>，套餐編號為 1, 2, 3, …, 9 )，再列出當天套餐應該烹煮的先後順序。請依據訂單資訊與主廚準備便當的順序，<b style="color:#dc2626;">列舉出所有套餐被處理的順序</b>。
`)}
${sample(1,
`5<br>
8 9 9 9 8<br>
2<br>
9 8`,
`9 9 9 8 8`,
`總共有 5 筆訂單，<br>
訂單上的套餐編號依序為 8 9 9 9 8。<br>
總共有 2 個不同套餐，<br>
主廚決定套餐的烹煮順序為 9 8。<br>
因此需先處理三個 9 號餐，再處理兩個 8 號餐。<br>
因此訂單上套餐處理順序為 9 9 9 8 8。`)}
${sample(2,
`7<br>
3 1 4 1 5 9 3<br>
5<br>
1 9 4 3 5`,
`1 1 9 4 3 3 5`,
`總共有 7 筆訂單，<br>
訂單上的套餐編號依序為 3 1 4 1 5 9 3。<br>
總共有 5 個不同套餐，<br>
主廚決定套餐的烹煮順序為 1 9 4 3 5。<br>
先處理兩個 1 號餐，再依序處理 9, 4 號餐，再處理兩個 3 號餐，最後才處理 5 號餐。<br>
因此訂單上套餐處理順序為 1 1 9 4 3 3 5。`,
`{"data":["5;8;9;9;9;8;2;9;8;9;9;9;8;8","7;3;1;4;1;5;9;3;5;1;9;4;3;5;1;1;9;4;3;3;5"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>113全國示範賽</td>
<td ${LIST_TD(false)}>可口便當</td>
</tr>
`;


// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader(4, '短片欣賞', '113全國示範賽')}
${desc(`
圖書館有一間媒體播放室，每週六會連續播放科學系列短片(<b>最多 20 個短片</b>)。短片代碼為大寫英文字母，例如 A, X, P 等，但同一系列短片會用相同的英文字母表示。娜娜有特別喜歡看的系列短片，但每天能夠進圖書館看短片的時間有限。<br><br>
舉例來說，圖書館安排連續播放以下 8 場次的短片，娜娜最喜歡 A 系列短片，且該天有時間可以連續看 5 場次。她若從第 1 場次開始看，只會看到 2 個 A 系列短片；但若是從第 4 場次開始看，就能夠看到 3 個 A 系列短片。<br>
<br>
<table style="border-collapse: collapse; margin: 4px 0 8px 0;">
<tr><td ${TH}>場次</td><td ${TH}>短片代碼</td></tr>
<tr><td ${TD}>1</td><td ${TD_HL}>A</td></tr>
<tr><td ${TD}>2</td><td ${TD}>B</td></tr>
<tr><td ${TD}>3</td><td ${TD}>C</td></tr>
<tr><td ${TD}>4</td><td ${TD_HL}>A</td></tr>
<tr><td ${TD}>5</td><td ${TD}>W</td></tr>
<tr><td ${TD}>6</td><td ${TD_HL}>A</td></tr>
<tr><td ${TD}>7</td><td ${TD}>Q</td></tr>
<tr><td ${TD}>8</td><td ${TD_HL}>A</td></tr>
</table>
請幫娜娜計算<b style="color:#dc2626;">最多可以看到幾次最喜歡的系列短片</b>。
`)}
${sample(1,
`8<br>A B C A W A Q A<br>5 A`,
`3`,
`圖書館安排連續播放 8 場次的短片，<br>依序播放系列短片 A B C A W A Q A。<br>娜娜有時間可以連續看 5 場次，且最喜歡的是 A 系列短片。<br>最佳情形是從第 4 場開始看 (A W A Q A)，共可以看到 3 場次的 A 系列短片，因此輸出 3。`)}
${sample(2,
`3<br>X G X<br>2 X`,
`1`,
`圖書館安排連續播放 3 場次的短片。<br>3 場次依序播放短片 X G X。<br>娜娜有時間可以連續看 2 場次，且最喜歡的是 X 系列短片。<br>最佳情形是從第 1 場或第 2 場開始看 (X G), (G X) 都可以看到 1 場，因此輸出 1。`,
`{"data":["8;A;B;C;A;W;A;Q;A;5;A;3","3;X;G;X;2;X;1"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>113全國示範賽</td>
<td ${LIST_TD(false)}>短片欣賞</td>
</tr>
`;


contest += `
</tbody>
</table>
`;
