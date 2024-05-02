import express from 'express';
import nodeMailer from 'nodemailer';
import { createFeedback, deleteFeedback, updateFeedback, GetFeedback, GetAllFeedback , GetFeedbackUid } from '../controllers/feedback.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create' , createFeedback);
router.delete('/delete/:id', deleteFeedback);
router.post('/update/:id', updateFeedback);
router.get('/get/:id', GetFeedback);
router.get('/getUid/:id', GetFeedbackUid);
router.get('/get', GetAllFeedback);




export default router;