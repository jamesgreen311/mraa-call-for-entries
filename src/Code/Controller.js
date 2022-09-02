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
function loadError() {
    return render(`${pageRoot}/Error`);
}
