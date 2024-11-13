Task CLI
Task CLI is a simple command-line application to manage tasks with statuses such as "todo," "in-progress," and "done." The application supports adding, updating, deleting, and listing tasks, with color-coded status indicators for easy viewing.

Features
Add, update, delete, and list tasks
Mark tasks as "in-progress" or "done"
Filter tasks by status
Colored status indicators (blue for "todo," yellow for "in-progress," green for "done")
Setup & Installation
Prerequisites
Node.js (version 14 or later)
NPM (usually included with Node.js)
Installation
Clone the repository:

Install dependencies:
Although the application doesn’t have external dependencies, ensure all necessary modules are in place:

bash
Copy code
npm install
Make the script executable (for Unix-based systems):

bash
Copy code
chmod +x task-cli.js
Run the CLI:

bash
Copy code
node task-cli.js
(Optional) Set up a global alias (for easier access):

For Unix-based systems, create a symlink:

bash
Copy code
sudo ln -s $(pwd)/task-cli.js /usr/local/bin/task-cli
Now, you can run the CLI globally with:

bash
Copy code
task-cli
Usage
Run task-cli with the following commands:

Add a task:

bash
Copy code
task-cli add "Buy groceries"
Update a task:

bash
Copy code
task-cli update <id> "New description"
Delete a task:

bash
Copy code
task-cli delete <id>
Mark task as in-progress:

bash
Copy code
task-cli mark-in-progress <id>
Mark task as done:

bash
Copy code
task-cli mark-done <id>
List all tasks:

bash
Copy code
task-cli list
List tasks by status:

bash
Copy code
task-cli list todo
task-cli list in-progress
task-cli list done
Task Model
Each task includes the following fields:

ID: Unique identifier for the task
Description: Details of the task
Status: Current status (todo, inProgress, done)
CreatedAt: Timestamp when the task was created
UpdatedAt: Timestamp when the task was last updated
Example
bash
Copy code
$ task-cli add "Buy groceries"
Task added successfully (ID: 1)

$ task-cli list
[ID: 1] Buy groceries - todo
Created At: 2024-11-13T10:00:00Z
Updated At: 2024-11-13T10:00:00Z

$ task-cli mark-in-progress 1
Task marked as in-progress (ID: 1)

$ task-cli list
[ID: 1] Buy groceries - in-progress
Created At: 2024-11-13T10:00:00Z
Updated At: 2024-11-13T10:05:00Z
License
This project is licensed under the MIT License.
