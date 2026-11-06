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
${qHeader("1", `智慧手環的健康挑戰`, `114嘉義市國中組`)}
${desc(`
為了響應教育部推廣的「新世代健康校園」計畫，學校本學期發給每位同學一支「智慧運動手環」。這支手環內建了高精度的三軸加速規，能夠以「小時」為單位，記錄使用者的步數活動量。<br/>
主角小華為了爭取期末的「健康小鐵人」獎章，立志要嚴格執行運動計畫。根據手環的說明書，系統設定了一個「活躍門檻值 (K)」。如果某一小時內的步數低於這個門檻，該小時就會被系統判定為「靜態時段」，並記上一筆「久坐警告」。<br/>
為了避免學生長時間維持靜態，系統設計了一套連續懲罰機制：如果手環偵測到使用者連續兩個小時 (含) 以上都處於「靜態時段」，從連續違規的第二個小時開始，該次警告將會被加倍懲罰 (也就是該小時會被記 2 次警告)。只有當某一小時的步數成功達到門檻時，這個連續違規的狀態才會解除，計數器才會重置。<br/>
請你根據小華手環中匯出的 N 小時歷史數據，幫他計算這段時間內，系統累計發出了幾次警告訊號。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表紀錄的總時數。<br/>
第二行：一個整數 K，代表活躍門檻值。<br/>
第三行：N 個整數，代表每小時測得的步數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表總警告次數。
`)}
${sample(1,
`5<br/>
1000<br/>
800 900 1200 500 400`,
`6`,
`800 (&lt;1000)：警告+1 (累計 1)<br/>
900 (&lt;1000)：連續未達標，警告+2 (累計 3)<br/>
1200 (≥1000)：達標，中斷連續狀態<br/>
500 (&lt;1000)：警告+1 (累計 4)<br/>
400 (&lt;1000)：連續未達標，警告+2 (累計 6)`)}
${sample(2,
`4<br/>
500<br/>
600 700 800 900`,
`0`,
`所有時段皆達標，無警告。`)}
${sample(3,
`3<br/>
1000<br/>
1200 1500 2000`,
`0`,
``)}
${sample(4,
`4<br/>
800<br/>
500 600 700 400`,
`7`,
``)}
${sample(5,
`5<br/>
100<br/>
50 150 50 50 150`,
`4`,
``)}
${sample(6,
`6<br/>
2000<br/>
1000 1000 1000 2500 1000 1000`,
`8`,
``)}
${sample(7,
`10<br/>
500<br/>
400 400 400 600 600 400 400 400 400 400`,
`14`,
``,
`{"data": ["5;1000;800;900;1200;500;400;6", "4;500;600;700;800;900;0", "3;1000;1200;1500;2000;0", "4;800;500;600;700;400;7", "5;100;50;150;50;50;150;4", "6;2000;1000;1000;1000;2500;1000;1000;8", "10;500;400;400;400;600;600;400;400;400;400;400;14"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>智慧手環的健康挑戰</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `神秘的古代石板`, `114嘉義市國中組`)}
${desc(`
考古社的社員們在整理學校老舊圖書館的地下倉庫時，意外在一個積滿灰塵的角落發現了一塊斷裂的古代石板。石板上刻著一串長得驚人的數字。隨同石板出土的還有一卷泛黃的羊皮紙，上面記載著開啟地下密室的線索：「當數字之河能同時通過『五行之神』與『十一星宿』的試煉時，真理之門將會開啟。」<br/>
羊皮紙下方的註解解釋了試煉的規則：<br/>
1. 五行之神的試煉：數字必須是 5 的倍數 (個位數為 0 或 5)。<br/>
2. 十一星宿的試煉：將數字中位於「奇數位置」的數字總和，減去位於「偶數位置」的數字總和 (由左至右數)。如果這個差值能夠被 11 整除 (包含 0)，才算通過試煉。(注意：若相減後為負數，必須不斷加上 11，直到轉為非負數後再進行判斷)。<br/>
由於石板上的數字極長 (甚至超過 23 位數)，一般的計算機早已無法處理。請撰寫程式來驗證這串數字是否能同時解開這兩道封印。<br/>
注意：Scratch 與 Blockly 積木運算大於 16 位數字時已無法精確運算，因此輸入的數字字串最後方會強制加上一個英文字母 a (例如 12345a)，請將其視為字串處理，讀取時請記得忽略最後一個字元。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>一個字串 (包含後置的英文字母 a)，代表石板上的超長整數。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數 (0 或 1)，1 代表「是」，0 代表「非」。第一個數字代表是否為 5 的倍數，第二個代表是否為 11 的倍數。
`)}
${sample(1,
`55a`,
`1 1`,
`輸入去除後置 a 得到 55，尾數 5 (是 5 的倍數)。奇位和 5 - 偶位和 5 = 0 (是 11 的倍數)。`)}
${sample(2,
`1234a`,
`0 0`,
`尾數 4 (非 5 的倍數)。奇位和 4 - 偶位和 6 = -2 (非 11 的倍數)。`)}
${sample(3,
`1651651651651651651651650a`,
`1 1`,
`尾數 0 (是 5 的倍數)。奇位和 36 - 偶位和 36 = 0 (是 11 的倍數)。`)}
${sample(4,
`35a`,
`1 0`,
``)}
${sample(5,
`121a`,
`0 1`,
``)}
${sample(6,
`123a`,
`0 0`,
``)}
${sample(7,
`55555555555555555555555555a`,
`1 1`,
``)}
${sample(8,
`5060506050605060506050605060a`,
`1 1`,
``,
`{"data": ["55a;1;1", "1234a;0;0", "1651651651651651651651650a;1;1", "35a;1;0", "121a;0;1", "123a;0;0", "55555555555555555555555555a;1;1", "5060506050605060506050605060a;1;1"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>神秘的古代石板</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `資源回收車的極限挑戰`, `114嘉義市國中組`)}
${desc(`
每週的資源回收工作結束後，回收車準備將垃圾運走。但是，回收車的剩餘空間有限，只剩下 K 的容量單位。待清運的回收物還有 N 包，每包的大小不一。為了讓校園看起來最整潔，衛生組長希望盡可能載走「最多包」的回收物 (數量越多越好，而不是體積最大)。請你運用「貪婪法則」，幫忙計算在容量 K 的限制下，這台回收車最多能載走幾包回收物？(提示：為了拿走最多包，我們應該優先選擇體積小的，還是體積大的呢？)<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表待清運的回收物數量。<br/>
第二行：一個整數 K，代表回收車的剩餘容量。<br/>
第三行：N 個整數，代表每包回收物的體積。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最多能載走的數量。
`)}
${sample(1,
`5<br/>
10<br/>
5 8 3 2 4`,
`3`,
`1. 排序 (小到大)：2, 3, 4, 5, 8<br/>
2. 裝入 2 (剩 8)；裝入 3 (剩 5)；裝入 4 (剩 1)<br/>
3. 下一個是 5，裝不下。共載走 3 包。`)}
${sample(2,
`4<br/>
20<br/>
10 10 10 10`,
`2`,
`10+10 = 20，剛好裝滿，共 2 包。`)}
${sample(3,
`3<br/>
100<br/>
20 30 40`,
`3`,
``)}
${sample(4,
`5<br/>
10<br/>
20 30 40 50 60`,
`0`,
``)}
${sample(5,
`5<br/>
10<br/>
1 2 3 4 5`,
`4`,
``)}
${sample(6,
`6<br/>
15<br/>
5 10 5 10 5 10`,
`3`,
``)}
${sample(7,
`8<br/>
50<br/>
100 2 100 3 100 5 100 8`,
`4`,
``,
`{"data": ["5;10;5;8;3;2;4;3", "4;20;10;10;10;10;2", "3;100;20;30;40;3", "5;10;20;30;40;50;60;0", "5;10;1;2;3;4;5;4", "6;15;5;10;5;10;5;10;3", "8;50;100;2;100;3;100;5;100;8;4"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>資源回收車的極限挑戰</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `大隊接力的棒次安排`, `114嘉義市國中組`)}
${desc(`
一年一度的校慶運動會即將到來，其中最受矚目的項目就是「兩人三腳大隊接力」。這項比賽要求全班 N 位同學 (N 保證為偶數) 兩兩一組，將腳綁在一起跑完賽道。<br/>
為了讓全班的戰力發揮到極致，老師決定採用「強弱互補」的分組策略：首先將全班同學依照 100 公尺短跑的測驗成績 (能力值) 進行排序。接著，讓全班能力值最高的同學與最低的同學一組，第二高的與第二低的一組，以此類推。為了評估這個策略的風險，老師希望你計算出在這種分組下，所有組別中「兩人能力值總和」的最大值是多少？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表同學人數。<br/>
第二行：N 個整數，代表每位同學的能力值。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表依此策略分組後，各組能力和當中的最大值。
`)}
${sample(1,
`4<br/>
10 90 20 80`,
`100`,
`排序：10, 20, 80, 90。組 1：10+90 = 100；組 2：20+80 = 100。最大值：100`)}
${sample(2,
`6<br/>
1 5 10 20 50 100`,
`101`,
`組：(1+100), (5+50), (10+20)，最大值：101`)}
${sample(3,
`2<br/>
50 60`,
`110`,
``)}
${sample(4,
`4<br/>
1 10 2 9`,
`11`,
``)}
${sample(5,
`6<br/>
10 20 30 40 50 60`,
`70`,
``)}
${sample(6,
`6<br/>
10 80 20 70 30 75`,
`100`,
``)}
${sample(7,
`8<br/>
1 100 2 99 3 98 50 50`,
`101`,
``,
`{"data": ["4;10;90;20;80;100", "6;1;5;10;20;50;100;101", "2;50;60;110", "4;1;10;2;9;11", "6;10;20;30;40;50;60;70", "6;10;80;20;70;30;75;100", "8;1;100;2;99;3;98;50;50;101"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>大隊接力的棒次安排</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `變速傳球的特訓`, `114嘉義市國中組`)}
${desc(`
康輔社為了訓練社員的反應速度，社長發明了一種忽快忽慢的「變速傳球」遊戲。N 位社員圍成一圈，編號依序為 1 到 N。遊戲從 1 號社員開始持球。遊戲總共進行 K 回合，每一回合的傳球距離取決於「目前持球者的編號」：<br/>
如果目前持球者的編號是奇數：他必須向順時針方向傳 1 個人 (傳給下一位)。<br/>
如果目前持球者的編號是偶數：他必須向順時針方向傳 2 個人 (跳過一位傳給下下位)。<br/>
請注意，如果傳球後的位置超過了 N，就會回到 1 號繼續數 (例如：在 5 人小組中，5 號傳 1 人會變成 1 號)。請你計算在經過 K 回合的傳球後，最後球會落在幾號社員的手上？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表社員人數。<br/>
第二行：一個整數 K，代表總共進行的回合數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最後拿到球的社員編號。
`)}
${sample(1,
`5<br/>
3`,
`1`,
`初始在 1 號。第 1 回：1 號是奇數，傳 1 人到 2 號。第 2 回：2 號是偶數，傳 2 人到 4 號。第 3 回：4 號是偶數，傳 2 人到 6 號 (超過 5 回到 1)。結果：最後在 1 號。`)}
${sample(2,
`6<br/>
2`,
`4`,
`初始在 1 號。第 1 回：傳 1 人到 2 號。第 2 回：傳 2 人到 4 號。結果：最後在 4 號。`)}
${sample(3,
`3<br/>
1`,
`2`,
``)}
${sample(4,
`5<br/>
5`,
`4`,
``)}
${sample(5,
`10<br/>
4`,
`8`,
``)}
${sample(6,
`8<br/>
10`,
`4`,
``)}
${sample(7,
`100<br/>
50`,
`100`,
``,
`{"data": ["5;3;1", "6;2;4", "3;1;2", "5;5;4", "10;4;8", "8;10;4", "100;50;100"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>變速傳球的特訓</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `校園密室逃脫-書架的密碼`, `114嘉義市國中組`)}
${desc(`
傳說在校園圖書館的深處，隱藏著一間百年前首任校長留下的「智慧密室」。今年校慶，學生會利用最新的 AR 技術重現了這個傳說，設計了四道關卡。只有解開所有謎題的小隊，才能獲得象徵最高榮譽的「智慧之鑰」。<br/>
第一道關卡是一扇巨大的電子鐵門。門鎖的螢幕上只有一串閃爍的、由 0 與 1 組成的符號序列。門邊的銘牌刻著一行字：「只有通曉機器語言的人，才能將二元的虛幻轉化為十進的真實。」請將螢幕上的二進位字串解碼為十進位數字，輸入系統以開啟大門。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>一個字串 S (只包含 0 與 1)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表轉換後的十進位數值。
`)}
${sample(1,
`101`,
`5`,
`1x4 + 0x2 + 1x1 = 5`)}
${sample(2,
`1111`,
`15`,
`8 + 4 + 2 + 1 = 15`)}
${sample(3,
`10`,
`2`,
``)}
${sample(4,
`110`,
`6`,
``)}
${sample(5,
`1000`,
`8`,
``)}
${sample(6,
`11011`,
`27`,
``)}
${sample(7,
`1111101000`,
`1000`,
``,
`{"data": ["101;5", "1111;15", "10;2", "110;6", "1000;8", "11011;27", "1111101000;1000"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>校園密室逃脫-書架的密碼</td>
</tr>
`;

// ---------------- 第 7 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("7", `校園密室逃脫-費氏階梯`, `114嘉義市國中組`)}
${desc(`
電子鐵門開啟後，映入眼簾的是一座懸浮的螺旋階梯，通往二樓的平台。階梯旁懸掛著一張發光的警示牌：「欲登智慧之巔，步法須合天道。或是步履穩健走一階，或是大步流星跨兩階，切勿貪快。」<br/>
小明看著眼前這 N 階的樓梯，不禁開始思考：如果依照規則，每次只能選擇走 1 階或走 2 階，那麼要安全走到第 N 階平台，總共有多少種不同的步伐組合？若可能的走法數為 F(N) 種，我們可觀察到：<br/>
F(1) = 1，1 階樓梯有 1 種走法<br/>
F(2) = 2，2 階樓梯有 2 種走法<br/>
F(3) = F(2) + F(1) = 2 + 1 = 3，3 階樓梯有 3 種走法<br/>
F(4) = F(3) + F(2) = 3 + 2 = 5，4 階樓梯有 5 種走法<br/>
…<br/>
請你幫小明計算出所有可能的走法總數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>一個整數 N，代表樓梯的總階數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表走法的總數。
`)}
${sample(1,
`3`,
`3`,
`走法：(1,1,1)、(1,2)、(2,1) 共 3 種。`)}
${sample(2,
`4`,
`5`,
`走法：(1,1,1,1)、(1,1,2)、(1,2,1)、(2,1,1)、(2,2) 共 5 種。`)}
${sample(3,
`1`,
`1`,
``)}
${sample(4,
`5`,
`8`,
``)}
${sample(5,
`10`,
`89`,
``)}
${sample(6,
`15`,
`987`,
``)}
${sample(7,
`20`,
`10946`,
``,
`{"data": ["3;3", "4;5", "1;1", "5;8", "10;89", "15;987", "20;10946"]}`)}
'
 onclick='${ONCLICK}'>7
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>校園密室逃脫-費氏階梯</td>
</tr>
`;

// ---------------- 第 8 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("8", `校園密室逃脫-書架修繕工程`, `114嘉義市國中組`)}
${desc(`
來到二樓，要修復好眼前倒塌的古老書架，才能通往下一層。書架的結構需要 K 根長度完全相同的木條來支撐，才能維持平衡。倉庫角落堆放著 N 根長短不一的備用木材。你可以使用鋸子將一根長木材切成多段短木材，但為了結構強度，嚴禁將兩根短木材拼接使用。<br/>
為了讓修復後的書架越穩固越好，這 K 根支撐木條的長度應該要越長越好。請根據現有木材的庫存狀況，計算出這 K 根木條的最大可能長度 (整數) 是多少？<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N (現有木材數量)。<br/>
第二行：一個整數 K (需要木條數量)。<br/>
第三行：N 個整數，代表現有每根木材的長度。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表最大可能長度。
`)}
${sample(1,
`3<br/>
4<br/>
10 20 30`,
`10`,
`木條長度為 10 時，10、20、30 可分別切出 1、2、3 段，總段數 6 ≥ 4；長度為 11 時就無法滿足需求。`)}
${sample(2,
`3<br/>
7<br/>
21 15 10`,
`5`,
`木條長度為 5 時，21、15、10 可分別切出 4、3、2 段，總段數 9 ≥ 7；長度為 6 時就無法滿足需求。`)}
${sample(3,
`1<br/>
5<br/>
100`,
`20`,
``)}
${sample(4,
`3<br/>
3<br/>
10 10 10`,
`10`,
``)}
${sample(5,
`2<br/>
5<br/>
50 50`,
`16`,
``)}
${sample(6,
`5<br/>
10<br/>
100 200 50 120 80`,
`50`,
``)}
${sample(7,
`4<br/>
6<br/>
15 25 35 45`,
`15`,
``,
`{"data": ["3;4;10;20;30;10", "3;7;21;15;10;5", "1;5;100;20", "3;3;10;10;10;10", "2;5;50;50;16", "5;10;100;200;50;120;80;50", "4;6;15;25;35;45;15"]}`)}
'
 onclick='${ONCLICK}'>8
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>校園密室逃脫-書架修繕工程</td>
</tr>
`;

// ---------------- 第 9 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("9", `校園密室逃脫-社團聯絡網`, `114嘉義市國中組`)}
${desc(`
來到最後一層，主控電腦顯示了一張複雜的「社團關係網絡圖」。圖上有 N 個社團成員節點與 M 條單向連線 (代表上級指揮下級)。系統會以「連線列表」的方式給你資料，每一條連線包含「起點 (上級)」與「終點 (下級)」。這是一個樹狀的分層結構，每一個人都只會有一個上級指導人，請找出從最高指揮 (編號 1) 傳到最底層的人，中間經過的層數最大是多少。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表社團總人數 (編號 1 ~ N)。<br/>
第二行：一個整數 M，代表關係連線總數。<br/>
第三行：M 個整數，代表每條連線的「起點列表」。<br/>
第四行：M 個整數，代表每條連線的「終點列表」(第三行第 i 個數字與第四行第 i 個數字構成一條連線)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表聯絡網的最大層數。
`)}
${sample(1,
`3<br/>
2<br/>
1 2<br/>
2 3`,
`2`,
`3 個人，2 條連線 (1→2、2→3)。路徑：1 → 2 → 3，最大傳遞層數為 2。`)}
${sample(2,
`4<br/>
3<br/>
1 1 3<br/>
2 3 4`,
`2`,
`4 個人，3 條連線 (1→2、1→3、3→4)。路徑一：1 → 2；路徑二：1 → 3 → 4。最大傳遞層數為 2。`)}
${sample(3,
`2<br/>
1<br/>
1<br/>
2`,
`1`,
``)}
${sample(4,
`5<br/>
4<br/>
1 2 3 4<br/>
2 3 4 5`,
`4`,
``)}
${sample(5,
`5<br/>
4<br/>
1 2 1 4<br/>
2 3 4 5`,
`2`,
``)}
${sample(6,
`6<br/>
5<br/>
1 2 3 4 1<br/>
2 3 4 6 5`,
`4`,
``)}
${sample(7,
`7<br/>
6<br/>
1 2 3 4 2 3<br/>
2 3 4 5 6 7`,
`4`,
``,
`{"data": ["3;2;1;2;2;3;2", "4;3;1;1;3;2;3;4;2", "2;1;1;2;1", "5;4;1;2;3;4;2;3;4;5;4", "5;4;1;2;1;4;2;3;4;5;2", "6;5;1;2;3;4;1;2;3;4;6;5;4", "7;6;1;2;3;4;2;3;2;3;4;5;6;7;4"]}`)}
'
 onclick='${ONCLICK}'>9
</button>
</td>
<td ${LIST_TD(false)}>114嘉義市國中組</td>
<td ${LIST_TD(false)}>校園密室逃脫-社團聯絡網</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
