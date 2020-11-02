import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://vehicle-booking-api.herokuapp.com/v1/';

// const getPublicContent = () => {
//   return axios.get(API_URL + 'all');
// };

// const getUserBoard = () => {
//   return axios.get(API_URL + 'user', { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + 'mod', { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + 'admin', { headers: authHeader() });
// };

const getVehicles = () => axios.get(`${API_URL}vehicles`, { headers: authHeader() });
const sampleApi = () => axios.get('https://jsonplaceholder.typicode.com/todos/', {
  headers: authHeader(),
});

export default {
  getVehicles,
  sampleApi,
};
