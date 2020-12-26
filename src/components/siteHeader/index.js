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
       <img class="weSp" src="./we_sp.png" />
        </Link>
      </nav>
      <span className="navbar-brand text-white">For the sport and enthusiast !!</span>
      <nav className="navbar navbar-expand ">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/movies/Upcoming">
              Upcoming
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/movies/favorites">
              Favorites
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/movies/popular">
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/movies/TopRate">
              TopRate
            </Link>
          </li>
           <HeaderUser/>
       </ul>
      </nav>

    </nav>
  );
};

export default SiteHeader;