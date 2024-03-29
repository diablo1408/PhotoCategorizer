import React, { Component } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./pages/ForgotPassword";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
            <Route exact path = "/" component={LandingPage}/>
              <Route exact path = "/dashboard" component={MainPage}/>
              <Route exact path = "/register" component={Register} />
              <Route exact path = "/login" component={Login} />
              <Route exact path = "/profile" component={Profile} />
              <Route exact path = "/forgotpassword" component={ForgotPassword} />
            </Switch> 
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
