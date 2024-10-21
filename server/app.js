import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./app/config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Form encoded data as body

// Start the server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("On Home Page");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Connect to MongoDB
const connectionString = await connectDB();
console.log(connectionString);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
