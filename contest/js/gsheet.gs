/**
 * 正式評分結果接收端（Google Apps Script 網頁應用程式）
 *
 * 安裝方式：
 * 1. 開啟試算表 → 擴充功能 → Apps Script，把本檔內容整個貼上並儲存。
 * 2. 部署 → 新增部署作業 → 類型選「網頁應用程式」
 *      執行身分：我
 *      誰可以存取：所有人
 *    按「部署」並授權，複製「網頁應用程式網址」（…/exec）。
 * 3. 把網址貼到 js/gsheet.js 的 GSHEET_WEBAPP_URL。
 * （之後若修改本程式，要用「管理部署作業 → 編輯 → 版本：新版本」重新部署，網址不變。）
 */
 
var SPREADSHEET_ID = '??????????';
var SHEET_NAME     = '??????????';

var HEADERS = ['競賽代碼', '登錄帳號', '競賽組別', '題號', '題目名稱', '得分', '評分時間', '評分結果狀態', '錯誤類型'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse(e.postData.contents);
    lock.waitLock(20000);

    // 同一筆資料重傳（網頁端補傳）時不重複寫入
    var cache = CacheService.getScriptCache();
    if (d.id && cache.get('id_' + d.id)) return reply({ ok: true, duplicate: true });

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    var row = [
      d.contest, d.account, d.group, d.no, d.name,
      d.score, d.time, d.status, d.errorType
    ].map(function (v) { return v == null ? '' : v; });

    var r = sheet.getLastRow() + 1;
    var range = sheet.getRange(r, 1, 1, row.length);
    // 競賽代碼、帳號、題號、時間等以文字儲存（避免 0000 變成 0、時間被轉格式）；得分保持數字
    range.setNumberFormats([['@', '@', '@', '@', '@', '0', '@', '@', '@']]);
    range.setValues([row]);

    if (d.id) cache.put('id_' + d.id, '1', 21600);   // 6 小時內排除重複
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return reply({ ok: true, message: 'grade receiver is running' });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
