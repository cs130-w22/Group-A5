import React from 'react';
import { Button } from 'react-bootstrap';
import { FiUserPlus } from "react-icons/fi";

/**
   * Create header for the top of the session page, which displays the session code
   */
const Header = () => {
  const sessionCode = sessionStorage.getItem('sessionCode');
  const username = sessionStorage.getItem('username');

  const inviteUsers = () => {
    window.location = "/invite_users";
  }

  return (
    <div className='d-flex flex-row justify-content-between align-items-center '>
      <div className='d-flex flex-row justify-content-between align-items-center '>
        <h1 className="main-heading">Session #{sessionCode}</h1>  
        <FiUserPlus className='custom-button' size={45} style={{marginLeft: '20px', padding: '10px', borderRadius: '25px', cursor: 'pointer'}} onClick={inviteUsers}/>
      </div>
      <h3 className="main-heading" style={{color: '#E89BBB', fontStyle: 'italic'}}>@{username}</h3>
    </div>
  ); 
};
export default Header;

/* <FiUserPlus className='custom-button' size={45} style={{marginLeft: '20px', padding: '8px', borderRadius: '25px', cursor: 'pointer'}} onClick={inviteUsers}/> */