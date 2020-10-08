function onOpen(e) {
    SpreadsheetApp.getUi()
    .createMenu('Options')
    .addItem('Create a New Show', 'createShowForm')
    .addToUi();

    console.log(e);
}

function createShowForm() {
    let html = HtmlService
    .createHtmlOutputFromFile('Pages/CreateShowForm')
    .setTitle('Create a New Show');
    SpreadsheetApp.getUi().showSidebar(html);
}