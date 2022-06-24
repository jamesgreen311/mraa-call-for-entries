function testCreatePriceSheet1(name, verbose) {
    let newSheet = createPriceSheet(name)
    let expected = "object"
    let t = 1

    if (verbose) {
        console.log("Test %s: Sheet %s created", t, newSheet.getSheetName())
    }
    return console.log((typeof newSheet === expected) ? "test %s pass" : "test %s fail", t)
}

function testCreatePriceSheetRunAll() {
    testCreatePriceSheet1("Test", true)
}