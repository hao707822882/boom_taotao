/**
 * Created by Administrator on 2015/10/16.
 */
myAppModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/index', {
            templateUrl: 'app/template/index.html',
            controller: 'indexViewController'
        }).when('/save', {
            templateUrl: 'app/template/save.html',
            controller: 'indexViewController'
        }).
        otherwise({
            redirectTo: '/index'
        });
}])

