// show name will change, must get from config based on show id
//const sheetName = getShowName(id);
//const data = ds.getSheetByName(sheetName); 
// const data = connect().getSheetByName("Data");
const dataExhibitSheet = connect().getSheetByName("Exhibits");
const dataCountsSheet = connect().getSheetByName("Exhibitor Upload Counts");

// map field names to column position
const DataColMap = {
    event_id: 1,
    event_title: 2,
    firstName: 3,       // A
    lastName: 4,        // B
    email: 5,           // C
    phone: 6,           // D
    workTitle: 7,       // E
    width: 8,           // F
    height: 9,          // G
    medium: 10,          // H
    price: 11,           // I
    fileName: 12,       // J
    fileId: 13,         // K
    showId: 14,         // L
    member: 15,         // M
    availability: 16,   // N
    hidden: 17,         // O
    timestamp: 18,      // P

    // calculated fields - this has been moved to pivot table Exhibitor Upload Count
    emailCount: 18,     // R
    artistCount: 19,    // S   
    totalSubmitted: 20  // T
}

const CountsRangeMap = {
    eventCounts: "a2:b",
    eventArtistCounts: "c2:e"
}

const DataRangeMap = {
    emailCount: "r3:r",
    artistCount: "s3:s",
    totalSubmitted: "t3",
    countsByArtist: "r2:s"
}

function getTotalArtistSubmitted(evtTitle) {
    let ws = connect().getSheetByName(sheet);
    let count = ws.getRange(DataRangeMap.totalSubmitted).getValue();
    return count;
}

function getTotalSubmittedByArtist(evtTitle, email) {
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
    return count;
}

function getTotalByEvent(evtTitle) {
    let data = dataCountsSheet.getRange(CountsRangeMap.eventCounts+dataCountsSheet.getLastRow()).getValues();
    return data.filter(r => r[0].toLowerCase() === evtTitle.toLowerCase())[0][1];
}