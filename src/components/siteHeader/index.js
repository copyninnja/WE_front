import React from "react";
import { Link } from "react-router-dom";
import "../../globals/fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./siteHeader.css";
import HeaderUser from '../HeaderUser';
const SiteHeader = () => {
  return (
    <nav className="navbar  navbar-light fixed-top  bg-dark ">
      <nav className="navbar-brand text-white">
        <Link className=" text-white" to="/">
       <img className="weSp" src="./we_sp.png" />
        </Link>
      </nav>
      <span className="navbar-brand text-white">For  sport and enthusiast !!</span>
      <nav className="navbar navbar-expand ">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>

           <HeaderUser/>
       </ul>
      </nav>

    </nav>
  );
};

export default SiteHeader;