import React from "react";

/**
   * Create search bar for the session page
   */
const SearchBar = () => {
  return (
    <form>
        <input type="text" name="searchq" placeholder="Search"/>
        <input type="submit" value="Submit" />
    </form>
  );
}

export default SearchBar;