require('dotenv').load();
var fs = require('fs');
var cloudinary = require('cloudinary').v2;

var uploads = {};

// set your env variable CLOUDINARY_URL or set the following configuration
/* cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: ''
}); */

console.log("** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **");

// File upload
cloudinary.v2.uploader.upload('pizza.jpg', { tags: 'basic_sample' }, function (err, image) {
  console.log();
  console.log("** File Upload");
  if (err) { console.warn(err); }
  console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
  console.log("* " + image.public_id);
  console.log("* " + image.url);
  waitForAllUploads("pizza", err, image);
});