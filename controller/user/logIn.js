const User = require("../../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


class LogIn{
    handleRequest(req, res, next){
        // console.log(req.body);
        const { password, email } = req.body;
        // console.log(email + password);
        User.find({ email: email }, (err, user) => {
            if (err || user.length === 0)
                return res.status(200).json({msg : "Incorrect Username or Password!",status : false});
            else if (user.length > 0) {
            //Comparing password
            bcrypt.compare(password, user[0].password, (_err, result) => {
                if (_err) return res.status(400).json({msg : 'Authentication has failed!'});
                else if (result) {
                    const userData = {
                        id:user[0]._id,
                        username: user[0].username,
                        email: user[0].email,
                    };
                    // const token = jwt.sign(userData, "MONGO_SECRET", { expiresIn: "1h" });

                    return res.status(200).json({
                            msg: "Authentication has been successful",
                            status : true,
                            userData,
                        });
                    
                } else
                    return res.status(200).json({msg : 'Incorrect Username or Password!',status : false});
            });
            }
        }).catch((error) => {return res.status(500).json({msg : error})});
    }
};

module.exports = {LogIn : LogIn};