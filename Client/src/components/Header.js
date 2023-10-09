import React from 'react'
import {NavLink} from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="head-container">
        <div className="headContainer">
            <h1 className="head_name">
                Blog<span className="head_s">S</span>pot
            </h1>
        </div>
        <div className="navContainer">
            <div className="nav-first">
                <nav>
                <NavLink to="/" className="link">
                    Home
                </NavLink>
                <NavLink to="/lifestyle" className="link">
                    Lifestyle
                </NavLink>
                <NavLink to="/tech" className="link">
                    Technology
                </NavLink>
                <NavLink to="/food" className="link">
                    Food
                </NavLink>
                </nav>
            </div>
            <div className="nav-second">
                <nav>
                <NavLink to="/login" className="link">
                    Login
                </NavLink>
                <NavLink to="/signup" className="link">
                    SignUp
                </NavLink>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Header;
