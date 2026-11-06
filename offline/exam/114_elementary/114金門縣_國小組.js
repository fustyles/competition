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
${qHeader("1", `資訊競賽獎勵統計`, `114金門縣國小組`)}
${desc(`
縣府舉辦「科技教育創意實作競賽」，共有許多選手參加。評審委員們根據每位選手的最終得分 (0 至 100 分)，頒發不同等級的獎勵。由於參賽人數眾多，請寫一個程式協助主辦單位統計獲得「金牌獎」、「銀牌獎」、「銅牌獎」與「佳作」的人數各有多少。<br/>
每位選手的得分僅會被歸類在最高的一項獎勵中 (不可重複領獎)：<br/>
1. 金牌獎：若得分為 90 分(含)以上。<br/>
2. 銀牌獎：若不符合金牌獎，但得分為 80 分(含)以上。<br/>
3. 銅牌獎：若不符合上述獎項，但得分為 70 分(含)以上。<br/>
4. 佳作：若不符合上述獎項，但得分為 60 分(含)以上。<br/>
5. 參賽證明：若得分未滿 60 分，則僅頒發參賽證明，不計入上述獎項。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為整數 N，代表總參賽人數；接下來 N 個輸入，每個為一名選手的得分。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出四個整數，分別代表獲得「金牌獎」、「銀牌獎」、「銅牌獎」與「佳作」的人數。
`)}
${sample(1,
`6<br/>
92<br/>
55<br/>
80<br/>
90<br/>
72<br/>
65`,
`2 1 1 1`,
`總共 6 位選手：<br/>
92、90 分：金牌獎 (2 人)<br/>
80 分：銀牌獎 (1 人)<br/>
72 分：銅牌獎 (1 人)<br/>
65 分：佳作 (1 人)<br/>
55 分：未達標，不計入獎項。`)}
${sample(2,
`3<br/>
45<br/>
60<br/>
59`,
`0 0 0 1`,
`總共 3 位選手：<br/>
60 分符合「佳作」(1 人)<br/>
45、59 分皆未滿 60 分。`,
`{"data": ["6;92;55;80;90;72;65;2;1;1;1", "3;45;60;59;0;0;0;1"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國小組</td>
<td ${LIST_TD(false)}>資訊競賽獎勵統計</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `台灣星鏈 (T-Starlink) 衛星佈署計畫`, `114金門縣國小組`)}
${desc(`
台灣正致力於研發自主低軌衛星通訊系統「T-Starlink」，以確保在特殊情況下通訊不中斷。TASA 國家太空中心預計在特定的軌道高度上，沿著預定路徑佈署通訊衛星。請寫一個程式，根據路徑總長度、衛星間的固定間隔，以及指定的「佈署模式」，計算該路段總共需要佈署多少顆衛星。<br/>
衛星佈署分為兩種模式：<br/>
模式 1 (全線佈署)：從起點開始放，每隔一段距離放一顆，且路徑的「終點」也必須放一顆。<br/>
模式 2 (銜接佈署)：從起點開始放，每隔一段距離放一顆，但路徑的「終點」不放衛星 (留給下一個路段使用)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個整數 L，代表路段長度 (公里)。<br/>
第二行輸入一個整數 D，代表衛星間的固定間隔 (公里)。<br/>
第三行輸入一個整數 M，代表模式 (1 或 2)。<br/>
(備註：本題保證 L 必定能被 D 整除)<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所需的衛星總數。
`)}
${sample(1,
`1000<br/>
200<br/>
1`,
`6`,
`長度 1000 公里，每 200 公里放一顆。間隔有 5 個，因為模式 1 終點也要放，所以是 5 + 1 = 6。`)}
${sample(2,
`1000<br/>
250<br/>
2`,
`4`,
`長度 1000 公里，每 250 公里放一顆。間隔有 4 個，因為模式 2 終點不放，所以總共就是 4 顆。`,
`{"data": ["1000;200;1;6", "1000;250;2;4"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國小組</td>
<td ${LIST_TD(false)}>台灣星鏈 (T-Starlink) 衛星佈署計畫</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `「一杯心情」飲料調製`, `114金門縣國小組`)}
${desc(`
金門最近開了一間超人氣手搖店「一杯心情」，調飲師會依照顧客的心情，製作一杯具有層次感的「心情飲料」；現在要製作的是一杯「四層漸層奶蓋茶」。為了讓飲料呈現漂亮的分層效果，店長規定原料必須依照「密度 (重量)」的大小順序依次倒入杯中，密度大的原料會沉在下層，密度小的原料會浮在上層。<br/>
請你模擬調飲師倒入原料的過程，根據輸入的原料資料，輸出完成後飲料「由下往上」的正確層次順序。<br/>
原料代碼表：B：黑糖糖漿 (Brown Sugar)、M：鮮奶 (Milk)、T：茶 (Tea)、F：奶蓋 (Foam)<br/>
調製規則：<br/>
每種原料皆有一個整數密度值 D。<br/>
調飲師會先倒入密度最大的原料，再依序倒入密度較小的原料。<br/>
原料倒入後不可重新調整位置。<br/>
這四種原料的密度值保證皆不相同。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>共有 4 組資料，每組依序為一個大寫字母 (B、M、T、F) 及一個整數 (代表密度 D)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 4 個原料代碼，代表飲料完成後由杯底到杯口的原料排列順序。
`)}
${sample(1,
`B 130<br/>
M 110<br/>
T 120<br/>
F 95`,
`B T M F`,
`密度比較：B(130) &gt; T(120) &gt; M(110) &gt; F(95)。<br/>
最重的 B 放底部，接著往上是 T、M，最輕的 F 在最上面。`)}
${sample(2,
`F 100<br/>
B 140<br/>
M 125<br/>
T 115`,
`B M T F`,
`密度比較：B(140) &gt; M(125) &gt; T(115) &gt; F(100)。<br/>
順序為 B M T F。`,
`{"data": ["B;130;M;110;T;120;F;95;B;T;M;F", "F;100;B;140;M;125;T;115;B;M;T;F"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國小組</td>
<td ${LIST_TD(false)}>「一杯心情」飲料調製</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `風獅爺排排隊`, `114金門縣國小組`)}
${desc(`
金門各村落的風獅爺要準備祭典大合照，村長要求將 4 尊風獅爺依照身高「由矮到高」排好。工讀生小金負責進行搬動，規則如下：<br/>
比較規則：從小金的角度看，每次比較相鄰的兩尊風獅爺。<br/>
交換規則：如果「左邊」的風獅爺比「右邊」的高，兩尊就必須交換位置。<br/>
紀錄規則：每當風獅爺成功交換一次位置，小金就要在筆記本上畫一筆 (紀錄總交換次數)。<br/>
請寫一個程式，幫小金算出排好隊後的風獅爺身高，以及他總共搬動 (交換) 了幾次。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入 4 個整數，每個代表 1 尊風獅爺的身高。<br/>
<span ${LBL_OUT}>輸出說明</span>先依序輸出由矮到高排列後的 4 個身高數值，再輸出一個整數，代表總共交換的次數。
`)}
${sample(1,
`150<br/>
120<br/>
110<br/>
100`,
`100 110 120 150<br/>
6`,
`這是「最麻煩」的情況 (全倒過來排)。150 要一路換到最後，接著 120 再換，總共會交換 6 次。`)}
${sample(2,
`120<br/>
110<br/>
140<br/>
130`,
`110 120 130 140<br/>
2`,
`120 與 110 換一次；140 與 130 換一次，總共 2 次。`,
`{"data": ["150;120;110;100;100;110;120;150;6", "120;110;140;130;110;120;130;140;2"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國小組</td>
<td ${LIST_TD(false)}>風獅爺排排隊</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
