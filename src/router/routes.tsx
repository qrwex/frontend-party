import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from 'pages/home';
import ServersPage from 'pages/servers';
import { Paths } from 'shared/constants';
import requireAuth from './hocs/requireAuth';

const Routes = () => (
  <Switch>
    <Route exact path={Paths.Home} component={HomePage} />
    <Route exact path={Paths.Servers} component={requireAuth(ServersPage)} />
    <Redirect to={Paths.Home} />
  </Switch>
);

export default Routes;
