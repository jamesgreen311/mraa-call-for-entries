/**
 * Loads page for requested exhibit id if it exists and is not closed
 * @param {*} e 
 * @returns 
 */
function doGet(e) {
    const id = e?e.parameter.v:"oldest"
    const show = getOpenCalls(id)
    if (show.length===0) {
        return loadError("No shows are currently open or the requested call for entries has closed.")
    }
    const showId = show[1]

    return loadWizard(showId)
}

/**
 * Creates the Call For Entries Wizard 
 * @returns {HTMLTemplate} Wizard page
 */
function loadWizard(id) {
    let s = getShow(id.toUpperCase());
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
