const Vision = require("../../models/vision");


function compare( a, b ) {
    if(a.label.length === b.label.length){return 0;}
    return a.label.length > b.label.length;
  }

class GetGenre{
    handleRequest(req,res){
      // console.log(req.params.user_id);
      
      Vision.find({user_id : req.params.user_id})
      .then((user) =>{ 
          let labels = user[0].image_labels;
          labels.sort(compare);  
          labels = labels.slice(0,5);
          // console.log(labels);
        return res.status(200).json(labels);
        }
      )
      .catch((err) => res.status(500).json({ error: err }))
    }
}


module.exports = {GetGenre : GetGenre};