// server/routes/userRoutes.js
import express from "express";
import {
  registerOrUpdateUser,
  getAllUsers,
} from "../app/controllers/userController.js";
import verifyToken from "../app/middlewares/verifyToken.js";

const router = express.Router();

// Route to register or update user after Firebase authentication
router.post("/register", verifyToken, registerOrUpdateUser);

// Route to get all users (admin-only route)
router.get("/all", verifyToken, getAllUsers);

export default router;
