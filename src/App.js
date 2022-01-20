import React, { Component} from "react";
import { Link } from "react-router-dom";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
        <Link to="/session">Create Session</Link>
      </div>
    );
  }
}

export default App;