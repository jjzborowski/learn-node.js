var myApp = angular.module('myApp');

myApp.controller('ColorsController', ($scope, $http, $location, $routeParams)=>{
//    $scope.getColors = ()=>{
        $http.get('/api/colors')
            .success((response)=>{
            $scope.colors = response;
            console.log(response);
        });
//    };    
});