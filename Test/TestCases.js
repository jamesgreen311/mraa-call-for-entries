function testConfig() {
    let id1 = generateUniqueId();
    console.log(id1);
    let id2 = generateUniqueId();
    console.log(id2);
}

function testShowObj() {
    let show = new Show('KLM');
    show.maxEntriesPerArtist = 3;
    console.log(`Show: ${show.name}, Id: ${show.id}, Max Artist Entries: ${show.maxEntriesPerArtist}`);
}

function testRetrieveShow() {
    console.log(getShow("6E074B39"));
}

function testAddShowToSheet() {
    // grab an existing row to test with
    let show = getShow("6E074B39");
    // change the id and name
    show.id = generateUniqueId();
    show.name = "Test Add New Show";
    // save it
    let row = addShowToSheet(show);
    console.log(row);
}