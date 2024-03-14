const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    material_name :{
        type : String,
        required:true
    },
    material_type :{
        type : String,
        required:true
    },
    roll_quantity :{
        type : Number,
        required:true
    },
    color:{
        type : String,
        required:true
    },
    supplier_id :{
        type : String,
        required:true
    }


})

const product = mongoose.model("material",MaterialSchema);
module.exports=product;