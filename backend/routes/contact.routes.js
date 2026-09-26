import { Router } from "express";
import { createContactMessage } from "../controllers/contact.controller.js";

const router = Router();

// POST /api/contact
router.post("/", createContactMessage);

export default router;