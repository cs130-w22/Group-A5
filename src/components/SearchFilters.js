import React from "react";
import _ from 'lodash';
import "./../style/SearchFilters.css";

const SearchFilters = (props) => {
    const { result, setCategory, selectedCategory } = props;
    const { albums, artists, playlist } = result;

    return(
        <React.Fragment>
            <div className="search-buttons">
                <button
                    className={`${
                    selectedCategory === 'albums' ? 'btn active' : 'btn'
                    }`}
                    onClick={() => setCategory('albums')}
                >
                    Albums
                </button>
                <button
                    className={`${
                    selectedCategory === 'artists' ? 'btn active' : 'btn'
                    }`}
                    onClick={() => setCategory('artists')}
                >
                    Artists
                </button>
                <button
                    className={`${
                    selectedCategory === 'playlist' ? 'btn active' : 'btn'
                    }`}
                    onClick={() => setCategory('playlist')}
                >
                    PlayLists
                </button>
            </div>
        </React.Fragment>
    );
}

export default SearchFilters;