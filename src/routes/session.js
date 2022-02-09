import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import Header from "../components/header";
import Loader from "../components/Loader";
import {
  initiateGetResult
} from './actions/result';
//function Session() {
const Session = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');
  
  const handleSearch = (searchTerm) => {
    setIsLoading(true);
    props.dispatch(initiateGetResult(searchTerm)).then(() => {
      setIsLoading(false);
      setSelectedCategory('albums');
    });
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  return (
    <React.Fragment>
      <Header />
      <SearchForm handleSearch={handleSearch} />
      {/* <Loader show={isLoading}>Loading...</Loader> */}
      <SearchResult
        result={result}
        //loadMore={loadMore}
        setCategory={setCategory}
        selectedCategory={selectedCategory}
      /> 
    </React.Fragment>
  );
  };

  /*  return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Session Page</h2>
        <SearchForm>Search</SearchForm>
      </main>
    );
  }*/

  const mapStateToProps = (state) => {
    return {
      albums: state.albums,
      artists: state.artists,
      playlist: state.playlist
    };
  };
  
  export default connect(mapStateToProps)(Session);