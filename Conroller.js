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
    //Route.path("done", showDone);
    Route.path("test", loadSamplePage);

    var r;
    var s = "";
    if (Route[e.parameter.v]) {
        r = Route[e.parameter.v]();

    } else {
        // default to main page
        if (e.parameter.s) {
            // get show id if passed
            s = e.parameter.s;
            let opt = {
                name: getShowName(s)
            };
            console.log(opt);
            r = render(`${pageRoot}/CallForEnties`, opt);
        } else {
            r = render(`${pageRoot}/Error`);
        }
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
    createDataSheet(show.exhibitName);
    return row;
}

function loadSamplePage() {
    return render(`${pageRoot}/CallForEntries`);
}