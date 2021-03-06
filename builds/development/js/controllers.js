(function() {
    'use strict';

    angular.module('dannylum')
        .controller('AppCtrl', ['$scope', '$http', '$location', '$timeout', '$mdSidenav', '$mdBottomSheet', function($scope, $http, $location, $timeout, $mdSidenav, $mdBottomSheet) {
            $scope.programmerMode = false;

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
        .controller('ContactCtrl', ['$scope', function($scope) {
            $scope.contact = {
                subject: '',
                email: '',
                content: ''
            };
        }])
        .controller('BottomSheetCtrl', ['$scope', '$window', '$location', '$mdBottomSheet', function($scope, $window, $location, $mdBottomSheet) {
            $scope.items = [
                {
                    name: 'LinkedIn',
                    icon: 'linkedin-square',
                    url:  {
                        link: 'http://www.linkedin.com/in/dannylum',
                        type: 'external'
                    }
                },
                {
                    name: 'Mail',
                    icon: 'envelope-o',
                    url: {
                        link: '/contact',
                        type: 'internal'
                    }
                },
                {
                    name: 'Github',
                    icon: 'github',
                    url: {
                        link: 'http://www.github.com/dannielum',
                        type: 'external'
                    }
                }
            ];
            $scope.listItemClick = function(item) {
                if (item.url.type === 'external')
                    $window.open(item.url.link, '_blank');
                else
                    $location.path(item.url.link);
                $mdBottomSheet.hide(item);
            };
        }]);
})();
