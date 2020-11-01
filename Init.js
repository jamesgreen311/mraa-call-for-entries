function init() {

  // Scopes needed
  // SpreadsheetApp.open(file);
  // DriveApp.createFile(blob);
  // SpreadsheetApp.getUi();
}

function connect(id) {
  let conn;
  if (id) {
      conn = SpreadsheetApp.openById(id);
  } else {
      conn = SpreadsheetApp.getActiveSpreadsheet();
  }
  return conn;
}