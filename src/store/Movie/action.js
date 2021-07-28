/* eslint-disable no-use-before-define */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ActionType } from 'redux-promise-middleware';

import {
  TheMovieDBBaseUri,
  themoviedbAPIKey,
  infosDir,
  MovieSetArray
} from '../../utils/requests';
import {
  GET_MOVIES_BY_SET,
  GET_MOVIE_BY_ID,
  GET_MOVIE_INFO
} from '../actionType';

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
  MovieSetArray.map((s) => dispatch(getMoviesBySet(s)));
};

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
