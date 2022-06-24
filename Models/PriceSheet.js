//const config = connect().getSheetByName("Config");

function createPriceSheet(name) {
    let headerRow = ['IMAGE', 'ARTIST NAME', 'EMAIL', 'PHONE', 'WORKTITLE', 'MEDIUM', 'SIZE', 'PRICE']
    let imageId = "164P3Ss-On-Bc-kOq73ypSiG5vjzwmOPH" // for test only
    let imageFormula = `=IMAGE("https://drive.google.com/uc?export=download&id=${imageId}",1)`

    if (name) {
      name = name + " Price Sheet"
    } else {
      name = "Price Sheet"
    }
    // check if a sheet already exists with this name?  
    let newSheet = connect().getSheetByName(name) 
    if (newSheet === null) {
      newSheet = connect().insertSheet(name)
      newSheet.appendRow(headerRow)
      newSheet.appendRow([imageFormula])
    }

    return newSheet
}