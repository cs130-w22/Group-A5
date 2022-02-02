import React from 'react';
import _ from 'lodash';
import AlbumsList from './AlbumsList';
import ArtistsList from './ArtistsList';
import PlayList from './PlayList';
import TracksList from './TracksList';
import "./../style/SearchResult.css"; 

const SearchResult = (props) => {
  const { result, selectedCategory } = props;
  const { albums, artists, playlist, tracks } = result;

  return (
    <React.Fragment>
      <div className={`${selectedCategory === 'tracks' ? 'searchResult' : 'hide'}`}>
        {tracks && <TracksList tracks={tracks} />}
      </div>
    </React.Fragment>
  );
};
export default SearchResult;