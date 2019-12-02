app.service('dataService', function ($http, $q) {
    const REST_SERVICE_URI = 'localhost:3000/api/v1/';
    let ds = {
        getData: getData,
        postData: postData,
        putData: putData,
        deleteData: deleteData,
        getAll: getAll,
        getByID: getByID,
        loadGridData: loadGridData,
        loadGridDataPage: loadGridDataPage,
        loadComboData: loadComboData,
        // loadChildComboData: loadChildComboData,
    };

    return ds;

    function getData(endPoint, page, size, extra) {
        let deferred = $q.defer();
        let url = REST_SERVICE_URI + endPoint;
        if (endPoint.includes('?')) {
            url += "&"
        }
        else {
            url += "?"
        }
        url = url + 'page=' + page + '&size=' + size;
        if (extra) {
            url = url + extra;
        }

        $http.get(url).then(
            function (response) {
                deferred.resolve(response.data);
            }, function (errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    };

    function postData(endPoint, model) {
        let deferred = $q.defer();
        let url = REST_SERVICE_URI + endPoint;
        $http.post(url, model).then(
            function (response) {
                deferred.resolve(response.data);
            }, function (errResponse) {
                console.error(errResponse);

                deferred.reject(errResponse);
            });
        return deferred.promise;
    };

    function putData(endPoint, model) {
        let deferred = $q.defer();
        let url = REST_SERVICE_URI + endPoint;
        $http.put(url, model).then(
            function (response) {
                deferred.resolve(response.data);
            }, function (errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    };

    function deleteData(endPoint, key) {
        let deferred = $q.defer();
        let url = REST_SERVICE_URI + endPoint;
        $http({
            method: 'DELETE',
            url: url,
            data: key,
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        }).then(
            function (response) {
                deferred.resolve(response.data);
            }, function (errResponse) {
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    };

    function getAll() {
        return 'getAll function called...';
    };
    function getByID() {
        return 'getByID function called...';
    };
    function loadGridData() {
        return 'deleteData function called...';
    };
    function loadGridDataPage() {
        return 'getAll function called...';
    };
    function loadComboData() {
        return 'getByID function called...';
    };
});