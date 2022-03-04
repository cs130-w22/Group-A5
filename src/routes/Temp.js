import React, { useState, useEffect } from "react";
import "./../style/InviteUsers.css";
import { Link } from "react-router-dom";
import Session from "./session";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AiOutlineCopy } from "react-icons/ai"; //copy symbol

let code_place = "";

const SignUpFormSuccess = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [session_code, setSession_code] = useState("");

  const createSession = async () => {
    /*fetch("http://localhost:5001/new_session")
    .then((response) => response.json())
    .then((data) => {
      session_code = data.code;
      console.log(session_code);
    });*/

    let response = await fetch("http://localhost:5001/new_session");
    let data = await response.json();
    setSession_code(data.code);
    console.log(session_code);

    await localStorage.setItem("session_code", session_code);
    const sc = await localStorage.getItem("session_code");
    console.log(sc, "sc from storage in Temp.js createSession");
  };

  const handleCreate = (event) => {
    event.preventDefault();
    createSession();

    //alert("Created a Session");
  };
  //----------
  return (
    <div className="container">
      <div className="app-wrapper">
        <h1 className="form-success">Welcome...</h1>
        <br></br>
        <form action="/dashboard" method="POST">
          <button class="btn" onClick={handleCreate}>
            Create Session
          </button>
        </form>
        {/*
        <br></br>
        <form action="/join_session" method="GET">
          <button class="btn">Join Session</button>
        </form>
        <br></br>
        <Link to="/invite_users">Invite Users</Link>
        */}
        {session_code && (
          <h3 className="form-success2">Session Code: {session_code}</h3>
        )}

        {session_code && (
          <button onClick={() => navigator.clipboard.writeText(session_code)}>
            <AiOutlineCopy
              style={{
                color: "#00a300",
                position: "relative",
                bottom: "190px",
                left: "400px",
                color: "#850c62",
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

//export const sUF = SignUpFormSuccess;
//export const sC = session_code;
export default SignUpFormSuccess;
