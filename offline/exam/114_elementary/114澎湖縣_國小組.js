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
${qHeader("1", `神秘的運算符號`, `114澎湖縣國小組`)}
${desc(`
小明很喜歡寫程式，也很愛動腦想新點子。他覺得平常看到的加、減、乘、除有點無聊，於是自己發明了一個特別的運算符號，名字叫做「#」。當你看到 A # B 的時候，代表要用 A 和 B 這兩個數字來進行一個新的計算。<br/>
計算時，第一步不是馬上算，而是先看看這兩個數字誰比較大、誰比較小。不管輸入的順序是怎樣，都要先找出較大的數和較小的數。接著，用「較大的數」去除以「較小的數」，算出商是多少，餘數是多少。<br/>
最後，把算出來的「商」放在前面，「餘數」放在後面，直接接在一起，變成一個新的數字，這個數字就是「#」運算的答案。如果剛好可以整除，餘數是 0，也要照樣寫出來，不能省略。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入兩行數字，分別代表 A 和 B (不一定誰大誰小，都是大於 0 的整數)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出把「商」和「餘數」依照順序組合起來後得到的數字。
`)}
${sample(1,
`5<br/>
10`,
`20`,
`較大的數 10 除以較小的數 5，商 2 餘 0，組合成 20。`)}
${sample(2,
`3<br/>
3`,
`10`,
``)}
${sample(3,
`8<br/>
100`,
`124`,
``)}
${sample(4,
`45<br/>
7`,
`63`,
``)}
${sample(5,
`1<br/>
13`,
`130`,
``,
`{"data": ["5;10;20", "3;3;10", "8;100;124", "45;7;63", "1;13;130"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國小組</td>
<td ${LIST_TD(false)}>神秘的運算符號</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `甜心餅乾工廠的品管任務！`, `114澎湖縣國小組`)}
${desc(`
歡迎來到「甜心餅乾工廠」！品管機器人「阿波」的工作，是站在包裝輸送帶前面，確保每一塊要被包裝的餅乾都是正面朝上。<br/>
輸送帶上的餅乾會一塊一塊地從他面前經過。如果餅乾是正面朝上，阿波會讓它直接通過；如果餅乾是反面朝上，阿波會把它翻回正面，每翻一塊餅乾，他的計數器就會「+1」。<br/>
我們用數字來代表餅乾的狀態：1 代表正面 (不用翻)，0 代表反面 (需要翻面)。請你寫一個程式，計算阿波總共翻了幾次餅乾。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行為輸送帶上的餅乾總數；第二行為每一塊餅乾的狀態 (0 或 1)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出阿波總共翻了幾次餅乾。
`)}
${sample(1,
`8<br/>
1 0 1 1 0 0 1 1`,
`3`,
`反面朝上 (0) 的餅乾有 3 塊，翻了 3 次。`)}
${sample(2,
`5<br/>
1 1 1 1 1`,
`0`,
``)}
${sample(3,
`7<br/>
0 0 0 0 0 0 0`,
`7`,
``)}
${sample(4,
`1<br/>
1`,
`0`,
``)}
${sample(5,
`1<br/>
0`,
`1`,
``,
`{"data": ["8;1;0;1;1;0;0;1;1;3", "5;1;1;1;1;1;0", "7;0;0;0;0;0;0;0;7", "1;1;0", "1;0;1"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國小組</td>
<td ${LIST_TD(false)}>甜心餅乾工廠的品管任務！</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `麵包店打折趣`, `114澎湖縣國小組`)}
${desc(`
小明放學後到幸福麵包店買麵包。店裡每個麵包的價格都一樣。店員阿姨告訴他：「如果總金額滿 100 元可以打 9 折，滿 200 元打 85 折，滿 300 元打 8 折喔！」請你幫小明算出他這次要付多少錢。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一行是購買的麵包數量；第二行是每個麵包的價格 (單價)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最後要付的金額 (四捨五入到整數)。
`)}
${sample(1,
`3<br/>
30`,
`90`,
`3 × 30 = 90 元，未滿 100 元不打折。`)}
${sample(2,
`4<br/>
25`,
`90`,
`4 × 25 = 100 元，打 9 折為 90 元。`)}
${sample(3,
`6<br/>
27`,
`146`,
`6 × 27 = 162 元，打 9 折為 145.8，四捨五入為 146 元。`)}
${sample(4,
`5<br/>
40`,
`170`,
``)}
${sample(5,
`9<br/>
25`,
`191`,
``,
`{"data": ["3;30;90", "4;25;90", "6;27;146", "5;40;170", "9;25;191"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國小組</td>
<td ${LIST_TD(false)}>麵包店打折趣</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `魔法學院的神秘藥水調配挑戰！`, `114澎湖縣國小組`)}
${desc(`
你的桌上有三瓶貼著不同數字標籤的神奇藥材。要成功調配出傳說藥水，你必須遵照「三步驟黃金法則」：<br/>
第一步：整理藥材。把這三瓶藥材按照瓶身上的數字，從最小的排到最大的，得到「最小瓶」、「中間瓶」和「最大瓶」。<br/>
第二步：啟動魔法陣。把三個數字全部加起來：如果「總和」是偶數，就啟動「太陽魔法陣」；如果「總和」是奇數，就啟動「月亮魔法陣」。<br/>
第三步：念出最終咒語。<br/>
太陽魔法陣：(最小瓶數字 + 中間瓶數字) × 最大瓶數字<br/>
月亮魔法陣：(最大瓶數字 - 中間瓶數字) + 最小瓶數字<br/>
算出來的結果就是這瓶傳說藥水的「魔力指數」。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入三行，為三瓶藥材瓶身數字 (未依照大小順序排列，數字可以重複)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出魔力指數。
`)}
${sample(1,
`1<br/>
2<br/>
3`,
`9`,
`排序後為 1、2、3，總和 6 是偶數，太陽魔法陣：(1 + 2) × 3 = 9。`)}
${sample(2,
`2<br/>
3<br/>
4`,
`3`,
`排序後為 2、3、4，總和 9 是奇數，月亮魔法陣：(4 - 3) + 2 = 3。`)}
${sample(3,
`10<br/>
5<br/>
3`,
`80`,
``)}
${sample(4,
`9<br/>
4<br/>
6`,
`7`,
``)}
${sample(5,
`7<br/>
1<br/>
7`,
`1`,
``,
`{"data": ["1;2;3;9", "2;3;4;3", "10;5;3;80", "9;4;6;7", "7;1;7;1"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114澎湖縣國小組</td>
<td ${LIST_TD(false)}>魔法學院的神秘藥水調配挑戰！</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
