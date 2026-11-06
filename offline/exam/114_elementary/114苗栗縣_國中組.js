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
${qHeader("1", `罰寫位數`, `114苗栗縣國中組`)}
${desc(`
有許多人在班上吵鬧，老師非常生氣，於是只好命令全班罰寫：從正整數 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 …… 這樣依序寫下去，直到天荒地老，這樣大家就再也不會吵鬧了。<br/>
大家寫著寫著，老師非常好奇，想要知道：假設大家都乖乖罰寫，在已經寫下一些數字後，接下來的三個數字是多少呢？在此只看連續寫下的連續阿拉伯數字部分，忽略數字之間的所有分隔與符號，則寫起來會長得像是 123456789101112131415161718192021 …<br/>
舉例來說，如果大家已經寫下了 8 個數字，也就是 12345678，那麼接下來出現的三個數字就是 910。如果大家已經寫下了 18 個數字，也就是 123456789101112131，那麼接下來出現的三個數字就是 415。<br/>
請撰寫一個程式，幫老師計算接下來出現的三個數字。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個整數，代表大家已經寫下了幾個數字 (1 ~ 10000)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出接下來出現的三個數字，中間不可以有空格或任何其他符號。
`)}
${sample(1,
`8`,
`910`,
`已寫下 8 個數字：12345678。<br/>第 9～11 個數字來自 9、10，依序為 9、1、0，輸出 910。`)}
${sample(2,
`18`,
`415`,
`已寫下 18 個數字：123456789101112131。<br/>第 19～21 個數字來自 14、15，依序為 4、1、5，輸出 415。`,
`{"data": ["8;910", "18;415"]}`)}
'
 onclick='${ONCLICK}'>1
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國中組</td>
<td ${LIST_TD(false)}>罰寫位數</td>
</tr>
`;

// ---------------- 第 2 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("2", `誰沒上學`, `114苗栗縣國中組`)}
${desc(`
期待已久的寒假終於快要開始了！但是今天班上有一個同學沒有來上學考試，也沒有請假。老師迷迷糊糊，已經分不清楚是誰沒來了，於是決定舉辦一場小考，這樣就能知道是誰沒有來。收回考卷後，老師發現大事不妙：所有人的座號亂成一團，很難直接看出來是少了哪一個座號。<br/>
這個班級的座號從 1 開始，依照 1, 2, 3, … 順序編下去，中間不會有跳號，直到最後一號，也就是班級的總人數。請撰寫一個程式，根據所有來上學考試的考卷上寫的座號，幫老師找出是誰沒有來上學考試。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為班級的總人數 (2 ~ 20 人)；接著依序輸入每張考卷上寫的座號，次數比班級的總人數少一次 (考卷上不會寫不存在的座號，也不會重複，但順序不一定)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出沒有來上學考試的座號。
`)}
${sample(1,
`4<br/>
3<br/>
2<br/>
4`,
`1`,
`全班 4 人，座號 1～4 總和為 10；考卷座號為 3、2、4，總和為 9。<br/>10 - 9 = 1，沒有來的是座號 1。`)}
${sample(2,
`5<br/>
1<br/>
2<br/>
3<br/>
4`,
`5`,
`全班 5 人，座號 1～5 總和為 15；考卷座號為 1、2、3、4，總和為 10。<br/>15 - 10 = 5，沒有來的是座號 5。`,
`{"data": ["4;3;2;4;1", "5;1;2;3;4;5"]}`)}
'
 onclick='${ONCLICK}'>2
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國中組</td>
<td ${LIST_TD(false)}>誰沒上學</td>
</tr>
`;

// ---------------- 第 3 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("3", `借位運算`, `114苗栗縣國中組`)}
${desc(`
數學老師發現大家算數時常常粗心大意，連基本的加減法都不太熟…於是老師決定出一大堆減法的練習題給大家來練習，由於總是有偷懶的學生使用計算機幫忙算，這樣就沒有練習到了，所以老師要求只需要回答進行減法運算中，發生借位 (亦稱退位) 的次數。<br/>
在直式減法中，依位數由低位到高位逐位相減。若某一位的被減數 (該位上的數字) 小於減數 (該位上的數字)，則需向左邊相鄰的高一位借 1。借位時，高一位的數字減少 1；同時因為十進位制中「1 個高一位 = 10 個本位」，本位的被減數增加 10，使本位得以完成相減。上述「向左邊高一位借 1，並在本位增加 10」的處理，稱為「借位」。<br/>
「借位的次數」定義為：在完成整個直式減法的計算過程中，因為某一位被減數小於減數而發生「向左邊高一位借 1」之動作的總次數。若出現連續借位 (例如中間位數為 0 而需再向更高位借)，每一次實際發生的「借 1」動作均各計為 1 次，借位次數為其累計。<br/>
舉例來說，當計算 1000 減 1 時，總共發生了 3 次借位；而計算 2025 減 37 時，總共也發生了 3 次借位；但是計算 2025 減 17 時，總共只發生了 1 次借位。<br/>
請撰寫一個程式，算出老師出的減法題目，在計算時發生借位的次數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>依序輸入被減數 (1 ~ 1000000) 與減數 (1 ~ 1000000)，被減數必定大於減數。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出總共發生幾次借位。
`)}
${sample(1,
`1000<br/>
1`,
`3`,
`1000 - 1 由個位往高位逐位相減：<br/>個位 0 小於 1，向高位借 1（第 1 次）；<br/>十位 0 已被低位借走 1，不夠減 0，再向高位借 1（第 2 次）；<br/>百位 0 已被低位借走 1，不夠減 0，再向高位借 1（第 3 次）。<br/>共借位 3 次（1000 - 1 = 999）。`)}
${sample(2,
`2025<br/>
37`,
`3`,
`2025 - 37 由個位往高位逐位相減：<br/>個位 5 小於 7，向高位借 1（第 1 次）；<br/>十位 2 已被低位借走 1，不夠減 3，再向高位借 1（第 2 次）；<br/>百位 0 已被低位借走 1，不夠減 0，再向高位借 1（第 3 次）。<br/>共借位 3 次（2025 - 37 = 1988）。`)}
${sample(3,
`2025<br/>
17`,
`1`,
`2025 - 17 由個位往高位逐位相減：<br/>個位 5 小於 7，向高位借 1（第 1 次）。<br/>共借位 1 次（2025 - 17 = 2008）。`,
`{"data": ["1000;1;3", "2025;37;3", "2025;17;1"]}`)}
'
 onclick='${ONCLICK}'>3
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國中組</td>
<td ${LIST_TD(false)}>借位運算</td>
</tr>
`;

// ---------------- 第 4 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("4", `教室進出`, `114苗栗縣國中組`)}
${desc(`
在一個偌大的禮堂中，人潮進進出出。為了安全起見，老師指派一個學生守著出入口，每當有人進入或離開，就記錄下來，這樣就可以從記錄中，得到禮堂中總共有多少人。<br/>
禮堂一開始沒有人，每當有人進入時，這位學生就會在紙上多寫下英文字母 A；每當有人離開時，這位學生就會在紙上多寫下英文字母 B。這張紙上的字母一定依序寫下，不會被擦除。除此之外，紙上不會有其他的東西。<br/>
舉例來說，如果現在紙上寫著 AAABABB，那麼老師就可以知道：現在禮堂中總共有一個人；另外，如果現在紙上寫著 ABAB，那麼老師就可以知道現在禮堂中沒有人。<br/>
但是這個學生偶爾會出槌，寫出不可能發生的紀錄，像是如果紙上寫著 ABBAA，那麼我們應該直接認定這個學生的記錄發生過錯誤，因為在任何時候，離開的次數都不可能超過進入的次數，所以就不應該再相信這份紀錄了。<br/>
請撰寫一個程式協助老師統計紙上的紀錄。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>輸入一個字串，代表紙上的紀錄 (長度 1 ~ 100，只會有英文字母 A 與 B)。<br/>
<span ${LBL_OUT}>輸出說明</span>如果記錄發生過錯誤，輸出全大寫的英文單詞 ERR；如果記錄沒有發生過錯誤，輸出禮堂中現在總共有多少人。
`)}
${sample(1,
`AAABABB`,
`1`,
`A 進入 +1、B 離開 -1，人數依序變化為 1 → 2 → 3 → 2 → 3 → 2 → 1，過程中沒有出現負數。<br/>A 有 4 個、B 有 3 個，禮堂內現在有 1 人。`)}
${sample(2,
`ABAB`,
`0`,
`A 進入 +1、B 離開 -1，人數依序變化為 1 → 0 → 1 → 0，過程中沒有出現負數。<br/>A 有 2 個、B 有 2 個，禮堂內現在有 0 人。`)}
${sample(3,
`ABBAA`,
`ERR`,
`逐字統計人數：讀到第 3 個字元 B 時，離開次數超過進入次數（人數變成 -1），紀錄有錯誤，輸出 ERR。`,
`{"data": ["AAABABB;1", "ABAB;0", "ABBAA;ERR"]}`)}
'
 onclick='${ONCLICK}'>4
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國中組</td>
<td ${LIST_TD(false)}>教室進出</td>
</tr>
`;

// ---------------- 第 5 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("5", `木材切割`, `114苗栗縣國中組`)}
${desc(`
為了讓學生參與木工創作，老師從學校砍了一些直徑相同、但是長度不一定相同的一些樹枝下來。為了把這些樹枝做成一致的材料，老師決定把其中一些樹枝切割成一些小段教學用木材。為了方便教學，最終得到的每一段教學用木材長度必須完全一樣，且不同的樹枝不能接合。如果樹枝切割後，還有剩餘未用畢的部分，或是不需要使用的樹枝，就直接埋回土裡即可。<br/>
由於每位學生都必須得到一段教學用木材，老師正在苦惱著：如果每一段的長度太長，那樹枝無論怎麼切割都不夠用；如果每一段的長度太短，那有點浪費這些樹枝。該如何是好呢？<br/>
你已經自告奮勇，幫忙老師測量好每一根樹枝的長度，請撰寫一個程式，幫忙老師找出最長的教學用木材長度，但是要保證每個學生都可以拿到一根。為了測量方便，樹枝的長度以及教學用木材的長度都必須是整數。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span>第一個輸入為學生的人數 (1 ~ 100 人)；第二個輸入為樹枝的數量 (1 ~ 100 根)；接下來依序輸入每根樹枝的長度，次數與樹枝的數量相同 (樹枝的長度一定是正整數，不超過 10000 單位；保證至少能讓每位學生拿到一段長度為 1 的木材)。<br/>
<span ${LBL_OUT}>輸出說明</span>輸出在保證每個學生都可以拿到一根的情況下，最長的教學用木材長度 (整數)。
`)}
${sample(1,
`3<br/>
1<br/>
101`,
`33`,
`3 位學生，樹枝長度為 101。<br/>長度 33 時，各樹枝可切出 3 段，共 3 段 ≥ 3；<br/>長度 34 時只能切出 2 段 &lt; 3，不夠分。因此最長為 33。`)}
${sample(2,
`5<br/>
4<br/>
4<br/>
1<br/>
7<br/>
9`,
`3`,
`5 位學生，樹枝長度為 4、1、7、9。<br/>長度 3 時，各樹枝可切出 1、0、2、3 段，共 6 段 ≥ 5；<br/>長度 4 時只能切出 4 段 &lt; 5，不夠分。因此最長為 3。`,
`{"data": ["3;1;101;33", "5;4;4;1;7;9;3"]}`)}
'
 onclick='${ONCLICK}'>5
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國中組</td>
<td ${LIST_TD(false)}>木材切割</td>
</tr>
`;

// ---------------- 第 6 題 ----------------
contest += `
<tr>
<td ${LIST_TD(true)}>
<button
 style='${BTN_STYLE}'
 data-q='
${qHeader("6", `身高排列`, `114苗栗縣國中組`)}
${desc(`
班上有男生與女生，已知男生與女生的身高都已經各自從小到大排好，請撰寫一個程式，根據每一位男生與女生的身高，幫忙老師按照全班同學 (男女) 的身高從小到大排列。<br/>
<br/>
<span ${LBL_IN}>輸入說明</span><br/>
先輸入男生的人數 (1 ~ 1000 人)，接著依序輸入每個男生的身高 (100 ~ 200，從小到大或相同)。<br/>
再輸入女生的人數 (1 ~ 1000 人)，接著依序輸入每個女生的身高 (100 ~ 200，從小到大或相同)。<br/>
<span ${LBL_OUT}>輸出說明</span>依序從小到大輸出每一位同學的身高，每次輸出一位，次數與男生的人數加上女生的人數相同 (身高可能相同)。
`)}
${sample(1,
`2<br/>
120<br/>
130<br/>
3<br/>
125<br/>
126<br/>
128`,
`120<br/>
125<br/>
126<br/>
128<br/>
130`,
`男生 2 人（120、130），女生 3 人（125、126、128），共 5 人。<br/>兩邊都已由小到大排好，每次比較兩邊最前面的身高，取較小者輸出，<br/>合併後為 120、125、126、128、130。`)}
${sample(2,
`1<br/>
200<br/>
1<br/>
200`,
`200<br/>
200`,
`男生 1 人（200），女生 1 人（200），共 2 人。<br/>兩邊都已由小到大排好，每次比較兩邊最前面的身高，取較小者輸出，<br/>合併後為 200、200。`,
`{"data": ["2;120;130;3;125;126;128;120;125;126;128;130", "1;200;1;200;200;200"]}`)}
'
 onclick='${ONCLICK}'>6
</button>
</td>
<td ${LIST_TD(false)}>114苗栗縣國中組</td>
<td ${LIST_TD(false)}>身高排列</td>
</tr>
`;

contest += `
</tbody>
</table>
`;
