import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setInput, getMovieInfo } from './movieSearchActions';

class MovieSearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.getMovie = this.getMovie.bind(this);
  }

  handleInput(event) {
    const { dispatch } = this.props;
    dispatch(setInput(event.target.value));
  }

  getMovie() {
    const { dispatch, inputValue } = this.props;
    dispatch(getMovieInfo(inputValue));
  }

  render() {
    const { searchResults } = this.props;
    return (
      <div className='container'>
        <h1 className='text-center mt-3 mb-3'>Movie Search</h1>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='input-group mb-3'>
              <input
                id='search-bar'
                className='form-control'
                placeholder='Enter Movie Title'
                onChange={ this.handleInput }
              />
              <div className='input-group-append'>
                <button
                  id='search-button'
                  className='btn btn-outline-secondary'
                  onClick={ this.getMovie }
                >
                Find!
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          searchResults.map(result => (
            <div className='card mb-3'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-sm-4'>
                    <img src={ result.Poster } alt='Movie Poster' />
                  </div>
                  <div className='col-sm-8'>
                    <h3 className='card-text'>{ result.Title }</h3>
                    <h4 className='card-text'>{ result.Year }</h4>
                    <hr />
                    <Link className='more-information' to={ `/movie/${result.imdbID}` }>More Information</Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
    inputValue: store.movieSearch.inputValue,
    searchResults: store.movieSearch.searchResults
  };
}

export default connect(mapStoreToProps)(MovieSearchContainer);
