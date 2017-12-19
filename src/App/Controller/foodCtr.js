app.controller('foodCtr', ['$scope', '$stateParams', 'ajaxService', function ($scope, $stateParams,  ajaxService) {
    console.log($stateParams.current);
    ajaxService.ajax('http://localhost:8888/food')
    .then(function (res) {
        $scope.data = res.data;
    }, function (err) {
        console.log(err);
    })
}])