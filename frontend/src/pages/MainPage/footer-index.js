import React from "react";
// import {Helmet} from "react-helmet";
import "../assets/css/bootstrap.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/mdb.css";
import "../assets/css/mdb.lite.css";
import "../assets/css/mdb.lite.min.css";
import "../assets/css/mdb.min.css";
import "../assets/css/style.min.css";

class Footer extends React.Component{
    render(){
        return(
            <div>
            <footer className="page-footer text-center font-small primary-color-dark darken-2 mt-4 wow fadeIn">
            <hr className="my-4"/>
            <div className="pb-4">
            {/* <a href="https://www.facebook.com/mdbootstrap" target="_blank">
                <i class="fab fa-facebook-f mr-3"></i>
            </a>

            <a href="https://twitter.com/MDBootstrap" target="_blank">
                <i class="fab fa-twitter mr-3"></i>
            </a>

            <a href="https://www.youtube.com/watch?v=7MUISDJ5ZZ4" target="_blank">
                <i class="fab fa-youtube mr-3"></i>
            </a>

            <a href="https://plus.google.com/u/0/b/107863090883699620484" target="_blank">
                <i class="fab fa-google-plus mr-3"></i>
            </a>

            <a href="https://dribbble.com/mdbootstrap" target="_blank">
                <i class="fab fa-dribbble mr-3"></i>
            </a>

            <a href="https://pinterest.com/mdbootstrap" target="_blank">
                <i class="fab fa-pinterest mr-3"></i>
            </a>

            <a href="https://github.com/mdbootstrap/bootstrap-material-design" target="_blank">
                <i class="fab fa-github mr-3"></i>
            </a>

            <a href="http://codepen.io/mdbootstrap/" target="_blank">
                <i class="fab fa-codepen mr-3"></i>
            </a> */}
            </div>
            <div className="footer-copyright py-3">
            © 2019 Copyright:
            {/* <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank"> MDBootstrap.com </a> */}
            </div>
        </footer>
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
export default Footer;