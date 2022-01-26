import React, { Component} from "react";
import InviteMembers from "../components/InviteMembers";
import SearchBar from "../components/SearchBar";
import SongQueue from "../components/SongQueue";

function Session() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h1>Session Page</h1>
        <SearchBar/>
        <InviteMembers/>
        <SongQueue />
      </main>
    );
  }

export default Session;