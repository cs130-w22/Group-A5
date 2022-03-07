import React from "react";
import { Button } from "react-bootstrap";

//    style={{ padding-bottom: "hidden" }}

const InviteMembers = () => {
  return (
    <form action="/invite_users" method="GET">
      <Button type="submit" variant="primary">
        Invite Members
      </Button>
    </form>
  );
};

export default InviteMembers;
