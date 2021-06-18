/**
 * Generate a unique identifier.
 * @return {string} id 
 */
function generateUniqueId() {
    return Math.floor(Math.random() * Math.floor(100000000)).toString(16).toUpperCase();
}

/**
 * Create a new image folder for uploaded art work. Each show has it's own image folder.
 * @return {string} new folder id 
 */
function createImageFolder(name) {
    let parentFolder = DriveApp.getFolderById(parentImageFolderId);

    return parentFolder.createFolder(name).getId();
}

function createDataSheet(name) {
    let tmpl = connect().getSheetByName(dataTemplateName);
    return tmpl.copyTo(connect()).setName(name);
}

/* */
function render(f, opt) {
    let templ = HtmlService.createTemplateFromFile(f);
    if (opt) {
      let keys = Object.keys(opt);
      keys.forEach(function(k){
        templ[k] = opt[k];
      })
  
    }
    return templ.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

function getCurrentYear() {
  y = new Date().getFullYear();
  return y;
}
 
function isMember(email) {
  return exhibtingMembersEmail.includes(email.toLowerCase());
}