(function (angular) {
	angular.module('profile', [])
		.factory('ProfileService', ProfileService);

        ProfileService.$inject = ['$http', '$window'];

	function ProfileService($http, $window) {

        var service = {
            ucitajAplikacije: ucitajAplikacije
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
    }
})(angular);