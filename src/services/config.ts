import axios from 'axios';

const developmentURL = 'http://localhost';
const productionURL = 'https://eabmodel.herokuapp.com/';

export const axiosBaseInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? productionURL : developmentURL,
});
