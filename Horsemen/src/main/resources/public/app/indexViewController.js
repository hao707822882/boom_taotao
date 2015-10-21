/**
 * Created by Administrator on 2015/10/16.
 */
myAppModule.controller('indexViewController', ["$scope", function ($scope) {
    $scope.menuDate = [];
    $scope.menu = function (index) {
        $scope.menuDate = menu[index || 0];
    }
}]);