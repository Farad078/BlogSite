import React from "react";
import "./About.css";

const About = (props) => {
  const info = props.pInfo;
  return (
    <div className="about-container">
      <div className="about-subcontainer">
        <h3>About</h3>
      </div>
      <div className="img-about-subcontainer">
        <img src={info.avatar} alt="My picture" className="dp" />
      </div>
      <div className="about-text">
        <h5 className="bio-text">{info.bio}</h5>
      </div>
      <div className="follow">
        <h3 className="follow-text">CONTACT</h3>
      </div>
      <h7>{info.contact}</h7>
    </div>
  );
};

export default About;
