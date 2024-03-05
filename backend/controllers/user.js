import User from '../models/user.js';
import {body, validationResult} from 'express-validator';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';



export const userDetails = async (req, res) =>{
    const userId = req.userId;

    try{
        // return excluding the password
        const user = await User.findById(userId).select("-password");
        
        if(!user){
           return res.status(400).json({message: "User not found"});

        }
        res.json(user);

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }

}
