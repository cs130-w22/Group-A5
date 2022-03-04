import React, { Component, useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
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
import "./../style/InviteUsers.css";

//const session_code = require("./Temp");
let m = undefined;
const getMembers = async () => {
  const sc = localStorage.getItem("session_code");
  console.log(sc, "code from Invite Users");
  let response = await fetch(`http://localhost:5001/session/users?c=${sc}`);
  let data = await response.json();
  let users = data.users;
  console.log(users);
  m = users;
  return users;
};

let sc = undefined;
//https://www.codegrepper.com/code-examples/javascript/how+to+wait+for+promise+resolved+in+useeffect
function InviteUsers() {
  const [members, setMembers] = useState([]);
  const gM = useCallback(async () => {
    sc = localStorage.getItem("session_code");
    console.log(sc, "code from Invite Users");
    let response = await fetch(`http://localhost:5001/session/users?c=${sc}`);
    let data = await response.json();
    setMembers(data.users);
  });

  useEffect(() => {
    gM();
  }, []);

  const [src, setSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(sc).then(setSrc);
  }, []);

  return (
    <div style={{}}>
      <div id="container1">
        <h1 class="style-3">
          Invite your friends and Enjoy the Music Together!!
        </h1>
      </div>

      <div className="qr-code">
        <img src={src} />
        <h1 style={{ color: "#00a300" }}>{sc}</h1>

        <div className="copy-code">
          <button onClick={() => navigator.clipboard.writeText(sc)}>
            <AiOutlineCopy style={{ color: "#00a300" }} />
          </button>
        </div>
      </div>

      <div id="container2">
        <h1 class="style-1">Members</h1>
        <button onClick={() => navigator.clipboard.writeText(sc)}>
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
