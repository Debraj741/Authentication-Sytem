import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function GET(request:NextRequest) {
    try {
        const response = NextResponse.json({
            message : "Log Out SuccessFully!!",
            success: true
        })

        response.cookies.set("token","",{
            httpOnly: true,
            expires : new Date(0)
        })

        return response;

    } 
    catch (error:any) {
        return NextResponse.json({Error : error},{status:500})
    }
}