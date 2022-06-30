function testGetMaxImageSize1(verbose) {
    let data = getMaxImageSize()
    let expected = 0 // actual value is unknown but must be a number

    if (verbose) {
        console.log("Test %s Max Image Size : %s MB", "1", data)
        console.log("Type of data is %s", typeof data)
        console.log("Type of expected is %s", typeof expected)
    }

    return console.log((typeof data === typeof expected) ? "test %s pass" : "test %s fail", "1")
}

function testGetMaxImageSizeRunAll() {
    testGetMaxImageSize1(true)
}