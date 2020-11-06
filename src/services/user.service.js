import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://vehicle-booking-api.herokuapp.com/v1/';

const bookVehicle = async (vehicle, model, city, date, id) => {
  await axios.post(
    `${API_URL}appointments`,
    {
      vehicle,
      model,
      city,
      date,
      user_id: id,
    },
    { headers: authHeader() },
  ).then(response => { console.log(response); return response.data; });
};

const getVehicles = () => axios.get(`${API_URL}vehicles`, { headers: authHeader() });
const sampleApi = () => axios.get('https://jsonplaceholder.typicode.com/todos/', {
  headers: authHeader(),
});

export default {
  getVehicles,
  sampleApi,
  bookVehicle,
};
