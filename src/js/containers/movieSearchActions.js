import axios from 'axios';

export function setInput(inputValue) {
  return {
    type: 'SET_INPUT',
    payload: inputValue
  };
}

export function getMovieInfo(inputValue) {
  return {
    type: 'GET_MOVIE_INFO',
    payload: axios.get(`/movieInfo/${inputValue}`)
  };
}
