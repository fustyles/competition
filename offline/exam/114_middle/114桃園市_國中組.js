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
${qHeader("1", `購買紀念品`, `114桃園市國中組`)}
${desc(`
小明趁日幣貶值特別飛去日本旅遊，準備回國時，發現還有一些日幣還沒花完，於是想要去紀念品店買紀念品來送給他的好朋友。他想要盡量把身上的日幣都花完，來買到最多的紀念品。請你寫一個程式幫他判斷，在盡量花完所有剩下日幣的情況下，最多可以買到幾件紀念品。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表小明剩下的日幣總數。<br/>
第二行：一個整數 M，代表商品的數量。<br/>
第三行：M 個整數，代表每樣商品的日幣價格。<br/>
第四行：M 個整數，代表第三行對應的每樣商品剩下數量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (可以買到的紀念品總數量)。
`)}
${sample(1,
`1000<br/>
3<br/>
100 300 200<br/>
3 4 2`,
`6`,
`商品總金額 = 100+100+100+300+200+200 = 1000，最多可以買 6 個紀念品。`)}
${sample(2,
`500<br/>
3<br/>
600 700 800<br/>
3 4 5`,
`0`,
`剩下的錢不夠買任何紀念品，所以最多可以買 0 個紀念品。`)}
${sample(3,
`1500<br/>
3<br/>
200 300 100<br/>
2 1 4`,
`7`,
`商品總金額 = 200+200+300+100+100+100+100 &lt; 1500，所以最多可以買 7 個紀念品。`)}
${sample(4,
`1285<br/>
3<br/>
400 300 100<br/>
4 6 3`,
`6`,
`商品總金額 = 300+300+300+100+100+100 &lt; 1285，所以最多可以買 6 個紀念品。`,
`{"data": ["1000;3;100;300;200;3;4;2;6", "500;3;600;700;800;3;4;5;0", "1500;3;200;300;100;2;1;4;7", "1285;3;400;300;100;4;6;3;6"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國中組</td>
<td ${LIST_TD(false)}>購買紀念品</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `攻擊防禦力平衡`, `114桃園市國中組`)}
${desc(`
小麗在玩一款魔法戰鬥 RPG 手機遊戲。角色擁有「魔力攻擊」與「魔法防禦」兩種屬性。兩種數值決定在該場戰鬥中的表現，小麗有 3 件「魔法道具」，每件道具會同時提升攻擊與防禦。例如有一種隱形斗篷可以增加角色的攻擊力 5、防禦力 20，如果使用在初始攻擊力為 20、防禦力為 10 的角色身上，該角色的攻擊力就會變成 5 + 20 = 25，而防禦力會變成 20 + 10 = 30。道具的效果可以進行疊加，但是每個道具只能使用 1 次。<br/>
小麗希望使用最少道具使得角色的攻擊力數值等於防禦力數值以對抗魔法騎士，請寫一個程式幫忙判斷現有的道具要使用哪幾號道具才能達成要求，若需要多個道具，請依道具編號由小到大依序輸出，若無法達成攻擊力等於防禦力則輸出 0。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行：角色的魔法攻擊力。<br/>
第 2 行：角色的魔法防禦力。<br/>
第 3 ~ 5 行：第 1 ~ 3 種道具的攻擊力與防禦力，每行兩個整數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出使用的道具編號，若需要多個道具則依編號由小到大輸出；若無法達成則輸出 0。
`)}
${sample(1,
`15<br/>
20<br/>
20 10<br/>
5 15<br/>
10 5`,
`3`,
`角色攻擊力 15、防禦力 20。<br/>
三件道具依序為 (攻 20, 防 10)、(攻 5, 防 15)、(攻 10, 防 5)。<br/>
使用 3 號道具後攻擊力 25、防禦力 25，輸出 3。`)}
${sample(2,
`10<br/>
15<br/>
5 10<br/>
20 10<br/>
15 25`,
`1 2`,
`角色攻擊力 10、防禦力 15。<br/>
三件道具依序為 (攻 5, 防 10)、(攻 20, 防 10)、(攻 15, 防 25)。<br/>
使用 1 號與 2 號道具後攻擊力 35、防禦力 35，輸出 1 2。`)}
${sample(3,
`10<br/>
25<br/>
15 10<br/>
10 5<br/>
15 20`,
`0`,
`角色攻擊力 10、防禦力 25。<br/>
三件道具依序為 (攻 15, 防 10)、(攻 10, 防 5)、(攻 15, 防 20)。<br/>
無論怎麼使用都無法使攻擊力等於防禦力，輸出 0。`,
`{"data": ["15;20;20;10;5;15;10;5;3", "10;15;5;10;20;10;15;25;1;2", "10;25;15;10;10;5;15;20;0"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國中組</td>
<td ${LIST_TD(false)}>攻擊防禦力平衡</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `檢查碼`, `114桃園市國中組`)}
${desc(`
書店的會員卡買書可以 8 折優惠，書店老闆為了避免有人偽造會員卡，於是在會員卡號上加入檢查碼。會員卡的編號格式：一個英文字母 + 4 個數字 + 一個檢查碼。<br/>
英文字母對應的數字如下表：<br/>
<table style="border-collapse: collapse; margin: 6px 0 10px 0;"><tr><td ${TH}>A</td><td ${TD}>B</td><td ${TD}>C</td><td ${TD}>D</td></tr><tr><td ${TH}>11</td><td ${TD}>13</td><td ${TD}>15</td><td ${TD}>17</td></tr></table><br/>
如果 (英文字母對應的數字 + 4 個數字 + 檢查碼) 除以 5 的餘數是 4，就是正確的會員卡號，其他餘數都是不正確的。<br/>
正確的會員卡號例如 B + 2013 + 檢查碼 5：B20135 = 13+2+0+1+3+5 = 24，24÷5=4 餘 4，所以這是一個正確的會員卡。<br/>
不正確的會員卡號例如 A + 1527 + 檢查碼 4：A15274 = 11+1+5+2+7+4 = 30，30÷5=6 餘 0，所以這是一個不正確的會員卡。<br/>
請你寫一個程式，讓書店老闆可以快速知道會員卡號碼是否正確，正確請輸出 yes，不正確請輸出 no。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個會員卡號字串 (一個大寫英文字母接 5 個數字)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出 yes 或 no。
`)}
${sample(1,
`C20351`,
`no`,
`C20351 = 15+2+0+3+5+1 = 26，26÷5=5 餘 1，所以這不是一個正確的會員卡。`)}
${sample(2,
`D15713`,
`yes`,
`D15713 = 17+1+5+7+1+3 = 34，34÷5=6 餘 4，所以這是一個正確的會員卡。`,
`{"data": ["C20351;no", "D15713;yes"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國中組</td>
<td ${LIST_TD(false)}>檢查碼</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `校園販賣機自動補貨`, `114桃園市國中組`)}
${desc(`
自立國中學校販賣機販售多種飲料，每種飲料都有目前庫存量。為了避免缺貨造成不便，系統規定：凡庫存低於 10 罐者，一律自動補貨至 20 罐；庫存大於等於 10 者不補貨。請你寫一個程式，讀入各品項的庫存，進行自動補貨後，輸出所有飲料的總罐數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：一個整數 N，代表飲料的種類數。<br/>
第二行：N 個整數，代表各飲料目前的庫存量。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數 (自動補貨後的飲料總罐數)。
`)}
${sample(1,
`5<br/>
12 8 5 20 18`,
`90`,
`販賣機販售 5 種飲料，目前庫存為 12 8 5 20 18。<br/>
因 8、5 低於 10，補至 20。補貨後為 12、20、20、20、18，總和 90。`)}
${sample(2,
`4<br/>
9 9 9 9`,
`80`,
`販賣機販售 4 種飲料，目前庫存為 9 9 9 9。<br/>
全部皆低於 10，補至 20×4=80，總和 80。`)}
${sample(3,
`6<br/>
10 11 19 0 7 30`,
`110`,
`販賣機販售 6 種飲料，目前庫存為 10 11 19 0 7 30。<br/>
低於 10 的有 0、7，補至 20。補貨後為 10、11、19、20、20、30，總和 110。`,
`{"data": ["5;12;8;5;20;18;90", "4;9;9;9;9;80", "6;10;11;19;0;7;30;110"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114桃園市國中組</td>
<td ${LIST_TD(false)}>校園販賣機自動補貨</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
