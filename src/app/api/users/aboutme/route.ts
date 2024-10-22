import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"

import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB()

export async function POST(request:NextRequest) {
    const userId = await getDataFromToken(request)
    const user = await User.findById(userId).select("-password")

    if(!user){
        return NextResponse.json({
            message : "Invalid Token!!"
        }, {status: 400});
    }

    return NextResponse.json({
        message : "User Found!",
        data : user
    }) 
}