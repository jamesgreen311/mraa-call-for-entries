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