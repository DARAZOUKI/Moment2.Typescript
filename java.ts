interface Todo {
    task: string;
    completed: boolean;
    priority: number;
    createdAt: Date;
}

class TodoList {
    private todos: Todo[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    addTodo(task: string, priority: number): boolean {
        if (!task || priority < 1 || priority > 3) {
            return false;
        }

        const todo: Todo = {
            task,
            completed: false,
            priority,
            createdAt: new Date()
        };

        this.todos.push(todo);
        this.saveToLocalStorage();
        return true;
    }

    markTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    }

    deleteTodo(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos.splice(todoIndex, 1);
            this.saveToLocalStorage();
        }
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    private saveToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    private loadFromLocalStorage(): void {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }
}

// Usage example
const todoList = new TodoList();
todoList.addTodo('Buy groceries', 1);
todoList.addTodo('Finish homework', 2);
console.log(todoList.getTodos());
