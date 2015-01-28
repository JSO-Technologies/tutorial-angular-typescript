/// <reference path="../../definition/angularjs/angular.d.ts" />

module TaskListModule {
  'use strict';

  export class TasksList implements ng.IDirective {
    todoService:ToDoServiceModule.ToDoService;
    public controller: any;

    constructor(todoService:ToDoServiceModule.ToDoService) {
      this.todoService = todoService;

      this.controller = function() {
        this.toggleDone = (task:ToDoServiceModule.Task) => {
          todoService.toggleDone(task);
        }
      }
    }

    restrict = 'E';
    bindToController = true;
    templateUrl = 'views/tasks.html';
    controllerAs = 'taskCtrl';
    scope = {
      tasks : '='
    };
  }

  angular.module('tutorialAngularTypescriptApp')
    .directive('tasksList', (ToDoService:ToDoServiceModule.ToDoService) => {
      return new TasksList(ToDoService);
    });
}
