import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"




export const sendEmail = async({email, emailType, userId}:any) =>{
    try {

        // VerifyToken generate - Use uuid & generate token(No special char present), but here can work with bcryptjs(May present special charecter)
        const hashedToken = bcryptjs.hash(userId.toString(), 10);

        // Verify Email send
        if(emailType === "VERIFY"){
            // 1. Save in DataBase First
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken : hashedToken,
                    verifyTokenExpiry : Date.now() + 3600000 //Hour in ms
                }
            )
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken : hashedToken,
                    forgotPasswordTokenExpiry : Date.now() + 3600000 //Hour in ms
                }
            )
        }

        // This part should not be present here, present in .env file but for testing keep there.   
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "2231c51cd08434",
            pass: "2b50449bcb5a2a"
            }
        });


        const veriFyEmailBody = `
        <p>
            Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to Verify Your Email.
            <br/>
            Or Copy & Paste the Link to your Browser..
            <br/>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>` 

        const veriFyPasswordBody = `
        <p>
            Click <a href = "${process.env.DOMAIN}/verifypassword?token=${hashedToken}">Here</a> to Reset Your PassWord!!.
            <br/>
            Or Copy & Paste the Link to your Browser..
            <br/>
            ${process.env.DOMAIN}/verifypassword?token=${hashedToken}
        </p>` 


        const mailOption = {
            from: 'debraj@debraj.ai', 
            to: email, 
            subject: emailType === "VERIFY"? "Verify Your Email" : "Reset Your PassWord!!" ,

            // In production it is not recommanded to click the link & verify as some browser automatically open gmail link for spam detection , so if I directly write this query then most of the cases fake user will easily verify... 
            // So Create another page & there present link to click =>Next TODO

            html: emailType === "VERIFY"?veriFyEmailBody:veriFyPasswordBody
        }

        // Send Mail
        const mailResponse = await transport.sendMail(mailOption)
        return mailResponse;

    } catch (error:any) {
        throw new Error(error);
    }
} 