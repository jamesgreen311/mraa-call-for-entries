function testGetEventCounts() {
    let sheetCounts = connect().getSheetByName("Exhibitor Upload Counts");
    let dataCounts = sheetCounts.getRange(CountsRangeMap.eventCounts+sheetCounts.getLastRow()).getValues();

    // get current event count 
    let evtCount = dataCounts.filter(function(r) {
        return r[0] === "Art Works";
    })

    return evtCount[0][1];
}

function testGetEventArtistCounts() {
    let sheetCounts = connect().getSheetByName("Exhibitor Upload Counts");
    let dataCounts = sheetCounts.getRange(CountsRangeMap.eventArtistCounts+sheetCounts.getLastRow()).getValues();

    // get current event count 
    let evtCount = dataCounts.filter(function(r) {
        return r[1] === "Art Works" && r[0] === "webb2@tester.com";
    })

    return evtCount[0][2];
}

function testGetTotalByEvent() {
    let evtTitle = "MAKE IT SO";
    let count = getTotalByEvent(evtTitle);
    return count;
}