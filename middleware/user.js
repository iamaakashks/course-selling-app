import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.js';
export const userMiddleware = async (req, res, next)=>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_USER);
    console.log(decoded);
    const user = await userModel.findOne({_id: decoded.id});
    console.log(user);
    req.user = user;
    next();
}