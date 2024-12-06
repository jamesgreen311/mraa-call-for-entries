/**
 * Sends html to the browser
 * @param {File} f File object 
 * @param {object} opt text to replace page variables
 * @returns 
 */
function render(f, opt) {
    let templ = HtmlService.createTemplateFromFile(f);
    if (opt) {
      // opt is an object containing key/value pairs of data to be passed to page variables
      // ie, id=opt.id
      let keys = Object.keys(opt);
      keys.forEach(function(k){
        templ[k] = opt[k];
      })
  
    }
    return templ.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * HTML fragments to include in HTML sent to browser
 * @param {File} file File object
 * @returns {HTMLTemplate} html fragment
 */
function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

/**
 * Gets current year in four digit format (yyyy)
 * @returns {number} year
 */
function getCurrentYear() {
  y = new Date().getFullYear();
  return y;
}

function createConfirmationDoc(submission) {
   const appSettings = JSON.parse(getAppSettings())
   const showConfig = getShow(submission.eventid)
   const applicationLink = `${appSettings.applicationlink}${submission.eventid}`
   const appLinkText = "Link to the application"
   const docName = `${submission.firstname} ${submission.lastname} CFE Submission Confirmation for ${submission.worktitle}`
   const tmp = DriveApp.getFileById(appSettings.confirmationdocid)
   const folder = DriveApp.getFolderById(appSettings.destinationfolderid)
   const file = tmp.makeCopy(docName, folder)
   const fileId = file.getId()
   const doc = DocumentApp.openById(fileId)
   const body = doc.getBody()
   const entryFee = parseInt(showConfig.entryfee)
   const cashDiscount = parseInt(showConfig.cashdiscount)

   body
      .findText(appLinkText)
      .getElement()
      .editAsText()
      .setLinkUrl(applicationLink)
   body.replaceText("{token}", submission.securitytoken)
   body.replaceText("{member_email}", submission.email)
   body.replaceText(
      "{subject}",
      `Call For Entries Submission Confirmation for Exhibit ${submission.eventtitle}`
   )
   body.replaceText("{first_name}", submission.firstname)
   body.replaceText("{last_name}", submission.lastname)
   body.replaceText(
      "{artist_name}",
      submission.firstname + " " + submission.lastname
   )
   body.replaceText("{work_title}", submission.worktitle)
   body.replaceText("{width}", submission.width)
   body.replaceText("{height}", submission.height)
   body.replaceText("{medium}", submission.medium)
   body.replaceText("{price}", submission.price)
   body.replaceText("{exhibit_title}", submission.eventtitle)
   body.replaceText("{paypal_payment_due}", entryFee)
   body.replaceText("{cashcheck_payment_due}", entryFee - cashDiscount)
   body.replaceText(
      "{exhibits_chairperson}",
      "mraa-exhibits@metrorichmondart.org"
   )
   body.replaceText("{treasurer_email}", appSettings.treasureremail)

   doc.saveAndClose()

   return fileId
}

function sendConfirmation(submission) {
   const sendTo = submission.email
   const subject = `Call For Entry Confirmation for ${submission.eventtitle}`
   const fileId = createConfirmationDoc(submission)
   const attachment = DriveApp.getFileById(fileId)
   const body =
      "We have received your call for entries submission. Please review the attached document for any errors."
   const htmlBody = `<p>We have received your call for entries submission. Please review the attached document for any errors.</p>`
   GmailApp.sendEmail(sendTo, subject, body, {
      attachments: [attachment],
      htmlBody: htmlBody,
      replyTo: "mraa-exhibits@metrorichmondart.org",
      name: "MRAA Gallery Chairperson",
   })

   return fileId
}

function generateToken() {
   const token = Math.random().toString(36).substring(2, 15).toUpperCase()
   return token
}