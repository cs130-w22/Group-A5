const path = require("path");
const express = require("express");
const app = express(); // create express app

const PORT = 5001

let codes = [0000];
let session_list = [];//contains json for each session

//these paths don't require session code as a query parameter
const exempt_paths = ['/', '/new_session', '/session_list', '/det_session_list']; 

//middleware that checks if session code exists
app.use((req, res, next) => {
    let i = 0;
    if(exempt_paths.includes(req.path)) {
        i = 1;
        return next();
    }
    //if session code is found, continue with request like normal 
    session_list.forEach((x) => {
        if(x.code == req.query.c) {
            i = 1;
            return next();
        }
    });
    //if session code does not exist, respond with error
    if(i == 0){
        res.send({
            status: 1, 
            message: "Code not found"
        });
    }
}); 

function new_session(code) {
    let session = {
        code: code,
        users: [],
        songs: []
    }
    session_list.push(session);
}

app.get("/", (req, res) => {
    res.send("<h1>hello world<h1>")
});

app.get("/new_session", (req, res) => {
    //keep generating codes until unique is found
    let new_code = Math.floor(1000 + Math.random() * 8999);
    while(codes.includes(new_code)) {
        new_code = Math.floor(1000 + Math.random() * 8999);
    }
    codes.push(new_code);
    res.send({code: new_code});
    //create new session json
    new_session(new_code);
});

app.post("/join_session", (req, res) => {
    let code = req.query.c;
    let name = req.query.n;
    //add name to correct session
    session_list.forEach((x) => {
        if(x.code == code) {
            session = x;
            x.users.push(name);
        }
    });

    res.send({
        status: 0,
        message: "User added to session"
    });
});

app.get("/det_session_list", (req, res) => {
    res.send({session_list: session_list});
});

app.get("/session_list", (req, res) => {
    res.send({code_list: codes});
});

// start express server on port 5001
app.listen(PORT, () => {
    console.log("server started on port ", PORT);
});