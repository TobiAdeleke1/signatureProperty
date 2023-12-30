import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {body, validationResult} from 'express-validator';

export const signin = [
    body("email", "Email is required").isEmail(),
    body("password", "Password with 6 or more characters required").isLength({min:6}),

    async(req,res, next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }
        // deconstructing 
        const {email, password} = req.body;

        try{
            const user = await User.findOne({email});

            if(!user){ // when no user found
                return res.status(400).json({message: "Invalid Credentials"});
            }

            // Check password match
            const isMatch = await bcryptjs.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message: "Invalid Credentials"});
            }

            // Now create access token, since user is valid
            const token = jwt.sign(
                {userId: user.id},
                 process.env.JWT_SECRET_KEY,
                 {
                    expiresIn: "1d",
                 }
                );

                res.cookie("auth_token", token, {
                    httpOnly:true,
                    secure:process.env.NODE_ENV === "production",
                    maxAge: 86400000, // in ms
                });

                res.status(200).json({userId:user._id});


        }catch(error){
            // console.log(error);
            res.status(500).send({message: "Internal Server Error"});
        }


}]