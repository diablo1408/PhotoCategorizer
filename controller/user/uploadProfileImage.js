const util = require('util');
const fs = require("fs");
const User = require("../../models/user");


class UploadProfileImage {
  
  handleRequest(req, res) {
      // console.log(req.body); 
      let FS_READFILE = util.promisify(fs.readFile); 
      try{
      FS_READFILE(req.file.path)
      .then((data)=>{ 
          const user_id = req.body.user_id;
          User.updateOne({_id : user_id},{ 
              $set: { "user_image" : data}
          }).then((user)=>{
            console.log(req.file.filename);

            return res.status(200).json({"user_image" : data,msg : "Profile Image Updated"}); 
          });
      });
    }
    catch(err){
      console.log('error while adding profile image');
    }
  }
};

module.exports = {UploadProfileImage : UploadProfileImage};