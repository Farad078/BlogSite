import React from "react";
import BlogLayout from "../Layouts/BlogLayout";
import "./BlogInfo.css";
import Header from "../Header";
import { useLocation } from "react-router-dom";

const BlogInfo = () => {
  const location = useLocation();
  const state = location.state;

  console.log(state);
  return (
    <div className="info-container">
      <div className="Home-header">
        <Header />
      </div>
      <div className="blog-container">
        <BlogLayout info={state} />
      </div>
    </div>
  );
};

export default BlogInfo;
