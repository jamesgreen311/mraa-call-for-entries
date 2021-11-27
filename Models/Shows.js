const config = connect().getSheetByName("Config");

// Defines the structure of the config array
const Config = {
    showId: 0,
    exhibitName: 1,
    callForEntriesDate: 2,
    callForEntriesCloseDate: 3,
    maxEntriesPerArtist: 4,
    maxEntriesPerShow: 5,
    imageFolderId: 6,
    allowNFS: 7,
    registrationLink: 8
}

// Map field names to column position
const ConfigColMap = {
    showId: 1,
    exhibitName: 2,
    callForEntriesDate: 3,
    callForEntriesCloseDate: 4,
    maxEntriesPerArtist: 5,
    maxEntriesPerShow: 6,
    imageFolderId: 7,
    allowNFS: 8,
    registrationLink: 9
}

/**
 * Retrieve a show from the Config tab
 * @param {string} id Unique show identifier 
 * @returns {object} Show object
 */
function getShow(id) {
    let data = config.getRange(2, 1, config.getLastRow() - 1, config.getLastColumn()).getDisplayValues();
    let show = {};

    for (let d of data) {
        if (d[Config.showId] === id) {
            show.id = d[Config.showId]; // 0
            show.name = d[Config.exhibitName]; // 1
            show.openDate = d[Config.callForEntriesDate]; // 2
            show.closeDate = d[Config.callForEntriesCloseDate]; // 3
            show.maxEntriesPerArtist = d[Config.maxEntriesPerArtist]; // 4
            show.maxEntriesPerShow = d[Config.maxEntriesPerShow]; //5
            show.imageFolderId = d[Config.imageFolderId]; // 6
            show.allowNFS = d[Config.allowNFS]; // 7
            show.registrationLink = d[Config.registrationLink]; // 8
        } 
    }
    return show;
}

/**
 * 
 * @param {string} id Unique show identifier
 * @returns {string} Show name
 */
function getShowName(id) {
    return getShow(id).name;
}

/**
 * Get all current show identifiers
 * @returns {array} All unique show identifiers
 */
function getAllShowIds() {
    let shows = new Array();
    let allShows = config.getRange(2, 1, config.getLastRow() - 1, 1).getDisplayValues();

    shows = allShows.map(s => s[0]);

    return shows;
}

/**
 * Get maximum entries allowed for a show
 * @param {string} id Unique show identifier
 * @returns {number} Max entries
 */
function getMaxEntriesPerShow(id) {
    let max = 0;
    let maxEntriesPerShow = getShow(id).maxEntriesPerShow;
    if (maxEntriesPerShow) {
        max = maxEntriesPerShow;
    }
    return max;
}

/**
 * Get maximum entries allowed per artist
 * @param {string} id Unique show identifier
 * @returns {number} Max artist entries
 */
function getMaxEntriesPerArtist(id) {
    let max = getShow(id).maxEntriesPerArtist;
    return max;
}