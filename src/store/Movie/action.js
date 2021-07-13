/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ActionType } from 'redux-promise-middleware';

import { TheMovieDBBaseUri } from '../../utils';
import { GET_MOVIES_BY_SET } from '../actionType';

const themoviedbAPIKey = process.env.REACT_APP_THE_MOVIEDB_API_KEY;
/**
 *
 * @param {string} set : latest, now_playing, top_rated, upcoming
 */
export const getMoviesBySet =
  (set = 'latest') =>
  (dispatch) => {
    dispatch({
      type: `${GET_MOVIES_BY_SET}_${ActionType.Pending}`
    });

    const req = axios.get(`${TheMovieDBBaseUri}/movie/${set}`, {
      params: { api_key: themoviedbAPIKey, language: 'en-US' }
    });

    req.then(
      (val) => {
        console.log(val.data);
      },
      (e) => {
        console.error(e);
        dispatch({
          type: `${GET_MOVIES_BY_SET}_${ActionType.Rejected}`,
          payload: e.message
        });
      }
    );
  };
