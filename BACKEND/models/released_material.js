const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const released_materialSchema = new Schema({
    material_name :{
        type : String,
        required:true
    },
    released_quantity :{
        type : Number,
        required:true
    },
    employee_id:{
        type : String,
        required:true
    },
    employee_name:{
        type : String,
        required:true
    },
    description:{
        type : String,
        required:true
    }
})

const released_material = mongoose.model("released_material",released_materialSchema);
module.exports=released_material;