// Form kezelő osztály.
var formHandler = function (form_selector) {

    // Const.
    this.construct = function () {

        // Űrlap.
        this.form = document.querySelector(form_selector);

        // Beviteli mezők.
        this.inputs = this.form.querySelectorAll("input");

        // Események.
        this.setEvents();

    };

    // Események.
    this.setEvents = function () {

        // Mutató.
        var self = this;

        // Küldés.
        this.form.addEventListener("submit", function (event) {
            event.preventDefault();
            self.getFormData(self.processSubmit);
            // self.processSubmit();
        });

    };

    // Form adatok.
    // @param callBack: Function, a függvény aminek a feldolgozott adatokat átadjuk.
    this.getFormData = function (callBack) {

        var datas = {},
            fileInputs = [],
            self = this;

        // Egyszerű inputok feldolgozása.
        for (var i = 0; i < this.inputs.length; i++) {

            if (this.inputs[i].type.toLowerCase() === "file") {
                fileInputs.push(this.inputs[i]);
                continue;
            }

            var name = this.inputs[i].name;
            var value = this.inputs[i].value;
            datas[name] = value;

        }

        // File input feldolgozás.
        var processedFiles = 0;

        function checkProcessed(fileInput, fileData) {
            datas[fileInput.name] = fileData;
            processedFiles++;
            if (processedFiles === fileInputs.length)
                callBack.call(self, datas);
        }

        for (var f = 0; f < fileInputs.length; f++) {
            this.getFileContent(fileInputs[f], checkProcessed);
        }

        // Akkor indítjuk el azonnal, ha nincsenek file input mezők.
        if (fileInputs.length < 1)
            callBack(datas);

    };

    // Fájl kiolvasás.
    this.getFileContent = function (input, callBack) {

        // A kiválasztott file.
        if (input.files.length < 1) {
            callBack(input, "");
            return;
        }

        var _file = input.files[0];

        // Új filereader példány.
        var reader = new FileReader();

        // Ha végzett az olvasással.
        reader.onloadend = function () {
            callBack(input, reader.result);
        };

        // Olvasás indítása.
        reader.readAsDataURL(_file);

    };

    // Submit feldolgozása.
    this.processSubmit = function (datas) {

        console.log(arguments);

        //        console.log(this);
        //        console.log(datas);
        //        return;

        // Új XMLHttpRequest objektum.
        var xhr = new XMLHttpRequest();

        // Válsz feldolgozása.
        function processRequest() {
            console.log(this.responseText);
        }

        // Válasz figyelése.
        xhr.addEventListener("load", processRequest);
        xhr.open("POST", this.form.getAttribute("data-target"));
        var obj = {
            "method": this.form.getAttribute("data-method"),
            "data": datas
        };
        xhr.send(JSON.stringify(obj));

    };

    this.construct();

}

var form1 = new formHandler(".register-form");

// Profikép kezelése.
var profileImg = new profileImgHandler(".profile-image-holder");