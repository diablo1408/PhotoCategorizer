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

import { ImageTable, Pagination } from "../../components";
import { ListGroup } from "../../components/common";

import { getImages } from "../../actions/imageAction";
import { getGenres } from "../../actions/imageAction";

class MainPage extends React.Component{
  
        state = {
            genres: [],
            pageSize: 12,
            currentPage: 1,
            currentGenre : "All",

        };
     
componentDidMount() {
    
    this.props.getGenres();
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
                    <form className="d-flex justify-content-center">
                        
                        <input type="search" placeholder="Type your query" aria-label="Search" className="form-control"/>
                        <button className="btn btn-primary btn-sm my-0 p" type="submit">
                        <i className="fas fa-search"></i>
                        </button>
                    </form>
                    </div>
                </div>
                {/* <a className="dropHeader btn btn-primary dropdown-toggle mr-4" type="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false" >Basic dropdown</a> */}

                <ListGroup
                // active={currentGenre}
                onChange={(val) => this.handleChange("currentGenre",val)}
                options={genres}
                />
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
    };
  };

const mapStateToProps = (state) => {
    return {
      images: state.image.images,
      genres: state.image.genres,
      loggedIn: state.auth.loggedIn,
    };
  };
  

  
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);