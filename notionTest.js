const { Client } = require("@notionhq/client");
require("dotenv").config();

console.log("TOKEN", process.env.NOTION_TOKEN);

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_TASK_DB_ID;

const getDB = async () => {
  try {
    const response = await notion.databases.retrieve({
      database_id,
    });

    console.log("Databases:", response);
  } catch (error) {
    console.log("ERROR", error);
  }
};

// Function to add a task
const addTaskToDatabase = async (taskName, dueDate) => {
  try {
    // Create a new page in the task database
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "Task name": {
          title: [
            {
              text: {
                content: taskName,
              },
            },
          ],
        },
        Due: {
          date: {
            start: dueDate, // Format: 'YYYY-MM-DD'
          },
        },
        // Add other properties as necessary (e.g., status, priority)
      },
    });

    console.log("Task added:", response);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Example usage: Add a task with a name and due date
addTaskToDatabase("Finish music track", "2025-01-15");

// getDB();
