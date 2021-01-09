import React from "react";
import Joi from "@hapi/joi";
// import { Redirect } from 'react-router-dom';
import _ from "lodash";
import { connect } from "react-redux";
import { forgotandverify, forgotandupdate } from "../../actions/authAction";

class ForgotPassword extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      repassword: "",
      otp: "",
    },
    errors: {},
    passwordError: "",
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    repassword: Joi.string().required().label("Password"),
    otp: Joi.string().min(6).max(6),
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
    e.preventDefault();
    const errors = this.validate();
    if (_.isEmpty(errors)) this.props.forgotandupdate(this.state.data);
  };

  handleVerify = (e) => {
    e.preventDefault();
    this.props.forgotandverify(this.state.data.email);
  };

  render() {
    const { data, errors, passwordError } = this.state;
    const { email, password, repassword, otp } = data;
    const { authMessage } = this.props;
    return (
      <div className="bg-image-login ">
        <div className=" d-flex h-100 justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5">
                <div className="card wow fadeIn" data-wow-delay="0.3s">
                  <div className="card-body">
                    <div className="form-header purple-gradient">
                      <h3 className="font-weight-500 my-2 py-1">
                        <i className="fas fa-user"></i> Forgot Password
                      </h3>
                    </div>

                    <form
                      onSubmit={
                        this.props.status
                          ? this.handleSubmit
                          : this.handleVerify
                      }
                    >
                      <div className="md-form">
                        <i className="fas fa-envelope prefix "></i>
                        <input
                          type="email"
                          name="email"
                          id="orangeForm-email"
                          className="form-control"
                          onChange={this.handleChange}
                          value={email}
                          autoFocus
                        />
                        <label htmlFor="orangeForm-email">Your email</label>
                        {errors["email"] && (
                          <div className="alert alert-danger">
                            {" "}
                            {errors["email"]}{" "}
                          </div>
                        )}
                      </div>

                      {this.props.status ? (
                        <div>
                          <div className="md-form pass">
                            <i className="fas fa-lock prefix "></i>
                            <input
                              name="password"
                              type="password"
                              onChange={this.handleChange}
                              value={password}
                              id="orangeForm-pass"
                              className="form-control"
                            />
                            <label htmlFor="orangeForm-pass">
                              New password
                            </label>
                            {errors["password"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["password"]}{" "}
                              </div>
                            )}
                          </div>
                          <div className="md-form repass">
                            <i className="fas fa-lock prefix "></i>
                            <input
                              name="repassword"
                              type="password"
                              onChange={this.handleChange}
                              value={repassword}
                              id="orangeForm-repass"
                              className="form-control repass"
                            />
                            <label htmlFor="orangeForm-repass">
                              Re enter password
                            </label>
                            {errors["repassword"] && (
                              <div className="alert alert-danger">
                                {" "}
                                {errors["repassword"]}{" "}
                              </div>
                            )}
                          </div>
                          <div className="md-form">
                            <i className="fas fa-key prefix"></i>
                            <input
                              type="text"
                              name="otp"
                              id="orangeForm-otp"
                              className="form-control"
                              onChange={this.handleChange}
                              value={otp}
                            />
                            <label for="orangeForm-otp">Enter OTP</label>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}

                      {authMessage || passwordError ? (
                        <p className="bg-info text-white">
                          {" "}
                          {authMessage} {passwordError}
                        </p>
                      ) : (
                        <> </>
                      )}

                      <div className="text-center">
                        {this.props.status ? (
                          <button
                            className="btn purple-gradient btn-lg"
                            onClick={this.handleSubmit}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            className="btn purple-gradient btn-lg"
                            onClick={this.handleVerify}
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </form>
                   
                     <div className="d-flex flex-row justify-content-center mt-3">
                            <span className="   mt-2  text-info">
                              Back to
                            </span>
                            <a href="/login">
                              {" "}
                              <button
                                type="button"
                                className="btn btn-info btn-rounded btn-sm"
                              >
                                {" "}
                                LogIn{" "}
                              </button>
                            </a>
                          </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isVerify: state.auth.isVerify,
    authMessage: state.auth.authMessage,
    status: state.auth.status,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    forgotandverify: (email) => dispatch(forgotandverify(email)),
    forgotandupdate: (creds) => dispatch(forgotandupdate(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
