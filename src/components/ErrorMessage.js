import React, { useState, useEffect } from "react";
import "../style/ErrorMessage.css";

/**
   * Display error message
   */
const ErrorMessage = (props) => {
    return(
        <p className="error-msg">{props.children}</p>
    )
}

export default ErrorMessage; 
