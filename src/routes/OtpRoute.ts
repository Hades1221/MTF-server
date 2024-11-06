import express from 'express';
import { sendOTPToEmail, verifyOTP } from '../controller/OtpController';

const router = express.Router();

router.post('/sendotpbyemail', sendOTPToEmail);
router.post('/verify', verifyOTP); 

export default router;