import express from 'express';
import { createProperty, allProperty, getProperty, updateProperty } from '../controllers/property.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// and need to check the user is authenticated
router.post("/create", verifyToken, createProperty);
// router.get("/", verifyToken, allProperty );
router.get("/",  allProperty);
// Individual property for edit
router.get("/edit/:id", verifyToken, getProperty)
router.get("/:id", getProperty)

// To update a property with put request (to update part of an existing resource)
router.put("/:propertyId", verifyToken, updateProperty);

// router.post("/edit");



export default router;