import { DEALS } from '../../config/constants/action-types';

export const FEATURED_DEALS_LOADED = {
  UNCOMPLETE: 'UNCOMPLETE',
  COMPLETE: 'COMPLETE',
};

const initialState = {
  deals: [],
  secondary_deals: [],
  mainDeal: {},
  evergreenUrl: null,
  facetedNavigation: {},
  ssr: true,
  nomore: false,
  recommendedDeals: [],
  newProductDeals: [],
  recentlyViewedDeals: [],
  lastPage: null,
  lastId: 0,
  featuredDealsLoaded: FEATURED_DEALS_LOADED.UNCOMPLETE,
  canonicalUrl: null,
};

/* eslint-disable default-param-last */
const dealsReducer = (
  state = initialState,
  {
    type,
    mainDeal,
    facetedNavigation,
    deals,
    evergreenUrl,
    newdeals,
    secondary_deals,
    ssr,
    recommendedDeals,
    newProductDeals,
    recentlyViewedDeals,
    featuredDealsLoaded,
    lastPage,
    lastId,
    canonicalUrl,
  }
) => {
  switch (type) {
    case DEALS.SET_DEALS: {
      return {
        ...state,
        deals,
        mainDeal,
        evergreenUrl,
        facetedNavigation: JSON.parse(JSON.stringify(facetedNavigation)),
        secondary_deals,
        nomore: false,
        lastPage: null,
        lastId: 0,
        ssr,
        canonicalUrl,
      };
    }
    case DEALS.SET_ONLY_MAIN_DEAL: {
      return {
        ...state,
        mainDeal,
        secondary_deals,
      };
    }
    case DEALS.SET_WITHOUT_MAIN_DEAL: {
      return {
        ...state,
        deals,
        facetedNavigation: JSON.parse(JSON.stringify(facetedNavigation)),
        canonicalUrl,
        ssr,
      };
    }
    case DEALS.SET_EXTRA_DEALS: {
      return {
        ...state,
        deals: state.deals.concat(newdeals),
        ssr: false,
      };
    }
    case DEALS.SET_NO_MORE_DEALS: {
      return {
        ...state,
        nomore: true,
        lastPage,
      };
    }
    case DEALS.SET_LAST_ID: {
      return {
        ...state,
        lastId,
      };
    }
    case DEALS.SET_RECOMMENDED_DEALS: {
      return {
        ...state,
        recommendedDeals,
      };
    }
    case DEALS.SET_NEW_PRODUCT_DEALS: {
      return {
        ...state,
        newProductDeals,
      };
    }
    case DEALS.SET_RECENTLY_VIEWED_DEALS: {
      return {
        ...state,
        recentlyViewedDeals,
      };
    }
    case DEALS.SET_ALL_FEATURED_DEALS_LOADED: {
      return {
        ...state,
        featuredDealsLoaded: featuredDealsLoaded,
      };
    }
    default:
      return state;
  }
};

export default dealsReducer;
