var app = angular.module('USuniversity', []);
app.controller('searchController', function($scope, $http) {
  $scope.Submit = function() {
    var request = $heep.get('/secondPage/'+$scope.sat+'&'+$scope.upperLimit+'&'+$scope.lowerLimit);
    request.success(function(data) {
      $scope.data = data;
    });
    request.error(function(data) {
      console.log('err');
    });
  };
});
