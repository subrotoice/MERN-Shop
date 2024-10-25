import express from "express";
import { createReview } from "../app/controllers/reviewController.js";

const router = express.Router();

// Router making connection between route and controller
router.post("/", createReview);

export default router;
