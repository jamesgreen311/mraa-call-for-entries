function onOpen(e) {
    console.log(e);
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
