import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../../App";
import Redirect from "../redirect";
import Session from "../session";
import NotFoundPage from "../NotFoundPage";

import InviteUsers from "../InviteUsers";
import Temp from "../Temp";
import JoinForm from "../JoinForm";

/**
   * Direct to next page upon button push
   */
const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route path="/" component={App} exact={true} />
          <Route path="/redirect" component={Redirect} />
          <Route path="/dashboard" component={Session} />
          <Route path="/invite_users" component={InviteUsers} />
          <Route path="/temp" component={Temp} />
          <Route path="/join_session" component={JoinForm} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default AppRouter;
