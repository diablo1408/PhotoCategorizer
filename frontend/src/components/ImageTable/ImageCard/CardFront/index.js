import React from "react";
import "./style.css";
const CardFront = ({
    coverImage,
    description,
}) => {
  
  return (
    <div className="front">
      <img src = {coverImage} alt={"cover"}/>
    
      {/* <div className="card-footer">
        <p>
          {description}
        </p>
      </div> */}
    </div>
  );
};
export default CardFront;

