import { ActionType } from 'redux-promise-middleware';

import {
  GET_MOVIES_BY_SET,
  GET_MOVIE_BY_ID,
  GET_MOVIE_INFO
} from '../actionType';

const initialState = {
  // Add here your init state
  movies: {
    toprated: {
      loading: false,
      data: [],
      err: null
    },
    upcoming: {
      loading: false,
      data: [],
      err: null
    },
    now_playing: {
      loading: false,
      data: [],
      err: null
    }
  },
  currentMovie: {},
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_MOVIES_BY_SET}_${ActionType.Pending}`: {
      const s = action.payload.set;
      return {
        ...state,
        movies: {
          ...state.movies,
          [s]: { ...state.movies[s], loading: true }
        }
      };
    }

    case `${GET_MOVIES_BY_SET}_${ActionType.Fulfilled}`: {
      const { data } = action.payload;
      const s = action.payload.set;

      return {
        ...state,
        movies: {
          ...state.movies,
          [s]: {
            ...state.movies[s],
            loading: false,
            data
          }
        }
      };
    }

    case `${GET_MOVIES_BY_SET}_${ActionType.Rejected}`: {
      const { err } = action.payload;
      const s = action.payload.set;

      return {
        ...state,
        movies: {
          ...state.movies,
          [s]: {
            ...state.movies[s],
            loading: false,
            err
          }
        }
      };
    }

    case `${GET_MOVIE_BY_ID}_${ActionType.Pending}`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_MOVIE_BY_ID}_${ActionType.Fulfilled}`:
      return {
        ...state,
        loading: false,
        error: null,
        currentMovie: {
          [action.payload.id]: {
            ...state.currentMovie[action.payload.id],
            data: action.payload.data
          }
        }
      };

    case `${GET_MOVIE_BY_ID}_${ActionType.Rejected}`:
      return {
        ...state,
        loading: false,
        error: action.payload.err,
        currentMovie: {
          [action.payload.id]: {
            ...state.currentMovie[action.payload.id],
            data: null,
            error: action.payload.err
          }
        }
      };

    case `${GET_MOVIE_INFO}_${ActionType.Pending}`:
      return {
        ...state,
        currentMovie: {
          [action.payload.id]: {
            ...state.currentMovie[action.payload.id],
            loading: true,
            error: null
          }
        }
      };

    case `${GET_MOVIE_INFO}_${ActionType.Fulfilled}`:
      return {
        ...state,
        currentMovie: {
          [action.payload.id]: {
            ...state.currentMovie[action.payload.id],
            [action.payload.key]: action.payload.data,
            loading: false
          }
        }
      };

    case `${GET_MOVIE_INFO}_${ActionType.Rejected}`:
      return {
        ...state,
        currentMovie: {
          [action.payload.id]: {
            ...state.currentMovie[action.payload.id],
            [action.payload.key]: [],
            error: action.payload.err,
            loading: false
          }
        }
      };
    default:
      return state;
  }
};
