import React, { useState } from "react";
import { connect } from 'react-redux';
import SearchForm from "../components/SearchForm";
import Header from "../components/header";
import Loader from "../components/Loader";
import InviteMembers from "../components/InviteMembers";
import SongQueue from "../components/SongQueue";
import { initiateGetSearchResult } from './actions/result';

const Session = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('tracks');
  
  const handleSearch = (searchTerm) => {
    setIsLoading(true);
    props.dispatch(initiateGetSearchResult(searchTerm)).then(() => {
      setIsLoading(false);
      setSelectedCategory('tracks');
    });
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { tracks } = props;
  const result = { tracks };

  return (
    <React.Fragment>
      <Header />
      <SearchForm 
        handleSearch={handleSearch} 
        result={result}
        selectedCategory={selectedCategory}
      />
      {/* <Loader show={isLoading}>Loading...</Loader> */}
      <InviteMembers/>
      <SongQueue />
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
      tracks: state.tracks,
    };
  };
  
  export default connect(mapStateToProps)(Session);