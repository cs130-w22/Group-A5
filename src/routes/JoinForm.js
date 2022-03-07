import React, { useState, useEffect, Component } from "react";
import { useHistory } from "react-router-dom";

import validation from "../components/validation";

const JoinForm = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    fullname: "",
    code: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    console.log("--->", values);

    // Check if username already exists within a session
    let usersWithinASession = await fetch(
      `http://localhost:5001/session/users?c=${values.code}`
    );
    let data2 = await usersWithinASession.json();
    if (data2.users.includes(values.fullname)) {
      setErrors((prevState) => {
        return Object.assign({}, prevState, {
          fullname: "Name Already Exist!",
        });
      });
      return;
    }

    // Check if the session ID exists
    let response = await fetch("http://localhost:5001/session_list");
    let data = await response.json();
    let session_codes = data.code_list;
    console.log(session_codes);

    if (session_codes.includes(+values.code)) {
      response = await fetch(
        `http://localhost:5001/session/join?c=${values.code}&n=${values.fullname}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      data = await response.json();
    } else {
      setErrors((prevState) => {
        return Object.assign({}, prevState, { code: "Session Doesn't Exist!" });
      });
    }

    /* setTimeout(function () {
      window.location = "/dashboard";
    }, 300); */

    //let navigate = useHistory();

    //console.log(navigate);
    //navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Join Session</h2>
        </div>
        <form className="form-wrapper">
          <div className="code">
            <label className="label">Session Code</label>
            <input
              className="input"
              type="text"
              name="code"
              value={values.code}
              onChange={handleChange}
            />
            {errors.code && <p className="error">{errors.code}</p>}
          </div>
          <div className="name">
            <label className="label">Your Name</label>
            <input
              className="input"
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <p className="error">{errors.fullname}</p>}
          </div>

          <div>
            <button className="submit" onClick={handleFormSubmit}>
              Join Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
