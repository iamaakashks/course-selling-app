import express from 'express';
import './config/dotenv.js'

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.send({msg: "Welcome to Home page"})
})

app.listen(PORT, ()=>{
    console.log(`Server is live at PORT ${PORT}`)
})