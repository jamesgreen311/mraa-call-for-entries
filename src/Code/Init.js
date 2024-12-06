const projectName = "MRAA Call For Entries";
const ownerName = "James Green";
const pageRoot = "Pages";
const supportEmail = "tech@metrorichmondart.org";
// Id for Call For Entries Spreadsheet File
const CFE_ID = "1eJuLyL_MhXy_s8kKm8sYkUsJkzLMP7M-kfVzp_LxAVQ"
// Id for Membership Spreadsheet File
const MEMBER_ID = "1puqturm6WCBtfL3uaT_YICKHI9StLcPA4SosBuMs4ZY"

/**
 * The init file is processed first by Google App script. 
 */
function init() {
   // Scopes needed
   // SpreadsheetApp.open(file);
   // DriveApp.createFile(blob);
   // SpreadsheetApp.getUi();
   // GmailApp.sendEmail("tech@metrorichmondart.org", "Test", "Test")
}
/**
 * Placing connect here ensures that the SpreadsheetApp object is created 
 * and available to all the Models
 * @param  {string} id Spreadsheet id
 * @returns {object} SpreadsheetApp object
 */
function connect(id) {
  let conn;
  if (id) {
      conn = SpreadsheetApp.openById(id);
  } else {
      conn = SpreadsheetApp.getActiveSpreadsheet();
  }
  return conn;
}