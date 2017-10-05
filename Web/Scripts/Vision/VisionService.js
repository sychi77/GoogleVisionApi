//Vision Service
(function () {
    "use strict";
    angular
        .module('mainApp')
        .service('visionService', visionService);
    visionService.$inject = ['$http', '$q'];

    function visionService($http, $q) {
        return {
            getKey: _getKey,
            //getImageAnalysis: _getImageAnalysis
        };
        function _getKey() {
            var settings = {
                url: "/api/vision/gckey",
                method: 'GET',
                cache: false,
                responseType: 'json',
                withCredentials: true
            };
            return $http(settings)
                .then(_complete, _fail);
        }
        //function _getImageAnalysis(key, data) {
        //    var settings = {
        //        url: /* Google API Call here */,
        //        method: 'GET',
        //        cache: false,
        //        responseType: 'json',
        //        withCredentials: true
        //    };
        //    return $http(settings)
        //        .then(_complete, _fail);
        //}
        function _complete(data) {
            return data;
        }
        function _fail(err) {
            return $q.reject(err);
        }
    }
})();