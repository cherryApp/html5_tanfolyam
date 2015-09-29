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

// Validációs osztály.
var validator = function (form_selector) {

    // Előre definiált reguláris kifejezések.
    this.regEmail = /^[a-z0-9!#$%&"*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    // Construct.
    this.construct = function () {

        // Kiválasztuk az űrlapot.
        this.form = document.querySelector(form_selector);

        // Kiválasztjuk a beviteli mezőket.
        this.inputs = this.form.querySelectorAll("input");

        // Beállítjuk az eseményeket.
        this.setEvents();

    };

    // Események beállítása.
    this.setEvents = function () {

        // Az összes input mezőre figyeljük a change eseményt.
        for (var i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("change", this.validateInput, false);
        }

    };

    // Egyes input mezők validálása.
    this.validateInput = function (event) {

        // Input mező.
        var input = event.target;

        // Pattern lekérése.
        var pattern = input.getAttribute("pattern");
        if (pattern === null)
            return;

        // Ellenőrzés futtatása.
        var re = new RegExp(pattern);
        console.log(re, input.value);
        if (!re.test(input.value)) {
            console.log("Hiba, nem megfelelő érték: ", input.value);
        }

    };

    // Construct.
    this.construct();

}

// A regiszter form validálása.
var regValidator = new validator(".register-form");