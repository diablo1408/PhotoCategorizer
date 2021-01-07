import React from "react";
import "./style.css";

export default function ImageTable({ images, currentPage, pageSize, genre }) {
  // console.log("genreimages");
  // console.log(images);
  const currentImages = images.slice(
    (currentPage - 1) * pageSize,
    pageSize * currentPage
  );

  // console.log("images present in image table ");
  // console.log(currentImages);
  return ( 
    <div className="row row-eq-height">
      {!!images &&
        currentImages.map((image) => {
          const encodedImage = new Buffer(image.img_buffer, "binary").toString(
            "base64"
          );
          const coverImage = "data:image/jpeg;base64," + encodedImage;
          // const coverImage = "/uploads/" + image.img_name;
         return( <div className="col-4  " key = {image._id}>
                <img src={coverImage} className="gallery-img" alt={"cover"} key = {image._id}/>
                </div>
          )
        })}
       
    </div>
  );
}
