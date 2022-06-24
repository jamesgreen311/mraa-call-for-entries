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
    medium: 8,    
    width: 9,           
    height: 10,          
    price: 11,          
    fileName: 12,       
    fileId: 13,               
    member: 14,         
    availability: 15,   
    hidden: 16,         
    timestamp: 17
}

const CountsRangeMap = {
    eventCounts: "a2:b",
    eventArtistCounts: "c2:e"
}

/**
 * Get total entries for the event from the pivot table
 * @param {string} evtTitle Event Title
 * @returns {number} Total
 */
function getTotalByEvent(evtTitle) {
    let totalByEvent = 0;
    let data = dataCountsSheet.getRange(CountsRangeMap.eventCounts+dataCountsSheet.getLastRow()).getValues();
    let filteredData = data.filter(r => r[0].toLowerCase() === evtTitle.toLowerCase());
    if (filteredData.length > 0) {
        totalByEvent = filteredData[0][1];
    }
    return totalByEvent;
}

/**
 * Get total number of entries for an event for each artist
 * @param {string} evtTitle Event Title
 * @param {string} email Artist unique identifier
 * @returns {number} Total
 */
function getTotalByEventArtist(evtTitle, email) {
    let totalByEventArtist = 0;
    let data = dataCountsSheet.getRange(CountsRangeMap.eventArtistCounts+dataCountsSheet.getLastRow()).getValues();
    let evtCount = data.filter(function(r) {
        return r[1].toLowerCase() === evtTitle.toLowerCase() && r[0].toLowerCase() === email.toLowerCase();
    })

    if (evtCount.length > 0) {
        totalByEventArtist = evtCount[0][2];
    }
    return totalByEventArtist;
}

function getUploadsByArtist(evtTitle, email) {
    let data = dataExhibitSheet.getRange(2, 1, dataExhibitSheet.getLastRow(), DataColMap.fileName).getValues();
    let uploads = data.filter(function(r) {
        return r[1].toLowerCase() === evtTitle.toLowerCase() && r[4].toLowerCase() === email.toLowerCase();
    })
    return JSON.stringify(uploads.map(r => r[11]))
}

/**
 * Get shows that are currently calling for entries
 */
 function getCurrentCalls() {
    let data = dataExhibitSheet.getRange(2, DataColMap.event_title, dataExhibitSheet.getLastRow()-1, 1).getValues();
    data = data.map( d => d[0])
    const uniqueEvents = [... new Set(data)]

    return uniqueEvents
}

/**
 * Get all submissions for an event
 * @param {string} id Event Id
 * @returns {array} all submissions
 */
function getSubmissionsById(id) {
    let data = dataExhibitSheet.getRange(2, DataColMap.event_id, dataExhibitSheet.getLastRow()-1, DataColMap.fileId).getValues();
    data = data.filter( d => d[0] === id)
    
    return data
}