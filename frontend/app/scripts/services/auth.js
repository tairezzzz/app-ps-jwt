'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.auth
 * @description
 * # auth
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
  .service('auth', function auth($http, API_URL, authToken, $state, $window) {

    function authSuccessful(res) {
      authToken.setToken(res.token);
      $state.go('main');
    }

    this.login = function(email, password) {
      return $http.post(API_URL + 'login', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    this.register = function(email, password) {
      return $http.post(API_URL + 'register', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    var urlBuilder = [];
    var clientId = '610266563015-uvlhpcrp87tscqbpq1vhp843cuajrvhj.apps.googleusercontent.com';

    urlBuilder.push(
      'response_type=code',
      'client_id=610266563015-uvlhpcrp87tscqbpq1vhp843cuajrvhj.apps.googleusercontent.com',
      'redirect_uri=' + window.location.origin,
      'scope=profile email'
    );

    this.googleAuth = function() {
      console.log('here');
      var url = 'https://accounts.google.com/o/oauth2/auth?' + urlBuilder.join('&');
      var options = 'width=500, height=500, left=' + (window.outerWidth - 500) / 2 + ', top=' + ($window.outerHeight - 500) / 2.5;
      var popup = $window.open(url, '', options);
      $window.focus();

      $window.addEventListener('message', function(event) {
        if (event.origin === $window.location.origin) {
          var code = event.data;
          popup.close();

          $http.post(API_URL + 'auth/google', {
            code: code,
            clientId: clientId,
            redirectUri: window.location.origin
          });
        }
      });
    };

  });
