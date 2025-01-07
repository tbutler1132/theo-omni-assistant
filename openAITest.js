const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_TOKEN,
});

const getDB = async () => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: "How are you today?" }],
      model: "gpt-4o",
    });

    console.log("Databases:", chatCompletion.choices[0].message);
  } catch (error) {
    console.log("ERROR", error);
  }
};

getDB();
