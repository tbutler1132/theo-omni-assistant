const { Client } = require("@notionhq/client");
require("dotenv").config();

console.log("TOKEN", process.env.NOTION_TOKEN);

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

    console.log("Databases:", response.results[0].properties.Step.rich_text);
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

// getDB();

const getPage = async (page_id) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: page_id,
    });
    console.log(response.results); // This contains all the blocks (including inline tables)
  } catch (error) {
    console.error("Error retrieving blocks:", error);
  }
};

const getPageBlocks = async (pageId) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    return extractTextFromBlocks(response.results);
  } catch (error) {
    console.error("Error retrieving Notion page blocks:", error);
    return [];
  }
};

const extractTextFromBlocks = (blocks) => {
  console.log("Blocks", blocks);
  let text = "";

  blocks.forEach((block) => {
    if (block.type === "paragraph" && block.paragraph.text.length > 0) {
      text +=
        block.paragraph.text.map((item) => item.plain_text).join(" ") + "\n";
    }
    if (block.type === "heading_1" && block.heading_1.text.length > 0) {
      text +=
        block.heading_1.text.map((item) => item.plain_text).join(" ") + "\n";
    }
    if (block.type === "heading_2" && block.heading_2.text.length > 0) {
      text +=
        block.heading_2.text.map((item) => item.plain_text).join(" ") + "\n";
    }
    if (block.type === "heading_3" && block.heading_3.text.length > 0) {
      text +=
        block.heading_3.text.map((item) => item.plain_text).join(" ") + "\n";
    }
    if (
      block.type === "bulleted_list_item" &&
      block.bulleted_list_item.text.length > 0
    ) {
      text +=
        block.bulleted_list_item.text.map((item) => item.plain_text).join(" ") +
        "\n";
    }
    if (
      block.type === "numbered_list_item" &&
      block.numbered_list_item.text.length > 0
    ) {
      text +=
        block.numbered_list_item.text.map((item) => item.plain_text).join(" ") +
        "\n";
    }
    if (block.type === "quote" && block.quote.text.length > 0) {
      text += block.quote.text.map((item) => item.plain_text).join(" ") + "\n";
    }
  });

  return text;
};

getPageBlocks("1733fb9fe065808db716d21b495ec10c");
