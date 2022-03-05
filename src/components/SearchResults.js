import React from 'react';
import _ from 'lodash';
import { ListGroup } from 'react-bootstrap';
import "./../style/SearchResult.css"; 
import { useSelector } from 'react-redux';
import SingleResult from './SingleResult';


/* Format search result data */
const SearchResults = ({ selectedCategory, setSongQueue }) => {
  const tracks = useSelector(state => state.tracks);
  
  return (
    <React.Fragment>
      <div className={`${selectedCategory === 'tracks' ? 'searchResult' : 'hide'}`}>
        {tracks && Object.keys(tracks).length > 0 && (
        <div className="tracks">
          <ListGroup id="list-container" className="container-fluid">
            {tracks.items.map((track, index) => {
              return (
                <SingleResult key={index} track={track} setSongQueue={setSongQueue}/>
              )
            })}
          </ListGroup>
        </div>
      )}
      </div>
    </React.Fragment>
  );
};
export default SearchResults;