var myApp = angular.module('myApp');

myApp.controller('MainController', ($scope, $http, $location, $routeParams)=>{
    console.log('main');
//    $scope.getColors = ()=>{
//      $http.get('/api/colors')
//      .success((response)=>{
//          console.log(response);
//      });
//    };
});