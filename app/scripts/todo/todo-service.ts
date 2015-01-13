/// <reference path="../../definition/angularjs/angular.d.ts" />

module ToDoServiceModule {
  'use strict';

  class Task {
    constructor(public label: String, public done: Boolean) {}
  }

  class ToDoService {
    _tasks: Task[];

    static $inject = ['$window']
    constructor(public $window) {
      var strTasks = this.$window.localStorage.getItem('tasks');
      this._tasks = strTasks ? JSON.parse(strTasks) : [];
    }

    create(label: String) {
      this._tasks.push(new Task(label, false));
      this.save();
    }

    toggleDone(task: Task) {
      task.done = !task.done;
      this.save();
    }

    save() {
      this.$window.localStorage.setItem('tasks', JSON.stringify(this._tasks));
    }

    get tasks(): Task[] {
      return this._tasks;
    }
  }

  angular.module('tutorialAngularTypescriptApp')
    .service('ToDoService', ToDoService);

}
