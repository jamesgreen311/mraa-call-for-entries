/*
    Accepts input and converts it to commands for the model or view.

    The controller responds to the user input and performs interactions on the data model objects. 
    The controller receives the input, optionally validates it and then passes the input to the model.
*/
var Route = {};
Route.path = function (r, callback) {
    Route[r] = callback;
}

function doGet(e) {
    let r;
    Route.path("done", loadThankYou);
    Route.path("test", loadSamplePage);
    Route.path("payment", loadPaymentPage);
    Route.path("wizard", loadWizard);

    // Add all current show ids as Routes
    let shows = getAllShowIds();
    for (let s of shows) {
        Route.path(s, loadWizard);
    }

    if (Route[e.parameter.v]) {
        r = Route[e.parameter.v](e.parameter.v);
    } else {
        r = loadError();
    }
    return r;
}

function saveFile(f,d,imgfolder) {
    let blob = Utilities.newBlob(f.bytes, f.mimeType, f.filename);
    let targetFolderId = imgfolder == undefined?imageFolderId:imgfolder;
    let uploadFolder = DriveApp.getFolderById(targetFolderId);
    let today = new Date();
    let member = isMember(d[DataColMap.email-1])?"YES":"NO";
    let newFileId = uploadFolder.createFile(blob).getId();
    d.push(newFileId);
    d.push(member);   

    d.push(""); // placeholder for availability
    d.push(""); // placeholder for hidden
    d.push(today);
    return saveToSheet(d);
}

function saveToSheet(data) {
    let ws = connect().getSheetByName(targetSheet);
    ws.appendRow(data);
    return true;
}

/*

* @param {object} show
* @return {array} row
*/
/**
 * Add a new show to the Config tab
 * @param {object} show 
 * @returns {array} Row added to sheet
 */
function addShowToSheet(show) {
    let row = [
        generateUniqueId().toString(),
        show.exhibitName,
        show.startDate,
        show.closeDate,
        show.maxEntriesPerArtist,
        show.maxEntriesPerShow,
        createImageFolder(show.exhibitName)
    ]
    config.appendRow(row);
    config.getRange("c2:d").setNumberFormat("MM/dd/yyyy h:mm am/pm");
    //createDataSheet(show.exhibitName).showSheet();
    return row;
}

/**
 * 
 * @returns 
 */
function loadSamplePage() {
    return render(`${pageRoot}/CallForEntries`);
}

/**
 * Creates the Call For Entries form 
 * @param {string} showId Unique show identifier
 * @returns {HTMLTemplate} Call for entries form page
 */
function loadCFE(showId) {
    let s = getShow(showId);
    return render(`${pageRoot}/CallForEntries`, s);
}

/**
 * Creates the Thank You page 
 * @returns {HTMLTemplate} Thank You page
 */
function loadThankYou() {
    return render(`${pageRoot}/ThankYou`);
}

/**
 * Creates the Payment page
 * @returns {HTMLTemplate} Payment page
 */
function loadPaymentPage() {
    return render(`${pageRoot}/Payment`);
}

/**
 * Creates the Call For Entries Wizard 
 * @returns {HTMLTemplate} Wizard page
 */
function loadWizard() {
    let s = getShow(showId);
    return render(`${pageRoot}/Wizard`, s);
}

/**
 * Creates the Error page 
 * @returns {HTMLTemplate} Error page
 */
function loadError() {
    return render(`${pageRoot}/Error`);
}
