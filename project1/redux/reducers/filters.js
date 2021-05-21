import { FILTERS } from '../../config/constants/action-types';

const initialState = {
  deals: [],
  mainDeal: {},
  ssr: false,
  loaded: false,
  empty: false,
  nomore: false,
  lastPage: null,
  lastId: 0,
  url: '',
};

/* eslint-disable default-param-last */
const dealsReducer = (
  state = initialState,
  { type, mainDeal, deals, newdeals, url, ssr }
) => {
  switch (type) {
    case FILTERS.SET_FILTERS: {
      return {
        ...state,
        deals,
        mainDeal,
        loaded: true,
        empty: false,
        nomore: false,
        lastPage: null,
        lastId: 0,
        ssr,
      };
    }
    case FILTERS.EMPTY_FILTERS: {
      return {
        ...state,
        loaded: true,
        empty: true,
        nomore: false,
        lastPage: null,
        lastId: 0,
        url: '',
      };
    }
    case FILTERS.SET_EXTRA_FILTERS: {
      return {
        ...state,
        deals: state.deals.concat(newdeals),
        ssr: false,
      };
    }
    case FILTERS.SET_NO_MORE_FILTERS: {
      return {
        ...state,
        nomore: true,
      };
    }
    case FILTERS.SET_URL_PATH: {
      return {
        ...state,
        url,
      };
    }
    case FILTERS.RESET_FILTERS: {
      return {
        ...state,
        deals: [],
        mainDeal: {},
        ssr: false,
        loaded: false,
        empty: false,
        nomore: false,
        lastPage: null,
        lastId: 0,
        url: '',
      };
    }
    default:
      return state;
  }
};

export default dealsReducer;
