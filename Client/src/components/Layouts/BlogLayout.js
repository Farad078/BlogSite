import React from "react";
import "./BlogLayout.css";
import About from "../About.js";
import { useState } from "react";

const BlogLayout = (props) => {
  const [like, setLike] = useState(false);
  const info = props.info.info;

  console.log(info);

  function handleClick() {
    setLike(!like);
  }

  function click() {
    const value = 0;
    if (like) {
      return value + 1;
    }
    return value;
  }

  const val = click();
  return (
    <div className="BlogLayout-container">
      <div className="about-block">
        <div className="about-sub">
          <About pInfo={info} />
        </div>
      </div>
      <div className="block-1">
        <div className="block-2">
          <img src={info.coverImage} alt="picture" className="pic" />
          <h3 className="feature">{info.feature}</h3>
          <h2 className="title">{info.title}</h2>
          <p className="content">{info.content}</p>
        </div>
        <div onClick={handleClick} className="like">
          <h5 className="text-start ">
            {like ? (
              <i class="bi bi-heart-fill fa-xs red-filled"></i>
            ) : (
              <i className="bi bi-heart fa-xs"></i>
            )}
            {val} likes
          </h5>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
