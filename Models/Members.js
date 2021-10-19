/**
 * Map Members spreadsheet column numbers to column headers
 */
const MembersColMap = {
    email: 1,
    firstName: 2,
    lastName: 3,
    status: 5,
    phone: 11,
    membership: 13
}
const wsMembers = connect(membersDirectoryId).getSheetByName("Member Directory");

/**
 * @param  none
 * @returns [] array of all exhibiting members information
 * 
 * Member information array:
 *  email
 *  first name
 *  last name
 *  status
 *  phone number
 *  membership type 
*/
function getExhibitingMembers() {
    let exhibitingMembers = memberInfo.filter(function (e) {
        return e[5].toLowerCase() === "exhibiting";
    })
    return exhibitingMembers;
}

/**
 * @param none
 * @returns [] array of all active exhibiting members information
 * 
 * Member information array:
 *  email
 *  first name
 *  last name
 *  status
 *  phone number
 *  membership type
 */
function getActiveExhibitingMembers() {
    let activeExhibitingMembers = memberInfo.filter(function (e) {
        return e[5].toLowerCase() === "exhibiting" && e[3].toLowerCase() === "active";
    });
    return activeExhibitingMembers;  
}

/**
 * @param string member email
 * @returns [] array of member first name, last name, status, phone, membership type
 */
function getMemberInfo() {
    let lastRow = wsMembers.getLastRow();
    let firstRow = 3; // Assumes two header rows
    let memberInfoList = wsMembers.getRangeList(['A'+firstRow+':C'+lastRow, 
      'E'+firstRow+':E'+lastRow, 
      'K'+firstRow+':K'+lastRow, 
      'M'+firstRow+':M'+lastRow]); 
    let ranges = memberInfoList.getRanges();
    let colEmailName = ranges[0].getValues();
    let colStatus = ranges[1].getValues();
    let colPhone = ranges[2].getValues();
    let colMembership = ranges[3].getValues();
    let colCombined = [];

    for (x=0; x<ranges[0].getValues().length; x++) {
      colCombined.push([...colEmailName[x], ...colStatus[x], ...colPhone[x], ...colMembership[x]]);
    }
    return colCombined; 
}