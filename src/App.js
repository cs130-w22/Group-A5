import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style/App.css";
import { createSession } from "./routes/actions/result";
import SessionModal from "./components/SessionModal";

/*
* Show authorization prompt for spotify on home page after clicking the login button
*/
const App = (props) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalType, setModalType] = useState('Join');

  const handleCreate = () => {
    setDisplayModal(true);
    setModalType('Create');
  }

  const handleJoin = () => {
    setDisplayModal(true);
    setModalType('Join');
    // window.location = "/join_session";
  };

  /* useEffect(() => {
    // Get a session code from the server and store it in SessionStorage 
    createSession().then((sessionCode) => {
      sessionStorage.setItem("sessionCode", sessionCode);
    });
  }, []); */

  return (
    <div className="login">
      <h1  className="main-heading">Welcome!</h1>
      <Button
        className="custom-button"
        style={{ marginBottom: "35px" }}
        variant="info"
        type="submit"
        onClick={handleCreate}
      >
        Create Session
      </Button>
      <Button className="custom-button" variant="info" type="submit" onClick={handleJoin}>
        Join Session
      </Button>
      <SessionModal show={displayModal} setShow={setDisplayModal} type={modalType}/>
    </div>
  );
};

export default App;
