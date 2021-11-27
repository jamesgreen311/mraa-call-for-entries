const wsMembers = connect(membersDirectoryId).getSheetByName("Member Directory");
const memberInfo = getMemberInfo();
const exhibtingMembers = getExhibitingMembers();
const activeExhibitingMembers = getActiveExhibitingMembers();

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
 * Gets six columns from the membership spreadsheet. All columns are combined
 * into one array for each member
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

/**
 * Checks if email address is a valid active exhibiting member 
 * @param {string} email Email address
 * @returns {boolean} 
 */
function isMember(email) {
    let memberInfo = findMember(email);

    return memberInfo && memberInfo.length>0;
}

/**
 * Searches the array of active exhibiting members retreived from the Membership spreadsheet
 * @param {string} email 
 * @returns array of member info or empty array
 */
function findMember(email) {
    let found = activeExhibitingMembers.filter(
        member => member[0].trim().toLowerCase() === email.trim().toLowerCase()
      );
      
    return found[0];
}

/**
 * Gets the members first name from array if found
 * @param {string} email 
 * @returns string
 */
function getMemberFirstName(email) {
    let memberInfo = findMember(email);
    let firstName = "";

    if (memberInfo && memberInfo.length>0) {
        firstName = memberInfo[1];
    }

    return firstName;
}

/**
 * Gets the members last name from array if found
 * @param {string} email 
 * @returns string
 */
function getMemberLastName(email) {
    let memberInfo = findMember(email);
    let lastName = "";

    if (memberInfo && memberInfo.length>0) {
        lastName = memberInfo[2];
    }

    return lastName;
}

/**
 * Gets the members phone number from array if found
 * @param {string} email 
 * @returns string
 */
function getMemberPhone(email) {
    let memberInfo = findMember(email);
    let phone = "";

    if (memberInfo && memberInfo.length>0) {
        phone = memberInfo[4];
    }

    return phone;
}