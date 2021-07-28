import { ActionType } from 'redux-promise-middleware';

import {
  GET_TV_SHOWS_BY_SET,
  GET_TV_SHOW_BY_ID,
  GET_TV_SHOW_INFO
} from '../actionType';

const initialState = {
  // Add here your init state
  allShows: {
    popular: {
      loading: false,
      data: [],
      err: null
    },
    on_the_air: {
      loading: false,
      data: [],
      err: null
    },
    top_rated: {
      loading: false,
      data: [],
      err: null
    }
  },
  currentShow: {},
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_TV_SHOWS_BY_SET}_${ActionType.Pending}`: {
      const s = action.payload.set;
      return {
        ...state,
        allShows: {
          ...state.allShows,
          [s]: { ...state.allShows[s], loading: true }
        }
      };
    }

    case `${GET_TV_SHOWS_BY_SET}_${ActionType.Fulfilled}`: {
      const { data } = action.payload;
      const s = action.payload.set;

      return {
        ...state,
        allShows: {
          ...state.allShows,
          [s]: {
            ...state.allShows[s],
            loading: false,
            data
          }
        }
      };
    }

    case `${GET_TV_SHOWS_BY_SET}_${ActionType.Rejected}`: {
      const { err } = action.payload;
      const s = action.payload.set;

      return {
        ...state,
        allShows: {
          ...state.allShows,
          [s]: {
            ...state.allShows[s],
            loading: false,
            err
          }
        }
      };
    }

    case `${GET_TV_SHOW_BY_ID}_${ActionType.Pending}`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_TV_SHOW_BY_ID}_${ActionType.Fulfilled}`:
      return {
        ...state,
        loading: false,
        error: null,
        currentShow: {
          [action.payload.id]: {
            ...state.currentShow[action.payload.id],
            data: action.payload.data
          }
        }
      };

    case `${GET_TV_SHOW_BY_ID}_${ActionType.Rejected}`:
      return {
        ...state,
        loading: false,
        error: action.payload.err,
        currentShow: {
          [action.payload.id]: {
            ...state.currentShow[action.payload.id],
            data: null,
            error: action.payload.err
          }
        }
      };

    case `${GET_TV_SHOW_INFO}_${ActionType.Pending}`:
      return {
        ...state,
        currentShow: {
          [action.payload.id]: {
            ...state.currentShow[action.payload.id],
            loading: true,
            error: null
          }
        }
      };

    case `${GET_TV_SHOW_INFO}_${ActionType.Fulfilled}`:
      return {
        ...state,
        currentShow: {
          [action.payload.id]: {
            ...state.currentShow[action.payload.id],
            [action.payload.key]: action.payload.data,
            loading: false
          }
        }
      };

    case `${GET_TV_SHOW_INFO}_${ActionType.Rejected}`:
      return {
        ...state,
        currentShow: {
          [action.payload.id]: {
            ...state.currentShow[action.payload.id],
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
