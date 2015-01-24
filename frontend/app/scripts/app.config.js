'use strict';
angular
  .module('psJwtApp').config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
      url: '/',
      templateUrl: '/views/main.html'
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
  });
