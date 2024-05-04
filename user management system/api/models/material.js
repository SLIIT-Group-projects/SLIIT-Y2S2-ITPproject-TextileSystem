import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    material_ID :{
        type : String,
        required:true
    },
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
    }
})

const material = mongoose.model("material",MaterialSchema);
export default material;