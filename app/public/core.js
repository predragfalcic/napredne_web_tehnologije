(function (angular) {

var scotchTodo = angular.module('scotchTodo', ['ngRoute', 'authentication', 'registerModule', 'loginModule',
 'profileModule', 'profile', 'appDetailsModule']);

scotchTodo.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '../app/directives/signup.html'
	})
	.when('/login', {
		templateUrl: '../app/directives/login.html'
	})
	.when('/signup', {
		templateUrl: '../app/directives/signup.html'
	})
	.when('/profile', {
		templateUrl: '../app/directives/profile.html'
	})
	.when('/details', {
		templateUrl: '../app/directives/appDetails.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

})(angular);
