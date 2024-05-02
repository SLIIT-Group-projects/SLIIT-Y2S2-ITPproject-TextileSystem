import Feedback from "../models/feedback.models.js";
import { errorHandler } from "../utils/error.js";
import nodeMailer from 'nodemailer';


export const createFeedback = async (req, res, next) => {
    try {
        const feedback = await Feedback.create(req.body);
        const emailHTML = `
            <p>Dear customer,</p>
            <p>Your feedback has been received.Thank you for your feedback.</p>
            
        `;

        // Create transporter
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ptiproject2024@gmail.com",
                pass: "gdgj szjg nkth pmxe"
            }
        });

        const mailOptions = {
            from: 'ptiproject2024@gmail.com',
            to: req.body.email, // Send email to the provided email address
            subject: "Feedback Received",
            html: emailHTML
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(201).json(feedback);
    } catch (error) {
        next(error);
    }
};


export const updateFeedback = async (req, res, next) => {
    try {
        const feedbackId = req.params.id;
        const updatedFeedback = req.body;
        
        const feedback = await Feedback.findByIdAndUpdate(feedbackId, updatedFeedback, { new: true });
        
        if (!feedback) {
            return next(errorHandler(404, "Feedback not found"));
        }
        
        return res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};


export const deleteFeedback = async (req, res, next) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return next(errorhandler(404, "Feedback not found"));
        }
        return res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        next(error);
    }

}



export const GetFeedback = async (req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return next(errorhandler(404, "Feedback not found"));
        }
        return res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
}

export const GetFeedbackUid = async (req, res, next) => {
    try {
        const userRef =  req.params.id;
        console.log(userRef);
        const feedback = await Feedback.find({userRef}); 
        
        if (!feedback) {
            return next(errorhandler(404, "Feedback not found"));
        }
        return res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};

export const GetAllFeedback = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        return res.status(200).json(feedbacks);
    } catch (error) {
        next(error);
    }
};
