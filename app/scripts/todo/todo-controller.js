/// <reference path="../../definition/angularjs/angular.d.ts" />
'use strict';
var ToDoCtrl = (function () {
    function ToDoCtrl(todoService) {
        this.todoService = todoService;
    }
    ToDoCtrl.prototype.create = function () {
        this.todoService.create(this.taskLabel);
        this.taskLabel = '';
    };
    ToDoCtrl.prototype.toggleDone = function (task) {
        this.todoService.toggleDone(task);
    };
    ToDoCtrl.prototype.getTasks = function () {
        return this.todoService.tasks;
    };
    ToDoCtrl.$inject = ['ToDoService'];
    return ToDoCtrl;
})();
angular.module('tutorialAngularTypescriptApp').controller('ToDoCtrl', ToDoCtrl);
