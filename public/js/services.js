(function () {
    "use strict";

    angular.module('dannylum')
        .factory('cachingService', ['$http', '$q', '$cacheFactory', function($http, $q, $cacheFactory) {
            var self = this;
            var cacheData = {};

            var getCacheKey = function (path, requestPostData) {
                return path + (requestPostData ? JSON.stringify(requestPostData) : '');
            };

            var requestData = function (cacheId, path, requestPostData) {
                if (!cacheData[cacheId]) {
                    cacheData[cacheId] = $cacheFactory(cacheId, { capacity: 200 });
                }

                var returnData = self.getCache(cacheId, path, requestPostData);
                var deffered = $q.defer();
                if (returnData) {
                    deffered.resolve(angular.copy(returnData));
                }
                else {
                    var promise = null;
                    if (!requestPostData) {
                        promise = $http.get(path);
                    }
                    else {
                        promise = $http.post(path, requestPostData);
                    }
                    promise.then(
                        function (result) {
                            self.putCache(cacheId, path, result.data, requestPostData);
                            deffered.resolve(angular.copy(result.data));
                        }, function (error) {
                            deffered.reject(error);
                        }
                    );
                }
                return deffered.promise;
            };

            self = {
                getCache: function (cacheId, path, requestPostData) {
                    return cacheData[cacheId].get(getCacheKey(path, requestPostData));
                },
                putCache: function (cacheId, path, value, requestPostData) {
                    return cacheData[cacheId].put(getCacheKey(path, requestPostData), value);
                },
                getData: function (cacheId, path) {
                    return requestData(cacheId, path, null);
                },
                postData: function (cacheId, path, requestPostData) {
                    return requestData(cacheId, path, requestPostData);
                }
            };

            return self;
        }]);
})();
