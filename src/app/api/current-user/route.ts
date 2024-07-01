import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/config/dbConfig";
import UserModel from "@/models/user-model";
import { auth } from "@clerk/nextjs/server";
connectDB();

export async function GET(request:NextRequest){
    try{
        const {userId}= auth()
        if(!userId) throw new Error('Unauthorized request');
        const userInMongoDB = await UserModel.findOne({clerkUserId:userId});
        return NextResponse.json({user: userInMongoDB},{status:200})
    } catch(error:any){
        return NextResponse.json({message: error.message},{status:500})
    }
}



