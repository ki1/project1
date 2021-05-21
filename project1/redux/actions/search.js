import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { SEARCH } from '../../config/constants/action-types';
import {
  SUGGESTEDSEARCHURL,
  SEARCHURL,
  SITE_LIVINGSOCIAL_IE,
} from '../../config/setup/setup';
import httpCommonHeaders from '../../helpers/httpCommonHeaders';

const setSearchResults = (searchResults) => async (dispatch) => {
  dispatch({ type: SEARCH.SEARCH_RESULTS, searchResults });
};

const setSearchLoading = (status) => async (dispatch) => {
  dispatch({ type: SEARCH.SEARCH_IS_LOADING, status });
};

export const getTopSearches = () => {
  return process.env.NEXT_PUBLIC_BRAND === SITE_LIVINGSOCIAL_IE
    ? [
        'mattress',
        'radiator cover',
        'gaming chair',
        'bed',
        'chair',
        'weighted blanket',
        'headboard',
        'blanket',
        'tablet',
      ]
    : [
        'bed',
        'mattress',
        'treadmill',
        'ipad',
        'emma mattress',
        'laptop',
        'exercise bike',
        'ottoman bed',
        'gaming chair',
      ];
};

export const setSearchQuery = (searchQuery) => async (dispatch) => {
  dispatch({ type: SEARCH.SEARCH_QUERY, searchQuery });
};

export const setSearchPanelVisibility = (panelVisible) => async (dispatch) => {
  dispatch({ type: SEARCH.SEARCH_PANEL_VISIBILITY, panelVisible });
};

//Get search suggestions from suggesterAPI when typing more than 3 characters into searchbar
export const getSearchSuggestions = (searchTerm, location) => async (
  dispatch
) => {
  try {
    dispatch(setSearchLoading(true));
    axios({
      method: 'get',
      url: `${SUGGESTEDSEARCHURL}/${location}?keyword=${searchTerm}`,
      headers: httpCommonHeaders(),
    })
      // eslint-disable-next-line promise/catch-or-return,promise/always-return
      .then((res) => {
        const suggestions = res.data;
        dispatch({ type: SEARCH.SEARCH_SUGGESTIONS, suggestions });
      })
      .catch((error) => {
        console.log(`error [getSearchSuggestions function] => ${error}`);
        return false;
      });
  } catch (error) {
    console.log(`error [AXIOS REQUEST: getSearchSuggestions] => ${error}`);
    return false;
  }

  dispatch(setSearchLoading(false));
};

export const getSuggestedSearches = (event, location) => async (dispatch) => {
  const query = event.target.value;
  dispatch(setSearchQuery(query));

  if (query.length > 2) {
    dispatch(getSearchSuggestions(query, location));
  }
};

//get results from search when pressing enter in search bar area
export const getSearchResults = (searchQuery, _location) => async (
  dispatch
) => {
  const location = _location || 'london';

  try {
    const res = await axios({
      method: 'get',
      url: `${SEARCHURL}/${location}?page=0&minPrice=0&maxPrice=5000&orderBy=popularity&order=desc&pageSize=25&q=${searchQuery}&facetedNavigation=true`,
      headers: httpCommonHeaders(),
    });

    dispatch(setSearchResults(res.data.deals));
  } catch (error) {
    console.log(`error [AXIOS REQUEST: getSearchResults] => ${error}`);
    return false;
  }
};
