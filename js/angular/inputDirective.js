testModule.directive("formInput", function () {

    return {
        "restrict": "EA",
        "scope": {
            "model": "=ngModel",
            "type": "@type",
            "icon": "@icon",
            "placeholder": "@placeholder"
        },
        "templateUrl": "js/angular/form-input.html",
        "link": function (scope, element, attrs) {
            console.log(arguments);
        }
    };

});