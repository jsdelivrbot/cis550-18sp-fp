var app = angular.module('searchBox', []);

app.controller('searchBoxController', function ($scope, $http) {
    $scope.x = 0;
    $scope.y = 0;
    $scope.z = 0;
    
    $scope.update = (function (x, y, z) {
        console.log("x: " + x);
        console.log("y: " + y);
        console.log("z: " + z);
    });
});


