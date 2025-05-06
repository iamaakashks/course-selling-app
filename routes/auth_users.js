import { Router } from 'express'
import { userModel } from '../models/user.js';
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

authUserRouter.get("/purchase", userMiddleware, (req, res)=>{
    res.status(200).send({msg: `Welcome ${req.user.name}`});
})

export default authUserRouter;