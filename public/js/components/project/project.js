(function () {
    "use strict";

    angular.module("project", [])
        .factory("projectService", ['$http', '$q', 'projectListUrl', 'projectUrl', 'cachingService', function ($http, $q, projectListUrl, projectUrl, cachingService) {
            return {
                getProjects: function () {
                    return cachingService.getData('project', projectListUrl);
                },
                getProjectById: function (id) {
                    // to do: convert to $resource
                    return cachingService.getData('project', projectUrl.replace(':id', id + '.json'));
                }
            };
        }])
        .directive("projectMenu", ['projectService', function (project) {
            return {
                restrict: "E",
                templateUrl: "js/components/project/project-menu.template.html",
                link: function ($scope) {
                    project.getProjects().then(function (data) {
                        $scope.projects = data.projects;
                    });
                }
            };
        }]
    );
})();
