var app = angular.module('USuniversity', []);

app.controller('searchController', function($scope, $http, $window) {
  $scope.Submit = function() {
    $window.sessionStorage.sat=$scope.sat;
    $window.sessionStorage.upperLimit=$scope.upperLimit;
    $window.sessionStorage.lowerLimit=$scope.lowerLimit;
    window.location='/universitylist';
  };
});

app.controller('tempController',function($scope, $http, $window){
  var request=$http.get('/universitylist/'+$window.sessionStorage.sat+'/'+$window.sessionStorage.upperLimit+'/'+$window.sessionStorage.lowerLimit);
  request.success(function(data){
    $scope.data=data;
  });
  request.error(function(data){
    console.log('err');
  });
  /*scope.Find = function() {
    $scope.name = $scope.data.univ_name;
    var request = $http.get('/thirdpage/'+$scope.name);
    request.success(function(data) {
      $scope.data2 = data;
    });
    request.error(function(data) {
      console.log('err');
    });
  };*/
});