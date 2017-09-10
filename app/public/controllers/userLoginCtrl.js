(function (angular) {
    var loginCtrl = function($scope, $http, $location, AuthenticationService){
        // Ukoliko je pronadjen korisnik sa tom email adresom
        $scope.errorMessageEmail = "";
        // Ukoliko se lozinke ne poklapaju
        $scope.errorMessagePassword = "";
        // Korisnik
        $scope.user = {};
        // Password  field
        $scope.password = "";

        if(AuthenticationService.isLoggedIn() === true){
            $location.path('/profile');
        }

        $scope.login = function(user){
            AuthenticationService.login(user)
                .then(function(response){
                    // $location.path('/profile');
                    $location.path("/profile");
                }).catch(function(error){
                    alert("error " + error);
                });
        };

        $scope.redirectToSignup = function(){
            $location.path("signup");
        };
    }
    var appRegister = angular.module('loginModule', []);
    appRegister.controller('loginCtrl', loginCtrl);
})(angular);