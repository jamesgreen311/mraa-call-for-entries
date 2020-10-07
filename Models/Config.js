const config = ds.getSheetByName("Config");
const Config = {
    showId: "a2:a",
    exhibitName: "b2:b",
    callForEntriesDate: "c2:c",
    callForEntrisCloseDate: "d2:d",
    maxEntriesPerArtist: "e2:2",
    maxEntriesPerShow: "f2:f",
    imageFolderId: "g2:g",
    uniqueId: "h2" // read-only generated field
}

/**
 * Get a unique identifier created by the Google Sheet function.
 * @return {string} id 
 */
function getUniqueId() {
    return config.getRange(Config.uniqueId).getDisplayValue();
}
