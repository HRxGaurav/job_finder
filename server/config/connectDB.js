import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB = process.env.DATABASE;

const connectDB = async () => {
    try {
        await mongoose.connect(DB)
        console.log("DB has been connected succesfully");
    } catch (error) {
        console.log(`Failed to connect : ${error}`)
    }
}

export default connectDB;