(function() {
    'use strict';

    require('angular');
    require('angular-aria');
    require('angular-animate');
    require('angular-route');
    require('angular-material');
    require('jquery');

    angular.module('dannylum', ['ngRoute', 'ngMaterial', 'project'])
        .constant("projectListUrl", "js/data/projects.json")
        .constant("projectUrl", "js/data/projects/:id")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/resume", {
                    templateUrl: "views/resume.html"
                })
                .when("/contact", {
                    templateUrl: "views/contact.html"
                })
                .when("/project/:id", {
                    templateUrl: "views/project/index.html"
                })
                .otherwise({
                    templateUrl: "views/home.html"
                });
        })
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo', {
                    'default': '400',
                    'hue-1': '100',
                    'hue-2': '600',
                    'hue-3': 'A100'
                })
                .accentPalette('deep-purple', {
                    'default': '200'
                });
        }]);
})();
