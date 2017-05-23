(function(angular) {

	var app = angular.module('mainApp',['ngRoute']);
	app
    .config(config)
    .run(run);
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');
        $stateProvider
       .state('main', {
          url: '/main',
          templateUrl: 'blogEntry/blogEntries.html',
          controller: 'blogEntriesCtrl'
      })
       .state('entry', {
          url: '/blogEntries/:id',
          templateUrl: 'blogEntry/blogEntry.html',
          controller: 'blogEntryCtrl'
      })
       .state('login', {
        url: '/login',
        templateUrl: 'users/login.html',
        controller: 'loginCtrl'
    });
    }
})(angular);
