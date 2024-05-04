import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import employeeRoutes from "./routes/employee.route.js";
import supplierRoutes from "./routes/supplier.route.js";
import cors from "cors";
//dinuri
import feedbackRoute from "./routes/feedback.route.js";

dotenv.config();


//siluni
import deliveryRouter from './routes/delivery.js';
import lorryRouter from './routes/lorry.js';
import orderRouter from './routes/order.js';

// daham
import materialRouter from './routes/materials.js';
import productRouter from './routes/products.js';
import released_materials_Router from './routes/released_materials.js'
import requestMaterialsRouter from './routes/request_materials.js';

//chami
import taskRouter from './routes/tasks.js'
import excessTaskRouter from './routes/taskexcess.js'

//shenal
import orderRoutes from './routes/order.route.js';

// Database connection
mongoose.connect(process.env.MONGO)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

const app = express();
const __dirname = path.resolve();
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client", "dist")));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/supplier", supplierRoutes);

// dinuri
app.use('/api/feedback', feedbackRoute);


//siluni
app.use("/delivery",deliveryRouter);
app.use("/lorry",lorryRouter);
app.use("/order",orderRouter )

// daham
//app.use("/product",productRouter);
app.use("/material",materialRouter );
app.use("/product",productRouter);
app.use("/released_material",released_materials_Router)
app.use("/request_material", requestMaterialsRouter);

//shenal
app.use('/api/orders', orderRoutes);

//chami
app.use("/task",taskRouter);
app.use("/taskexcess",excessTaskRouter);

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(3000, () => {
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