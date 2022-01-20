import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.js";
import Session from "./routes/session.js"

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="session" element={<Session />}/>
        </Routes>
    </BrowserRouter>
, document.getElementById("root"));