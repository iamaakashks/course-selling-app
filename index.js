import express from 'express';
import './config/dotenv.js'
import authRoutes from './routes/auth_routes.js';
import courseRoutes from './routes/course_routes.js';

const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.get('/', (req, res)=>{
    res.send({msg: "Welcome to Home page"})
})

app.use('/auth/user', authRoutes);
app.use('/course', courseRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is live at PORT ${PORT}`)
})