import express from "express";
import { getDatabase } from "../controllers/notion.js";

const router = express.Router();

router.get("/database/:id", getDatabase);

export default router;
