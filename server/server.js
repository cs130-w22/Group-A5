const path = require("path");
const express = require("express");
const cors=require("cors");
const app = express(); // create express app

const PORT = 5001

let codes = [0000];
const sessions = new Map();//map code to session JSON


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

function new_session(code) {
    let session = {
        users: [],
        songs: []
    }
    sessions.set(code, session);
}

function add_song(code, user, sid) {
    sessions.get(code).songs.push({
        user: user,
        sid: sid,
        upvotes: 1
    })
}

app.use(cors(corsOptions));

//middleware that uses regex to check if session code exists
app.use('/session/*', (req, res, next) => {
    //if session code is found, continue with request like normal 
    console.log(sessions);
    console.log(req.query);
    console.log("request with code " + req.query.c);
    let code = req.query.c;
    if(sessions.get(code) != undefined) {
        next();
    }
    //if session code does not exist, respond with error
    else {
        res.send({
            status: 1, 
            message: "Code not found"
        });
    }
}); 

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
    new_session(String(new_code));
});

app.post("/session/join", (req, res) => {
    let code = req.query.c;
    let name = req.query.n;
    //add name to correct session
    sessions.get(code).users.push(name);

    res.send({
        status: 0,
        message: "User added to session"
    });
});

app.post("/session/add_song", (req, res) => {
    let code = req.query.c;
    let user = req.query.n;
    let sid = req.query.sid;

    add_song(code, user, sid);
    
    console.log("Song " + sid + " added to session " + code);

    res.send({
        status: 0, 
        message: "Song " + sid + " added to session " + code
    });    
});

app.get("/session/playlist", (req, res) => {
    let code = req.query.c;
    res.send({songs: sessions.get(code).songs});
});

app.get("/det_session_list", (req, res) => {
    res.send({session_list: [...sessions.entries()]});
});

app.get("/session_list", (req, res) => {
    res.send({code_list: codes});
});

// start express server on port 5001
app.listen(PORT, () => {
    console.log("server started on port ", PORT);
});