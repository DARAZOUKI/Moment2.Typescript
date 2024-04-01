var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.loadFromLocalStorage();
    }
    TodoList.prototype.addTodo = function (task, priority) {
        if (!task || priority < 1 || priority > 3) {
            return false;
        }
        var todo = {
            task: task,
            completed: false,
            priority: priority,
            createdAt: new Date()
        };
        this.todos.push(todo);
        this.saveToLocalStorage();
        return true;
    };
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    };
    TodoList.prototype.deleteTodo = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos.splice(todoIndex, 1);
            this.saveToLocalStorage();
        }
    };
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    };
    TodoList.prototype.loadFromLocalStorage = function () {
        var storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    };
    return TodoList;
}());
// Usage example
var todoList = new TodoList();
todoList.addTodo('Buy groceries', 1);
todoList.addTodo('Finish homework', 2);
console.log(todoList.getTodos());
