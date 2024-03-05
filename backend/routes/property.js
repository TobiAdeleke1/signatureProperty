import express from 'express';
import { 
     createProperty, 
     allProperty,
     getProperty, 
     updateProperty, 
     getCurrentProperty,
     stripePayment,
     getBookings
    } from '../controllers/property.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// and need to check the user is authenticated
router.post("/create", verifyToken, createProperty);
// router.get("/", verifyToken, allProperty );
router.get("/",  allProperty);
// Individual property for edit
router.get("/edit/:id", verifyToken, getProperty)
router.get("/:id", getCurrentProperty)

// To update a property with put request (to update part of an existing resource)
router.put("/:propertyId", verifyToken, updateProperty);

// router.post("/edit");

// Stripe and Booking related Endpoints 
router.post("/:propertyId/bookings/payment-intent", verifyToken, stripePayment);
router.post("/:propertyId/bookings", verifyToken, getBookings);




export default router;