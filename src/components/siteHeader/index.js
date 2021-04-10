import React from "react";
import { Link } from "react-router-dom";
import "../../globals/fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./siteHeader.css";
import HeaderUser from '../HeaderUser';
import MessageNav from '../messageNav'
import{faShoppingCart} from'@fortawesome/free-solid-svg-icons'
import{faPager} from'@fortawesome/free-solid-svg-icons'
import{faCompass} from'@fortawesome/free-solid-svg-icons'
import{faNewspaper} from'@fortawesome/free-solid-svg-icons'



const SiteHeader = () => {
  return (
    <nav className="navbar  navbar-light fixed-top  bg-dark ">
      <nav className="navbar-brand text-white">
        <Link className=" text-white" to="/">
       <img className="weSp" src="./we_sp.png" />
        </Link>
      </nav>
      <span className="myslog">For  sport and enthusiast !!</span>
      <nav className="navbar navbar-expand ">
        <ul id="ulli" className="navbar-nav">
          <div>
          <Link to="/">
          <FontAwesomeIcon className="navbar-text text-light head-user" icon={faPager} size="3x"/> 
            </Link>
            </div>
            <MessageNav/>
            <div>
            <Link className="nav-link text-white" to="/shop">
            <FontAwesomeIcon className="navbar-text text-light head-user" icon={faShoppingCart} size="3x"/> 
            </Link>
            </div>
            <div>
            <Link className="nav-link text-white" to="/map">
            <FontAwesomeIcon className="navbar-text text-light head-user" icon={faCompass} size="3x"/> 
            </Link>
            </div>
            <div>
            <Link className="nav-link text-white" to="/news">
            <FontAwesomeIcon className="navbar-text text-light head-user" icon={faNewspaper} size="3x"/> 
            </Link>
            </div>
           <HeaderUser/>

       </ul>
      </nav>

    </nav>
  );
};

export default SiteHeader;