const express=require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
require("dotenv").config();
const nodeMailer= require('nodemailer');
const app=express();

const PORT= process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL= process.env.MONGODB_URL

mongoose.connect(process.env.MONGODB_URL)

const connection= mongoose.connection;
connection.once("open", ()=> {
    console.log("mongodb connection success!");
})

const deliveryRouter=require("./routes/delivery.js")
const orderRouter=require("./routes/order.js")
const lorryRouter=require("./routes/lorry.js")

app.use("/delivery",deliveryRouter);
app.use("/order",orderRouter);
app.use("/lorry",lorryRouter);

// daham
// this is th route for products table
const productRouter = require("./routes/products.js");
app.use("/product",productRouter)

// this is th route for material table
const materialRouter = require("./routes/materials.js");
app.use("/material",materialRouter)

// this is th route for realeased material table
const released_materials_Router = require("./routes/released_materials.js");
app.use("/released_material",released_materials_Router)

// this is th route for request material 
const requestMaterialsRouter = require("./routes/request_materials");
app.use("/request_material", requestMaterialsRouter);


// chami
const taskRouter = require("./routes/tasks.js");
const excessTaskRouter = require("./routes/taskexcess.js")

app.use("/task",taskRouter);
app.use("/taskexcess",excessTaskRouter);


app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
})


