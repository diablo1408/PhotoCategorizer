import React from "react";
import { connect } from "react-redux";
import { addImage } from "../../actions/imageAction";
import "../assets/css/bootstrap.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/mdb.css";
import "../assets/css/mdb.lite.css";
import "../assets/css/mdb.lite.min.css";
import "../assets/css/mdb.min.css";
import "../assets/css/style.min.css";
import { getImages } from "../../actions/imageAction";

class FileUpload extends React.Component{

    state = {
      // refresh : false,
    };
    componentDidMount(){
      
    }
    componentDidUpdate(){
      // this.props.getImages("All");
    }

    handleUpload = (e) => {
        e.preventDefault();
        // console.log(e.target.files)

        //for multiple files
        this.props.addImage(e.target.files);

        //for one file

        // this.props.addImage(e.target.files[0]);
        // this.setState({refresh : true});
      };

    render(){
      // if(this.state.refresh){
      //   this.setState({refresh : false});
      // }
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
  