import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchResults from "./SearchResults";
import './../style/SearchForm.css'; 
import './../style/styles.css'; 

/* Create search bar where users can type to get related songs */
const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { selectedCategory, setSongQueue } = props;

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
              setSongQueue={setSongQueue}
            />
          )} 
        </Form.Group>
        <Button className="form-button custom-button" variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};
export default SearchForm;