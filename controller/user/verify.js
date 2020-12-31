const User = require("../../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Vision = require("../../models/vision");
const { redis } = require("./util");



class VERIFY{

    async getValue(key) {
        return await redis.get(key);
    }

    async handleRequest(req, res){
        // console.log(req.body);
        const password = req.body.password;
        const email = req.body.email;
        const username = req.body.username;

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
                            const userData = new User({
                                _id: mongoose.Types.ObjectId(),
                                username: username,
                                email: email,
                                password: hash,
                                user_image : mongoose.Types.Buffer()
                            });
                            // console.log(userData);
                            userData
                            .save()
                            .then((user) => {

                                    
                                    //for user image platform
                                    const userDataInVision = new Vision({
                                        _id: mongoose.Types.ObjectId(),
                                    user_id:user._id,
                                    image:[],
                                    labels : {} 
                                    });
                                    userDataInVision
                                    .save()
                                    .catch((error) => {return res.status(500).send(error)});
                                    


                                return res.status(200).json({
                                    message: "The user account and platform has been signed/set up successfully!",
                                    userData,
                                    userDataInVision,
                                    verified : true
                                });
                            })
                            .catch((error) => {return res.status(500).send(error)});
                        }
                    });
                }
                else{
                    // console.log("inc otp");
                    return res.status(200).json({"msg" : "Incorrect OTP",verified : false});
                }
            }
            else{
                // console.log("otp exp");
                return res.status(200).json({"msg" : "OTP expired",verified : false});
            }

        } catch(error) {
            console.log(error);
        }
    }
};

module.exports = {VERIFY : VERIFY};