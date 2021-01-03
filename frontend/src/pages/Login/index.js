import React from "react";
import Joi from "@hapi/joi";
import "../assets/css/bootstrap.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/mdb.css";
import "../assets/css/mdb.lite.css";
import "../assets/css/mdb.lite.min.css";
import "../assets/css/mdb.min.css";
import "../assets/css/style.min.css";
import _ from "lodash";
import { connect } from "react-redux";
import { signIn } from "../../actions/authAction";
// import Button from "../../components/common/Button";
import "./style.css";
// import {Helmet} from 'react-helmet';

class Login extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
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

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
    // console.log(this.state.data);
    e.preventDefault();
    const errors = this.validate();
    if (_.isEmpty(errors)) this.props.signIn(this.state.data);
  };

  saveUserDetais(user,loggedIn){
    // console.log(user);
    // loggedIn = true;
    if(loggedIn){
      localStorage.setItem('loggedIn', true);
    }
  } 


  render() {
    const { data, errors } = this.state;
    const { email, password } = data;
    const { authMessage, loggedIn,userData} = this.props;
    if (loggedIn) this.props.history.push("/dashboard");
    // console.log("logged",loggedIn);
    console.log("error",errors);
    return (
        
      <div class="login-page">
            <div class="mask rgba-stylish-strong h-100 d-flex justify-content-center align-items-center">
            <div class="container">
            <div class="row">
                <div class="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5">

                <div class="card wow fadeIn" data-wow-delay="0.3s">
                    <div class="card-body">

                    <div class="form-header purple-gradient">
                        <h3 class="font-weight-500 my-2 py-1"><i class="fas fa-user"></i> Log in:</h3>
                    </div>

                    {/* <div class="md-form">
                        <i class="fas fa-user prefix white-text"></i>
                        <input
                         type="text" 
                         id="orangeForm-name" 
                         class="form-control"
                         />
                        <label for="orangeForm-name">Your name</label>
                    </div> */}
              <form onSubmit={this.handleSubmit} onClick={this.saveUserDetais(userData,loggedIn)}>
                    <div class="md-form">
                        <i class="fas fa-envelope prefix white-text" style={{color:"black"}}></i>
                        <input
                        type="email"
                        name="email"
                        id="orangeForm-email" 
                        class="form-control"
                        onChange={this.handleChange}
                        value={email}
                        autoFocus
                        />
                        <label for="orangeForm-email">Your email</label>
                        { errors["email"] && <div className="alert alert-danger"> {errors["email"]} </div> }
                    </div>

                    <div class="md-form">
                        <i class="fas fa-lock prefix white-text"></i>
                        <input
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                        id="orangeForm-pass" 
                        class="form-control"
                        />
                        <label for="orangeForm-pass">Your password</label>
                        { errors["password"] && <div className="alert alert-danger"> {errors["password"]} </div> }
                    </div>

                    {authMessage ? (
                        <p className="bg-info text-white">
                        {" "}
                        {authMessage}
                        </p>
                        ) : (
                        <> </>
                      )}


                    <div class="text-center">
                        <button class="btn purple-gradient btn-lg"
                        onClick={this.handleSubmit}>Log In</button>
                        <div class="inline-ul text-center d-flex justify-content-center">
                        {/* <a class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-twitter white-text"></i></a>
                        <a class="p-2 m-2 fa-lg li-ic"><i class="fab fa-linkedin-in white-text"> </i></a>
                        <a class="p-2 m-2 fa-lg ins-ic"><i class="fab fa-instagram white-text"> </i></a> */}
                        <div style = {{
                          display : "flex",
                          flexDirection : "column"
                        }}>
                          <a href="http://localhost:3000/register" style={{
                          color:"blue"}}>New User</a>
                          <div style = {{backgroundColor: "blue",
                                width: "70px",
                                height: "1px"}}/>
                        </div>
                    </div>
                    </div>
                  </form>
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
    loggedIn: state.auth.loggedIn,
    authMessage: state.auth.authMessage,
    userData: state.auth.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
