const Vision = require("../../models/vision");


class GetAllImage{
    handleRequest(req,res){
      // console.log(req.params);
      Vision.find({user_id : req.params.user_id})
      .then((user) =>{
        
        // console.log(user);
        let label_mapping = user[0].image_labels;
        let found = label_mapping.find((ele)=>{return (ele.name === req.params.label)});
        // console.log(found.label);
        if(found === undefined){return res.status(200).json({"image" : []});}
        let found_label = found.label;
        // return res.status(200).send(found_label);
        return res.status(200).json({"image":found_label})
        }
      )
      .catch((err) => console.log(err))
    }
}


module.exports = {GetAllImage : GetAllImage};