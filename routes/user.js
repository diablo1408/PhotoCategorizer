const express = require("express");
const router = express.Router();
const multer = require("multer");

const {SignUp} = require('../controller/user/signUp');
const {LogIn} = require('../controller/user/logIn');
const {VERIFY} = require('../controller/user/verify');
const {UserDetail}  = require('../controller/user/userDetail');
const {UpdateDetail} = require('../controller/user/updateDetail');
const { UploadProfileImage } = require("../controller/user/uploadProfileImage");

const signUp = new SignUp();
const logIn = new LogIn();
const verify = new VERIFY();
const userDetail = new UserDetail();
const updateDetail = new UpdateDetail();
const uploadFileImage = new UploadProfileImage();


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./uploads/");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


router.get("/userdetail/:user_id", (req,res) => {
    userDetail.handleRequest(req,res);
});

router.post("/signupandverify", (req,res) => {
    verify.handleRequest(req,res);
});

router.put("/updateandverify", (req,res) => {
    updateDetail.handleRequest(req,res);
});

router.post("/getotp",(req,res) =>{
    signUp.handleRequest(req,res);
})

router.post("/login", (req,res) => {
    logIn.handleRequest(req,res);
});

router.put("/uploadprofileimage",upload.single('image'), (req,res) => {
    uploadFileImage.handleRequest(req,res);
});

module.exports = router;