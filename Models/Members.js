const wsMembers = connect(membersDirectoryId).getSheetByName("Member Directory");
const exhibtingMembersEmail = getExhibitingMembers(wsMembers);
/**
 * @param  {} wsMembers
 * @returns [] array of member emails
 */
function getExhibitingMembers(wsMembers) {
    //const membersDirectory = SpreadsheetApp.openById(membersDirectoryId).getSheetByName("Member Directory");
    //const membersDirectory = SpreadsheetApp.openById(membersDirectoryId).getSheetByName("Member Directory");
    let members = wsMembers.getRange(3, 1, wsMembers.getLastRow() - 2, 15).getValues();
    let exhibitingMembers = members.filter(function (e) {
        return e[14].toLowerCase() === "exhibiting";
    })
    return exhibitingMembers.map(m => m[0]);
}

/**
 * @param string member email
 * @returns [] array of member first name, last name, phone
 */
function getMemberInfo(email) {
    
}