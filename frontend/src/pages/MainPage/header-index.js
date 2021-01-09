import React from "react";
import img from "../assets/img/avatar-icon-images-4.jpg";
import FileUpload from "./file_upload";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userDetail, signOut } from "../../actions/authAction";
import MultiDropDown from "./MultiDropDown";

class Header extends React.Component {
  state = {
    logout_status: localStorage.getItem("loggedIn")
  };

  componentDidMount() {
   this.props.userDetail();
  }

  LogOut = () => {
    this.setState({ logout_status: false });
    localStorage.setItem("loggedIn", false);
    this.props.signOut();
  };

  render() {
    const { authMessage, userData } = this.props;

    let coverImage = img;
    if(userData.user_image !== ""){
      coverImage = userData.user_image;
    }
    // if(this.state.userData !== undefined){
    //   const encodedImage = new Buffer(userData.user_image, "binary").toString(
    //     "base64"
    //   );
    //   coverImage = "data:image/jpeg;base64," + encodedImage;
    // }

    // console.log(userData.user_image);

    if (!this.state.logout_status) {
      return <Redirect to="/login" />;
    }

    return (
      <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
          
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div className="dropdown">
                    <FileUpload />
                  </div>
                </li>
                <MultiDropDown />
                <li className="nav-item">
                  <div className="dropdown ">
                    <img
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        marginTop: "3px",
                      }}
                      src={coverImage}
                      alt="Avatar"
                      className="avatar dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                    />

                    <div
                      className="dropdown-menu  dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item "
                        id="filebtn"
                        href="http://localhost:3000/profile"
                      >
                        My Profile
                      </a>
                      <a
                        className="dropdown-item "
                        id="filebtn2"
                        onClick={this.LogOut}
                      >
                        Log out
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="sidebar-fixed position-fixed">
          <a className="logo-wrapper waves-effect">
            <h2>
              <strong className="blue-text ">PhotoCat</strong>
            </h2>
          </a>
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item active waves-effect">
              <i className="far fa-images mr-3"></i>Photos
            </a>
            {/* <a href="http://localhost:3000/profile" class="list-group-item list-group-item-action waves-effect">
                        <i class="fas fa-user mr-3"></i>Profile</a> */}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
    // images: state.image.images,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    userDetail: () => dispatch(userDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
