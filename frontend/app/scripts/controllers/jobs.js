'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('JobsCtrl', function($scope, $http, API_URL, alert) {
    $http.get('http://localhost:1337/job').success(function(jobs) {
      $scope.jobs = jobs;
    }).error(function(err) {
      alert('warning', 'Unable to get jobs', err.message);
    });
  });
