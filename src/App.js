import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from './components/header';
import "./style/App.css";

const REACT_APP_CLIENT_ID="dee98d184a03416082e121d42cb9480e";
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
      <Link to="/dashboard">Dashboard</Link> 
    </div>
  );
};
export default connect()(App);
