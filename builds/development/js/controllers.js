(function() {
    'use strict';

    angular.module('dannylum')
        .controller('AppCtrl', ['$scope', '$http', '$location', '$timeout', '$mdSidenav', '$mdBottomSheet', function($scope, $http, $location, $timeout, $mdSidenav, $mdBottomSheet) {
            $scope.toggleNavigationMenu = function() {
                $mdSidenav('menu').toggle();
            };

            $scope.navToPage = function (page) {
                $location.path("/" + page);
            };

            $scope.showBottomSheet = function($event) {
                $scope.alert = '';
                $mdBottomSheet.show({
                    templateUrl: 'partials/bottom-sheet.html',
                    controller: 'BottomSheetCtrl',
                    targetEvent: $event
                }).then(function(clickedItem) {
                    $scope.alert = clickedItem.name + ' clicked!';
                });
            };
        }])
        .controller('MenuCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function () {
                $mdSidenav('menu').close()
                    .then(function () {
                        //$log.debug("close LEFT is done");
                    });
            };

            $scope.menuClick = function (page) {
                $scope.navToPage(page);
                $scope.close();
            };

            $scope.navToProject = function (id) {
                $scope.navToPage('project/' + id);
                $scope.close();
            };
        }])
        .controller('ProjectCtrl', ['$scope', '$location', '$routeParams', 'projectService', function($scope, $location, $routeParams, projectService) {
            projectService.getProjectById($routeParams.id).then(function (proj) {
                $scope.project = proj;
            });
        }])
        .controller('BottomSheetCtrl', ['$scope', '$mdBottomSheet', function($scope, $mdBottomSheet) {
            $scope.items = [
                { name: 'Hangout', icon: 'hangout' },
                { name: 'Mail', icon: 'mail' },
                { name: 'Message', icon: 'message' },
                { name: 'Copy', icon: 'copy' },
                { name: 'Facebook', icon: 'facebook' },
                { name: 'Twitter', icon: 'twitter' },
            ];
            $scope.listItemClick = function($index) {
                var clickedItem = $scope.items[$index];
                $mdBottomSheet.hide(clickedItem);
            };
        }]);
})();
