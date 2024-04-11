var CustomTodoList = /** @class */ (function () {
    function CustomTodoList() {
        this.todos = [];
        this.loadCustomFromLocalStorage();
    }
    CustomTodoList.prototype.addCustomTodoTask = function (task, priority) {
        if (!task || priority < 1 || priority > 3) {
            return false;
        }
        // Check if the task and priority are already exists
        for (var _i = 0, _a = this.todos; _i < _a.length; _i++) {
            var todo_1 = _a[_i];
            if (todo_1.task === task && todo_1.priority === priority) {
                return false; // Task already exists, return false
            }
        }
        var todo = { task: task, completed: false, priority: priority };
        this.todos.push(todo);
        this.saveCustomToLocalStorage();
        return true;
    };
    CustomTodoList.prototype.markCustomTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveCustomToLocalStorage();
        }
    };
    CustomTodoList.prototype.deleteCompletedTodos = function () {
        this.todos = this.todos.filter(function (todo) { return !todo.completed; });
        this.saveCustomToLocalStorage();
    };
    CustomTodoList.prototype.getCustomTodos = function () {
        return this.todos;
    };
    CustomTodoList.prototype.saveCustomToLocalStorage = function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    };
    CustomTodoList.prototype.loadCustomFromLocalStorage = function () {
        var storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    };
    return CustomTodoList;
}());
var customTodoList = new CustomTodoList();
var customTodoForm = document.getElementById('todo-form');
var customTaskInput = document.getElementById('task');
var customPriorityInput = document.getElementById('priority');
var customTodoListContainer = document.getElementById('todo-list');
var customMarkCompletedButton = document.getElementById('mark-completed');
var customDeleteCompletedButton = document.getElementById('delete-completed');
var customErrorMessage = document.getElementById('error-message');
customTodoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var task = customTaskInput.value.trim();
    var priority = parseInt(customPriorityInput.value.trim());
    if (!task) {
        showCustomError('Task cannot be empty.');
    }
    else if (isNaN(priority) || priority < 1 || priority > 3) {
        showCustomError('Priority must be a number between 1 and 3.');
    }
    else {
        customTodoList.addCustomTodoTask(task, priority);
        renderCustomTodos();
        customTaskInput.value = '';
        customPriorityInput.value = '';
        showCustomError(''); // Clear error message
    }
});
customMarkCompletedButton.addEventListener('click', function () {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
        var todoIndex = parseInt(checkbox.dataset.index);
        customTodoList.markCustomTodoCompleted(todoIndex);
    });
    renderCustomTodos();
});
customDeleteCompletedButton.addEventListener('click', function () {
    customTodoList.deleteCompletedTodos();
    renderCustomTodos();
});
function renderCustomTodos() {
    customTodoListContainer.innerHTML = '';
    var todos = customTodoList.getCustomTodos();
    todos.forEach(function (todo, index) {
        var todoItem = document.createElement('li');
        todoItem.innerHTML = "\n            <input type=\"checkbox\" ".concat(todo.completed ? 'checked' : '', " data-index=\"").concat(index, "\">\n            <span style=\"text-decoration: ").concat(todo.completed ? 'line-through' : 'none', "\">").concat(todo.task, " - Priority: ").concat(todo.priority, "</span>\n        ");
        customTodoListContainer.appendChild(todoItem);
    });
}
function showCustomError(message) {
    customErrorMessage.textContent = message;
}
renderCustomTodos();
