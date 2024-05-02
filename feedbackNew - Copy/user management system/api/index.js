import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import employeeRoutes from "./routes/employee.route.js";
import feedbackRoute from "./routes/feedback.route.js";
import cors from "cors"; // Import CORS middleware

dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const app = express();
const __dirname = path.resolve();

// Enable CORS for all origins
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client", "dist")));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use('/api/feedback', feedbackRoute);

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(3002, () => {
  console.log("Server listening on port 3000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error"; 
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
