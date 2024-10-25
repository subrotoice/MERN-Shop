import dotenv from "dotenv";
import express from "express";
import connectDB from "./app/config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
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
app.use("/api/orders", orderRoutes);

// Connect to MongoDB
const connectionString = await connectDB();
console.log(connectionString);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
