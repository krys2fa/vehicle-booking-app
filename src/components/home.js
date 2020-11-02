/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import UserService from '../services/user.service';

const Home = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.sampleApi().then(
      response => {
        console.log('Home -> response.data', response.data);
        setContent(response.data);
      },
      error => {
        const _content = (error.response && error.response.data)
          || error.message
          || error.toString();

        setContent(_content);
      },
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content.map(item => item.title)}</h3>
      </header>
    </div>
  );
};

export default Home;
