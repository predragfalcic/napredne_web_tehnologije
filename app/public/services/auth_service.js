(function (angular) {
	angular.module('authentication', [])
		.factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$window'];

	function AuthenticationService($http, $window) {

		var service = {
			saveToken: saveToken,
			getToken: getToken,
			isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      register: register,
      login: login,
      logout: logout
		};

		return service;

		function saveToken(token) {
      $window.localStorage['mean-token'] = token;
    }

    function getToken() {
      return $window.localStorage['mean-token'];
    }

    function isLoggedIn() {
      var token = getToken();
      var payload;
      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    }

    function currentUser() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          id: payload._id,
          email : payload.email,
          ime : payload.ime,
          prezime: payload.prezime
        };
      }
    }

    function register(user) {
        return $http({
          // without anything here, put * in app.post()
          url : 'http://localhost:8181/api/accounts/signup',
          method : "POST",
          data : $.param(user),
          responseType : "application/json",
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function mySuccess(response) {
          // saveToken(response.data.token);
          alert("register service " + response.data.message);
        }, function myError(response) {
            alert(response.statusText);
        });
    }

    function login(user) {
      return $http({
        // without anything here, put * in app.post()
        url : 'http://localhost:8181/api/accounts/login',
        method : "POST",
        data : $.param(user),
        responseType : "application/json",
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function mySuccess(response) {
        alert(response.data.message);
        saveToken(response.data.token);
      }, function myError(response) {
        alert(response.statusText);
      });
    }

    function logout() {
      $window.localStorage.removeItem('mean-token');
    }
	};

})(angular);