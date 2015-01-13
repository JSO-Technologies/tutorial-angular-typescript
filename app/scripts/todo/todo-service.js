/// <reference path="../../definition/angularjs/angular.d.ts" />
var ToDoServiceModule;
(function (ToDoServiceModule) {
    'use strict';
    var Task = (function () {
        function Task(label, done) {
            this.label = label;
            this.done = done;
        }
        return Task;
    })();
    var ToDoService = (function () {
        function ToDoService($window) {
            this.$window = $window;
            var strTasks = this.$window.localStorage.getItem('tasks');
            this._tasks = strTasks ? JSON.parse(strTasks) : [];
        }
        ToDoService.prototype.create = function (label) {
            this._tasks.push(new Task(label, false));
            this.save();
        };
        ToDoService.prototype.toggleDone = function (task) {
            task.done = !task.done;
            this.save();
        };
        ToDoService.prototype.save = function () {
            this.$window.localStorage.setItem('tasks', JSON.stringify(this._tasks));
        };
        Object.defineProperty(ToDoService.prototype, "tasks", {
            get: function () {
                return this._tasks;
            },
            enumerable: true,
            configurable: true
        });
        ToDoService.$inject = ['$window'];
        return ToDoService;
    })();
    angular.module('tutorialAngularTypescriptApp').service('ToDoService', ToDoService);
})(ToDoServiceModule || (ToDoServiceModule = {}));
