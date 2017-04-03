var myApp = angular.module('myApp');

myApp.controller('MainController', ['$rootScope', '$scope', '$http', '$timeout', ($rootScope, $scope, $http, $timeout)=>{
    $rootScope.lang = 'en';

    $http.get('/api/label/lang/' + $rootScope.lang).success((response)=>{
        $rootScope.labels = response.labels;
    });

    $rootScope.find = {
        artist: [],
        color: [],
        expansion: [],
        rarity: [],
        subtype: [],
        type: []
    }


    $rootScope.search = ()=>{
        console.log($rootScope.find);

        $http.get('/api/card').success((response)=>{
            $scope.cards = response;
        });
        //              $http.post('/api/cards/find', JSON.stringify());
    };

//    const source = [],
//          target = [];
//
//    var checkByName = (name)=>{
//        var exist = false;
//        for(let i in target){
//            if(target[i].name === name){
//                exist = true;
//            }
//        }
//        return exist;
//    }
//
//    var getIndexByName = (name)=>{
//        for(let i in target){
//            if(target[i].name === name){
//                return i;
//            }
//        }
//        return false;
//    }
//
//
//    for(let i in source){
//        let index;
//        if(index = getIndexByName(source[i].name)){
//            target[index].expansion.push(source[i].expansion);
//            target[index].version.push({
//                expansion: source[i].expansion,
//                number: source[i].number,
//                rarity: source[i].rarity,
//                artist: [source[i].artist],
//                image: '',
//                flavor: '',
//                have: source[i].have,
//                spent: source[i].spent,
//                acquire: source[i].get,
//                source: source[i].source            
//            });
//        } else {
//            target.push({
//                name: source[i].name,
//                color: source[i].color,
//                type: [],
//                subtype: [],
//                cmc: 0,
//                mc: 0,
//                power: 0,
//                toughness: 0,
//                text: '',
//                expansion: [source[i].expansion],
//                version: [
//                    {
//                        expansion: source[i].expansion,
//                        number: source[i].number,
//                        rarity: source[i].rarity,
//                        artist: [source[i].artist],
//                        image: '',
//                        flavor: '',
//                        have: source[i].have,
//                        spent: source[i].spent,
//                        acquire: source[i].get,
//                        source: source[i].source
//                    }
//                ]
//            });
//        }
//    }
//
//    console.log(target);

    //            $http.post('/api/card/insert', JSON.stringify(target)).
    //            success((response)=>{
    //                console.log('ok');
    //            });

    //    $http.post('/api/card/find', JSON.stringify(
    //        {'color': {$all: ['W', 'R']}}
    //    )).success((response)=>{
    //        console.log(response);
    //    });
    //
    //    $http.post('/api/card/find', JSON.stringify(
    //        {'color': {$in: ['W', 'R']}}
    //    )).success((response)=>{
    //        console.log(response);
    //    });
    //
    //    $http.post('/api/card/find', JSON.stringify(
    //        {'version': {$elemMatch: {'have': 0, expansion: 69}}}
    //    )).success((response)=>{
    //        console.log(response);
    //    });

    $http.post('/api/card/find', JSON.stringify({
        'name': [
            {
                mode: 0,
                value: 'elf'
            },
            {
                mode: 1,
                value: 'oo'
            },
            {
                mode: 1,
                value: 'll'
            },
            {
                mode: 2,
                value: 'll'
            }
        ],
        'version': {$elemMatch: {'have': 0, expansion: 69}},
        'color': {$all: ['W', 'R']}
    })).success((response)=>{
        console.log(response);
    });
}]);

const sections = ['artist', 'color', 'expansion', 'rarity', 'subtype', 'type'];
for(let section of sections){
    myApp.controller(section + '-ctrl', ['$rootScope', '$scope', '$http', '$timeout', ($rootScope, $scope, $http, $timeout)=>{
        $scope.options = [];

        $scope.addSelected = ()=>{
            if($scope.input !== undefined){
                $rootScope.find[section].push($scope.input);
                for(let i in $scope.options){
                    if($scope.options[i].name === $scope.input){
                        $scope.options[i].selected = true;
                    }
                }
                $scope.input = undefined;
            }
        };

        $scope.removeSelected = (index)=>{
            for(let i in $scope.options){
                if($scope.options[i].name === $rootScope.find[section][index]){
                    $scope.options[i].selected = false;
                }
            }
            $rootScope.find[section].splice(index, 1);
        };
    }]);
}

for(let section of sections){
    myApp.controller(section + '-select-ctrl', ['$rootScope', '$scope', '$http', '$timeout', ($rootScope, $scope, $http, $timeout)=>{
        $http.get('/api/' + section).
        success((response)=>{
            $scope.$parent.options = response;
            for(let i in $scope.$parent.options){
                $scope.$parent.options[i].selected = false;
            }
            $timeout(()=>{
                $scope.select = new Scrollbar(document.querySelector('#' + section));
                $scope.select.init();
                $scope.$watch('filtered', ()=>{
                    $timeout(()=>{
                        $scope.select.refreshDropdown($scope.filtered.length)
                    });
                });
            });
        });
    }]);
}