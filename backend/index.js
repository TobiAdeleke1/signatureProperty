import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

const app = express();
app.use(express.json()); // allows automatic conversion to json
app.use(express.urlencoded({extended:true})); // Helps parse url, to get i.e query parameters
app.use(cors()); // A security set to  prevent request from differnt URL that's unwanted
const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});