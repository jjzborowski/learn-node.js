app.directive("selectArtist", function() {
    return {
        restrict : 'E',
        templateUrl : './template/select-artist.html'
    };
}).directive("selectColor", function() {
    return {
        restrict : 'E',
        templateUrl : './template/select-color.html'
    };
}).directive("selectExpansion", function() {
    return {
        restrict : 'E',
        templateUrl : './template/select-expansion.html'
    };
}).directive("selectRarity", function() {
    return {
        restrict : 'E',
        templateUrl : './template/select-rarity.html'
    };
}).directive("selectSubtype", function() {
    return {
        restrict : 'E',
        templateUrl : './template/select-subtype.html'
    };
}).directive("selectType", function() {
    return {
        restrict : 'E',
        templateUrl : './template/select-type.html'
    };
})