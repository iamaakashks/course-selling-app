import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next)=>{
    try{
        const token = req.cookies.token;
        const verifiedAdmin = jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN);
        req.adminId = verifiedAdmin.id;
        next();
    }catch(err){
        next(err.message)
    }
}