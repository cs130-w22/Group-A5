import React, {useState, useCallback} from "react";
import SpotifyPlayer from 'react-spotify-web-playback';

const SpotifyWebPlayback = () => {
    let params = JSON.parse(localStorage.getItem('params'));

    const [needsUpdate, setNeedsUpdate] = useState(false);

    const handleClick = useCallback((SpotifyPlayerState) => {
        console.log(SpotifyPlayerState);
      }, []);

    return (
        <div>
            {needsUpdate && <p>Needs Update!</p>}
            <SpotifyPlayer
            token={params.access_token}
            uris={['spotify:track:3USxtqRwSYz57Ewm6wWRMp']}
            callback={handleClick}
            />
        </div>
    );
}

export default SpotifyWebPlayback; 
