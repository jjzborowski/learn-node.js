app.directive("cwcSelect", function() {    
    return {
        controller: '@',
        name: 'controller', 
        restrict : 'E',
        scope: {
            data: '=id'
        },
        templateUrl : './template/select.html'
    };
});