app.factory('ajaxService', function ($http, $q) {
    return {
        ajax: function (url, type, data) {
            var d = $q.defer();
            var type = type ? type : 'GET';
            var data = data ? data : '';
            $http({
                url: url,
                type: type,
                data: data
            })
            .then(function (res) {
                d.resolve(res);
            }, function (err) {
                d.reject(err);
            });
            return d.promise;
        }
    }
})