import dotenv from 'dotenv';
import Property from "../models/property.js";
import cloudinary from "cloudinary";
import multer from "multer";
import {body, validationResult, param} from 'express-validator';
import Stripe from "stripe";

dotenv.config({path: process.env.DOTENV_CONFIG_PATH});

// Initialise a Stripe Process
const stripe = new Stripe(process.env.STRIPE_API_KEY);


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export const createProperty = [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Property type is required"),
    body("imageUrls").notEmpty().withMessage("Images are required"),
    body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and a number"),
    body("starRating")
        .notEmpty()
        .isNumeric()
        .withMessage("Rating is required and a number"),
    body("adultCount")
        .notEmpty()
        .isNumeric()
        .withMessage("Number of Allowed Adults per night is required and a number"),
    body("childCount")
        .notEmpty()
        .isNumeric()
        .withMessage("Number of Allowed Children per night is required and a number"),
    body("bathroom")
        .notEmpty()
        .isNumeric()
        .withMessage("Bathroom per night is required and a number"),
    body("bedroom")
        .notEmpty()
        .isNumeric()
        .withMessage("Bedroom per night is required and a number"),
    body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
    upload.array("imageFiles", 6),
    async(req, res, next) => {
        try{
            const imagesFiles = req.files;
            const newProperty = req.body;
            const imageUrls = await uploadImages(imagesFiles);
          
            // Update property objects
            newProperty.imageUrls = imageUrls;
            newProperty.lastUpdated = new Date();
            newProperty.userId = req.userId;
            const property = new Property(newProperty);
            await property.save();

            return res.status(201).json({
                success:true,
                property,
            });

        }catch(error){
            console.log("Error creating Property: ", error.message);
            res.status(500).json({message:"Internal Server Error" });

        }
    }
]

export const allProperty = async(req, res) =>{

    try{
         // const properties = await Property.find({userId: req.userId});
        const properties = await Property.find({});
       
       res.json(properties);

    }catch(error){
        res.status(500).json({message: "Error fetching Properties"});

    }

};

export const getProperty = async(req, res) =>{

    const propertyId = req.params.id; 
    try{
        const property = await Property.findById({
            _id:propertyId
        });
        res.json(property);
    }catch(error){
        res.status(500).json({message: "Error fetching Properties"});

    }

};

export const updateProperty = [
    upload.array("imageFiles"), // using multer
    async(req, res) =>{
        try{
            const updateProperty = req.body;
            updateProperty.lastUpdated = new Date();
            const propertyId = req.params.propertyId; 

            const property = await Property.findOneAndUpdate({
                _id: propertyId
            },
             updateProperty,
              {new:true}
            );

            if(!property){
                return res.status(404).json({message: "Property not found"});

            }
            
            // Get newly added image files to upload to cloundary
            const files = req.files;
            const updatedImageUrls = await uploadImages(files);
            
            // Spread the returned URLs into new images with the existing ones
            property.imageUrls = [
                ...updatedImageUrls,
                ...(updateProperty.imageUrls || []),
            ];

            // And if all goes well, save the property created from the property
            await property.save(); 
            res.status(201).json(property);

        }catch(error){
            res.status(500).json({message:"Internal Server Error"});
        }
    }
]

export const getCurrentProperty = [
    param("id").notEmpty().withMessage("Property ID is missing"),
    async(req, res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const id = req.params.id.toString();
        try{
            const property = await Property.findById(id);
            res.json(property);
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Errors fetching Property"});
        }
    }
]

export const stripePayment = async(req, res) =>{
    const { numberOfNights } = req.body;
    const propertyId = req.params.propertyId;

    const property = await Property.findById(propertyId);

    if(!property){
        return res.status(400).json({message: "Property not found"});
    }
    // Usually done back for data security, so frontend process is not amended for calculation
    const totalCost = property.pricePerNight * numberOfNights;
    
    
    // Use Stripe to create payment id, with metadata we want to associate with it
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost*100, // Stripe assumes the smallest unit which is in pence so* 100 to pounds
        currency: "gbp",
        metadata: {
            propertyId,
            userId: req.userId,

        },
    });

    // check client secret exist bew
    if(!paymentIntent.client_secret){
        console.log("paymentIntent", paymentIntent);
        return res.status(500).json({message: "Error creating payment intent"});
    }
    
    // But response to send to frontend
    const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret:paymentIntent.client_secret.toString(),
        totalCost,
    };
    
    res.send(response);  
  
};

export const getBookings = async(req, res)=>{

    try{
        // Check if payment was successful and get payment intent id 
        const paymentIntentId = req.body.paymentIntentId;
        
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if(!paymentIntent){
            return res.status(400).json({message: "Payment Intent not found"});
        }

        // Get metadata from payment Intent and ensure it by user id and property id match
        if(
            paymentIntent.metadata.propertyId !== req.params.propertyId 
            || paymentIntent.metadata.userId !== req.userId
        ){
           return res.status(400).json({message: "Payment Intent Mismatch"});
        }

        if(paymentIntent.status !== "succeeded"){

            return res.status(400).json({message: `Payment intent not succeeded. Status: ${paymentIntent.status}`});
        }

        // If all test pass, create the booking
        
        const newBooking = {
            ...req.body, // spread
            userId: req.userId,
        };
        
        // $push, to update Booking Schema 
        const property = await Property.findOneAndUpdate(
            {_id:req.params.propertyId},
            {
                $push: {bookings: newBooking},
            }
        );

        if(!property){
            return res.status(400).json({message: "Property not found"})
        }
        
        // Lastly save the updated property
        await property.save();       
        
        res.status(200).send();
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})

    }

}


async function uploadImages(imagesFiles) {
     //1.  Use async for uploading one at a time, and wait till all done
    const uploadPromises = imagesFiles.map(async (image) => {
        // Need to convert the iamge to base 64 to be processed by cloudinary ??
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const resp = await cloudinary.v2.uploader.upload(dataURI);
        return resp.url;

    });


    //2. wait for all the promises to return
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}
