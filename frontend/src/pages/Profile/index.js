import React from "react";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import { getOTP, updateandVerify ,userDetail,addUserImage,signOut} from "../../actions/authAction";

// import {Helmet} from 'react-helmet';
import { Redirect } from 'react-router-dom';

class Profile extends React.Component {
  state = {
    data: {
      username:"",
      email: "",
      password: "",
      otp : "",
    },
    errors: {},
    isVerify : false,
  };
  
  componentDidMount(){
    this.props.userDetail();
  }

  LogOut = () => {
    localStorage.setItem('loggedIn', false);
    this.props.signOut();
}


  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // console.log("input");
    // console.log(input);

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };


  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    result.error.details.forEach(
      (element) => (errors[element.path[0]] = element.message)
    );
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
      
      if(this.state.data.email !== ""){
        this.setState({isVerify : true});
        this.props.getOTP(this.state.data.email);
      }
      else{
        // console.log("ehrbfuehbf");
        const {username, password, email ,otp} = this.state.data;
        this.props.updateandVerify({username, email, password ,otp});
      }
    };

  handleVerify = (e) =>{
    e.preventDefault();
    // console.log(this.state.data,"verfiy");
    const {username, password, email ,otp} = this.state.data;
    this.props.updateandVerify({username, email, password ,otp});
  }

  handleResend = (e) => {
    e.preventDefault();
    this.props.getOTP(this.state.data.email);
  }

  
  handleUpload = (e) => {
    e.preventDefault();
    this.props.addUserImage(e.target.files[0]);
  };


  schema = {
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    otp: Joi.string().min(6).max(6),
  };


  render() {
    
    const { authMessage,userData} = this.props;
    const { username, email, password, otp} = this.state.data;
    const {errors} = this.state;
    // console.log("user",userData);
    if(localStorage.getItem('loggedIn') === 'false'){
      return <Redirect to = {"/login"} />
  }

  let coverImage;

        if(userData.user_image !== undefined){
            const encodedImage = new Buffer(userData.user_image, "binary").toString("base64");
            coverImage = "data:image/jpeg;base64," + encodedImage;
        }
        if(coverImage === "data:image/jpeg;base64,"){coverImage = "https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg";}
    return (
        <div>
          <header>

          <div id="slide-out" class="side-nav sn-bg-4 fixed">
          
            <div class="sidenav-bg mask-strong"></div>
          </div>
          <nav class="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav">
            {/* <div
              style = {{fontSize: "x-large",
                fontWeight : "400",
                color: "blue"}}
            >PhotoCat</div> */}
            <ul class="nav navbar-nav nav-flex-icons ml-auto">
              <li class="nav-item dropdown">
             
                <a class="nav-link " href="/dashboard" id="userDropdown" style = {{color : "black"}}>
                  <i class="fas fa-home"></i> <span class=" clearfix d-none d-sm-inline-block">Dashboard</span>
                </a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link waves-effect" onClick={this.LogOut} style = {{color : "black"}}><i class="fas fa-sign-out-alt"></i> <span class="clearfix d-none d-sm-inline-block">Log out</span></a>
              </li>
              
            </ul>

          </nav>
          </header>
          <main style = {{paddingLeft : "0px"}}>
          <div class="container-fluid">

            <section class="section">
              <div class="rowp">
                <div class="col-lg-4 mb-4">

                  <div class="card card-cascade narrower">

                    <div class="view view-cascade gradient-card-header mdb-color lighten-3">
                      <h5 class="mb-0 font-weight-bold">Edit Photo</h5>
                    </div>
                    <div class="card-body card-body-cascade text-center">
                      <img src={coverImage} style = {{
                        width: "75%",height: "56%"}} 
                        alt="User Photo" class="z-depth-1 mb-3 mx-auto" />

                      <div class="rowp flex-center">
                      <input
                          id = "user_input_file"
                          name="image_input_file"
                          onChange={this.handleUpload}
                          accept="image/*"
                          type="file"
                          style={{visibility : "hidden"}}
                          />
            
                      <a class=" btn btn-info btn-rounded btn-sm" 
                      onClick = {()=>document.getElementById('user_input_file').click()} 
                      for="file"  aria-haspopup="true"
                      aria-expanded="false" >Upload your photo</a>

                        {/* <button class="btn btn-info btn-rounded btn-sm">Upload New Photo</button><br/> */}
                        {/* <button class="btn btn-danger btn-rounded btn-sm">Delete</button> */}
                      </div>
                    </div>
                
                  </div>
                
                </div>
                
                <div class="col-lg-8 mb-4">

                  <div class="card card-cascade narrower">

                    <div class="view view-cascade gradient-card-header mdb-color lighten-3">
                      <h5 class="mb-0 font-weight-bold">Account Details</h5>
                    </div>
                  
                    <div class="card-body card-body-cascade text-center">

                      <form onSubmit={this.handleSubmit}>



                      <div class="md-form">
                                  
                                    <input
                                    type = "text"
                                    name="username"
                                     id="orangeForm-name" 
                                    class="form-control"
                                    error={errors["username"]}
                                    onChange = {this.handleChange}
                                    value = {username}
                                    // value = {username}
                                  
                                    />
                                    <label for="orangeForm-name">Your name</label>
                                </div>
                                <div class="md-form">
                                   
                                    <input
                                    name="email"
                                    id="orangeForm-email" 
                                    class="form-control"
                                    type="email"
                                    error={errors["email"]}
                                    onChange={this.handleChange}
                                    //value = {email}
                                   value = {email}
                                    />
                                    <label for="orangeForm-email">Your email</label>
                                </div>
            
                                <div class="md-form">
                                    
                                    <input
                                    name="password"
                                    id="orangeForm-pass" 
                                    class="form-control"
                                    type="password"
                                    error={errors["password"]}
                                    onChange={this.handleChange}
                                    // label="password"
                                    value = {password}
                                    />
                                    <label for="orangeForm-pass">Your password</label>
                                </div>

                                {
                                  this.state.isVerify ?                       
                                      <div class="md-form">
                                        <i class="fas fa-key prefix set_icon"></i>
                                        <input
                                        type = "text"
                                        name="otp"
                                        id="orangeForm-otp" 
                                        class="form-control"
                                        error={errors["otp"]}
                                        onChange={this.handleChange}
                                        value = {otp}
                                        />
                                        <label for="orangeForm-otp">Enter OTP</label>
                                    </div>
                                  : 
                                  ""
                                }


                                {authMessage ? (
                                <p className="bg-info text-white">
                                {" "}
                                {authMessage}
                                </p>
                                ) : (
                                <> </>
                                )}
                                {
                                  this.state.isVerify
                                ?
                                <div style = {{display : "flex"}}>
                                  <div class="text-center"> 
                                  <button class="btn btn-indigo btn-rounded mt-5"                 
                                  type="button"
                                  onClick={this.handleVerify}
                                  >{"Verify & Update"}</button>
                                  </div> 
                                  
                                  <div class="text-center"> 
                                  <button class="btn btn-indigo btn-rounded mt-5"                 
                                  type="button"
                                  onClick={this.handleResend}
                                  >Resend</button>
                                  </div>  
                                </div>
                                :
                                  <div class="text-center"> 
                                  <button class="btn btn-info btn-lg btn-rounded mt-5"                 
                                  type="button"
                                  onClick={this.handleSubmit}
                                  >Update</button>
                                  </div>
                              
                                }
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          </main>
      
    </div> 
    );
  }
}
const mapStateToProps = (state) => {
  return {
   
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userDetail: () => dispatch(userDetail()),
    updateandVerify: (creds) => dispatch(updateandVerify(creds)),
    getOTP: (email) => dispatch(getOTP(email)),
    signOut: () => dispatch(signOut()),
    addUserImage: (image) => dispatch(addUserImage(image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);