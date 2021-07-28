import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promise from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';
/* Import reducers */
import UserReducer from './User/reducers.js';
import MovieReducer from './Movie/reducers.js';

const isDevEnv = window.location.href.includes('localhost');

const rootReducer = combineReducers({
  /** combine reducer */
user: UserReducer,
	movie: MovieReducer,
  user: UserReducer
})

export const middlewares = [promise, ReduxThunk];

let enhancer;

if (isDevEnv) {
	const composeEnhancer =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancer(applyMiddleware(...middlewares));
} else {
	enhancer = applyMiddleware(...middlewares);
}

export default createStore(rootReducer, enhancer);
