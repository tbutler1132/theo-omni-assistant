import { Client } from "@notionhq/client";
import { config } from "dotenv";
config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await notion.databases.retrieve({
      database_id: id,
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
