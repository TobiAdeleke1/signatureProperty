import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { signin, signup, validtoken } from '../controllers/auth.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/validate-token", verifyToken, validtoken);

export default router;