# Task CLI

**Task CLI** is a simple command-line application to manage tasks with statuses such as "todo," "in-progress," and "done." The application supports adding, updating, deleting, and listing tasks, with color-coded status indicators for easy viewing.

## Features

- Add, update, delete, and list tasks
- Mark tasks as "in-progress" or "done"
- Filter tasks by status
- Colored status indicators (blue for "todo," yellow for "in-progress," green for "done")

## Setup & Installation

### Prerequisites

- **Node.js** (version 14 or later)
- **NPM** (usually included with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/curtisluu-66/simple-projects.git
   cd task-cli
   ```

2. **Install dependencies**:

   Although the application doesn’t have external dependencies, ensure all necessary modules are in place:

   ```bash
   npm install
   ```

3. **Make the script executable** (for Unix-based systems):

   ```bash
   chmod +x task-cli.js
   ```

4. **Run the CLI**:

   ```bash
   node task-cli.js
   ```

5. **(Optional) Set up a global alias** (for easier access):

   - For Unix-based systems, create a symlink:

     ```bash
     sudo ln -s $(pwd)/task-cli.js /usr/local/bin/task-cli
     ```

   - Now, you can run the CLI globally with:

     ```bash
     task-cli
     ```

### Usage

Run `task-cli` with the following commands:

- **Add a task**:
  ```bash
  task-cli add "Buy groceries"
  ```
