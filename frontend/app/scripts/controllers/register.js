'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterCtrl', function($scope, alert, auth) {
    $scope.submit = function() {
      auth.register($scope.email, $scope.password)
        .success(function(res) {
          alert('success', 'Account Created!', 'Welcome ' + res.user.email + '!');
        })
        .error(function() {
          alert('warning', 'Opps!', 'Could not register!');
        });
    };
  });
