const path = require("path");
const express = require("express");
const app = express(); // create express app

const PORT = 5001

let codes = [0000];

app.get("/", (req, res) => {
    res.send("<h1>hello world<h1>")
});

app.get("/new_session", (req, res) => {
    let new_code = Math.floor(1000 + Math.random() * 8999);
    while(codes.includes(new_code)) {
        new_code = Math.floor(1000 + Math.random() * 8999);
    }
    codes.push(new_code);
    res.send({code: new_code});
});

app.get("/session_list", (req, res) => {
    res.send({code_list: codes});
});

// start express server on port 5000
app.listen(PORT, () => {
    console.log("server started on port ", PORT);
});