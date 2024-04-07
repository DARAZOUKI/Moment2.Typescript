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
        const todo: Todo = { task, completed: false, priority };
        this.todos.push(todo);
        this.saveCustomToLocalStorage();
        return true;
    }

    markCustomTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveCustomToLocalStorage();
        }
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

function renderCustomTodos() {
    customTodoListContainer.innerHTML = '';
    const todos = customTodoList.getCustomTodos();
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
            <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.task} - Priority: ${todo.priority}</span>
        `;
        customTodoListContainer.appendChild(todoItem);
    });
}

function showCustomError(message: string) {
    customErrorMessage.textContent = message;
}

renderCustomTodos();
