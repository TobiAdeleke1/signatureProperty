import express from 'express';
import { createProperty } from '../controllers/property.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// and need to check the user is authenticated
router.post("/create", verifyToken, createProperty);

export default router;