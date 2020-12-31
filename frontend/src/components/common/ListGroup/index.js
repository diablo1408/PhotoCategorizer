import React from 'react';
import "./style.css";

function resolveAll(options,onChange){
  if(options){
    return(
      <div>
        {/* <button class="button button5"><i class ="fas fa-button"></i></button> */}
      <div key = {"all"} className="p-2 bd-highlight "><button type="button" className={"btn btn-outline-info waves-effect"}
          onClick = {()=> onChange ("All")}>{"All"}</button>
      </div>
      </div>
    );
  }
  return({});
}

const ListGroup = props => {
  let { onChange, options } = props;
  // console.log(options);
  return ( 
    <div className="list-group">  
        <div className="d-flex p-2 bd-highlight mx-md-auto">

            {resolveAll(options,onChange)}
        
            {
              options && options.map((ele)=>{
                // console.log("ele",ele.name);
                if(ele.name !== "All"){
                return(
                  
                  <div key = {ele._id} className="p-2 bd-highlight "><button type="button" className={"btn btn-outline-info waves-effect"}
                  onClick = {()=> onChange (ele.name)}>{ele.name}</button>
                  </div>
                );
                }
              })

            }
        </div>
    </div>
  );
}
export default ListGroup;

// function CheckClass(genre, active) {
//   const classButtons = "list-group-item list-item";
//   return genre === active ? classButtons + ' list-item-active' :  classButtons;
// }
 