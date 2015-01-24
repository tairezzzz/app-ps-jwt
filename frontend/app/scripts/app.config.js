'use strict';
angular
  .module('psJwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider) {
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
    $stateProvider.state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });
    
    $httpProvider.interceptors.push('authInterceptor');
    
  })
.constant('API_URL', 'http://localhost:3000/');
