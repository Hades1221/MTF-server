import express from 'express';
import OtpRoute from './OtpRoute'
import UserRoute from './UserRoute'
import SiteRoute from './SiteRoute'

const router = express.Router();

router.use('/api/users', UserRoute);

router.use('/api/otp', OtpRoute);

router.use('/api/site', SiteRoute)

export default router;