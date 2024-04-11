interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    readonly length: number;
    key(index: number): string | null;
}

declare var localStorage: Storage;

interface Todo {
    task: string;
    completed: boolean;
    priority: number;
    createdDate: Date; // Added createdDate property
}

class CustomTodoList {
    private todos: Todo[];

    constructor() {
        this.todos = [];
        this.loadCustomFromLocalStorage();
    }

    addCustomTodoTask(task: string, priority: number): boolean {
        if (!task || priority < 1 || priority > 3) {
            return false;
        }

        // Check if the task and priority already exist
        for (const todo of this.todos) {
            if (todo.task === task && todo.priority === priority) {
                return false; // Task already exists, return false
            }
        }

        const todo: Todo = { task, completed: false, priority, createdDate: new Date() }; // Added createdDate
        this.todos.push(todo);
        this.saveCustomToLocalStorage();
        return true;
    }

    editCustomTodoTask(taskIndex: number, task: string, priority: number): boolean {
        if (taskIndex < 0 || taskIndex >= this.todos.length || !task || priority < 1 || priority > 3) {
            return false;
        }

        const existingTodo = this.todos[taskIndex];
        existingTodo.task = task;
        existingTodo.priority = priority;
        this.saveCustomToLocalStorage();
        return true;
    }

    deleteCustomTodoTask(taskIndex: number): boolean {
        if (taskIndex < 0 || taskIndex >= this.todos.length) {
            return false;
        }

        this.todos.splice(taskIndex, 1);
        this.saveCustomToLocalStorage();
        return true;
    }

    markCustomTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveCustomToLocalStorage();
        }
    }

    deleteCompletedTodos(): void {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveCustomToLocalStorage();
    }

    getCustomTodos(): Todo[] {
        return this.todos;
    }

    saveCustomToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadCustomFromLocalStorage(): void {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }
}

const customTodoList = new CustomTodoList();

const customTodoForm = document.getElementById('todo-form') as HTMLFormElement;
const customTaskInput = document.getElementById('task') as HTMLInputElement;
const customPriorityInput = document.getElementById('priority') as HTMLInputElement;
const customTodoListContainer = document.getElementById('todo-list') as HTMLUListElement;
const customMarkCompletedButton = document.getElementById('mark-completed') as HTMLButtonElement;
const customDeleteCompletedButton = document.getElementById('delete-completed') as HTMLButtonElement;
const customErrorMessage = document.getElementById('error-message') as HTMLDivElement;

customTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = customTaskInput.value.trim();
    const priority = parseInt(customPriorityInput.value.trim());
    if (!task) {
        showCustomError('Task cannot be empty.');
    } else if (isNaN(priority) || priority < 1 || priority > 3) {
        showCustomError('Priority must be a number between 1 and 3.');
    } else {
        customTodoList.addCustomTodoTask(task, priority);
        renderCustomTodos();
        customTaskInput.value = '';
        customPriorityInput.value = '';
        showCustomError(''); // Clear error message
    }
});

customMarkCompletedButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const todoIndex = parseInt(checkbox.dataset.index!);
        customTodoList.markCustomTodoCompleted(todoIndex);
    });
    renderCustomTodos();
});

customDeleteCompletedButton.addEventListener('click', () => {
    customTodoList.deleteCompletedTodos();
    renderCustomTodos();
});

customTodoListContainer.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const todoItem = target.closest('li');
    if (!todoItem) return; // Exit if clicked outside a todo item
    const todoIndex = parseInt(todoItem.dataset.index!);
    
    // Edit todo task
    if (target.nodeName === 'SPAN') {
        const todo = customTodoList.getCustomTodos()[todoIndex];
        const newTask = prompt('Enter new task:', todo.task);
        const newPriority = parseInt(prompt('Enter new priority (1-3):', String(todo.priority)) || '0');
        if (newTask !== null && !isNaN(newPriority) && newPriority >= 1 && newPriority <= 3) {
            customTodoList.editCustomTodoTask(todoIndex, newTask, newPriority);
            renderCustomTodos();
        }
    } 
    // Delete todo task
    else if (target.nodeName === 'BUTTON') {
        if (confirm('Are you sure you want to delete this todo?')) {
            customTodoList.deleteCustomTodoTask(todoIndex);
            renderCustomTodos();
        }
    }
});

function renderCustomTodos() {
    customTodoListContainer.innerHTML = '';
    const todos = customTodoList.getCustomTodos();
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.dataset.index = String(index);
        todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
            <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.task} - Priority: ${todo.priority}</span>
            <button>Delete</button>
        `;
        customTodoListContainer.appendChild(todoItem);
    });
}

function showCustomError(message: string) {
    customErrorMessage.textContent = message;
}

renderCustomTodos();
