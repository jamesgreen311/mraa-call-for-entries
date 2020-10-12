// show name will change, must get frome config based on show id
//const sheetName = getShowName(id);
//const data = ds.getSheetByName(sheetName); 
const data = connect().getSheetByName("Data");

// map field names to column position
const DataColMap = {
    firstName: 1,
    lastName: 2,
    email: 3,
    phone: 4,
    workTitle: 5,
    width: 6,
    height: 7,
    medium: 8,
    price: 9,
    fileName: 10,
    fileId: 11,
    availability: 12,
    hidden: 13,
    timestamp: 14,

    // calculated fields
    emailCount: 16,
    artistCount: 17,
    totalSubmitted: 18
}

const DataRangeMap = {
    emailCount: "p2:p",
    artistCount: "q2:q",
    totalSubmitted: "r2",
    countsByArtist: "p2:q"
}

function getTotalArtistSubmitted(sheet) {
    let ws = connect().getSheetByName(sheet);
    let count = ws.getRange(DataRangeMap.totalSubmitted).getValue();
    return count;
}

function getTotalSubmittedByArtist(sheet, email) {
    /* console.log('getTotalSubmittedByArtist start.'); */
    let ws = connect().getSheetByName(sheet);
    let data = ws.getRange(DataRangeMap.countsByArtist).getValues();
    let count = 0;

    for (d of data) {
        if (d[0] === "") {
            // stop when we hit the first blank row in the range.
            break;
        }
        if (d[0].toLowerCase() === email.toLowerCase()) {
            count = d[1];
            break;
        }
    }
    /* console.log(`getTotalSubmittedByArtist end. Count ${count}`); */
    return count;
}
