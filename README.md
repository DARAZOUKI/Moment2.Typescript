# To-do Application with TypeScript

This project implements a to-do application using TypeScript, incorporating a user interface for adding, completing, and managing tasks. It also utilizes LocalStorage to persist tasks between sessions.

## How the Solution is Constructed

### Step 1: Todo Interface
- Defined a TypeScript interface `Todo` with properties `task`, `completed`, and `priority` to represent a to-do task.

### Step 2: CustomTodoList Class Implementation
- Implemented a TypeScript class `CustomTodoList` to manage the to-do tasks.
- Included methods for adding tasks, marking tasks as completed, and retrieving tasks.
- Utilized LocalStorage to save and load tasks between sessions.
- Created constructor to initialize the `todos` array and load tasks from LocalStorage when creating a new `CustomTodoList` object.

 ### Step 3: Creating a Website
- Designed an HTML website with a form for adding new to-do tasks, an area to display tasks, and a button to mark tasks as completed.
- A script tag linking to the JavaScript file (java.js) containing the TypeScript functionality for managing task operations.

### Step 4: Extending Functionality
- Implemented additional features such as error handling for invalid inputs and rendering tasks dynamically.
