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
            this.inputs[i].handler = this;
            this.inputs[i].addEventListener("change", this.validateInput, false);
        }

    };

    // Egyes input mezők validálása.
    this.validateInput = function (event) {

        // Input mező.
        var input = event.target;

        // Pattern lekérése.
        var pattern = "";
        if (input.type === "email") {
            pattern = input.handler.regEmail;
        } else {
            pattern = input.getAttribute("pattern");
            if (pattern === null) return;
            pattern = new RegExp(pattern);
        }

        // Ellenőrzés futtatása.
        input.handler.removeError(input);
        if (!pattern.test(input.value)) {
            input.handler.showError(input);
        }

    };

    // Hibaüzenet megjelenítése.
    this.showError = function (elem) {

        // Új elem létrehozása.
        var div = document.createElement("div");
        div.classList.add("form-error-div");

        // Hibaüzenet hozzáadása a mezőhöz.
        var message = elem.getAttribute("data-error-message");
        div.innerHTML = message !== null ? message : "A mező értéke nem megfelelő";

        $(elem).parent().after(div);

    };

    // Hibaüzenet eltávolítása.
    this.removeError = function (elem) {
        var next = $(elem).parent().next();
        if (next.hasClass("form-error-div"))
            next.remove();
    };

    // Construct.
    this.construct();

}