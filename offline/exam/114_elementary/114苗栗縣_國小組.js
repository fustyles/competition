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
${qHeader("1", `苗栗項鍊`, `114苗栗縣國小組`)}
${desc(`
苗栗縣政府決定發放由英文字母 M 與 L 珠子串連的項鍊給市民作紀念。由於每個人需要的尺寸不同，尺寸 1 的項鍊表示英文字母 M 與 L 珠子各一顆，形成字串 ML；尺寸 2 的項鍊表示英文字母 M 與 L 珠子各二顆，也就會形成字串 MLML。尺寸更大的項鍊，就會形成重複該次數的字串 ML。請根據項鍊的尺寸，幫忙印出項鍊的珠子形成的字串。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表項鍊的尺寸 (1 ~ 100)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出項鍊的珠子形成的字串，中間不可以有空格或任何其他符號。
`)}
${sample(1,
`1`,
`ML`,
`尺寸 1，ML 重複 1 次。`)}
${sample(2,
`2`,
`MLML`,
`尺寸 2，ML 重複 2 次。`)}
${sample(3,
`5`,
`MLMLMLMLML`,
`尺寸 5，ML 重複 5 次。`,
`{"data": ["1;ML", "2;MLML", "5;MLMLMLMLML"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國小組</td>
<td ${LIST_TD(false)}>苗栗項鍊</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `點名報數`, `114苗栗縣國小組`)}
${desc(`
期待已久的寒假終於快要開始了！但是今天班上有一個同學沒有來上學考試，也沒有請假。老師已經分不清楚是誰沒來了，於是決定請大家點名報數。<br/>
這個班級的座號從 1 開始，依照 1, 2, 3, … 順序編下去，中間不會有跳號，直到最後一號，也就是班級的總人數。大家會依照自己的座號，依照從小到大的順序報數。舉例來說，如果總共有 5 個學生，點名報數時，報的座號是 1, 2, 4, 5，那麼老師就知道座號 3 的同學沒有來。請幫老師找出是誰沒有來上學考試。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為班級的總人數 (2 ~ 20 人)；接著依從小到大的順序輸入每次報數的座號，次數比班級的總人數少一次 (保證座號存在、遞增且不重複)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出沒有來上學考試的座號。
`)}
${sample(1,
`4<br/>
1<br/>
2<br/>
4`,
`3`,
`全班 4 人，報數為 1、2、4，沒有來的是座號 3。`)}
${sample(2,
`5<br/>
1<br/>
2<br/>
3<br/>
4`,
`5`,
`全班 5 人，報數為 1、2、3、4，沒有來的是座號 5。`,
`{"data": ["4;1;2;4;3", "5;1;2;3;4;5"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國小組</td>
<td ${LIST_TD(false)}>點名報數</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `最大人數`, `114苗栗縣國小組`)}
${desc(`
在一個偌大的禮堂中，人潮進進出出參觀展覽。為了安全起見，老師指派一個學生守著出入口，每當有人進入或離開，就記錄下來，這樣就可以從記錄中，得到在禮堂人數最多時，禮堂中總共有多少人。<br/>
禮堂一開始沒有人，每當有人進入時，這位學生就會在紙上多寫下英文字母 A；每當有人離開時，這位學生就會在紙上多寫下英文字母 B。紙上的字母一定會依照順序寫下，不會被擦除。<br/>
舉例來說，如果現在紙上寫著 AAABABBB，那麼老師就可以知道在最多人時總共有 3 個人；如果紙上寫著 ABAB，那麼在最多人時總共有 1 個人。記錄一定正確，且最終進入禮堂的所有人都會離開。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個字串，代表紙上的紀錄 (長度 1 ~ 10，只會有英文字母 A 與 B)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出禮堂中最多時有多少人。
`)}
${sample(1,
`AAABABBB`,
`3`,
`禮堂人數最多時總共有 3 人。`)}
${sample(2,
`ABAB`,
`1`,
`禮堂人數最多時總共有 1 人。`,
`{"data": ["AAABABBB;3", "ABAB;1"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國小組</td>
<td ${LIST_TD(false)}>最大人數</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `跳健康操`, `114苗栗縣國小組`)}
${desc(`
班上有男生與女生，現在要組隊跳健康操，每一組兩個人，一男一女，且這兩個人的身高必須相同。已知男生與女生的身高都已經各自從小到大排好，請根據每一位男生與女生的身高，幫忙求出最多可以組成多少組。每個人最多同時只能在一組中，但也可能沒有被分組。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
先輸入男生的人數 (1 ~ 100 人)，接著依序輸入每個男生的身高 (100 ~ 200，從小到大或相同)。<br/>
再輸入女生的人數 (1 ~ 100 人)，接著依序輸入每個女生的身高 (100 ~ 200，從小到大或相同)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最多可以組成多少組。
`)}
${sample(1,
`2<br/>
120<br/>
130<br/>
3<br/>
120<br/>
120<br/>
130`,
`2`,
`男生 2 人 (120、130)，女生 3 人 (120、120、130)，最多可以組成 2 組。`)}
${sample(2,
`1<br/>
200<br/>
1<br/>
200`,
`1`,
`男生與女生各 1 人，身高皆為 200，可以組成 1 組。`,
`{"data": ["2;120;130;3;120;120;130;2", "1;200;1;200;1"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國小組</td>
<td ${LIST_TD(false)}>跳健康操</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `進位運算`, `114苗栗縣國小組`)}
${desc(`
數學老師出了一大堆加法的練習題，並要求只需要回答進行加法運算中，發生進位的次數。<br/>
在十進位的直式加法中，依位數由低位到高位逐位相加。若某一位上「本位相加的和 (包含上一位帶來的進位)」大於或等於 10，則在本位寫下該和的個位數，並把 1 加到左邊相鄰的高一位，這個處理稱為「進位」。<br/>
「進位的次數」定義為：在完成整個直式加法的計算過程中，產生「向左邊高一位送出 1」之動作的總次數。若連續多位都各自產生進位，則每一位產生的進位都要分別計次。<br/>
舉例來說，當計算 999 加 1 時，總共發生了 3 次進位；計算 1998 加 37 時，總共也發生了 3 次進位；但是計算 2008 加 17 時，總共只發生了 1 次進位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入被加數 (1 ~ 1000000) 與加數 (1 ~ 1000000)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出總共發生幾次進位。
`)}
${sample(1,
`999<br/>
1`,
`3`,
`999 加 1 時，總共發生了 3 次進位。`)}
${sample(2,
`2008<br/>
17`,
`1`,
`2008 加 17 時，只有個位 8+7 = 15 產生 1 次進位。`)}
${sample(3,
`1998<br/>
37`,
`3`,
`1998 加 37 時，總共發生了 3 次進位。`,
`{"data": ["999;1;3", "2008;17;1", "1998;37;3"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國小組</td>
<td ${LIST_TD(false)}>進位運算</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
