import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Card from "../Card";
import "./Home.css";

const Home = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/all")
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });
  }, []);
  return (
    <div className="Home-container">
      <div className="Home-header banner">
        <Header />
      </div>
      <div className="card-grid">
        {blog &&
          blog.map((infos, index) => (
            <div key={index} className="card-layout">
              {infos["contents"].map((info, indexItems) => (
                <Card
                  key={index}
                  id={index}
                  feature={info.feature}
                  title={info.title}
                  img={`http://localhost:4000/uploads/` + info.file}
                  date={info.date}
                  content={info.content}
                  avatar={`http://localhost:4000/uploads/` + infos.avatar}
                  bio={infos.bio}
                  contact={infos.contact}
                />
              ))}
            </div>
          ))}
      </div>
      <div className="sponsor">
        <div className="sponsor-container">
          <h3 className="sponsors">Proudly sponsored by</h3>
        </div>
        <div className="org">
          <div>
            <h4 className="sponsor-org">al</h4>
          </div>
          <div>
            <h4 className="sponsor-x">x</h4>
          </div>
        </div>
      </div>

      <div className="Home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
