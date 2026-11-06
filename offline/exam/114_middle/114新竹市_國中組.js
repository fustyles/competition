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
${qHeader("1", `貨物重量計費`, `114新竹市國中組`)}
${desc(`
竹新貨運公司運送貨物的收費採用累進式計費方式：<br/>
0 ~ 10 公斤：每公斤 30 元<br/>
10 ~ 30 公斤：超過 10 公斤的部分，每公斤 25 元<br/>
30 ~ 50 公斤：超過 30 公斤的部分，每公斤 20 元<br/>
50 公斤以上：超過 50 公斤的部分，每公斤 15 元<br/>
請撰寫程式，輸入貨物重量，計算寄件總費用。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數 w，代表貨物重量 (公斤)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表寄件費用 (單位：元)。
`)}
${sample(1,
`6`,
`180`,
`未滿 10 公斤，每公斤 30 元，6×30 = 180。`)}
${sample(2,
`32`,
`840`,
`10 公斤部分每公斤 30 元 (300)，10-30 公斤部分 (共 20 公斤) 每公斤 25 元 (500)，多餘 2 公斤每公斤 20 元 (40)，共 840。`)}
${sample(3,
`0`,
`0`,
``)}
${sample(4,
`45`,
`1100`,
``)}
${sample(5,
`20`,
`550`,
``)}
${sample(6,
`6`,
`180`,
``)}
${sample(7,
`50`,
`1200`,
``,
`{"data": ["6;180", "32;840", "0;0", "45;1100", "20;550", "6;180", "50;1200"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國中組</td>
<td ${LIST_TD(false)}>貨物重量計費</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `想去遊樂園`, `114新竹市國中組`)}
${desc(`
大人國、七福村都推出假日優惠，小名一家人有各種年齡，請計算兩間遊樂園門票總價誰比較便宜。<br/>
大人國：<br/>
1. 祖孫樂：一位 65 歲以上長者可免費攜帶一位 6 歲以下兒童。<br/>
2. 票價：成人 (含 65 歲以上) 全票 599 元，半票 (12 歲以下) 299 元。<br/>
七福村：<br/>
1. 年齡為 7 的倍數者可免費入場。<br/>
2. 票價：全票 499 元，半票 (9 歲以下) 299 元。<br/>
請撰寫程式，輸入所有同行者的年齡，分別計算大人國及七福村的總票價，並比較哪一間較便宜。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行為一個整數 N，代表同行人數。<br/>
第 2 行為 N 個整數，代表每位同行者的年齡。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出較便宜的遊樂園名稱，以及需付多少元。
`)}
${sample(1,
`3<br/>
70 5 10`,
`七福村 798`,
`大人國：可使用祖孫樂帶 5 歲兒童免費，票價為 599+299 = 898 元。<br/>
七福村：70 歲為 7 的倍數免費，票價為 299+499 = 798 元。<br/>
故七福村較便宜。`)}
${sample(2,
`4<br/>
65 5 10 12`,
`大人國 1197`,
`大人國：可使用祖孫樂帶 5 歲兒童免費，10、12 歲皆為半票，票價為 599+299+299 = 1197 元。<br/>
七福村：沒有 7 的倍數，5 歲半票，票價為 499+299+499+499 = 1796 元。<br/>
故大人國較便宜。`)}
${sample(3,
`2<br/>
76 5`,
`大人國 599`,
``)}
${sample(4,
`4<br/>
15 31 35 66`,
`七福村 1497`,
``)}
${sample(5,
`3<br/>
37 35 3`,
`七福村 798`,
``)}
${sample(6,
`1<br/>
76`,
`七福村 499`,
``)}
${sample(7,
`5<br/>
57 59 24 50 6`,
`七福村 2295`,
``,
`{"data": ["3;70;5;10;七福村;798", "4;65;5;10;12;大人國;1197", "2;76;5;大人國;599", "4;15;31;35;66;七福村;1497", "3;37;35;3;七福村;798", "1;76;七福村;499", "5;57;59;24;50;6;七福村;2295"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國中組</td>
<td ${LIST_TD(false)}>想去遊樂園</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `我是神箭手`, `114新竹市國中組`)}
${desc(`
真正的神箭手必須讀懂風，才能百發百中。輸入風速與離箭靶的距離，計算弓箭手應瞄準的位置。箭靶靶心位於直角座標 (0,0) 公分。<br/>
箭會受到地心引力影響：每離箭靶 8 公尺，箭就會比原本瞄準點往下掉落 1 公分 (未滿 8 公尺不計)。<br/>
箭會受到風力影響：風速以正負數表示，其中正數代表往右吹、負數代表往左吹。每離箭靶 10 公尺，箭會受到一次風力偏移，其偏移量即為「風速的數字」(往風吹的方向偏移，未滿 10 公尺不計)。<br/>
例如：風速為 3 → 每 10 公尺箭向右偏 3 公分；風速為 -2 → 每 10 公尺箭向左偏 2 公分。<br/>
請撰寫程式，根據風速與距離計算出弓箭手應瞄準的座標位置 (x,y)，以公分為單位，使箭最終能擊中靶心 (0,0)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行為風速 (正代表往右吹，負代表往左吹)。<br/>
第 2 行為距離 (單位：公尺)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序輸出兩個整數 x、y，分別代表瞄準點的水平與垂直座標 (單位：公分)。
`)}
${sample(1,
`3<br/>
24`,
`-6 3`,
`風速 3 (往右吹)，距離 24 公尺：每 10 公尺右偏 3 公分，共 2 次 → 瞄左 6；每 8 公尺掉 1 公分，共 3 次 → 瞄上 3。瞄準點 (-6, 3)。`)}
${sample(2,
`5<br/>
40`,
`-20 5`,
`風速 5 (往右吹)，距離 40 公尺：每 10 公尺右偏 5 公分，共 4 次 → 瞄左 20；每 8 公尺掉 1 公分，共 5 次 → 瞄上 5。瞄準點 (-20, 5)。`)}
${sample(3,
`-5<br/>
85`,
`40 10`,
``)}
${sample(4,
`-1<br/>
68`,
`6 8`,
``)}
${sample(5,
`4<br/>
47`,
`-16 5`,
``)}
${sample(6,
`0<br/>
33`,
`0 4`,
``)}
${sample(7,
`-9<br/>
76`,
`63 9`,
``,
`{"data": ["3;24;-6;3", "5;40;-20;5", "-5;85;40;10", "-1;68;6;8", "4;47;-16;5", "0;33;0;4", "-9;76;63;9"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國中組</td>
<td ${LIST_TD(false)}>我是神箭手</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `會員入場統計`, `114新竹市國中組`)}
${desc(`
巨堡商場購物中心的會員卡編號格式為：1 個英文字母 + 4 個數字 + 1 個檢查碼 (共 6 碼)。為了強化防偽辨識，系統會計算卡號的「總和值」，公式為：(英文字母對應數字 + 4 個數字 + 檢查碼)。<br/>
合法卡號判定：若該總和值除以 10 的餘數為 0 或 1，則視為合法卡號。若不合法，該次入場不予計入。<br/>
請統計合法入場的會員中，哪一類別的人數最多。類別定義與對應數字如下：<br/>
1. 普通會員：字母為 A(11)、B(13)、C(15)。<br/>
2. 貴賓會員：字母為 V(17)、I(19)、P(21)。<br/>
3. 學生會員：字母為 S(23)、T(25)、U(27)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行為一個整數 N，代表掃描的卡號總數。<br/>
第二行為 N 個字串 (每個 6 碼)，代表會員卡號。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出人數最多的會員類別名稱。若有多個類別的人數相同且並列最多，請依照「普通會員、貴賓會員、學生會員」的順序依序輸出。
`)}
${sample(1,
`2<br/>
S11114 T00005`,
`學生會員`,
`S11114：23(S)+1+1+1+1+4 = 31，31÷10=3 餘 1 (合法，學生會員)。<br/>
T00005：25(T)+0+0+0+0+5 = 30，30÷10=3 餘 0 (合法，學生會員)。<br/>
學生會員人數最多。`)}
${sample(2,
`3<br/>
A12347 V00003 S11113`,
`貴賓會員 學生會員`,
`A12347：11(A)+1+2+3+4+7 = 28，28÷10=2 餘 8 (不合法)。<br/>
V00003：17(V)+0+0+0+0+3 = 20，20÷10=2 餘 0 (貴賓會員)。<br/>
S11113：23(S)+1+1+1+1+3 = 30，30÷10=3 餘 0 (學生會員)。<br/>
貴賓會員與學生會員並列最多。`)}
${sample(3,
`5<br/>
P31383 T87540 A31360 C76572 B96010`,
`普通會員 貴賓會員 學生會員`,
``)}
${sample(4,
`3<br/>
S23456 S11114 V43462`,
`學生會員`,
``)}
${sample(5,
`5<br/>
U52681 I27124 V79062 B59213 B86744`,
`貴賓會員`,
``)}
${sample(6,
`4<br/>
P35362 T22554 P60781 U81782`,
`貴賓會員`,
``)}
${sample(7,
`3<br/>
A22222 V22222 S22222`,
`普通會員`,
``,
`{"data": ["2;S11114;T00005;學生會員", "3;A12347;V00003;S11113;貴賓會員;學生會員", "5;P31383;T87540;A31360;C76572;B96010;普通會員;貴賓會員;學生會員", "3;S23456;S11114;V43462;學生會員", "5;U52681;I27124;V79062;B59213;B86744;貴賓會員", "4;P35362;T22554;P60781;U81782;貴賓會員", "3;A22222;V22222;S22222;普通會員"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國中組</td>
<td ${LIST_TD(false)}>會員入場統計</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `買五送一`, `114新竹市國中組`)}
${desc(`
60 虹飲料店推出優惠活動：每購買 5 杯飲料，第 6 杯免費。<br/>
但免費的飲料並非固定，而是依照以下規則決定：將所有飲料依價格由高排到低，每滿 6 杯 (第 6、12、18... 杯)，該杯為「免費」。<br/>
請撰寫程式，輸入所有飲料的價格 (依購買順序)，計算顧客應付的總金額。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行為一個整數 N，代表購買飲料杯數。<br/>
第 2 行為 N 個整數，代表每一杯飲料的價錢。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表飲料總價 (單位：元)。
`)}
${sample(1,
`6<br/>
80 70 60 50 40 30`,
`300`,
`剛好 6 杯，30 元那杯是贈送的。`)}
${sample(2,
`9<br/>
30 30 30 30 30 40 40 40 40`,
`280`,
`依價格由高到低排序，第 6 杯是 30 元，免費。總價 280 元。`)}
${sample(3,
`6<br/>
10 20 30 40 50 60`,
`200`,
``)}
${sample(4,
`5<br/>
50 40 50 40 50`,
`230`,
``)}
${sample(5,
`6<br/>
70 70 30 45 60 30`,
`275`,
``)}
${sample(6,
`11<br/>
35 70 35 45 35 45 35 40 30 50 80`,
`460`,
``)}
${sample(7,
`13<br/>
35 40 50 50 30 60 50 80 90 100 30 50 40`,
`625`,
``,
`{"data": ["6;80;70;60;50;40;30;300", "9;30;30;30;30;30;40;40;40;40;280", "6;10;20;30;40;50;60;200", "5;50;40;50;40;50;230", "6;70;70;30;45;60;30;275", "11;35;70;35;45;35;45;35;40;30;50;80;460", "13;35;40;50;50;30;60;50;80;90;100;30;50;40;625"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國中組</td>
<td ${LIST_TD(false)}>買五送一</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `歡樂抽獎`, `114新竹市國中組`)}
${desc(`
期末段考結束後，小朋老師舉辦了一場同樂會。<br/>
每位同學會先抽出 1 顆紅球，紅球上寫有一個整數數字 (0 ~ 9)。接著，同學可以從抽獎箱中抽出 3 顆白球，每顆白球上也各有一個整數數字 (0 ~ 9)。<br/>
同學必須一定要使用紅球，並可選擇使用 0 ~ 3 顆白球，將所選球上的數字相加，只要總和為 7 的倍數即可中獎。<br/>
中獎等級依照使用的白球數量判定：<br/>
不使用白球且紅球本身即為 7 的倍數：特獎<br/>
使用 1 顆白球：頭獎<br/>
使用 2 顆白球：二獎<br/>
使用 3 顆白球：三獎<br/>
若無法組成 7 的倍數：未中獎<br/>
請撰寫程式，判斷同學最終可獲得的獎項等級 (以使用白球數量最少為優先)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行為一個整數 R，代表紅球上的數字。<br/>
第 2 行為 3 個整數，代表三顆白球上的數字。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出中獎結果，可能的輸出為：特獎、頭獎、二獎、三獎、未中獎。
`)}
${sample(1,
`2<br/>
6 4 2`,
`三獎`,
`三顆球都使用 2+6+4+2 = 14 是 7 的倍數。`)}
${sample(2,
`8<br/>
3 2 5`,
`未中獎`,
`無論怎麼組合都無法湊成 7 的倍數。`)}
${sample(3,
`3<br/>
1 2 4`,
`頭獎`,
``)}
${sample(4,
`1<br/>
1 2 3`,
`三獎`,
``)}
${sample(5,
`7<br/>
7 0 5`,
`特獎`,
``)}
${sample(6,
`9<br/>
3 4 6`,
`未中獎`,
``)}
${sample(7,
`6<br/>
5 4 3`,
`二獎`,
``,
`{"data": ["2;6;4;2;三獎", "8;3;2;5;未中獎", "3;1;2;4;頭獎", "1;1;2;3;三獎", "7;7;0;5;特獎", "9;3;4;6;未中獎", "6;5;4;3;二獎"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114新竹市國中組</td>
<td ${LIST_TD(false)}>歡樂抽獎</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
