import jwt  from "jsonwebtoken";

const protect=async(req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.status(401).json({message:'Unauthorized'}); 
    }
    try {
        const decoded=Jwt.verify(token,process.env.JET_SECRET)
        req.userId=decoded.userId;
        next();
    } catch (error) {
       return res.status(401).json({message:'Unauthorized'}); 
        
    }
}

export default protect