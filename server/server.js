const path = require("path");
const express = require("express");
const cors=require("cors");
const app = express(); // create express app

const PORT = 5001

let codes = [0000];
const sessions = new Map();//map code to session JSON
/*
session JSON structure:
{
    users: [],
    songs: []
}
song JSON structure:
{
    users: [],
    sid: str,
    upvotes: int
}
*/

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
        users: [user],
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
    res.send({
        status: 0, 
        code: new_code
    });
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

    sessions.get(code).songs.findIndex((x) => {
        if(x.sid == sid) {
            res.send({
                status: 0,
                message: "Song " + sid + " already added to session " + code
            });
            next();
            return;
        }
    });

    add_song(code, user, sid);
    
    //console.log("Song " + sid + " added to session " + code);

    res.send({
        status: 0, 
        message: "Song " + sid + " added to session " + code
    });    
});

app.post("/session/upvote", (req, res) => {
    let code = req.query.c;
    let user = req.query.n;
    let sid = req.query.sid;

    let songs = sessions.get(code).songs;
    let index = songs.findIndex((x) => {
        return x.sid == sid;
    });

    let upvote = true;

    if(user == undefined) user = "";
    else if (songs[index].users.includes(user)) {
        upvote = false;
        let uindex = songs[index].users.indexOf(user);
        songs[index].users.splice(uindex, 1);
        songs[index].upvotes -= 1;
    }
    else {
        songs[index].users.push(user);
        songs[index].upvotes += 1;
    }

    let msg = "upvoted";
    //sort logic depends on wheter we upvoted or downvoted
    if(upvote) {
        while(index > 0 && songs[index].upvotes > songs[index - 1].upvotes) {
            let temp = Object.assign({}, songs[index]);
            songs[index] = Object.assign({}, songs[index - 1]);
            songs[index - 1] = Object.assign({}, temp);

            index--;
        }
    }
    else {
        msg = "downvoted";
        while(index < songs.length - 1 && songs[index].upvotes < songs[index + 1].upvotes) {
            let temp = Object.assign({}, songs[index]);
            songs[index] = Object.assign({}, songs[index + 1]);
            songs[index + 1] = Object.assign({}, temp);

            index++;
        }
    }
    //update hashmap with sorted list
    sessions.get(code).songs = songs;

    res.send({
        status: 0, 
        message: "Song " + sid + " in session " + code + " " + msg +  " by " + user
    });
});

app.get("/session/users", (req, res) => {
    let code = req.query.c;
    res.send({
        status: 0, 
        users: sessions.get(code).users
    });
});

app.get("/session/playlist", (req, res) => {
    let code = req.query.c;
    res.send({
        status: 0, 
        songs: sessions.get(code).songs
    });
});

app.get("/det_session_list", (req, res) => {
    res.send({
        session_list: [...sessions.entries()]
    });
});

app.get("/session_list", (req, res) => {
    res.send({
        code_list: codes
    });
});

// start express server on port 5001
app.listen(PORT, () => {
    console.log("server started on port ", PORT);
});