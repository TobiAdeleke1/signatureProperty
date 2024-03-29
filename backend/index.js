import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import propertyRouter from './routes/property.js';
import searchPropertyRouter from './routes/searchProperty.js';
import bookingRouter from './routes/booking.js';
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary } from 'cloudinary';



dotenv.config({path: process.env.DOTENV_CONFIG_PATH});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connected to DB");
});

const __dirname = path.resolve();

const PORT = 3000;
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,

})); 
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/property", propertyRouter);
app.use("/api/findproperty", searchPropertyRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);


app.use(express.static(path.join(__dirname, '/frontend/dist' )));
app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'));
})


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

