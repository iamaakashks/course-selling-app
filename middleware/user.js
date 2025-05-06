import jwt from 'jsonwebtoken'
export const userMiddleware = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_USER);
        req.userId = decoded.id;
        next();
    }catch(err){
        next(err.message);
    }
}