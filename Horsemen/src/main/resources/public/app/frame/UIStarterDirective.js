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

UIStarter.directive("dialog", function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: "app/directive/dialog/dialog.html"
    }
})

UIStarter.directive("dialogbody", function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: "app/directive/dialog/body.html"
    }
})
UIStarter.directive("dialogfooter", function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: "app/directive/dialog/footer.html"
    }
})

UIStarter.directive("echart", function ($http, layer) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: "app/directive/chart/echart.html",
        transclude: true
    }
})

UIStarter.directive("echartLine", function ($http, layer) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {},
        templateUrl: "app/directive/chart/echart.html",
        controller: function ($scope, $element, $attrs) {
            return true
        },
        link: function ($scope, $element, $attrs) {//加载数据
            var initDataPath = $attrs.initdatapath
            $scope.width = Number($attrs.width)
            $scope.heigth = Number($attrs.heigth)
            var xLine = eval("(" + $attrs.xline + ")");
            var lineLab = eval("(" + $attrs.linetype + ")");
            var initDate = [];

            $http.get(initDataPath).success(function () {
                $(arguments[0]).each(function (index) {
                    var temp = {}
                    temp.name = lineLab[index]
                    temp.type = "bar"
                    temp.data = this
                    initDate.push(temp)
                })
                option1 = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        data: lineLab
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data: xLine
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: initDate
                }
                var chart = echarts.init($element[0]);
                chart.setOption(option1)
            }).error(function () {
                layer.msg("初始化诗句获取失败")
            })
        }
    }
})
