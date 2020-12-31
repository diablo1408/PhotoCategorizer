const mongoose = require("mongoose");

const visionSchema = mongoose.Schema({
  user_id:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    image:[{img_name : String,img_label : [],img_data : {type : Buffer}}],
    image_labels:[{name : String,label : [{img_name : String,img_buffer : Buffer}]}] 
    
});
const Vision = mongoose.model("Vision", visionSchema, "visions");

module.exports = Vision;