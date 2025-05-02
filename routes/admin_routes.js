import {Router} from 'express';

const adminRouter = Router();

adminRouter.post("/signin", (req, res)=>{
    res.send({msg: "Admin signed in"})
})

export default adminRouter;