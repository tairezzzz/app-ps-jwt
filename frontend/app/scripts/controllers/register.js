'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterCtrl', function($scope, alert, $auth) {
    $scope.submit = function() {
      $auth.signup({
        email: $scope.email,
        password: $scope.password
      })
        .then(function(res) {
          alert('success', 'Account Created!', 'Welcome ' + res.data.user.email + '! Please email activate your account in the next several days.');
        })
        .catch(function() {
          alert('warning', 'Opps!', 'Could not register!');
        });
    };
  });
