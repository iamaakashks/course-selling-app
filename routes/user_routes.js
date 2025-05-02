import {Router} from 'express'

const userRouter = Router();

userRouter.get('/my_courses', (req, res)=>{
    res.send({msg: "My courses"})
})

export default userRouter;