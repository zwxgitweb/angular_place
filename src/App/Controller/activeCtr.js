app.controller('activeCtr', ['$scope', '$stateParams', 'ajaxService', function ($scope, $stateParams, ajaxService) {
    // 接收路由参数值
    console.log($stateParams);
    // 定义nav数据
    $scope.navs = [
        {"title" : "main", active: false},
        {"title" : "icon", active: false},
        {"title" : "shop", active: false},
        {"title" : "place", active: false}
    ]
    // 切换请求数据
    $scope.change = function (url) {
        ajaxService.ajax('http://localhost:8888/' + url)
        .then(function (res) {
            $scope.data = res.data;
        }, function (err) {
            console.log(err);
        })
    }
    $scope.change('main');
}])