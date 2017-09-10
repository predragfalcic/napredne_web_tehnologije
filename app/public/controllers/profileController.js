// Controller za korisnike
// prijava na sistem i registracija
(function (angular) {
    
    var profileCtrl = function($scope, $http, $location, AuthenticationService, ProfileService){
        // Korisnik
        $scope.user = {};

        $scope.user = AuthenticationService.currentUser();

        if(AuthenticationService.isLoggedIn() !== true){
            $location.path('/login');
        }

        $scope.aplikacije = [];
        $scope.ucitajAplikacije = function(){
            ProfileService.ucitajAplikacije($scope.user.id)
                .then(function(response){
                    // alert("response " + JSON.stringify(response.data));
                    $scope.aplikacije = response.data;
                }).catch(function(error){
                    alert("error " + error);
                });
        }

        $scope.ucitajAplikacije();

        $scope.logout = function(){
            AuthenticationService.logout();
            $location.path("/login");
        }
    }
    var appRegister = angular.module('profileModule', []);
    appRegister.controller('profileCtrl', profileCtrl);
})(angular);