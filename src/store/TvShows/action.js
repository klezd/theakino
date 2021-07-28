/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ActionType } from 'redux-promise-middleware';

import {
  TheMovieDBBaseUri,
  themoviedbAPIKey,
  infosDir,
  TVSetArray
} from '../../utils/requests';

import {
  GET_TV_SHOW_INFO,
  GET_TV_SHOW_BY_ID,
  GET_TV_SHOWS_BY_SET
} from '../actionType';

/**
 * Dispatch action getTVBySet
 * @param {string} set : latest, popular, on_the_air, top_rated
 */
export const getTVBySet = (set) => (dispatch) => {
  let s;
  if (!set) {
    s = 'now_playing';
  } else {
    s = set;
  }
  dispatch({
    type: `${GET_TV_SHOWS_BY_SET}_${ActionType.Pending}`,
    payload: { set }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/tv/${s}`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });

  req
    .then((val) => {
      dispatch({
        type: `${GET_TV_SHOWS_BY_SET}_${ActionType.Fulfilled}`,
        payload: { data: val.data, set }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_TV_SHOWS_BY_SET}_${ActionType.Rejected}`,
        payload: { err: e.message, set }
      });
    });
};

export const getTVAllSet = () => (dispatch) => {
  TVSetArray.map((s) => dispatch(getTVBySet(s)));
};

export const getTVShowInfo = (id, endpoint, key) => (dispatch) => {
  dispatch({
    type: `${GET_TV_SHOW_INFO}_${ActionType.Pending}`,
    payload: { id, key }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/tv/${id}/${endpoint}`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  req
    .then((val) => {
      dispatch({
        type: `${GET_TV_SHOW_INFO}_${ActionType.Fulfilled}`,
        payload: { data: val.data, id, key }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_TV_SHOW_INFO}_${ActionType.Rejected}`,
        payload: { err: e.message, id, key }
      });
    });
};

export const getTVShowById = (id) => (dispatch) => {
  dispatch({
    type: `${GET_TV_SHOW_BY_ID}_${ActionType.Pending}`,
    payload: { id }
  });

  const req = axios.get(`${TheMovieDBBaseUri}/tv/${id}`, {
    params: { api_key: themoviedbAPIKey, language: 'en-US' }
  });
  req
    .then((val) => {
      infosDir.map((i) => dispatch(getTVShowById(id, i.endpoint, i.key)));
      dispatch({
        type: `${GET_TV_SHOW_BY_ID}_${ActionType.Fulfilled}`,
        payload: { data: val.data, id }
      });
    })
    .catch((e) => {
      dispatch({
        type: `${GET_TV_SHOW_BY_ID}_${ActionType.Rejected}`,
        payload: { err: e.message, id }
      });
    });
};
