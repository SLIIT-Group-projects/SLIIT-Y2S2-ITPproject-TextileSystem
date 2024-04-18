import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    secreteKey: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    registerNumber: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const CreateUser = mongoose.model('CreateUser', userSchema);

export default CreateUser;