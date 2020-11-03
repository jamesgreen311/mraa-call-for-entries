const wsMembers = connect(membersDirectoryId).getSheetByName("Member Directory");
const exhibtingMembersEmail = getExhibitingMembers(wsMembers);

function getExhibitingMembers(wsMembers) {
    //const membersDirectory = SpreadsheetApp.openById(membersDirectoryId).getSheetByName("Member Directory");
    //const membersDirectory = SpreadsheetApp.openById(membersDirectoryId).getSheetByName("Member Directory");
    let members = wsMembers.getRange(4, 10, wsMembers.getLastRow() - 3, 6).getValues();
    let exhibitingMembers = members.filter(function (e) {
        return e[5] === "exhibiting";
    })
    return exhibitingMembers.map(m => m[0]);
}