const User = require("../../models/user");


class UserDetail{
    handleRequest(req,res){
    //   console.log(req.params);
      User.find({_id : req.params.user_id})
      .then((user) =>{ 
          // console.log(user);
        return res.status(200).json({"username" : user[0].username,"email" : user[0].email ,
        "user_image" : user[0].user_image});
        }
      )
      .catch((err) => res.status(500).json({ error: err }));
    }
}


module.exports = {UserDetail : UserDetail};