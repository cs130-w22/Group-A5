import React from "react";
import _ from 'lodash';
import "./../style/SearchFilters.css";

const SearchFilters = (props) => {
    const { result, setCategory, selectedCategory } = props;

    return(
        <React.Fragment>
            <div className="search-buttons">
                <button
                    className={`${
                    selectedCategory === 'tracks' ? 'btn active' : 'btn'
                    }`}
                    onClick={() => setCategory('tracks')}
                >
                    Tracks
                </button>
            </div>
        </React.Fragment>
    );
}

export default SearchFilters;