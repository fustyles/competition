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
${qHeader("1", `遊樂場`, `114臺南市國中組`)}
${desc(`
三六九主題遊樂園，門票分成兒童票、成人票兩種。兒童票每張票價 400 元，成人票每張票價 500 元，另有親子套票組 (1 張兒童票及 1 張成人票) 每組 800 元。<br/>
請設計一個程式，依序輸入兒童人數、成人人數，算出最優惠的價格。
`)}
${sample(1,
`5<br/>
5`,
`4000`,
`輸入兒童人數：5<br/>
輸入成人人數：5<br/>
可購買 5 組親子套票組，總價 4000 元。`)}
${sample(2,
`6<br/>
3`,
`3600`,
`輸入兒童人數：6<br/>
輸入成人人數：3<br/>
可購買 3 組親子套票組、3 張兒童票，總價 3600 元。`)}
${sample(3,
`0<br/>
10`,
`5000`,
`輸入兒童人數：0<br/>
輸入成人人數：10<br/>
可購買 10 張成人票，總價 5000 元。`)}
${sample(4,
`8<br/>
4`,
`4800`,
`輸入兒童人數：8<br/>
輸入成人人數：4<br/>
可購買 4 組親子套票組、4 張兒童票，總價 4800 元。`)}
${sample(5,
`10<br/>
10`,
`8000`,
`輸入兒童人數：10<br/>
輸入成人人數：10<br/>
可購買 10 組親子套票組，總價 8000 元。`,
`{"data": ["5;5;4000", "6;3;3600", "0;10;5000", "8;4;4800", "10;10;8000"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114臺南市國中組</td>
<td ${LIST_TD(false)}>遊樂場</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `歌唱比賽`, `114臺南市國中組`)}
${desc(`
金嗓歌唱比賽，邀請 5 位評審來評分，最低分為 0 分，最高分為 10 分。<br/>
成績計算方式：從排序後的分數中，去除一個最高成績和一個最低成績，再計算剩餘分數的平均值。<br/>
請設計一個成績計算程式，依序輸入 5 位評審的分數，計算出參賽者的成績。<br/>
(備註：不必擔心輸出的數值為小數第幾位或整數)
`)}
${sample(1,
`10<br/>
8<br/>
9<br/>
9<br/>
9`,
`9`,
`5 位評審分數依序為 10、8、9、9、9。<br/>
去除一個最高成績 10 與一個最低成績 8，<br/>
剩餘分數為 9、9、9，平均為 9。`)}
${sample(2,
`6<br/>
6<br/>
9<br/>
10<br/>
9`,
`8`,
`5 位評審分數依序為 6、6、9、10、9。<br/>
去除一個最高成績 10 與一個最低成績 6，<br/>
剩餘分數為 6、9、9，平均為 8。`)}
${sample(3,
`7<br/>
7<br/>
7<br/>
7<br/>
7`,
`7`,
`5 位評審分數皆為 7。<br/>
去除一個最高成績 7 與一個最低成績 7，<br/>
剩餘分數為 7、7、7，平均為 7。`)}
${sample(4,
`5<br/>
7<br/>
8<br/>
9<br/>
6`,
`7`,
`5 位評審分數依序為 5、7、8、9、6。<br/>
去除一個最高成績 9 與一個最低成績 5，<br/>
剩餘分數為 6、7、8，平均為 7。`)}
${sample(5,
`8<br/>
10<br/>
8<br/>
9<br/>
10`,
`9`,
`5 位評審分數依序為 8、10、8、9、10。<br/>
去除一個最高成績 10 與一個最低成績 8，<br/>
剩餘分數為 8、9、10，平均為 9。`)}
${sample(6,
`10<br/>
10<br/>
10<br/>
10<br/>
10`,
`10`,
`5 位評審分數皆為 10。<br/>
去除一個最高成績 10 與一個最低成績 10，<br/>
剩餘分數為 10、10、10，平均為 10。`,
`{"data": ["10;8;9;9;9;9", "6;6;9;10;9;8", "7;7;7;7;7;7", "5;7;8;9;6;7", "8;10;8;9;10;9", "10;10;10;10;10;10"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114臺南市國中組</td>
<td ${LIST_TD(false)}>歌唱比賽</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `質數和`, `114臺南市國中組`)}
${desc(`
質數：一個大於 1 的整數除了 1 和本身以外，沒有其他的因數。<br/>
利用埃拉托賽尼的方法，可找出 100 以內的質數：<br/>
1. 刪除 1。1 不是質數也不是合數。<br/>
2. 篩選 2 的倍數：2 是第一個質數。刪除所有大於 2 的 2 的倍數，留下 2。<br/>
3. 篩選 3 的倍數：3 是質數。刪除所有大於 3 的 3 的倍數，留下 3。<br/>
4. 篩選 5 的倍數：5 是質數。刪除所有大於 5 的 5 的倍數，留下 5。<br/>
5. 篩選 7 的倍數：7 是質數。刪除所有大於 7 的 7 的倍數，留下 7。<br/>
6. 最後未被刪除的整數，就是質數。<br/>
請依序輸入兩個正整數 (100 以內，由小到大) 作為起始數與結束數，找出兩數之間 (含兩數) 的質數，計算這些質數的和；若沒有質數則輸出 0。
`)}
${sample(1,
`21<br/>
30`,
`52`,
`起始數 21，結束數 30。<br/>
21 至 30 間的質數有 23、29，質數和為 52。`)}
${sample(2,
`13<br/>
19`,
`49`,
`起始數 13，結束數 19。<br/>
13 至 19 間的質數有 13、17、19，質數和為 49。`)}
${sample(3,
`54<br/>
58`,
`0`,
`起始數 54，結束數 58。<br/>
54 至 58 間沒有質數，以 0 表示。`)}
${sample(4,
`1<br/>
20`,
`77`,
`起始數 1，結束數 20。<br/>
質數有 2、3、5、7、11、13、17、19，質數和為 77。`)}
${sample(5,
`91<br/>
95`,
`0`,
`起始數 91，結束數 95。<br/>
91 至 95 間沒有質數，以 0 表示。`)}
${sample(6,
`61<br/>
90`,
`523`,
`起始數 61，結束數 90。<br/>
質數有 61、67、71、73、79、83、89，質數和為 523。`,
`{"data": ["21;30;52", "13;19;49", "54;58;0", "1;20;77", "91;95;0", "61;90;523"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114臺南市國中組</td>
<td ${LIST_TD(false)}>質數和</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
