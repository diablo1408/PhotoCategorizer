const User = require("../../models/user");
const { generateOTP , initNodeMailer} = require("./util");

class ForgotAndVerifyDetail{

    handleRequest(req, res){
        console.log(req.body);
        // const username = req.body.username,
           const email = req.body.email;
            // password = req.body.password;
        User.findOne({ email }) //Checking if the email exist
            .then((user) => {
                console.log(user);
            if (user === null)
                {
                    return res.status(200).json({"msg" : "Email doesn't exist!","status" : false})}
            else {  
                    //for initialise NodeMailer
                    const transporter =  initNodeMailer();
                    generateOTP(req,res,transporter);
                    return res.status(200).json({"user" : req.body,"msg" : "OTP has been sent to your Gmail","status" : true});
                }
            });
        }
};


module.exports = {ForgotAndVerifyDetail : ForgotAndVerifyDetail};