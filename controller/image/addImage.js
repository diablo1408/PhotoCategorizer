const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const Vision = require("../../models/vision");
const {get_features} = require('../../predict');
const util = require('util');


//for multiple file

class AddImage {

  constructor() {
    this.readFile = util.promisify(fs.readFile);
  }

  getStuff(path) {
    return this.readFile(path);
  }

  async process_image(user,element,req){

    // console.log(user);

    let features = await get_features(element.path);
    let feature_list = features.slice(0,5);
    await this.getStuff(element.path).then(async(data)=>{

      let image_mapping = user[0].image;
                // console.log(image_mapping);

                image_mapping.push({img_name : element.filename,img_label : feature_list,img_data:data});


                //for labels
                let label_mapping = user[0].image_labels;
                if(label_mapping.length == 0){
                  label_mapping.push({name : "All" ,label : {img_name : element.filename,img_buffer : data}});
                }
                else{
                    let found = label_mapping.find((ele)=>{return (ele.name === 'All')}); 
                    if(found !== undefined){
                      found.label.push({img_name : element.filename,img_buffer : data});
                    }
                }

                feature_list.forEach(function (item) {

                  let found = label_mapping.find((ele)=>{return (ele.name === item.name)}); 
                  if(found !== undefined){
                    found.label.push({img_name : element.filename,img_buffer : data});
                  }
                  else{
                    label_mapping.push({name : item["name"] ,label : {img_name : element.filename,img_buffer : data}});
                  } 
                });

                const user_id = req.body.user_id;
                Vision.updateOne({user_id : user_id},{ 
                    $set: { 'image': image_mapping ,
                    'image_labels' : label_mapping
                  }}).then((user)=>{
                    console.log(user)
                  });

      }).catch((err)=>{
        console.log(err,"err in line 32");
      });
  }

  handleRequest(req, res) {


      const user_id = req.body.user_id;
      // console.log(req.files);
    
      try{
          Vision.find({user_id : user_id})
          .then(async(user)=>{
                
            let promise = [];
            req.files.forEach((element)=>{
              promise.push(this.process_image(user,element,req)
              .catch((err)=>{
                  console.log(err,"error while inserting image/s");
              }));
            });

            // console.log("promise",promise);

            await Promise.all(promise);

            let found_label = user[0].image_labels;
            let found_filter_label = found_label.find((ele)=>{return (ele.name === "All")});
            return res.status(200).json(found_filter_label["label"]); 

          })
          .catch((err)=>{console.log("err line 94",err)})
      }
      catch(err){
          return res.status(405).send("err in 97th line");
      }
    }
};

module.exports = {AddImage : AddImage};



//for Single file


// const mongoose = require("mongoose");
// const multer = require("multer");
// const fs = require("fs");
// const Vision = require("../../models/vision");
// const {get_features} = require('../../predict');
// const util = require('util');


// class AddImage {


//   handleRequest(req, res) {


//       const user_id = req.body.user_id;
//       // console.log(req.files);
    
//       Vision.find({user_id : user_id})
//       .then(async(user)=>{
            
//         // for(let i=0;i<req.files.length;i++){
//           let features = await get_features(req.file.path);
//           let feature_list = features.slice(0,5);

//           let FS_READFILE = util.promisify(fs.readFile);
//           try{

//                 FS_READFILE(req.file.path)
//                 .then((data) => {

//                 const contentType = req.file.mimetype;
//                 let image_mapping = user[0].image;
//                 // console.log(image_mapping);

//                 image_mapping.push({img_name : req.file.filename,img_label : feature_list,img_data:data});


//                 //for labels
//                 let label_mapping = user[0].image_labels;
//                 if(label_mapping.length == 0){
//                   label_mapping.push({name : "All" ,label : {img_name : req.file.filename,img_buffer : data}});
//                 }
//                 else{
//                     let found = label_mapping.find((ele)=>{return (ele.name === 'All')}); 
//                     if(found !== undefined){
//                       found.label.push({img_name : req.file.filename,img_buffer : data});
//                     }
//                 }

//                 feature_list.forEach(function (item) {

//                   let found = label_mapping.find((ele)=>{return (ele.name === item.name)}); 
//                   if(found !== undefined){
//                     found.label.push({img_name : req.file.filename,img_buffer : data});
//                   }
//                   else{
//                     label_mapping.push({name : item["name"] ,label : {img_name : req.file.filename,img_buffer : data}});
//                   } 
//                 });

//                 const user_id = req.body.user_id;
//                 Vision.updateOne({user_id : user_id},{ 
//                     $set: { 'image': image_mapping ,
//                     'image_labels' : label_mapping
//                   }}).then((user)=>{
//                     console.log(user)
//                   });

//                   let found_label = user[0].image_labels;
//                   let found_filter_label = found_label.find((ele)=>{return (ele.name === "All")});
//                   return res.status(200).json(found_filter_label["label"]);  
                
//                 })
//             }
//           catch(err){
//             console.log(err);
//           }
//         // }

//         // return res.status(200).send({"hello" : "all saved"});
//       })
//       .catch((error)=>{
//         console.log(error);  
//         return res.status(400).json({"msg":error})
//       });
//     }
// };

// module.exports = {AddImage : AddImage};