import User from '../models/user.js';
import bcryptjs from 'bcryptjs';


export const signup =  async(req, res, next) =>{
    console.log(req.body);
    try{
        const {firstName, lastName, email, password } = req.body;
        let user = await User.findOne({
            email: email,
        });

        if(user){
            return res.status(400).json({message: "User already exists"});   
        }
        
        const hashedPassword = bcryptjs.hashSync(password, 10);
        user = new User({ 
            firstName,
            lastName,
            email, 
            password: hashedPassword
        });
        
        await user.save();
        res.status(201).json({message:"User Created Successfully"});

    }catch(error){
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});

    }
}

