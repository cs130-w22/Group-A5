import React, {useEffect, useState} from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListGroup, Image, Button } from 'react-bootstrap';
import { initiateGetTrackResult, setTrack } from '../routes/actions/result';

import music from '../images/music.jpeg';

const QueueRow = (props) => {  

  const {trackID, track, voteStatus, numVotes} = props;

  const [isLoading, setIsLoading] = useState(false);
  const [trackData, setTrackData] = useState({});
  const [userVoteStatus, setUserVoteStatus] = useState(voteStatus);
  const [trackNumVotes, setTrackNumVotes] = useState(numVotes); 

  /**
     * +1 vote for the song corresponding to songID
     * @param {} songID - Some unique ID that identifies the song.
     * @param {*} votes 
     */
   function upvote(songID) {

  }

  /**
   * -1 vote for the song corresponding to songID
   * @param {*} songID - Some unique ID that identifies the song.
   */
  function downvote(songID) {

  }

  function tempUpdate() {
    setUserVoteStatus(!userVoteStatus); 
    console.log(userVoteStatus);
    if(userVoteStatus) { 
      //upvote()
      setTrackNumVotes(trackNumVotes + 1);
    } else {
      setTrackNumVotes(trackNumVotes - 1);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    props.dispatch(initiateGetTrackResult(trackID)).then((data) => {
      setTrackData(data);
      setIsLoading(false);
    });
  }, [])

  // Expects the data in the item array from Spotify 
  return (
    <React.Fragment>
      {Object.keys(trackData).length > 0 && (
        <ListGroup.Item className="container-fluid d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex flex-row align-items-center">
          {!_.isEmpty(trackData.album.images) ? (
            <Image src={trackData.album.images[2].url}/>
          ) : <img src={music} alt="" />}
          <div className="info">
            <div>{trackData.name}</div>
            <div>{trackData.album.artists.map((artist) => artist.name).join(', ')}</div>
          </div>
        </div>
        <Button className="form-button" variant="primary" type="button">
          Vote
        </Button>
      </ListGroup.Item>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    track: state.track,
  };
};

export default connect(mapStateToProps)(QueueRow);

{/* <div>
        <div>{props.songName}</div>
        <div>{props.songArtist}</div>
        <div>{props.songNominator}</div>
        <button onClick={() => tempUpdate()} >Vote</button>
        <span>{numVotes}</span>
    </div> */}