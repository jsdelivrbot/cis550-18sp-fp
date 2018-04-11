var app = angular.module('USuniversity', []);

app.controller('searchController', function ($scope, $http, $window) {
  $scope.Submit = function () {
    $window.sessionStorage.sat = $scope.sat;
    $window.sessionStorage.upperLimit = $scope.upperLimit;
    $window.sessionStorage.lowerLimit = $scope.lowerLimit;
    $window.sessionStorage.sort = '1';
    window.location = '/universitylist';
  };
});

app.controller('tempController', function ($scope, $http, $window) {

  httpGet();
  $('#total_number_h').text('');
  $('#total_number').hide();
  $('#living_cost_h').text('');
  $('#living_cost').hide();
  $('#company_num_h').text('');
  $('#company_num').hide();

  function httpGet() {
    $http.get('/universitylist/' + $window.sessionStorage.sat + '/' + $window.sessionStorage.upperLimit + '/' + $window.sessionStorage.lowerLimit + '/' + $window.sessionStorage.sort).then(
      function (response) {
        $scope.data = response.data;
      }, function (response) {
        console.log('err');
      });
  }

  $scope.rank = function () {
    $window.sessionStorage.sort = '1';
    httpGet();
    $('#total_number_h').text('');
    $('#total_number').hide();
    $('#living_cost_h').text('');
    $('#living_cost').hide();
    $('#company_num_h').text('');
    $('#company_num').hide();
  };

  $scope.admRate = function () {
    $window.sessionStorage.sort = '2';
    httpGet();
    $('#total_number_h').text('');
    $('#total_number').hide();
    $('#living_cost_h').text('');
    $('#living_cost').hide();
    $('#company_num_h').text('');
    $('#company_num').hide();
  };

  $scope.crime = function () {
    $window.sessionStorage.sort = '3';
    httpGet();
    $('#total_number_h').text('Crime number');
    $('#total_number').show();
    $('#living_cost_h').text('');
    $('#living_cost').hide();
    $('#company_num_h').text('');
    $('#company_num').hide();
  }

  $scope.cost = function () {
    $window.sessionStorage.sort = '4';
    httpGet();
    $('#total_number_h').text('');
    $('#total_number').hide();
    $('#living_cost_h').text('Living cost');
    $('#living_cost').show();
    $('#company_num_h').text('');
    $('#company_num').hide();
  }

  $scope.comNum = function () {
    $window.sessionStorage.sort = '5';
    httpGet();
    $('#total_number_h').text('');
    $('#total_number').hide();
    $('#living_cost_h').text('');
    $('#living_cost').hide();
    $('#company_num_h').text('Company number');
    $('#company_num').show();
  }
});
