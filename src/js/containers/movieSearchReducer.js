const defaultState = {
  inputValue: '',
  searchResults: []
};

export default function movieSearchReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_INPUT': {
      return {
        ...state,
        inputValue: payload
      };
    }
    case 'GET_MOVIE_INFO_FULFILLED': {
      return {
        ...state,
        searchResults: payload.data.Search
      };
    }
    default: {
      return state;
    }
  }
}
