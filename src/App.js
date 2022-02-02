import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from './components/header';
import "./style/App.css";

const REACT_APP_CLIENT_ID="7c0965d9847a4d0db32dc57a79ca3d9e";
const REACT_APP_AUTHORIZE_URL="https://accounts.spotify.com/authorize";
const REACT_APP_REDIRECT_URL="http://localhost:3000/redirect";

const App = (props) => {
  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="login">
      <Header />
       <Button variant="info" type="submit" onClick={handleLogin}>
        Login to spotify
      </Button>
    </div>
  );
};
export default connect()(App);
