// Új XMLHttpRequest objektum.
var xhr = new XMLHttpRequest();

// Válsz feldolgozása.
function processRequest() {
    console.log(this.responseText);
}

// Válasz figyelése.
xhr.addEventListener("load", processRequest);
xhr.open("POST", "http://127.0.0.1:1337");
var obj = {
    "table": "users"
};
xhr.send(JSON.stringify(obj));