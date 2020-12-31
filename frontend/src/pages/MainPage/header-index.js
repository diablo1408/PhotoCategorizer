import React from "react";
import img from "../assets/img/avatar-icon-images-4.jpg";
import "../assets/css/bootstrap.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/mdb.css";
import "../assets/css/mdb.lite.css";
import "../assets/css/mdb.lite.min.css";
import "../assets/css/mdb.min.css";
import "../assets/css/style.min.css";
import FileUpload from "./file_upload"
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
// import {Helmet} from 'react-helmet';
import { userDetail,signOut} from "../../actions/authAction";
// import {appendScript} from "../appendScript";
import MultiDropDown from "./MultiDropDown";
// import "../assets/js/mdb.js";

class Header extends React.Component{
    state = {
        logout_status : localStorage.getItem('loggedIn'),
    };

    componentDidMount(){
        // const fpath = "/assets/";
        // let scripts = [
        //     "js/jquery-3.4.1.min.js"
        //     // "js/popper.min.js",
        //     // "js/bootstrap.min.js",
        //     // "js/mdb.min.js",
        //     // "js/dropdown_label_select.js",
        // ];
        // for(let i = 0;i<scripts.length ;i++){
        //     const script = scripts[i];
        //     appendScript(fpath + script);
        // }

        this.props.userDetail();
    }


    LogOut = () => {
        this.setState({logout_status : false});
        localStorage.setItem('loggedIn', false);
        this.props.signOut();
    }

    render(){
        const { authMessage,userData} = this.props;

        let coverImage = img;

        if(userData.user_image !== undefined){
            const encodedImage = new Buffer(userData.user_image, "binary").toString("base64");
            coverImage = "data:image/jpeg;base64," + encodedImage;
        }
        if(coverImage === "data:image/jpeg;base64,"){coverImage = img;}
        
        
        if(!this.state.logout_status){
            return <Redirect to="/login" />
        }

        return(
            <header>

                <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                    <div className="container-fluid">
                        {/* <a class="navbar-brand waves-effect" href="https://mdbootstrap.com/docs/jquery/" target="_blank">
                        <strong class="blue-text"></strong>
                        </a> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className = "navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                <div className="dropdown">
                                <FileUpload/>
                                </div>
                                </li>
                                <MultiDropDown/>
                                <li className="nav-item">
                                    <div className="dropdown ">
                                    <img style = {{borderRadius : "50%",
                                    width : "50px",height : "50px",marginTop: "3px"
                                    }} src={coverImage} alt="Avatar" className="avatar dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    />

                                    <div className="dropdown-menu  dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item " id="filebtn" href="http://localhost:3000/profile">My Profile</a>
                                    <a className="dropdown-item " id="filebtn2" onClick={this.LogOut}>Log out</a>
                                    </div>
                                    
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            
                <div className="sidebar-fixed position-fixed">
                    <a className="logo-wrapper waves-effect">
                        <h2><strong className="blue-text ">PhotoCat</strong></h2>
                    </a>
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item active waves-effect">
                        <i className="fas fa-chart-pie mr-3"></i>Photos
                        </a>
                        {/* <a href="http://localhost:3000/profile" class="list-group-item list-group-item-action waves-effect">
                        <i class="fas fa-user mr-3"></i>Profile</a> */}
                    </div>
                </div>
    
{/* 
        <Helmet>
            <meta charSet="utf-8" />
            <script type="text/javascript" src={"./js/jquery-3.4.1.min.js"} />
            
            <script type="text/javascript" src={"./js/popper.min.js"} />
            <script type="text/javascript" src={"./js/bootstrap.min.js"} />
            <script type="text/javascript" src={"./js/mdb.min.js"} />
        </Helmet> */}
{/* <script
                src={"https://code.jquery.com/jquery-3.5.1.min.js"}
                integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
                crossorigin="anonymous"/> */}


            </header>
        );
    }
}

const mapStateToProps = (state) => {
return {
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        userDetail: () => dispatch(userDetail()),
    };
};

  export default connect(mapStateToProps, mapDispatchToProps)(Header);
