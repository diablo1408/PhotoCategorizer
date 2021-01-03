import React from "react";
import { connect } from "react-redux";
import { downloadGenres, getGenres } from "../../actions/imageAction";
class MultiDropDown extends React.Component{
        
    state = {
            genreList : []

    }
        
    componentDidMount(){
        this.props.getGenres();
        
    }

    onChangeCheck = (e) => {
        // console.log(e.target.name,e.target.checked);
        let name = e.target.name;
        
        let tempGenreList = this.state.genreList;
        let found = tempGenreList.find((ele) => {return (ele.name === name)});

        if(found === undefined){
            tempGenreList.push({"name" : name , "checked" : true});
        }
        else{
            for(let i=0;i<tempGenreList.length;i++){
                if(tempGenreList[i].name === name){
                    tempGenreList[i].checked = !tempGenreList[i].checked;
                    break;
                }
            }
        }
        this.setState({genreList : tempGenreList});
    }

    handleDownload = (e) => {
        e.preventDefault();

        
        let DownloadGenreList = [];
        let tempGenreList = this.state.genreList;
        for(let i=0;i<tempGenreList.length;i++){
            if(tempGenreList[i].checked === true){
                DownloadGenreList.push(tempGenreList[i].name);
            }
        }
        // console.log(DownloadGenreList);
        this.props.downloadGenres(DownloadGenreList);

        alert("downloading... Please wait");
    }


    render(){
        const { genres} = this.props;
        // console.log(this.state.genreList);
       return(

            <li className="nav-item">
                <div className="dropdown  multiple-select-dropdown">
                    <button className=" btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">Import</button>
                    <form className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                      
                    <a className="dropdown-item">
                        <div className="custom-control custom-checkbox"
                        >
                        <input type="checkbox" className="custom-control-input" id="checkbox1" name = {"All"}
                        onChange = {this.onChangeCheck}
                        />

                        <label className="custom-control-label" htmlFor="checkbox1">All</label>
                        </div>
                    </a>
                    {   
                        genres.map((ele)=>{
                            return(
                                
                                <a className="dropdown-item" >
                                    <div className = "custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id={ele._id}
                                    name = {ele.name}
                                    onChange = {this.onChangeCheck}
                                    />
                                    <label className="custom-control-label" htmlFor={ele._id}>{ele.name}</label>
                                    </div>
                                </a>
                            );
                          })
                    }
                        <div className="dropdown-divider"></div>
                        <a className ="dropdown-item" href="">
                        <button type="button" className="btn btn-light btn-sm" 
                        onClick = {this.handleDownload}>Download</button> 
                        </a>
                    </form>
                    
                </div>
            </li>
        );
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
      getGenres: () => dispatch(getGenres()),
      downloadGenres : (genre_list) => dispatch(downloadGenres(genre_list))
    };
  };

const mapStateToProps = (state) => {
    return {
      genres: state.image.genres,
    };
  };
  

  
export default connect(mapStateToProps, mapDispatchToProps)(MultiDropDown);

