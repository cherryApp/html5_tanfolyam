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

// Az űrlap kiválasztása és a submit esemény lekezelése.
var form = document.querySelector(".register-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    event.target
        .querySelector(".alert")
        .classList
        .add("show");

}, false);

// Ha az animáció befejeződöt, visszaállítjuk az osztályt.
form.querySelector('.alert')
    .addEventListener("animationend", function (event) {
        event.target
            .classList
            .remove("show");
    }, false);