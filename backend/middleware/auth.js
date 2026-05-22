import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next) => {

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Token Missing or Invalid"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) 
        const user = await User.findById(payload.id).select("-password")

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User Not Found"

            })
        }

        req.user  = user
        next();
    
    } catch (error) {
        console.log("JWT Verification failed",error);
        res.status(401).json({
            success: false,
            message: "Token Invalid or Expired"
        })
    }
}

export default authMiddleware;