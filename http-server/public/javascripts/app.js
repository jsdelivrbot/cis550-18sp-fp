var app = angular.module('USuniversity', []);

app.controller('searchController', function ($scope, $http, $window) {
  $scope.Submit = function () {
    $window.sessionStorage.sat = $scope.sat;
    $window.sessionStorage.upperLimit = $scope.upperLimit;
    $window.sessionStorage.lowerLimit = $scope.lowerLimit;
    window.location = '/universitylist';
  };
});

app.controller('tempController', function ($scope, $http, $window) {

  $http.get('/universitylist/' + $window.sessionStorage.sat + '/' + $window.sessionStorage.upperLimit + '/' + $window.sessionStorage.lowerLimit).then(
    function (response) {
      $scope.data = response.data;
    }, function (response) {
      console.log('err');
    });
});