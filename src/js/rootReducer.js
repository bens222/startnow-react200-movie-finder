import { combineReducers } from 'redux';
import movieSearchReducer from './containers/movieSearchReducer';
import movieDetailReducer from './containers/movieDetailReducer';

const rootReducer = combineReducers({
  movieSearch: movieSearchReducer,
  movieDetail: movieDetailReducer
});

export default rootReducer;
