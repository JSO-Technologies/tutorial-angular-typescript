/// <reference path="../../definition/angularjs/angular.d.ts" />
var TaskListModule;
(function (TaskListModule) {
    'use strict';
    var TasksList = (function () {
        function TasksList(todoService) {
            this.restrict = 'E';
            this.bindToController = true;
            this.templateUrl = 'views/tasks.html';
            this.controllerAs = 'taskCtrl';
            this.scope = {
                tasks: '='
            };
            this.todoService = todoService;
            this.controller = function () {
                this.toggleDone = function (task) {
                    todoService.toggleDone(task);
                };
            };
        }
        return TasksList;
    })();
    TaskListModule.TasksList = TasksList;
    angular.module('tutorialAngularTypescriptApp').directive('tasksList', function (ToDoService) {
        return new TasksList(ToDoService);
    });
})(TaskListModule || (TaskListModule = {}));
