import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.auth_token;
    if(!token){ // first check if token exists
        return res.status(401).json({message:"Unauthorized"});
    }

    try{ // decode the token with the application secret key that created it 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // then get the userid
        req.userId = decoded.userId;
        next();  // to move to 
    }catch(error){
        
        return res.status(403).json({message:"Forbidden"});
    }

} 