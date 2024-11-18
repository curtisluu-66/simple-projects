const readline = require("readline");

// Initialize readline interface for interactive mode
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "github-activity-cli> ",
});

// Fetch user's recent activities, base on username.
async function fetchUserRecentActivities(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/events`,
    {
      headers: {
        "User-Agent": "node.js",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found. Please check the username.");
    } else {
      throw new Error(`Error fetching data: ${response.status}`);
    }
  }

  return response.json();
}

// Function to display activity. Credit: Not me
function displayActivity(events) {
  if (events.length === 0) {
    console.log("No recent activity found.");
    return;
  }

  events.forEach((event) => {
    let action;
    switch (event.type) {
      case "PushEvent":
        const commitCount = event.payload.commits.length;
        action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
        break;
      case "IssuesEvent":
        action = `${
          event.payload.action.charAt(0).toUpperCase() +
          event.payload.action.slice(1)
        } an issue in ${event.repo.name}`;
        break;
      case "WatchEvent":
        action = `Starred ${event.repo.name}`;
        break;
      case "ForkEvent":
        action = `Forked ${event.repo.name}`;
        break;
      case "CreateEvent":
        action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
        break;
      default:
        action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
        break;
    }
    console.log(`- ${action}`);
  });
}

// Command processor
async function processCommand(input) {
  const [username, ...args] = input.trim().split(" ");

  switch (username) {
    case "exit":
      console.log("Exiting task-cli...");
      rl.close();
      break;

    case "":
      console.log(`Unknown command: ${username}`);
      console.log(`Available commands:
            <username>: Fetch all <username>'s activity
            exit`);
      break;

    default:
      try {
        const events = await fetchUserRecentActivities(username); // Await the async function
        displayActivity(events);
      } catch (error) {
        console.error("Error:", error);
      }
      break;
  }
}

// Start interactive prompt
console.log(
  'Welcome to task-cli! Type a command to get started, or "exit" to quit.'
);
rl.prompt();

// Listen for input and process commands
rl.on("line", async (input) => {
  await processCommand(input); // Call the async function
  rl.prompt();
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
