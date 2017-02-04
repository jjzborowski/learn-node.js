var myApp = angular.module('myApp');

myApp.controller('MainController', ($scope, $http, $location, $routeParams)=>{
    $scope.getColors = ()=>{
      $http.get('/api/types')
      .success((response)=>{
          console.log(response);
      });
    };
});