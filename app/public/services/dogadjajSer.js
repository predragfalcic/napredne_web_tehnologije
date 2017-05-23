(function (angular) {
	angular.module('dogadjajService', [])
		.factory('dogservice', dogservice);

	dogservice.$inject = ['$http'];

	function dogservice($http) {

		var service = {
			getAll: getAll,
			get: get,
			create: create,
			deleteDog: deleteDog
		};

		return service;

		function getAll() {
			return $http.get('/api/dogadjaj/');
		}

		function get(id) {
			return $http.get('/api/dogadjaj/' + id);
		}

		function create(id, dogadjajData) {
			return $http.post('/api/dogadjaj/' + id, dogadjajData);
		}

		function deleteDog(id) {
			return $http.delete('/api/dogadjaj/' + id);
		}
	};

})(angular);


/*angular.module('dogadjajService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Dogadjaj', ['$http',function($http) {
		return {
            getAll : function() {
				return $http.get('/api/dogadjaj');
			},
			get : function(id) {
				return $http.get('/api/dogadjaj/' + id);
			},
			create : function(dogadjajData) {
				return $http.post('/api/dogadjaj', dogadjajData);
			},
			delete : function(id) {
				return $http.delete('/api/dogadjaj/' + id);
			}
		}
	}]);*/