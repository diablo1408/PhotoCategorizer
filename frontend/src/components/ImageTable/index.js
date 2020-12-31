import React from "react";

import ImageCard from "./ImageCard";
import "./style.css";

export default function ImageTable({ images, currentPage, pageSize ,genre}) {
  // console.log("genreimages");
  // console.log(images);
  const currentImages = images.slice(
    (currentPage - 1) * pageSize,
    pageSize * currentPage
  );
  

  // console.log("images present in image table ");
  // console.log(currentImages);
  return (
    <div className="movies-grid">
      {!!images &&
        currentImages.map((image) => (
          <ImageCard image={image} key={image._id} />
        ))}
       
    </div>
  );
}

