// Média kezelő osztály.
var mediaHandler = function (selector) {

    // Construct.
    this.construct = function () {

        // Tároló.
        this.holder = document.querySelector(selector);

        // Gombok.
        this.buttons = this.holder.querySelectorAll("button");

        // Média elem kiválasztása.
        this.media = this.holder.querySelector("video");
        if (this.media === null) {
            this.media = this.holder.querySelector("audio");
        }


        // Hibaüzenet ha nincs lejátszható médiaelem.
        if (this.media === null) {
            console.error("Nincs média elem.");
            return;
        }

        // Események.
        this.setEvents();

        // Change class elkészítése.
        this.modifyElement();

    };

    //
    this.modifyElement = function () {

        Element.prototype.changeClass = function (_old, _new) {

            this.classList.remove(_old);
            this.classList.add(_new);
            return this;

        };

    };

    // Események.
    this.setEvents = function () {

        // Kattintási esemény az összes gombra.
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].handler = this;
            this.buttons[i].addEventListener("click", this.clickHandler, false);
        }

    };

    // Kattintás lekezelése.
    this.clickHandler = function (event) {

        // Elem meghatározása.
        var elem = null;
        if (event.target.nodeName.toLowerCase() === "span") {
            elem = event.target.parentNode;
        } else {
            elem = event.target;
        }

        // A meghatározott funkció indítása.
        var func = elem.getAttribute("data-func");
        if (func !== null) {
            elem.handler[func](elem);
        }

    };

    // Lejátszás váltása.
    this.togglePlay = function (elem) {

        var _h = elem.handler;

        if (_h.media.paused) {
            _h.media.play();
            elem.changeClass("inactive", "active");
        } else {
            _h.media.pause();
            elem.changeClass("active", "inactive");
        }

    };

    // Némítás váltása.
    this.toggleMute = function (elem) {

        elem.handler.media.muted = !elem.handler.media.muted;
        if (elem.handler.media.muted) {
            elem.changeClass("inactive", "active");
        } else {
            elem.changeClass("active", "inactive");
        }

    };

    // Construct.
    this.construct();


}