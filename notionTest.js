import Client from "@notionhq/client";
import { config } from "dotenv";
config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_TASK_DB_ID;

const getDB = async (id) => {
  try {
    const response = await notion.databases.retrieve({
      database_id: id,
    });

    console.log("Databases:", response);
  } catch (error) {
    console.log("ERROR", error);
  }
};

const queryDB = async (id) => {
  try {
    const response = await notion.databases.query({
      database_id: id,
    });

    console.log(
      "Databases:",
      response.results.map((r) => r.properties.Summary.rich_text[0].text)
    );
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
// addTaskToDatabase("Finish music track", "2025-01-15");

// queryDB("1743fb9fe065801988eeda65d6972b45");
