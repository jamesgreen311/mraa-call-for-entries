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
    //Route.path("wizard", loadWizard);

    // Add all current show ids as Routes
    const shows = getOpenCalls();
    const oldestShow = getOpenCalls("oldest")
    const oldestShowId = oldestShow[1]
    if (shows.length===0) {
        return loadError("No shows currently open")
    }

    // preload all routes for open shows
    for (let s of shows) {
        Route.path(s, loadWizard);
    }

    if (Route[e.parameter.v]) {
        r = Route[e.parameter.v](e.parameter.v);
    } else {
        // default to the oldest open show
        r = loadWizard(oldestShowId);
    }
    return r;
}

/**
 * Creates the Call For Entries Wizard 
 * @returns {HTMLTemplate} Wizard page
 */
function loadWizard(showId) {
    let s = getShow(showId);
    return render(`${pageRoot}/Wizard`, s);
}

/**
 * Creates the Error page 
 * @returns {HTMLTemplate} Error page
 */
function loadError(msg) {
    const opt = {text:msg}
    return render(`${pageRoot}/Error`, opt);
}
