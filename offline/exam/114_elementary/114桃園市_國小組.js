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
${qHeader("1", `班服投票`, `114桃園市國小組`)}
${desc(`
可愛國小 601 班要製作紀念班服，本次班服設計有三個款式，分別編號為 1、2、3。班上同學可以自由投票，參與投票者可在選票上寫上一個自己所選擇的班服款式編號，統計後選出投票數最高的款式。<br/>
請設計程式：先計算每款班服設計的得票數 (依 1→3 順序)，輸出最後獲得最高票數的班服款式編號；若有最高票數一樣的狀況，輸出「請重新投票」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行：一個整數 N，代表投票數；第二行：N 個整數，介於 1 ~ 3，代表每張選票的班服設計編號。<br/>
<span ${LBL_OUT}>輸出說明</span>如果有明確的最高票，輸出票數最高的班服編號；如果有最高票數相同情形，輸出「請重新投票」。
`)}
${sample(1,
`8<br/>
1 2 2 3 2 1 3 2`,
`2`,
`8 位同學投票，得票數最高的班服設計編號為 2。`)}
${sample(2,
`6<br/>
1 2 3 1 2 3`,
`請重新投票`,
`6 位同學投票，最高票有同票數情形，需要重新投票。`)}
${sample(3,
`5<br/>
3 3 1 2 3`,
`3`,
`5 位同學投票，得票數最高的班服設計編號為 3。`,
`{"data": ["8;1;2;2;3;2;1;3;2;2", "6;1;2;3;1;2;3;請重新投票", "5;3;3;1;2;3;3"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國小組</td>
<td ${LIST_TD(false)}>班服投票</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `棒球場的座位`, `114桃園市國小組`)}
${desc(`
棒球場總共有 9000 個座位，座位區分為三大區，每區共有 90 排：第一、三大區為普通區，各有 2,250 席，每排各有 25 人；第二大區為搖滾區，有 4,500 席，每排各有 50 人。座位編號按照大區順序，由第一區開始由左至右、由前至後，再接續第二、三大區。<br/>
小明想要去看棒球賽為台灣隊加油，請你寫一個程式，輸入座位號碼，就可以輸出在哪一區、哪一排的第幾個位置，讓小明可以在眾多的座位中，快速找到自己的座位。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表座位號碼 (1 ~ 9000)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出三個整數：第幾區、第幾排、由左數第幾個位置。
`)}
${sample(1,
`1881`,
`1 76 6`,
`座位 1881 在第 1 區第 76 排，由左數第 6 個位置。`)}
${sample(2,
`3045`,
`2 16 45`,
`3045 - 2250 = 795，座位 3045 在第 2 區第 16 排，由左數第 45 個位置。`)}
${sample(3,
`8241`,
`3 60 16`,
`8241 - 6750 = 1491，座位 8241 在第 3 區第 60 排，由左數第 16 個位置。`,
`{"data": ["1881;1;76;6", "3045;2;16;45", "8241;3;60;16"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國小組</td>
<td ${LIST_TD(false)}>棒球場的座位</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `挑選喜歡的午餐區間`, `114桃園市國小組`)}
${desc(`
小虎是學校裡最愛挑午餐的學生，他最喜歡的餐點有好幾種，用字母表示，例如 A = 雞肉、B = 豬排、C = 義大利麵……。學校提供了 N 天的午餐菜單，每天的主餐用字母表示。小虎想挑出連續 K 天的午餐，讓他最愛的餐點出現最多次，享受「最滿意的一段午餐時光」。如果有好幾段連續 K 天的午餐出現次數相同，小虎會選擇最早出現的一段。<br/>
請幫小虎找出：1. 他最愛餐點在這段期間出現的次數；2. 這段期間的起始天數 (第一天為 1)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行：整數 N (天數)。<br/>
第 2 行：N 個字母，每個字母表示一天的主餐。<br/>
第 3 行：K (連續天數)。<br/>
第 4 行：小虎最愛的餐點，可能有多個字母 (例如 A C)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出最愛餐點出現次數與起始天數。
`)}
${sample(1,
`7<br/>
A B A C A B A<br/>
3<br/>
A`,
`2 1`,
`共 7 天，連續 3 天，喜愛的餐點為 A。<br/>
最愛餐點最多出現 2 次，最早的起始天數為 1。`)}
${sample(2,
`10<br/>
A B C D A B C C B A<br/>
4<br/>
A C`,
`3 5`,
`共 10 天，連續 4 天，喜愛的餐點為 A 與 C。<br/>
最愛餐點最多出現 3 次，起始天數為 5。`)}
${sample(3,
`5<br/>
A B C D E<br/>
2<br/>
A B C D E`,
`2 1`,
`共 5 天，連續 2 天，喜愛的餐點為 A、B、C、D、E。<br/>
最愛餐點最多出現 2 次，最早的起始天數為 1。`,
`{"data": ["7;A;B;A;C;A;B;A;3;A;2;1", "10;A;B;C;D;A;B;C;C;B;A;4;A C;3;5", "5;A;B;C;D;E;2;A B C D E;2;1"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國小組</td>
<td ${LIST_TD(false)}>挑選喜歡的午餐區間</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `綠能任務挑戰`, `114桃園市國小組`)}
${desc(`
為了推動淨零城市，玩家要在地圖中收集綠能點數 (正值) 與應對污染事件 (負值)。地圖共有 N 個地點，每個地點代表一種環境事件，可能「吸收碳」(正值)、「排放碳」(負值)，或「無變化」(0)。<br/>
玩家從第 1 個地點出發 (初始能量為 0，不算第 1 個地點的能量值)，每次依據骰子的點數移動，並在抵達新地點時計入能量變化。若移動過程中的總能量超過 50，會觸發「能源過載」，總能量會維持在 50。若移動過程中總能量下降至 0 (或是小於 0)，會觸發「環境危機」，系統會自動啟動緊急裝置補助，把總能量設為 5。地圖是環狀的，當超過第 N 格時會回到第 1 格繼續走。<br/>
請計算所有移動執行完畢後的最終能量值，並輸出過程中曾達到的最高能量值。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行：整數 N，代表地圖的地點數量。<br/>
第 2 行：N 個整數，依序代表第 1 格到第 N 格的能量變化值。<br/>
第 3 行：整數 M，代表骰子的次數。<br/>
第 4 行：M 個整數，代表每次骰到的點數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出最終能量值與最高能量值。
`)}
${sample(1,
`4<br/>
25 10 30 -5<br/>
4<br/>
1 1 2 1`,
`50 50`,
`依序抵達第 2、3、1、2 格：10 → 40 → 65 (過載維持 50) → 60 (過載維持 50)。<br/>
最終能量值 50，最高能量值 50。`)}
${sample(2,
`5<br/>
10 -5 0 20 -10<br/>
3<br/>
1 2 3`,
`20 25`,
`依序抵達第 2、4、2 格：-5 (環境危機設為 5) → 25 → 20。<br/>
最終能量值 20，最高能量值 25。`)}
${sample(3,
`5<br/>
-10 -20 10 0 30<br/>
5<br/>
1 1 1 1 1`,
`35 45`,
`依序抵達第 2、3、4、5、1 格：-20 (設為 5) → 15 → 15 → 45 → 35。<br/>
最終能量值 35，最高能量值 45。`,
`{"data": ["4;25;10;30;-5;4;1;1;2;1;50;50", "5;10;-5;0;20;-10;3;1;2;3;20;25", "5;-10;-20;10;0;30;5;1;1;1;1;1;35;45"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國小組</td>
<td ${LIST_TD(false)}>綠能任務挑戰</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
