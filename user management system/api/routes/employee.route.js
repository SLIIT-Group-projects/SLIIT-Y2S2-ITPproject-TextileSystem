import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/employee.controller.js';
import { getemployees, deleteemployee } from '../controllers/employee.controller.js';

const router = express.Router();
router.post('/create', verifyToken, create)
router.get('/getemployees', getemployees)
router.delete('/deleteemployee/:employeeId/:userId', verifyToken, deleteemployee)




export default router;