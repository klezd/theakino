import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promise from 'redux-promise-middleware';
/* Import reducers */
import MovieReducer from './Movie/reducers.js';
import UserReducer from './User/reducers';

const isDevEnv = window.location.href.includes('localhost');

const rootReducer = combineReducers({
  /** combine reducer */
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
