/* eslint-disable */

import axios from 'axios';

export default() => {
  return axios.create({
    baseURL: process.env.BASE_URL
  });
};