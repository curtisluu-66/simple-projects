const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.join(__dirname, "tasks.json");

// Task statuses with colors (using simple ASCII color codes)
const STATUS_COLORS = {
  todo: "\x1b[34m", // Blue
  inProgress: "\x1b[33m", // Yellow
  done: "\x1b[32m", // Green
  reset: "\x1b[0m", // Reset color
};

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
}

function loadTasks() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }
  return [];
}

// Add a new task
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    description,
    status: "To Do",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Update an existing task
function updateTask(id, newDescription) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task updated successfully (ID: ${task.id})`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

// Delete a task
function deleteTask(id) {
  let tasks = loadTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    console.log(`Task deleted successfully (ID: ${id})`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

// Mark task as in progress or done
function markTaskStatus(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = status;
    saveTasks(tasks);
    console.log(`Task marked as ${status.replace("-", " ")} (ID: ${task.id})`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

// List tasks with optional status filter
function listTasks(status = null) {
  const tasks = loadTasks();
  const filteredTasks = status
    ? tasks.filter((t) => t.status === status)
    : tasks;
  if (filteredTasks.length === 0) {
    console.log(`No tasks found${status ? ` with status "${status}"` : ""}.`);
  } else {
    filteredTasks.forEach((task) => {
      const color = STATUS_COLORS[task.status] || STATUS_COLORS.reset;
      console.log(
        `${color}[ID: ${task.id}] ${task.description} - ${task.status}${STATUS_COLORS.reset}`
      );
    });
  }
}

// Initialize readline interface for interactive mode
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "task-cli> ",
});

// Command processor
function processCommand(input) {
  const [command, ...args] = input.trim().split(" ");

  switch (command) {
    case "add":
      const description = args.join(" ");
      if (description) addTask(description);
      else console.log("Error: Task description is required for 'add'");
      break;

    case "update":
      const [updateId, ...updateDescParts] = args;
      if (updateId && updateDescParts.length) {
        updateTask(parseInt(updateId), updateDescParts.join(" "));
      } else {
        console.log(
          "Error: Task ID and new description are required for 'update'"
        );
      }
      break;

    case "delete":
      const deleteId = parseInt(args[0]);
      if (deleteId) deleteTask(deleteId);
      else console.log("Error: Task ID is required for 'delete'");
      break;

    case "mark-in-progress":
      const inProgressId = parseInt(args[0]);
      if (inProgressId) markTaskStatus(inProgressId, "In Progress");
      else console.log("Error: Task ID is required for 'mark-in-progress'");
      break;

    case "mark-done":
      const doneId = parseInt(args[0]);
      if (doneId) markTaskStatus(doneId, "Done");
      else console.log("Error: Task ID is required for 'mark-done'");
      break;

    case "list":
      const status = args[0];
      if (!status || ["todo", "inProgress", "done"].includes(status)) {
        listTasks(status);
      } else {
        console.log(
          "Error: Invalid status for 'list'. Use 'todo', 'inProgress', or 'done'."
        );
      }
      break;

    case "exit":
      console.log("Exiting task-cli...");
      rl.close();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      console.log(`Available commands:
          add "description"
          update <id> "new description"
          delete <id>
          mark-in-progress <id>
          mark-done <id>
          list [status]
          exit`);
  }
}

// Start interactive prompt
console.log(
  'Welcome to task-cli! Type a command to get started, or "exit" to quit.'
);
rl.prompt();

// Listen for input and process commands
rl.on("line", (input) => {
  processCommand(input);
  rl.prompt();
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
