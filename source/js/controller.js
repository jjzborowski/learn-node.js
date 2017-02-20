var myApp = angular.module('myApp');

myApp.controller('MainController', ()=>{});

const sections = ['artists', 'colors', 'expansions', 'rarities', 'subtypes', 'types'];
for(let section of sections){
    myApp.controller(section + '-ctrl', ['$scope', '$http', '$timeout', ($scope, $http, $timeout)=>{
        $http.get('/api/' + section)
            .success((response)=>{
            $scope.options = response;
            $timeout(() => {
                $scope.select = new Scrollbar(document.querySelector('#' + section));
                $scope.select.init();
                $scope.$watch('filtered', ()=>{
                    $timeout(() => {
                        $scope.select.refreshDropdown($scope.filtered.length)
                    });
                });
            });
        });
    }]);
}