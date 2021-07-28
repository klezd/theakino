/* eslint-disable no-use-before-define */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ActionType } from 'redux-promise-middleware';

import { TheMovieDBBaseUri } from '../../utils';
import {
  GET_MOVIES_BY_SET,
  GET_MOVIE_BY_ID,
  GET_MOVIE_TRAILER_BY_ID,
  GET_RECOMMENDATIONS_BY_ID,
  GET_MOVIE_PROVIDERS,
  GET_MOVIE_INFO
} from '../actionType';

const themoviedbAPIKey = process.env.REACT_APP_THE_MOVIEDB_API_KEY;

/**
 * Dispatch action getMoviesBySet
 * @param {string} set : now_playing, top_rated, upcoming
 */
export const getMoviesBySet = (set) => (dispatch) => {
  let s;
  if (!set) {
    s = 'now_playing';
  } else {
    s = set;
  }
  dispatch({
    type: `${GET_MOVIES_BY_SET}_${ActionType.Pending}`,
    payload: { set }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/movie/${s}`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });

  req
    .then((val) => {
      dispatch({
        type: `${GET_MOVIES_BY_SET}_${ActionType.Fulfilled}`,
        payload: { data: val.data, set }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_MOVIES_BY_SET}_${ActionType.Rejected}`,
        payload: { err: e.message, set }
      });
    });
};

export const getMoviesAllSet = () => (dispatch) => {
  ['now_playing', 'top_rated', 'upcoming'].map((s) =>
    dispatch(getMoviesBySet(s))
  );
};

const infosDir = [
  { endpoint: 'videos', key: 'trailers' },
  { endpoint: 'recommendations', key: 'recommendations' },
  { endpoint: 'watch/providers', key: 'providers' },
  { endpoint: 'credits', key: 'credits' },
  { endpoint: 'reviews', key: 'reviews' }
];

/**
 *
 * @param {*} id : movie id
 * @param {*} endpoint : videos, recommendations, watch/providers, credits
 * @param {*} key : trailers, recommendations, providers, credits
 * @returns
 */
export const getMovieInfoById = (id, endpoint, key) => (dispatch) => {
  dispatch({
    type: `${GET_MOVIE_INFO}_${ActionType.Pending}`,
    payload: { id, key }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/movie/${id}/${endpoint}`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  req
    .then((val) => {
      dispatch({
        type: `${GET_MOVIE_INFO}_${ActionType.Fulfilled}`,
        payload: { data: val.data, id, key }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_MOVIE_INFO}_${ActionType.Rejected}`,
        payload: { err: e.message, id, key }
      });
    });
};

export const getMovieById = (id) => (dispatch) => {
  dispatch({
    type: `${GET_MOVIE_BY_ID}_${ActionType.Pending}`,
    payload: { id }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/movie/${id}`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  req
    .then((val) => {
      infosDir.map((i) => dispatch(getMovieInfoById(id, i.endpoint, i.key)));
      dispatch({
        type: `${GET_MOVIE_BY_ID}_${ActionType.Fulfilled}`,
        payload: { data: val.data, id }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_MOVIE_BY_ID}_${ActionType.Rejected}`,
        payload: { err: e.message, id }
      });
    });
};

export const getMovieTrailerById = (id) => (dispatch) => {
  dispatch({
    type: `${GET_MOVIE_TRAILER_BY_ID}_${ActionType.Pending}`,
    payload: { id }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/movie/${id}/videos`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  req
    .then((val) => {
      dispatch({
        type: `${GET_MOVIE_TRAILER_BY_ID}_${ActionType.Fulfilled}`,
        payload: { data: val.data, id }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_MOVIE_TRAILER_BY_ID}_${ActionType.Rejected}`,
        payload: { err: e.message, id }
      });
    });
};

export const getRecommendationsById = (id) => (dispatch) => {
  dispatch({
    type: `${GET_RECOMMENDATIONS_BY_ID}_${ActionType.Pending}`,
    payload: { id }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/movie/${id}/recommendations`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  req
    .then((val) => {
      dispatch({
        type: `${GET_RECOMMENDATIONS_BY_ID}_${ActionType.Fulfilled}`,
        payload: { data: val.data.results.slice(0, 5), id }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_RECOMMENDATIONS_BY_ID}_${ActionType.Rejected}`,
        payload: { err: e.message, id }
      });
    });
};

export const getMovieProviders = (id) => (dispatch) => {
  dispatch({
    type: `${GET_MOVIE_PROVIDERS}_${ActionType.Pending}`,
    payload: { id }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/movie/${id}/watch/providers`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  req
    .then((val) => {
      const result = val.data.results;
      dispatch({
        type: `${GET_MOVIE_PROVIDERS}_${ActionType.Fulfilled}`,
        payload: { data: result, id }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_MOVIE_PROVIDERS}_${ActionType.Rejected}`,
        payload: { err: e.message, id }
      });
    });
};
