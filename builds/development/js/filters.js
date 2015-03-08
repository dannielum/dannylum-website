(function () {
    "use strict";

    angular.module('dannylum')
        .filter('trustedUrl', ['$sce', function ($sce) {
            return function (url) {
                return $sce.trustAsResourceUrl(url);
            };
        }]);
})();
