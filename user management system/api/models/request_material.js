import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RequestMaterialSchema = new Schema({
    material_ID :{
        type : String,
        required:true
    },
    material_name :{
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
    date:{
        type : String,
        required:true
    }
})

const request_material = mongoose.model("request_material",RequestMaterialSchema);
export default request_material;