import { Router } from 'express'
import { userModel } from '../models/user.js';

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

authUserRouter.post('/login', (req, res)=>{

})

export default authUserRouter;