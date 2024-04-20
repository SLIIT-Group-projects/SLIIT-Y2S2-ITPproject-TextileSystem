const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    
    task_id : {
        type : Number,
        required: true
    },
    task_description : {
        type : String,
        default : '-'
    },
    item_id : {
        type : String,
        required: true
    },
    target : {
        type : Number
    },
    final_count : {
        type : Number
    },
    deadline : {
        type : Date
    },
    emp_id : {
        type : String
    },
    approval : {
        type : String,
        default : 'Not Approved',
        enum : ['Not Approved','Approved']
    },
    status : {
        type : String,
        default : 'Pending',
        enum : ['Pending','In Progress','Complete']
    }
});

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;