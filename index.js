import express from 'express';
import './config/dotenv.js'
import authUserRouter from './routes/auth_users.js';
import authAdminRouter from './routes/auth_admin.js';
import courseRouter from './routes/course_routes.js';
import userRouter from './routes/user_routes.js';
import adminRouter from './routes/admin_routes.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser())
connectDB();

app.get('/', (req, res)=>{
    res.send({msg: "Welcome to Home page"})
})

app.use('/auth/user', authUserRouter);
app.use('/auth/admin', authAdminRouter);
app.use('/user', userRouter)
app.use('/admin', adminRouter);
app.use('/course', courseRouter)

app.listen(PORT, ()=>{
    console.log(`Server is live at PORT ${PORT}`)
})