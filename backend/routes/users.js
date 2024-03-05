import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { userDetails } from '../controllers/user.js';

const router = express.Router();


router.get("/me", verifyToken, userDetails);


export default router;
