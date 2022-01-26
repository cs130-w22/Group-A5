import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../../App';
import Redirect from '../redirect';
import Session from '../session';
import NotFoundPage from '../NotFoundPage';
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={App} exact={true} />
            <Route path="/redirect" component={Redirect} />
            <Route path="/dashboard" component={Session} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default AppRouter;