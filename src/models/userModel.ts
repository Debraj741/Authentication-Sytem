import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: [true,"Please Enter Username!!"],
        unique : true
    },
    email : {
        type : String,
        required: [true,"Please Provide an Email!!"],
        unique : true
    },
    password : {
        type : String,
        required: [true,"Please Provide Your Password!!"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User