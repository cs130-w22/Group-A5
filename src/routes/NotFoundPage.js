import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';

/* Error message if there is an incompatible url */
const NotFoundPage = () => {
  return (
    <React.Fragment>
      <Header />
      Page not found. Goto <Link to="/dashboard">Home Page</Link>
    </React.Fragment>
  );
};
export default NotFoundPage;