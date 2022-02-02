import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import SearchFilters from "../components/SearchFilters";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import Header from "../components/header";
import Loader from "../components/Loader";
import {  initiateGetResult } from './actions/result';

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

  const { albums, artists, playlist, tracks } = props;
  const result = { albums, artists, playlist, tracks };

  return (
    <React.Fragment>
      <Header />
      <SearchFilters 
        result={result}
        //loadMore={loadMore}
        setCategory={setCategory}
        selectedCategory={selectedCategory}
      />
      <SearchForm 
        handleSearch={handleSearch} 
        result={result}
        selectedCategory={selectedCategory}
      />
      {/* <Loader show={isLoading}>Loading...</Loader> */}
    </React.Fragment>
  );
  };

  /*  return (
      <main style={{ padding: "1rem 0" }}>
        <h1>Session Page</h1>
        <SearchBar/>
        <InviteMembers/>
        <SongQueue />
        <h2>Session Page</h2>
        <SearchForm>Search</SearchForm>
      </main>
    );
  }*/

  const mapStateToProps = (state) => {
    return {
      albums: state.albums,
      artists: state.artists,
      playlist: state.playlist,
      tracks: state.tracks,
    };
  };
  
  export default connect(mapStateToProps)(Session);