app.directive("cwcFilter", ()=>{
    return {
//        controller: '@',
//        name: 'controller', 
//        restrict : 'E',
//        scope: {
//            data: '=id'
//        },
        //templateUrl : './template/select.html'
    };
}).directive("cwcSelect", ()=>{
    return {
//        controller: '@',
//        name: 'controller', 
//        restrict : 'E',
//        scope: {
//            data: '=id'
//        },
        templateUrl : './template/select.html'
    };
}).directive("cwcInputText", ()=>{
    return {
        templateUrl: './template/input-text.html'
    }
});