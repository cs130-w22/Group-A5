import React, {useEffect, useState} from "react";
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { ListGroup, Image } from 'react-bootstrap';
import { initiateGetTrackResult } from '../routes/actions/result';
import { upvoteSong } from '../routes/actions/result';
import music from '../images/music.jpeg';
import './../style/styles.css'; 
import { FaHeart } from "react-icons/fa";

const QueueRow = (props) => {
  const dispatch = useDispatch();
  const {trackID, voteStatus, numVotes, setSongQueue} = props;
  const sessionCode = sessionStorage.getItem('sessionCode');

  const [isLoading, setIsLoading] = useState(false);
  const [trackData, setTrackData] = useState({});
  const [userVoteStatus, setUserVoteStatus] = useState(voteStatus);
  const [trackNumVotes, setTrackNumVotes] = useState(numVotes);

  /* Downvote capability -- if a user has added the song to the queue, init with downvote ability */

  /**
   * +1 vote for the song corresponding to songID
   * @param {} songID - Some unique ID that identifies the song.
   * @param {*} votes
   */
  function upvote(songID) {
    upvoteSong({
      c: sessionCode, 
      n: 'kt', 
      sid: songID
    }).then((data) => {
      console.log(data);
      setSongQueue(data.updatedSongQueue);
    })
  }

  /**
   * -1 vote for the song corresponding to songID
   * @param {*} songID - Some unique ID that identifies the song.
   */
  function downvote(songID) {}

  function tempUpdate() {
    setUserVoteStatus(!userVoteStatus);
    console.log(userVoteStatus);
    if (userVoteStatus) {
      //upvote()
      setTrackNumVotes(trackNumVotes + 1);
    } else {
      setTrackNumVotes(trackNumVotes - 1);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(initiateGetTrackResult(trackID)).then((data) => {
      setTrackData(data);
      setIsLoading(false);
    });
  }, []);

  // Expects the data in the item array from Spotify
  return (
    <React.Fragment>
      {Object.keys(trackData).length > 0 && (
        <ListGroup.Item className="container-fluid d-flex flex-row justify-content-between align-items-center" 
                        style={{backgroundColor: '#071622', borderColor: '#0A2133', color: '#F3F3E2'}}>
          <div className="d-flex flex-row align-items-center">
            {!_.isEmpty(trackData.album.images) ? (
              <Image src={trackData.album.images[2].url}/>
            ) : <img src={music} alt="" />}
            <div className="info">
              <div>{trackData.name}</div>
              <div >{trackData.album.artists.map((artist) => artist.name).join(', ')}</div>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}> 
            <p style={{marginRight: 10}}>{numVotes}</p>
            <FaHeart size={28} onClick={() => upvote(trackID)}/>
          </div>
      </ListGroup.Item>
      )}
    </React.Fragment>
  );
};

export default QueueRow;