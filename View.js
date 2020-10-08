function onOpen(e) {
    SpreadsheetApp.getUi()
    .createMenu('Options')
    .addItem('Create a New Show', 'createShow')
    .addToUi();

    console.log(e);
}

function createShow() {
    let html = HtmlService.createHtmlOutputFromFile('Pages/CreateShowForm');
    SpreadsheetApp.getUi().showSidebar(html);
}