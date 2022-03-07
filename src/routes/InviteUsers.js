import React, { Component, useState, useEffect, useCallback } from "react";
//import QRCode from "qrcode";
import {
  BsPauseCircle,
  BsFillPersonPlusFill, //add person
  BsFillPersonXFill, //delete person
  BsPersonLinesFill, // view people
  BsThreeDots, //view more
  BsSpotify,
} from "react-icons/bs";

import { CgProfile } from "react-icons/cg";
import { AiOutlineCopy } from "react-icons/ai"; //copy symbol
import { BiArrowBack } from "react-icons/bi";
import "./../style/InviteUsers.css";

//const session_code = require("./Temp");
let m = undefined;
const getMembers = async () => {
  const sc = sessionStorage.getItem("sessionCode");
  console.log(sc, "code from Invite Users");
  let response = await fetch(`http://localhost:5001/session/users?c=${sc}`);
  let data = await response.json();
  let users = data.users;
  console.log(users);
  members = users;
};

let sc = sessionStorage.getItem("sessionCode");
//https://www.codegrepper.com/code-examples/javascript/how+to+wait+for+promise+resolved+in+useeffect
function InviteUsers() {
  const [members, setMembers] = useState([]);
  const gM = useCallback(async () => {
    console.log(sc, "code from Invite Users");
    let response = await fetch(`http://localhost:5001/session/users?c=${sc}`);
    let data = await response.json();
    setMembers(data.users);
  });
  console.log(members);
  console.log(sc);
  useEffect(() => {
    gM();
  }, []);

  const [src, setSrc] = useState("");

  /*-
  useEffect(() => {
    QRCode.toDataURL(sc).then(setSrc);
  }, []);
       
      <div className="qr-code">
        <img src={src} />
        <h1 style={{ color: "#00a300" }}>{sc}</h1>

        <div className="copy-code">
          <button onClick={() => navigator.clipboard.writeText(sc)}>
            <AiOutlineCopy style={{ color: "#00a300" }} />
          </button>
        </div>
      </div>
  */

  const handleBack = (event) => {
    event.preventDefault();
    window.location = "/dashboard";
  };

  return (
    <div style={{}}>
      <div className="back-arr">
        <button className="my-btn" onClick={handleBack}>
          <BiArrowBack style={{ color: "#00a300" }} />
        </button>
      </div>

      <div id="container1">
        <h1 class="style-3">
          Invite your friends and Enjoy the Music Together!!
        </h1>
      </div>

      <div className="qr-code">
        <h1 style={{ color: "#00a300" }}>Session Code: {sc}</h1>

        <div className="copy-code">
          <button
            className="my-btn"
            onClick={() => navigator.clipboard.writeText(sc)}
          >
            <AiOutlineCopy style={{ color: "#00a300" }} />
          </button>
        </div>
      </div>

      <div id="container2">
        <h1 class="style-1">Members</h1>
        <button
          className="my-btn"
          onClick={() => navigator.clipboard.writeText(sc)}
        >
          <BsFillPersonPlusFill
            style={{ verticalAlign: "bottom", color: "#00A300" }}
          />
        </button>
        <div class="list-div">
          <h3>
            <ul>
              {members.map((member, i) => {
                return (
                  <li key={i} style={{ marginBottom: "3px" }}>
                    {member}{" "}
                    <CgProfile
                      style={{ verticalAlign: "bottom", color: "#00A300" }}
                    />
                  </li>
                );
              })}
            </ul>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InviteUsers;
