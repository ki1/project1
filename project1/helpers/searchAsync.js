import { setSearchQuery } from '../redux/actions/search';

export const setSearchQueryAsync = (query, submitSearch) => {
  return (dispatch) => {
    return dispatch(setSearchQuery(query)).then(() => {
      return submitSearch(query);
    });
  };
};
