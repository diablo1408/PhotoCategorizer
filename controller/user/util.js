require('dotenv').config();
const nodemailer = require("nodemailer");
const Redis = require("ioredis");
const redis = new Redis();
var otpGenerator = require('otp-generator')



function initNodeMailer(){
    // console.log(process.env.EMAIL);
    // console.log(process.env.PASSWORD);
    let transporter = nodemailer.createTransport({
        port: 587,
        secure: true,
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD // generated ethereal password
        },
    });
    return transporter;
}


function generateOTP(req,res,transporter){
    
    const email = req.body.email;
    
    var otp = otpGenerator.generate(6, { alphabets : false,specialChars : false,upperCase : false });
    //  console.log(otp);
     // set otp in redis (with email as key) with expiration time(1 mins)
     redis.set(email,otp,'PX',60000);

    //Before sending a mail given link option will be TRUE 
    //of those gmail account by which you send a message
    //"https://myaccount.google.com/lesssecureapps?pli=1"
    
     transporter
    .sendMail({
        from: "PhotoCat",
        to: `${email}`,
        subject: "Welcome in our Community, PhotoCat ",
        text: `Hello Dear ${email}`,
        // html: `<b>Hello Dear User, we are happy that you join our family. Kind Regards, PhotoCat Team.</b>`,
        html : "<h3>OTP for account verification is </h3>"  + 
        "<h1 style='font-weight:bold;'>" + otp +"</h1>" + 
        "<br/><div>*OTP will expire in 1 minute</div>",
        // text: 'OTP will expire in 1 minute',
    })
    .then((info) => console.log("Email has been sent!"))
    .catch((err) => console.log(err));
    // return res.status(200).json({"user" : req.body});
}


module.exports = {
    initNodeMailer : initNodeMailer,
    generateOTP : generateOTP,
    redis : redis
};