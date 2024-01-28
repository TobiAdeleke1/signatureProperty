import express from 'express';
import { createProperty, allProperty } from '../controllers/property.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// and need to check the user is authenticated
router.post("/create", verifyToken, createProperty);
// router.get("/", verifyToken, allProperty );
router.get("/",  allProperty);


export default router;