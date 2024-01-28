import Property from "../models/property.js";
import cloudinary from "cloudinary";
import multer from "multer";
import {body} from 'express-validator';

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

     
            //1.  Use async for uploading one at a time, and wait till all done
            const uploadPromises = imagesFiles.map(async(image) =>{
                // Need to convert the iamge to base 64 to be processed by cloudinary ??
                const b64 = Buffer.from(image.buffer).toString("base64"); 
                let dataURI= "data:"+image.mimetype+";base64,"+b64;
                const resp = await cloudinary.v2.uploader.upload(dataURI);
                return resp.url; 
          
            });


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

}

