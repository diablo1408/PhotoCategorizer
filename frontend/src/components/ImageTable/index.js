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
    <div className="row">
      {!!images &&
        currentImages.map((image) => {
          const encodedImage = new Buffer(image.img_buffer, "binary").toString(
            "base64"
          );
          const coverImage = "data:image/jpeg;base64," + encodedImage;
         return( <div className="col-3  ">
                <img src={coverImage} className="gallery-img" alt={"cover"} />
         </div>
            
             
            
          )
        })}
       
    </div>
  );
}
