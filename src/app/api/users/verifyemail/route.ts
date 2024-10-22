import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function POST(request:NextRequest) {
    try {
        // 1. Fetch Token as token come with body so destructured it.
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);
        
        //2. Find User based on incoming token and check that expiry of that token

        //In verifyTokenExpiry I add 1 hour so within this time user have to verify so "$gt" greater than operator . If token match and expiry is under time then fetch this user =>continue verification process..

        const user = await User.findOne({verifyToken : token, 
            verifyTokenExpiry : {$gt : Date.now()}})
        
        if(!user){
            return NextResponse.json({error : "Invalid Token!!"},{status: 400});
        } 
        console.log(user);
        
        //3. Change isVerified state and save to database and cleam the verifytoken & verifyTokenExpiry part.

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();       // Save in Database

        // Return Successfull

        return NextResponse.json({
            message : "User Verification Successfull!!",
            success : true
        }, {status: 400})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}