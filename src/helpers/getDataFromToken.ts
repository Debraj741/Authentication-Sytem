import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest)=>{
    try {
        
        // Get token => Came from cookies
        const mytoken = request.cookies.get("token")?.value || ""

        // Token came as a encoded format so decode it
        const decodedToken:any = jwt.verify(mytoken,process.env.TOKEN_SECRET!)

        return decodedToken.id      // id come from payload of token

    } catch (error:any) {
        throw new Error(error.message)
    }
}