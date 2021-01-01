const Vision = require("../../models/vision");


class GetAllGenres{
    handleRequest(req,res){
      
      Vision.find({user_id : req.params.user_id})
      .then((user) =>{ 
          let labels = user[0].image_labels;

          let allGenre = [];
          labels.forEach(element => {
              allGenre.push(element.name);
          });
        //  console.log(allGenre);
        return res.status(200).json(allGenre);
        }
      )
      .catch((err) => res.status(500).json({ error: err }))
    }
}


module.exports = {GetAllGenres : GetAllGenres};