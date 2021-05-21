import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { DEALS } from '../../config/constants/action-types';
import httpCommonHeaders from '../../helpers/httpCommonHeaders';
import { DESKTOP_PAGE_SIZE } from '../../config/links/links';
import { FEATURED_DEALS_LOADED } from '../reducers/deals';
import { trackError, trackEvent, updateDod } from '../../helpers/analytics';
import {
  FETCH_DEALS_ERROR,
  ERROR_FETCHING_DEALS,
} from '../../config/text/text';
import { stripOrigin } from '../../helpers/url';
import { getDealsFeedUrl } from '../../helpers/deals';

export const setDeals = ({
  mainDeal,
  facetedNavigation,
  deals,
  secondary_deals,
  ssr,
  evergreenUrl,
  canonicalUrl,
}) => (dispatch) => {
  if (mainDeal && Object.keys(mainDeal).length !== 0)
    return dispatch({
      type: DEALS.SET_DEALS,
      mainDeal,
      facetedNavigation,
      deals,
      secondary_deals,
      ssr,
      evergreenUrl,
      canonicalUrl,
    });

  return dispatch({
    type: DEALS.SET_WITHOUT_MAIN_DEAL,
    facetedNavigation,
    deals,
    ssr,
    canonicalUrl,
  });
};

const noMoreDeals = ({ dispatch, page, deals = [] }) => {
  if (!deals.length || deals.length < DESKTOP_PAGE_SIZE) {
    dispatch(setNoMoreDeals(page));
  }
};

/* eslint-disable sonarjs/cognitive-complexity */
export const getDeals = ({
  dealId,
  slug,
  ssr = false,
  page = 0,
  pageSize = DESKTOP_PAGE_SIZE,
  secondaryDealsCount,
  onlyMainDeal = false,
}) => async (dispatch) => {
  const url = getDealsFeedUrl({
    dealId,
    slug,
    page,
    pageSize,
    offset: secondaryDealsCount,
  });

  try {
    const response = await axios(url, {
      method: 'GET',
      // widthCredentials is true if ssr is false
      withCredentials: !ssr,
      headers: httpCommonHeaders(),
    });
    if (!response.data) throw new Error('Empty response from server');

    const { data } = response;
    let deals = data.deals || [];
    deals = deals
      .map((item) => Object.assign(item, { page }))
      // BE BUG: we get +1 deals on page > 0. slice to ensure we always have the correct number
      .slice(0, pageSize + (page > 0 ? 0 : secondaryDealsCount));

    let secondary_deals = [];
    if (data.mainDeal && Object.keys(data.mainDeal).length !== 0) {
      secondary_deals = deals.splice(0, secondaryDealsCount);
    }

    if (onlyMainDeal) {
      dispatch(
        setOnlyMainDeal(data.mainDeal ? data.mainDeal : {}, secondary_deals)
      );
    } else {
      const canonicalUrl = data.canonicalUrl
        ? `${data.canonicalUrl}${page > 0 ? '?page=' + (page + 1) : ''}`
        : null;
      dispatch(
        setDeals({
          mainDeal: data.mainDeal,
          facetedNavigation: data.facetedNavigation ?? {},
          deals,
          secondary_deals,
          ssr,
          evergreenUrl: stripOrigin(data.evergreenUrl ?? null),
          canonicalUrl,
        })
      );
      noMoreDeals({ dispatch, page, deals });
    }
  } catch (err) {
    trackError({
      name: FETCH_DEALS_ERROR,
      message: ERROR_FETCHING_DEALS,
      path: url,
    });
  }
};

export const getDealsByPage = ({
  dealId,
  slug,
  ssr = false,
  page = 0,
  pageSize,
  secondaryDealsCount,
}) => async (dispatch) => {
  const url = getDealsFeedUrl({
    dealId,
    slug,
    page,
    pageSize,
    offset: secondaryDealsCount,
  });
  try {
    const response = await axios(url, {
      method: 'GET',
      withCredentials: !ssr,
      headers: httpCommonHeaders(),
    });
    if (!response.data) throw new Error('Empty response from server');
    const { data } = response;

    let deals = data.deals || [];
    deals = deals
      .map((item) => Object.assign(item, { page }))
      // BE BUG: we get +1 deals on page > 0. slice to ensure we always have the correct number
      .slice(0, pageSize);

    trackEvent('infinite_scroll');
    page > 1 && updateDod({ scrollDepth: page });
    dispatch(setExtraDeals(deals));
    noMoreDeals({ dispatch, page, deals });
  } catch (err) {
    trackError({
      name: FETCH_DEALS_ERROR,
      message: ERROR_FETCHING_DEALS,
      path: url,
    });
  }
};

export const setExtraDeals = (deals) => (dispatch) => {
  return dispatch({
    type: DEALS.SET_EXTRA_DEALS,
    newdeals: deals,
  });
};

// deals method for recommendations, new products and recently reviewed
export const getDealsData = (key, url, type, hasLoaded) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'GET',
      url: url,
      withCredentials: true,
      headers: httpCommonHeaders(),
    });
    const deals = res.data.deals;
    dispatch({
      type: type,
      [key]: deals,
    });
    return dispatch({
      type: DEALS.SET_ALL_FEATURED_DEALS_LOADED,
      featuredDealsLoaded: hasLoaded
        ? FEATURED_DEALS_LOADED.COMPLETE
        : FEATURED_DEALS_LOADED.UNCOMPLETE,
    });
  } catch (error) {
    console.log(`error [AXIOS REQUEST: getDealsData type: ${key}] => ${error}`);
    if (type === DEALS.SET_RECOMMENDED_DEALS) {
      trackError({
        name: 'FETCH RECOMMENDED V3 DEALS ERROR',
        message: ERROR_FETCHING_DEALS,
        path: url,
      });
    }
    return false;
  }
};

export const setOnlyMainDeal = (mainDeal, secondary_deals) => (dispatch) => {
  return dispatch({
    type: DEALS.SET_ONLY_MAIN_DEAL,
    mainDeal,
    secondary_deals,
  });
};

export const setNoMoreDeals = (page) => (dispatch) => {
  return dispatch({
    type: DEALS.SET_NO_MORE_DEALS,
    lastPage: page,
  });
};

export const setLastId = (lastId) => (dispatch) => {
  return dispatch({
    type: DEALS.SET_LAST_ID,
    lastId,
  });
};
