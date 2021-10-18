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
    let evtTitle = "MAKE IT SO";
    let artist = "Webb2@tester.com";

    let count = getTotalByEventArtist(evtTitle, artist);
    return count;
}

function testGetTotalByEvent() {
    let evtTitle = "MAKE IT SO";
    let count = getTotalByEvent(evtTitle);
    return count;
}

function testGetMemberInfo() {
    let wsMembers = connect(membersDirectoryId).getSheetByName("Member Directory");
    let memberInfo = getMemberInfo(wsMembers);
    console.log(memberInfo);
    return memberInfo;
}