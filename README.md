# Task Tracker CLI

## Source
This project is part of roadmap.sh backend projects
<a href="https://roadmap.sh/projects/task-tracker">https://roadmap.sh/projects/task-tracker</a>

## Overview
Task Tracker is a command-line interface (CLI) application designed to help you track and manage your tasks efficiently. This project allows you to add, update, delete, and organize tasks based on their status (todo, in-progress, done). It is built using [Your Programming Language] and stores task data in a JSON file.

## Features
- **Add Tasks:** Create new tasks with descriptions.
- **Update Tasks:** Modify existing tasks.
- **Delete Tasks:** Remove tasks from the list.
- **Mark Tasks:** Change the status of tasks to in-progress or done.
- **List Tasks:** View all tasks or filter them by status (done, todo, in-progress).

## Task Properties
Each task includes the following properties:
- `id`: A unique identifier for the task.
- `description`: A brief description of the task.
- `status`: The current status of the task (`todo`, `in-progress`, `done`).
- `createdAt`: Timestamp of when the task was created.
- `updatedAt`: Timestamp of when the task was last updated.

## Getting Started

### Prerequisites
- [Your Programming Language] installed on your machine.
- A code editor or IDE (e.g., VSCode, PyCharm).

### Project Initialization
1. Clone this repository or create a new project directory for your Task Tracker CLI.
2. Initialize a version control system (e.g., Git) to manage your project.

### Running the Application
1. Open your terminal or command prompt.
2. Navigate to the project directory.
3. Run the application using the following command format:

   ```bash
   node app.js
   ```