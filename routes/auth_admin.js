import { Router } from 'express'
import { adminModel } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authAdminRouter = Router();

authAdminRouter.post('/register', async (req, res)=>{
    try{
        const {body: {name, username, password}} = req;
        const existingAdmin = await adminModel.findOne({username});
        if(existingAdmin) return res.status(409).send({msg: "Admin already exists"});
        const newUser = adminModel.create(req.body);
        res.status(201).send({msg: "Admin Created"})
    }catch(err){
        res.status(500).send({msg: "some error has occured", error: err.message});
    }
    
})

authAdminRouter.post('/login', async (req, res)=>{
    try{
        const {body: {username, password}} = req;
        const findUser = adminModel.findOne({username});
        if(!findUser && !(await bcrypt.compare(password, findUser.password))) res.status(403).send({msg: "Bad Credential"})

        const token = jwt.sign({id: findUser.id}, process.env.JWT_SECRET_KEY_ADMIN, {expiresIn: '1h'})
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000*60*60*24
        })
        res.status(200).send({msg: "Admin logged in successfully"})
    }catch(err){
        res.statusMessage(500);
    }
})

export default authAdminRouter;