import mongoose from "mongoose";

export const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL!);
        console.log('Mongo DB Connection Successful');
    } catch(error){
        console.log('Mongo DB Connection Failed',error);
    }
};