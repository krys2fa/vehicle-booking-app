/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Router, Switch, Route, Link,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

import history from './helpers/history';

const App = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(location => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            Vehicle Bookings
          </Link>
          <div className="navbar-nav mr-auto">

            {currentUser && (
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link">
                  Login
                </a>
              </li>

              <li className="nav-item">
                <a href="/register" className="nav-link">
                  Sign Up
                </a>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
