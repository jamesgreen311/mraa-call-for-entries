const config = connect().getSheetByName("Config");

// Defines the structure of the config array
const Config = {
    showId: 0,
    exhibitName: 1,
    callForEntriesDate: 2,
    callForEntriesCloseDate: 3,
    maxEntriesPerArtist: 4,
    maxEntriesPerShow: 5,
    imageFolderId: 6
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

}

/* const Show = {
    id: generateUniqueId()
} */

/* const Show = class {
    constructor(name, openDate, closeDate, artistMax, showMax, folderId) {
        this.id = generateUniqueId();
        this.name = name;
        this.openDate = openDate;
        this.closeDate = closeDate;
        this.maxEntriesPerArtist = artistMax;
        this.maxEntriesPerShow = showMax;
        this.imageFolderId = folderId;
    }
}
 */
/*
Retrieve a show from the Config tab
* @param {string} id
* @return {object} show
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
        } 
    }
    return show;
}

function getShowName(id) {
    return getShow(id).name;
}

/*

@Return {array} strings id of all shows 
*/
function getAllShowIds() {
    let shows = new Array();
    let allShows = config.getRange(2, 1, config.getLastRow() - 1, 1).getDisplayValues();

    shows = allShows.map(s => s[0]);

    return shows;
}

function getMaxEntriesPerShow(id) {
    return getShow(id).maxEntriesPerShow;
}

function getMaxEntriesPerArtist(id) {
    let max = getShow(id).maxEntriesPerArtist;
    return max;
}