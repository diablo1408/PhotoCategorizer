import React from "react";

import FlippingCardFront from "./CardFront";
import "./style.css";

export default function ImageCard({ image }) {
//   const {
//     image,
//     // description,
//   } = image;
// console.log("tableimage");
// console.log(image)


const encodedImage = new Buffer(image.img_buffer, "binary").toString("base64");
const coverImage = "data:image/jpeg;base64," + encodedImage;

//   function flipCard(cardID) {
//     const card = document.getElementById(`${cardID}`);
//     card.classList.toggle("flipped");
//   }

  return (
    <div className="card-container">
      {/* <div className="card-wrapper" id={_id} onClick={() => flipCard(_id)}> */}
        <FlippingCardFront
            coverImage={coverImage}
            // description = {description}
        />
    </div>
  );
}

