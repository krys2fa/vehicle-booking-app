/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const history = useHistory();

  console.log('Profile -> user', user);

  if (user === null) {
    history.push('/login');
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.user.username}</strong>
          {' '}
          Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {' '}
        {user.token}
        {' '}
        ...
        {' '}
        {/* {user.accessToken.substr(user.accessToken.length - 20)} */}
      </p>
      <p>
        <strong>Id:</strong>
        {' '}
        {user.user.id}
      </p>
      {/* <p>
        <strong>Email:</strong>
        {' '}
        {user.email}
      </p> */}
      {/* <strong>Authorities:</strong>
      <ul>
        {user.roles
          && user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;
