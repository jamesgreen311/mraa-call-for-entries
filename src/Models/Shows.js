function getCFETables() {
   return {
      exhibits: {
         name: "Exhibits",
         type: "standard",
         headers: 1,
         schema: {
            eventid: "a",
            eventtitle: "b",
            firstname: "c",
            lastname: "d",
            email: "e",
            phone: "f",
            worktitle: "g",
            medium: "h",
            width: "i",
            height: "j",
            price: "k",
            filename: "l",
            fileid: "m",
            member: "n",
            availablity: "o", // not currently used
            hidden: "p", // not currently used
            fullname: "q", // not currently used
            timestamp: "r", // not currently used
         },
      },
      countsbytitleartist: {
         name: "Counts By Title Artist",
         type: "pivot",
         headers: 1,
         summary: "Grand Total",
         schema: {
            title: "a",
            id: "b",
            email: "c",
            artistname: "d",
            entries: "e",
         },
      },
      countsbyartisttitle: {
         name: "Counts By Artist Title",
         type: "pivot",
         headers: 1,
         summary: "Grand Total",
         schema: {
            email: "a",
            title: "b",
            count: "c",
         },
      },
      countsbyid: {
         name: "Counts By Id",
         type: "pivot",
         headers: 1,
         summary: "Grand Total",
         schema: {
            id: "a",
            title: "b",
            count: "c",
         },
      },
      config: {
         name: "Config",
         type: "standard",
         headers: 1,
         schema: {
            showid: "a",
            exhibitname: "b",
            cfeopendate: "c",
            cfeclosedate: "d",
            maxentriesperartist: "e",
            maxentriespershow: "f",
            imagefolderid: "g",
            allownfs: "h",
            status: "i",
            payfeeonly: "j",
            purchaselimit: "k",
            showopendate: "l",
            showclosedate: "m",
            entryfee: "n",
            registrationlink: "o",
            applicationversion: "p",
            feestructure: "q",
            maxprice: "r",
            showfee: "s",
            location: "t",
         },
      },
      appsettings: {
         name: "AppSettings",
         type: "standard",
         headers: 1,
         schema: {
            maximagesize: "a2",
            cfecontact: "b2",
            statuslist: "c2:c",
            latestdeploymenturl: "d2",
            applicationversion: "e2",
            latestdeploymentlist: "d2:d",
            applicationversionlist: "e2:e",
            treasurerName: "i2",
            treasurerEmail: "j2",
         },
      },
      opencalls: {
         name: "Open Calls",
         type: "pivot",
         headers: 1,
         summary: "none",
         schema: {
            cfeclosedate: "a",
            id: "b",
            name: "c",
            maxentries: "d",
            entryfee: "e",
            imagefolderid: "f",
         },
      },
      payments: {
         name: "Payments",
         type: "standard",
         headers: 1,
         schema: {
            exhibitid: "a",
            exhibitname: "b",
            exhibitlocation: "c", // in config file
            artistemail: "d",
            artistlastname: "e",
            artistfirstname: "f",
            qtyentered: "g",
            amountpaid: "h", // blank - entered by treasurer when payment is made
            datereceived: "i", // blank - entered by treasurer when payment is made
            timestamp: "j",
         },
      },
      paymentdashboard: {
         name: "Payment Dashboard",
         type: "dashboard",
         pivottables: {
            exhibittotals: {
               name: "Exhibit Totals",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  exhibitname: "a",
                  totalentries: "b",
                  totalpaid: "c",
               },
            },
            totalsbyemail: {
               name: "Exhibit Totals By Artist Email",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  artistemail: "d",
                  exhibitname: "e",
                  exhibitid: "f",
                  qtyentered: "g",
                  amountpaid: "h",
               },
            },
            totalsbyexhibitname: {
               name: "Exhibit Totals By Exhibit Name",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  exhibitname: "j",
                  artistlastname: "k",
                  artistfirstname: "l",
                  qtyentered: "m",
                  amountpaid: "n",
               },
            },
         },
      },
   }
}

/**
 * Retrieve a show from the Config tab
 * @param {string} id Unique show identifier
 * @returns {object} Show object
 */
function getShow(id) {
   // connect to file and open sheet
   const cfeTables = getCFETables()
   const data = getAllShows()
   const cfeConfigSchema = cfeTables.config.schema
   let show = {}

   for (let d of data) {
      if (d[cfeConfigSchema.showid.colToIndex()] === id) {
         show.id = d[cfeConfigSchema.showid.colToIndex()]
         show.name = d[cfeConfigSchema.exhibitname.colToIndex()]
         show.openDate = d[cfeConfigSchema.cfeopendate.colToIndex()]
         show.closeDate = d[cfeConfigSchema.cfeclosedate.colToIndex()]
         show.maxEntriesPerArtist =
            d[cfeConfigSchema.maxentriesperartist.colToIndex()]
         show.maxEntriesPerShow =
            d[cfeConfigSchema.maxentriespershow.colToIndex()]
         show.imageFolderId = d[cfeConfigSchema.imagefolderid.colToIndex()]
         show.allowNFS = d[cfeConfigSchema.allownfs.colToIndex()]
         show.payFeeOnly = d[cfeConfigSchema.payfeeonly.colToIndex()]
         show.purchaseLimit = d[cfeConfigSchema.purchaselimit.colToIndex()]
         show.showopen = d[cfeConfigSchema.showopendate.colToIndex()]
         show.showclose = d[cfeConfigSchema.showclosedate.colToIndex()]
         show.entryfee = d[cfeConfigSchema.entryfee.colToIndex()]
         show.registrationLink =
            d[cfeConfigSchema.registrationlink.colToIndex()]
         show.location = d[cfeConfigSchema.location.colToIndex()]
      }
   }
   return show
}

/**
 * Get application settings
 *
 * @returns {string} JSON string containing max image size and cfe contact
 */
function getAppSettings() {
   const t = getCFETables()
   const schema = t.appsettings.schema
   const settings = connect(CFE_ID).getSheetByName(t.appsettings.name)
   const maxImageSize = settings.getRange(schema.maximagesize).getDisplayValue()
   const cfeContact = settings.getRange(schema.cfecontact).getDisplayValue()
   const cfeTreasurerName = settings
      .getRange(schema.treasurerName)
      .getDisplayValue()
   const cfeTreasurerEmail = settings
      .getRange(schema.treasurerEmail)
      .getDisplayValue()

   return JSON.stringify({
      maximagesize: maxImageSize,
      cfecontact: cfeContact,
      treasurername: cfeTreasurerName,
      treasureremail: cfeTreasurerEmail,
   })
}

/**
 * Not Used
 * @param {string} id Unique show identifier
 * @returns {string} Show name
 */
function getShowName(id) {
   return getShow(id).name
}

/**
 *
 * @param {*} id
 * @returns {string} Show location
 */
function getShowLocation(id) {
   const show = getShow(id)
   return show.location
}

/**
 * Get all current show identifiers
 * @returns {array} All unique show identifiers
 */
function getAllShowIds() {
   const allShows = getAllShows()
   return allShows.map((s) => s[0])
}

/**
 * Get maximum entries allowed for a show
 * @param {string} id Unique show identifier
 * @returns {number} Max entries
 */
function getMaxEntriesPerShow(id) {
   // Ensure a number is returned if missing
   let max = 0
   const show = getShow(id)
   const maxEntriesPerShow = show.maxEntriesPerShow
   if (maxEntriesPerShow) {
      max = parseInt(maxEntriesPerShow)
   }
   return max
}

/**
 * Get maximum entries allowed per artist
 * @param {string} id Unique show identifier
 * @returns {number} Max artist entries
 */
function getMaxEntriesPerArtist(id) {
   const show = getShow(id)
   return show.maxEntriesPerArtist
}

/**
 * Not Used
 * Get Pay Fee Only setting for requested show
 * @param {string} id Unique show identifier
 * @returns {boolean} yes/no
 */
function getPayFeeOnly(id) {
   return getShow(id).payFeeOnly
}

/**
 * Get a list of all open shows. This function retrieves open calls from the Config table.
 * getOpenCalls retrieves from the Open Calls pivot table.
 * @returns {array} a list of all open shows
 */
function getAllOpenShows() {
   const cfeTables = getCFETables()
   const cfeConfigSchema = cfeTables.config.schema
   // schema defines fields by column letter, need to convert to a zero based integer for array access
   const statusPos = cfeConfigSchema.status.colToIndex()
   const data = getAllShows()
   return data.filter((d) => d[statusPos] === "OPEN")
}

/**
 * Get all shows from Config regardless of status.
 * @returns
 */
function getAllShows() {
   const t = getCFETables()
   const cfeConfig = connect(CFE_ID).getSheetByName(t.config.name)
   const hdrRows = t.config.headers
   const startRow = hdrRows + 1
   const startCol = 1
   const data = cfeConfig
      .getRange(
         startRow,
         startCol,
         cfeConfig.getLastRow() - hdrRows,
         cfeConfig.getLastColumn()
      )
      .getDisplayValues()

   return data
}

/**
 * Not Used
 * @param {string} name the name of a show
 * @returns {string} show id
 */
function getShowIdByName(name) {
   const cfeTables = getCFETables()
   const cfeConfigSchema = cfeTables.config.schema
   // schema defines fields by column letter, need to convert to a zero based integer for array access
   const namePos = cfeConfigSchema.exhibitname.colToIndex()
   const idPos = cfeConfigSchema.showid.colToIndex()
   const data = getAllShows()
   const showId = data.filter((d) => d[namePos] === name)

   return showId[0][idPos]
}

/**
 * Not Used
 * Get total entries for the event from the pivot table
 * @param {string}  Id
 * @returns {number} Total
 */
function getTotalByEvent(id) {
   const cfeTables = getCFETables()
   const cfeTitleCounts = connect(CFE_ID).getSheetByName(
      cfeTables.countsbytitle.name
   )
   const cfeTitleCountsSchema = cfeTables.countsbytitle.schema
   const startRow = cfeTables.countsbytitle.headers + 1
   const startCol = 1
   const data = cfeTitleCounts
      .getRange(
         startRow,
         startCol,
         cfeTitleCounts.getLastRow() - startRow,
         cfeTitleCounts.getLastColumn()
      )
      .getValues()
   const idPos = cfeTitleCountsSchema.id.colToIndex()
   const countPos = cfeTitleCountsSchema.count.colToIndex()
   const filteredData = data.filter((r) => r[idPos] === id)
   let totalByEvent = 0

   if (filteredData.length > 0) {
      totalByEvent = parseInt(filteredData[0][countPos])
   }
   return totalByEvent
}

/**
 * Not Used
 * Get total number of entries for an event for each artist
 * @param {string} Event Title
 * @param {string} Artist email
 * @returns {number} Total
 */
function getTotalByEventArtist(evtTitle, email) {
   const cfeTables = getCFETables()
   const cfeTitleCounts = connect(CFE_ID).getSheetByName(
      cfeTables.countsbytitleartist.name
   )
   const cfeTitleCountsSchema = cfeTables.countsbytitleartist.schema
   const startRow = cfeTables.countsbytitleartist.headers + 1
   const startCol = 1
   const titlePos = cfeTitleCountsSchema.title.colToIndex()
   const emailPos = cfeTitleCountsSchema.email.colToIndex()
   const countPos = cfeTitleCountsSchema.count.colToIndex()
   const data = cfeTitleCounts
      .getRange(
         startRow,
         startCol,
         cfeTitleCounts.getLastRow() - startRow,
         cfeTitleCounts.getLastColumn()
      )
      .getValues()
   let totalByEventArtist = 0
   let evtCount = data.filter(function (r) {
      return (
         r[titlePos].toLowerCase() === evtTitle.toLowerCase() &&
         r[emailPos].toLowerCase() === email.toLowerCase()
      )
   })

   if (evtCount.length > 0) {
      totalByEventArtist = evtCount[0][countPos]
   }
   return totalByEventArtist
}

/**
 * Not Used
 * Get shows that are currently calling for entries
 */
function getCurrentCalls() {
   const cfeTables = getCFETables()
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const startRow = cfeTables.exhibits.headers + 1
   const startCol = cfeExhibitsSchema.eventtitle.colToIndex() + 1
   const data = cfeExhibits
      .getRange(
         startRow,
         startCol,
         cfeExhibits.getLastRow() - cfeTables.exhibits.headers,
         1
      )
      .getDisplayValues()

   const filteredData = data.map((d) => d[0])
   const uniqueEvents = [...new Set(filteredData)]

   return uniqueEvents
}

/**
 * Not Used
 * @returns
 */
function getCurrentCallsUploads() {
   const cfeTables = getCFETables()
   const cfeCountsById = connect(CFE_ID).getSheetByName(
      cfeTables.countsbyid.name
   )
   const cfeCountsByIdSchema = cfeTables.countsbyid.schema
   const startRow = cfeTables.countsbyid.headers + 1
   const startCol = 1
   const data = cfeCountsById
      .getRange(
         startRow,
         startCol,
         cfeCountsById.getLastRow() - startRow,
         cfeCountsById.getLastColumn()
      )
      .getDisplayValues()
   const isSummary = cfeCountsById.summary && cfeCountsById.summary !== "none"
   if (isSummary) {
      // remove summary row, it will always be the last row
      data.pop()
   }
   return data
}
/**
 * Not Used
 * Get all submissions for an event
 * @param {string} id Event Id
 * @returns {array} all submissions
 */
function getSubmissionsById(id) {
   const cfeTables = getCFETables()
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const startRow = cfeTables.exhibits.headers + 1
   const startCol = 1
   const idPos = cfeExhibitsSchema.eventid.colToIndex()
   const data = cfeExhibits
      .getRange(
         startRow,
         startCol,
         cfeExhibits.getLastRow() - startRow,
         cfeExhibits.getLastColumn()
      )
      .getDisplayValues()
   let filteredData = data.filter((d) => d[idPos] === id)

   return filteredData
}

/**
 * Not Used
 * Get all uploads for an event (by title) for an artist
 * @param {string} evtTitle Event Title
 * @param {string} email Artist Email
 * @returns {string}
 */
function getUploadsByArtist(evtTitle, email) {
   const cfeTables = getCFETables()
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const startRow = cfeTables.exhibits.headers + 1
   const startCol = 1
   const titlePos = cfeExhibitsSchema.eventtitle.colToIndex()
   const emailPos = cfeExhibitsSchema.email.colToIndex()
   const filenamePos = cfeExhibitsSchema.filename.colToIndex()
   const data = cfeExhibits
      .getRange(
         startRow,
         startCol,
         cfeExhibits.getLastRow() - startRow,
         cfeExhibits.getLastColumn()
      )
      .getDisplayValues()
   const uploads = data.filter(
      (r) =>
         r[titlePos].toLowerCase() === evtTitle.toLowerCase() &&
         r[emailPos].toLowerCase() === email.toLowerCase()
   )

   return uploads.map((r) => r[filenamePos]).join()

   // stringify not working as intended when passed back to the client
   //return JSON.stringify(uploads.map(r => r[DataColMap.fileName-1]))
}

/**
 * Not Used
 * Get uploads for an event (by id) for an artist
 * @param {string} id Event Id
 * @param {string} email Artist Email
 * @returns {string}
 */
function getUploadsByIdByArtist(id, email) {
   const cfeTables = getCFETables()
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const startRow = cfeTables.exhibits.headers + 1
   const startCol = 1
   const idPos = cfeExhibitsSchema.eventid.colToIndex()
   const emailPos = cfeExhibitsSchema.email.colToIndex()
   const filenamePos = cfeExhibitsSchema.filename.colToIndex()
   const data = cfeExhibits
      .getRange(
         startRow,
         startCol,
         cfeExhibits.getLastRow() - startRow,
         cfeExhibits.getLastColumn()
      )
      .getDisplayValues()
   const uploads = data.filter(
      (r) =>
         r[idPos].toLowerCase() === id.toLowerCase() &&
         r[emailPos].toLowerCase() === email.toLowerCase()
   )
   return JSON.stringify(uploads.map((r) => r[filenamePos]))
}

/**
 * Not Used
 * @returns
 */
function getEventArtistEntries() {
   const cfeTables = getCFETables()
   const cfeEntries = connect(CFE_ID).getSheetByName(
      cfeTables.countsbytitleartist.name
   )
   const cfeCountsSchema = cfeTables.countsbytitleartist.schema
   const idPos = cfeCountsSchema.id.colToIndex()
   const startRow = cfeTables.countsbytitleartist.headers + 1
   const startCol = 1
   const summary = cfeTables.countsbytitleartist.summary
   const data = cfeEntries
      .getRange(
         startRow,
         startCol,
         cfeEntries.getLastRow() - startRow,
         cfeEntries.getLastColumn()
      )
      .getDisplayValues()
   const fee = getEntryFee(data[0][idPos])

   let newData = []
   for (let row = 0; row < data.length; row++) {
      newData.push([...data[row], data[row][4] * fee])
   }
   return newData
}

/**
 *
 * @param {string} id Event id
 * @returns {integer}
 */
function getEntryFee(id) {
   const show = getShow(id)
   return parseInt(show.entryfee)
}

/**
 * Get an open call for entries. Defaults to the oldest open call.
 * @param {object} param
 * @returns {array}
 */
function getOpenCalls(param = "oldest") {
   const cfeTables = getCFETables()
   const cfeOpenCalls = connect(CFE_ID).getSheetByName(cfeTables.opencalls.name)
   const cfeOpenCallsSchema = cfeTables.opencalls.schema
   const headerRows = cfeTables.opencalls.headers
   const startRow = headerRows + 1
   const startCol = 1
   const data = cfeOpenCalls
      .getRange(
         startRow,
         startCol,
         cfeOpenCalls.getLastRow() - headerRows,
         cfeOpenCalls.getLastColumn()
      )
      .getDisplayValues()

   // Checks
   // 1. requested exhibit
   // -- empty will default to oldest
   // -- explict id requested
   // Don't need to check the param
   // 2. no open calls
   // -- data will contain one array element with [["Rows"], ["Values"]]
   // -- return empty array
   // 3. open calls found
   // -- param is oldest -> return first element of data array
   // -- param is passed and id matches -> return matching array element

   let opencall = []
   if (data[0][0] !== "Rows") {
      if (param === "oldest") {
         opencall = data[0]
      } else {
         // keep only the one for requested id. if requested id is no longer open, this will fail and opencall array will be undefined.
         opencall = data.filter(
            (d) => d[1].toUpperCase() === param.toUpperCase()
         )[0] // flatten the two dimensional array
      }
   }

   return opencall ? opencall : []
}

/**
 * Get all uploads for an event (by title) for an artist
 * @param {object} event, artist, key
 * @returns {array}
 */
function getArtistUploads(params) {
   const cfeTables = getCFETables()
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const evtTitlePos = cfeExhibitsSchema.eventtitle.colToIndex()
   const evtIdPos = cfeExhibitsSchema.eventid.colToIndex()
   const emailPos = cfeExhibitsSchema.email.colToIndex()
   const filenamePos = cfeExhibitsSchema.filename.colToIndex()
   const timestampPos = cfeExhibitsSchema.timestamp.colToIndex()
   const headerRows = cfeTables.exhibits.headers
   const startRow = headerRows + 1
   const startCol = 1
   const compactUploads = []
   const p = JSON.parse(params)
   const evt = p.key ? p.key : "title" // default to title if event type not passed
   const eventPos = evt === "id" ? evtIdPos : evtTitlePos

   // if the starting row is less than the last row then data exists to retrieve,
   // otherwise only the headers exist in the spreadsheet.
   if (startRow <= cfeExhibits.getLastRow()) {
      const data = cfeExhibits
         .getRange(
            startRow,
            startCol,
            cfeExhibits.getLastRow(),
            cfeExhibits.getLastColumn()
         )
         .getDisplayValues()

      if (data.length) {
         const uploads = data.filter(function (r) {
            const test1 = r[eventPos].toLowerCase() === p["event"].toLowerCase()
            const test2 =
               r[emailPos].toLowerCase() === p["artist"].toLowerCase()
            return test1 && test2
         })

         uploads.forEach((r) => {
            compactUploads.push([r[filenamePos], r[timestampPos]])
         })
      }
   }

   return compactUploads
}

/**
 * Search the Exhibit Totals by Artist Email pivot table in Payment Dashboard
 *
 * @param {integer} id
 * @param {string} email
 * @returns {array}
 */
function getPaymentsByArtist(id, email) {
   const cfeTables = getCFETables()
   const cfePaymentDashboard = connect(CFE_ID).getSheetByName(
      cfeTables.paymentdashboard.name
   )
   const cfePDPivotTables = cfeTables.paymentdashboard.pivottables
   const cfeTBEPivotTable = cfePDPivotTables.totalsbyemail
   const cfeTBESchema = cfePDPivotTables.totalsbyemail.schema // schema for totalsbyexhibitname pivot table
   const startRow = 1 + cfeTBEPivotTable.titles // include headers and summary rows, exclude title
   const cols = Object.keys(cfeTBESchema).length // determine number of columns in pivot table
   const startCol = cfeTBESchema.artistemail.colToIndex() + 1 // determine starting column for this pivot table
   const dataRows = cfePaymentDashboard.getLastRow() // include headers and summary rows
   const arrOffset = startCol - 1 // data position in array is offset by where the first column appears in the spreadsheet
   const idPos = cfeTBESchema.exhibitid.colToIndex() - arrOffset
   const emailPos = cfeTBESchema.artistemail.colToIndex() - arrOffset

   let data = []

   if (dataRows > 0) {
      data = cfePaymentDashboard
         .getRange(startRow, startCol, dataRows, cols)
         .getDisplayValues()
   }

   // filter data for exhibit id and artist email
   const filteredData = data.filter(
      (r) =>
         r[idPos].toUpperCase() === id.toUpperCase() &&
         r[emailPos].toUpperCase() === email.toUpperCase()
   )
   return filteredData[0]
}

/**
 * Add a new submission to spreadsheet
 * @param {object} data
 * @returns {array}
 */
function addSubmission(d) {
   const t = getCFETables()
   const e = connect(CFE_ID).getSheetByName(t.exhibits.name)
   const newRow = []
   const s = t.exhibits.schema

   newRow[s.eventid.colToIndex()] = d.eventid
   newRow[s.eventtitle.colToIndex()] = d.eventtitle
   newRow[s.firstname.colToIndex()] = d.firstname
   newRow[s.lastname.colToIndex()] = d.lastname
   newRow[s.email.colToIndex()] = d.email
   newRow[s.phone.colToIndex()] = d.phone
   newRow[s.worktitle.colToIndex()] = d.worktitle
   newRow[s.medium.colToIndex()] = d.medium
   newRow[s.width.colToIndex()] = d.width
   newRow[s.height.colToIndex()] = d.height
   newRow[s.price.colToIndex()] = d.price
   newRow[s.filename.colToIndex()] = d.filename
   newRow[s.member.colToIndex()] = d.member
   newRow[s.fullname.colToIndex()] = d.fullname
   newRow[s.timestamp.colToIndex()] = d.timestamp
   newRow[s.fileid.colToIndex()] = saveImage(
      d.bytes,
      d.mimetype,
      d.filename,
      d.imagefolder
   )

   return e.appendRow(newRow)
}

function addPaymentDue(d) {
   const t = getCFETables()
   const p = connect(CFE_ID).getSheetByName(t.payments.name)
   const newRow = []
   const s = t.payments.schema
   newRow[s.exhibitid.colToIndex()] = d.eventid
   newRow[s.exhibitname.colToIndex()] = d.eventtitle
   newRow[s.exhibitlocation.colToIndex()] = getShowLocation(d.eventid)
   newRow[s.artistemail.colToIndex()] = d.email
   newRow[s.artistlastname.colToIndex()] = d.lastname
   newRow[s.artistfirstname.colToIndex()] = d.firstname
   newRow[s.qtyentered.colToIndex()] = 1
   newRow[s.timestamp.colToIndex()] = d.timestamp

   return p.appendRow(newRow)
}

/**
 * Save image to Google Drive Folder
 * @param {binary} bytes
 * @param {string} type
 * @param {string} filename
 * @param {string} imagefolderid
 * @returns {string} fileid
 */
function saveImage(bytes, type, filename, imagefolderid) {
   const blob = Utilities.newBlob(bytes, type, filename)
   const folder = DriveApp.getFolderById(imagefolderid)
   const file = folder.createFile(blob)
   return file.getId()
}
