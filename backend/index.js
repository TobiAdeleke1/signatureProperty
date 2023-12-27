import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.js'
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connected to DB");
});

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(cors()); 
const PORT = 3000;


app.use("/api/users", userRouter);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});