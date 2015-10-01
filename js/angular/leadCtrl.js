testModule.controller("leadCtrl", ["$http", "$scope", "$timeout", function ($http, $scope, $timeout) {

    $scope.yourName = "Ez már a scope-ból jön...";
    $scope.leadText = "Ez pedig a bevezető szöveg.";

    $scope.user = {};
    $scope.user.profile_image = "img/profile.jpg";

    $scope.inputText = "";

    // Üdvözlés.
    $scope.greeting = function () {
        return $scope.inputText === "" ? "" : "Szia " + $scope.inputText + "!";
    };

    // User adatok lekérése.
    $scope.getUser = function () {

        console.log("getUser");

        $http.get("http://127.0.0.1:1337")
            .success(function (d) {
                console.log("User: ", d);
                $scope.user = d;
            })
            .error(function (d) {
                console.error("Error: ", d);
            });

    };

    // User adatok mentése.
    $scope.postUser = function () {
        $http.post("http://127.0.0.1:1337", $scope.user)
            .success(function (d) {
                console.log("User: ", d);
            })
            .error(function (d) {
                console.error("Error: ", d);
            });
    };

    // inputText figyelése.
    $scope.$watch("user", function (newValue, oldValue) {
        console.log("user", newValue, oldValue);
    });

    // Profikép kezelése.
    $scope.$on("$includeContentLoaded", function ($ev, url) {
        if (url === "pages/register-form.html") {
            var profileImg = new profileImgHandler(".profile-image-holder");
        }
    });
    //    $timeout(function () {
    //        var profileImg = new profileImgHandler(".profile-image-holder");
    //    }, 2000);

}]);