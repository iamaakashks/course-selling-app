import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})
const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Course name is required"]
    },
    description:{
        type: String,
        required: [true, "Description is missing"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    imageURL: {
        type: String
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
    }
})
const purchasedSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId
})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
adminSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export const userModel = mongoose.model('user', userSchema);
export const adminModel = mongoose.model('admin', adminSchema);
export const courseModel = mongoose.model('course',  courseSchema);
export const purchasedModel = mongoose.model('purchased', purchasedSchema);