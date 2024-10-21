import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";


// Now I am connect with Database..
connectDB()

// Post Request method

export async function POST(request:NextRequest){
    try {
        // Request body also take time as nextjs run in edge time
        
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // Steps in Registration

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error : "User Already Exist!!"},{status: 400});
        } 

        // Using BcryptJs hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        // Create New user and save to database
        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        
        // Send Verification Mail
        await sendEmail({email, emailType : "VERIFY", userId : savedUser._id})

        return NextResponse.json({
            message : "User Registered Successfully!!",
            success : true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:500})
    }
}