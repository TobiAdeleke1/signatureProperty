import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { signin, signup, validtoken, logout } from '../controllers/auth.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/validate-token", verifyToken, validtoken);
router.post("/logout", logout);

export default router;