// alert( "Main.js" );
$(".bs-docs-popover").popover();

var foValtozo = 3;

function testFunc() {
    console.log("foValtozo: ", foValtozo);
    var masik = 4;
}

function testFunc2() {
    console.log("masik: ", masik);
}

// A regiszter form validálása.
var regValidator = new validator(".register-form");

// Profikép kezelése.
var profileImg = new profileImgHandler(".profile-image-holder");