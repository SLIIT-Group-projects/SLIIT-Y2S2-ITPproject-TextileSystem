import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        
    } , { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;