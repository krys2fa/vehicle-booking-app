/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Vehicles from './components/Vehicles';
import Details from './components/Details';
import Bookings from './components/Bookings';
import Book from './components/Book';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

import history from './helpers/history';

const App = () => {
  const { user } = useSelector(state => state.auth);
  console.log('App -> user', user);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(location => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <BrowserRouter history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-brand">Vehicle Bookings</div>
          <div className="navbar-nav mr-auto">
            {user && (
              <li className="nav-item">
                <div className="nav-link">{user.username}</div>
              </li>
            )}
          </div>

          {user ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="nav-link">{user.username}</div>
              </li>
              <li className="nav-item">
                <Link to="/bookings" className="nav-link">
                  Bookings
                </Link>
                <Link to="/vehicle" className="nav-link">
                  Vehicles
                </Link>
                <Link to="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
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
            <Route exact path={['/', '/login']} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/vehicle" component={Vehicles} />
            <Route exact path="/bookings" component={Bookings} />
            <Route exact path="/book" component={Book} />
            <Route path="/vehicle/:id" component={Details} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
