var app = angular.module('USuniversity', []);
app.controller('searchController', function($scope, $http) {
  $scope.Submit = function() {
    var request = $http.get('/secondpage/'+$scope.sat+'&'+$scope.upperLimit+'&'+$scope.lowerLimit);
    request.success(function(data) {
      $scope.data = data;
    });
    request.error(function(data) {
      console.log('err');
    });
  };
  $scope.Find = function() {
    $scope.name = $scope.data.univ_name;
    var request = $http.get('/thirdpage/'+$scope.name);
    request.success(function(data) {
      $scope.data2 = data;
    });
    request.error(function(data) {
      console.log('err');
    });
  };
});
