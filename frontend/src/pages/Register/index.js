import React from "react";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import { getOTP, signUpandVerify } from "../../actions/authAction";
import "./style.css";





class RegisterForm extends React.Component {
  state = {
    data: {
      username:"",
      email: "",
      password: "",
      otp : "",
    },
    isVerify : false,
    errors: {},
    passwordError: "",
  };

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
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
      if((this.state.data.username !== "") && 
        (this.state.data.email !== "") && 
        (this.state.data.username !== "")){
            this.setState({isVerify : true});
      }
      this.props.getOTP(this.state.data.email);
    };

  handleVerify = (e) =>{
    e.preventDefault();
    // console.log(this.state.data,"verfiy");

    if((this.state.data.username !== "") && 
      (this.state.data.email !== "") && 
      (this.state.data.username !== "") &&
      (this.state.data.otp !== "")){
        const {username, password, email ,otp} = this.state.data;
        this.props.signUpandVerify({username, email, password ,otp});
      }
  }

  handleResend = (e) => {
    e.preventDefault();
    this.props.getOTP(this.state.data.email);
  }


  schema = {
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    otp: Joi.string().min(6).max(6),
  };


  saveUserDetais(user,loggedIn){
    // console.log(user);

    if(user.userData === undefined){return;}

    if(loggedIn){
      localStorage.setItem('loggedIn', true);
      console.log(user);
      if(localStorage.getItem('loggedIn') === 'true'){  
        localStorage.setItem('name',user.userData._id);
      }
    }
  }

  render() {
    const { authMessage,userData ,loggedIn } = this.props;
    // console.log(loggedIn);
    const { errors, passwordError } = this.state;
    const { username, email, password, otp} = this.state.data;
    if (loggedIn) this.props.history.push("/dashboard");

    return (
        <div class="register-page">
          <div class="mask rgba-gradient">
            <div class="container h-100 d-flex justify-content-center align-items-center">
    
              <div class="row pt-5">
    
                <div class="col-md-12">
    
                  <div class="card">
                    <div class="card-body">
    
                      <h2 class="font-weight-bold my-4 text-center mb-5 mt-4 font-weight-bold">
                        <strong>REGISTER</strong>
                      </h2>
                      
    
                      <div class="row mt-5">
    
                        <div class="col-md-6 ml-lg-5 ml-md-3">
    
                          {/* <div class="row pb-4">
                            <div class="col-2 col-lg-1">
                              <i class="fas fa-university indigo-text fa-lg"></i>
                            </div>
                            <div class="col-10">
                              <h4 class="font-weight-bold mb-4">
                                <strong>Safety</strong>
                              </h4>
                              <p class="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam
                                minima assumenda deleniti hic.</p>
                            </div>
                          </div> */}
                          {/* <div class="row pb-4">
                            <div class="col-2 col-lg-1">
                              <i class="fas fa-desktop deep-purple-text fa-lg"></i>
                            </div>
                            <div class="col-10">
                              <h4 class="font-weight-bold mb-4">
                                <strong>Technology</strong>
                              </h4>
                              <p class="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam
                                minima assumenda deleniti hic.</p>
                            </div>
                          </div> */}
                          <div class="row pb-4">
                            <div class="col-2 col-lg-1">
                              {/* <i class="far fa-money-bill-alt purple-text fa-lg"></i> */}
                            </div>
                            <div class="col-10">
                              {/* <h4 class="font-weight-bold mb-4">
                                <strong>Finance</strong>
                              </h4> */}
                              {/* <p class="">PhotoCAT is a Image Categorizor/ Image Search engine which help users to sort his/her images in certain categories which makes it simple for the users to find specific picture or a collection of pictures according to their needs.</p> */}
                            </div>
                          </div>
                        </div>
                        <div class="col-md-5">
                          <div class="row pb-4 d-flex justify-content-center mb-4">
    
                            <h4 class="mt-3 mr-4">
                              <strong>Register with</strong>
                            </h4>
    
                            {/* <div class="inline-ul text-center d-flex justify-content-center">
                              <a class="p-2 m-2 fa-lg tw-ic">
                                <i class="fab fa-twitter fa-lg indigo-text"></i>
                              </a>
                              <a class="p-2 m-2 fa-lg li-ic">
                                <i class="fab fa-linkedin-in fa-lg indigo-text"> </i>
                              </a>
                              <a class="p-2 m-2 fa-lg ins-ic">
                                <i class="fab fa-instagram fa-lg indigo-text"> </i>
                              </a>
                            </div> */}
    
                            <h4 class="mt-3 ml-4">
                              <strong>or:</strong>
                            </h4>
    
                          </div>
                          <form onSubmit={this.handleSubmit} onClick={this.saveUserDetais(userData,loggedIn)}>


                                <div class="md-form">
                                    <i class="fas fa-user prefix"></i>
                                    <input
                                    type = "text"
                                    name="username"
                                     id="orangeForm-name" 
                                    class="form-control"
                                    error={errors["username"]}
                                    onChange={this.handleChange}
                                    value = {username}
                                    />
                                    <label for="orangeForm-name">Your name</label>
                                </div>
                                <div class="md-form">
                                    <i class="fas fa-envelope prefix"></i>
                                    <input
                                    name="email"
                                    id="orangeForm-email" 
                                    class="form-control"
                                    type="email"
                                    error={errors["email"]}
                                    onChange={this.handleChange}
                                    value = {email}
                                    />
                                    <label for="orangeForm-email">Your email</label>
                                </div>
            
                                <div class="md-form">
                                    <i class="fas fa-lock prefix"></i>
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
                                        <i class="fas fa-key prefix"></i>
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


                                {authMessage || passwordError ? (
                                <p className="bg-info text-white">
                                {" "}
                                {authMessage} {passwordError}
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
                                  >Verify</button>
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
                                  <button class="btn btn-indigo btn-rounded mt-5"                 
                                  type="button"
                                  onClick={this.handleSubmit}
                                  >Sign up</button>
                                  </div>
                              
                                }

                                  

                        </form>
                        </div>
                       
                        <div style = {{
                          display : "flex",
                          flexDirection : "column"
                        }}>
                          <a href="http://localhost:3000/login" style={{
                            marginLeft : "525px",color:"blue"
                            }}>I'm already a member</a>
                          <div style = {{backgroundColor: "blue",
                                width: "154px",
                                height: "1px",
                                marginLeft : "525px"}}/>
                        </div>
                        
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* <Helmet>
              <meta charSet="utf-8" />
              <script type="text/javascript" src={"./js/jquery-3.4.1.min.js"} />
              <script type="text/javascript" src={"./js/popper.min.js"} />
              <script type="text/javascript" src={"./js/bootstrap.min.js"} />
              <script type="text/javascript" src={"./js/mdb.min.js"} />
          </Helmet> */}
      
      </div>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    loggedIn: state.auth.loggedIn,
    authMessage: state.auth.authMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUpandVerify: (creds) => dispatch(signUpandVerify(creds)),
    getOTP: (email) => dispatch(getOTP(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

