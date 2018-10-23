import axios from 'axios';

export function getMovieDetail(movieID) {
  return {
    type: 'GET_MOVIE_DETAILS',
    payload: axios.get(`/movie/${movieID}`)
  };
}
