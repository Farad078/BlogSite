import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    match: "",
  });

  const [match, setMatch] = useState(null);

  function regHandler() {
    setInfo({ name: "", email: "", password: "", match: "" });
  }

  function focusHandler() {
    const { match, password } = info;
    if (match === password) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }

  function handler(e) {
    const { name, value } = e.target;
    setInfo((prev) => {
      if (name === "name") {
        return { ...prev, name: value };
      } else if (name === "email") {
        return { ...prev, email: value };
      } else if (name === "password") {
        return { ...prev, password: value };
      } else if (name === "passwordMatch") {
        return { ...prev, match: value };
      }
    });
  }
  console.log(info);
  return (
    <div className="containe">
      <h1 className="signUp">Sign up</h1>
      <div className="sub-container">
        <form className="containers">
          <div class="form-group name_signup">
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              onChange={handler}
              value={info.name}
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handler}
              value={info.email}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              className="form-control mb-2"
              placeholder="Password"
              onChange={handler}
              value={info.password}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              name="passwordMatch"
              className="form-control"
              placeholder="Repeat Password"
              onChange={handler}
              onFocusOut={focusHandler}
              value={info.match}
            />
          </div>
          <div class="form-group regBtn">
            <button className="btn btn-primary red" onClick={regHandler}>
              Register
            </button>
            <span>
              If you already have an account <Link to="/login"> Login </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
