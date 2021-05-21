import { SEARCH } from '../../config/constants/action-types';

const searchReducerState = {
  suggestions: [],
  searchQuery: '',
  searchResults: [],
  status: false,
  panelVisible: false,
  noResult: true,
};

export const searchReducer = (
  // eslint-disable-next-line default-param-last
  state = searchReducerState,
  {
    type,
    suggestions = [],
    searchQuery = '',
    searchResults,
    status,
    panelVisible,
  }
) => {
  switch (type) {
    case SEARCH.SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: searchQuery,
      };
    }
    case SEARCH.SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: searchResults,
      };
    }
    case SEARCH.SEARCH_SUGGESTIONS: {
      return {
        ...state,
        suggestions: suggestions,
      };
    }
    case SEARCH.SEARCH_IS_LOADING: {
      return {
        ...state,
        status: status,
      };
    }
    case SEARCH.SEARCH_PANEL_VISIBILITY: {
      const noResult = suggestions === [] || suggestions.length === 0;

      return {
        ...state,
        panelVisible: panelVisible,
        noResult: noResult,
      };
    }
    default:
      return state;
  }
};
