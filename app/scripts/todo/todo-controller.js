/// <reference path="../../definition/angularjs/angular.d.ts" />
var ToDoControllerModule;
(function (ToDoControllerModule) {
    'use strict';
    var ToDoCtrl = (function () {
        function ToDoCtrl(todoService) {
            this.todoService = todoService;
        }
        ToDoCtrl.prototype.create = function () {
            this.todoService.create(this.taskLabel);
            this.taskLabel = '';
        };
        ToDoCtrl.prototype.getTasks = function () {
            return this.todoService.tasks;
        };
        ToDoCtrl.$inject = ['ToDoService'];
        return ToDoCtrl;
    })();
    angular.module('tutorialAngularTypescriptApp').controller('ToDoCtrl', ToDoCtrl);
})(ToDoControllerModule || (ToDoControllerModule = {}));
