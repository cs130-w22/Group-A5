import { forEach } from "lodash";
import React, {useState, useCallback} from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import "../style/SpotifyWebPlayback.css";

/**
   * Web Player to play the playlist
   * @param {*} songArray - list of songs in an array
   */
const SpotifyWebPlayback = ({songArray}) => {
  let params = JSON.parse(localStorage.getItem('params'));
  const [offset, setOffset] = useState(0);

  let updatedSongURIs = []; 
  songArray.forEach((song) => updatedSongURIs.push(song.uri)); 
  // console.log("songArray", songArray);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  const handleClick = useCallback((SpotifyPlayerState) => {
    console.log(SpotifyPlayerState);
    if(SpotifyPlayer.previousTracks) {
      console.log("length???", SpotifyPlayer.previousTracks.length);
      setOffset(SpotifyPlayer.previousTracks.length);
    }
  }, []);

  return (
    <div id="footer">
      <SpotifyPlayer
        token={params.access_token}
        uris={updatedSongURIs}
        offset={offset}
        callback={handleClick}
        styles={{
          sliderColor: '#D966A3',
          sliderTrackColor: '#17476F',
          sliderHandleColor: '#F3F3E2',
          color: '#F3F3E2',
          bgColor: '#081A29', 
          trackNameColor: '#F3F3E2', 
          trackArtistColor: '#F3F3E2',
          errorColor: '#E89BBB'
        }}
      />
    </div>
  );
}

export default SpotifyWebPlayback; 
