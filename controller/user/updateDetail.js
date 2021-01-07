const User = require("../../models/user");
const { generateOTP , initNodeMailer} = require("./util");
const { redis } = require("./util");
const bcrypt = require("bcrypt");
const util = require("util");

class UpdateDetail{

    async getValue(key) {
        return await redis.get(key);
    }

    async handleRequest(req,res){
        // console.log(req.body);
        let obj = {};
        if(req.body.password !== ""){

            User.find({_id : req.body.user_id})
            .then(async(user) =>{ 
                //   console.log(user);

                let bcryptCompare = util.promisify(bcrypt.compare);
                await bcryptCompare(req.body.password,user[0].password)
                .then(async(result) => {
                    // console.log(result);
                    // console.log(user[0].password);
                    // console.log(res !== user[0].password);
                    if(result == false){
                        return res.status(200).json({"msg" : "Incorrect current password"}); 
                    }
                    else{
                        //hash New password
                        let bcryptHash = util.promisify(bcrypt.hash);
                        try{
                        await bcryptHash(req.body.currentpassword, 10).then((res) => {
                            obj.password = res;
                        })
                        }
                        catch(error){
                            console.log('error while crypting');
                        }

                        User.updateOne({_id : req.body.user_id},{ 
                            $set: obj
                        }).then((user)=>{
                            return res.status(200).json({"msg" : "Your password is updated"});
                        }).catch((err)=>{console.log(err)});
                    }
                })
            })
            .catch((err) => console.log(err));

        }
        else{


            if(req.body.username !== ""){ 
                obj.username = req.body.username;
            }
            // console.log(obj);
            if(req.body.email === ""){
                User.updateOne({_id : req.body.user_id},{ 
                    $set: obj
                }).then((user)=>{
                    return res.status(200).json({"msg" : "Your profile is updated"});
                }).catch((err)=>{console.log(err)});
            }
            else{
                let otp;
            try {
                otp = await this.getValue(req.body.email);
                // console.log(otp);
                if(otp !== null){
                    if(otp === req.body.otp){
                        obj.email = req.body.email;
                        User.updateOne({_id : req.body.user_id},{ 
                            $set: obj
                        }).then((user)=>{
                            return res.status(200).json({"msg" : "Your profile is updated"});
                        }).catch((err)=>{console.log(err)});
                    }
                    else{
                        // console.log("inc otp");
                        return res.status(200).json({"msg" : "Incorrect OTP"});
                    }
                }
                else{
                    // console.log("otp exp");
                    return res.status(200).json({"msg" : "OTP expired"});
                }

            } catch(error) {
                console.log(error);
            }
            }
        }
    }
};


module.exports = {UpdateDetail : UpdateDetail};