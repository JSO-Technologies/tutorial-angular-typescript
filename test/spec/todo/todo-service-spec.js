/// <reference path="../../../app/definition/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/todo/todo-service.ts" />
var LocalStorageMock = (function () {
    function LocalStorageMock(empty) {
        this._tasks = empty ? undefined : JSON.stringify([new ToDoServiceModule.Task('toto', true)]);
    }
    LocalStorageMock.prototype.getItem = function (key) {
        return key === 'tasks' ? this._tasks : undefined;
    };
    LocalStorageMock.prototype.setItem = function (key, tasks) {
        if (key === 'tasks') {
            this._tasks = tasks;
        }
    };
    return LocalStorageMock;
})();
describe('ToDoService', function () {
    'use strict';
    var windowMock;
    var service;
    describe('with empty localStorage', function () {
        beforeEach(function () {
            windowMock = { localStorage: new LocalStorageMock(true) };
            service = new ToDoServiceModule.ToDoService(windowMock);
        });
        it('should add new task in empty local storage', function () {
            //given
            //when
            service.create('tata');
            //then
            expect(windowMock.localStorage.getItem('tasks')).toEqual('[{"label":"tata","done":false}]');
        });
        it('should return empty array', function () {
            //given
            //when
            var tasks = service.tasks;
            //then
            expect(tasks.length).toBe(0);
        });
    });
    describe('with not empty localStorage', function () {
        beforeEach(function () {
            windowMock = { localStorage: new LocalStorageMock(false) };
            service = new ToDoServiceModule.ToDoService(windowMock);
        });
        it('should add new task in existing tasks in local storage', function () {
            //given
            //when
            service.create('tata');
            //then
            expect(windowMock.localStorage.getItem('tasks')).toEqual('[{"label":"toto","done":true},{"label":"tata","done":false}]');
        });
        it('should change done flag in existing tasks in local storage', function () {
            //given
            var task = service._tasks[0];
            //when
            service.toggleDone(task);
            //then
            expect(windowMock.localStorage.getItem('tasks')).toEqual('[{"label":"toto","done":false}]');
        });
        it('should return tasks from local storage', function () {
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
