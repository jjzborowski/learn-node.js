var app = angular.module("myApp", ["ngRoute"]);

app.config(($routeProvider) => {
    console.log('test');
    $routeProvider.when('/', {
        controller: 'MainController',
        templateUrl: 'template/main.html'
    }).when('/colors', {
        controller: 'ColorsController',
        templateUrl: 'template/colors.html'
    }).when('/types', {
        controller: 'TypesController',
        templateUrl: 'template/types.html'
    }).otherwise({
        redirectTo: '/'
    });
});