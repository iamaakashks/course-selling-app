import { Router } from 'express'
import { courseModel, purchasedModel, userModel } from '../models/user.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import { userMiddleware } from '../middleware/user.js';

const authUserRouter = Router();

authUserRouter.post('/register', async (req, res)=>{
    try{
        const {body: {name, email, password}} = req;
        const existingUser = await userModel.findOne({email: email});
        if(existingUser) res.status(409).send({msg: "User already exists"});

        const newUser = new userModel(req.body);
        await newUser.save()
        res.status(201).send({msg: "User created successfully"})
    }catch(err){
        res.status(500).send({
            msg: "Server Error! Something went Wrong",
            error: err.message
        })
    }
})

authUserRouter.post('/login', async (req, res)=>{
    try{
        const {body: {email, password}} = req;
        const findUser = await userModel.findOne({email});
        if(!findUser) res.status(404).send({msg: "User not found"});
        if(!(await bcrypt.compare(password, findUser.password))) res.status(403).send({msg: "Incorrect Password"})
        const token = jwt.sign({id: findUser.id}, process.env.JWT_SECRET_KEY_USER, {expiresIn: '1h'});
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000*60*60
        })
        res.status(200).send({msg: "user logged in"});
    }catch(err){
        res.status(500).send({
            msg: "Server Error! Something went wrong",
            error: err.message
        })
    }
})
authUserRouter.post("/purchase", userMiddleware, async(req, res)=>{
    try{
        const userId = req.userId;
        const courseId = req.body.courseId;
        const newPurchase = new purchasedModel({
            userId,
            courseId
        })
        await newPurchase.save()
        res.status(201).send({
            msg: `purchased a course with course id ${courseId}`
        })
    }catch(err){
        res.sendStatus(500);
    }
})

authUserRouter.get("/purchase", userMiddleware, async (req, res)=>{
    try{
        const getUserById = await userModel.findById(req.userId)
        if(!getUserById) res.status(404).send({msg :"user not found"});
        const purchasedCourse = await purchasedModel.find(
            {
                userId: req.userId
            }
        )
        const purchasedCourseDetails = await courseModel.find(
            {
                _id: { $in: purchasedCourse.map(i => i.courseId)}
            }
        )
        return res.status(200).send({purchasedCourse, purchasedCourseDetails});
    }catch(err){
        console.log(`something went wrong`);
        res.sendStatus(500)
    }
})

export default authUserRouter;