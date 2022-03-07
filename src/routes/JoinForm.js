import React, { useState, useEffect, Component } from "react";
import { useHistory } from "react-router-dom";

import validation from "../components/validation";
import { Button } from "react-bootstrap";

const JoinForm = () => {
  //for user feedback
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    fullname: "", //only have fullname and session code
    code: "",
  });

  //to update text fields as user types
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //once submit check for errors and handle accordingly
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values)); //check for errors
    console.log("--->", values);
    if (errors.fullname || errors.code) {
      return;
    }

    //check if user already exists.
    let response2 = await fetch(
      `http://localhost:5001/session/users?c=${values.code}`
    );
    let data2 = await response2.json();
    //console.log("!!", data2);
    if (data2.users && data2.users.includes(values.fullname)) {
      setErrors((prevState) => {
        return Object.assign({}, prevState, {
          fullname: "Name Already Exist!",
        });
      });

      return; //return without adding if user already exists.
    }

    //check to see if given code is valid or not.
    let response = await fetch("http://localhost:5001/session_list");
    let data = await response.json();
    console.log("data", data);
    let session_codes = data.code_list;
    console.log(session_codes);

    // if valid code --> add user.
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
      // if not valid code--> warn the user
      setErrors((prevState) => {
        return Object.assign({}, prevState, { code: "Session Doesn't Exist!" });
      });
      return;
    }

    console.log(errors.fullname, errors.code);
    setTimeout(function () {
      window.location = "/dashboard";
    }, 300);

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
            <Button className="submit" onClick={handleFormSubmit}>
              Join Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
