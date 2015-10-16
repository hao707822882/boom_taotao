myAppModule.controller('indexController', ["$scope", "Ajax", function ($scope, Ajax) {
    $scope.name = 'xingoo';

    var menu = [[{name: '录入', url: "/addView"}, {name: '检索', url: "/searchView"}], [{name: '举报', url: "/reportView"}]]
    $scope.menuDate = menu[0];

    $scope.menu = function (index) {
        $scope.menuDate = menu[index || 0];
    }
    $scope.active = function (index) {
        $(index).parent().siblings().removeClass("active")
        $(index).parent().addClass("active")
    }
}]);