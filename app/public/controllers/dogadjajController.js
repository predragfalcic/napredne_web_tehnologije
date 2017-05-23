(function (angular) {

	var dogadjajController = function ($scope, $http, dogservice) {
		$scope.message = "Hello from the controller!";
		$scope.formData = {};
		$scope.loading = true;
		$scope.dogadjaji = {};

		dogservice.getAll()
			.then(function (data) {
				$scope.dogadjaji = data;
				$scope.loading = false;
			});

		$scope.getOne = function (id) {
			dogservice.get(id)
				.then(function (data) {
					$scope.loading = false;
					$scope.dogadjaji = data;
				});
		};

		// call the create function from our service (returns a promise object)
		/*dogservice.create(id, $scope.formData)

					// if successful creation, call our get function to get all the new todos
			.then(function(data) {
				$scope.loading = false;
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.dogadjaji = data; // assign our new list of todos
			});*/

		$scope.createDogadjaj = function (id) {
			dogservice.create(id, $scope.formData)
				.then(function (data) {
					$scope.loading = false;
					$scope.formData = {};
					$scope.dogadjaji = data;
				});
		};

		$scope.deleteDogadjaj = function (id) {
			$scope.loading = true;

			dogservice.deleteDog(id)
				// if successful creation, call our get function to get all the new todos
				.then(function (data) {
					$scope.loading = false;
					$scope.dogadjaji = data; // assign our new list of todos
				});
		};

	}
	var appDogadjaj = angular.module('dogadjajModule', []);
	appDogadjaj.controller('dogadjajController', dogadjajController);

})(angular);




/*angular.module('dogadjajController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Dogadjaj', function($scope, $http, Dogadjaj) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Dogadjaj.getAll()
			.success(function(data) {
				$scope.dogadjaji = data;
				$scope.loading = false;
			});

        $scope.getOne() = function(id) {
                Dogadjaj.get(id)
                .success(function(data) {
					$scope.loading = false;
					$scope.dogadjaji = data; // assign our new list of todos
				});

			};

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createDogadjaj = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Dogadjaj.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.dogadjaji = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteDogadjaj = function(id) {
			$scope.loading = true;

			Dogadjaj.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.dogadjaji = data; // assign our new list of todos
				});
		};
	}]);
*/

