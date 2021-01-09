const fs = require('fs'); 
const path = require('path'); 
const Vision = require("../../models/vision");
const util = require("util");
const download = require('image-downloader')


class DownLoad {

    async process_genre(user,genre,req){
            //mke folder of given genre
            let FS_MKDIR = util.promisify(fs.mkdir);
            try{
                await FS_MKDIR(path.join("/home/utsav/Desktop", genre))
                .then((user) => {
                    console.log('Directory created successfully!')
                }) 
            }
            catch(error){
                console.log('error while making folder');
            }
        

            let label_mapping = user[0].image_labels;
            let found = label_mapping.find((ele)=>{return (ele.name === genre)});
            let allimagesData = found["label"];
            
            for(let i = 0;i<allimagesData.length;i++){
                let img_name = allimagesData[i]["img_name"].substr(allimagesData[0]["img_name"].indexOf("-")+1);
                // let img_buffer = allimagesData[i]["img_buffer"];

                const options = {
                url: img_name,
                dest: "/home/utsav/Desktop/" + genre                // will be saved to /path/to/dest/image.jpg
                }

                try{
                   const filename =  download.image(options);
                //    console.log(filename);
                }
                catch(err){
                    console.log(err);
                    console.log("err while downloading");
                }
            }
    }

  handleRequest(req, res) {
    //    console.log(req)
    const user_id = req.params.user_id;
    const genreList = req.params.genres.split(',');
    // console.log(user_id,genreList);
    try{
            Vision.find({user_id : user_id})
            .then(async (user)=>{

        

                let promise = [];
                for(let i = 0;i<genreList.length;i++){
                    promise.push(this.process_genre(user,genreList[i],req)
                    .catch((err)=>{
                        console.log(err,"error while inserting genre/s");
                    }));
                }
                
                await Promise.all(promise);

                return res.status(200).json({"msg" : "Downloaded"})
            })
            .catch((err)=>{console.log(err);})
    }
    catch(err){
        console.log(err);
    }
 }
};

module.exports = {DownLoad : DownLoad};
