import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.BASE_MONGO_URI);
        console.log(`Database connected`);
    }catch(err){
        console.log(`Failed Database Connection`);
        process.exit(1);
    }
}