// Form kezelő osztály.
var formHandler = function (form_selector) {

    // Const.
    this.construct = function () {

        // Űrlap.
        this.form = document.querySelector(form_selector);

        // Beviteli mezők.
        this.inputs = this.form.querySelectorAll("input");

        // Lekérés gomb.
        this.getBtn = this.form.querySelector(".get-data-btn");

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
        }, false);

        // Lekérés.
        this.getBtn.addEventListener("click", function () {
            self.getServerData.call(self);
        }, false);

    };

    // Form adatok.
    // @param callBack: Function, a függvény aminek a feldolgozott adatokat átadjuk.
    this.getFormData = function (callBack) {

        var datas = {},
            fileInputs = [],
            self = this,
            i = 0;

        // Egyszerű inputok feldolgozása.
        for (i = 0; i < this.inputs.length; i++) {

            if (this.inputs[i].type.toLowerCase() === "file") {
                fileInputs.push(this.inputs[i]);
                continue;
            }

            var name = this.inputs[i].name,
                value = this.inputs[i].value;
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

    // Adatok lekérése a szerverről.
    this.getServerData = function () {

        var myObj = this;

        // Új XMLHttpRequest objektum.
        var xhr = new XMLHttpRequest();

        // Válsz feldolgozása.
        function processRequest() {
            myObj.fillFormData(this.responseText);
        }

        // Válasz figyelése.
        xhr.addEventListener("load", processRequest);
        xhr.open("GET", this.form.getAttribute("data-target") + "/user");
        xhr.send();
    };

    // Adatok kitöltése.
    this.fillFormData = function (datas) {

        datas = JSON.parse(datas);
        // console.log(datas);

        // Az összes mező kitöltése.
        for (var i = 0; i < this.inputs.length; i++) {

            // Egyszerű beviteli mező.
            var name = this.inputs[i].name;
            if (this.inputs[i].type.toLowerCase() !== "file") {
                if (datas[name]) {
                    this.inputs[i].value = datas[name];
                }
            } else {
                if (datas[name]) {
                    this.inputs[i].parentNode.querySelector("img").src = datas[name];
                }
            }

        }

    };

    this.construct();

}

var form1 = new formHandler(".register-form");

// Profikép kezelése.
var profileImg = new profileImgHandler(".profile-image-holder");