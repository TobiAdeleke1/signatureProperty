import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
// import userRouter from './routes/users.js';
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config({path: process.env.DOTENV_CONFIG_PATH});

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
// app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist' )));
app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'));
})


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

