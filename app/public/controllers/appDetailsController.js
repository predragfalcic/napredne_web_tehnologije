// Controller za korisnike
// prijava na sistem i registracija
(function (angular) {
    
    var appDetailsCtrl = function($scope, $http, $location, $window, AuthenticationService, ProfileService){
        // Korisnik
        $scope.user = {};

        $scope.user = AuthenticationService.currentUser();

        if(AuthenticationService.isLoggedIn() !== true){
            $location.path('/login');
        }

        $scope.a = {};
        $scope.getApp = function(){
            // alert("app id " + JSON.stringify($window.sessionStorage.app_id));
            ProfileService.nadjiAplikaciju($window.sessionStorage.app_id)
                .then(function(response){
                    // alert("response " + JSON.stringify(response.data.dogadjaji));
                    $scope.a = response.data;
                }).catch(function(error){
                    alert("error " + error);
                });
        }

        // Delete dogadjaj
        $scope.deleteDog = function(dog){
            // alert("Delete app with id " + JSON.stringify(app._id));
            ProfileService.obrisiDogadjaj(dog._id)
                .then(function(response){
                    // alert("response " + JSON.stringify(response.data));
                    $scope.getApp();
                    alert("Dogadjaj je obrisan");
                }).catch(function(error){
                    alert("error " + error);
                });
        }

        $scope.getApp();

        $scope.logout = function(){
            AuthenticationService.logout();
            $location.path("/login");
        }
    }
    var appRegister = angular.module('appDetailsModule', []);
    appRegister.controller('appDetailsCtrl', appDetailsCtrl);
})(angular);