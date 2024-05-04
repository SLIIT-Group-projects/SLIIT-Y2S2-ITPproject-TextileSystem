import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskExcessSchema = new Schema({
    
    task_id : {
        type : Number,
        required: true
    },
    emp_id : {
        type : String,
        required: true
    },
    target : {
        type : Number
    },
    final_count : {
        type : Number
    },
    excess : {
        type : Number
    },
    
});

const TaskExcess = mongoose.model('TaskExcess',taskExcessSchema);

export default TaskExcess;