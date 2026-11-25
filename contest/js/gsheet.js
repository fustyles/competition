/*
  儲存積木結構檔時，正式評分完成後立即把評分結果上傳到 Google 試算表（工作表 grade）

  欄位：競賽代碼 | 電腦代碼 | 競賽組別 | 題號 | 題目名稱 | 得分 | 評分時間 | 評分結果狀態 | 錯誤類型 | 程式碼

  接收端是部署在試算表上的 Google Apps Script 網頁應用程式（見 gsheet_apps_script.gs），
  部署後把「網頁應用程式網址」（…/exec）填入下方 GSHEET_WEBAPP_URL。

  上傳失敗（例如斷線）時，資料先存在 localStorage 的待上傳佇列，
  之後下次儲存、重新開啟網頁或網路恢復時自動補傳；接收端會以 id 排除重複資料。
*/
var GSHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzGmEnnR8Exi69YltU-nLoda-i-RfCwe431x_UDoqE_moZ4PZ_liEpuIypouOHCwJ8Isg/exec';   // ← 貼上 Apps Script 部署後的網址，例如 https://script.google.com/macros/s/XXXX/exec

var GSheetUpload = (function () {
	var QUEUE_KEY = 'francis_gsheet_queue_standard';
	var QUEUE_MAX = 100;
	var CODE_MAX = 49000;   // 試算表單一儲存格上限 50,000 字
	var flushing = false;

	function pad(n) { return (n < 10 ? '0' : '') + n; }
	function formatTime(t) {
		var d = new Date(t);
		return d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()) + ' ' +
			pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
	}
	function truncate(code) {
		code = String(code || '');
		return code.length > CODE_MAX ? code.slice(0, CODE_MAX) + '\n// …（程式碼過長，已截斷）' : code;
	}
	function errorTypeLabel(reason) {
		return reason === 'timeout' ? '逾時' : reason === 'stopped' ? '手動停止' : reason === 'exception' ? '程式錯誤' : '';
	}

	function loadQueue() {
		try {
			var q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
			return Array.isArray(q) ? q : [];
		} catch (e) { return []; }
	}
	function saveQueue(q) {
		q = q.slice(-QUEUE_MAX);
		while (true) {
			try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); return; }
			catch (e) {
				// 空間不足：捨棄最舊的待上傳資料後重試
				if (!q.length) return;
				q = q.slice(Math.ceil(q.length / 4));
			}
		}
	}

	// 送出一筆；以 no-cors 傳送（本機 file:// 也可用），網路失敗時 Promise 會 reject
	function post(row) {
		return fetch(GSHEET_WEBAPP_URL, {
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify(row)    // 字串 body ＝ text/plain，不會觸發 CORS 預檢
		});
	}

	// 依序補傳佇列中的資料
	function flush() {
		if (flushing || !GSHEET_WEBAPP_URL) return Promise.resolve();
		var q = loadQueue();
		if (!q.length) return Promise.resolve();
		flushing = true;
		var row = q[0];
		return post(row).then(function () {
			saveQueue(loadQueue().filter(function (r) { return r.id !== row.id; }));
			flushing = false;
			return flush();
		}, function (e) {
			flushing = false;
			console.warn('評分資料上傳失敗，稍後自動重試：', e);
		});
	}

	// result：runOfficialGrading 回傳的評分結果；code：積木轉換產生的 JavaScript 程式碼
	function upload(result, code) {
		if (!result) return Promise.resolve();
		if (!GSHEET_WEBAPP_URL) {
			console.warn('尚未設定 GSHEET_WEBAPP_URL，評分資料未上傳到 Google 試算表');
			return Promise.resolve();
		}
		var isError = result.status === 'error';
		var row = {
			id:        result.id,                         // 排除重複用，不寫入試算表
			contest:   (typeof examKey !== 'undefined' ? examKey : ''),   // 競賽代碼
			account:   result.account || '',              // 電腦代碼
			group:     result.exam || '',                 // 競賽組別
			no:        result.no || '',                   // 題號
			name:      result.name || '',                 // 題目名稱
			score:     result.score,                      // 得分
			time:      formatTime(result.time),           // 評分時間
			status:    isError ? '錯誤' : '成功',          // 評分結果狀態
			errorType: isError ? errorTypeLabel(result.reason) : '',  // 錯誤類型
			code:      truncate(code)                     // 程式碼
		};
		var q = loadQueue();
		q.push(row);
		saveQueue(q);
		return flush();
	}

	// 網頁開啟及網路恢復時補傳
	window.addEventListener('load', function () { setTimeout(flush, 3000); });
	window.addEventListener('online', function () { flush(); });

	return { upload: upload, flush: flush, pending: function () { return loadQueue().length; } };
})();
