/**
 * 正式評分結果接收端＋成績讀取（Google Apps Script 網頁應用程式）
 *
 * doPost：考生網頁存檔評分後上傳一筆成績（寫入工作表 grade）
 * doGet ：成績統計網頁讀取全部成績（需 key＝REPORT_KEY，否則拒絕）
 *
 * 更新方式：把本檔內容整個貼上取代舊程式 → 儲存 →
 *   部署 → 管理部署作業 → 編輯（鉛筆）→ 版本選「新版本」→ 部署。網址不變。
 */
var SPREADSHEET_ID = '1wAjaThthCij6X1kix6ZYfAx2YCnO66qdl7wEpKzGOh0';
var SHEET_NAME     = 'grade';
var HEADERS = ['競賽代碼', '電腦代碼', '競賽組別', '題號', '題目名稱', '得分', '評分時間', '評分結果狀態', '錯誤類型', '程式碼'];
var REPORT_COLS = 9;   // 成績統計網頁只讀前 9 欄（不含程式碼，更新較快）

// 成績統計網頁的管理密碼（請改成只有你知道的字串）
var REPORT_KEY = '請改成你的管理密碼';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse(e.postData.contents);
    lock.waitLock(20000);

    // 同一筆資料重傳（網頁端補傳）時不重複寫入
    var cache = CacheService.getScriptCache();
    if (d.id && cache.get('id_' + d.id)) return reply({ ok: true, duplicate: true });

    var sheet = getSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    else if (sheet.getRange(1, HEADERS.length).getValue() === '') {
      sheet.getRange(1, HEADERS.length).setValue(HEADERS[HEADERS.length - 1]);   // 舊工作表自動補上「程式碼」標題
    }

    var row = [
      d.contest, d.account, d.group, d.no, d.name,
      d.score, d.time, d.status, d.errorType, d.code
    ].map(function (v, i) {
      v = v == null ? '' : String(v);
      if (i === 5) return v === '' ? '' : Number(v);          // 得分
      if (/^[=+\-@]/.test(v)) v = "'" + v;                    // 避免被當成公式
      return v.length > 50000 ? v.slice(0, 50000) : v;         // 儲存格上限
    });

    var r = sheet.getLastRow() + 1;
    var range = sheet.getRange(r, 1, 1, row.length);
    // 競賽代碼、電腦代碼、題號、時間等以文字儲存（避免 0000 變成 0、時間被轉格式）；得分保持數字
    range.setNumberFormats([['@', '@', '@', '@', '@', '0', '@', '@', '@', '@']]);
    range.setValues([row]);

    if (d.id) cache.put('id_' + d.id, '1', 21600);   // 6 小時內排除重複
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// GET ?action=list&key=密碼[&callback=函式名稱]
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action !== 'list') return reply({ ok: true, message: 'grade receiver is running' }, p.callback);
  if (!REPORT_KEY || p.key !== REPORT_KEY) {
    Utilities.sleep(1000);   // 減緩猜密碼
    return reply({ ok: false, error: '管理密碼錯誤' }, p.callback);
  }
  var sheet = getSheet();
  var n = sheet.getLastRow();
  // 以顯示文字讀取，避免時間被轉成日期物件、0000 被轉成數字
  var rows = n < 2 ? [] : sheet.getRange(2, 1, n - 1, REPORT_COLS).getDisplayValues();
  return reply({ ok: true, rows: rows, readAt: new Date().toISOString() }, p.callback);
}

function getSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function reply(obj, callback) {
  var json = JSON.stringify(obj);
  if (callback && /^[A-Za-z_$][\w$]*$/.test(callback)) {   // JSONP（本機 file:// 開啟時備用）
    return ContentService.createTextOutput(callback + '(' + json + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
