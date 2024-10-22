import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // Find User from Database
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({Message : "User Not Exist!!"},{status:400})
        }

        //  Check credential => Password (BcryptJS do it)
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({Message : "Check your Password!!"},{status:400})
        }

        // Generate Token => jsonWebToken use

        const tokenData = {
            // Payload / data under token

            id : user._id,
            username : user.username,
            email : user.email
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1d"})

        const response = NextResponse.json({
            message : "Logged In SuccessFully",
            success : true
        })

        // Cookies also send => next js automatic access of cookie
        response.cookies.set("token",token, {
            httpOnly : true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({Error : error},{status:500})
    }
}