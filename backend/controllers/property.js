import Property from "../models/property.js";
import cloudinary from 'cloudinary';
import {body, validationResult} from 'express-validator';

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

    async (req, res, next) => {
        // TODO: s
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }
        try{
            const imagesFiles = req.files;
            const newProperty = req.body;
            
            //1.  Use async for uploading one at a time, and wait till all done
            const uploadPromises = imagesFiles.map(async(image) =>{
                // Need to convert the iamge to base 64 to be processed by cloudinary ??
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataURI= "data:"+image.mimetype+";base64,"+b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);

                return res.url; // returns an array of promises
            })

            //2. wait for all the promises to return
            const imageUrls = await Promise.all(uploadPromises);
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
            console.log("Error creating hotel: ", error);
            res.status(500).json({message:"Internal Server Error" });

        }
    }
]