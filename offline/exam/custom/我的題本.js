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
${qHeader("1", `考試獎勵`, `114全國賽國中組`)}
${desc(`
強強的老師每週的週一到週五都會進行測驗，每位學生在每次測驗後可以獲得其測驗分數除以 10（無條件捨去）的點數，每週五老師會提供娃娃當作獎品。第一週所有學生都有資格兌換獎品，第二週起，學生必須該週五的成績比前一週五的成績更高才有資格兌換。學生若有資格且所持有的點數足夠，就可以用點數來兌換該週的娃娃，但每人每週最多只能兌換一隻娃娃。請撰寫一個程式，輸入強強每週的成績，計算幾週後，強強總共兌換了幾隻娃娃，及剩餘的點數。
`)}
${sample(1,
`1 23<br/>10 20 30 40 50`,
`0 15`,
`輸入<br/>第一行：測驗已經進行 1 週次，且該週兌換獎品所需點數為 23 點。<br/>第二行：第一週次五天考試成績分別為 10, 20, 30, 40, 50 分。累積總點數為 15 點。<br/><br/>輸出<br/>尚不足 23 點，因此兌換到 0 個獎品，剩餘點數為 15 點。`)}
${sample(2,
`4 10 20 80 99<br/>80 88 60 70 90<br/>70 71 72 73 74<br/>89 80 85 83 81<br/>100 100 100 100 100`,
`2 73`,
`輸入<br/>第一行：測驗已經進行 4 週次，且每週次兌換獎品所需點數依序為 10, 20, 80, 99 點。<br/>第二行：第一週次五天考試成績分別為 80, 88, 60, 70, 90 分。累積總點數為 38 點，可兌換一隻娃娃，扣除 10 點剩 28 點。<br/>第二週次五天考試成績分別為 70, 71, 72, 73, 74 分。累積總點數為 63 點，但本週五分數比上週五低，無資格兌換。<br/>第三週次五天考試成績分別為 89, 80, 85, 83, 81 分。累積總點數為 103 點，可兌換一隻娃娃，扣除 80 點剩 23 點。<br/>第四週次五天考試成績分別為 100, 100, 100, 100, 100 分。累積總點數為 73 點，雖有資格兌換娃娃，但點數不足。<br/><br/>輸出<br/>總共兌換到 2 隻娃娃，剩餘點數為 73 點。`,
`{"data": ["1;23;10;20;30;40;50;0;15", "4;10;20;80;99;80;88;60;70;90;70;71;72;73;74;89;80;85;83;81;100;100;100;100;100;2;73"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114全國賽國中組</td>
<td ${LIST_TD(false)}>考試獎勵</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `簽唱會門票`, `114全國賽國中組`)}
${desc(`
知名偶像團體準備舉辦一場限定粉絲簽唱會，粉絲報名時會附上該年度參加各項活動而累積的粉絲積分。但因簽唱會場地空間有限，最多能邀請的粉絲人數必須有所限制，且公平起見，相同積分的粉絲們不可以只有部分獲得邀請。所以若邀請任一積分的粉絲群時，需注意累計的邀請粉絲人數不能超過場地人數限制。請依粉絲積分的高低選擇哪幾位粉絲可獲得邀請參加簽唱會，並依報名順序發出邀請函。若無法發出任何邀請函則輸出 0。
`)}
${sample(1,
`3 6<br/>90 95 80 95 70 60`,
`1 2 4`,
`輸入<br/>第一行：簽唱會人數上限為 3 人，且有 6 位粉絲報名參加。<br/>第二行：報名的 6 位粉絲的積分依序為 90, 95, 80, 95, 70, 60 分。<br/><br/>輸出<br/>依據粉絲積分高低，粉絲 2, 4 積分均為 95 且最高，都可獲得邀請，最多只能再邀請一名粉絲。次高的積分為 90，且只有一人，因此粉絲 1 也獲得邀請。此時人數已滿，最後依報名順序送出邀請函的順序為 1 2 4。`)}
${sample(2,
`3 5<br/>10 10 10 10 10`,
`0`,
`輸入<br/>第一行：簽唱會人數上限為 3 人，且有 5 位粉絲報名參加。<br/>第二行：報名的 5 位粉絲的積分依序為 10, 10, 10, 10, 10 分。<br/><br/>輸出<br/>依據粉絲積分高低，5 位粉絲積分都是 10 分，但因有 3 人的人數限制，這 5 位粉絲都無法被邀請。也因為無法發出任何一張邀請函，需輸出 0。`)}
${sample(3,
`3 5<br/>60 80 95 60 60`,
`2 3`,
`輸入<br/>第一行：簽唱會人數上限為 3 人，且有 5 位粉絲報名參加。<br/>第二行：報名的 5 位粉絲的積分依序為 60, 80, 95, 60, 60 分。<br/><br/>輸出<br/>依據粉絲積分高低，粉絲 3 積分為 95 且最高，可獲得邀請。次高的積分為 80，因此粉絲 2 也獲得邀請。<br/>粉絲 1, 4, 5 積分均為 60 分，但最多只能再邀請一名粉絲，且相同積分的粉絲們不可以只有部分獲得邀請，因此這 3 位粉絲都無法被邀請。最後依報名順序送出邀請函的順序為 2 3。`,
`{"data": ["3;6;90;95;80;95;70;60;1;2;4", "3;5;10;10;10;10;10;0", "3;5;60;80;95;60;60;2;3"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114全國賽國中組</td>
<td ${LIST_TD(false)}>簽唱會門票</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `闖關遊戲`, `114全國賽國中組`)}
${desc(`
園遊會中有個闖關遊戲：有 12 個小房間依編號順時鐘圍成一圈，如圖。闖關時須依給定的條件正確進出不同的房間，若進入錯誤房間即闖關失敗。房間內有個螢幕顯示一個介於 -3 和 +3 的數字。闖關遊戲有三組起始設定：A, B, C，每一組的房間螢幕數字起始設定如下：<br/>
<br/>
<img alt="12 個房間依編號順時鐘圍成一圈" src="data:image/jpeg;base64,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" style="width:260px;"/><br/>
<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}><b>房間編號</b></td><td ${TH}><b>1</b></td><td ${TH}><b>2</b></td><td ${TH}><b>3</b></td><td ${TH}><b>4</b></td><td ${TH}><b>5</b></td><td ${TH}><b>6</b></td><td ${TH}><b>7</b></td><td ${TH}><b>8</b></td><td ${TH}><b>9</b></td><td ${TH}><b>10</b></td><td ${TH}><b>11</b></td><td ${TH}><b>12</b></td></tr><tr><td ${TD}>A 組起始設訂</td><td ${TD}>+1</td><td ${TD}>+2</td><td ${TD}>+3</td><td ${TD}>-1</td><td ${TD}>-2</td><td ${TD}>-3</td><td ${TD}>+1</td><td ${TD}>+2</td><td ${TD}>+3</td><td ${TD}>-3</td><td ${TD}>-2</td><td ${TD}>-1</td></tr><tr><td ${TD}>B 組起始設定</td><td ${TD}>-2</td><td ${TD}>-2</td><td ${TD}>-3</td><td ${TD}>-2</td><td ${TD}>-2</td><td ${TD}>-3</td><td ${TD}>-2</td><td ${TD}>-2</td><td ${TD}>-3</td><td ${TD}>-2</td><td ${TD}>-2</td><td ${TD}>-3</td></tr><tr><td ${TD}>C 組起始設定</td><td ${TD}>+1</td><td ${TD}>+2</td><td ${TD}>-1</td><td ${TD}>0</td><td ${TD}>+1</td><td ${TD}>-2</td><td ${TD}>+2</td><td ${TD}>+1</td><td ${TD}>-1</td><td ${TD}>+2</td><td ${TD}>-2</td><td ${TD}>0</td></tr></table>
<br/>
闖關遊戲進行方式如下：<br/>
1. 電腦先隨機選擇一組起始設定，並給定第一個進入的房間。<br/>
2. 若該房間螢幕數字是正值 (+<i>i</i>)，就要前往順時針方向的第 <i>i</i> 個房間；<br/>
    若該房間螢幕數字是負值 (-<i>i</i>)，就要前往逆時針方向的第 <i>i</i> 個房間；<br/>
3. 若進入的房間螢幕數字是 <b>0</b>，或已累計進入正確房間共 <b>11</b> 次，則闖關成功，遊戲結束。<br/>
4. 每次離開一個房間後，該房間螢幕上的數字就會正負交換，也就是 <b>+<i>i</i></b> 變 <b>-<i>i</i></b>，或 <b>-<i>i</i></b> 變 <b>+<i>i</i></b>。<br/>
<br/>
請寫一個程式，依序輸出所應正確進入的房間編號直到闖關成功。
`)}
${sample(1,
`A 2`,
`2 4 3 6 3 12 11 9 12 1 2`,
`輸入<br/>起始設定為 A 組，且第一個進入的房間為 2 號房間。<br/><br/>輸出<br/>2 號房間內的數字為 +2，因此要前往 4 號房間，且 2 號房間內的數字轉變為 -2。<br/>4 號房間內的數字為 -1，因此要前往 3 號房間，且 4 號房間內的數字轉變為 +1。<br/>依此類推，依序要進入的房間編號為 2, 4, 3, 6, 3, 12, 11, 9, 12, 1, 2 等 11 個房間。已累計進入正確房間共 11 次，闖關成功。`)}
${sample(2,
`B 12`,
`12 9 6 3 12 3 6 9 12 9 6`,
`輸入<br/>起始設定為 B 組，且第一個進入的房間為 12 號房間。<br/><br/>輸出<br/>依據上述規則，會依序進入編號為 12, 9, 6, 3, 12, 3, 6, 9, 12, 9, 6 等 11 個房間。已累計進入正確房間共 11 次，闖關成功。`)}
${sample(3,
`C 5`,
`5 6 4`,
`輸入<br/>起始設定為 C 組，且第一個進入的房間為 5 號房間。<br/><br/>輸出<br/>依據上述規則，會依序進入編號為 5, 6, 4 三個房間，在進入編號 4 的房間時就會就看到數字 0，闖關成功。因此應輸出 5 6 4。`,
`{"data": ["A;2;2;4;3;6;3;12;11;9;12;1;2", "B;12;12;9;6;3;12;3;6;9;12;9;6", "C;5;5;6;4"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114全國賽國中組</td>
<td ${LIST_TD(false)}>闖關遊戲</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `火星探測車`, `114全國賽國中組`)}
${desc(`
火星探測車「玉山號」是一台專門執行火星上各種探測任務（氣候觀測、岩石採樣等）的車輛，每個任務都有不同的「電力需求」(皆不超過 100 單位) 與「科學價值」。探測車出發執行任務前，都會先充滿電力到 100 單位，然後在電力可負擔的範圍內，執行能獲得最高的總科學價值的任務組合。請寫一個程式，計算探測車可獲得的最高總科學價值。
`)}
${sample(1,
`3<br/>20 50<br/>40 60<br/>30 70`,
`180`,
`輸入<br/>第一行：共有 3 個任務。<br/>第二行：第一個任務電力需求 20，科學價值 50。<br/>第三行：第二個任務電力需求 40，科學價值 60。<br/>第四行：第三個任務電力需求 30，科學價值 70。<br/><br/>輸出<br/>100 單位的電力可以執行完所有任務 (20+40+30≦100)，因此最高總科學價值為 50+60+70=180。`)}
${sample(2,
`2<br/>96 220<br/>51 113`,
`220`,
`輸入<br/>第一行：共有 2 個任務。<br/>第二行：第一個任務電力需求 96，科學價值 220。<br/>第三行：第二個任務電力需求 51，科學價值 113。<br/><br/>輸出<br/>100 單位的電力無法兩個任務都執行，只執行一個時，任務一可獲得較高的科學價值，所以應該執行任務一，因此最高總科學價值為 220。`)}
${sample(3,
`4<br/>80 100<br/>50 60<br/>20 30<br/>10 10`,
`130`,
`輸入<br/>第一行：共有 4 個任務。<br/>第二行：第一個任務電力需求 80，科學價值 100。<br/>第三行：第二個任務電力需求 50，科學價值 60。<br/>第四行：第三個任務電力需求 20，科學價值 30。<br/>第五行：第四個任務電力需求 10，科學價值 10。<br/><br/>輸出<br/>若執行任務一與任務三，所需電力 80+20≦100 單位，其總科學價值為 100+30=130。此為最佳任務執行組合。`,
`{"data": ["3;20;50;40;60;30;70;180", "2;96;220;51;113;220", "4;80;100;50;60;20;30;10;10;130"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114全國賽國中組</td>
<td ${LIST_TD(false)}>火星探測車</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `熱浪區間`, `114全國賽國中組`)}
${desc(`
氣候變遷使夏季熱浪更加頻繁，自然老師蒐集了各地區一段暑假期間「每日最高氣溫」（以 °C 為單位，且精確至 1 位小數）。老師自行定義了熱浪區間為一段連續天數內，可挑選出 2 或多天（必須包含至少區間內的第一天及最後一天），其最高氣溫達到所訂的高溫門檻且溫度呈現越來越高（遞增）的趨勢。請幫老師寫一個程式找出最長的熱浪區間，並輸出熱浪區間總天數及最早的起始日。<br/>
<br/>
此問題可以用以下定義說明：<br/>
給定連續 <i>n</i> 天的氣溫： temp[1], temp[2], …, temp[<i>n</i>]，及所設定的高溫門檻 T。找出若干天 <i>i</i><sub>1</sub> < <i>i</i><sub>2</sub> < … < <i>i</i><sub><i>k</i></sub>，使得<br/>
‧ 每一天都達到門檻：temp[<i>i</i><sub>1</sub>] ≥ <i>T</i>, temp[<i>i</i><sub>2</sub>] ≥ <i>T</i>, …, temp[<i>i</i><sub><i>k</i></sub>] ≥ <i>T</i>；且<br/>
‧ 溫度越來越高：temp[<i>i</i><sub>1</sub>] < temp[<i>i</i><sub>2</sub>] < … < temp[<i>i</i><sub><i>k</i></sub>]<br/>
<br/>
找出符合條件最長的熱浪 (k)，及最早的起始日(<i>i</i><sub>1</sub>)。
`)}
${sample(1,
`8 32.0<br/>25.0 32.1 31.9 31.9 32.3 32.5 31.0 32.5`,
`5 2`,
`輸入<br/>第一行：總共收集了 8 天的最高溫度，且設定高溫門檻為 32.0 度。<br/>第二行：這 8 天的最高溫度依序為 25.0, 32.1, 31.9, 31.9, 32.3, 32.5, 31.0, 32.5 度。<br/><br/>輸出<br/>最長的熱浪區間為第 2 天至第 6 天，因為第 2, 5, 6 天的溫度都有達最高溫度門檻 32.0 度，且這三天溫度為遞增 32.1 &lt; 32.3 &lt; 32.5。因此最長熱浪區間為 5 天，且最早起始日是第 2 天。`)}
${sample(2,
`7 34.0<br/>35.2 36.3 34.0 28.0 34.1 35.0 36.0`,
`5 3`,
`輸入<br/>第一行：總共收集了 7 天的最高溫度，且設定高溫門檻為 34.0 度。<br/>第二行：這 7 天的最高溫度依序為 35.2, 36.3, 34.0, 28.0, 34.1, 35.0, 36.0 度。<br/><br/>輸出<br/>最長的熱浪區間為第 3 天至第 7 天，因為第 3, 5, 6, 7 天的溫度都有達最高溫度門檻 34.0 度，且這四天溫度為遞增 34.0 &lt; 34.1 &lt; 35.0 &lt; 36.0。因此最長熱浪區間為 5 天，且最早起始日是第 3 天。`,
`{"data": ["8;32.0;25.0;32.1;31.9;31.9;32.3;32.5;31.0;32.5;5;2", "7;34.0;35.2;36.3;34.0;28.0;34.1;35.0;36.0;5;3"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114全國賽國中組</td>
<td ${LIST_TD(false)}>熱浪區間</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
