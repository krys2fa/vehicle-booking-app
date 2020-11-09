/* eslint-disable import/extensions */
import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Vehicles from './components/Vehicles';
import Details from './components/Details';
import Bookings from './components/Bookings';
import Book from './components/Book';

import history from './helpers/history';
import NavBar from './components/NavBar/NavBar';

const App = () => (
  <BrowserRouter history={history}>
    <div>
      <NavBar />
      <div className="container mt-3">
        <Switch>
          <Route exact path={['/', '/login']} component={Login} />
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

export default App;
