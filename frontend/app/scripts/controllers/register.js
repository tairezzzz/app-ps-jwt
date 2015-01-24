'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterCtrl', function($scope, $rootScope, $http, alert, authToken) {

    $scope.submit = function() {
      var url = 'http://localhost:3000/register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };
      $http.post(url, user)
        .success(function(res) {
          alert('success', 'Account Created!', 'Welcome ' + res.user.email + '!');
          authToken.setToken(res.token);
        })
        .error(function() {
          alert('warning', 'Opps!', 'Could not register!');
        });
    };
  });
