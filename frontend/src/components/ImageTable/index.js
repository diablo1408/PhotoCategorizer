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
    <div className="col-md-12">
      <div id="mdb-lightbox-ui"></div>
      <div class="mdb-lightbox ">
        {!!images &&
          currentImages.map((image) => {
            const coverImage = image.img_name;
            // const coverImage = "/uploads/" + image.img_name;
            return (
              // <div className="col-4  " key={image._id}>
              //   <img
              //     src={coverImage}
              //     className="gallery-img"
              //     alt={"cover"}
              //     key={image._id}
              //   />
              // </div>
              <figure class="col-md-4">
              <a href={coverImage} data-size="1600x1067">
                <img src={coverImage} class="img-fluid"/>
              </a>
              </figure>
            );
          })}
      </div>
      </div>
       
   
  );
}
