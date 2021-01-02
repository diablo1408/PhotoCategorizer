const User = require("../../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Vision = require("../../models/vision");
const { generateOTP , initNodeMailer} = require("./util");


class SignUp{
    handleRequest(req, res){
        console.log(req.body);
        // const username = req.body.username,
           const email = req.body.email;
            // password = req.body.password;
        User.findOne({ email }) //Checking if the email exist
            .then((user) => {
            if (user)
                {
                    return res.status(200).json({"msg" : "The entered Email already exist!","status" : false})}
            else {  
                    //for initialise NodeMailer
                    const transporter =  initNodeMailer();
                    generateOTP(req,res,transporter);
                    return res.status(200).json({"user" : req.body,"msg" : "OTP has been sent to your Gmail","status" : true});
                }
            });
        }
};

module.exports = {SignUp : SignUp};