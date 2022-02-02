import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchResult from "../components/SearchResult";

import './../style/SearchForm.css'; 

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { result, selectedCategory } = props;
  const { albums, artists, playlist, tracks } = result;

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      setErrorMsg('');
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };
  return (
    <div>
      <Form className="d-flex flex-row justify-content-between align-items-center" onSubmit={handleSearch}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Control
            className="form-control"
            type="search"
            name="searchTerm"
            value={searchTerm}
            placeholder="Search for album, artist or playlist"
            onChange={handleInputChange}
            autoComplete="off"
          />
          <SearchResult
            result={result}
            //loadMore={loadMore}
            //setCategory={setCategory}
            selectedCategory={selectedCategory}
          /> 
        </Form.Group>
        <Button className="form-button" variant="info" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};
export default SearchForm;