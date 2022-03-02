import React from 'react';
import _ from 'lodash';
import TracksList from './TracksList';
import "./../style/SearchResult.css"; 
import { useSelector } from 'react-redux';

const SearchResult = ({ selectedCategory }) => {
  const tracks = useSelector(state => state.tracks);
  
  return (
    <React.Fragment>
      <div className={`${selectedCategory === 'tracks' ? 'searchResult' : 'hide'}`}>
        {tracks && <TracksList tracks={tracks} />}
      </div>
    </React.Fragment>
  );
};
export default SearchResult;