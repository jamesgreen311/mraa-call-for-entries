// show name will change, must get frome config based on show id
//const sheetName = getShowName(id);
//const data = ds.getSheetByName(sheetName); 
const data = ds.getSheetByName("Data")

// map field names to column position
const DataMap = {
    firstName: 1,
    lastName: 2,
    email: 3,
    phone: 4,
    workTitle: 5,
    width: 6,
    height: 7,
    medium: 8,
    price: 9,
    fileName: 10,
    fileId: 11,
    availability: 12,
    hidden: 13,
    timestamp: 14
}