function testGetLatestUrl1(verbose) {
    const t = 1
    let url = getLastestUrl()
    let expected // not an empty string

    if (verbose) {
        console.log("Test %s: Latest Application Url is %s ", t, url)
    }

    return console.log((url !== "") ? "test %s pass" : "test %s fail", t)
}

function testGetLatestUrlRunAll() {
    testGetLatestUrl1(true)
}