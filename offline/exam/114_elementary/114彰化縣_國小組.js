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
${qHeader("1", `綠蔭道路`, `114彰化縣國小組`)}
${desc(`
政府正在推動某鄉村的「智慧綠蔭道路計畫」，希望在一條筆直道路的一側種植行道樹，讓行人走在路上能有遮蔭。從道路的起點先種第一棵樹，接著每隔固定間距種一棵樹，如果最後剩下的距離不足一個間距，仍然要再補種一棵樹。請寫一個程式，根據道路長度與種樹間距，計算需要準備的樹苗數量。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序分次輸入兩個數字，分別代表道路長度與種樹間距。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出所需要的樹苗數量。
`)}
${sample(1,
`10<br/>
5`,
`3`,
`起點先種 1 棵，經過 5 公尺種 1 棵，再經過 5 公尺再種 1 棵，共 3 棵。`)}
${sample(2,
`11<br/>
5`,
`4`,
`起點先種 1 棵，每 5 公尺種 1 棵共 2 棵，剩下 1 公尺仍需補種 1 棵，共 4 棵。`)}
${sample(3,
`24<br/>
8`,
`4`,
``)}
${sample(4,
`101<br/>
10`,
`12`,
``)}
${sample(5,
`149<br/>
30`,
`6`,
``,
`{"data": ["10;5;3", "11;5;4", "24;8;4", "101;10;12", "149;30;6"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國小組</td>
<td ${LIST_TD(false)}>綠蔭道路</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `最萌身高差`, `114彰化縣國小組`)}
${desc(`
白雪公主和七矮人一起生活在森林裡。七矮人的身高都不一樣，白雪公主想知道七矮人之中，最高的人和最矮的人身高相差多少。小矮人的身高介於 30 公分到 140 公分之間。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序分次輸入 7 個整數，代表七矮人的身高。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最高者與最矮者的身高差。
`)}
${sample(1,
`130<br/>
110<br/>
115<br/>
120<br/>
125<br/>
118<br/>
112`,
`20`,
`最高的是 130，最矮的是 110，身高差是 20。`)}
${sample(2,
`100<br/>
101<br/>
102<br/>
103<br/>
104<br/>
105<br/>
106`,
`6`,
`最高的是 106，最矮的是 100，身高差是 6。`)}
${sample(3,
`105<br/>
98<br/>
110<br/>
102<br/>
99<br/>
108<br/>
101`,
`12`,
``)}
${sample(4,
`140<br/>
135<br/>
138<br/>
133<br/>
130<br/>
137<br/>
61`,
`79`,
``)}
${sample(5,
`60<br/>
76<br/>
74<br/>
72<br/>
70<br/>
68<br/>
78`,
`18`,
``,
`{"data": ["130;110;115;120;125;118;112;20", "100;101;102;103;104;105;106;6", "105;98;110;102;99;108;101;12", "140;135;138;133;130;137;61;79", "60;76;74;72;70;68;78;18"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國小組</td>
<td ${LIST_TD(false)}>最萌身高差</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `秒數轉換`, `114彰化縣國小組`)}
${desc(`
時間長度除了可以單用「秒」來表示，也可以將其拆解為「時、分、秒」來表達。請你根據輸入的總秒數，將它轉換成「時、分、秒」三個數字。舉例來說 3661 秒就等於 1 小時又 1 分又 1 秒，因為 3600 秒 + 60 秒 + 1 秒 = 3661 秒。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表總秒數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序分次輸出 3 個整數，代表小時、分鐘、秒。
`)}
${sample(1,
`3661`,
`1<br/>
1<br/>
1`,
`3661 秒就是 1 小時 1 分又 1 秒。`)}
${sample(2,
`59`,
`0<br/>
0<br/>
59`,
`59 秒就是 0 小時 0 分又 59 秒。`)}
${sample(3,
`7325`,
`2<br/>
2<br/>
5`,
``)}
${sample(4,
`10000`,
`2<br/>
46<br/>
40`,
``)}
${sample(5,
`86399`,
`23<br/>
59<br/>
59`,
``,
`{"data": ["3661;1;1;1", "59;0;0;59", "7325;2;2;5", "10000;2;46;40", "86399;23;59;59"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國小組</td>
<td ${LIST_TD(false)}>秒數轉換</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `協力車分配`, `114彰化縣國小組`)}
${desc(`
班上同學到河濱公園騎協力車，協力車分成兩種：兩人共騎的協力車以及三人共騎的協力車。分配後全班同學剛好都有車可騎，而且每一輛協力車都坐滿。請你根據全班人數以及協力車總數的資料，計算出兩人共騎的協力車有幾輛。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序分次輸入 2 個整數，分別代表全班人數以及協力車的總數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表兩人共騎的協力車數量。
`)}
${sample(1,
`5<br/>
2`,
`1`,
`全班 5 人、2 台車，兩人車與三人車各 1 台，輸出 1。`)}
${sample(2,
`8<br/>
4`,
`4`,
`全班 8 人、4 台車，需要兩人車 4 台，不需要三人車，輸出 4。`)}
${sample(3,
`51<br/>
20`,
`9`,
``)}
${sample(4,
`49<br/>
20`,
`11`,
``)}
${sample(5,
`62<br/>
25`,
`13`,
``,
`{"data": ["5;2;1", "8;4;4", "51;20;9", "49;20;11", "62;25;13"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國小組</td>
<td ${LIST_TD(false)}>協力車分配</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `數橘子`, `114彰化縣國小組`)}
${desc(`
小龍的媽媽今天到菜市場買了一堆橘子，有 10 顆以上，但忘記確切數量。回家後，媽媽嘗試用不同大小的袋子來分裝橘子：大袋子每袋可裝 7 顆、中袋子每袋可裝 5 顆、小袋子每袋可裝 3 顆。<br/>
媽媽分別只使用其中一種袋子來裝橘子時，有可能恰好裝滿或剩下一些裝不滿一袋的橘子。請你根據這三種情況下剩餘的橘子數量，推算出橘子可能的最少總顆數 (10 顆以上)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序分次輸入 3 個整數，分別代表只用大袋子、只用中袋子、只用小袋子分裝後剩下的橘子數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表橘子可能的最少總顆數。
`)}
${sample(1,
`1<br/>
0<br/>
0`,
`15`,
`15 ÷ 7 餘 1、15 ÷ 5 餘 0、15 ÷ 3 餘 0，符合條件的最少總顆數是 15。`)}
${sample(2,
`4<br/>
3<br/>
0`,
`18`,
`18 ÷ 7 餘 4、18 ÷ 5 餘 3、18 ÷ 3 餘 0，符合條件的最少總顆數是 18。`)}
${sample(3,
`3<br/>
2<br/>
1`,
`52`,
``)}
${sample(4,
`2<br/>
1<br/>
2`,
`86`,
``)}
${sample(5,
`2<br/>
4<br/>
0`,
`114`,
``)}
${sample(6,
`1<br/>
3<br/>
2`,
`113`,
``,
`{"data": ["1;0;0;15", "4;3;0;18", "3;2;1;52", "2;1;2;86", "2;4;0;114", "1;3;2;113"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國小組</td>
<td ${LIST_TD(false)}>數橘子</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `禮物多數決`, `114彰化縣國小組`)}
${desc(`
教師節快到了，班上同學想從禮品 1 號到禮品 5 號中選擇一樣送給老師。決定的方式是從同學的投票中，找出得票數最多的禮品。請根據投票結果，找出要送給老師的禮品編號，以及該禮品所得到的票數。(測資保證得票最多的禮品只有一個)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第 1 個輸入為參與投票的同學人數，接下來依序分次輸入每位同學投票的禮物編號 (1 ~ 5)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序分次輸出得票最高的禮品編號，以及這個禮品所得到的票數。
`)}
${sample(1,
`3<br/>
1<br/>
1<br/>
1`,
`1<br/>
3`,
`3 位同學都投了 1 號禮品，輸出 1，然後輸出其票數 3。`)}
${sample(2,
`7<br/>
5<br/>
5<br/>
5<br/>
2<br/>
2<br/>
2<br/>
5`,
`5<br/>
4`,
`7 位同學中有 4 位投 5 號、3 位投 2 號，輸出 5，然後輸出其票數 4。`)}
${sample(3,
`8<br/>
2<br/>
4<br/>
4<br/>
1<br/>
4<br/>
1<br/>
4<br/>
3`,
`4<br/>
4`,
``)}
${sample(4,
`7<br/>
5<br/>
5<br/>
2<br/>
4<br/>
3<br/>
2<br/>
5`,
`5<br/>
3`,
``)}
${sample(5,
`9<br/>
1<br/>
2<br/>
2<br/>
4<br/>
2<br/>
2<br/>
2<br/>
2<br/>
3`,
`2<br/>
6`,
``)}
${sample(6,
`10<br/>
3<br/>
3<br/>
3<br/>
3<br/>
3<br/>
1<br/>
1<br/>
1<br/>
2<br/>
2`,
`3<br/>
5`,
``,
`{"data": ["3;1;1;1;1;3", "7;5;5;5;2;2;2;5;5;4", "8;2;4;4;1;4;1;4;3;4;4", "7;5;5;2;4;3;2;5;5;3", "9;1;2;2;4;2;2;2;2;3;2;6", "10;3;3;3;3;3;1;1;1;2;2;3;5"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114彰化縣國小組</td>
<td ${LIST_TD(false)}>禮物多數決</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
