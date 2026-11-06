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
${qHeader("1", `射箭比賽成績計算`, `114新竹縣國中組`)}
${desc(`
奇比射箭場將舉辦射箭比賽，為了節省人力成本，全面採用電腦自動計分。每位選手依不同階段比賽，射 5 ~ 10 箭不等，箭靶分數 0 ~ 10 分。選手的總成績需依照以下規則計算：<br/>
1. 首箭直接採原始分數。<br/>
2. 若本次射中分數「低於」前一次，該次成績採原始分數。<br/>
3. 若本次射中分數與前一次「相同」(但非連續滿分)，該次成績為原始分數的 2 倍。<br/>
4. 若本次射中分數「高於」前次，或連續兩次皆為滿分 (10 分)，該次成績為原始分數的 3 倍。<br/>
請撰寫程式，依序輸入 N 箭的原始得分 (介於 0 ~ 10)，依規則計算並輸出選手的總成績。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入數字 N (5 ≤ N ≤ 10)。<br/>
第二行輸入 N 個整數 (0 ~ 10)，代表選手每箭原始得分。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表選手的總得分。
`)}
${sample(1,
`5<br/>
7 7 9 10 10`,
`108`,
`第 1 箭：7 分 (首箭直接採原始分數) → 7<br/>
第 2 箭：與前次相同 → 2 倍計算 → 7×2=14<br/>
第 3 箭：9 分高於前次 → 3 倍計算 → 9×3=27<br/>
第 4 箭：10 分高於前次 → 3 倍計算 → 10×3=30<br/>
第 5 箭：10 分且連續滿分 → 3 倍計算 → 10×3=30<br/>
總得分 = 7+14+27+30+30 = 108 分`)}
${sample(2,
`7<br/>
5 3 3 4 10 0 3`,
`65`,
`第 1 箭：5 分 (首箭) → 5<br/>
第 2 箭：3 分低於前次 → 採原始分數 → 3<br/>
第 3 箭：3 分與前次相同 → 2 倍 → 6<br/>
第 4 箭：4 分高於前次 → 3 倍 → 12<br/>
第 5 箭：10 分高於前次 → 3 倍 → 30<br/>
第 6 箭：0 分低於前次 → 採原始分數 → 0<br/>
第 7 箭：3 分高於前次 → 3 倍 → 9<br/>
總得分 = 5+3+6+12+30+0+9 = 65 分`,
`{"data": ["5;7;7;9;10;10;108", "7;5;3;3;4;10;0;3;65"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國中組</td>
<td ${LIST_TD(false)}>射箭比賽成績計算</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `猜數字`, `114新竹縣國中組`)}
${desc(`
在經典的猜數字遊戲中，電腦會設定一組不重複的數字作為「答案」，玩家則輸入一組相同長度、數字不重複的組合作為「猜測」。<br/>
程式需比對「猜測」與「答案」的關係，並以 XAYB 的形式輸出結果，其中：<br/>
X：表示數字與位置皆正確的個數。<br/>
Y：表示數字正確但位置錯誤的個數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第 1 行輸入數字 N (N ≥ 2)，代表有 N 個不重複數字。<br/>
第 2 行輸入 N 個不重複數字，為正確答案。<br/>
第 3 行輸入 N 個不重複數字，為玩家的猜測。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一行字串「XAYB」，表示比對結果。
`)}
${sample(1,
`4<br/>
4 7 1 9<br/>
4 9 7 8`,
`1A2B`,
`答案：4、7、1、9；猜測：4、9、7、8<br/>
位置與數字都正確的為「4」(1A)<br/>
數字正確但位置錯誤的有「7」與「9」(2B)<br/>
因此輸出結果為 1A2B。`)}
${sample(2,
`3<br/>
3 5 8<br/>
5 3 8`,
`1A2B`,
`答案：3、5、8；猜測：5、3、8<br/>
位置與數字都正確的為「8」(1A)<br/>
數字正確但位置錯誤的為「3」與「5」(2B)<br/>
因此輸出結果為 1A2B。`,
`{"data": ["4;4;7;1;9;4;9;7;8;1A2B", "3;3;5;8;5;3;8;1A2B"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國中組</td>
<td ${LIST_TD(false)}>猜數字</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `寶可夢訓練師`, `114新竹縣國中組`)}
${desc(`
你是一位剛成為寶可夢訓練師的新手，正在整理你抓到的寶可夢資料。請設計一個程式，輸入多隻寶可夢的屬性，輸出各屬性寶可夢的數量統計結果。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入整數 N，代表有 N 組寶可夢資料。<br/>
第二行輸入 N 組寶可夢屬性名稱及數量 (依序為名稱、數量)。<br/>
<span ${LBL_OUT}>輸出說明</span>依照輸入出現順序，輸出每個屬性與該屬性寶可夢數量 (依序為「屬性 數量」)，若屬性重複只輸出一次。
`)}
${sample(1,
`5<br/>
火 2 水 1 火 3 電 2 水 1`,
`火 5 水 2 電 2`,
`共有 5 筆寶可夢屬性及對應數量。<br/>
統計後依出現順序輸出：火 5 水 2 電 2。`)}
${sample(2,
`4<br/>
草 1 草 2 毒 3 草 4`,
`草 7 毒 3`,
`共有 4 筆寶可夢屬性及對應數量。<br/>
統計後依出現順序輸出：草 7 毒 3。`,
`{"data": ["5;火;2;水;1;火;3;電;2;水;1;火;5;水;2;電;2", "4;草;1;草;2;毒;3;草;4;草;7;毒;3"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國中組</td>
<td ${LIST_TD(false)}>寶可夢訓練師</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `機器人行走軌跡`, `114新竹縣國中組`)}
${desc(`
在未來城市中，你是一名機器人巡邏隊的新人隊長，負責操控一台能在網格城市中移動的巡邏機器人。城市為了安全，設定了機器人的 X、Y 座標在行走邊界 (0,0) 到 (10,10) 之間，超過範圍就會被系統擋下。今天，城市中央的導航系統故障，你必須自行輸入指令，讓機器人按照 U、D、L、R 行走巡邏，找到指定位置並回報座標。<br/>
移動規則：<br/>
U5：向上移動 5 步，Y+5；D3：向下移動 3 步，Y-3<br/>
L2：向左移動 2 步，X-2；R4：向右移動 4 步，X+4<br/>
邊界限制：0 ≤ x ≤ 10，0 ≤ y ≤ 10。若某一步會超出邊界，則該步「不移動」。<br/>
機器人起點為 (0,0)，請依照輸入的指令，計算機器人最終位置座標 (x,y)。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入指令數量。<br/>
第二行輸入各個指令，每個指令由 U、D、L、R 其中一個字母及數字 (1 ~ 9) 組成。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出最終位置，格式為 (x,y)。
`)}
${sample(1,
`5<br/>
U2 D3 D4 L5 R3`,
`(3,0)`,
`起點 (0,0)<br/>
U2 → Y+2，停在 (0,2)<br/>
D3 → Y-3，超界停在 (0,0)<br/>
D4 → Y-4，超界停在 (0,0)<br/>
L5 → X-5，超界停在 (0,0)<br/>
R3 → X+3，停在 (3,0)<br/>
最終位置 (3,0)`)}
${sample(2,
`4<br/>
R3 L2 U3 D1`,
`(1,2)`,
`起點 (0,0)<br/>
R3 → X+3，停在 (3,0)<br/>
L2 → X-2，停在 (1,0)<br/>
U3 → Y+3，停在 (1,3)<br/>
D1 → Y-1，停在 (1,2)<br/>
最終位置 (1,2)`,
`{"data": ["5;U2;D3;D4;L5;R3;(3,0)", "4;R3;L2;U3;D1;(1,2)"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國中組</td>
<td ${LIST_TD(false)}>機器人行走軌跡</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `學校運動會`, `114新竹縣國中組`)}
${desc(`
學校舉辦一年一度的運動會，需要統計各班級在所有比賽中的總得分。<br/>
請撰寫一個程式，輸入班級數量 N (N ≥ 3)，再依序輸入 N 組「班級名稱」與「總得分」。程式需依照總得分進行排序 (由高到低，且不會有相同分數)，並依序輸出總分排名前二分之一 (四捨五入取整數) 的班級名單。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行輸入整數 N，代表班級數量。<br/>
第二行輸入 N 組資料，每組依序為班級名稱、總得分。<br/>
<span ${LBL_OUT}>輸出說明</span>依照總得分由高至低，輸出總分排名前二分之一 (四捨五入取整數) 的班級名稱。
`)}
${sample(1,
`5<br/>
一甲 85 二乙 92 三丙 78 四丁 95 五戊 88`,
`四丁 二乙 五戊`,
`共有 5 班參加比賽。<br/>
依得分高低排序：四丁(95)、二乙(92)、五戊(88)、一甲(85)、三丙(78)。<br/>
5 的二分之一為 2.5，四捨五入取 3，輸出前 3 名：四丁 二乙 五戊。`)}
${sample(2,
`3<br/>
一甲 70 二乙 90 三丙 80`,
`二乙 三丙`,
`共有 3 班參加比賽。<br/>
依得分高低排序：二乙(90)、三丙(80)、一甲(70)。<br/>
3 的二分之一為 1.5，四捨五入取 2，輸出前 2 名：二乙 三丙。`,
`{"data": ["5;一甲;85;二乙;92;三丙;78;四丁;95;五戊;88;四丁;二乙;五戊", "3;一甲;70;二乙;90;三丙;80;二乙;三丙"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國中組</td>
<td ${LIST_TD(false)}>學校運動會</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `機器人跳樓梯`, `114新竹縣國中組`)}
${desc(`
在未來城市的高塔中，機器人電梯發生故障，它只能靠跳躍上升！<br/>
機器人跳躍模組一次最多可以上升 K 階，但至少要跳 1 階。<br/>
如果樓梯共有 N 階，且機器人一次最多可跳 K 階，請計算機器人能剛好到達第 N 階的不同跳法總數。<br/>
輸入中 N 與 K 皆為正整數，且 1 ≤ K ≤ N ≤ 30。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
第一行：整數 N，代表樓梯總階數。<br/>
第二行：整數 K，代表一次最多可跳的階數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出一個整數，代表所有可能的跳法總數。
`)}
${sample(1,
`4<br/>
2`,
`5`,
`N=4，K=2<br/>
跳法為：(1+1+1+1)、(1+1+2)、(1+2+1)、(2+1+1)、(2+2)，共 5 種。`)}
${sample(2,
`4<br/>
3`,
`7`,
`N=4，K=3<br/>
跳法為：(1+1+1+1)、(1+1+2)、(1+2+1)、(2+1+1)、(2+2)、(1+3)、(3+1)，共 7 種。`,
`{"data": ["4;2;5", "4;3;7"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114新竹縣國中組</td>
<td ${LIST_TD(false)}>機器人跳樓梯</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
