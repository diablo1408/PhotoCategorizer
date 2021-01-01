import React from "react";
import { connect } from "react-redux";
import Header from "./header-index";
import Footer from "./footer-index";
import "../assets/css/bootstrap.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/mdb.css";
import "../assets/css/mdb.lite.css";
import "../assets/css/mdb.lite.min.css";
import "../assets/css/mdb.min.css";
import "../assets/css/style.min.css";
// import {Helmet} from "react-helmet";
import "./style.css";

import { ImageTable, Pagination } from "../../components";
import { ListGroup } from "../../components/common";

import { getImages } from "../../actions/imageAction";
import { getGenres ,getAllGenres} from "../../actions/imageAction";

class MainPage extends React.Component{
  
        state = {
            genres: [],
            pageSize: 12,
            currentPage: 1,
            currentGenre : "All",
            filteredGenres: [],
            showOptions: false,
            userInput: '',
            isGenreDisplay : false,


        };
     
componentDidMount() {
    
    this.props.getGenres();
    this.props.getAllGenres();
    this.props.getImages(this.state.currentGenre);
    
}


handleChange = (name ,value) => {
    this.setState({[name]: value, currentPage: 1});
    // console.log("CG",this.state.currentGenre);
    this.props.getImages(value);
};

onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  onOpenGenre = (e) => {
    // console.log(e.target.id);
    this.setState({userInput : e.target.id});
    this.setState({isGenreDisplay : true});
    this.props.getImages(e.target.id);
  }


showSearchList(){
    const showOptions = this.state.showOptions;
    const userInput = this.state.userInput;
    const filteredGenres = this.state.filteredGenres;
// console.log(filteredGenres);
    if (showOptions && userInput) {
        if (filteredGenres.length) {
          return (
            <ul className="options">
              {filteredGenres.map((optionName) => {
                //   console.log(optionName);
                return (
                  <li className={"showList"} 
                  id = {optionName}
                  key={optionName} 
                  onClick={this.onOpenGenre}
                  >
                    {optionName}
                  </li>
                );
              })}
            </ul>
          );
        } else {
            return (
            <div className="no-options">
              <li>No Option!</li>
            </div>
          );
        }
      }
}

changeSearchList = (e) =>{
    // console.log(e.target.value);
        if(e.target.value === ''){
            this.setState({currentGenre : "All", currentPage: 1});
            this.props.getImages("All");
            
            this.setState({
                filteredGenres : [],
                showOptions: false,
                userInput : '',
                isGenreDisplay : false
              });
            
            return;
        }
    
        const  options  = this.props.genreList;
        const userInput = e.target.value;
    
        const filteredGenres = options.filter(
          (optionName) =>
            optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        // console.log(filteredGenres);
    
        this.setState({
          filteredGenres,
          showOptions: true,
          userInput
        });

}


render(){
    const {
        currentPage,
        pageSize,

      } = this.state;
      const { images,genres,loggedIn} = this.props;
    if (!loggedIn) this.props.history.push("/login");
    let filteredImages = [];
    filteredImages = images;
    // console.log("imagesgenres");
    // console.log(images);
    return(
        <div>
            <Header/>
            <main className="pt-5 mx-lg-5">
                <div className="container-fluid mt-5">
                <div className="card mb-4 wow fadeIn">
                    <div className="card-body d-sm-flex justify-content-between">
                    <h4 className="mb-2 mb-sm-0 pt-1">
                        {/* <a href="https://mdbootstrap.com/docs/jquery/" target="_blank">Home Page</a>
                        <span>/</span> */}
                        <span>Dashboard</span>
                    </h4>
                    <div>
                        <form className="d-flex justify-content-center">
                            
                            <input type="search" 
                            placeholder="Type your query" 
                            aria-label="Search" 
                            className="form-control"
                            onChange = {this.changeSearchList}
                            />
                            {/* <button className="btn btn-primary btn-sm my-0 p" type="submit">
                            <i className="fas fa-search"></i>
                            </button> */}
                        </form>
                        {this.showSearchList()}
                    </div>
                    </div>
                </div>
                {/* <a className="dropHeader btn btn-primary dropdown-toggle mr-4" type="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false" >Basic dropdown</a> */}

                {
                this.state.isGenreDisplay
                ?
                <div className="list-group">  
                    <div className="d-flex p-2 bd-highlight mx-md-auto">
                        <div key = {"all"} className="p-2 bd-highlight ">
                            <button type="button" 
                            className={"btn btn-outline-info waves-effect"}>
                                {this.state.userInput}
                            </button>
                        </div>
                    </div>
                </div>
                :
                <ListGroup
                // active={currentGenre}
                onChange={(val) => this.handleChange("currentGenre",val)}
                options={genres}
                />
                
                }


                <div className="col-lg-10 col-sm-12">
                    <p className="text-left text-muted">
                        {!!filteredImages.length ? `${filteredImages.length} ` : "0 "}
                        Images found.
                    </p>

                    {!!filteredImages ? (
                        <ImageTable
                            pageSize={pageSize}
                            currentPage={currentPage}
                            images={filteredImages}
                            // genre = {currentGenre}
                        />
                    ) : (
                        <h1 className="text-white">No Images</h1>
                    )}
                    <br />
                    <Pagination
                        itemsCount={filteredImages.length}
                        pageSize={pageSize}
                        onPageChange={this.onPageChange}
                        currentPage={currentPage}
                    />
                </div>
                </div>
            </main>
            <Footer/>
            
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
      getImages: (genre) => dispatch(getImages(genre)),
      getGenres: () => dispatch(getGenres()),
      getAllGenres: () => dispatch(getAllGenres()),
    };
  };

const mapStateToProps = (state) => {
    return {
      images: state.image.images,
      genres: state.image.genres,
      genreList: state.image.genreList,
      loggedIn: state.auth.loggedIn,
    };
  };
  

  
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);