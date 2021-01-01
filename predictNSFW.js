const Clarifai = require('clarifai');
var fs = require('fs');
const app = new Clarifai.App({apiKey: '682d567f182743ac808a31c2f2ece3cd'});


async function get_features(file){
    // read binary data
    var bitmap = fs.readFileSync(file);

    // convert binary data to base64 encoded string
    let base64str=  new Buffer.from(bitmap).toString('base64');
  
    return await app.models.predict(Clarifai.NSFW_MODEL, {base64: base64str}).then(
      function(response) {
        // do something with response
        concepts = response['outputs'][0]['data']['concepts']
        let resp = [];

        concepts.forEach(function (item) {
          resp.push({name:item.name,value: item.value}); 
      });
      console.log(resp);
      return resp; 
      },
      function(err) {
        // there was an error
        console.log(err);
      }
    );
}

get_features("./uploads/download.jpeg");
module.exports = {get_features:get_features};