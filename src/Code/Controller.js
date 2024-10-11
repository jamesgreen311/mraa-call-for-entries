/**
 * Loads page for requested exhibit id if it exists and is not closed
 * @param {*} e 
 * @returns 
 */
function doGet(e) {
   const id = e ? e.parameter.v : "oldest"
   const show = getOpenCalls(id)
   if (show.length === 0) {
      return loadError(
         "No shows are currently open or the requested call for entries has closed."
      )
   }
   const showId = show[1]

   return loadWizard(showId)
   //return loadTestFetch(showId)
}

/**
 * Creates the Call For Entries Wizard
 * @returns {HTMLTemplate} Wizard page
 */
function loadWizard(id) {
   let s = getShow(id.toUpperCase())
   return render(`${pageRoot}/Wizard`, s)
}

function loadTestFetch(id) {
   let s = getShow(id.toUpperCase())
   return render(`${pageRoot}/TestFetch`, s)
}

/**
 * Creates the Error page 
 * @returns {HTMLTemplate} Error page
 */
function loadError(msg) {
    const appSettings = JSON.parse(getAppSettings())
    const opt = {text:msg, support:appSettings.cfecontact}
    return render(`${pageRoot}/Error`, opt);
}
