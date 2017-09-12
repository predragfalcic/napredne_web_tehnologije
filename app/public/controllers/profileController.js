// Controller za korisnike
// prijava na sistem i registracija
(function (angular) {
    
    var profileCtrl = function($scope, $http, $location, $window, AuthenticationService, ProfileService){
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

        $scope.app = {};
        $scope.addApp = function(app){
            // alert("Clicked addApp " + JSON.stringify(app));
            ProfileService.dodajAplikaciju($scope.user.id, app)
                .then(function(response){
                    // alert("response " + JSON.stringify(response.data));
                    $scope.ucitajAplikacije();
                    $scope.app = {};
                }).catch(function(error){
                    alert("error " + error);
                });
        }

        $scope.deleteApp = function(app){
            // alert("Delete app with id " + JSON.stringify(app._id));
            ProfileService.obrisiAplikaciju(app._id)
                .then(function(response){
                    // alert("response " + JSON.stringify(response.data));
                    $scope.ucitajAplikacije();
                }).catch(function(error){
                    alert("error " + error);
                });
        }

        // app details
        $scope.detailsApp = function(app){
            $window.sessionStorage.app_id = app._id;
            $location.path('/details/');
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