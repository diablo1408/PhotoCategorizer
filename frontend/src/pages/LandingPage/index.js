import React from "react";


class LandingPage extends React.Component{
    state = {
        clicked : false,
    } 
    handleClick = () =>{
        this.setState({clicked : true});
    }
    render(){
        if(this.state.clicked){this.props.history.push("/register");}
        return(
           
                <div class="view full-page-intro" style={{
                    "background-image": 
                    "url('https://mdbootstrap.com/img/Photos/Others/images/78.jpg')",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                    ,"height":"17.7cm"
                }}>
                <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
                <div class="container">
                    <div class="row wow fadeIn">
                    <div class="col-md-12 mb-4 white-text text-center text-md-left ">
                        <h1 class="display-4 font-weight-bold ">PhotoCAT</h1>
                        <p>
                        <strong>A Unique Solution to Catogarize your Images.</strong>
                        </p>
                        <p class="mb-4 d-none d-md-block">
                        <strong>The most comprehensive tool for managing your Images, simplifying the task to sort through your Image Data.</strong>
                        </p>
                    </div>
                    <div>
                        <button  class="btn blue-gradient" onClick={this.handleClick}>Get Started</button>
                    </div>
                    <div class="col-md-6 col-xl-5 mb-4">
                    </div>
                    </div>
                </div>
                </div>
               
            
            </div>
        );
    }
}

export default LandingPage;