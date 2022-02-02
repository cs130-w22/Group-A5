import React from 'react';
import { Card, ListGroup, Image, Button } from 'react-bootstrap';
import _ from 'lodash';
import "./../style/AlbumsList.css";
import music from '../images/music.jpeg';

const AlbumsList = ({ albums }) => {
  console.log("albums", albums);
  return (
    <React.Fragment>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          <ListGroup id="list-container" className="container-fluid">
            {albums.items.map((album, index) => {
              return (
                <ListGroup.Item className="container-fluid d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    {!_.isEmpty(album.images) ? (
                      <Image src={album.images[2].url}/>
                    ) : <img src={music} alt="" />}
                    <div className="info">
                      <div>{album.name}</div>
                      <div>{album.artists.map((artist) => artist.name).join(', ')}</div>
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
export default AlbumsList;