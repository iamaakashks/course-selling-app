import express from 'express'
import { courseModel } from '../models/user.js';

const courseRouter = express.Router();

courseRouter.get('/all_courses', async (req, res)=>{
    try{
        const getAllCourses = await courseModel.find({});
        console.log(getAllCourses)
        res.status(200).send({
            courses: getAllCourses
        })
    }catch(err){
        res.sendStatus(500);
    }
})
export default courseRouter;