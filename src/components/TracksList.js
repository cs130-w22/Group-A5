import React from 'react';
import { ListGroup, Image, Button } from 'react-bootstrap';
import _ from 'lodash';
import "./../style/AlbumsList.css";
import music from '../images/music.jpeg';

const TracksList = ({ tracks }) => {
  console.log("help", tracks);
  return (
    <React.Fragment>
      {Object.keys(tracks).length > 0 && (
        <div className="tracks">
          <ListGroup id="list-container" className="container-fluid">
            {tracks.items.map((track, index) => {
              return (
                <ListGroup.Item className="container-fluid d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    {!_.isEmpty(track.album.images) ? (
                      <Image src={track.album.images[2].url}/>
                    ) : <img src={music} alt="" />}
                    <div className="info">
                      <div>{track.name}</div>
                      <div>{track.album.artists.map((artist) => artist.name).join(', ')}</div>
                    </div>
                  </div>
                  <Button className="form-button" variant="primary" type="button">
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
export default TracksList;

{/* <div className="tracks">
          <ListGroup id="list-container" className="container-fluid">
            {tracks.items.map((track, index) => {
              return (
                <ListGroup.Item className="container-fluid d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    {!_.isEmpty(track.album.images) ? (
                      <Image src={track.album.images[2].url}/>
                    ) : <img src={music} alt="" />}
                    <div className="info">
                      <div>{track.album.name}</div>
                      <div>{track.album.artists.map((artist) => artist.name).join(', ')}</div>
                    </div>
                  </div>
                  <Button className="form-button" variant="primary" type="button">
                      Add
                    </Button>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div> */}

{/* <React.Fragment>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          {albums.items.map((album, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={album.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                     {!_.isEmpty(album.images) ? (
                      <Card.Img
                        variant="top"
                        src={album.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>
                      <small>
                        {album.artists.map((artist) => artist.name).join(', ')}
                      </small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </React.Fragment> */}