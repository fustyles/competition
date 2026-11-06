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
${qHeader("1", `零用錢是否足夠`, `114花蓮縣國小組`)}
${desc(`
你有一個錢包，裡面裝著固定的零用錢。這幾天你想買一些東西，請你幫忙算算看，你的錢夠不夠買這些東西？<br/>
系統會提供：一個整數，代表你的零用錢總額；一份固定包含 4 筆資料的花費清單，依序代表第 1 天到第 4 天的花費金額。<br/>
請從第 1 天開始，依序扣除每日花費金額，並依下列規則輸出結果：<br/>
若在某一天扣除花費後，剩餘金額小於 0，表示零用錢已不足，請立即輸出「第X天不夠用」(X 為發生不足的天數，例如：第4天不夠用)。<br/>
若 4 天的花費皆能成功扣除完成，請輸出「錢剛好或有剩」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入零用錢總額；第二行輸入 4 個整數，依序為第 1 天到第 4 天的花費。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出「第X天不夠用」或「錢剛好或有剩」。
`)}
${sample(1,
`100<br/>
20 30 40 20`,
`第4天不夠用`,
`第一天有 100 元，花了 20 元剩 80 元。<br/>
第二天花了 30 元剩 50 元。<br/>
第三天花了 40 元剩 10 元，到了第四天不夠用了。`)}
${sample(2,
`100<br/>
10 20 30 40`,
`錢剛好或有剩`,
`4 天共花 100 元，剛好用完。`,
`{"data": ["100;20;30;40;20;第4天不夠用", "100;10;20;30;40;錢剛好或有剩"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國小組</td>
<td ${LIST_TD(false)}>零用錢是否足夠</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `機器人戰鬥力比對`, `114花蓮縣國小組`)}
${desc(`
一年一度的機器人武鬥大會開始了！場上有 N 隻機器人參賽，每隻機器人都有一個「戰鬥力數值」。大會規定採取「積分循環賽」制：每一隻機器人都要跟場上「所有其他機器人」進行一對一的較量。如果你的戰鬥力比對手高，你就可以獲得 1 分積分；如果比對手低或平手，則得 0 分。<br/>
計算規則：<br/>
對於清單中的每一個機器人，都要去跟清單中其他所有的機器人比對數值。<br/>
若 (自己數值) > (對手數值)，則積分 + 1。<br/>
若 (自己數值) ≤ (對手數值)，則積分不變。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個數字 N，代表機器人的數量；第二行依序輸入 N 個整數，代表每一隻機器人的戰鬥力。<br/>
<span ${LBL_OUT}>輸出說明</span>依照機器人的輸入順序，依序輸出這 N 隻機器人的總積分。
`)}
${sample(1,
`3<br/>
10 50 30`,
`0 2 1`,
`第 1 隻 (10)：比輸 50、比輸 30 → 0 分<br/>
第 2 隻 (50)：贏過 10、贏過 30 → 2 分<br/>
第 3 隻 (30)：贏過 10、比輸 50 → 1 分`)}
${sample(2,
`3<br/>
10 20 30`,
`0 1 2`,
`第 1 隻 (10)：比輸 20、比輸 30 → 0 分<br/>
第 2 隻 (20)：贏過 10、比輸 30 → 1 分<br/>
第 3 隻 (30)：贏過 10、贏過 20 → 2 分`,
`{"data": ["3;10;50;30;0;2;1", "3;10;20;30;0;1;2"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國小組</td>
<td ${LIST_TD(false)}>機器人戰鬥力比對</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `字串內的秘密數字`, `114花蓮縣國小組`)}
${desc(`
「緊急任務！我們攔截到一串加密訊息！」壞人在傳遞的文字訊息中藏了許多數字，情報總部發現，只要將訊息中「所有的數字加總起來」，就能得到解鎖金庫的密碼。例如在 Key5Word2 中，藏著 5 和 2，密碼就是 7。請你寫一個程式，幫忙計算出這個神祕的總和數字！<br/>
規則：<br/>
1. 請檢查字串中的每一個字元。<br/>
2. 如果該字元是數字 (0 ~ 9)，請將它加入總和。<br/>
3. 如果該字元是英文或符號，請忽略它。<br/>
4. 注意：請將每個數字視為「個位數」來相加 (例如 12 代表 1 加 2，而不是十二)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個包含英文與數字的字串。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所有數字的總和。
`)}
${sample(1,
`A1B2C3`,
`6`,
`找到 1、2、3，總和 6。`)}
${sample(2,
`Key5Word2`,
`7`,
`找到 5、2，總和 7。`,
`{"data": ["A1B2C3;6", "Key5Word2;7"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國小組</td>
<td ${LIST_TD(false)}>字串內的秘密數字</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `最佳派對地點`, `114花蓮縣國小組`)}
${desc(`
有 N 個好朋友住在同一條筆直的大馬路上，每個人的家都有一個座標數字。他們決定舉辦一場派對，但是為了公平，大家約定：<br/>
1. 必須選在其中一個人的家裡舉辦。<br/>
2. 所有人從自己家走到派對地點的「距離總和」必須是最小的。<br/>
請你寫一個程式，找出最佳的舉辦地點，並算出這個最小的總距離是多少。若有多個地點距離總和一樣小，輸出座標較小的那一個。<br/>
提示：距離不會是負的。如果你在 2 號，要去 10 號，距離是 8 步；如果你在 10 號，要去 2 號，距離也是 8 步。可以使用「絕對值」積木，例如 (2 - 10) 的絕對值會變成 8。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行輸入一個整數 N (朋友的數量)；第二行依序輸入 N 個整數座標。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出最佳地點的座標與最小的距離總和。
`)}
${sample(1,
`3<br/>
2 10 5`,
`5 8`,
`若辦在 2：距離和為 11；若辦在 10：距離和為 13；若辦在 5：距離和為 8 (最小)。`)}
${sample(2,
`3<br/>
1 9 3`,
`3 8`,
`若辦在 1：距離和為 10；若辦在 9：距離和為 14；若辦在 3：距離和為 8 (最小)。`,
`{"data": ["3;2;10;5;5;8", "3;1;9;3;3;8"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114花蓮縣國小組</td>
<td ${LIST_TD(false)}>最佳派對地點</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
