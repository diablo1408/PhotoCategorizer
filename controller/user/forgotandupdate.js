const User = require("../../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Vision = require("../../models/vision");
const { redis } = require("./util");



class ForgotAndUpdateDetail{

    async getValue(key) {
        return await redis.get(key);
    }

    async handleRequest(req, res){
        // console.log(req.body);



        const password = req.body.password;
        const repassword = req.body.repassword;
        const email = req.body.email;

        if(password !== repassword){
            return res.status(200).json({"msg":"Password is not same" , "verified" : false,"code" : "0"})
        }

        let otp;
        try {
            otp = await this.getValue(req.body.email);
            // console.log(otp);
            if(otp !== null){
                if(otp === req.body.otp){

                 //Hashing the password
                    bcrypt.hash(password, 10, (error, hash) => {
                        if (error) res.status(500).json({ error });
                        else {
                            
                            
                            User.updateOne({_id : req.body.user_id},{ 
                                $set: {"password" : hash}
                            }).then((user)=>{
                                return res.status(200).json({
                                    "msg": "Password is successfully updated!",
                                    "verified" : true,
                                    "code" : "1"
                                });
                            }).catch((err)=>{console.log(err)});
                        }
                    });
                }
                else{
                    // console.log("inc otp");
                    return res.status(200).json({"msg" : "Incorrect OTP","verified" : false,"code" : "0"});
                }
            }
            else{
                // console.log("otp exp");
                return res.status(200).json({"msg" : "OTP expired","verified" : false,"code" : "0"});
            }

        } catch(error) {
            console.log(error);
        }
    }
};

module.exports = {ForgotAndUpdateDetail : ForgotAndUpdateDetail};