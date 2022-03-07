import React, { useState, useEffect } from "react";
import "../style/ErrorMessage.css";

const ErrorMessage = (props) => {
    return(
        <p className="error-msg">{props.children}</p>
    )
}

export default ErrorMessage; 
