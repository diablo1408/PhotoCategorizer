import React from 'react';

function resolveAll(options,onChange,active){
  if(options){
    return(
      <div>
        {/* <button class="button button5"><i class ="fas fa-button"></i></button> */}
      <div key = {"all"} className="p-2 bd-highlight "><button type="button" 
      className={
        "btn"
        + 
        ("All" === active ? " btn-info" : " btn-outline-info")
        +
        " btn-rounded waves-effect"
      }
          onClick = {()=> onChange ("All")}>{"All"}</button>
      </div>
      </div>
    );
  }
  return({});
}

const ListGroup = props => {
  let { onChange, options,active } = props;
  // console.log(options);
  return ( 
    <div className="list-group ">  
        <div className="d-flex p-2 bd-highlight mx-md-auto">

            {resolveAll(options,onChange,active)}
        
            {
              options && options.map((ele)=>{
                // console.log("ele",ele.name);
                if(ele.name !== "All"){
                return(
                  
                  <div key = {ele._id} className="p-2 bd-highlight "><button type="button" 
                  className={
                    "btn"
                    +
                     " btn-outline-info"
                    +
                    " btn-rounded waves-effect"
                  }
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

 