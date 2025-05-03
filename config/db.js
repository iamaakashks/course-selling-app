import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.BASE_MONGO_URI);
        console.log(`Database connected ${conn.connection._connectionString}`);
    }catch(err){
        console.log(`Failed Database Connection`);
        process.exit(1);
    }
}