/*
@license
Copyright 2026 Taiwan (ChungYi Fu)

@author https://www.facebook.com/francefu/
@verion contest
*/

// 修正 Blockly 10.0.0：拖曳頂層積木時不會移到最上層，會從其他積木底下被拖過去
(function () {
	if (!window.Blockly || !Blockly.BlockDragger) return;
	var proto = Blockly.BlockDragger.prototype;
	if (proto.__bringToFrontPatched) return;
	var originalStartDrag = proto.startDrag;
	proto.startDrag = function (currentDragDeltaXY, healStack) {
		originalStartDrag.call(this, currentDragDeltaXY, healStack);
		// 原本只有 mutator 會置頂；這裡在 unplug 之後一律置頂
		if (this.draggingBlock_ && !this.workspace_.isMutator) {
			this.draggingBlock_.bringToFront();
		}
	};
	proto.__bringToFrontPatched = true;
})();

var mainPath = 'https://fustyles.github.io/competition/';
var workspace;
var subWorkspace;
var category;
var categoryBlocks = [];
var categoryExpand = [];
var scratchStyle = true;
var xmlBlockly = "";
var xmlScratch = "";
var workspaceChangeTimer;
var blockChangeTimer;
var createFunctionVariable = ["", []];

// ===== 記憶工作區積木（localStorage）=====
// 一般版與進階版在同一網域，使用不同名稱，避免互相覆蓋
var WORKSPACE_STORAGE_KEY = 'francis_blockly_workspace_standard';
var workspaceSaveTimer;
var workspaceRestoring = true;   // 還原完成前不寫入，避免啟動時的清空動作蓋掉上次的積木

// ===== 記憶題目欄位 question_input（localStorage）=====
var QUESTION_STORAGE_KEY = 'francis_blockly_question_standard';
var questionSaveTimer;
var questionRestoring = true;    // 還原完成前不寫入，避免語系預設文字蓋掉上次的題目
var QUESTION_META_KEY = 'francis_blockly_question_meta_standard';   // 目前題目的題庫、題號、題目名稱

// ===== 考生與題目（全域變數）=====
// examAccount：考生登錄成功時寫入（ExamLogin.unlock）
// examName / examQuestionNo / examQuestionName：在題目清單點選「匯入題目」時寫入（selectExamQuestion）
var examAccount      = '';   // 登錄帳號
var examName         = '';   // 題庫名稱，例如「國小組」
var examQuestionNo   = '';   // 題號，例如「3」
var examQuestionName = '';   // 題目名稱，例如「【一年級】撲滿裡的錢」
var examKey          = '';   // 競賽代碼（＝題庫解密金鑰），只存在記憶體中，用來加密／解密積木結構檔
var examAllowedNos   = [];   // 試題代碼解密後的題號（字串陣列，例如 ["1","2","4","6"]），只有這些題目可匯入

// ===== 閒置清空：登錄時若距離上次使用超過 100 天，清空工作區積木與試題內容（含評分紀錄）=====
var LAST_ACTIVE_KEY   = 'francis_last_active_standard';
var LAST_ACCOUNT_KEY  = 'francis_last_account_standard';   // 上一位登錄的帳號（帳號不同時詢問是否清除資料）
var INACTIVE_RESET_MS = 144000 * 60 * 1000;   // 要改時間只改這裡（分鐘 × 60 × 1000）
// 在頁面載入時先讀出上次使用時間（登錄前不更新，避免輸入帳號密碼時就被覆蓋）
var lastActiveAtLoad = (function () {
	try { return Number(localStorage.getItem(LAST_ACTIVE_KEY)) || 0; } catch (e) { return 0; }
})();

// 正式評分紀錄（依帳號分開存放在 localStorage）
var GRADING_STORAGE_PREFIX = 'francis_grading_records_standard_';
var GRADING_MAX_RECORDS    = 300;

// =====================================================
//  執行計時（「執行」與「正式評分」共用）
//  執行期間在試題內容視窗顯示動畫與倒數；超過 RUN_TIMEOUT_MS 仍未完成（也沒有出錯）就強制停止。
//  考生在輸入視窗（prompt）輸入資料的期間暫停計時。
//  迴圈積木會插入 __runGuard() 檢查（INFINITE_LOOP_TRAP），無窮迴圈也能在時間到時停止。
// =====================================================
var RUN_TIMEOUT_MS = 20000;   // 執行時間上限（毫秒）

var RunWatch = (function () {
	var RING_LEN = 2 * Math.PI * 28;   // 倒數圓環周長（r = 28）
	var run = null;   // { start, paused, pauseAt, done, onTimeout, onStop, timer, el }

	// 執行期間鎖定鍵盤（滑鼠由全螢幕遮罩擋住），避免操作積木或重複按按鈕
	// 例外：Esc 等同按「立即停止」
	function keyBlocker(e) {
		e.stopPropagation(); e.preventDefault();
		if (e.type === 'keydown' && e.key === 'Escape') stop();
	}
	function lockKeys(on) {
		['keydown', 'keyup', 'keypress'].forEach(function (t) {
			if (on) document.addEventListener(t, keyBlocker, true);
			else document.removeEventListener(t, keyBlocker, true);
		});
	}

	function elapsed() {
		if (!run) return 0;
		var paused = run.paused + (run.pauseAt ? Date.now() - run.pauseAt : 0);
		return Date.now() - run.start - paused;
	}

	function render() {
		if (!run || !run.el) return;
		var left = Math.max(0, RUN_TIMEOUT_MS - elapsed());
		var sec = Math.ceil(left / 1000);
		var el = run.el;
		el.querySelector('.rw-sec').textContent = sec;
		var fg = el.querySelector('.rw-ring-fg');
		fg.style.strokeDashoffset = String(RING_LEN * (1 - left / RUN_TIMEOUT_MS));
		fg.classList.toggle('rw-warn', sec <= 5);
		el.querySelector('.rw-sub').textContent = run.pauseAt
			? '等待輸入資料中（暫停計時）'
			: '剩餘 ' + sec + ' 秒，超過 ' + Math.round(RUN_TIMEOUT_MS / 1000) + ' 秒將強制停止';
		el.classList.toggle('rw-paused', !!run.pauseAt);
	}

	function tick() {
		if (!run) return;
		if (!run.pauseAt && elapsed() >= RUN_TIMEOUT_MS) { timeout(); return; }
		render();
	}

	function finish() {
		if (!run) return;
		run.done = true;
		clearInterval(run.timer);
		if (run.el) run.el.remove();
		lockKeys(false);
		run = null;
	}

	// 考生按「立即停止」（或 Esc）：結束倒數並通知（只會觸發一次）
	function stop() {
		if (!run || run.done) return;
		var cb = run.onStop || run.onTimeout;
		finish();
		if (cb) { try { cb(); } catch (e) { console.error(e); } }
	}

	// 時間到：結束倒數並通知（只會觸發一次）
	function timeout() {
		if (!run || run.done) return;
		var cb = run.onTimeout;
		finish();
		if (cb) { try { cb(); } catch (e) { console.error(e); } }
	}

	// onStop：考生按「立即停止」時呼叫（省略時與逾時相同處理）
	function start(title, onTimeout, onStop) {
		finish();
		run = { start: Date.now(), paused: 0, pauseAt: 0, done: false, onTimeout: onTimeout, onStop: onStop, timer: null, el: null };
		// 全螢幕遮罩：執行期間整個畫面鎖定
		var host = document.body;
		var el = document.createElement('div');
		el.className = 'run-watch';
		el.setAttribute('role', 'alertdialog');
		el.setAttribute('aria-live', 'polite');
		el.innerHTML =
			'<div class="rw-card">' +
				'<div class="rw-dial">' +
					'<div class="rw-spin"></div>' +
					'<svg viewBox="0 0 64 64"><circle class="rw-ring-bg" cx="32" cy="32" r="28"></circle>' +
					'<circle class="rw-ring-fg" cx="32" cy="32" r="28" style="stroke-dasharray:' + RING_LEN + '"></circle></svg>' +
					'<div class="rw-sec"></div>' +
				'</div>' +
				'<div class="rw-title"></div>' +
				'<div class="rw-sub"></div>' +
				'<button type="button" class="rw-stop">■ 立即停止<small>（Esc）</small></button>' +
			'</div>';
		el.querySelector('.rw-title').textContent = title;
		el.querySelector('.rw-stop').addEventListener('click', function () { stop(); });
		host.appendChild(el);
		run.el = el;
		lockKeys(true);
		if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
		// 焦點移到「立即停止」按鈕：焦點若留在執行結果區（iframe）內，按 Esc 不會傳到這個頁面
		try { el.querySelector('.rw-stop').focus({ preventScroll: true }); } catch (e) {}
		run.timer = setInterval(tick, 200);
		render();
	}

	return {
		start: start,
		finish: finish,
		timeout: timeout,
		stop: stop,
		isActive: function () { return !!run; },
		// 考生輸入資料期間暫停計時
		pause: function (on) {
			if (!run) return;
			if (on && !run.pauseAt) run.pauseAt = Date.now();
			else if (!on && run.pauseAt) { run.paused += Date.now() - run.pauseAt; run.pauseAt = 0; }
			render();
		},
		// 迴圈中呼叫：超過時間就丟出例外結束程式（主執行緒被迴圈佔住時，計時器無法觸發，只能靠這裡檢查）
		guard: function () {
			if (run && !run.pauseAt && elapsed() >= RUN_TIMEOUT_MS) {
				setTimeout(timeout, 0);
				throw new Error('__RUN_TIMEOUT__');
			}
		}
	};
})();
window.__runGuard = function () { RunWatch.guard(); };
window.__runPause = function (on) { RunWatch.pause(on); };

// 每個迴圈積木（重複、當…重複、計數、清單逐項）產生的程式碼都會加上這一行檢查
Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (window.parent && window.parent.__runGuard) window.parent.__runGuard();\n';

// 執行錯誤時給考生的簡單原因提示
function runErrorHint(msg) {
	msg = String(msg || '');
	if (/is not defined/.test(msg))                       return '使用了不存在的變數或函式，請檢查變數名稱是否正確、是否已經設定過值。';
	if (/Cannot read prop|of undefined|of null/.test(msg)) return '使用了沒有值的資料（例如清單中不存在的項目），請檢查變數是否已設定、清單位置是否超出範圍。';
	if (/is not a function/.test(msg))                    return '把不是函式的資料當成函式使用，請檢查積木的組合。';
	if (/call stack/i.test(msg))                          return '函式一直呼叫自己沒有停止（遞迴沒有結束條件）。';
	if (/Invalid array length/.test(msg))                 return '清單長度設定錯誤（例如負數或太大的數）。';
	return '請檢查積木的組合、變數的值與資料型態（例如把文字當成數字計算）。';
}
function runStoppedHint() {
	return '程式在執行完成前被停止。若程式一直沒有結束，請檢查迴圈的結束條件，或程式是否在等待輸入資料。';
}
function runTimeoutHint() {
	return '程式在 ' + Math.round(RUN_TIMEOUT_MS / 1000) + ' 秒內沒有執行完成。可能原因：迴圈的結束條件一直不成立（無窮迴圈）、重複次數太多，或等待（延遲）的時間太長。';
}

// =====================================================
//  考生登錄（鎖定畫面）
//  開啟首頁即鎖定畫面，考生輸入「登錄帳號」、「競賽代碼」與「試題代碼」後送出。
//  競賽代碼 = 加密試題的解密金鑰：系統逐一嘗試解密 list.js 中的每個題庫檔，
//  能正確解密者加入題庫下拉選單；全部無法解密則提示競賽代碼錯誤。
//  試題代碼 = 6 位數字，由「試題抽籤與代碼.html」以競賽代碼產生，記錄 1～12 題中抽中哪幾題：
//  各題庫只保留這些題號的題目，其他題目不顯示、不能匯入。
//  加密檔格式（由 exam/encrypt.html 產生）：var encryptedExam = "密文";
// =====================================================
var ExamLogin = (function () {
	var EXAM_DIR      = 'exam/';            // 題庫資料夾（與原本 loadExam 相同）
	var ENCRYPTED_VAR = 'encryptedExam';    // 加密檔中的密文變數名稱
	var DEFAULT_ACCOUNT  = 'kh001';         // 登錄畫面預設帳號（不需要時改為 ''）
	var DEFAULT_PASSWORD = '0000';          // 登錄畫面預設競賽代碼（不需要時改為 ''）
	// 登錄畫面預設試題代碼（此為競賽代碼 0000、第 1～6 題的代碼，不需要時改為 ''）
	var DEFAULT_QUESTION_CODE = '790180';

	var unlocked = null;      // [{ name, file, contest }]，登錄成功後才有值
	var account  = '';
	var resetReason = '';     // 'account'：與上一位帳號不同且考生同意清除資料
	var callbacks = [];
	var overlay, docKeyBlocker;

	function examUrl(file) {
		return EXAM_DIR + file.split('/').map(encodeURIComponent).join('/');
	}

	// ---------- 讀取加密檔中的密文 ----------
	// 線上版用 fetch；本機 file:// 被瀏覽器阻擋時，改在隱藏 iframe 以 <script> 載入
	var cipherCache = {};
	function readCipher(file) {
		if (cipherCache[file]) return Promise.resolve(cipherCache[file]);
		var url = examUrl(file);
		return fetch(url, { cache: 'no-cache' })
			.then(function (res) {
				if (!res.ok) throw new Error('讀取 ' + file + ' 失敗：' + res.status);
				return res.text();
			})
			.then(function (code) {
				return new Function(code + '\n;return (typeof ' + ENCRYPTED_VAR + ' !== "undefined") ? ' + ENCRYPTED_VAR + ' : undefined;')();
			})
			.catch(function (err) {
				console.warn('線上版讀取失敗，改用離線版載入：', err);
				return readCipherByScript(url, file);
			})
			.then(function (cipher) {
				if (typeof cipher !== 'string' || !cipher) throw new Error(file + ' 不是加密題庫檔（找不到 ' + ENCRYPTED_VAR + '）');
				cipherCache[file] = cipher;
				return cipher;
			});
	}

	function readCipherByScript(url, file) {
		return new Promise(function (resolve, reject) {
			var frame = document.createElement('iframe');
			frame.style.display = 'none';
			document.body.appendChild(frame);
			var win = frame.contentWindow, doc = win.document;
			doc.open();
			doc.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>');
			doc.close();
			var cleanup = function () { setTimeout(function () { frame.remove(); }, 0); };
			var s = doc.createElement('script');
			s.src = new URL(url, location.href).href + '?t=' + Date.now();
			s.charset = 'utf-8';
			s.onload = function () {
				var c;
				try { c = win[ENCRYPTED_VAR]; } catch (e) {}
				cleanup();
				resolve(c);
			};
			s.onerror = function () { cleanup(); reject(new Error('讀取 ' + file + ' 失敗（找不到檔案）')); };
			doc.head.appendChild(s);
		});
	}

	// ---------- 用金鑰解密並取出 contest ----------
	// 金鑰錯誤時 CryptoJS 會產生亂碼（通常丟出 Malformed UTF-8 或得到空字串），
	// 另外再執行解密後的程式碼並確認得到字串 contest，才算解密成功。
	function tryDecrypt(cipher, key) {
		var code;
		try { code = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8); }
		catch (e) { return null; }
		if (!code) return null;
		try {
			var contest = new Function(code + '\n;return (typeof contest !== "undefined") ? contest : undefined;')();
			return (typeof contest === 'string') ? contest : null;
		} catch (e) {
			return null;
		}
	}

	// ===== 試題代碼（與「試題抽籤與代碼.html」的演算法必須完全相同）=====
	// 12 題的抽中狀態（12 位元）＋檢查碼，以競賽代碼打亂後成為 6 位數字
	var QC_TOTAL = 12, QC_CHK = 244;   // 4096 × 244 = 999424 < 1000000
	function qcHash(str) {
		var h = 0x811c9dc5, s = unescape(encodeURIComponent(str));
		for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
		h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0;
		h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0;
		h ^= h >>> 16; return h >>> 0;
	}
	function qcRound(key, i, x) { return qcHash('QC|' + key + '|' + i + '|' + x) % 1000; }
	function qcUnmix(v, key) {
		var L = Math.floor(v / 1000), R = v % 1000;
		for (var i = 3; i >= 0; i--) { var t = L; L = (R - qcRound(key, i, t) + 1000) % 1000; R = t; }
		return L * 1000 + R;
	}
	function qcCheck(key, m) { return qcHash('CHK|' + key + '|' + m) % QC_CHK; }

	// 以競賽代碼還原試題代碼，回傳題號字串陣列（例如 ["1","2","4","6"]）；代碼錯誤回傳 null
	function decryptQuestionCode(code, key) {
		key = String(key).trim();
		code = String(code).replace(/[０-９]/g, function (d) { return String.fromCharCode(d.charCodeAt(0) - 0xFEE0); })
			.replace(/\s+/g, '');
		if (!/^\d{6}$/.test(code)) return null;
		var v = qcUnmix(Number(code), key);
		var m = Math.floor(v / QC_CHK), c = v % QC_CHK;
		if (m <= 0 || m >= (1 << QC_TOTAL) || c !== qcCheck(key, m)) return null;
		var nos = [];
		for (var n = 1; n <= QC_TOTAL; n++) if (m & (1 << (n - 1))) nos.push(String(n));
		return nos;
	}

	// 題庫內容只保留指定題號的題目列（題目列中含有 data-no 的「匯入題目」按鈕）
	function filterContest(contest, nos) {
		var tpl = document.createElement('template');
		tpl.innerHTML = contest;
		var kept = 0;
		tpl.content.querySelectorAll('.import-question-button[data-no]').forEach(function (btn) {
			var no = String(Number(btn.getAttribute('data-no')));
			if (nos.indexOf(no) >= 0) { kept++; return; }
			var row = btn.closest('tr');
			if (row) row.remove(); else btn.remove();
		});
		return { html: tpl.innerHTML, kept: kept };
	}

	function verify(key) {
		if (typeof examList === 'undefined' || !Array.isArray(examList) || !examList.length) {
			return Promise.reject(new Error('找不到題庫清單（exam/list.js）'));
		}
		// CryptoJS 由 index.html 的 <script src="js/aes.js"> 載入，直接使用
		if (typeof CryptoJS === 'undefined' || !CryptoJS.AES) {
			return Promise.reject(new Error('找不到 CryptoJS，請確認 index.html 已載入 js/aes.js'));
		}
		return Promise.resolve().then(function () {
			var found = [], readErrors = 0;
			// 依 list.js 順序逐一嘗試，保持下拉選單順序
			return examList.reduce(function (p, exam) {
				return p.then(function () {
					return readCipher(exam.file).then(function (cipher) {
						var contest = tryDecrypt(cipher, key);
						if (contest !== null) found.push({ name: exam.name, file: exam.file, contest: contest });
					}, function (err) {
						readErrors++;
						console.warn(err);
					});
				});
			}, Promise.resolve()).then(function () {
				if (!found.length && readErrors === examList.length) throw new Error('無法讀取題庫檔，請確認 exam 資料夾');
				return found;
			});
		});
	}

	// ---------- 鎖定畫面 ----------
	function buildOverlay() {
		var css = document.createElement('style');
		css.textContent =
			'#examLoginOverlay{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;' +
			'background:rgba(30,38,58,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);' +
			'font-family:"Microsoft JhengHei","PingFang TC","Noto Sans TC",sans-serif;}' +
			'#examLoginOverlay .el-box{width:min(380px,92vw);background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.35);}' +
			'#examLoginOverlay .el-head{background:linear-gradient(135deg,#4a5d85,#66709a);color:#fff;padding:18px 22px;font-size:20px;font-weight:bold;letter-spacing:2px;}' +
			'#examLoginOverlay .el-head small{display:block;font-size:13px;font-weight:normal;opacity:.85;letter-spacing:0;margin-top:4px;}' +
			'#examLoginOverlay form{padding:18px 22px 22px;margin:0;}' +
			'#examLoginOverlay label{display:block;font-size:15px;font-weight:bold;color:#374151;margin:10px 0 6px;}' +
			'#examLoginOverlay input{width:100%;box-sizing:border-box;padding:10px 12px;font-size:16px;border:1px solid #c7d2fe;border-radius:8px;outline:none;}' +
			'#examLoginOverlay input:focus{border-color:#7d8bb0;box-shadow:0 0 0 3px rgba(125,139,176,.25);}' +
			'#examLoginOverlay input.el-code{font-family:Consolas,Menlo,"Courier New",monospace;font-size:20px;letter-spacing:6px;}' +
			'#examLoginOverlay input.el-bad{border-color:#dc2626;background:#fef2f2;}' +
			'#examLoginOverlay .el-msg{min-height:22px;margin:12px 0 4px;font-size:14px;color:#dc2626;}' +
			'#examLoginOverlay .el-msg.el-wait{color:#4a5d85;}' +
			'#examLoginOverlay button{width:100%;padding:11px;font-size:17px;font-weight:bold;letter-spacing:4px;color:#fff;background:#4a5d85;border:0;border-radius:8px;cursor:pointer;}' +
			'#examLoginOverlay button:hover:not(:disabled){background:#3b4b6e;}' +
			'#examLoginOverlay button:disabled{background:#a5afc8;cursor:wait;}' +
			'#examLoginOverlay .el-confirm{padding:20px 22px 22px;}' +
			'#examLoginOverlay .el-confirm-text{font-size:15px;line-height:1.8;color:#374151;margin-bottom:14px;}' +
			'#examLoginOverlay .el-confirm-text b{color:#4a5d85;}' +
			'#examLoginOverlay .el-confirm-warn{display:block;margin-top:8px;padding:8px 10px;border-radius:6px;background:#fef2f2;color:#b91c1c;font-size:14px;}' +
			'#examLoginOverlay button.el-danger{background:#dc2626;letter-spacing:1px;margin-bottom:8px;}' +
			'#examLoginOverlay button.el-danger:hover{background:#b91c1c;}' +
			'#examLoginOverlay button.el-cancel{background:#fff;color:#4a5d85;border:1px solid #7d8bb0;letter-spacing:1px;}' +
			'#examLoginOverlay button.el-cancel:hover{background:#eef1f8;}' +
			'#examLoginBadge{position:fixed;right:10px;bottom:10px;z-index:2147482000;background:rgba(74,93,133,.92);color:#fff;font-size:13px;' +
			'padding:4px 12px;border-radius:999px;font-family:"Microsoft JhengHei","PingFang TC","Noto Sans TC",sans-serif;pointer-events:none;}';
		document.head.appendChild(css);

		overlay = document.createElement('div');
		overlay.id = 'examLoginOverlay';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');
		overlay.innerHTML =
			'<div class="el-box">' +
				'<div class="el-head">考生登錄<small>請輸入登錄帳號、競賽代碼與試題代碼後送出</small></div>' +
				'<form id="examLoginForm" autocomplete="off" novalidate>' +
					'<label for="examLoginAccount">登錄帳號</label>' +
					'<input id="examLoginAccount" type="text" autocomplete="off" spellcheck="false" class="el-code">' +
					'<label for="examLoginPassword">競賽代碼</label>' +
					'<input id="examLoginPassword" type="text" autocomplete="off" spellcheck="false" class="el-code">' +
					'<label for="examLoginQuestionCode">試題代碼</label>' +
					'<input id="examLoginQuestionCode" type="text" inputmode="numeric" placeholder="6 位數字" autocomplete="off" spellcheck="false" class="el-code">' +
					'<div class="el-msg" id="examLoginMsg" aria-live="polite"></div>' +
					'<button type="submit" id="examLoginSubmit">送出</button>' +
				'</form>' +
			'</div>';
		document.body.appendChild(overlay);

		// 鎖定期間攔截所有鍵盤事件，避免操作到底下的 Blockly 工作區
		docKeyBlocker = function (e) {
			if (!overlay.contains(e.target)) { e.stopPropagation(); e.preventDefault(); }
		};
		['keydown', 'keyup', 'keypress'].forEach(function (t) { document.addEventListener(t, docKeyBlocker, true); });

		var accEl = overlay.querySelector('#examLoginAccount');
		var pwdEl = overlay.querySelector('#examLoginPassword');
		var qcEl  = overlay.querySelector('#examLoginQuestionCode');
		accEl.value = DEFAULT_ACCOUNT;
		pwdEl.value = DEFAULT_PASSWORD;
		qcEl.value  = DEFAULT_QUESTION_CODE;
		var msgEl = overlay.querySelector('#examLoginMsg');
		var btnEl = overlay.querySelector('#examLoginSubmit');
		var setMsg = function (t, wait) { msgEl.textContent = t; msgEl.className = 'el-msg' + (wait ? ' el-wait' : ''); };
		var setDisabled = function (on) { btnEl.disabled = on; accEl.disabled = on; pwdEl.disabled = on; qcEl.disabled = on; };

		[accEl, pwdEl, qcEl].forEach(function (el) {
			el.addEventListener('input', function () { el.classList.remove('el-bad'); setMsg(''); });
		});

		overlay.querySelector('#examLoginForm').addEventListener('submit', function (e) {
			e.preventDefault();
			var acc = accEl.value.trim();
			var pwd = pwdEl.value;
			var qc  = qcEl.value.trim();
			accEl.classList.toggle('el-bad', !acc);
			pwdEl.classList.toggle('el-bad', !pwd);
			qcEl.classList.toggle('el-bad', !qc);
			if (!acc || !pwd || !qc) {
				var miss = [!acc && '登錄帳號', !pwd && '競賽代碼', !qc && '試題代碼'].filter(Boolean);
				setMsg('請輸入' + miss.join('、'));
				(!acc ? accEl : !pwd ? pwdEl : qcEl).focus();
				return;
			}
			setDisabled(true);
			setMsg('驗證中，請稍候…', true);
			var badField = null;   // 驗證失敗時要清空並重新輸入的欄位
			verify(pwd).then(function (list) {
				if (!list.length) {
					setMsg('競賽代碼輸入錯誤，請重新輸入');
					pwdEl.classList.add('el-bad');
					badField = pwdEl;
					return;
				}
				// 試題代碼：以競賽代碼解密取得題號，各題庫只保留這些題目
				var nos = decryptQuestionCode(qc, pwd);
				var kept = 0;
				if (nos) {
					list = list.map(function (exam) {
						var f = filterContest(exam.contest, nos);
						kept += f.kept;
						return { name: exam.name, file: exam.file, contest: f.html };
					});
				}
				if (!nos || !kept) {
					setMsg('試題代碼輸入錯誤，請重新輸入');
					qcEl.classList.add('el-bad');
					badField = qcEl;
					return;
				}
				var lastAcc = '';
				try { lastAcc = localStorage.getItem(LAST_ACCOUNT_KEY) || ''; } catch (e2) {}
				if (lastAcc && lastAcc !== acc) {
					// 與上一位登錄帳號不同：不論間隔多久都先詢問，同意才清除資料並登錄
					return askAccountSwitch(lastAcc, acc).then(function (ok) {
						if (ok) {
							resetReason = 'account';
							unlock(acc, list, pwd, nos);
						} else {
							setMsg('已取消登錄，請重新輸入登錄帳號、競賽代碼與試題代碼');
							setTimeout(function () { accEl.focus(); accEl.select(); }, 0);
						}
					});
				}
				unlock(acc, list, pwd, nos);
			}, function (err) {
				console.error(err);
				setMsg(err.message || '驗證失敗');
			}).then(function () {
				if (!unlocked) {
					setDisabled(false);
					if (badField) { badField.value = ''; badField.focus(); }
					else if (!resetReason && msgEl.textContent.indexOf('已取消') !== 0) pwdEl.focus();
				}
			});
		});

		setTimeout(function () { accEl.focus(); accEl.select(); }, 0);
	}

	// 在登錄視窗內顯示「帳號不同」確認畫面；回傳 Promise<boolean>（true＝清除資料並登錄）
	function askAccountSwitch(lastAcc, acc) {
		return new Promise(function (resolve) {
			var form = overlay.querySelector('#examLoginForm');
			var panel = document.createElement('div');
			panel.className = 'el-confirm';
			panel.innerHTML =
				'<div class="el-confirm-text">此電腦上一位登錄的帳號是 <b class="el-prev"></b>，' +
				'與本次登錄的帳號 <b class="el-now"></b> 不同。' +
				'<span class="el-confirm-warn">繼續登錄將清除工作區積木、試題內容與所有評分紀錄，且無法復原。</span></div>' +
				'<button type="button" class="el-danger">清除資料並登錄</button>' +
				'<button type="button" class="el-cancel">取消，回到登錄畫面</button>';
			panel.querySelector('.el-prev').textContent = lastAcc;
			panel.querySelector('.el-now').textContent = acc;
			form.style.display = 'none';
			form.parentNode.appendChild(panel);
			var done = function (ok) {
				panel.remove();
				form.style.display = '';
				resolve(ok);
			};
			panel.querySelector('.el-danger').addEventListener('click', function () { done(true); });
			panel.querySelector('.el-cancel').addEventListener('click', function () { done(false); });
			setTimeout(function () { panel.querySelector('.el-cancel').focus(); }, 0);   // 預設焦點在「取消」
		});
	}

	function unlock(acc, list, key, nos) {
		account = acc;
		examAccount = acc;   // 全域變數：登錄帳號
		examKey = key;       // 全域變數：競賽代碼（加密／解密積木結構檔用）
		examAllowedNos = nos || [];   // 全域變數：試題代碼中的題號
		try { localStorage.setItem(LAST_ACCOUNT_KEY, acc); } catch (e) {}
		unlocked = list;
		['keydown', 'keyup', 'keypress'].forEach(function (t) { document.removeEventListener(t, docKeyBlocker, true); });
		overlay.remove();
		overlay = null;

		var badge = document.createElement('div');
		badge.id = 'examLoginBadge';
		badge.textContent = '考生：' + acc;
		document.body.appendChild(badge);

		callbacks.splice(0).forEach(function (cb) {
			try { cb(unlocked); } catch (e) { console.error(e); }
		});
	}

	// 先於主程式的 DOMContentLoaded 註冊，確保開啟首頁就先鎖定畫面
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildOverlay);
	else buildOverlay();

	return {
		// 登錄成功後呼叫 cb(list)；若已登錄則立即呼叫
		onUnlock: function (cb) { unlocked ? cb(unlocked) : callbacks.push(cb); },
		getExams: function () { return unlocked ? unlocked.slice() : []; },
		getAccount: function () { return account; },
		isUnlocked: function () { return !!unlocked; },
		resetReason: function () { return resetReason; }
	};
})();

document.addEventListener('DOMContentLoaded', function() {

	function loadToolbox(renderer, categorySystem, scale) {
		category = [
			categorySystem
		];
	
		var xmlToolbox='<xml id="toolbox">';
		try {
			for (var i=0;i<category.length;i++){
				category[i] = category[i].replace(/\<category /g, "<category expanded=\"false\" ");
				var xml = new DOMParser().parseFromString(category[i],"text/xml");
				xmlToolbox+=new XMLSerializer().serializeToString(xml.firstChild).replace("<xml>","").replace("</xml>","");
			}
		} catch (error) {
			console.log(error);
		}		
		xmlToolbox+='</xml>';

		if (renderer=="zelos") {
			registerContinuoutToolboxCustomFlyout();
			
			workspace = Blockly.inject('root',{
					renderer: 'zelos'
					,theme: 'zelos'				
					,media: 'media/'
					,toolbox: xmlToolbox
					,grid:{spacing: 20,length: 3,colour: '#eee',snap: true}
					,zoom:{controls: true, wheel: false, startScale: scale, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2}
					,trashcan: true
					,move:{
						scrollbars: {
						  horizontal: true,
						  vertical: true
						},
						drag: true,
						wheel: true
					}			
					,plugins: {
					  'flyoutsVerticalToolbox': ContinuousFlyout,
					  'toolbox': ContinuousToolbox,	
					  'metricsManager': ContinuousMetrics,
					}
				});
		} else {
			workspace = Blockly.inject('root',{
					renderer: renderer
					,theme: 'classic'
					,media: 'media/'
					,toolbox: xmlToolbox
					,grid:{spacing: 20,length: 3,colour: '#eee',snap: true}
					,zoom:{controls: true, wheel: false, startScale: scale, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2}
					,trashcan: true
					,move:{
						scrollbars: {
						  horizontal: true,
						  vertical: true
						},
						drag: true,
						wheel: true
					}			
				}
			);	
		}
		
		function onWorkspaceChanged(event) {
			const targetWorkspace = Blockly.getMainWorkspace();
			
			if (event.type === Blockly.Events.BLOCK_DELETE) {
				handleBlockDelete(event);
			}
			
			const allowedTypes = [
				Blockly.Events.BLOCK_CREATE,
				Blockly.Events.BLOCK_DELETE,
				Blockly.Events.BLOCK_MOVE,
				Blockly.Events.BLOCK_CHANGE,
				Blockly.Events.VAR_CREATE,
				Blockly.Events.VAR_DELETE,
				Blockly.Events.VAR_RENAME,
				Blockly.Events.FINISHED_LOADING
			];

			// 只有積木變動才重新計時；點選、捲動等 UI 事件不可取消尚未執行的更新
			if (allowedTypes.includes(event.type)) {
			clearTimeout(workspaceChangeTimer);
			var eventIsScratch = scratchStyle;   // 事件發生當下的外觀
			workspaceChangeTimer = setTimeout(function(){
				// 250ms 內已切換外觀：舊工作區的內容不可再寫入暫存變數（否則會存進另一區）
				if (targetWorkspace !== workspace || eventIsScratch !== scratchStyle) return;
				{
					if (scratchStyle) {
						xmlScratch = Blockly.Xml.workspaceToDom(targetWorkspace);
						xmlScratch = Blockly.Xml.domToText(xmlScratch);
					} else {	
						xmlBlockly = Blockly.Xml.workspaceToDom(targetWorkspace);
						xmlBlockly = Blockly.Xml.domToText(xmlBlockly);
					}
				}
			}, 250);
			}
		
			if (event.type === Blockly.Events.MOVE || event.type === Blockly.Events.BLOCK_DRAG) {
					clearTimeout(blockChangeTimer);
					blockChangeTimer = setTimeout(function(){
						let eventBlock = targetWorkspace.getBlockById(event.blockId);
						if (eventBlock){
							eventBlock.bringToFront();
							var blocks = [
							  ...this.workspace.getBlocksByType("javascript_variable_ns_scratch"),
							  ...this.workspace.getBlocksByType("javascript_variable_boolean_scratch")
							];
							blocks.forEach(block => {
								if (block)
									checkArgVariableRootBlock(block);
							});
						}
					}, 1000);
			} else if (event.type==Blockly.Events.CREATE) {
				let eventBlock = targetWorkspace.getBlockById(event.blockId);
				if (eventBlock) {
					if (eventBlock.type == "procedures_defnoreturn" || eventBlock.type == "procedures_defreturn") {
						targetWorkspace.getToolbox().refreshSelection();
					}
				}
			} else if (event.type==Blockly.Events.DELETE) {
				if (event.oldJson.type == "procedures_defnoreturn" || event.oldJson.type == "procedures_defreturn") {
					targetWorkspace.getToolbox().refreshSelection();
				}
			}			
		}
		workspace.addChangeListener(onWorkspaceChanged);

		// 工作區積木有變動時（非 UI 事件），停手 3 秒後自動存到瀏覽器
		var thisWorkspace = workspace;
		workspace.addChangeListener(function (event) {
			if (event.isUiEvent) return;
			if (thisWorkspace !== workspace) return;   // 已切換外觀、舊工作區不再儲存
			clearTimeout(workspaceSaveTimer);
			workspaceSaveTimer = setTimeout(saveWorkspaceToStorage, 3000);
		});
		
		function handleBlockDelete(event) {
			const deletedXml = event.oldXml;
			if (!deletedXml) {
				return;
			}

			const blockType = deletedXml.getAttribute('type');

			if (blockType === "javascript_procedures_defnoreturn_scratch") {
				const nameField = deletedXml.querySelector('field[name="NAME"]');
				if (!nameField) return;
				
				var workspaceXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
				const mutation = deletedXml.querySelector('mutation');

				Blockly.Events.setGroup(true);
				try {
					if (mutation) {
						var ns = workspace.getBlocksByType("javascript_variable_ns_scratch");
						var b = workspace.getBlocksByType("javascript_variable_boolean_scratch");
						
						const args = mutation.getElementsByTagName('arg');
						for (let i = 0; i < args.length; i++) {
							workspace.deleteVariableById(args[i].getAttribute('varid'));
							
							const varId = args[i].getAttribute('varid');
							const varName = args[i].getAttribute('name');
							const varType = args[i].getAttribute('type');
							
							for (let j=0;j<ns.length;j++) {
								if ("arg_"+ns[j].getFieldValue("variableName")==varName)
									safeDisposeBlock(ns[j]);
							}
							for (let k=0;k<b.length;k++) {
								if ("arg_"+b[k].getFieldValue("variableName")==varName)
									safeDisposeBlock(b[k]);
							}
						}
					}
					
					workspace.getToolbox().refreshSelection();
					workspace.getToolbox().clearSelection();
				} finally {
					Blockly.Events.setGroup(false);
					workspace.render();
				}
			}
		}
		
		function checkArgVariableRootBlock(block) {
			const topBlock = block.getRootBlock(true);
			if (topBlock) {
				// 不在這裡 bringToFront：會把參數積木所在的整串積木拉到最上層，蓋過剛放下的積木
				if (topBlock.type == 'javascript_procedures_defnoreturn_scratch') {
					let argNames = topBlock.arguments_||[];
					for (let i = 0; i < argNames.length; i++) {
						if (argNames[i]=="arg_"+block.getFieldValue("variableName")) {
							block.setWarningText(null);
							return;
						}
					}
				}
				/*
				if (topBlock.type !== 'javascript_procedures_defnoreturn_scratch') {
					try {
						const outputConn = block.outputConnection;
						if (outputConn && outputConn.targetConnection) {
						  const parentConn = outputConn.targetConnection;
						  parentConn.disconnect();
						}
					} finally {
						block.bringToFront();
					}
				}
				*/
			}
			block.setWarningText(Blockly.Msg["JAVASCRIPT_CONNECT_MESSAGE_SCRATCH"]);
		}		
		


		handleFlyoutDoubleClick();
		workspace.scrollCenter();		
		
		return workspace;
	}
	window.loadToolbox = loadToolbox;
	
	function safeDisposeBlock(block, withEvent = false) {
	  if (!block) return;
	  
	  if (block.getParent()) {
		block.unplug(false);
	  }

	  block.inputList.forEach(input => {
		if (input.connection && input.connection.targetBlock()) {
		  input.connection.targetBlock().unplug();
		}
	  });

	  if (block.outputConnection && block.outputConnection.targetConnection) {
		block.outputConnection.disconnect();
	  }

	  block.dispose(withEvent);
	}	
	
	function handleFlyoutDoubleClick(){
		var blocklyWorkspace = document.getElementsByClassName("blocklyFlyout");
		for (var f=0;f<blocklyWorkspace.length;f++) {
			blocklyWorkspace[f].addEventListener('dblclick', function(){ 
				Blockly.hideChaff();
			});
		}
	}
	
	function registerContinuoutToolboxCustomFlyout() {
		registerMyVariable();
		registerMyLists();
		registerMyFunction();
		
		Blockly.Flyout.prototype.getDynamicCategoryContents = function(a){
			this.workspace_.targetWorkspace.toolboxCategoryCallbacks.set('MYVARIABLE' ,Blockly.myvariable.flyoutCategory);
			this.workspace_.targetWorkspace.toolboxCategoryCallbacks.set('MYLIST' ,Blockly.mylist.flyoutCategory);
			this.workspace_.targetWorkspace.toolboxCategoryCallbacks.set('MYFUNCTION' ,Blockly.myfunction.flyoutCategory);		

			a=this.workspace_.targetWorkspace.getToolboxCategoryCallback(a);
			if("function"!==typeof a) {
				throw TypeError("Couldn't find a callback function when opening a toolbox category.");
				return null;
			} else
				return a(this.workspace_.targetWorkspace)
		}		
	}
	
	function registerMyVariable(){
		Blockly.myvariable = {};
		Blockly.MYVARIABLE_CATEGORY_NAME = "MYVARIABLE"; 
		Blockly.myvariable.CATEGORY_NAME = Blockly.MYVARIABLE_CATEGORY_NAME; 
		Blockly.myvariable.NAME_TYPE=Blockly.MYVARIABLE_CATEGORY_NAME;

		Blockly.myvariable.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_VARIABLE_OTHER}");
			btn.setAttribute("callbackKey","CREATE_MYVARIABLE");
			
			workspace.registerButtonCallback("CREATE_MYVARIABLE", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				currentWorkspace.eventHistory = [];
				Blockly.Variables.createVariableButtonHandler(currentWorkspace, null, 'other');			
			});
			blocks.push(btn);
			
			const variables = workspace.getVariablesOfType("other");
			if (variables.length > 0) {
				const latestVariable = variables[variables.length - 1];

				if (Blockly.Blocks['variables_get_other']) {
					variables.sort(Blockly.VariableModel.compareByName);

					for (const variable of variables) {
						const getBlock = Blockly.utils.xml.createElement('block');
						getBlock.setAttribute('type', 'variables_get_other');
						getBlock.setAttribute('gap', '8');
						
						getBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
						blocks.push(getBlock);
					}
				}
				
				if (Blockly.Blocks['variables_set_other']) {
					const listAddXml = '<block type="variables_set_other" gap="8"><field name="VAR" variabletype="other">'+latestVariable.name+'</field><value name="VALUE"><shadow type="text_noquotes"><field name="TEXT">0</field></shadow></value></block>';
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['math_change_other']) {
					const listAddXml = '<block type="math_change_other" gap="8"><field name="VAR" variabletype="other">'+latestVariable.name+'</field><value name="DELTA"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value></block>';
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));					
				}
			}

			return blocks;
		};

		function registerMyVariableCategory() {
			if (workspace) {
				var r = workspace.registerToolboxCategoryCallback(
					Blockly.MYVARIABLE_CATEGORY_NAME, 
					Blockly.myvariable.flyoutCategory
				);			
			} else {
				setTimeout(registerMyVariableCategory, 100);
			}
		}
		registerMyVariableCategory();
	}
	
	function registerMyLists(){
		Blockly.mylist = {};
		Blockly.MYLIST_CATEGORY_NAME = "MYLIST"; 
		Blockly.mylist.CATEGORY_NAME = Blockly.MYLIST_CATEGORY_NAME; 
		Blockly.mylist.NAME_TYPE=Blockly.MYLIST_CATEGORY_NAME;	

		Blockly.mylist.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_LIST}");
			btn.setAttribute("callbackKey","CREATE_MYLIST");
			
			workspace.registerButtonCallback("CREATE_MYLIST", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				currentWorkspace.eventHistory = [];
				Blockly.Variables.createVariableButtonHandler(currentWorkspace, null, 'Array');		
			});
			blocks.push(btn);
		
	
			const variables = workspace.getVariablesOfType("Array");
			if (variables.length > 0) {
				const latestVariable = variables[variables.length - 1];
				variables.sort(Blockly.VariableModel.compareByName);
			
				if (Blockly.Blocks['variables_get_array']) {
					for (const variable of variables) {
						const getBlock = Blockly.utils.xml.createElement('block');
						getBlock.setAttribute('type', 'variables_get_array');
						getBlock.setAttribute('gap', '24');
						
						getBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
						blocks.push(getBlock);
					}
				}
				
				if (Blockly.Blocks['list_addtolist_scratch']) {
					const listAddXml = '<block type="list_addtolist_scratch" gap="24"><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}	
				
				if (Blockly.Blocks['list_itemoflist_scratch']) {
					const listAddXml = '<block type="list_itemoflist_scratch" gap="24"><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_deletealloflist_scratch']) {
					const listAddXml = '<block type="list_deletealloflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}	

				if (Blockly.Blocks['list_lengthoflist_scratch']) {
					const listAddXml = '<block type="list_lengthoflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_insertatlist_scratch']) {
					const listAddXml = '<block type="list_insertatlist_scratch" gap="24"><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}	

				if (Blockly.Blocks['list_replaceitemoflist_scratch']) {
					const listAddXml = '<block type="list_replaceitemoflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_deleteoflist_scratch']) {
					const listAddXml = '<block type="list_deleteoflist_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="INDEX"><shadow type="text_noquotes"><field name="TEXT">1</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_listcontainsitem_scratch']) {
					const listAddXml = '<block type="list_listcontainsitem_scratch" gap="24"><field name="VAR" variabletype="Array">'+latestVariable.name+'</field><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}

				if (Blockly.Blocks['list_itemnumoflist_scratch']) {
					const listAddXml = '<block type="list_itemnumoflist_scratch" gap="24"><value name="ITEM"><shadow type="text_noquotes"><field name="TEXT">thing</field></shadow></value><field name="VAR" variabletype="Array">'+latestVariable.name+'</field></block>';
			
					blocks.push(Blockly.utils.xml.textToDom(listAddXml));
				}					
			}

			return blocks;
		};

		function registerMyListCategory() {
			if (workspace) {
				workspace.registerToolboxCategoryCallback(
					Blockly.MYLIST_CATEGORY_NAME, 
					Blockly.mylist.flyoutCategory
				);				
			} else {
				setTimeout(registerMyListCategory, 100);
			}
		}
		registerMyListCategory();
	}
	
	const paramContainer = document.getElementById('paramListContainer');
	
	function registerMyFunction(){
		Blockly.myfunction = {};
		Blockly.MYFUNCTION_CATEGORY_NAME = "MYFUNCTION"; 
		Blockly.myfunction.CATEGORY_NAME = Blockly.MYFUNCTION_CATEGORY_NAME; 
		Blockly.myfunction.NAME_TYPE=Blockly.MYFUNCTION_CATEGORY_NAME;	

		Blockly.myfunction.flyoutCategory = function(workspace) {
			var blocks = [];
			const btn = document.createElement("button");
			btn.setAttribute("text","%{BKY_NEW_FUNCTION}");
			btn.setAttribute("callbackKey","CREATE_MYFUNCTION");
			
			workspace.registerButtonCallback("CREATE_MYFUNCTION", function(d) {
				const currentWorkspace = d.getTargetWorkspace();
				currentWorkspace.eventHistory = [];
				
				toggleCreateFunctionForm(1);
				
                if (subWorkspace)
                    subWorkspace.dispose();
				
                subWorkspace = Blockly.inject('createFunctionDiv', {
                    renderer: 'zelos'
                    ,grid:{spacing: 20,length: 3,colour: '#eee',snap: true}
                    ,zoom:{wheel: true, startScale: 1, maxScale: 1.8, minScale: 0.6, scaleSpeed: 1.2}
                    ,move:{
                        scrollbars: {
                          horizontal: false,
                          vertical: false
                        },
                        drag: true,
                        wheel: true
                    }						
                });
					
				subWorkspace.addChangeListener(function(event) {
					if (event.type == "viewport_change"||event.type == "create") {
						var blocks = subWorkspace.getAllBlocks();
						if (blocks.length==1)
							subWorkspace.centerOnBlock(blocks[0].id);
					} else if (event.type == "block_field_intermediate_change") {
						if (event.blockId) {
							var block = subWorkspace.getBlockById(event.blockId);
							createFunctionVariable[0] = block.getFieldValue("NAME");
						}
					}
				});
				
				createFunctionVariable = ["", []];
				createFunctionVariable[0] = Blockly.Msg["JAVASCRIPT_CREATE_BLOCKNAME_INPUT"];
				paramContainer.innerHTML = "";
				createFunctionBlock();
			});
			blocks.push(btn);
			
			var procedureBlocks = workspace.getBlocksByType("javascript_procedures_defnoreturn_scratch");
	
			for (var i=0;i<procedureBlocks.length;i++) {
				var procBlock = procedureBlocks[i];
				var varModels = procBlock.argumentVarModels_;

				var blockXml = '<block type="javascript_procedures_callnoreturn_scratch"><mutation name="'+procBlock.getFieldValue("NAME")+'">';
				varModels.forEach(function(variable) {
					blockXml += '<arg name="'+variable.name+'" type="'+variable.type+'"></arg>';			  
				});
				blockXml += '</mutation></block>';
				blocks.push(Blockly.utils.xml.textToDom(blockXml));
				
				varModels.forEach(function(variable) {
					if (variable.type=="NS") {
						if (Blockly.Blocks['javascript_variable_ns_scratch']) {
							blocks.push(Blockly.utils.xml.textToDom('<block type="javascript_variable_ns_scratch"><field name="variableName">'+variable.name.replace("arg_","")+'</field></block>'));
						}
					} else if (variable.type=="Boolean") {
						if (Blockly.Blocks['javascript_variable_boolean_scratch']) {
							blocks.push(Blockly.utils.xml.textToDom('<block type="javascript_variable_boolean_scratch"><field name="variableName">'+variable.name.replace("arg_","")+'</field></block>'));
						}
					}
				});
			}
			return blocks;
		};

		function registerMyFunctionCategory() {
			if (workspace) {
				workspace.registerToolboxCategoryCallback(
					Blockly.MYFUNCTION_CATEGORY_NAME, 
					Blockly.myfunction.flyoutCategory
				);				
			} else {
				setTimeout(registerMyFunctionCategory, 100);
			}
		}
		registerMyFunctionCategory();
	}
	
	function createFunctionBlock() {
		if (subWorkspace) {	
			subWorkspace.clear();		
			var xml = '<block type="javascript_createfunction_scratch"><field name="NAME">'+createFunctionVariable[0]+'</field></block>';
			var singleBlock = Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(xml), subWorkspace);

			for (var i=0;i<createFunctionVariable[1].length;i++) {
				addBlockToInput(singleBlock, "INPUT_"+createFunctionVariable[1][i][0], createFunctionVariable[1][i]);
			}
		}
	}

	function addBlockToInput(block, inputName, fieldValue) {
		let customField;
		if (fieldValue[1]=="NS") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#FF8C1A',
				shapeType: 1
			});
		}
		else if (fieldValue[1]=="Boolean") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#4C97FF',
				shapeType: 2
			});
		} 
		else if (fieldValue[1]=="label") {
			customField = new FieldZelosInputBackground(fieldValue[0], null, {
				textColor: '#FFFFFF',
				backgroundColor: '#59C059',
				shapeType: 0
			});
		}
		
		if (customField && customField.setValidator) {
			const input_field = block.appendDummyInput(inputName).appendField(customField, 'TEXT');
			customField.setValidator(function(newValue) {
				var fieldTpye = "";
				if (this.backgroundStyle_==1)
					fieldTpye = "NS";
				else if (this.backgroundStyle_==2)
					fieldTpye = "Boolean";
				else if (this.backgroundStyle_==0)
					fieldTpye = "label";			
			
				const oldValue = this.getValue();

				if (newValue !== oldValue) {
					const index = createFunctionVariable[1].findIndex(item => {						
						return item[0] === oldValue&&item[1] === fieldTpye;
					});				
					
					if (index !== -1) {
						 createFunctionVariable[1][index][0] = newValue;
						 updateParamContainer(); 
					}
				}
				return newValue;
			});
		}
	}	

	function toggleCreateFunctionForm(show) {
		const formDiv = document.getElementById('createFunction');
		if (show) {
			formDiv.style.display = 'flex'; 			
		} else {
			formDiv.style.display = 'none';
		}
	}
	
	function createFunctionVariableExist(name) {
		const variableModels = workspace.getAllVariables();
		for (const variableModel of variableModels) {
			if (variableModel.name.toLowerCase() === "arg_" + name.toLowerCase()) {
				return true;
			}
		}
		return false;
	}	

	function hasDuplicateNull(dataArray) {
		const variableModels = workspace.getAllVariables();
		const variableNames = variableModels.map(variableModel => variableModel.name);
	
		if (Array.isArray(dataArray)) {
			for (var i = 0; i < dataArray.length - 1; i++) {
				for (var j = i + 1; j < dataArray.length; j++) {
					if (dataArray[i][0] === dataArray[j][0]&&dataArray[i][1]!="label"&&dataArray[j][1]!="label") {
						return Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"];
					}
				}
			}
		}
		if (Array.isArray(dataArray)) {
			for (var i = 0; i < dataArray.length - 1; i++) {
				if (dataArray[i][0].trim() == "") {
					return Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_NULL_SCRATCH"];
				} 
				else if (variableNames.includes("arg_"+dataArray[i][0])&&dataArray[i][1]!="label") {
					//return Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"];
				}
			}
		}
		return "";
	}	
	
    document.getElementById('confirmButton').addEventListener('click', () => {
		createFunctionVariable[0] = subWorkspace.getBlocksByType("javascript_createfunction_scratch")[0].getFieldValue("NAME");
		
		var functionBlocks = workspace.getBlocksByType("javascript_procedures_defnoreturn_scratch");
		for (var i=0;i<functionBlocks.length;i++) {
			if (functionBlocks[i].getFieldValue("NAME")==createFunctionVariable[0]) {
				alert(Blockly.Msg["JAVASCRIPT_CREATE_FUNCTION_EXIST_SCRATCH"]);
				//return;
			}
		}
		
		var message = hasDuplicateNull(createFunctionVariable[1]);
		if (message) {
			alert(message);
			return;
		}
		
        toggleCreateFunctionForm(false);
		
		var xml = '<block type="javascript_procedures_defnoreturn_scratch">\n'+
		'<mutation>\n';
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][0].trim()!=""&&createFunctionVariable[1][i][1]!="label")
				xml += '<arg name="'+"arg_"+createFunctionVariable[1][i][0]+'" varid="'+createFunctionVariable[1][i][2]+'" type="'+createFunctionVariable[1][i][1]+'"></arg>\n';
		}	
		xml += '</mutation>\n'+		
		'<field name="NAME">'+createFunctionVariable[0]+'</field>\n';
		var title = "";
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][0].trim()!=""&&createFunctionVariable[1][i][1]=="label")
				title += createFunctionVariable[1][i][0]+' ';
		}
		xml += '<field name="TITLE">'+title+'</field>\n';
		xml += '<comment pinned="false"></comment>\n'+
		'</block>';
		
		var domBlock = Blockly.utils.xml.textToDom(xml);
		var block = Blockly.Xml.domToBlock(domBlock, workspace);
			
		Blockly.Events.disable();
		try {
			workspace.getToolbox().refreshSelection();
			workspace.getToolbox().clearSelection();
		} catch (e) {
			console.error(e);
		} finally {
			Blockly.Events.enable();
			workspace.render();
			document.getElementById('javascript_content').style.display = "none";
		}
    });
	
    document.getElementById('cancelButton').addEventListener('click', () => {
        toggleCreateFunctionForm(false);
		
		workspace.getToolbox().clearSelection();
    });		
	
	function toggleImportQuestionForm(show) {
		const formDiv = document.getElementById('importQuestion');
		if (show) {
			formDiv.style.display = 'flex'; 			
		} else {
			formDiv.style.display = 'none';
		}
	}
	window.toggleImportQuestionForm	 = toggleImportQuestionForm;
	
    document.getElementById('button_question').addEventListener('click', () => {	
        toggleImportQuestionForm(true);
        fillExamSelect();
    });

    document.getElementById('importCancelButton').addEventListener('click', () => {
        toggleImportQuestionForm(false);
    });	
    
    document.getElementById('button_page').addEventListener('click', () => {
		window.location.href = "../";
    }); 
    
	// 訊息視窗嵌在「執行結果」下方：以 #javascript_content 的 has-console 類別控制顯示（高度比例見 index.html 的 CSS）
	function toggleConsoleForm(show) {
		const content = document.getElementById('javascript_content');
		if (!content) return;
		content.classList.toggle('has-console', !!show);
		if (show) {
			var div = document.getElementById('console_output');
			if (div) div.innerHTML = '';
		}
	}
	window.toggleConsoleForm = toggleConsoleForm;

    document.getElementById('consoleCancelButton').addEventListener('click', () => {
        toggleConsoleForm(false);
    });	

    // 訊息視窗：切換是否顯示輸入、輸出資料（隱藏時只留「輸出至訊息視窗」積木的訊息內容）
    // 只切換 CSS 類別，資料仍保留，可隨時切回顯示；設定在換題、重新執行時維持不變
    (function () {
        var btn = document.getElementById('consoleIoToggle');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var div = document.getElementById('console_output');
            if (!div) return;
            var hide = !div.classList.contains('hide-io');
            div.classList.toggle('hide-io', hide);
            btn.classList.toggle('off', hide);
            btn.setAttribute('aria-pressed', hide ? 'false' : 'true');
            btn.querySelector('.material-icons').textContent = hide ? 'visibility_off' : 'visibility';
            document.getElementById('consoleIoToggleText').textContent = hide ? '輸入/輸出：隱藏' : '輸入/輸出：顯示';
        });
    })();
    
    // 訊息視窗已固定在執行結果下方，不再拖曳移動

	function promptAndAddParam(type) {
		var message = hasDuplicateNull(createFunctionVariable[1]);
		if (message) {
			alert(message);
			return;
		}	
		
		var promptText = prompt(Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_TITLE_SCRATCH"]);
		if (promptText) {
			if (type!="label"&&createFunctionVariableExist(promptText)) {
				alert(Blockly.Msg["JAVASCRIPT_CREATE_VARIABLE_EXIST_SCRATCH"]);
				return;
			}	

			createFunctionVariableAdd(promptText, type);			
			updateParamContainer();
			createFunctionBlock();
		}			
	}

	function addParamTag(name, type, varid) {
		const tag = document.createElement('div');
		tag.className = `param-tag ${type}`;
		tag.setAttribute('data-name', name);
		tag.setAttribute('data-type', type);
		tag.setAttribute('data-varid', varid);
		tag.classList.add("draggable");

		const deleteBtn = document.createElement('span');
		deleteBtn.className = 'delete-btn';
		deleteBtn.textContent = 'x'; 
		
		deleteBtn.onclick = function(event) {
			event.stopPropagation();
			createFunctionVariableDelete(tag.getAttribute('data-varid'));
			paramContainer.removeChild(tag);
		};

		tag.textContent = name;
		tag.appendChild(deleteBtn);
		
		paramContainer.appendChild(tag);
	}
	
	function createFunctionVariableAdd(name, type) {
		createFunctionVariable[1].push([name, type, Blockly.utils.idGenerator.genUid()]);		
	}
	
	function createFunctionVariableDelete(varid) {
		const index = createFunctionVariable[1].findIndex(item => {
			return (item[2] === varid);
		});		
		createFunctionVariable[1].splice(index, 1);
		updateParamContainer();
		createFunctionBlock();		
	}

	function updateParamContainer() {
		paramContainer.innerHTML = "";
		var createFunctionVariableTemp = [];
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][1] != "label") {
				addParamTag(createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]);
				createFunctionVariableTemp.push([createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]]);
			}
		}
		for (var i=0;i<createFunctionVariable[1].length;i++) {
			if (createFunctionVariable[1][i][1] == "label") {			
				addParamTag(createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]);
				createFunctionVariableTemp.push([createFunctionVariable[1][i][0], createFunctionVariable[1][i][1], createFunctionVariable[1][i][2]]);
			}
		}
		createFunctionVariable[1] = createFunctionVariableTemp;
	}
	
	function showTrashCanIcon(field) {
		if (field.name == "NAME") return;

		var subworkspace = field.sourceBlock_.workspace;
		const fieldCoords = getFieldWorkspaceCoordinates(subworkspace, field);		
		const fieldPageCoords = toPageCoordinates(subworkspace, fieldCoords);
		
		const ICON_WIDTH = 22; 
		const ICON_HEIGHT = 28;

		const fieldRect = field.getSvgRoot().getBoundingClientRect();
		const fieldWidth = fieldRect.width;
		
		const X_CENTERING_ADJUSTMENT = 0;
		const Y_SPACING_OFFSET = -20;		

		const finalX = fieldPageCoords.x + (fieldWidth / 2) - (ICON_WIDTH / 2) + X_CENTERING_ADJUSTMENT;
		const finalY = fieldPageCoords.y - ICON_HEIGHT + Y_SPACING_OFFSET;

		const createFunctionDiv = document.getElementById("createFunctionDiv");
		
		const trashIconElement = document.createElement("img");
		trashIconElement.id = "trashIconElement";
		trashIconElement.src = Blockly.Msg["ICON_TRASH"];
		trashIconElement.width = ICON_WIDTH;
		trashIconElement.height = ICON_HEIGHT;
		trashIconElement.style.position = 'absolute';
		trashIconElement.style.left = `${finalX}px`;
		trashIconElement.style.top = `${finalY}px`;
		trashIconElement.style.display = 'block';
		
		createFunctionDiv.appendChild(trashIconElement);
		const trashClickHandler = (event) => {
			event.stopPropagation();
			event.preventDefault();			
			trashClickHandle(field); 
		};
		trashIconElement.addEventListener('click', trashClickHandler);
		
		const leftIconElement = document.createElement("img");
		leftIconElement.id = "leftIconElement";
		leftIconElement.src = Blockly.Msg["ICON_LEFT"];
		leftIconElement.width = ICON_WIDTH;
		leftIconElement.height = ICON_HEIGHT;
		leftIconElement.style.position = 'absolute';
		leftIconElement.style.left = `${finalX-ICON_WIDTH*2}px`;
		leftIconElement.style.top = `${finalY}px`;
		leftIconElement.style.display = 'block';
		
		createFunctionDiv.appendChild(leftIconElement);
		const leftClickHandler = (event) => {
			event.stopPropagation();
			event.preventDefault();			
			leftClickHandle(field); 
		};
		leftIconElement.addEventListener('click', leftClickHandler);

		const rightIconElement = document.createElement("img");
		rightIconElement.id = "rightIconElement";
		rightIconElement.src = Blockly.Msg["ICON_RIGHT"];
		rightIconElement.width = ICON_WIDTH;
		rightIconElement.height = ICON_HEIGHT;
		rightIconElement.style.position = 'absolute';
		rightIconElement.style.left = `${finalX+ICON_WIDTH*2}px`;
		rightIconElement.style.top = `${finalY}px`;
		rightIconElement.style.display = 'block';
		
		createFunctionDiv.appendChild(rightIconElement);
		const rightClickHandler = (event) => {
			event.stopPropagation();
			event.preventDefault();			
			rightClickHandle(field); 
		};
		rightIconElement.addEventListener('click', rightClickHandler);		
	}
	window.showTrashCanIcon = showTrashCanIcon;
	
	function trashClickHandle(field) {
		var fieldName = field.value_;
		var fieldTpye = "";
		if (field.backgroundStyle_==1)
			fieldTpye = "NS";
		else if (field.backgroundStyle_==2)
			fieldTpye = "Boolean";
		else if (field.backgroundStyle_==0)
			fieldTpye = "label";
		const index = createFunctionVariable[1].findIndex(item => {
			return (item[0] === fieldName&&item[1] === fieldTpye);
		});
		if (index!=-1) {
			createFunctionVariableDelete(createFunctionVariable[1][index][2]);
			hideTrashCanIcon(field);
		}
	}
	
	function leftClickHandle(field) {
		var fieldName = field.value_;
		var fieldTpye = "";
		if (field.backgroundStyle_==1)
			fieldTpye = "NS";
		else if (field.backgroundStyle_==2)
			fieldTpye = "Boolean";
		else if (field.backgroundStyle_==0)
			fieldTpye = "label";
		const index = createFunctionVariable[1].findIndex(item => {
			return (item[0] === fieldName&&item[1] === fieldTpye);
		});
		if (index!=-1) {
			if (createFunctionVariable[1][index-1]) {
				var exchangeItem = createFunctionVariable[1][index];
				createFunctionVariable[1][index] = createFunctionVariable[1][index-1];
				createFunctionVariable[1][index-1] = exchangeItem;
				
				updateParamContainer();
				createFunctionBlock();				
			}
		}
	}

	function rightClickHandle(field) {
		var fieldName = field.value_;
		var fieldTpye = "";
		if (field.backgroundStyle_==1)
			fieldTpye = "NS";
		else if (field.backgroundStyle_==2)
			fieldTpye = "Boolean";
		else if (field.backgroundStyle_==0)
			fieldTpye = "label";
		const index = createFunctionVariable[1].findIndex(item => {
			return (item[0] === fieldName&&item[1] === fieldTpye);
		});
		if (index!=-1) {
			if (createFunctionVariable[1][index+1]) {
				var exchangeItem = createFunctionVariable[1][index];
				createFunctionVariable[1][index] = createFunctionVariable[1][index+1];
				createFunctionVariable[1][index+1] = exchangeItem;
				
				updateParamContainer();
				createFunctionBlock();				
			}
		}
	}	
	
	function hideTrashCanIcon(field) {
		var trashIconElement = document.getElementById("trashIconElement");
		if (trashIconElement)
			trashIconElement.parentNode.removeChild(trashIconElement);
		var leftIconElement = document.getElementById("leftIconElement");
		if (leftIconElement)
			leftIconElement.parentNode.removeChild(leftIconElement);
		var rightIconElement = document.getElementById("rightIconElement");
		if (rightIconElement)
			rightIconElement.parentNode.removeChild(rightIconElement);		
	}
	window.hideTrashCanIcon = hideTrashCanIcon;
	
	function getFieldWorkspaceCoordinates(subworkspace, field) {
		const fieldSvgElement = field.getSvgRoot();
		const workspaceCoords = subworkspace.getSvgXY(fieldSvgElement);
		
		if (workspaceCoords && typeof workspaceCoords.x === 'number') {
			return {
				x: workspaceCoords.x,
				y: workspaceCoords.y
			};
		}
	}
	
	function toPageCoordinates(subworkspace, workCoords) {
		const scale = subworkspace.getScale();
		
		const rootElement = subworkspace.getInjectionDiv();
		const svgRect = rootElement.getBoundingClientRect();
		
		const pageX_scaled = workCoords.x;
		const pageY_scaled = workCoords.y;

		const pageX = pageX_scaled + svgRect.left;
		const pageY = pageY_scaled + svgRect.top;

		return { x: pageX, y: pageY };
	}	

	function updateVariablesList() {
		const container = document.getElementById('paramListContainer');
		
		if (!container) {
			return [];
		}

		const divElements = container.querySelectorAll('div');
		
		var createFunctionVariable1 = ["", []];
		Array.from(divElements).map(div => {
			createFunctionVariable1[0] = createFunctionVariable[0];
			for (var i=0;i<createFunctionVariable[1].length;i++) {
				if (createFunctionVariable[1][i][0]==div.getAttribute('data-name')&&createFunctionVariable[1][i][1]==div.getAttribute('data-type')) {
					createFunctionVariable1[1].push([createFunctionVariable[1][i][0],createFunctionVariable[1][i][1],createFunctionVariable[1][i][2]]);
					break;
				}
			} 
		});
		createFunctionVariable = createFunctionVariable1;
		updateParamContainer();
		createFunctionBlock();
	}	
	
    document.getElementById('createFunction_add_ns').addEventListener('click', () => {
        promptAndAddParam('NS');
    });
	
	document.getElementById('createFunction_add_b').addEventListener('click', () => {
        promptAndAddParam('Boolean');
    });	
	
    document.getElementById('createFunction_add_l').addEventListener('click', () => {
        promptAndAddParam('label');
    });
		
	setTimeout(function(){
		// 預設外觀依 scratchStyle（檔案開頭）決定：true＝Scratch、false＝Blockly
		// 工作區外觀必須與 scratchStyle 一致，否則積木會存進另一區、執行時也會要求錯誤的開始積木
		if (scratchStyle) {
			Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = "";
			Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = "";
			loadToolbox('zelos', catSystemScratch, 0.9);
		} else {
			loadToolbox('geras', catSystem, 0.9);
		}
		updateMsg();
		newFile();
		restoreWorkspaceFromStorage();   // 載入上次編輯的積木
		hookToolboxToggle();
		restoreQuestionFromStorage();    // 載入上次的題目內容（需在 updateMsg 之後，才不會被預設文字蓋掉）
		document.getElementById('button_test').title = '正式評分';
		// 還原完成後才可進行閒置檢查，否則清空後又會被還原的內容蓋回
		appReady = true;
		appReadyCallbacks.splice(0).forEach(function (cb) { try { cb(); } catch (e) { console.error(e); } });
	}, 1000);

	var appReady = false, appReadyCallbacks = [];
	function whenAppReady(cb) { appReady ? cb() : appReadyCallbacks.push(cb); }

	function addScript(url) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = location.href.substr(0, location.href.lastIndexOf("/"))+"/"+url;
		$("body").append(s);
	}

	function checkCategoryExist(child) {
		for (var i=1;i<customCategory.length;i++) {
			if (child==customCategory[i][2])
				customCategory.splice(i, 1);
		}
	}	
		
    $(function() {
        $( "#javascript_content" ).draggable({
            handle: "#javascript_title",
            cancel: "a, i, button, input, textarea, select"
        });
        $( "#javascript_content" ).resizable({
            containment: "#main",          // 不能拉超過主畫面
            minWidth: 250,
            minHeight: 150
        });
        $( "#run_content" ).draggable();
        $( "#run_content" ).resizable();
        initQuestionSplitter();
    });

	// 試題欄位與執行結果欄位之間的分隔條：上下拖曳調整兩區高度，雙擊還原 60% / 35%
	function initQuestionSplitter() {
		var splitter = document.getElementById('question_splitter');
		var codeDiv  = document.getElementById('javascript_code');
		var topEl    = document.getElementById('question_input');
		var bottomEl = document.getElementById('iframe_output');
		if (!splitter || !codeDiv || !topEl || !bottomEl) return;

		var MIN = 40;   // 每一區最少保留的高度 (px)
		var startY, startTop, total;
		var shield = null;   // 拖曳時暫時覆蓋畫面的透明遮罩

		splitter.addEventListener('pointerdown', function (e) {
			if (e.button !== 0) return;
			e.preventDefault();
			startY   = e.clientY;
			startTop = topEl.offsetHeight;
			total    = topEl.offsetHeight + bottomEl.offsetHeight;   // 兩區總高度維持不變
			splitter.setPointerCapture(e.pointerId);
			codeDiv.classList.add('splitting');
			// 拖曳中用透明遮罩蓋住 iframe，避免游標滑進輸出區時事件被 iframe 吃掉。
			// 注意：不可直接切換 iframe 的 pointer-events，Chrome 在拖曳結束後會讓 iframe 收不到滑鼠滾輪。
			if (!shield) {
				shield = document.createElement('div');
				shield.style.cssText = 'position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:2147483647;cursor:row-resize;background:transparent;';
			}
			document.body.appendChild(shield);
		});

		splitter.addEventListener('pointermove', function (e) {
			if (!splitter.hasPointerCapture(e.pointerId)) return;
			var newTop = Math.max(MIN, Math.min(total - MIN, startTop + (e.clientY - startY)));
			// 百分比是以內容區高度計算，需扣掉上下 padding（底部預留給縮放把手的空間）
			var cs = getComputedStyle(codeDiv);
			var h = codeDiv.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
			// 用百分比設定，之後縮放整個視窗時兩區仍維持比例
			topEl.style.height    = (newTop / h * 100) + '%';
			bottomEl.style.height = ((total - newTop) / h * 100) + '%';
		});

		function endDrag(e) {
			if (splitter.hasPointerCapture(e.pointerId)) splitter.releasePointerCapture(e.pointerId);
			codeDiv.classList.remove('splitting');
			if (shield && shield.parentNode) shield.parentNode.removeChild(shield);
		}
		splitter.addEventListener('pointerup', endDrag);
		splitter.addEventListener('pointercancel', endDrag);
		splitter.addEventListener('lostpointercapture', endDrag);

		splitter.addEventListener('dblclick', function () {
			topEl.style.height    = '60%';
			bottomEl.style.height = '35%';
		});
	}
	
	function newFile() {
		workspace.clear(true);
		var xmlDoc = Blockly.utils.xml.textToDom('<xml></xml>');
		Blockly.Xml.domToWorkspace(xmlDoc, workspace);
		
		workspace.scrollCenter();
		
		xmlBlockly = "";	
		xmlScratch = "";
		
		resetOutput();
		
		//Blockly.getMainWorkspace().clearUndo();
	}

	// 將目前工作區（含 Blockly / Scratch 兩種外觀的積木）存到 localStorage
	function saveWorkspaceToStorage() {
		if (workspaceRestoring || !workspace) return;
		try {
			var xmlText = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
			if (scratchStyle)
				xmlScratch = xmlText;
			else
				xmlBlockly = xmlText;

			var data = {
				version: 1,
				style: scratchStyle ? 'scratch' : 'blockly',
				blockly: xmlBlockly || '',
				scratch: xmlScratch || '',
				time: Date.now()
			};
			localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(data));
		} catch (e) {
			console.log('saveWorkspaceToStorage:', e);
		}
	}
	window.saveWorkspaceToStorage = saveWorkspaceToStorage;

	// 工作區左下角的 Blockly / Scratch 切換鈕：切換後立即存一次，
	// 重開網頁時才會回到切換後的外觀（目標外觀若是空的，不會有積木事件觸發自動儲存）
	function hookToolboxToggle() {
		try {
			var zc = workspace && workspace.zoomControls_;
			var proto = zc && Object.getPrototypeOf(zc);
			if (!proto || !proto.zoomChangeToolbox || proto.zoomChangeToolbox.__hooked) return;
			var orig = proto.zoomChangeToolbox;
			proto.zoomChangeToolbox = function () {
				var r = orig.apply(this, arguments);
				clearTimeout(workspaceSaveTimer);
				setTimeout(saveWorkspaceToStorage, 0);
				return r;
			};
			proto.zoomChangeToolbox.__hooked = true;
		} catch (e) { console.log('hookToolboxToggle:', e); }
	}

	// 開啟網頁時還原上次的工作區
	function restoreWorkspaceFromStorage() {
		workspaceRestoring = true;
		try {
			var raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
			if (!raw) return;
			var data = JSON.parse(raw);
			var savedBlockly = data.blockly || '';
			var savedScratch = data.scratch || '';

			var wantScratch = (data.style === 'scratch');
			xmlBlockly = savedBlockly;
			xmlScratch = savedScratch;
			if (wantScratch !== scratchStyle) {
				// 上次的外觀與預設不同：切換外觀（changeToolboxStyle 會自動載入該外觀的積木），
				// 切換時會用目前的空白工作區覆蓋另一區，這裡補回
				scratchStyle = wantScratch;
				changeToolboxStyle();
				if (wantScratch) xmlBlockly = savedBlockly;
				else xmlScratch = savedScratch;
			} else {
				var current = wantScratch ? savedScratch : savedBlockly;
				if (current)
					Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(current), workspace);
			}

			// 不呼叫 toolbox.refreshSelection()：Scratch 外觀的 ContinuousToolbox 會因此自動打開積木清單
			workspace.scrollCenter();
		} catch (e) {
			// 資料損毀時清除記憶，回到空白工作區
			console.log('restoreWorkspaceFromStorage:', e);
			try { localStorage.removeItem(WORKSPACE_STORAGE_KEY); } catch (e2) {}
			try { workspace.clear(true); } catch (e3) {}
		} finally {
			workspaceRestoring = false;
		}
	}

	// 關閉或切換分頁時立即再存一次，避免最後 3 秒內的變動遺失
	window.addEventListener('pagehide', function () {
		saveWorkspaceToStorage();
		saveQuestionToStorage();
	});
	document.addEventListener('visibilitychange', function () {
		if (document.visibilityState === 'hidden') {
			saveWorkspaceToStorage();
			saveQuestionToStorage();
		}
	});

	// 將題目欄位 question_input（div）的 HTML 內容存到 localStorage
	// 題目內容內含評分測資（隱藏列），並與題庫、題號、題目名稱同時寫入，三者永遠一致
	function saveQuestionToStorage() {
		clearTimeout(questionSaveTimer);
		if (questionRestoring) return;
		var el = document.getElementById('question_input');
		if (!el) return;
		try {
			localStorage.setItem(QUESTION_STORAGE_KEY, el.innerHTML);
			localStorage.setItem(QUESTION_META_KEY, JSON.stringify({ exam: examName, no: examQuestionNo, name: examQuestionName }));
		} catch (e) {
			console.log('saveQuestionToStorage:', e);
		}
	}
	window.saveQuestionToStorage = saveQuestionToStorage;

	function scheduleQuestionSave() {
		if (questionRestoring) return;
		clearTimeout(questionSaveTimer);
		questionSaveTimer = setTimeout(saveQuestionToStorage, 3000);   // 內容停止變動 3 秒後儲存
	}

	// 開啟網頁時還原上次的題目內容
	function restoreQuestionFromStorage() {
		questionRestoring = true;
		try {
			var el = document.getElementById('question_input');
			if (!el) return;
			var saved = localStorage.getItem(QUESTION_STORAGE_KEY);
			if (saved !== null) {
				el.innerHTML = saved;
				el.scrollTop = 0;
				// 一併還原題庫、題號與題目名稱（全域變數）
				try {
					var meta = JSON.parse(localStorage.getItem(QUESTION_META_KEY) || 'null');
					if (meta) {
						examName         = meta.exam || '';
						examQuestionNo   = meta.no   || '';
						examQuestionName = meta.name || '';
					}
				} catch (e2) {}
			}
		} catch (e) {
			console.log('restoreQuestionFromStorage:', e);
		} finally {
			questionRestoring = false;
		}
	}

	// 題目由題庫內容以 innerHTML 寫入，不會觸發 input 事件，改用 MutationObserver 監看內容變動
	(function () {
		var el = document.getElementById('question_input');
		if (!el || typeof MutationObserver === 'undefined') return;
		new MutationObserver(scheduleQuestionSave).observe(el, {
			childList: true,
			subtree: true,
			characterData: true   // 不監看屬性：拖曳分隔條會一直改 style，不需要因此儲存
		});
	})();
	
	function iframeWrite(iframe_id, iframe_code) {
		var iframe = document.getElementById(iframe_id);
		iframe.contentWindow.document.open();
		// 執行結果區是 iframe，外層 CSS 管不到裡面的捲軸，需在 iframe 內另外寫入捲軸樣式
		var scrollbarStyle = '<style>' +
			'::-webkit-scrollbar{width:10px;height:10px;}' +
			'::-webkit-scrollbar-track{background:#EEF1F8;border-radius:5px;}' +
			'::-webkit-scrollbar-thumb{background:#B7BFD6;border-radius:5px;border:2px solid #EEF1F8;}' +
			'::-webkit-scrollbar-thumb:hover{background:#8E98B8;}' +
			'::-webkit-scrollbar-thumb:active{background:#4C5C8F;}' +
			'::-webkit-scrollbar-corner{background:#EEF1F8;}' +
			'@supports not selector(::-webkit-scrollbar){html{scrollbar-color:#B7BFD6 #EEF1F8;scrollbar-width:thin;}}' +
			'</style>';
		iframe.contentWindow.document.write(scrollbarStyle + iframe_code);
		iframe.contentWindow.document.close();
		// 執行結果區取得焦點時，Ctrl+Delete 仍可清除暫存資料
		if (iframe_id === 'iframe_output') {
			try { iframe.contentWindow.document.addEventListener('keydown', onClearKey, true); } catch (e) {}
		}
		// 執行或評分中不搶焦點：焦點須留在「立即停止」按鈕，Esc 才有作用
		if (!RunWatch.isActive()) iframe.focus();
	}
	
	function resetOutput() {
		iframeWrite("iframe_output", "");
	}
	
	document.getElementById('button_code').onclick = function () {
		var div = document.getElementById('javascript_content');
		if (div.style.display == "none") {
			div.style.display = "block";
		}
		else {
			div.style.display = "none";
		}
	}
    
	document.getElementById('button_hide').onclick = function () {
		var div = document.getElementById('javascript_content');
		div.style.display = "none";
	}    
	
	document.getElementById('button_reset').onclick = function () {
		var result = confirm(Blockly.Msg.BUTTON_RESET);
		if (result) {
			newFile();
		}
	}
    
	document.getElementById('button_enlarge').onclick = function () {
		var div = document.getElementById('javascript_content');

        var metrics = Blockly.getMainWorkspace().getMetrics();
        div.style.left = (metrics.toolboxWidth + 272) + 'px';
        div.style.top = "70px";
        div.style.width = (metrics.viewWidth - 300) + 'px';
        div.style.height = (metrics.viewHeight - 45) + 'px';
        
        document.getElementById("question_input").style.width = "100%";
        document.getElementById("question_input").style.height = "100%";
        document.getElementById("iframe_output").style.display = "none";
        document.getElementById("question_splitter").style.display = "none";
	}    
	
	document.getElementById('button_reset').onclick = function () {
		var result = confirm(Blockly.Msg.BUTTON_RESET);
		if (result) {
			newFile();
		}
	}

	// 儲存積木結構檔：先進行正式評分，再把「帳號;題號;分數」寫入 xml 的 record 屬性
	document.getElementById('button_save_xml').onclick = async function () {
		try {
			if (gradingBusy) return;
			if (RunWatch.isActive()) { alert('程式執行中，請等執行結束後再儲存。'); return; }
			var result = null;
			if (examQuestionNo) {
				result = await runOfficialGrading('save');
				// 評分完成後立即上傳評分結果與 JavaScript 程式碼到 Google 試算表（不等待上傳完成，避免延遲存檔）
				if (result && window.GSheetUpload) {
					var jsCode = '';
					try { jsCode = js_beautify(Blockly.JavaScript.workspaceToCode(workspace)); }
					catch (e) { try { jsCode = Blockly.JavaScript.workspaceToCode(workspace); } catch (e2) { jsCode = ''; } }
					GSheetUpload.upload(result, jsCode);
				}
			} else if (!confirm(gmsg('GRADE_SAVE_NO_QUESTION', '尚未從題庫選擇題目，無法進行正式評分。\n仍要儲存積木結構檔（不含分數）嗎？'))) {
				return;
			}
			var xmlText = result ? result.xml : workspaceXmlText(null);
			var fileText = encryptWorkspaceFile(xmlText);   // 以競賽代碼（examKey）加密後儲存

			var link = document.createElement('a');
			link.download = safeFileName((examAccount || 'account') + '_' + (examQuestionNo || 'none')) + '.xml';
			link.href="data:application/octet-stream;utf-8," + encodeURIComponent(fileText);
			document.body.appendChild(link);
			link.click();
			link.remove();
/*
			var code = Blockly.JavaScript.workspaceToCode(workspace);
			code = js_beautify(code);

			var link = document.createElement('a');
			link.download="id_number.js";
			link.href="data:application/octet-stream;utf-8," + encodeURIComponent(code);
			document.body.appendChild(link);
			link.click();
			link.remove();	
*/
		} catch (e) {
			alert(e);
		}
	}
	
	// 放在主程式之前的獨立 <script>：主程式有語法錯誤（整段無法執行）或在 main() 之外出錯時，
	// 也會立即回報錯誤，不必等到 20 秒逾時
	var IFRAME_ERROR_TRAP = "<script>window.onerror=function(m,s,l,c,e){try{var f=window.frameElement;if(f&&!f.title){f.setAttribute('data-error',(e&&e.message)?e.message:String(m));f.title='err';}}catch(x){}};window.addEventListener('unhandledrejection',function(ev){try{var f=window.frameElement,e=ev.reason;if(f&&!f.title){f.setAttribute('data-error',(e&&e.message)?e.message:String(e));f.title='err';}}catch(x){}});<\/script>";

	// 把執行結果的內容附加到訊息視窗（只在訊息視窗開啟時），每筆一行；包在 .console-io 區塊中以黑色顯示（訊息為橙色），可用「輸入/輸出」按鈕隱藏
	function consoleMirror(html) {
		var content = document.getElementById('javascript_content');
		var div = document.getElementById('console_output');
		if (!div || !content || !content.classList.contains('has-console')) return;
		html = String(html == null ? '' : html).replace(/(<br\s*\/?>\s*)+$/i, '').replace(/^(\s*<br\s*\/?>)+/i, '');
		if (html === '') return;
		div.insertAdjacentHTML('beforeend', '<div class="console-io">' + html + '</div>');
		div.scrollTop = div.scrollHeight;
	}
	window.__consoleMirror = consoleMirror;

	// 執行（手動輸入）：輸出顯示在「執行結果」頁籤；執行中顯示倒數動畫，逾時或出錯時停止並提示原因
	function runCode() {
	  if (RunWatch.isActive()) return;
	  var code = Blockly.JavaScript.workspaceToCode(workspace);

	  // 包裝 prompt：考生輸入資料期間通知外層暫停計時
	  var promptHook = "(function(){var p=window.prompt;window.prompt=function(m,d){try{parent.__runPause(true);}catch(e){}try{return p.call(window,m,d);}finally{try{parent.__runPause(false);}catch(e){}}};})();";

	  // 輸入、輸出積木寫入執行結果時，同步複製一份到訊息視窗，讓輸入、輸出與訊息依時間順序排列
	  var mirrorHook = "(function(){var b=document.body,o=b.insertAdjacentHTML;b.insertAdjacentHTML=function(pos,html){o.call(b,pos,html);try{parent.__consoleMirror(html);}catch(e){}};})();";

	  var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";

	  iframe_code += "\<\/head\>\<body\>" + IFRAME_ERROR_TRAP + "\<script\>"+promptHook+mirrorHook+js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{try{"+code+"}catch(e){console.log(e);window.frameElement.setAttribute('data-error',(e&&e.message)?e.message:String(e));window.frameElement.title = 'err';return;}window.frameElement.title = 'ok';}main();")+"\<\/script\>\<\/body\>\<\/html\>";

	  var container = document.getElementById('iframeContainer');
	  if (container) container.remove();
	  container = document.createElement('div');
	  container.id = 'iframeContainer';
	  document.body.appendChild(container);

	  var iframe = document.createElement("iframe");
	  iframe.id = "iframe_0";
	  iframe.style.width = "0";
	  iframe.style.height = "0";
	  iframe.style.border = "none";
	  container.appendChild(iframe);

	  var finished = false;
	  var bodyText = function () {
		try { return iframe.contentWindow.document.body.innerText; } catch (e) { return ''; }
	  };
	  var formatOutput = function (text) {
		return text.replace(/ /g,"&nbsp;").replace(/\n/g, "<br>");
	  };
	  var end = function (html, note) {
		if (finished) return;
		finished = true;
		RunWatch.finish();
		container.remove();               // 清除執行中的 iframe
		iframeWrite("iframe_output", html);
		if (note) consoleMirror('<span style="color:#B91C1C;font-weight:bold;">' + note + '</span>');
		showQuestionTab('output');
	  };

	  // 逾時：強制停止並提示
	  RunWatch.start('程式執行中', function () {
		var out = bodyText();
		end((out ? formatOutput(out) + '<br>' : '') + runMessageHtml('timeout'), '⏱ 執行超過 ' + Math.round(RUN_TIMEOUT_MS / 1000) + ' 秒，已強制停止');
	  }, function () {
		var out = bodyText();
		end((out ? formatOutput(out) + '<br>' : '') + runMessageHtml('stopped'), '⏹ 已手動停止執行');
	  });

	  var checkFinish = function () {
		if (finished || !iframe.isConnected) return;
		var body = null;
		try { body = iframe.contentWindow.document.body; } catch (e) {}
		if (body && iframe.title == "ok") {
		  end(formatOutput(body.innerText));
		} else if (body && iframe.title == "err") {
		  var err = iframe.getAttribute('data-error') || '';
		  if (err === '__RUN_TIMEOUT__') { RunWatch.timeout(); return; }   // 迴圈中的時間檢查已逾時
		  var out = body.innerText;
		  end((out ? formatOutput(out) + '<br>' : '') + runMessageHtml('error', err), '❌ 程式執行發生錯誤，已停止' + (err ? '：' + err.replace(/&/g, '&amp;').replace(/</g, '&lt;') : ''));
		} else {
		  setTimeout(checkFinish, 100);
		}
	  };

	  iframe.onload = function () {
		iframe.onload = null;
		checkFinish();
	  };

	  try {
		iframeWrite("iframe_output", "");
		iframeWrite(iframe.id, iframe_code);
	  } catch (e) {
		console.log(e);
		end(runMessageHtml('error', e && e.message), '❌ 程式執行發生錯誤，已停止');
	  }
	  setTimeout(checkFinish, 100);   // onload 未觸發時也會檢查
	}

	// 執行結果區（iframe）中的提示訊息：kind = 'timeout' 或 'error'
	function runMessageHtml(kind, detail) {
		var esc = function (t) { return String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
		var box = 'margin:10px 0;padding:12px 14px;border-radius:8px;font-family:Microsoft JhengHei,PingFang TC,Noto Sans TC,sans-serif;line-height:1.7;font-size:15px;';
		if (kind === 'stopped') {
			return '<div style="' + box + 'background:#EEF1F8;border:1px solid #B7BFD6;color:#3B4A78;">' +
				'<b style="font-size:16px;">⏹ 已手動停止執行</b><br>' + esc(runStoppedHint()) + '</div>';
		}
		if (kind === 'timeout') {
			return '<div style="' + box + 'background:#FFF7ED;border:1px solid #FDBA74;color:#9A3412;">' +
				'<b style="font-size:16px;">⏱ 執行超過 ' + Math.round(RUN_TIMEOUT_MS / 1000) + ' 秒，已強制停止</b><br>' + esc(runTimeoutHint()) + '</div>';
		}
		return '<div style="' + box + 'background:#FEF2F2;border:1px solid #FCA5A5;color:#991B1B;">' +
			'<b style="font-size:16px;">❌ 程式執行發生錯誤，已停止</b><br>' + esc(runErrorHint(detail)) +
			(detail ? '<br><span style="font-size:13px;color:#7F1D1D;">錯誤訊息：' + esc(detail) + '</span>' : '') + '</div>';
	}

	/*
		Program Validation Function Description:

		Question: Input the dividend and the divisor, output the quotient.

		Test Data Format: 1st input value; 2nd input value; Correct validation value
		(Semicolon ";" separates numbers or strings, followed by the correct value for validation)

		Window input: 12;4;3 → Automatically input 12 and 4, compare whether the output value equals the validation value 3
	*/
	// 驗證按鈕：改為「正式評分」（讀取題目中的 data 與配分，結果與紀錄顯示在「正式評分」頁籤）
	document.getElementById('button_test').onclick = function () {
		document.getElementById('javascript_content').style.display = "block";
		runOfficialGrading('grade');
	}
	
	function runMultipleIframeTests(inputArray, containerId = 'iframeContainer') {
		if (!inputArray || inputArray.length === 0) return;
		// 相容新格式 ["輸入;…;輸出", 配分]：只取測資字串
		inputArray = inputArray.map(function (x) { return Array.isArray(x) ? String(x[0] == null ? '' : x[0]) : String(x == null ? '' : x); });

		let outputResult = "";
		let completedCount = 0;
		let rightCount = 0;
		let totalTests = inputArray.length;

		let container = document.getElementById(containerId);
		if (container) {
			container.parentNode.removeChild(container);
		}
		container = document.createElement('div');
		container.id = containerId;
		document.body.appendChild(container);		

		inputArray.forEach((testCode, index) => {
			if (testCode=="")
				totalTests--;
			else {
				const iframe = document.createElement("iframe");
				iframe.id = "iframe_" + index;
				iframe.style.width = "0";
				iframe.style.height = "0";
				iframe.style.border = "none";
				
				container.appendChild(iframe);

				iframe.onload = async function() {
				  iframe.onload = null;
				  
				  const checkFinish = async () => {
					const body = iframe.contentWindow.document.body;
					if (!body) return;

					if (iframe.title=="ok"||iframe.title=="err") {
						
					  const bodyContent = body.innerText;
					  outputResult += "【 "+ Blockly.Msg["TEST_CODE_TEST"].replace("%1", completedCount+1)+" 】"+bodyContent + "\n\n";
					  completedCount++;
					  if (iframe.title=="ok")
						  rightCount++;
					  if (completedCount === totalTests) {
						outputResult += "\n" + Blockly.Msg["TEST_CODE_CORRECT_COUNT"] + "： [red]" + rightCount + "[/red] / " + completedCount;
                        var output = outputResult
                            .replace(/ /g, "&nbsp;")
                            .replace(/\n/g, "<br>")
                            .replace(/\[orange\]/g, "<span style='color: orange;'>")
                            .replace(/\[\/orange\]/g, "</span>")
                            .replace(/\[blue\]/g, "<span style='color: blue;'>")
                            .replace(/\[\/blue\]/g, "</span>")
                            .replace(/\[red\]/g, "<span style='color: red;'>")
                            .replace(/\[\/red\]/g, "</span>");
						iframeWrite("iframe_output", output);
						if (container) container.remove();
					  }
					} else {
					  setTimeout(checkFinish, 100);
					}
				  };

				  checkFinish();
				};

				runTest(iframe, testCode.trim());
			}
		});
	}	

	function runTest(iframe, input) {
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		code = code.replace(/variable_input\(/g,"variable_input_test('"+input.replace(/\\/g, "\\\\").replace(/\'/g, "\\\'")+"', ");
		code = code.replace(/data_output\(/g,"data_output_test('"+input.replace(/\\/g, "\\\\").replace(/\'/g, "\\\'")+"', ");	
		code = 'var systemAnswer = "'+input+'"; var userAnswer = ""; var userAnswerHTML = ""; var variable_data_test_index = -1;\n' + code;
    
		var blocks_scratch = workspace.getBlocksByType("javascript_data_input_scratch");       

		if (blocks_scratch.length==0) {
			code += ''+
			'async function variable_input_test (input, msg, type){\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+			
			'  variable_data_test_index++;\n'+
			'  var arr = input.split(";");\n'+
			'  if (variable_data_test_index>(arr.length-1)) return "";\n'+				
			'  input = arr[variable_data_test_index];\n'+
			'  userAnswer += (variable_data_test_index>0 ? ";" : "") + input;\n'+
			'  userAnswerHTML += (variable_data_test_index>0 ? ";" : "") + "[orange]" + input + "[/orange]";\n'+ 				
			'  if (type=="NUMBER")\n'+
			'  	input = Number(input);\n'+
			'  else\n'+
			'    input = input;\n'+
			'  //document.body.insertAdjacentHTML("beforeend", (msg?(msg+"："):"")+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+
			'  return input;\n'+
			'}';
			
		} else {
			code += ''+
			'async function variable_input_test (input, msg){\n'+
			'  if (input === null || input === undefined) {'+
			'      input = "";'+
			'  }'+			
			'  variable_data_test_index++;\n'+
			'  var arr = input.split(";");\n'+
			'  if (variable_data_test_index>(arr.length-1)) return "";\n'+			
			'  input = arr[variable_data_test_index];\n'+					
			'  userAnswer += (variable_data_test_index>0 ? ";" : "") + input;\n'+	
			'  userAnswerHTML += (variable_data_test_index>0 ? ";" : "") + "[orange]" + input + "[/orange]";\n'+ 			
            '  if (input.trim() !== "" && !isNaN(input) && input.replace(/[+\\-.]/g, "").length <= 15)\n'+
            '      input = Number(input);\n'+
			'  //document.body.insertAdjacentHTML("beforeend", (msg?(msg+"："):"")+String(input).replace(/ /g,"&nbsp;")+"<br>");\n'+		
			'  return input;\n'+
			'}\n';
		}

		code += ''+
			'async function data_output_test (input, msg, text) {\n'+
			'  if (input === null) {'+
			'      input = "";'+
			'  }'+
			'  variable_data_test_index++;\n'+			
			'  var arr = input.split(";");\n'+				
			'  input = arr[variable_data_test_index];\n'+
			'  userAnswer += (variable_data_test_index>0 ? ";" : "") + text;\n'+
			'  userAnswerHTML += (variable_data_test_index>0 ? ";" : "") + "[blue]" + text + "[/blue]";\n'+ 
			'  //document.body.insertAdjacentHTML("beforeend", "<BR>"+(msg?(msg+"："):"")+String(text).replace(/ /g,"&nbsp;"));\n'+				
			'}\n';

		code += ''+
		
			'if (userAnswer.trim()==systemAnswer.trim()) {\n'+		
			'  document.body.insertAdjacentHTML("beforeend", "<BR><BR>"+"'+Blockly.Msg["TEST_CODE_TEST"]+'".replace("%1", systemAnswer.trim()));\n'+					
			'  document.body.insertAdjacentHTML("beforeend", "<BR>"+"'+Blockly.Msg["TEST_CODE_CORRECT"]+'".replace("%1", userAnswerHTML));\n'+            
			'} else {\n'+
			'  document.body.insertAdjacentHTML("beforeend", "<BR><BR>"+"'+Blockly.Msg["TEST_CODE_TEST"]+'".replace("%1", systemAnswer.trim()));\n'+					
			'  document.body.insertAdjacentHTML("beforeend", "<BR>"+"'+Blockly.Msg["TEST_CODE_ERROR"]+'".replace("%1", userAnswerHTML));\n'+            
			'}\n';				
			
		var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";

		iframe_code += "\<\/head\>\<body\>" + IFRAME_ERROR_TRAP + "\<script\>"+js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{try{"+code+"}catch(e){console.log(e);window.frameElement.setAttribute('data-error',(e&&e.message)?e.message:String(e));window.frameElement.title = 'err';return;}window.frameElement.title = ((document.body.innerText.indexOf('🔴')!=-1)?'err':'ok');}main();")+"\<\/script\>\<\/body\>\<\/html\>";

		output_result = "";
		
		try {
			iframeWrite(iframe.id, iframe_code);				
		} catch (e) {
			console.log(e);
		}
	}
	
	// =====================================================
	//  試題內容視窗的三個頁籤：題目 / 執行結果 / 正式評分
	// =====================================================
	var QUESTION_TABS = { question: 'question_input', output: 'iframe_output', grade: 'grade_panel' };

	function showQuestionTab(name) {
		if (!QUESTION_TABS[name]) name = 'question';
		Object.keys(QUESTION_TABS).forEach(function (k) {
			var panel = document.getElementById(QUESTION_TABS[k]);
			if (panel) panel.classList.toggle('qtab-active', k === name);
		});
		document.querySelectorAll('#question_tabs .qtab').forEach(function (b) {
			b.classList.toggle('active', b.getAttribute('data-tab') === name);
		});
		if (name === 'grade') renderGradePanel();
	}
	window.showQuestionTab = showQuestionTab;

	document.querySelectorAll('#question_tabs .qtab').forEach(function (b) {
		b.addEventListener('click', function () { showQuestionTab(b.getAttribute('data-tab')); });
	});

	// =====================================================
	//  點選題目清單的「匯入題目」按鈕（題庫檔的 ONCLICK 呼叫）
	//  按鈕上的 data-no、data-name 寫入全域變數 examQuestionNo、examQuestionName
	// =====================================================
	// exam：題庫名稱（省略時取題庫下拉選單目前的選項）
	// tab：載入後顯示的頁籤（省略時顯示「題目」）
	function selectExamQuestion(btn, exam, tab) {
		var sel = document.getElementById('importQuestion_list');
		examName         = exam || ((sel && sel.selectedIndex >= 0) ? sel.options[sel.selectedIndex].text : '');
		examQuestionNo   = btn.getAttribute('data-no')   || '';
		examQuestionName = btn.getAttribute('data-name') || '';

		document.getElementById('javascript_content').style.display = 'block';
		var qi = document.getElementById('question_input');
		qi.innerHTML = btn.getAttribute('data-q');
		qi.scrollTop = 0;
		saveQuestionToStorage();   // 立即儲存題目內容（含測資）與題號，不等 3 秒
		toggleImportQuestionForm(false);
		resetOutput();
		lastGradeResult = null;
		showQuestionTab(tab || 'question');
	}
	window.selectExamQuestion = selectExamQuestion;

	// 依題庫名稱與題號，從已解鎖的題庫中找出該題的「匯入題目」按鈕（含 data-q 題目內容）
	function findQuestionButton(exam, no) {
		var exams = ExamLogin.getExams().filter(function (e) { return !exam || e.name === exam; });
		for (var i = 0; i < exams.length; i++) {
			var tpl = document.createElement('template');
			tpl.innerHTML = exams[i].contest;
			var btn = tpl.content.querySelector('.import-question-button[data-no="' + String(no).replace(/"/g, '') + '"]');
			if (btn) return { btn: btn, exam: exams[i] };
		}
		return null;
	}

	// =====================================================
	//  正式評分
	//  評分資料放在題目中的隱藏列：{"data": [["輸入;…;輸出", 配分], ...]}
	//  （相容舊格式 {"data": ["輸入;…;輸出", ...]}，每筆 1 分）
	// =====================================================
	var gradingBusy = false;
	var lastGradeResult = null;

	function gmsg(key, def) {
		return (Blockly.Msg && Blockly.Msg[key]) || def;
	}

	function escapeHtml(s) {
		return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
		});
	}

	function safeFileName(s) {
		return String(s).replace(/[\\/:*?"<>|\s]+/g, '_');
	}

	// 從題目內容取出評分資料，回傳 [{ input: "37;3;7", score: 1 }, ...]；找不到回傳 null
	function parseGradingData() {
		var text = document.getElementById('question_input').textContent || '';
		var start = text.search(/\{\s*"data"\s*:/);
		if (start < 0) return null;
		// 括號配對取出完整 JSON（資料中的字串不含括號以外的干擾時即可正確配對）
		var depth = 0, inStr = false, end = -1;
		for (var i = start; i < text.length; i++) {
			var ch = text[i];
			if (inStr) {
				if (ch === '\\') i++;
				else if (ch === '"') inStr = false;
				continue;
			}
			if (ch === '"') inStr = true;
			else if (ch === '{' || ch === '[') depth++;
			else if (ch === '}' || ch === ']') { depth--; if (depth === 0) { end = i; break; } }
		}
		if (end < 0) throw new Error('評分資料不完整');
		var list = JSON.parse(text.slice(start, end + 1)).data;
		if (!Array.isArray(list)) throw new Error('評分資料格式錯誤');
		return list.map(function (item) {
			var input = Array.isArray(item) ? item[0] : item;   // ["37;3;7", 1] 取出 "37;3;7"
			var score = Array.isArray(item) ? Number(item[1]) : 1;
			if (!(score >= 1 && score <= 3 && Math.floor(score) === score)) {
				console.warn('配分需為 1~3 的整數，改以 1 分計算：', item);
				score = 1;
			}
			return { input: String(input).trim(), score: score };
		}).filter(function (c) { return c.input !== ''; });
	}

	// 評分前的積木檢查（與原本「驗證」相同），不通過回傳錯誤訊息
	function gradingPrecheck() {
		if (scratchStyle && workspace.getBlocksByType("javascript_start_scratch", false).length != 1)
			return Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"];
		var outB = workspace.getBlocksByType("javascript_data_output", false).length +
		           workspace.getBlocksByType("javascript_data_output_scratch", false).length;
		if (outB == 0)
			return scratchStyle ? Blockly.Msg["JAVASCRIPT_OUTPUT_ALERT_SCRATCH"] : Blockly.Msg["JAVASCRIPT_OUTPUT_ALERT"];
		return '';
	}

	// 執行單筆測資，回傳 Promise<{ outcome, error }>
	// outcome：pass 通過、fail 答案不符、error 執行錯誤、timeout 逾時、stopped 因其他測資出錯而停止
	// stoppers：逾時或出錯時用來結束尚未完成的測資；onError：發生執行錯誤時通知
	function runGradingCase(container, input, index, stoppers, onError) {
		return new Promise(function (resolve) {
			var done = false;
			var fin = function (r) { if (!done) { done = true; resolve(r); } };
			stoppers.push(function (outcome) { fin({ outcome: outcome }); });

			var iframe = document.createElement('iframe');
			iframe.id = 'grading_iframe_' + index;
			iframe.style.cssText = 'width:0;height:0;border:none;';
			container.appendChild(iframe);
			var check = function () {
				if (done) return;
				if (iframe.title == 'ok') return fin({ outcome: 'pass' });
				if (iframe.title == 'err') {
					var err = iframe.getAttribute('data-error');
					if (err === '__RUN_TIMEOUT__') { RunWatch.timeout(); return; }   // 迴圈中的時間檢查已逾時
					if (err) { fin({ outcome: 'error', error: err }); onError(); return; }
					return fin({ outcome: 'fail' });                                 // 執行完成但答案不符
				}
				setTimeout(check, 100);
			};
			try {
				runTest(iframe, input);
			} catch (e) {
				console.log(e);
				fin({ outcome: 'error', error: (e && e.message) || String(e) });
				onError();
				return;
			}
			setTimeout(check, 100);
		});
	}

	// 目前工作區的 xml 文字；record = "帳號;題號;分數"（null 表示未評分）
	function workspaceXmlText(result) {
		var xml = Blockly.Xml.workspaceToDom(workspace);
		xml.setAttribute('platform', scratchStyle ? 'scratch' : 'blockly');
		xml.setAttribute('record', [examAccount, examQuestionNo, result ? result.score : ''].join(';'));
		if (examName)         xml.setAttribute('exam', examName);
		if (examQuestionName) xml.setAttribute('question', examQuestionName);
		if (result) {
			xml.setAttribute('total', result.total);
			xml.setAttribute('graded', result.time);
			// 執行狀態：success 成功、error 錯誤（error_type：timeout 逾時、exception 程式錯誤、stopped 手動停止；此時分數記為 0）
			xml.setAttribute('status', result.status === 'error' ? 'error' : 'success');
			if (result.status === 'error') xml.setAttribute('error_type', result.reason);
		}
		return Blockly.Xml.domToText(xml);
	}

	// ---------- 評分紀錄（localStorage，依帳號分開）----------
	function gradingKey() { return GRADING_STORAGE_PREFIX + (examAccount || '_'); }

	function loadGradingRecords() {
		try {
			var list = JSON.parse(localStorage.getItem(gradingKey()) || '[]');
			return Array.isArray(list) ? list : [];
		} catch (e) { return []; }
	}

	function saveGradingRecord(rec) {
		var list = loadGradingRecords();
		list.push(rec);
		if (list.length > GRADING_MAX_RECORDS) list = list.slice(-GRADING_MAX_RECORDS);
		while (true) {
			try { localStorage.setItem(gradingKey(), JSON.stringify(list)); return; }
			catch (e) {
				// 空間不足：刪除最舊的紀錄後重試
				if (list.length <= 1) { console.warn('評分紀錄無法儲存：', e); return; }
				list = list.slice(Math.ceil(list.length / 4));
			}
		}
	}

	function formatTime(t) {
		var d = new Date(t), p = function (n) { return (n < 10 ? '0' : '') + n; };
		return d.getFullYear() + '/' + p(d.getMonth() + 1) + '/' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
	}

	// 執行正式評分；source = 'grade'（評分按鈕）或 'save'（儲存前評分）
	// 回傳評分結果（含 xml）；無法評分時回傳 null
	async function runOfficialGrading(source) {
		if (gradingBusy) return null;
		document.getElementById('javascript_content').style.display = 'block';
		showQuestionTab('grade');
		var cur = document.getElementById('grade_current');
		if (RunWatch.isActive()) {
			cur.innerHTML = '<div class="gp-msg">程式執行中，請等執行結束後再評分。</div>';
			return null;
		}

		if (!examQuestionNo) {
			cur.innerHTML = '<div class="gp-msg">' + escapeHtml(gmsg('GRADE_NO_QUESTION', '請先由題庫選擇題目，再進行正式評分。')) + '</div>';
			return null;
		}
		var cases;
		try { cases = parseGradingData(); }
		catch (e) {
			cur.innerHTML = '<div class="gp-msg gp-err">' + escapeHtml(gmsg('TEST_DATA_JSON_ERROR', '評分資料格式錯誤')) + '</div>';
			console.error(e);
			return null;
		}
		if (!cases || !cases.length) {
			cur.innerHTML = '<div class="gp-msg gp-err">' + escapeHtml(gmsg('GRADE_NO_DATA', '此題沒有評分資料。')) + '</div>';
			return null;
		}

		gradingBusy = true;
		var gradeBtn = document.getElementById('grade_run');
		if (gradeBtn) gradeBtn.disabled = true;
		try {
			var total = cases.reduce(function (s, c) { return s + c.score; }, 0);
			var pre = gradingPrecheck();
			var outcomes;
			if (pre) {
				outcomes = cases.map(function () { return { outcome: 'fail' }; });   // 積木不完整：全部不通過
			} else {
				cur.innerHTML = '<div class="gp-msg">正式評分執行中…</div>';
				toggleConsoleForm(false);
				var container = document.getElementById('gradingContainer');
				if (container) container.remove();
				container = document.createElement('div');
				container.id = 'gradingContainer';
				// 不可設 display:none：未顯示的 iframe 中 innerText 會包含程式碼文字（內含 🔴），
				// runTest 會因此誤判為錯誤。改用 0×0 的 iframe（與原本驗證相同）。
				document.body.appendChild(container);

				var stoppers = [];
				var userStopped = false;
				var stopAll = function (outcome) {        // 結束所有尚未完成的測資並清除 iframe
					RunWatch.finish();
					stoppers.forEach(function (f) { f(outcome); });
					container.remove();
				};
				RunWatch.start('正式評分中（' + cases.length + ' 組測資）',
					function () { stopAll('timeout'); },
					function () { userStopped = true; stopAll('stopped'); });
				outcomes = await Promise.all(cases.map(function (c, i) {
					return runGradingCase(container, c.input, i, stoppers, function () { stopAll('stopped'); });
				}));
				RunWatch.finish();
				container.remove();
				// 按「正式評分」時手動停止：不計分、不留紀錄（儲存時停止則照常存檔，分數記 0）
				if (userStopped && source !== 'save') {
					cur.innerHTML = '<div class="gp-msg">已手動停止正式評分，本次不計分、不列入評分紀錄。</div>';
					return null;
				}
			}

			var result = {
				time: Date.now(),
				source: source || 'grade',
				account: examAccount,
				exam: examName,
				no: examQuestionNo,
				name: examQuestionName,
				total: total,
				score: 0,
				passed: 0,
				count: cases.length,
				cases: cases.map(function (c, i) {
					return { score: c.score, pass: outcomes[i].outcome === 'pass', outcome: outcomes[i].outcome };
				}),
				note: pre || '',
				status: 'ok',     // ok 成功；error 執行錯誤（逾時或程式錯誤），分數記為 0
				reason: '',       // timeout 或 exception
				error: ''
			};
			var errCase = outcomes.filter(function (o) { return o.outcome === 'error'; })[0];
			if (userStopped) {
				result.status = 'error'; result.reason = 'stopped';
			} else if (outcomes.some(function (o) { return o.outcome === 'timeout'; })) {
				result.status = 'error'; result.reason = 'timeout';
			} else if (errCase) {
				result.status = 'error'; result.reason = 'exception'; result.error = errCase.error || '';
			}
			result.cases.forEach(function (c) { if (c.pass) result.passed++; });
			if (result.status === 'ok') {
				result.cases.forEach(function (c) { if (c.pass) result.score += c.score; });
			}
			result.xml = workspaceXmlText(result);   // 評分當時的積木結構（含 record="帳號;題號;分數"）
			result.id = result.time + '_' + Math.random().toString(36).slice(2, 8);

			saveGradingRecord(result);
			lastGradeResult = result;
			gradingBusy = false;    // 先解除忙碌狀態，renderGradePanel 才會顯示本次結果
			renderGradePanel();
			return result;
		} finally {
			gradingBusy = false;
			if (gradeBtn) gradeBtn.disabled = false;
		}
	}
	window.runOfficialGrading = runOfficialGrading;

	var OUTCOME_LABEL = {
		pass:    ['gp-pass', '✔ 通過'],
		fail:    ['gp-fail', '✘ 不通過'],
		error:   ['gp-fail', '❌ 執行錯誤'],
		timeout: ['gp-warn', '⏱ 逾時'],
		stopped: ['gp-muted', '－ 已停止']
	};

	function reasonLabel(reason) {
		return reason === 'timeout' ? '逾時' : reason === 'stopped' ? '手動停止' : '程式錯誤';
	}

	function renderCurrentResult(r) {
		var bad = r.status === 'error';
		var rows = r.cases.map(function (c, i) {
			var lab = OUTCOME_LABEL[c.outcome || (c.pass ? 'pass' : 'fail')] || OUTCOME_LABEL.fail;
			return '<tr><td>' + (i + 1) + '</td><td>' + c.score + '</td>' +
				'<td class="' + lab[0] + '">' + lab[1] + '</td>' +
				'<td>' + (c.pass && !bad ? c.score : 0) + '</td></tr>';
		}).join('');
		var statusBox = !bad ? '' :
			'<div class="gp-msg gp-err"><b>執行狀態：錯誤（' + reasonLabel(r.reason) + '），本次得分以 0 分計算。</b><br>' +
			escapeHtml(r.reason === 'timeout' ? runTimeoutHint() : r.reason === 'stopped' ? runStoppedHint() : runErrorHint(r.error)) +
			(r.error ? '<br><small>錯誤訊息：' + escapeHtml(r.error) + '</small>' : '') + '</div>';
		return '<div class="gp-score">得分 <b>' + r.score + '</b> / ' + r.total +
			'<span>通過 ' + r.passed + ' / ' + r.count + ' 筆測資　' + formatTime(r.time) + (r.source === 'save' ? '（存檔評分）' : '') + '</span></div>' +
			statusBox +
			(r.note ? '<div class="gp-msg gp-err">' + escapeHtml(r.note) + '</div>' : '') +
			'<table class="gp-table"><thead><tr><th>測資</th><th>配分</th><th>結果</th><th>得分</th></tr></thead><tbody>' + rows + '</tbody></table>';
	}

	function renderGradePanel() {
		var panel = document.getElementById('grade_panel');
		if (!panel) return;
		if (!document.getElementById('grade_current')) {
			panel.innerHTML =
				'<div class="gp-head" id="grade_head"></div>' +
				'<div class="gp-actions"><button type="button" id="grade_run">開始正式評分</button></div>' +
				'<div id="grade_current"></div>' +
				'<div class="gp-subtitle">評分紀錄</div>' +
				'<div id="grade_records"></div>' +
				'<div class="gp-tip">提示：在積木工作區按 <kbd>Ctrl</kbd> + <kbd>Delete</kbd> 可清除評分紀錄與所有暫存資料（工作區積木、試題內容、執行結果）。</div>';
			document.getElementById('grade_run').addEventListener('click', function () { runOfficialGrading('grade'); });
			document.getElementById('grade_records').addEventListener('click', function (e) {
				var a = e.target.closest('a[data-rec]');
				if (!a) return;
				e.preventDefault();
				loadGradingRecord(a.getAttribute('data-rec'));
			});
		}
		document.getElementById('grade_head').innerHTML =
			'<span>考生：<b>' + escapeHtml(examAccount || '（未登錄）') + '</b></span>' +
			'<span>' + (examQuestionNo
				? escapeHtml(examName) + ' 第 <b>' + escapeHtml(examQuestionNo) + '</b> 題 ' + escapeHtml(examQuestionName)
				: '尚未選擇題目') + '</span>';

		var cur = document.getElementById('grade_current');
		if (!gradingBusy) {
			cur.innerHTML = (lastGradeResult && lastGradeResult.no === examQuestionNo && lastGradeResult.exam === examName)
				? renderCurrentResult(lastGradeResult)
				: '<div class="gp-msg">按「開始正式評分」或工具列的驗證按鈕進行評分；儲存積木結構檔時也會先自動評分。</div>';
		}

		var list = loadGradingRecords().slice().reverse();   // 新的在上
		document.getElementById('grade_records').innerHTML = list.length
			? '<table class="gp-table gp-records"><thead><tr><th>#</th><th>時間</th><th>題號</th><th>題目</th><th>得分</th><th>積木</th></tr></thead><tbody>' +
				list.map(function (r, i) {
					return '<tr><td>' + (list.length - i) + '</td>' +
						'<td>' + formatTime(r.time) + (r.source === 'save' ? '<br><small>存檔</small>' : '') + '</td>' +
						'<td>' + escapeHtml(r.no) + '</td>' +
						'<td class="gp-name">' + escapeHtml(r.exam ? r.exam + ' ' : '') + escapeHtml(r.name) + '</td>' +
						'<td><b>' + r.score + '</b> / ' + r.total +
							(r.status === 'error' ? '<br><small class="gp-fail">' + (r.reason === 'stopped' ? '手動停止' : r.reason === 'timeout' ? '逾時' : '執行錯誤') + '</small>' : '') + '</td>' +
						'<td><a href="#" data-rec="' + escapeHtml(r.id) + '">載入</a></td></tr>';
				}).join('') + '</tbody></table>'
			: '<div class="gp-msg">尚無評分紀錄。</div>';
	}
	window.renderGradePanel = renderGradePanel;

	function loadGradingRecord(id) {
		var rec = loadGradingRecords().filter(function (r) { return r.id === id; })[0];
		if (!rec) return;
		if (!confirm('載入 ' + formatTime(rec.time) + ' 評分時的題目與積木（第 ' + rec.no + ' 題，得分 ' + rec.score + ' / ' + rec.total + '）？\n目前的題目與工作區積木將被取代。')) return;

		// 1) 載入對應的題目（題目內容、題號等全域變數），題庫選單也切換到該題庫
		var found = rec.no ? findQuestionButton(rec.exam, rec.no) : null;
		if (found) {
			var sel = document.getElementById('importQuestion_list');
			if (sel) sel.value = found.exam.file;
			selectExamQuestion(found.btn, found.exam.name, 'grade');
		}
		// 2) 載入評分當時的積木
		loadWorkspaceXml(rec.xml);
		// 3) 正式評分頁籤顯示這筆紀錄的評分結果
		if (found) {
			lastGradeResult = rec;
			renderGradePanel();
			showToast('已載入第 ' + rec.no + ' 題題目與評分當時的積木。');
		} else {
			showToast('已載入積木；找不到對應題目（第 ' + rec.no + ' 題' + (rec.exam ? '，' + rec.exam : '') + '），題目未載入。');
		}
	}

	// 將 xml 文字載入工作區（開啟檔案與載入評分紀錄共用）
	function loadWorkspaceXml(text) {
		var blocks = Blockly.utils.xml.textToDom(text);
		// 只在外觀不同時才切換。changeToolboxStyle 會把「目前工作區」存進另一個外觀的暫存變數，
		// 外觀相同時呼叫會把 Scratch 積木誤存進 xmlBlockly（或反之），造成兩區積木錯亂。
		var isScratch = (blocks.getAttribute('platform') == 'scratch');
		if (isScratch != scratchStyle) {
			scratchStyle = isScratch;
			changeToolboxStyle();
		}

		workspace.clear(true);
		Blockly.Xml.domToWorkspace(blocks, workspace);

		workspace.getToolbox().clearSelection();
		if (scratchStyle) {
			// Scratch 外觀（ContinuousToolbox）：refreshSelection 會讓積木清單自動打開，
			// 載入積木時的 BLOCK_CREATE 事件也會觸發延遲顯示，所以改為載入後確保清單關閉
			closeScratchFlyout();
		} else {
			workspace.getToolbox().refreshSelection();
		}

		workspace.scrollCenter();
		resetOutput();
	}

	// Scratch 外觀的積木清單預設為關閉：在外掛延遲顯示（約 100ms）之後再關閉一次
	// 若考生取消勾選「收合」（autoClose = false），則維持開啟
	function closeScratchFlyout() {
		var ws = workspace;
		var close = function () {
			try {
				if (!scratchStyle || ws !== workspace) return;
				var tb = ws.getToolbox(), fl = tb && tb.getFlyout();
				if (!fl || fl.autoClose === false) return;
				if (fl.isVisible()) {
					fl.setVisible(false);
					tb.clearSelection();
					ws.resize();
				}
			} catch (e) { console.log('closeScratchFlyout:', e); }
		};
		[300, 800].forEach(function (ms) { setTimeout(close, ms); });
	}

	// =====================================================
	//  積木結構檔加密／解密（金鑰＝競賽代碼，存在全域變數 examKey）
	// =====================================================
	function encryptWorkspaceFile(xmlText) {
		if (!examKey || typeof CryptoJS === 'undefined') throw new Error('尚未登錄，無法加密儲存積木結構檔');
		return CryptoJS.AES.encrypt(xmlText, examKey).toString();
	}

	// 回傳 xml 文字；無法解密回傳 null。未加密的 xml（以 < 開頭）直接回傳，相容舊檔
	function decryptWorkspaceFile(text) {
		text = String(text || '').replace(/^﻿/, '').trim();
		if (text.charAt(0) === '<') return text;
		if (!examKey || typeof CryptoJS === 'undefined') return null;
		try {
			var xml = CryptoJS.AES.decrypt(text, examKey).toString(CryptoJS.enc.Utf8);
			return /^\s*<xml[\s>]/.test(xml) ? xml : null;
		} catch (e) {
			return null;
		}
	}

	// =====================================================
	//  閒置清空與使用時間記錄
	// =====================================================
	function markActive() {
		try { localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now())); } catch (e) {}
	}

	var lastActiveMark = 0;
	function onUserActivity() {
		var now = Date.now();
		if (now - lastActiveMark > 15000) {   // 最多每 15 秒寫入一次
			lastActiveMark = now;
			markActive();
		}
	}

	function startActivityTracking() {
		markActive();
		lastActiveMark = Date.now();
		['pointerdown', 'keydown', 'wheel'].forEach(function (t) {
			document.addEventListener(t, onUserActivity, true);
		});
		// 頁面開著且顯示中也算使用中（例如考生正在閱讀題目）
		setInterval(function () {
			if (document.visibilityState === 'visible') markActive();
		}, 60000);
		window.addEventListener('pagehide', markActive);
		document.addEventListener('visibilitychange', function () {
			if (document.visibilityState === 'hidden') markActive();
		});
	}

	function showToast(text) {
		var t = document.createElement('div');
		t.textContent = text;
		t.style.cssText = 'position:fixed;left:50%;top:80px;transform:translateX(-50%);z-index:2147482500;' +
			'background:#3B4A78;color:#fff;padding:10px 18px;border-radius:8px;font-size:15px;' +
			'box-shadow:0 6px 18px rgba(0,0,0,.25);font-family:"Microsoft JhengHei","PingFang TC","Noto Sans TC",sans-serif;';
		document.body.appendChild(t);
		setTimeout(function () { t.remove(); }, 5000);
	}

	// 清空工作區積木、試題內容區（題目、執行結果、正式評分結果與評分紀錄）與目前題目的全域變數
	function resetSessionData() {
		newFile();                               // 清空工作區與執行結果
		try { workspace.clearUndo(); } catch (e) {}   // 不可再「復原」回上一位使用者的積木
		if (scratchStyle) closeScratchFlyout();
		try {
			localStorage.removeItem(WORKSPACE_STORAGE_KEY);
			localStorage.removeItem(QUESTION_STORAGE_KEY);
			localStorage.removeItem(QUESTION_META_KEY);
			// 評分紀錄：清除此瀏覽器中所有帳號的紀錄
			Object.keys(localStorage)
				.filter(function (k) { return k.indexOf(GRADING_STORAGE_PREFIX) === 0; })
				.forEach(function (k) { localStorage.removeItem(k); });
		} catch (e) {}
		document.getElementById('question_input').innerHTML = '';
		examName = examQuestionNo = examQuestionName = '';
		lastGradeResult = null;
		var co = document.getElementById('console_output');
		if (co) co.innerHTML = '';
		toggleConsoleForm(false);
		showQuestionTab('question');
		renderGradePanel();
	}
	window.resetSessionData = resetSessionData;

	// =====================================================
	//  Ctrl + Delete：確認後清空暫存資料（與閒置清空相同的範圍，登錄狀態保留）
	// =====================================================
	var clearConfirmOpen = false;

	function confirmClearStorage() {
		return new Promise(function (resolve) {
			clearConfirmOpen = true;
			var mask = document.createElement('div');
			mask.className = 'clear-confirm';
			mask.setAttribute('role', 'alertdialog');
			mask.innerHTML =
				'<div class="cc-box">' +
					'<div class="cc-head">清除暫存資料</div>' +
					'<div class="cc-body">確定要清除這台電腦上的暫存資料嗎？將清除：' +
						'<ul><li>工作區積木（含復原紀錄）</li><li>試題內容與測資、題號</li><li>執行結果</li><li>正式評分結果與所有評分紀錄</li></ul>' +
						'<div class="cc-warn">清除後無法復原。已下載的積木結構檔不受影響。</div></div>' +
					'<div class="cc-btns"><button type="button" class="cc-cancel">取消</button>' +
					'<button type="button" class="cc-ok">確定清除</button></div>' +
				'</div>';
			document.body.appendChild(mask);
			var done = function (ok) {
				document.removeEventListener('keydown', onKey, true);
				mask.remove();
				clearConfirmOpen = false;
				resolve(ok);
			};
			var onKey = function (e) {
				if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); done(false); }
			};
			document.addEventListener('keydown', onKey, true);
			mask.querySelector('.cc-cancel').addEventListener('click', function () { done(false); });
			mask.querySelector('.cc-ok').addEventListener('click', function () { done(true); });
			mask.addEventListener('mousedown', function (e) { if (e.target === mask) e.preventDefault(); });
			setTimeout(function () { mask.querySelector('.cc-cancel').focus(); }, 0);   // 預設焦點在「取消」
		});
	}

	document.addEventListener('keydown', onClearKey, true);
	function onClearKey(e) {
		if (!(e.ctrlKey && (e.key === 'Delete' || e.key === 'Del'))) return;
		if (!ExamLogin.isUnlocked() || RunWatch.isActive() || clearConfirmOpen) return;   // 未登錄、執行中或已開啟確認視窗
		// 正在文字欄位中輸入（含積木欄位編輯框）時保留原本的「刪除一個字」功能
		var t = e.target;
		if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
		e.preventDefault();
		e.stopPropagation();
		confirmClearStorage().then(function (ok) {
			if (!ok) return;
			resetSessionData();
			markActive();
			showToast('已清除暫存資料（工作區積木、試題內容、執行結果與評分紀錄）。');
		});
	}

	ExamLogin.onUnlock(function () {
		renderGradePanel();
		whenAppReady(function () {
			var idle = Date.now() - lastActiveAtLoad;
			if (ExamLogin.resetReason() === 'account') {
				// 與上一位帳號不同，考生已同意清除
				resetSessionData();
				showToast('已切換登錄帳號，先前的工作區積木、試題內容與評分紀錄已清除。');
			} else if (!lastActiveAtLoad || idle > INACTIVE_RESET_MS || idle < 0) {
				resetSessionData();
				if (lastActiveAtLoad) showToast('距離上次使用已超過 ' + (function (m) { return m % 1440 === 0 ? (m / 1440) + ' 天' : m % 60 === 0 ? (m / 60) + ' 小時' : m + ' 分鐘'; })(Math.round(INACTIVE_RESET_MS / 60000)) + '，已清空工作區積木與試題內容。');
			}
			// 上次暫存的題目不在本次試題代碼的題號中：清除題目，避免作答未開放的題目
			if (examQuestionNo && examAllowedNos.length && examAllowedNos.indexOf(String(Number(examQuestionNo))) < 0) {
				document.getElementById('question_input').innerHTML = '';
				examName = examQuestionNo = examQuestionName = '';
				lastGradeResult = null;
				saveQuestionToStorage();
				renderGradePanel();
			}
			startActivityTracking();
		});
	});

	function stopCode() {
	  // 原本設定 src = "about:blank"：本機 file:// 開啟時 iframe 會變成不同來源，之後無法寫入執行結果。
	  // 改為直接清空內容（效果相同）。
	  resetOutput();
	}
	
	document.getElementById('button_run').onclick = function () {
        if (RunWatch.isActive()) return;   // 執行或評分中
        document.getElementById('javascript_content').style.display = "block";

        // 先切換到「執行結果」頁籤，缺少開始積木時才看得到提示訊息
        showQuestionTab('output');

        if (scratchStyle) {
            const topBlocks = workspace.getBlocksByType("javascript_start_scratch", false); 
            if (topBlocks.length!=1) {
                toggleConsoleForm(false);
                iframeWrite("iframe_output", Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"]);
                //alert(Blockly.Msg["JAVASCRIPT_START_ALERT_SCRATCH"]);
                if (topBlocks.length==0) {
                    var xml = '<block type="javascript_start_scratch" x="10" y="10"></block>';
                    //Blockly.Xml.domToBlock(Blockly.utils.xml.textToDom(xml), workspace);				
                }
                return;
            }
        }
      
		const scratchBlocks = workspace.getBlocksByType("javascript_console_scratch", false);
        const blocklyBlocks = workspace.getBlocksByType("javascript_console", false);
		const printBlocks = workspace.getBlocksByType("text_print", false);		
		if (scratchBlocks.length>0||blocklyBlocks.length>0||printBlocks.length>0)
            toggleConsoleForm(true);
        else
            toggleConsoleForm(false);

        document.getElementById('javascript_content').style.display = "block";
        reloadZoom();	
        document.getElementById("question_input").style.height = "35%";
        document.getElementById("iframe_output").style.height = "60%";

        showQuestionTab('output');
        document.getElementById('iframe_output').innerHTML = "";
        stopCode();
        setTimeout(function(){
            runCode();
        }, 100);	
	}	
	
	function updateMsg() {
		if (typeof msg != "undefined") {
			for (var i=0;i<msg.length;i++) {
				if (msg[i][0]=="document") {
					document.title=msg[i][2];
				}				
				else if (msg[i][1]=="innerHTML") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).innerHTML=msg[i][2];
				}
				else if (msg[i][1]=="title") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).title=msg[i][2];
				}	
				else if (msg[i][1]=="value") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).value=msg[i][2];
				}
				else if (msg[i][1]=="placeholder") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).placeholder=msg[i][2];
				}				
			}
		}
	}		
	
	document.getElementById('button_copycode').onclick = function () {
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		navigator.clipboard.writeText(iframeDocument.body.innerText.trim()).then(function() {
			alert(Blockly.Msg.COPY_CLIPBOARD);
		}, function(err) {
			console.error(err);
		});
	}
	
	document.getElementById('button_open_xml').onclick = function () {
		var e = document.getElementById("importBlocks");
		if (e) {
			e.parentElement.removeChild(e);
		}
		
		var input=document.createElement('input');
		input.type="file";
		input.id="importBlocks";
		input.style.display = "none";
		input.accept=".xml";
		input.onchange = function(element) {
			try {	
				var file = this.files[0];
				if (file) {
					var fr = new FileReader();           
					fr.onload = function (event) {
						// 以競賽代碼（examKey）解密後載入；未加密的舊 xml 檔也可直接載入
						var xmlText = decryptWorkspaceFile(event.target.result);
						if (xmlText === null) {
							alert('無法開啟：此檔案不是以目前競賽代碼加密的積木結構檔。');
							return;
						}
						try {
							loadWorkspaceXml(xmlText);
						} catch (e) {
							alert('積木結構檔內容錯誤，無法載入。');
							console.error(e);
							return;
						}
						reloadZoom();
					};
					fr.readAsText(file);
				}
			} catch (e) {
				alert(e);
			}	  
		}

		document.body.appendChild(input);
		setTimeout(function(){
			input.click();
		},500);
	}

	function changeToolboxStyle() {
		if (scratchStyle) {
			Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = "";
			Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = "";
			xmlBlockly = Blockly.Xml.workspaceToDom(this.workspace);
			xmlBlockly = Blockly.Xml.domToText(xmlBlockly);
			this.workspace.dispose();
			this.workspace = null;
			document.getElementById("root").innerHTML = "";
			var workspace = window.loadToolbox('zelos', catSystemScratch, 0.9);
			if (xmlScratch)
				Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xmlScratch), workspace);
		} else {
			Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = Blockly.Msg["PROCEDURES_BEFORE_PARAMS_BACKUP"];
			Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS_BACKUP"];		
			xmlScratch = Blockly.Xml.workspaceToDom(this.workspace);
			xmlScratch = Blockly.Xml.domToText(xmlScratch);
			this.workspace.dispose();
			this.workspace = null;
			document.getElementById("root").innerHTML = "";		
			var workspace = window.loadToolbox('geras', catSystem, 0.9);
			if (xmlBlockly)
				Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xmlBlockly), workspace);
		}
	}	
    
    // ===== 題庫選單 =====
    // 題庫檔皆已加密：只有考生登錄成功（以競賽代碼解密成功）的題庫才會出現在選單中
    const examSelect  = document.getElementById('importQuestion_list');
    const examListDiv = document.getElementById('importQuestionsList');
    const examCache   = {};

    function addExamOptions() {
        examSelect.innerHTML = '';
        ExamLogin.getExams().forEach(exam => {
            examCache[exam.file] = exam.contest;
            examSelect.add(new Option(exam.name, exam.file));
        });
    }

    // 取得已解密的題庫內容（contest）
    async function loadExam(file) {
        if (examCache[file] !== undefined) return examCache[file];
        throw new Error('題庫 ' + file + ' 尚未解鎖');
    }

    async function showExam() {
        const file = examSelect.value;
        if (!file) { examListDiv.innerHTML = ''; return; }

        examListDiv.innerHTML = '載入中…';
        try {
            examListDiv.innerHTML = await loadExam(file);
        } catch (err) {
            examListDiv.innerHTML = '題庫載入失敗';
            console.error(err);
        }
    }

    // 按「查詢題庫」或切換選單時載入
    document.getElementById('importQuestionsButton').addEventListener('click', showExam);
    examSelect.addEventListener('change', showExam);

    // 登錄前清空選單；登錄成功後加入可解密的題庫，並先載入第一份
    examSelect.innerHTML = '';
    ExamLogin.onUnlock(() => {
        addExamOptions();
        if (examSelect.options.length > 0) showExam();
    });

    // 開啟「匯入題目」視窗時，若選單被語系文字等清空，重新填入已解鎖的題庫
    function fillExamSelect() {
        if (examSelect.options.length > 0) return;
        addExamOptions();
        if (examSelect.options.length > 0) showExam();
    }

	// 載入參考答案：path 例如 exam/answer/114南投縣國小組/勇者的挑戰_Blockly.xml（已 URL 編碼）
	// path 可放多個路徑，用 | 分隔，依序嘗試，前一個找不到才試下一個
	// 例如 ../exam/answer/113全國賽/飲食兌換券_Blockly.xml|exam/answer/113全國賽/飲食兌換券_Blockly.xml
	function showAnswer(path) {
		if (!path) return;
		var paths = String(path).split("|").filter(function (p) { return p; });
		if (paths.length == 0) return;

		// 工作區已有積木時先確認，避免覆蓋學生自己的作答
		if (workspace && workspace.getAllBlocks(false).length > 0) {
			var ok = confirm(Blockly.Msg["SHOW_ANSWER_CONFIRM"] || Blockly.Msg["SHOWANSWER_QUEST"]);
			if (!ok) return;
		}

		var isLocal = (location.protocol === "file:");

		// 讀取單一路徑的文字內容：
		// 預設線上版 → fetch 讀取 xxx.xml；失敗時改用離線版 → 載入同名的 xxx.xml.js
		function readText(p) {
			return readXmlOnline(p).catch(function (err) {
				console.warn("線上版讀取失敗，改用離線版 " + p + ".js：", err);
				return readXmlOffline(p);
			});
		}

		// 線上版：fetch 讀取 XML
		function readXmlOnline(p) {
			return fetch(p, { cache: "no-cache" }).then(function (response) {
				if (!response.ok) throw new Error("HTTP " + response.status);
				return response.text();
			});
		}

		// 離線版：用 <script> 載入 xxx.xml.js，取出 window.__answerXml
		function readXmlOffline(p) {
			return new Promise(function (resolve, reject) {
				window.__answerXml = undefined;
				var s = document.createElement("script");
				s.src = p + ".js?t=" + Date.now();
				s.charset = "utf-8";
				s.onload = function () {
					s.remove();
					var xml = window.__answerXml;
					window.__answerXml = undefined;
					if (typeof xml === "string") resolve(xml);
					else reject(new Error("檔案內沒有 __answerXml：" + p + ".js"));
				};
				s.onerror = function () {
					s.remove();
					reject(new Error("找不到 " + p + ".js"));
				};
				document.body.appendChild(s);
			});
		}

		// 本機模式下 .js 包裝檔都找不到時，讓使用者自己選擇 XML 檔
		function pickFile() {
			return new Promise(function (resolve, reject) {
				var input = document.createElement("input");
				input.type = "file";
				input.accept = ".xml";
				input.style.display = "none";
				input.onchange = function () {
					var file = this.files[0];
					input.remove();
					if (!file) { reject(new Error("未選擇檔案")); return; }
					var fr = new FileReader();
					fr.onload = function (e) {
						try { resolve(Blockly.utils.xml.textToDom(e.target.result)); }
						catch (err) { reject(err); }
					};
					fr.onerror = function () { reject(fr.error); };
					fr.readAsText(file, "utf-8");
				};
				document.body.appendChild(input);
				input.click();
			});
		}

		// 依序讀取，回傳第一個讀得到且是有效 XML 的檔案
		function fetchFirst(i) {
			return readText(paths[i])
				.then(function (xmlText) {
					var dom = Blockly.utils.xml.textToDom(xmlText);   // 不是有效 XML 會丟出錯誤
					return dom;
				})
				.catch(function (err) {
					console.log(paths[i], err);
					if (i + 1 < paths.length) return fetchFirst(i + 1);
					throw err;
				});
		}

		fetchFirst(0)
			.catch(function (err) {
				if (!isLocal) throw err;
				// 本機且沒有 .js 包裝檔：開啟選檔視窗，請使用者選擇答案 XML
				var name = paths[0];
				try { name = decodeURIComponent(name); } catch (e) {}
				console.log("本機模式找不到答案包裝檔，改由使用者選擇檔案：" + name);
				return pickFile();
			})
			.then(function (blocks) {
				// 依 XML 的 platform 屬性切換 Blockly / Scratch 外觀，只在不同時才切換
				var isScratch = (blocks.getAttribute('platform') == 'scratch');
				if (isScratch != scratchStyle) {
					scratchStyle = isScratch;
					changeToolboxStyle();
				}

				workspace.clear(true);
				Blockly.Xml.domToWorkspace(blocks, workspace);

				workspace.getToolbox().clearSelection();
				workspace.getToolbox().refreshSelection();
				workspace.scrollCenter();

				toggleImportQuestionForm(false);
				reloadZoom();
				resetOutput();
			})
			.catch(function (err) {
				console.log(err);
				var names = paths.map(function (p) {
					try { return decodeURIComponent(p); } catch (e) { return p; }
				});
				alert((Blockly.Msg["SHOW_ANSWER_ERROR"] || Blockly.Msg["SHOWANSWER_ERROR"]) + "\n" + names.join("\n"));
			});
	}
	window.showAnswer = showAnswer;

    const langToggle = document.getElementById("lang-toggle");
    const langPanel  = document.getElementById("lang-panel");

    // 點圖示：顯示 / 隱藏
    langToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        langPanel.classList.toggle("show");
    });

    // 點選語言：跳轉
    langPanel.querySelectorAll(".lang-option").forEach(function (opt) {
        opt.addEventListener("click", function () {
            location.href = "?lang=" + this.dataset.lang;
        });
    });

    // 點其他地方：收起
    document.addEventListener("click", function (e) {
        if (!langPanel.contains(e.target)) {
            langPanel.classList.remove("show");
        }
    });

    // 標示目前語言
    const currentLang = new URLSearchParams(location.search).get("lang");
    if (currentLang) {
        const cur = langPanel.querySelector('[data-lang="' + currentLang + '"]');
        if (cur) cur.classList.add("active");
    }   
});	

var contents = ['javascript_content'];
function textareaFocus(id) {
	for (var i in contents) {
		const content = document.getElementById(contents[i]);
		content.style.zIndex = (contents[i]==id)?"99":"98";
	}
}

// 「工具箱」頁籤：顯示積木工作區與試題內容視窗
function displayTab(id) {
	document.getElementById('category_content').style.display = "block";
	document.getElementById('javascript_content').style.display = "block";
}

function contentZoom(content) {
	if (!content) content = "javascript";
	const div_title = document.getElementById(content+"_title");
	const div_content = document.getElementById(content+"_content");
	const div_code = document.getElementById(content+"_code");
	if (div_content.style.height!= "40px") {
		div_content.w = div_content.style.width;
		div_content.h = div_content.style.height;
		div_content.l = div_content.style.left;
		div_content.t = div_content.style.top;
		
		div_content.style.width = "calc(20vw)";
		div_content.style.height = "40px";
		div_code.style.display = "none";

		if (content=="javascript") {
			div_content.style.left = "calc(98% - 20vw)";
			div_content.style.top = "70px";
		}
	}
	else {
		div_content.style.width = div_content.w;
		div_content.style.height = div_content.h;
		div_code.style.display = "block";
		
		if (content=="javascript") {
			div_content.style.left = div_content.l;	
			div_content.style.top = div_content.t;
		}			
	}
}

function reloadZoom(content) {
	if (!content) content = "javascript";

	const codeDiv = document.getElementById(content+"_code");
	codeDiv.style.display = "block";

    const contentDiv = document.getElementById(content + "_content");
	contentDiv.style.width = '450px';
	contentDiv.style.height = 'calc(100vh - 100px)';
	contentDiv.style.left = 'calc(100vw - 478px)';
	contentDiv.style.top = '70px';
	contentDiv.style.padding = '0em';
	contentDiv.style.fontSize = '14px';
	contentDiv.style.position = 'absolute';
    
	const questionInput = document.getElementById("question_input");

	questionInput.style.flex = '1';
	questionInput.style.height = '60%';
	questionInput.style.width = '100%';
    questionInput.scrollTop = 0; 
    
    document.getElementById("iframe_output").style.display = "flex";
    document.getElementById("iframe_output").style.height = "35%";
    document.getElementById("question_splitter").style.display = "";
}

function loadExam() {
	document.getElementById("question_input").style.height = '60%';
    document.getElementById("question_input").scrollTop = 0;
    document.getElementById("iframe_output").style.display = "block";
    document.getElementById("iframe_output").style.height = "35%";
}

if (typeof require !== "undefined") {
	var http = require('http');
	var fs = require('fs');
	var path = require('path');

	http.createServer(function (request, response) {

		var filePath = './package.nw' + request.url.split("?")[0];
		if (filePath == './package.nw/') {
			filePath = './package.nw/index.html'
		}

		var extname = String(path.extname(filePath)).toLowerCase();
		var mimeTypes = {
			'.html': 'text/html',
			'.js': 'text/javascript',
			'.css': 'text/css',
			'.json': 'application/json',
			'.png': 'image/png',
			'.jpg': 'image/jpg',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
			'.wav': 'audio/wav',
			'.mp4': 'video/mp4',
			'.woff': 'application/font-woff',
			'.ttf': 'application/font-ttf',
			'.eot': 'application/vnd.ms-fontobject',
			'.otf': 'application/font-otf',
			'.wasm': 'application/wasm'
		};

		var contentType = mimeTypes[extname] || 'application/octet-stream';

		fs.readFile(filePath, function(error, content) {
			if (error) {
				if(error.code == 'ENOENT') {
					fs.readFile('./404.html', function(error, content) {
						response.writeHead(404, { 'Content-Type': 'text/html' });
						response.end(content, 'utf-8');
					});
				}
				else {
					response.writeHead(500);
					response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
				}
			}
			else {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			}
		});

	}).listen(3000);

	// Server: http://127.0.0.1:3000
}
