const Vision = require("../../models/vision");


function compare( a, b ) {
    if(a.label.length < b.label.length) return 1;
    if(a.label.length > b.label.length) return -1;
    return 0;
  }

class GetGenre{
    handleRequest(req,res){
      // console.log(req.params.user_id);
      
      Vision.find({user_id : req.params.user_id})
      .then((user) =>{ 
          let labels = user[0].image_labels;
          labels.sort(compare);
          
          // labels.forEach(element => {
          //   console.log(element.name,element.label.length);
          // });


          labels = labels.slice(0,6);

          // console.log("asd",labels);
          // return res.status(200);
        return res.status(200).json(labels);
        }
      )
      .catch((err) => res.status(500).json({ error: err }))
    }
}


module.exports = {GetGenre : GetGenre};