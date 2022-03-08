import React from "react";
import { Button } from "react-bootstrap";

/**
   * Create button to go to the Invite User page
   */
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
