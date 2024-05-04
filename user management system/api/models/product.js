import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_ID :{
        type : String,
        required:true
    },
    image:String,
    product_name :{
        type : String,
        required:true
    },
    product_description :{
        type : String,
        required:true
    },
    quantity :{
        type : Number,
        required:true
    },
    weight:{
        type : Number,
        required:true
    },
    unit_price:{
        type : Number,
        required:true
    },
    size :{
        type : String,
        required:true
    }


})




const product = mongoose.model("product",ProductSchema);
export default product;