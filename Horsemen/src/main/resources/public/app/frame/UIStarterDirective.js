/**
 * Created by Administrator on 2015/10/21.
 */
UIStarter.directive("tab", function ($http, $window, layer, serialize) {
    var baseUrl = "";
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "app/directive/table.html",
        controller: function ($scope, $element, $attrs) {
            baseUrl = $attrs.url;
            $scope.querys = eval("(" + $attrs.querys + ")");
            $scope.ths = eval("(" + $attrs.ths + ")");
            $scope.labs = eval("(" + $attrs.labs + ")");
            $scope.search = {};
            $scope.update = $attrs.update && $scope.ths.push({'lab': '更新'});
            $scope.delete = $attrs.delete && $scope.ths.push({'lab': '删除'});
            $scope.Fsearch = function () {
                $http.get(baseUrl + serialize.getSerialize($scope.search)).success(function () {
                    $scope.data = arguments[0]
                }).error(function () {
                    layer.topTip("查询数据失败")
                })
            }
            $scope.Fdelete = function (date) {
                if (!$window.confirm("！确认删除该数据"))
                    return;
                $http.delete(baseUrl + "/" + date.id).success(function () {
                    $scope.data = arguments[0];
                    layer.topTip("删除成功")
                }).error(function () {
                    layer.topTip("删除失败")
                })
            }
            $scope.Fupdate = function (date) {
                $scope.updateDate = angular.copy(date);
            }

            function update() {
                $http.post($attrs.url + "/" + $scope.updateDate.id, $scope.updateDate, {"headers": "Content-Type"}).success(function () {
                    layer.topTip("更新数据成功！")
                    $scope.data = arguments[0]
                    $('#myModal').modal("hide")
                }).error(function () {
                    layer.topTip("更新数据失败")
                })
            }

            $scope.DoFupdate = function () {
                update();
            }
        },
        link: function ($scope, $element, $attrs) {//加载数据
            $http.get($attrs.url).success(function () {
                $scope.data = arguments[0];
            }).error(function () {
                layer.topTip("加载数据失败")
            })
        }
    }
})


UIStarter.directive("autoForm", function ($http, $window, layer, serialize) {
    var baseUrl = "";
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "app/directive/autoForm.html",
        controller: function ($scope, $element, $attrs) {
            baseUrl = $attrs.url;
            $scope.inputs = eval("(" + $attrs.inputs + ")");
            $scope.data = {};
            $scope.fSave = function () {
                console.log($scope.data)
                $http.put($attrs.url, $scope.data).success(function () {
                    layer.topTip("更新保存成功！")
                    $scope.data = arguments[0]
                }).error(function () {
                    layer.topTip("更新保存失败")
                })
            }
        }
    }
})