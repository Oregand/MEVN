/* eslint-disable */

import axios from 'axios';

export default() => {
  return axios.create({
    baseURL: process.env.ALBUMS_URL
  });
};