import axios from 'axios';

const API_URL = 'https://vehicle-booking-api.herokuapp.com/v1/';

const register = (username, password) => axios
  .post(`${API_URL}users`, {
    username,
    password,
  })
  .then(response => {
    console.log('response service', response);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const login = (username, password) => axios
  .post(`${API_URL}login`, {
    username,
    password,
  })
  .then(response => {
    console.log('response', response);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
