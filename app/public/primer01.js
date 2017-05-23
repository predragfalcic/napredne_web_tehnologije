(function(angular) {

  var helloController = function ($scope) {
		$scope.message = "Hello from the controller!";
    $scope.autor = "nemanja";
	};


  var app = angular.module('app', ['ngRoute','ngResource']);
  app.controller('helloCon', helloController);

  app.config(function($routeProvider) {
    $routeProvider
    .when('/main',{
      templateUrl: 'app/primer01-entries.html',
      controller: 'helloCon'
    })
    .otherwise({
      redirectTo:'/main'
    });
  });
})(angular);
