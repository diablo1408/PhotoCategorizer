// const mongoose = require("mongoose");
// const multer = require("multer");
// const fs = require("fs");
// const Vision = require("../../models/vision");
// const {get_features} = require('../../predict');
// const util = require('util');


// //for multiple file

// class AddImage {

//   constructor() {
//     this.readFile = util.promisify(fs.readFile);
//   }

//   getStuff(path) {
//     return this.readFile(path);
//   }

//   async process_image(user,element,req){

//     // console.log(user);

//     let features = await get_features(element.path);
//     let feature_list = features.slice(0,5);
//     await this.getStuff(element.path).then(async(data)=>{

//       let image_mapping = user[0].image;
//                 // console.log(image_mapping);

//                 image_mapping.push({img_name : element.filename,img_label : feature_list});


//                 //for labels
//                 let label_mapping = user[0].image_labels;
//                 if(label_mapping.length == 0){
//                   label_mapping.push({name : "All" ,label : {img_name : element.filename}});
//                 }
//                 else{
//                     let found = label_mapping.find((ele)=>{return (ele.name === 'All')}); 
//                     if(found !== undefined){
//                       found.label.push({img_name : element.filename});
//                     }
//                 }

//                 feature_list.forEach(function (item) {

//                   let found = label_mapping.find((ele)=>{return (ele.name === item.name)}); 
//                   if(found !== undefined){
//                     found.label.push({img_name : element.filename});
//                   }
//                   else{
                    
//                     label_mapping.push({name : item["name"] ,label : {img_name : element.filename}});
//                   } 
//                 });

//                 const user_id = req.body.user_id;
//                 Vision.updateOne({user_id : user_id},{ 
//                     $set: { 'image': image_mapping ,
//                     'image_labels' : label_mapping
//                   }}).then((user)=>{
//                     console.log(user)
//                   });

//       }).catch((err)=>{
//         console.log(err,"err in line 32");
//       });
//   }

//   handleRequest(req, res) {


//       const user_id = req.body.user_id;
//       console.log(user_id);
    
//       try{
//           Vision.find({user_id : user_id})
//           .then(async(user)=>{
                
//             let promise = [];
//             req.files.forEach((element)=>{
//               promise.push(this.process_image(user,element,req)
//               .catch((err)=>{
//                   console.log(err,"error while inserting image/s");
//               }));
//             });

//             // console.log("promise",promise);

//             await Promise.all(promise);

//             let found_label = user[0].image_labels;
//             let found_filter_label = found_label.find((ele)=>{return (ele.name === "All")});
//             return res.status(200).json(found_filter_label["label"]); 

//           })
//           .catch((err)=>{console.log("err line 94",err)})
//       }
//       catch(err){
//           return res.status(405).send("err in 97th line");
//       }
//     }
// };

// module.exports = {AddImage : AddImage};

const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const Vision = require("../../models/vision");
const {get_features} = require('../../predictGeneral');
// const {get_nsfw_features} = require('../../predictNSFW');
const {UploadImageByCloudinary} = require("../../cloudinaryUpload");
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

    // console.log(element);
    let promises = [];
    promises.push(UploadImageByCloudinary(element.path));
    promises.push(get_features(element.path));
    const promiseResult = await Promise.all(promises); 
    // console.log(promiseResult);

    const cloudinaryResult = promiseResult[0];
    let features = promiseResult[1];
    let feature_list = features.slice(0,10);
    // let nsfw_features = await get_nsfw_features(element.path);
    // console.log(nsfw_features);
    // console.log(nsfw_features[0].value);
    // console.log(nsfw_features[1].value);

    await this.getStuff(element.path).then(async(data)=>{
              let image_mapping = user[0].image;
                // console.log(image_mapping);
                // image_mapping.push({img_name : element.filename,img_label : feature_list,img_data:data});
                image_mapping.push({img_name : cloudinaryResult,img_label : feature_list});


                //for labels
                let label_mapping = user[0].image_labels;
                if(label_mapping.length == 0){
                  label_mapping.push({name : "All" ,label : {img_name : cloudinaryResult}});
                }
                else{
                    let found = label_mapping.find((ele)=>{return (ele.name === 'All')}); 
                    if(found !== undefined){
                      found.label.push({img_name : cloudinaryResult});
                    }
                }

                feature_list.forEach(function (item) {

                  let found = label_mapping.find((ele)=>{return (ele.name === item.name)}); 
                  if(found !== undefined){
                    found.label.push({img_name : cloudinaryResult});
                  }
                  else{
                    label_mapping.push({name : item["name"] ,label : {img_name : cloudinaryResult}});
                  } 
                });
                // console.log(image_mapping,label_mapping);
                const user_id = req.body.user_id;
                Vision.updateOne({user_id : user_id},{ 
                    $set: { 'image': image_mapping ,
                    'image_labels' : label_mapping
                  }}).then((user)=>{
                   // console.log(user)
                  });

      }).catch((err)=>{
        console.log(err,"err in line 32");
      });
  }

  handleRequest(req, res) {


      const user_id = req.body.user_id;
      // console.log(req.body);
    
      try{
          Vision.find({user_id : user_id})
          .then(async(user)=>{
                // console.log(user);
            let promise = [];
            req.files.forEach(async (element)=>{
              promise.push(this.process_image(user,element,req)
              .catch((err)=>{
                  console.log(err,"error while inserting image/s");
              }));
            });

            // console.log("promise",promise);

            await Promise.all(promise);

            let found_label = user[0].image_labels;
            let found_filter_label = found_label.find((ele)=>{return (ele.name === "All")});
            // console.log(found_filter_label);
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
