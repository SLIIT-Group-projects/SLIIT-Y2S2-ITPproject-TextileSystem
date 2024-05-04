import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const taskSchema = new Schema({
    
    item_name : {
        type : String,
        required: true
    },
    color : {
        type : String,
        default : '-'
    },
    target : {
        type : Number
    },
    emp_id : {
        type : String
    },
    date:{
        type : String,
        required:true
    }
});

const released_material = mongoose.model('released_material',taskSchema);

export default released_material;