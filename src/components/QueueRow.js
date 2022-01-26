import React, {useState} from "react";

const QueueRow = (props) => {
  const [voteStatus, setVoteStatus] = useState(props.voteStatus)
  const [numVotes, setNumVotes] = useState(props.numVotes) 

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
    setVoteStatus(!voteStatus); 
    console.log(voteStatus);
    if(voteStatus) { 
      //upvote()
      setNumVotes(numVotes + 1);
    } else {
      setNumVotes(numVotes - 1);
    }
  }

  return (
    <div>
        <div>{props.songName}</div>
        <div>{props.songArtist}</div>
        <div>{props.songNominator}</div>
        <button onClick={() => tempUpdate()} >Vote</button>
        <span>{numVotes}</span>
    </div>
  );
}

export default QueueRow;