'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterCtrl', function($scope, $rootScope, $http, alert) {

    $scope.submit = function() {
      var url = 'http://localhost:3000/register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };
      $http.post(url, user)
        .success(function() {
          alert('success', 'Cool!', 'You have been registered!');
        })
        .error(function() {
          alert('warning', 'Opps!', 'Could not register!');
        });
    };
  });
