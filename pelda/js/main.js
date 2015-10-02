// Form submit figyelése.
document.querySelector("form")
    .addEventListener("submit", startCalculation, false);

// A hitel.json beolvasása.
var hitel = {};
$.getJSON("js/hitel.json", function (d) {
    hitel = d;
});

// Hitel kalkuláció.
function calcHitel(_hitel, _month) {

    // Összetevők.
    var multiplier = parseFloat(_hitel.multiplier),
        amount = parseInt(_hitel.amount, 10),
        month = parseInt(_month);

    // Számítás.
    var eredmeny = {};
    eredmeny.installment = parseInt((amount * multiplier / month), 10);
    eredmeny.amount = amount;
    eredmeny.month = month;

    return eredmeny;

}

// Kalkuláció indítása.
function startCalculation(e) {
    e.preventDefault();

    // Form adatainak elemzése.
    var inputs = this.querySelectorAll("input");
    var formData = {};
    for (var i = 0; i < inputs.length; i++) {
        formData[inputs[i].name] = inputs[i].value;
    }

    console.log("formData: ", formData);
    console.log("hitel: ", hitel);

    // Kiválasztjuk a legközelebbi összeget a kalkulációhoz.
    var _hitel = {},
        _abs = -1,
        _amount = parseInt(formData.amount, 10);
    for (var k in hitel) {

        // Megállapítjuk a különbséget.
        var currentDiff = Math.abs(hitel[k].amount - _amount);

        // Ha az első hitelcélnél járunk, beállítjuk a különbséget és beállítjuk a hitelcélt is.
        // Különben akkor állítjuk be a hitelcélt, ha kisebb az eltérés mint az ezelőtti legkisebb eltérés.
        if (_abs === -1) {
            _abs = currentDiff;
            _hitel = hitel[k];
        } else if (currentDiff < _abs) {
            _abs = currentDiff;
            _hitel = hitel[k];
        }

    }

    // Kalkuláció.
    var kalkulalt = calcHitel(_hitel, formData.duration);

    // Adatok megjelenítése.
    $(".eredmeny span").each(function (index, span) {

        var name = span.className;
        if (kalkulalt[name])
            span.innerHTML = kalkulalt[name];

    });

    console.log(kalkulalt);


}