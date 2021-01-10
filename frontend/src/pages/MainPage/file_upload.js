import React from "react";
import { connect } from "react-redux";
import { addImage,getImages,showLoader,hideLoader } from "../../actions/imageAction";
class FileUpload extends React.Component{


    handleUpload = (e) => {
      //  e.preventDefault();
      
       
        //for multiple files
        this.props.addImage(e.target.files);
       

        //for one file

        // this.props.addImage(e.target.files[0]);
        // this.setState({refresh : true});
      };

    render(){
        return (
          <div>
            
            <input
            id = "input_file"
            name="image_input_file"
            onChange={this.handleUpload}
            accept="image/*"
            type="file"
            style={{visibility : "hidden"}}
            multiple = {"multiple"}
            />
            
            <a className=" btn btn-secondary" onClick = {()=>document.getElementById('input_file').click()} htmlFor="file"  aria-haspopup="true"
            aria-expanded="false" >Upload</a>
  
         </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addImage: (image) => dispatch(addImage(image)),
      getImages: (genre) => dispatch(getImages(genre)),
    };
  };
  
  const mapStateToProps = (state) => {
    return {

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
  