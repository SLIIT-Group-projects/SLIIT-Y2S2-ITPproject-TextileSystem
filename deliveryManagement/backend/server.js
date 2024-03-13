const express=require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
require("dotenv").config();

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

app.use("/delivery",deliveryRouter);
app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
})

