import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Image, Form, Button } from 'react-bootstrap';
import _ from 'lodash';
import "./../style/TracksList.css";
import music from '../images/music.jpeg';
import { postSong } from '../routes/actions/result';
import { useSelector, useDispatch } from 'react-redux';


const TracksList = (props) => {

  const { tracks } = props;
  const sessionCode = sessionStorage.getItem('sessionCode');

  useEffect(() => {
    // setIsLoading(true);
    console.log("sessionCode", sessionCode);
    /* dispatch(postSong({
      c: sessionCode, 
      n: 'kt', 
      sid: '4dCJwNoQG5Fx42pqIz99Vn' 
    })).then((data) => {
      // setTrackData(data);
      // setIsLoading(false);
      console.log("something", data);
    }); */
  }, [])

  function myFunction() {
    postSong({
      c: sessionCode, 
      n: 'kt', 
      sid: '4dCJwNoQG5Fx42pqIz99Vn' 
    }).then((data) => {
      console.log("postSong", data);
    });
  }

  function getPlaylist() {
    
  }

  return (
    <React.Fragment>
      {Object.keys(tracks).length > 0 && (
        <div className="tracks">
          <ListGroup id="list-container" className="container-fluid">
            {tracks.items.map((track, index) => {
              return (
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
                  <Button className="form-button" variant="primary" type="button" onClick={myFunction}>
                    Add
                  </Button>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
      )}
    </React.Fragment>
  );
};

/* const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    sessionCode: state.sessionCode,
  };
}; */

// export default connect(mapStateToProps)(TracksList);
export default TracksList;