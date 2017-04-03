var app = angular.module("myApp", ["ngRoute"]);

app.config(($routeProvider)=>{
    $routeProvider.when('/', {
        controller: 'MainController',
        templateUrl: 'template/main.html'
    }).otherwise({
        redirectTo: '/'
    });
});
