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
        loadError();
    }
    return r;
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
    render(`${pageRoot}/ThankYou`);
}

function loadError() {
    render(`${pageRoot}/Error`);
}
