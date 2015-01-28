/// <reference path="../../../app/definition/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/todo/todo-service.ts" />

class LocalStorageMock {
  'use strict';

  _tasks: String;

  constructor(empty: Boolean) {
    this._tasks = empty ? undefined : JSON.stringify([new ToDoServiceModule.Task('toto', true)]);
  }

  getItem(key : String) {
    return key === 'tasks' ? this._tasks : undefined;
  }

  setItem(key: String, tasks: String) {
    if(key === 'tasks') {
      this._tasks = tasks;
    }
  }
}

describe('ToDoService', () => {
  'use strict';

  var windowMock;
  var service: ToDoServiceModule.ToDoService;

  describe('with empty localStorage', () => {
    beforeEach(() => {
      windowMock = {localStorage: new LocalStorageMock(true)};
      service = new ToDoServiceModule.ToDoService(windowMock);
    });

    it('should add new task in empty local storage', () => {
      //given

      //when
      service.create('tata');

      //then
      expect(windowMock.localStorage.getItem('tasks')).toEqual('[{"label":"tata","done":false}]');
    });

    it('should return empty array', () => {
      //given

      //when
      var tasks = service.tasks;

      //then
      expect(tasks.length).toBe(0);
    });
  });


  describe('with not empty localStorage', () => {
    beforeEach(() => {
      windowMock = {localStorage: new LocalStorageMock(false)};
      service = new ToDoServiceModule.ToDoService(windowMock);
    });

    it('should add new task in existing tasks in local storage', () => {
      //given

      //when
      service.create('tata');

      //then
      expect(windowMock.localStorage.getItem('tasks')).toEqual('[{"label":"toto","done":true},{"label":"tata","done":false}]');
    });

     it('should change done flag in existing tasks in local storage', () => {
      //given
      var task = service._tasks[0];

      //when
      service.toggleDone(task);

      //then
      expect(windowMock.localStorage.getItem('tasks')).toEqual('[{"label":"toto","done":false}]');
    });

    it('should return tasks from local storage', () => {
      //given

      //when
      var tasks = service.tasks;

      //then
      expect(tasks.length).toBe(1);
      expect(tasks[0].label).toBe('toto');
      expect(tasks[0].done).toBe(true);
    });
  });
});
