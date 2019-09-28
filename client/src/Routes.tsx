import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useAuth } from 'context/AuthContext';
import { CreateUser } from 'pages/CreateUser';
import { Login } from 'pages/Login';
import { MainPage } from 'pages/MainPage';

export const Routes: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        {isLoggedIn() ? (
          <>
            <Route path="/dashboard" component={MainPage} />
            <Redirect to="/dashboard" />
          </>
        ) : (
          <>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/create" component={CreateUser} />
            <Redirect to="/auth/login" exact />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};
