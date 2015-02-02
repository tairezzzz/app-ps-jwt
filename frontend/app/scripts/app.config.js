'use strict';
angular
  .module('psJwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    });
    $stateProvider.state('jobs', {
      url: '/jobs',
      templateUrl: '/views/jobs.html',
      controller: 'JobsCtrl'
    });
    $stateProvider.state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    });
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    });
    $stateProvider.state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });

    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';

    $authProvider.google({
      clientId: '610266563015-uvlhpcrp87tscqbpq1vhp843cuajrvhj.apps.googleusercontent.com',
      url: API_URL + 'auth/google'
    });

    $authProvider.facebook({
      clientId: '765393453509704',
      url: API_URL + 'auth/facebook'
    });

    $httpProvider.interceptors.push('authInterceptor');

  })
  .constant('API_URL', 'http://localhost:3000/')

.run(function($window) {
  var params = $window.location.search.substring(1);
  if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
    var pair = params.split('=');
    var code = decodeURIComponent(pair[1]);

    $window.opener.postMessage(code, $window.location.origin);

  }
});
