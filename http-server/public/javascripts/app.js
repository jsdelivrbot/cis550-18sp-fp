var app = angular.module('USuniversity', []);
// Used in first page to hide about us
app.controller('MyController', function ($scope) {
  //This will hide the DIV by default.
  $scope.IsVisible = false;
  $scope.ShowHide = function () {
      //If DIV is visible it will be hidden and vice versa.
      $scope.IsVisible = $scope.IsVisible ? false : true;
  }
});

app.controller('searchController', function ($scope, $http, $window) {
  $scope.Submit = function () {
    $window.sessionStorage.sat = $scope.sat;
    $window.sessionStorage.upperLimit = $scope.upperLimit;
    $window.sessionStorage.lowerLimit = $scope.lowerLimit;
    $window.sessionStorage.sort = '1';
    window.location = '/universitylist';
  };
});

app.controller('detailController', function ($scope, $http, $window) {
  $http.get('/details/' + $window.sessionStorage.name).then(
    function (response) {
      $scope.data2 = response.data;
      console.log($scope.data2);
    }, function (response) {
      console.log('err');
    }
  );

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var chartdata = google.visualization.arrayToDataTable([
      ['task', 'subject distribution'],
      ['Science', $scope.data2[0].science],
      ['Engineering', $scope.data2[0].engineering],
      ['Business', $scope.data2[0].business],
      ['Liberal Arts', $scope.data2[0].liberal_arts]
    ]);
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(chartdata);
  }
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

  $scope.Find = function (index) {
    $window.sessionStorage.name = $scope.data[index].univ_name;
    $http.get('/details').then();
    window.location = '/details';
  };

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
