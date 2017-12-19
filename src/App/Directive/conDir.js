app.directive('conDir', function () {
    return {
        restrict: 'AE',
        templateUrl: 'src/App/View/template/main.html',
        scope: {
            data: '=data'
        },
        controller: function ($scope) {

        }
    }
})