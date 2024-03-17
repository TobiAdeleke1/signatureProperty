import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { bookings, minbookingDate } from '../controllers/bookings.js';

const router = express.Router();

router.get("/my-bookings", verifyToken, bookings );
router.get("/mindate/:id", minbookingDate);

export default router;