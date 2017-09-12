// Controller za korisnike
// prijava na sistem i registracija
(function (angular) {
    
    var appEditCtrl = function($scope, $http, $location, $window, AuthenticationService, ProfileService){
        // Korisnik
        $scope.user = {};

        $scope.user = AuthenticationService.currentUser();

        if(AuthenticationService.isLoggedIn() !== true){
            $location.path('/login');
        }

        $scope.getApp = function(){
            // alert("app id " + JSON.stringify($window.sessionStorage.app_id));
            ProfileService.nadjiAplikaciju($window.sessionStorage.app_id)
                .then(function(response){
                    // alert("response " + JSON.stringify(response.data));
                    $scope.app = response.data;
                }).catch(function(error){
                    alert("error " + error);
                });
        }

        $scope.getApp();

        $scope.app = {};
        $scope.editApp = function(app){
            ProfileService.izmeniAplikaciju($scope.user.id, app)
                .then(function(response){
                    $scope.app = response.data;
                    alert("App edited successfuly");
                }).catch(function(error){
                    alert("error " + error);
                });
        }

        $scope.logout = function(){
            AuthenticationService.logout();
            $location.path("/login");
        }
    }
    var appRegister = angular.module('appEditModule', []);
    appRegister.controller('appEditCtrl', appEditCtrl);
})(angular);