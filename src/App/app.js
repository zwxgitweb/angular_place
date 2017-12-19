// 将angular模块化管理
var app = angular.module('app', ['ui.router', 'ionic', 'pascalprecht.translate']);
// 配置UI路由
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('active');
    $stateProvider
    // 主页面模块
    .state('active', {
        url: '/active',
        templateUrl: 'src/App/View/active.html',
        params: {
            current: ''
        },
        controller:'activeCtr'
    })
    // 国际化功能的实现
    .state('International', {
        url: '/International',
        templateUrl: 'src/App/View/International.html',
        params: {
            current: null
        },
        controller: function ($scope, $stateParams, $translate) {
            console.log($stateParams.current);
            $scope.flag = 'cn';
            $scope.chnageEvent = function (flag) {
                $translate.use(flag);
            }
        }
    })
    // 过滤器功能的实现
    .state('filter', {
        url: '/filter',
        templateUrl: 'src/App/View/filter.html',
        params: {
            current: ''
        },
        controller: function ($scope, $stateParams) {
            console.log($stateParams.current);
            // 定义排序的数据
            $scope.info = [
                {name: 'zwx', age: 18},
                {name: 'gxx', age: 19},
                {name: 'wmh', age: 20},
                {name: 'dmy', age: 20},
                {name: 'zsw', age: 20},
                {name: 'heinan', age: 28}
            ]
            $scope.flag = true;
            // 点击进行排序
            $scope.click = function (it) {
                $scope.flag = !$scope.flag;
                $scope.inf = it;
            }
        }
    })
    // 根据参数动态请求数据并渲染页面
    .state('food', {
        url: '/food',
        templateUrl: 'src/App/View/food.html',
        params: {
            current: ''
        },
        controller: 'foodCtr'
    })
    .state('child', {
        url: '/child/:id',
        templateUrl: 'src/App/View/child.html',
        controller: function ($scope, $stateParams, ajaxService) {
            console.log($stateParams.id);
            ajaxService.ajax('http://localhost:8888/child/'+ $stateParams.id)
            .then(function (res) {
                $scope.data = res.data;
            }, function (err) {
                console.log(err);
            })
        }
    })
})
// 定义国际化数据
var cData = {
    "name": "最好吃的食物",
    "title": "餐厅 混搭主义",
    "address": "北京市朝阳区",
    "price": "人均120元"
};
var eData = {
    "name": "best food",
    "title": "fashion bar",
    "address": "parise",
    "price": "$20/one people"
}
// 配置国际化
// app.config(['$translateProvider', function ($translateProvider) {
//     $translateProvider.translations('en', eData);
//     $translateProvider.translations('cn', cData);
//     $translateProvider.preferedLanguage('cn');
// }])