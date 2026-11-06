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
${qHeader("1", `資訊競賽獎勵統計`, `114金門縣國中組`)}
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
<td ${LIST_TD(false)}>114金門縣國中組</td>
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
${qHeader("2", `台灣星鏈 (T-Starlink) 衛星佈署計畫`, `114金門縣國中組`)}
${desc(`
台灣正致力於研發自主低軌衛星通訊系統「T-Starlink」，以確保在特殊情況下通訊不中斷。TASA 國家太空中心預計在特定的軌道高度上，沿著預定路徑佈署通訊衛星。根據衛星的訊號覆蓋半徑與任務需求，不同路徑段有不同的佈署模式。請寫一個程式，根據路徑總長度、衛星間的固定間隔，以及指定的「佈署模式」，計算該路段總共需要佈署多少顆衛星。<br/>
根據輸入的模式編號 M，請依照下列規則計算衛星數量：<br/>
1. 模式 1 (全線覆蓋)：該路段的「起點」與「終點」都必須佈署衛星。<br/>
2. 模式 2 (銜接佈署)：僅在「起點」佈署衛星，「終點」不佈署 (以便與下一段軌道無縫銜接)。<br/>
3. 模式 3 (受限區域)：「起點」與「終點」都不佈署衛星 (例如為了避免干擾特定的天文觀測站)。<br/>
4. 模式 4 (全球環繞軌道)：這是一段首尾相接的圓形封閉軌道。<br/>
特殊限制與說明：衛星之間的間隔必須為整數。若路段長度無法被間隔整除，剩餘不足一個間隔的距離將不佈署衛星 (即：計算間隔數時請取整數商)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個整數 L，代表路段總長度 (公里)。<br/>
第二行輸入一個整數 D，代表衛星與衛星間的固定間隔 (公里)。<br/>
第三行輸入一個整數 M，代表佈署模式 (1、2、3 或 4)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表該路段所需的衛星總數。
`)}
${sample(1,
`1000<br/>
200<br/>
1`,
`6`,
`長度 1000 公里，每 200 公里放一顆。間隔有 5 個，因為模式 1 終點也要放，故 5 + 1 = 6。`)}
${sample(2,
`1000<br/>
200<br/>
3`,
`4`,
`長度 1000，間隔 200，間隔數為 5。模式 3 兩端都不佈署，故 5 - 1 = 4。`)}
${sample(3,
`1050<br/>
200<br/>
2`,
`5`,
`長度 1050，間隔 200。1050 ÷ 200 = 5.25，取整數商為 5。模式 2 輸出 5。`)}
${sample(4,
`800<br/>
200<br/>
4`,
`4`,
`長度 800，間隔 200。模式 4 為環狀軌道，衛星數等於間隔數，故輸出 4。`,
`{"data": ["1000;200;1;6", "1000;200;3;4", "1050;200;2;5", "800;200;4;4"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國中組</td>
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
${qHeader("3", `「一杯心情」飲料調製`, `114金門縣國中組`)}
${desc(`
金門最近開了一間超人氣手搖店「一杯心情」，調飲師會依照顧客的心情，製作一杯具有層次感的「心情飲料」；現在要製作的是一杯「五層漸層奶蓋茶」。為了讓飲料呈現漂亮的分層效果，店長規定原料必須依照「密度 (重量)」的大小順序依次倒入杯中，密度大的原料會沉在下層，密度小的原料會浮在上層。<br/>
請你模擬調飲師倒入原料的過程，根據輸入的原料資料，輸出完成後飲料「由下往上」的正確層次順序。<br/>
原料代碼表：B：黑糖糖漿 (Brown Sugar)、M：鮮奶 (Milk)、T：茶 (Tea)、F：奶蓋 (Foam)、J：果凍 (Jelly)<br/>
調製規則：<br/>
1. 每種原料皆有一個整數密度值 D。<br/>
2. 調飲師會依照輸入順序，逐一倒入原料。<br/>
3. 倒入原料時，需依照密度規則放到正確位置：密度較大的原料位於下層，密度較小的原料位於上層。<br/>
4. 若有多種原料的密度相同，需保持它們在輸入中的先後順序不變。<br/>
5. 原料倒入後不可重新調整位置。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>共有 5 組資料，每組依序為一個大寫字母 (B、M、T、F、J) 及一個整數 (代表密度 D)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出 5 個原料代碼，代表飲料完成後由杯底到杯口的原料排列順序。
`)}
${sample(1,
`B 120<br/>
J 120<br/>
T 110<br/>
M 110<br/>
F 90`,
`B J T M F`,
`密度比較：B(120) = J(120) &gt; T(110) = M(110) &gt; F(90)。<br/>
最重的 B 放底部，第二放入的是 J，接著往上是 T、M，最輕的 F 在最上面。`)}
${sample(2,
`F 100<br/>
M 110<br/>
T 110<br/>
J 110<br/>
B 120`,
`B M T J F`,
`密度比較：B(120) &gt; M(110) = T(110) = J(110) &gt; F(100)。<br/>
順序為 B M T J F。`,
`{"data": ["B;120;J;120;T;110;M;110;F;90;B;J;T;M;F", "F;100;M;110;T;110;J;110;B;120;B;M;T;J;F"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國中組</td>
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
${qHeader("4", `風獅爺排排隊`, `114金門縣國中組`)}
${desc(`
金門各村落的風獅爺要準備祭典大合照，村長要求將風獅爺依照身高「由矮到高」排好。工讀生小金負責進行搬動，規則如下：<br/>
比較規則：從小金的角度看，每次比較相鄰的兩尊風獅爺。<br/>
交換規則：如果「左邊」的風獅爺比「右邊」的高，兩尊就必須交換位置。<br/>
紀錄規則：每當風獅爺成功交換一次位置，小金就要在筆記本上畫一筆 (紀錄總交換次數)。<br/>
請寫一個程式，幫小金算出排好隊後的風獅爺身高，以及他搬動的完整過程。<br/>
1. 輸入數量 N：讀取總共有幾尊風獅爺。<br/>
2. 追蹤每一輪：程式必須輸出「每一輪」完整比較後 (即該輪最大的數值「浮」到正確位置後) 的序列狀態。<br/>
3. 計算交換次數：統計整個排序過程中，總共執行了幾次「交換」動作。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行為一個整數 N (2 ≤ N ≤ 10)，代表風獅爺的數量；第二行為 N 個整數，代表各尊風獅爺的身高。<br/>
<span ${LBL_OUT}>輸出說明</span>前 N-1 行依序輸出每一輪 (Pass) 排序結束後的風獅爺身高序列 (每行 N 個整數)；最後一行輸出一個整數，代表總共進行的「交換次數」。
`)}
${sample(1,
`4<br/>
150 120 180 110`,
`120 150 110 180<br/>
120 110 150 180<br/>
110 120 150 180<br/>
4`,
`1. 第一輪：150 換 120，180 換 110。結束後 180 就位。(交換 2 次)<br/>
2. 第二輪：150 換 110。結束後 150 就位。(交換 1 次)<br/>
3. 第三輪：120 換 110。結束後 120 就位。(交換 1 次)<br/>
總交換次數：2+1+1 = 4`)}
${sample(2,
`5<br/>
160 140 170 130 150`,
`140 160 130 150 170<br/>
140 130 150 160 170<br/>
130 140 150 160 170<br/>
130 140 150 160 170<br/>
6`,
`1. 第一輪：交換 3 次<br/>
2. 第二輪：交換 2 次<br/>
3. 第三輪：交換 1 次<br/>
4. 第四輪：不換<br/>
總交換次數：6`,
`{"data": ["4;150;120;180;110;120;150;110;180;120;110;150;180;110;120;150;180;4", "5;160;140;170;130;150;140;160;130;150;170;140;130;150;160;170;130;140;150;160;170;130;140;150;160;170;6"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國中組</td>
<td ${LIST_TD(false)}>風獅爺排排隊</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `金門粥糜採購任務`, `114金門縣國中組`)}
${desc(`
金門的粥糜聞名遐邇，許多遊客會指名購買不同店家的粥糜 (共有 9 間名店，編號為 1, 2, 3, …, 9)。導遊小金今天收到了團員們的訂單，準備前往各家店代購。為了節省時間，小金會先統計所有訂單中各家店的粥糜數量，並依照他規劃好的「取貨路線順序」來購買。請幫小金列出最終外送箱中粥糜排列的順序。<br/>
規則說明：<br/>
1. 數量統計：首先統計所有訂單中，各個店家編號出現的總次數。<br/>
2. 依序排列：根據小金指定的「店家取貨順序」，將該店家的編號依出現次數重複列出。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入一個整數 N，代表粥糜訂單的總碗數。<br/>
第二行輸入 N 個整數，代表每碗粥糜所屬的店家編號。<br/>
第三行輸入一個整數 M，代表訂單中包含的店家種類數量。<br/>
第四行輸入 M 個整數，代表小金指定的店家取貨順序。<br/>
<span ${LBL_OUT}>輸出說明</span>依據取貨順序，輸出排列後的店家編號序列。
`)}
${sample(1,
`5<br/>
8 9 9 9 8<br/>
2<br/>
9 8`,
`9 9 9 8 8`,
`總共點了 5 碗粥，店家編號分別為 8, 9, 9, 9, 8。<br/>
共有 2 種店家，取貨順序為「先 9 號店、再 8 號店」。<br/>
因此先輸出三個 9，再輸出兩個 8。`)}
${sample(2,
`7<br/>
3 1 4 1 5 9 3<br/>
5<br/>
1 9 4 3 5`,
`1 1 9 4 3 3 5`,
`總共點了 7 碗粥，取貨順序為 1, 9, 4, 3, 5。<br/>
1 號店出現 2 次、9 號店 1 次、4 號店 1 次、3 號店 2 次、5 號店 1 次，依照順序輸出其編號。`,
`{"data": ["5;8;9;9;9;8;2;9;8;9;9;9;8;8", "7;3;1;4;1;5;9;3;5;1;9;4;3;5;1;1;9;4;3;3;5"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114金門縣國中組</td>
<td ${LIST_TD(false)}>金門粥糜採購任務</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
