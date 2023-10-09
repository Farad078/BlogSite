import React from "react";
import { useState, useEffect } from "react";
import "./WriteBlog.css";
import HistoryForm from "../HistoryForm";

const WriteBlog = (props) => {
  const [avatar, setAvatar] = useState([]);
  const [bioData, setBioData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [pFile, setPFile] = useState();
  const [bio, setBio] = useState();
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const email = props.info.email;
  const url = "http://localhost:4000/account/" + email;
  console.log(url);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBioData(data);
        setAvatar(data[0].avatar);
      });
  }, []);
  console.log(bioData);
  // extract the avatar
  // const avatar = bioData[0]["avatar"];
  // console.log(avatar);
  console.log(avatar);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const val = data[0]["contents"];
        setNotes([]);
        val.map((value, index) => {
          const info = {
            title: value.title,
            content: value.content,
            feature: value.feature,
            pubStatus: value.publish,
          };
          onAdd(info);
          return value;
        });
        return data;
      });
    return () => {
      setNotes([clicked]);
    };
  }, []);
  console.log(notes);

  function onSubmit(event) {
    event.preventDefault();
  }

  function onAdd(data) {
    setNotes((prev) => {
      return [...prev, data];
    });
  }

  function personalInfo() {
    //Asynchronous function to push(PUT) credentials to backend
    async function upload(formData) {
      try {
        const res = await fetch("http://localhost:4000/personal", {
          method: "PUT",
          body: formData,
        });
        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.log("error: ", error.message);
      }
    }

    // form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contact", contact);
    formData.append("bio", bio);
    formData.append("file", pFile);
    formData.append("email", props.info.email);

    upload(formData);
  }

  // Add Handler - to add contents and file to the database
  function addHandler() {
    const { title, content } = data;
    if ((title !== "") & (content !== "")) {
      onAdd(data);
      setData({
        title: "",
        content: "",
      });
    }
  }

  function handler(event) {
    const { name, value } = event.target;
    setData((prev) => {
      if (name === "title") {
        return {
          ...prev,
          title: value,
        };
      } else if (name === "content") {
        return {
          ...prev,
          content: value,
        };
      }
    });
  }

  function refHandler(event) {
    setClicked((prev) => {
      return !prev;
    });
  }

  function clearUp() {
    // set the Credential State to empty.
    setName("");
    setContact("");
    setBio("");
    setPFile("");
  }
  const { title, content } = data;

  return (
    <div className="writeContainer">
      <div className="blogContainer">
        <form onSubmit={onSubmit} className="blogContent">
          <h4>Blogit</h4>
          <div className="subBlog" tabindex="2">
            <div>
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handler}
                value={title}
              />
            </div>
            <div>
              <textarea
                name="content"
                placeholder="What's on your mind..."
                onChange={handler}
                value={content}
              />
            </div>
          </div>
          <div>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              accept="image/*"
            />
          </div>
          <div className="info-box">
            <button type="submit" className="submit" onClick={addHandler}>
              Add
            </button>
          </div>
        </form>
      </div>

      {/* History */}
      <div className="history">
        <h4>History</h4>
        <button className="refresh" onClick={refHandler}>
          Refresh
        </button>
        {notes.map((note, index) => {
          return (
            <HistoryForm
              key={index}
              id={index}
              title={note.title}
              content={note.content}
              pubStatus={note.pubStatus}
              file={file}
              email={props.info.email}
              password={props.info.password}
              sets={setNotes}
              feature={note.feature}
            />
          );
        })}
      </div>

      {/* Personal Information */}
      <div className="formContainer">
        <form className="personalDetails" onSubmit={onSubmit}>
          <div className="img-about-subcontainer check">
            <img
              src={`http://localhost:4000/uploads/` + avatar}
              alt="image"
              className="dp"
            />
          </div>
          <div className="info-box">
            <h4>Personal details</h4>
            <input
              type="text"
              placeholder={
                bioData[0]?.name ? bioData[0].name : "Name or Nickname"
              }
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="info-box">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="form-control"
              value={props.info.email}
            />
          </div>
          <div className="info-box">
            <input
              type="text"
              placeholder={bioData[0]?.contact ? bioData[0].contact : "Contact"}
              name="contact"
              className="form-control"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </div>

          <div className="info-box">
            <textarea
              type="text"
              placeholder={bioData[0]?.bio ? bioData[0].bio : "Write your bio"}
              className="form-control"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </div>

          <div className="info-box">
            <input
              type="file"
              id="img"
              onChange={(e) => {
                setPFile(e.target.files[0]);
              }}
              name="img"
              accept="image/*"
              className="img"
            ></input>
          </div>

          <div className="info-box">
            <button type="submit" className="submit" onClick={personalInfo}>
              submit
            </button>
            <button type="submit" className="clear" onClick={clearUp}>
              clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
