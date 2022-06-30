function testGetLatestUrlVersion1(verbose) {
    const t = 1
    let version = getLastestUrlVersion()
    let expected // not an empty string

    if (verbose) {
        console.log("Test %s: Latest Application Version is %s ", t, version)
    }

    return console.log((version !== "") ? "test %s pass" : "test %s fail", t)
}

function testGetLatestUrlVersionRunAll() {
    testGetLatestUrlVersion1(true)
}