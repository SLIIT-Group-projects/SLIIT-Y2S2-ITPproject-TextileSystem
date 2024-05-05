import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    
    task_id : {
        type : Number,
        required: true
    },
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
        enum : ['Pending','In Progress','Complete','Sent to Production']
    }
});

const Task = mongoose.model('Task',taskSchema);

export default Task;