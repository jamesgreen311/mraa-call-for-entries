/*
    Accepts input and converts it to commands for the model or view.

    The controller responds to the user input and performs interactions on the data model objects. 
    The controller receives the input, optionally validates it and then passes the input to the model.
*/
var Route = {};
Route.path = function (r, callback) {
    Route[r] = callback;
    //Route[Options] = r;
}

function doGet(e) {
    var r;
    //var s = "";
    Route.path("done", loadThankYou);
    Route.path("test", loadSamplePage);

    // Add all current show ids as Routes
    let shows = getAllShowIds();
    for (let s of shows) {
        Route.path(s, loadCFE);
    }

    if (Route[e.parameter.v]) {
        r = Route[e.parameter.v](e.parameter.v);
    } else {
        r = loadError();
    }
    return r;
}

function saveFile(f,d,imgfolder,sheet) {
    let blob = Utilities.newBlob(f.bytes, f.mimeType, f.filename);
    let targetFolderId = imgfolder == undefined?imageFolderId:imgfolder;
    let uploadFolder = DriveApp.getFolderById(targetFolderId);
    let today = new Date();

    let newFile = uploadFolder.createFile(blob).getId();
    d.push(newFile);
    d.push(""); // placeholder for availability
    d.push(""); // placeholder for hidden
    d.push(today.toString());
    
    console.log(d);
    console.log(sheet);

    let done = saveToSheet(d,sheet);
    return done;
}

function saveToSheet(data,sheet) {
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    console.log(ss.getId());
    // validate the sheet still exists, it could have been deleted or renamed and config record never changed.
    let ws = ss.getSheetByName(sheet);
    console.log(ws.getName());

    ws.appendRow(data);
    return true;
}

/*
Add a new show to the Config tab
* @param {object} show
* @return {array} row
*/
function addShowToSheet(show) {
    let row = [
        generateUniqueId(),
        show.exhibitName,
        show.startDate,
        show.closeDate,
        show.maxEntriesPerArtist,
        show.maxEntriesPerShow,
        createImageFolder(show.exhibitName)
    ]
    config.appendRow(row);
    createDataSheet(show.exhibitName).showSheet();
    return row;
}

function loadSamplePage() {
    return render(`${pageRoot}/CallForEntries`);
}

function loadCFE(showId) {
    let s = getShow(showId);
    return render(`${pageRoot}/CallForEntries`, s);
}

function loadThankYou() {
    return render(`${pageRoot}/ThankYou`);
}

function loadError() {
    return render(`${pageRoot}/Error`);
}
