import React from 'react';
import { ListGroup, Image, Form, Button } from 'react-bootstrap';
import { postSong } from '../routes/actions/result';
import "./../style/SingleResult.css"; 

const SingleResult = ({track, setSongQueue}) => {
  
  const sessionCode = sessionStorage.getItem('sessionCode');

  function addSong() {
    postSong({
      c: sessionCode, 
      n: 'kt', 
      sid: track.id, 
      uri: track.uri
    }).then((data) => {
      //console.log(updatedSongQueue);
      console.log(data)
      setSongQueue(data.updatedSongQueue);
    });
  }
  // write a promise to get the result back from postsong, 
//figure out what format song list should be in
//callback (pass info from child to parent) 

  return(
    <ListGroup.Item key={track.id} className="container-fluid d-flex flex-row justify-content-between align-items-center">
      <div className="d-flex flex-row align-items-center">
        {!_.isEmpty(track.album.images) ? (
          <Image src={track.album.images[2].url}/>
        ) : <img src={music} alt="" />}
        <div className="info">
          <div>{track.name}</div>
          <div>{track.album.artists.map((artist) => artist.name).join(', ')}</div>
        </div>
      </div>
      
      <Button className="form-button" variant="primary" type="button" onClick={addSong}>
        Add
      </Button>
    </ListGroup.Item>
  )
}

export default SingleResult; 