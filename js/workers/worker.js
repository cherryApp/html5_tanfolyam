// Script importálása.
importScripts('../ajax.js');

// Új form kezelő.
var fh = new formHandler();

// Függvény a szerver adatok lekezelésére.
function processServerData(data) {
    postMessage(data);
}

// Üzenetek figyelése.
onmessage = function (e) {

    // Kapott adatok dekódolása.
    var data = JSON.parse(e.data);
    console.log("Ezt kaptam: " + Object.keys(data));

    if (data.command === "getServerData") {

        fh.url = data.url;
        fh.serverDataGetted = processServerData;
        fh.getServerData();

    }



    // postMessage("Kész");
}