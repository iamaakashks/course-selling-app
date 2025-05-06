import { Router } from 'express'
import { adminModel } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { adminMiddleware } from '../middleware/admin.js';

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
        const {body: {email, password}} = req;
        const findAdmin = await adminModel.findOne({email});
        if(!findAdmin || !(await bcrypt.compare(password, findAdmin.password))) res.status(403).send({msg: "Bad Credential"})
        const token = jwt.sign({id: findAdmin.id}, process.env.JWT_SECRET_KEY_ADMIN, {expiresIn: '1h'})
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000*60*60*24
        })
        res.status(200).send({msg: "Admin logged in successfully"})
    }catch(err){
        res.sendStatus(500);
    }
})

authAdminRouter.get("/course", adminMiddleware, async (req, res)=>{
    try{
        const getAdminById = await adminModel.findById(req.adminId);
        res.status(200).send({msg: `welcome ${getAdminById.name}`})
    }catch(err){
        console.log(`server error occured`);
        res.sendStatus(500);
    }
})

export default authAdminRouter;