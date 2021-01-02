const express = require("express");
const router = express.Router();
const multer = require("multer");

const {GetAllImage} = require('../controller/image/getAllImage');
const {AddImage} = require('../controller/image/addImage');
const {GetGenre} = require('../controller/image/getGenre');
const {GetAllGenres} = require('../controller/image/getAllGenre');

const getallImage = new GetAllImage();
const addImage = new AddImage();
const getGenre = new GetGenre();
const getAllGenres = new GetAllGenres();


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      console.log("multer")
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.get("/getimages/:user_id/:label", (req,res) => {
    getallImage.handleRequest(req,res);
});

// router.put("/addimage",upload.single('image'), (req,res) => {
//   addImage.handleRequest(req,res);
// });

router.put("/addimage",upload.array('image[]'), (req,res) => {
    addImage.handleRequest(req,res);
});

router.get("/getgenres/:user_id", (req,res) => {
  getGenre.handleRequest(req,res);
});

router.get("/getallgenres/:user_id", (req,res) => {
  getAllGenres.handleRequest(req,res);
});

module.exports = router;