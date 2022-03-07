import React from "react";
import { Button } from 'react-bootstrap';
import './../style/styles.css'; 

/* const InviteMembers = () => {
  return (
    <Button className="custom-button" variant="primary">Invite Members</Button> */

//    style={{ padding-bottom: "hidden" }}

const InviteMembers = () => {
  return (
    <form action="/invite_users" method="GET">
      <Button className="custom-button" type="submit" variant="primary">
        Invite Members
      </Button>
    </form>
  );
};

export default InviteMembers;
