/**
 * Created by Administrator on 2015/10/16.
 */
myAppModule.controller('indexViewController', ["$scope", function ($scope) {
    $scope.name = 'index view';
    var menu = [[{name: '录入', url: "/addView"}, {name: '检索', url: "/searchView"}], [{name: '举报', url: "/reportView"}]]
    $scope.menuDate = [];
    $scope.menu = function (index) {
        $scope.menuDate = menu[index || 0];
    }
}]);