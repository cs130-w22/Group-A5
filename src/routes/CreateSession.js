import React from "react";
import "./../style/InviteUsers.css";
import { Link } from "react-router-dom";
import Session from "./session";

const SignUpFormSuccess = () => {
  return (
    <div className="container">
      <div className="app-wrapper">
        <h1 className="form-success">Signed Up!</h1>
        <Link to="/session">Create Session</Link>
      </div>
    </div>
  );
};

export default SignUpFormSuccess;
