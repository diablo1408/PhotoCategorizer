const util = require('util');
const fs = require("fs");
const User = require("../../models/user");
const {UploadImageByCloudinary} = require("../../cloudinaryUpload");
const cloudinaryUpload = require('../../cloudinaryUpload');

class UploadProfileImage {
  
  async handleRequest(req, res) {
      // console.log(req.body);
      const cloudinaryResult = await UploadImageByCloudinary(req.file.path) ; 
      // let FS_READFILE = util.promisify(fs.readFile); 
      try{
      const user_id = req.body.user_id;
      User.updateOne({_id : user_id},{$set: { "user_image" : cloudinaryResult}}).exec();
      return res.status(200).json({"user_image" : cloudinaryResult,msg : "Profile Image Updated"}); 
    }
    catch(err){
      console.log('error while adding profile image');
    }
  }
};

module.exports = {UploadProfileImage : UploadProfileImage};