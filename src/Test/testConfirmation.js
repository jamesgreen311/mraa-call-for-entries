const submission = {
   email: "jamesgreen.311@gmail.com",
   firstname: "James",
   lastname: "Green",
   eventtitle: "Test Exhibit",
   worktitle: "Test Work",
   width: "10",
   height: "10",
   medium: "Oil",
   price: "1000",
   eventid: "176BD2A",
}
const appSettings = JSON.parse(getAppSettings())

function testConfirmation() {
   const confirmationDocId = sendConfirmation(submission)
   Logger.log(confirmationDocId)
}

function testGetFileById() {
   const appSettings = JSON.parse(getAppSettings())
   const fileid = appSettings.confirmationdocid

   const file = DriveApp.getFileById(fileid)
   Logger.log(file.getName())
}

function testGenerateToken() {
   const token = generateToken()
   Logger.log(token)
}
