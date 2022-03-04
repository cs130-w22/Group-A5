const spotifyConfig = {
    clientId: "7c0965d9847a4d0db32dc57a79ca3d9e",
    clientSecret: "af27e04f1aae41bc8022ed50192c9f8a",
    redirectUrl: "com.authdemo://oauthredirect"
};

async function proxySpotifyToken(_req, res){
    //Retrieve code from request
    const code = _req.body.code;
    const refreshToken = _req.body.refresh_token;

    if(!code && !refreshToken){
        return res.status(403).json({success: false, data: "Not authorized"});
    }

    if(refreshToken){ 
        //Refresh token is available, retrieve a new access token
        return res.json({ todo: "Refresh accesstoken"});
    }

    if(code){
        //Retrieve new refresh token and access token
        return res.json({ todo: "Get refresh token & access token"});
    }


}

module.exports = {
    proxySpotifyToken
};