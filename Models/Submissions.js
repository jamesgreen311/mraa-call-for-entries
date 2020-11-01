// show name will change, must get from config based on show id
//const sheetName = getShowName(id);
//const data = ds.getSheetByName(sheetName); 
//const data = connect().getSheetByName("Data");
const dataExhibitSheet = connect().getSheetByName("Exhibits");
const dataCountsSheet = connect().getSheetByName("Exhibitor Upload Counts");

// map field names to column position
const DataColMap = {
    event_id: 1,        
    event_title: 2,
    firstName: 3,       
    lastName: 4,        
    email: 5,           
    phone: 6,           
    workTitle: 7,       
    width: 8,           
    height: 9,          
    medium: 10,         
    price: 11,          
    fileName: 12,       
    fileId: 13,               
    member: 14,         
    availability: 15,   
    hidden: 16,         
    timestamp: 17,      

    // calculated fields - this has been moved to pivot table Exhibitor Upload Count
    emailCount: 18,     // R
    artistCount: 19,    // S   
    totalSubmitted: 20  // T
}

const CountsRangeMap = {
    eventCounts: "a2:b",
    eventArtistCounts: "c2:e"
}

// replaced by pivot table Exhibitor Upload Counts and CountsRangeMap
const DataRangeMap = {
    emailCount: "r3:r",
    artistCount: "s3:s",
    totalSubmitted: "t3",
    countsByArtist: "r2:s"
}

// replaced by getTotalByEvent()
function getTotalArtistSubmitted(evtTitle) {
    let ws = connect().getSheetByName(sheet);
    let count = ws.getRange(DataRangeMap.totalSubmitted).getValue();
    return count;
}

// replaced by getTotalByEventArtist()
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

function getTotalByEventArtist(evtTitle, email) {
    let data = dataCountsSheet.getRange(CountsRangeMap.eventArtistCounts+dataCountsSheet.getLastRow()).getValues();
    let evtCount = data.filter(function(r) {
        return r[1].toLowerCase() === evtTitle.toLowerCase() && r[0].toLowerCase() === email.toLowerCase();
    })

    let count = evtCount[0][2];
    return count;
}