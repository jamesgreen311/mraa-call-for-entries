//const config = connect().getSheetByName("Config");

function createPriceSheet(name) {
  const data = getSubmissionsById(getShowIdByName(name));
  let headerRow = ['IMAGE', 'ARTIST NAME', 'EMAIL', 'PHONE', 'WORKTITLE', 'MEDIUM', 'SIZE', 'PRICE']
/*   let imageId = data[0][DataColMap.fileId-1];
  let imageFormula = `=IMAGE("https://drive.google.com/uc?export=download&id=${imageId}",1)` */


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

    // loop through submissions data 
    data.map(d => {
      let imageId = d[DataColMap.fileId-1]
      let imageFormula = `=IMAGE("https://drive.google.com/uc?export=download&id=${imageId}",1)`
      let artistName = d[DataColMap.firstName-1] + " " + d[DataColMap.lastName-1]
      let email = d[DataColMap.email-1]
      let phone = d[DataColMap.phone-1]
      let workTitle = d[DataColMap.workTitle-1]
      let medium = d[DataColMap.medium-1]
      let size = d[DataColMap.width-1] + " x " + d[DataColMap.height-1]
      let price = "$" + d[DataColMap.price-1]

      newSheet.appendRow(
        [
          imageFormula,
          artistName,
          email,
          phone,
          workTitle,
          medium,
          size,
          price
        ])      
    })

  }

  return newSheet
}