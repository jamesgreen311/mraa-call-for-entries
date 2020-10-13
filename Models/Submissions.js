// show name will change, must get from config based on show id
//const sheetName = getShowName(id);
//const data = ds.getSheetByName(sheetName); 
// const data = connect().getSheetByName("Data");

// map field names to column position
const DataColMap = {
    firstName: 1,       // A
    lastName: 2,        // B
    email: 3,           // C
    phone: 4,           // D
    workTitle: 5,       // E
    width: 6,           // F
    height: 7,          // G
    medium: 8,          // H
    price: 9,           // I
    fileName: 10,       // J
    fileId: 11,         // K
    showId: 12,         // L
    member: 13,         // M
    availability: 14,   // N
    hidden: 15,         // O
    timestamp: 16,      // P

    // calculated fields
    emailCount: 18,     // R
    artistCount: 19,    // S   
    totalSubmitted: 20  // T
}

const DataRangeMap = {
    emailCount: "r3:r",
    artistCount: "s3:s",
    totalSubmitted: "t3",
    countsByArtist: "r2:s"
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
