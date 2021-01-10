import React from "react";

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
   
     
      <div class="mdb-lightbox ">
        {!!images &&
          currentImages.map((image) => {
            const coverImage = image.img_name;
            console.log("upload_image",coverImage);
            return (
             
              <figure className="container-img" >
              <a href={coverImage} data-size="1600x1067">
                <img src={coverImage} class="img-fluid"/>
                <div class="delete-icon"><i class="far fa-trash-alt fa-lg"/></div>
                
              </a>
             
              
              </figure>
            );
          })}
      </div>
     
       
   
  );
}
