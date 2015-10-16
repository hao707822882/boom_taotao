myAppModule.controller('indexController', ["$scope", "Ajax", function ($scope, Ajax) {
    $scope.name = 'xingoo';
    $scope.show = function () {
        Ajax.alert1();
    }
}]);