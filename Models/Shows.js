const config = connect().getSheetByName("Config");
const appSettings = connect().getSheetByName("AppSettings")

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
    status: 8,
    payFeeOnly: 9,
    purchaseLimit: 10,
    registrationLink: 11
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
    status: 9,
    payFeeOnly: 10,
    purchaseLimit: 11,
    registrationLink: 12
}

// cell reference for max image size app setting
const ASMaxImageSize = "a2"

function getMaxImageSize() {
    let data = parseInt(appSettings.getRange(ASMaxImageSize).getDisplayValue())
    return (isNaN(data)?"":data)
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
            show.payFeeOnly = d[Config.payFeeOnly]; //8
            show.purchaseLimit = d[Config.purchaseLimit]; //9
            show.registrationLink = d[Config.registrationLink]; // 10
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

/** 
 * Get Pay Fee Only setting for requested show
 * @param {string} id Unique show identifier
 * @returns {boolean} yes/no
 */
function getPayFeeOnly(id) {
    let pfo = getShow(id).payFeeOnly;
    return pfo;

}

/**
 * Get a list of all open shows
 * @returns {array} a list of all open shows
 */
function getAllOpenShows() {
    let data = config.getRange(2, 1, config.getLastRow() - 1, config.getLastColumn()).getDisplayValues();
    let openShows = data.filter(d  => d[Config.status] === "OPEN" )

    return openShows
}