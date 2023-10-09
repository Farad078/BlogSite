import React from "react";
import "../App.css";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import WriteBlog from "./pages/WriteBlog.js";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [access, setAccess] = useState(null);
  const refAccess = useRef("");
  const [msg, setMsg] = useState("");

  // Destructuring data values
  const { email, password } = data;

  // event Handler function
  function handler(event) {
    const { name, value } = event.target;
    setData((prev) => {
      if (name === "email") {
        return { ...prev, email: value };
      } else if (name === "password") {
        return { ...prev, password: value };
      }
    });
  }

  async function login(data) {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log(data);
      const result = await res.json();
      console.log(result);
      setAccess(result.message);
      refAccess.current = result.message;
      setMsg(result.message);
    } catch (error) {
      console.log("error: ", error.message);
    }
  }

  //Login Handler function
  function loginHandler() {
    login(data);
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  function clickHandler() {
    setMsg("");
  }

  return access ? (
    <WriteBlog info={data} />
  ) : (
    <>
      <h7>Incorrect email or password</h7>
      <div className="box">
        <form onSubmit={onSubmit}>
          <div className="text">
            <label for="email" className="label">
              Please Login
            </label>
            {msg === false ? (
              <h7 className="err">Incorrect email or password</h7>
            ) : null}
          </div>
          <div className="mb-1">
            <input
              className="input_1 form-control"
              type="email"
              placeholder="email"
              onChange={handler}
              onClick={clickHandler}
              name="email"
              value={email}
            />
          </div>
          <div className="password mb-2">
            <input
              className="input_2 form-control"
              type="password"
              placeholder="password"
              onChange={handler}
              name="password"
              value={password}
            />
          </div>
          <div className="container">
            <div className="login">
              <button
                type="submit"
                name="login"
                className="login_g"
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
            <div className="signup">
              <Link to="/signup">
                <button type="submit" className="signup_g" name="signup">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
