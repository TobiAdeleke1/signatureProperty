import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { bookings } from '../controllers/bookings.js';

const router = express.Router();

router.get("/", verifyToken, bookings );

export default router;