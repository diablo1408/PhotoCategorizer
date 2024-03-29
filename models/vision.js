// const mongoose = require("mongoose");

// const visionSchema = mongoose.Schema({
//   user_id:{
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'User'
//     },
//     image:[{img_name : String,img_label : []}],
//     image_labels:[{name : String,label : [{img_name : String}]}] 
    
// });
// const Vision = mongoose.model("Vision", visionSchema, "visions");

// module.exports = Vision;

// //image:[{img_name : String,img_label : [],img_data : {type : Buffer}}],


const mongoose = require("mongoose");

const visionSchema = mongoose.Schema({
  user_id:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    image:[{img_name : String,img_label : []}],
    image_labels:[{name : String,label : [{img_name : String}]}] 
    
});
const Vision = mongoose.model("Vision", visionSchema, "visions");

module.exports = Vision;

//image:[{img_name : String,img_label : [],img_data : {type : Buffer}}],