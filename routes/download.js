const express = require("express");
const router = express.Router();

const {DownLoad} = require('../controller/download/download_img');

const download = new DownLoad();


router.get("/downloadgenres/:user_id/:genres", (req,res) => {
    download.handleRequest(req,res);
});

module.exports = router;