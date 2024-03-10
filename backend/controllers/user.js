import User from '../models/user.js';

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


export const userRole = async(req, res) =>{ 
    const userId = req.userId;
    try{ 
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({message: "User not found"});
 
        }
        
        let isAdmin = false;
        if(user.role === "admin"){
            isAdmin = true;
        }
  
       res.status(200).send({userAdmin: isAdmin})
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}