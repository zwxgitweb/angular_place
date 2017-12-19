app.controller('webCtr', function ($scope, $state) {
    // 设置浏览器的title
    $scope.title = 'Zwx Web';
    // 点击ionic返回图标,指定跳转路径
    $scope.backaAtivePage = function () {
        $state.go('active');
    }
    var footEle = document.querySelectorAll('.footer a');
    for (var i=0;i<footEle.length;i++) {
        console.log(i);
    }
})