import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './../style/SearchForm.css'; 

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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
      <Form className="flex-container" onSubmit={handleSearch}>
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
        </Form.Group>
        <Button className="form-button" variant="info" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};
export default SearchForm;