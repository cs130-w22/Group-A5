import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import tracksReducer from '../reducers/tracks';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

/**
   * Store search results
   */
const store = createStore(
  combineReducers({
    tracks: tracksReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;