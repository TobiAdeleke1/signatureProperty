import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { userDetails, userRole } from '../controllers/user.js';

const router = express.Router();


router.get("/me", verifyToken, userDetails);
router.get("/user-role", verifyToken,userRole);


export default router;
