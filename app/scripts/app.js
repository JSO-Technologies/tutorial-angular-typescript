'use strict';

/**
 * @ngdoc overview
 * @name tutorialAngularTypescriptApp
 * @description
 * # tutorialAngularTypescriptApp
 *
 * Main module of the application.
 */
angular
  .module('tutorialAngularTypescriptApp', [
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/todo.html',
        controller: 'ToDoCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
