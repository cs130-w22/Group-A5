import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchResults from "./SearchResults";
import './../style/SearchForm.css'; 

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { selectedCategory } = props;

  useEffect(() => {
    props.handleSearch(searchTerm);
  }, [searchTerm])

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      setErrorMsg('');
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form className="d-flex flex-row justify-content-between align-items-start" onSubmit={handleSearch}>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Control
            className="form-control"
            type="search"
            name="searchTerm"
            value={searchTerm}
            placeholder="Search for an album, artist, or song"
            onChange={handleInputChange}
            autoComplete="off"
          />
          {searchTerm && 
          (<SearchResults
              //loadMore={loadMore}
              selectedCategory={selectedCategory}
            />
          )} 
        </Form.Group>
        <Button className="form-button" variant="info" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};
export default SearchForm;