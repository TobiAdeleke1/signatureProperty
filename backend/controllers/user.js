// import User from '../models/user.js';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import {body, validationResult} from 'express-validator';


// export const signup = [
//     body("firstName", "First Name is required").isString(),
//     body("lastName", "Last Name is required").isString(),
//     body("email", "Email is required").isEmail(),
//     body("password", "Password with 6 or more characters required").isLength({min:6}),
//     async(req, res, next) =>{

//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(400).json({message: errors.array()})
//     }

//     try{
//         const {firstName, lastName, email, password } = req.body;
//         let user = await User.findOne({
//             email: email,
//         });

//         if(user){
//             return res.status(400).json({message: "User already exists"});   
//         }
        
//         const hashedPassword = bcryptjs.hashSync(password, 10);
//         user = new User({ 
//             firstName,
//             lastName,
//             email, 
//             password: hashedPassword
//         });
        
//         await user.save();

//         const token = jwt.sign(
//             {userId: user.id}, 
//             process.env.JWT_SECRET_KEY,
//             {expiresIn: "1d"}
//         );
//         res.cookie("auth_token", token, {
//             httpOnly:true, // Request only via HTTP request
//             secure: process.env.NODE_ENV === "production", // so request only from https when in production
//             maxAge: 86400000, // need to match Expires in
//         });

    
//         return res.status(200).send({message: "User registered OK"});

//     }catch(error){
//         res.status(500).send({message: "Internal Server Error"});
     
//     }
// }]
