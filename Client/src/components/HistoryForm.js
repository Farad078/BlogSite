import React, { useState } from "react";
import "./HistoryForm.css";

const HistoryForm = (props) => {
  const [clicked, setClicked] = useState(false);

  const id = props.id;
  const file = props.file;
  const title = props.title;
  const content = props.content;
  const email = props.email;
  const password = props.password;
  const pubStatus = props.pubStatus;
  const sets = props.sets;
  const feature = props.feature;
  const setDel = props.setDel;

  // console.log(email, title, file, content);

  // create an object of query parameters
  const info = {
    title: title,
    content: content,
    feature: feature,
    file: file,
    email: email,
  };

  console.log(info);

  // create a query string frm the object
  const queryString = new URLSearchParams(info).toString();

  // append the query string to URL
  const url = `http://localhost:4000/content/?${queryString}`;

  // create an options object with method 'DELETE'
  const options = {
    method: "DELETE",
  };

  function del(id) {
    sets((prev) => {
      return prev.filter((note, index) => {
        return index !== id;
      });
    });

    // setDel((prev) => {
    //   return !prev;
    // });

    async function delContent() {
      try {
        const res = await fetch(url, options);
        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.log("error", error.message);
      }
    }
    delContent();
  }

  function pubHandler() {
    // Upload function - to add contents and file to the database
    async function upload(formData) {
      try {
        const res = await fetch("http://localhost:4000/add", {
          method: "PUT",
          body: formData,
        });
        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.log("error", error.message);
      }
    }

    // form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("email", email);
    formData.append("password", password);

    upload(formData);

    setTimeout(() => {
      setClicked((prev) => {
        prev = true;
        return prev;
      });
    }, 5000);
  }

  return (
    <div className="form">
      <div>
        <h5>{props.title}</h5>
        {pubStatus ? (
          <button className="pub">Published</button>
        ) : (
          <button className="pub" onClick={pubHandler}>
            {clicked ? "Published" : "Publish"}
          </button>
        )}
        <button onClick={() => del(id)}>delete</button>
      </div>
    </div>
  );
};

export default HistoryForm;
