function testGetmemberByEmail() {
   const m = getMemberByEmail("Jamesgreen.311@gmail.com")
}

function testGetEventCounts() {
   let sheetCounts = connect().getSheetByName("Exhibitor Upload Counts")
   let dataCounts = sheetCounts
      .getRange(CountsRangeMap.eventCounts + sheetCounts.getLastRow())
      .getValues()

   // get current event count
   let evtCount = dataCounts.filter(function (r) {
      return r[0] === "Art Works"
   })

   return evtCount[0][1]
}

function testGetEventArtistCounts() {
   let evtTitle = "MAKE IT SO"
   let artist = "Webb2@tester.com"

   let count = getTotalByEventArtist(evtTitle, artist)
   return count
}

function testGetTotalByEvent() {
   let evtTitle = "MAKE IT SO"
   let count = getTotalByEvent(evtTitle)
   return count
}

function testGetMemberInfo() {
   let wsMembers =
      connect(membersDirectoryId).getSheetByName("Member Directory")
   let memberInfo = getMemberInfo(wsMembers)
   console.log(memberInfo)
   return memberInfo
}

function testGetMemberFirstName() {
   let email = "jamesgreen.311@gmail.com"
   let firstName = getMemberFirstName(email)

   console.log(firstName)
}

function testGetMemberLastName() {
   let email = "jamesgreen.311@gmail.com"
   let lastName = getMemberLastName(email)

   console.log(lastName)
}

function testGetMemberPhone() {
   let email = "jamesgreen.311@gmail.com"
   let phone = getMemberPhone(email)

   console.log(phone)
}

function testGetTotalByEventArtist() {
   let email = "jamesgreen.311@gmail.com"
   let eventTitle = "MRAA Annual Show 2021"

   let total = getTotalByEventArtist(eventTitle, email)

   console.log(`Upload total: ${total}`)
}

function testGetPayFeeOnly() {
   let id = "3295A61"
   console.log(getPayFeeOnly(id))
}
