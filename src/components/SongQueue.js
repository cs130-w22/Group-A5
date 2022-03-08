import React,{ useEffect } from "react";
import { ListGroup } from 'react-bootstrap';
import QueueRow from "./QueueRow";
import { getPlaylist } from '../routes/actions/result';

/**
   * Represents the playlist, each song in the list is represented by a QueueRow object
   * @param {*} songArray - list of the songs in an array 
   * @param {*} setSongQueue - information passed in about the playlist
   */
const SongQueue = ({songArray, setSongQueue}) => {
   
    const sessionCode = sessionStorage.getItem('sessionCode');

    useEffect(() => {
    /**
     * Returns the list of songs, their names, their artist, their album names, 
     * the user who added it to the queue, and the number of votes it has.
     *//* 
      function getSongQueue() {
        getPlaylist({
          c: sessionCode
        }).then((data) => {
          console.log("getSongQueue", data);
        })
      }

      getSongQueue(); */

      console.log(songArray)
    }, [])
    
    // use the songID as the identifier of the song          
   /*  <QueueRow 
          // sessionCode={sessionCode}
          trackID='4dCJwNoQG5Fx42pqIz99Vn'
          songNominator="kt"
          numVotes={4}
          voteStatus={false}
        /> */
    return (
      <ListGroup id="list-container" className="container-fluid">
        {songArray.map((song) => {
          return(
            <QueueRow 
              key={song.sid}
              trackID={song.sid}
              numVotes={song.upvotes}
              setSongQueue={setSongQueue}
            />
          )
        })}
      </ListGroup>
    ); 
}

export default SongQueue;