import React from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";

const Card = (props) => {
  const info = {
    coverImage: props.img,
    feature: props.feature,
    title: props.title,
    date: props.date,
    avatar: props.avatar,
    bio: props.bio,
    contact: props.contact,
    content: props.content,
  };
  // console.log(info);

  return (
    <NavLink to="blog" state={{ info }} className="cardText-deco">
      <div className="myCard">
        <img src={props.img} alt="img" className="space" />
        <div className="cardBody">
          <h2 className="cardTitle">{props.feature}</h2>
          <p className="cardText">{props.title}.</p>
        </div>
        <div>
          <h2 className="card-date">{props.date}</h2>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
