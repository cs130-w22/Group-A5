import React from "react";

const SearchBar = () => {
  return (
    <form>
        <input type="text" name="searchq" placeholder="Search"/>
        <input type="submit" value="Submit" />
    </form>
  );
}

export default SearchBar;