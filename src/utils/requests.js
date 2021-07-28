/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { TheMovieDBBaseUri } from './index';

const themoviedbAPIKey = process.env.REACT_APP_THE_MOVIEDB_API_KEY;

export const getMovieRequest = (set) => {
  const req = axios.get(`${TheMovieDBBaseUri}/movie/${set}`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  return req;
};
