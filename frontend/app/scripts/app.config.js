'use strict';
angular
  .module('psJwtApp').config(function($urlRouterProvider, $stateProvider) {
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
  });
