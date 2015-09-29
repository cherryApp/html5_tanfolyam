// Profilkép beállítása.
var profileImgHandler = function (holder_selector) {

    // Construct.
    this.construct = function () {

        // Holder kiválasztása.
        this.holder = document.querySelector(holder_selector);

        // Kép kiválasztása.
        this.image = this.holder.querySelector("img");

        // File input kiválasztása.
        this.fileInput = this.holder.querySelector("input[type=file]");

        // Események beállítása.
        this.setEvents();

    };

    // Események.
    this.setEvents = function () {

        // Figyeljük a change eseményt.
        this.fileInput.handler = this;
        this.fileInput.addEventListener("change", this.fileChanged, false);

    };

    // File kiválasztása.
    this.fileChanged = function (event) {

        // Fileinput.
        var _fileInput = event.target;

        // A kiválasztott file.
        var _file = _fileInput.files[0];

        // Új filereader példány.
        var reader = new FileReader();

        // Ha végzett az olvasással.
        reader.onloadend = function () {
            _fileInput.handler.image.src = reader.result;
        };

        // Olvasás indítása.
        reader.readAsDataURL(_file);

    };

    this.construct();

};