/* Bound spreadsheet UI */
function onOpen(e) {
    SpreadsheetApp.getUi()
    .createMenu('MRAA')
    .addItem('Create a New Show', 'createShowForm')
    .addToUi();
}

function createShowForm() {
    let html = HtmlService
    .createTemplateFromFile('Pages/CreateShowForm')
    .evaluate()
    .setTitle('Create a New Show');
    SpreadsheetApp.getUi().showSidebar(html);
}

