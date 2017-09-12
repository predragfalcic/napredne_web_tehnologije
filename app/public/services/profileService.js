(function (angular) {
	angular.module('profile', [])
		.factory('ProfileService', ProfileService);

        ProfileService.$inject = ['$http', '$window'];

	function ProfileService($http, $window) {

        var service = {
            ucitajAplikacije: ucitajAplikacije,
            dodajAplikaciju: dodajAplikaciju,
            obrisiAplikaciju: obrisiAplikaciju,
            nadjiAplikaciju: nadjiAplikaciju
        };

        return service;

        function ucitajAplikacije(id) {
            return $http({
                // without anything here, put * in app.post()
                url : 'http://localhost:8181/api/accounts/aplikacije/' + id,
                method : "GET",
                params: {id: id},
                responseType : "application/json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
        }
        // Dodaj aplikaciju gde je id korisnikov koji kreira aplikaciju
        function dodajAplikaciju(id, app) {
            // alert(JSON.stringify(app));
            return $http({
                // without anything here, put * in app.post()
                url : 'http://localhost:8181/api/app/' + id,
                method : "POST",
                params: {id: id},
                data: $.param(app),
                responseType : "application/json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
        }

        // Obrisi aplikaciju gde je id id aplikacije za brisanje
        function obrisiAplikaciju(id) {
            // alert(JSON.stringify(id));
            return $http({
                // without anything here, put * in app.post()
                url : 'http://localhost:8181/api/app/' + id,
                method : "DELETE",
                params: {id: id},
                responseType : "application/json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
        }

        // Pronadji aplikaciju gde je id id aplikacije
        function nadjiAplikaciju(id) {
            // alert(JSON.stringify(id));
            return $http({
                // without anything here, put * in app.post()
                url : 'http://localhost:8181/api/app/' + id,
                method : "GET",
                params: {id: id},
                responseType : "application/json",
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
        }
    }
})(angular);