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
        const obj = {};
        if(req.body.username !== ""){ 
            obj.username = req.body.username;
        }
        if(req.body.password !== ""){
            
            
            let bcryptHash = util.promisify(bcrypt.hash);
            try{
            await bcryptHash(req.body.password, 10).then((res) => {
                obj.password = res;
            })
            }
            catch(error){
                console.log('error while crypting');
            }
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
};


module.exports = {UpdateDetail : UpdateDetail};