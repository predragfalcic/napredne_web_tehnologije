// Controller za korisnike
// prijava na sistem i registracija
(function (angular) {

    var registerCtrl = function($scope, $http, $location, AuthenticationService){
        // Ukoliko je pronadjen korisnik sa tom email adresom
        $scope.errorMessageEmail = "";
        // Ukoliko se lozinke ne poklapaju
        $scope.errorMessagePassword = "";
        // Korisnik
        $scope.user = {};
        // Password and password confirmation field
        $scope.password = "";
        $scope.password_confirmation = "";
    
        if(AuthenticationService.isLoggedIn() === true){
            $location.path('/profile');
        }
    
        $scope.signup = function(user){
            if($scope.password !== $scope.password_confirmation){
                return $scope.errorMessagePassword = "Passwords do not match";
            }else{
                $scope.user.lozinka = $scope.password;
            }
    
            AuthenticationService.register(user)
                .then(function (response){
                    $location.path('/login');
                })
                .catch(function(error){
                    alert("error " + error);
                });
        };

        $scope.redirectToLogin = function(){
            $location.path("login");
        };
    }
    var appRegister = angular.module('registerModule', []);
    appRegister.controller('registerCtrl', registerCtrl);
})(angular);