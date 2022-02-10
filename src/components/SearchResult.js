import React from 'react';
import _ from 'lodash';
import TracksList from './TracksList';
import "./../style/SearchResult.css"; 

const SearchResult = (props) => {
  const { result, selectedCategory } = props;
  const { tracks } = result;

  return (
    <React.Fragment>
      <div className={`${selectedCategory === 'tracks' ? 'searchResult' : 'hide'}`}>
        {tracks && <TracksList tracks={tracks} />}
      </div>
    </React.Fragment>
  );
};
export default SearchResult;