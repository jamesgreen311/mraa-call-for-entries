function testGetAllOpenShows1(verbose) {
    let openShows = getAllOpenShows()
    let expected = "object" // actual value is unknown but must be a number

    if (verbose) {
        console.log("Test %s Number of Open Shows : %s ", "1", openShows.length)
        console.log("Show names: %s ", openShows.map(r => r[1]))
    }

    return console.log((typeof openShows === expected) ? "test %s pass" : "test %s fail", "1")
}

function testGetAllOpenShowsRunAll() {
    testGetAllOpenShows1(true)
}