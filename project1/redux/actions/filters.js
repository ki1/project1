import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { FILTERS } from '../../config/constants/action-types';
import { LINK_FILTER_API, DESKTOP_PAGE_SIZE } from '../../config/links/links';
import { getAppPlatform } from '../../helpers/device';

export const setEmptyFilters = () => (dispatch) => {
  return dispatch({
    type: FILTERS.EMPTY_FILTERS,
  });
};

export const setFilters = (mainDeal, deals, ssr) => (dispatch) => {
  return dispatch({
    type: FILTERS.SET_FILTERS,
    mainDeal,
    deals,
    ssr,
  });
};

export const resetFilters = () => (dispatch) => {
  return dispatch({
    type: FILTERS.RESET_FILTERS,
  });
};

const getFilterQuery = (orderBy, minPrice, maxPrice, pageNumber = null) => {
  const query = new URLSearchParams({ pageSize: DESKTOP_PAGE_SIZE });

  if (orderBy && orderBy.length) {
    if (orderBy === 'pricelow') {
      query.append('orderBy', 'price');
      query.append('order', 'asc');
    } else {
      query.append('orderBy', orderBy);
    }
  }

  if (minPrice && minPrice.length) {
    query.append('minPrice', minPrice);
  }

  if (maxPrice && maxPrice.length) {
    query.append('maxPrice', maxPrice);
  }

  if (pageNumber) {
    query.append('page', pageNumber);
  }

  return query.toString();
};

export const setFilterPath = (shortName, facetedNavigation) => async (
  dispatch
) => {
  if (!shortName || !facetedNavigation || !facetedNavigation.navigations) {
    dispatch(setURLFilterPath('')); // reset url filter path
    return;
  }
  const newItem = facetedNavigation.navigations.find(
    (item) => item.shortName && item.shortName === shortName
  );

  if (!newItem || !newItem.url) {
    dispatch(setURLFilterPath('')); // reset url filter path
  }
  dispatch(setURLFilterPath(newItem.url));
};

export const getFilter = ({
  category,
  location,
  subcategory = '',
  orderBy = '',
  minPrice = '',
  maxPrice = '',
  ssr = false,
  pageNumber = null,
  secondary_deals = null,
}) => async (dispatch) => {
  try {
    let url = [LINK_FILTER_API, location, category, subcategory]
      .filter((i) => i)
      .join('/');

    const query = getFilterQuery(orderBy, minPrice, maxPrice, pageNumber);

    if (query && query.length) {
      url = `${url}?${query}`;
    }

    const data = await axios(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        webapp: true,
        brand: process.env.NEXT_PUBLIC_BRAND || 'wowcher',
        'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
        'app-platform': getAppPlatform(),
      },
    });

    if (!data || !data.data || !data.data.deals || !data.data.deals.length) {
      dispatch(setEmptyFilters());
      return {
        mainDeal: {},
        deals: [],
      };
    }

    if (secondary_deals && secondary_deals.length > 0) {
      // remove the secondary deals from the filter deals
      secondary_deals.map((item) => {
        if (data.data.deals[0] && data.data.deals[0].id === item.id) {
          data.data.deals.shift();
        }
      });
    }
    dispatch(setFilters(data.data.mainDeal || {}, data.data.deals || [], ssr));

    return {
      mainDeal: data.data.mainDeal || {},
      deals: data.data.deals || [],
    };
  } catch (err) {
    // TODO: Show the error if needed
    return false;
  }
};

export const getFilterByPage = (
  category,
  location,
  subcategory = '',
  orderBy = '',
  minPrice = '',
  maxPrice = '',
  pageNumber = null
) => async (dispatch) => {
  try {
    if (!category || !location) {
      return;
    }
    let url = [LINK_FILTER_API, location, category, subcategory]
      .filter((i) => i)
      .join('/');

    const query = getFilterQuery(orderBy, minPrice, maxPrice, pageNumber);

    if (query && query.length) {
      url = `${url}?${query}`;
    }

    const data = await axios(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        webapp: true,
        brand: process.env.NEXT_PUBLIC_BRAND || 'wowcher',
        'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
        'app-platform': getAppPlatform(),
      },
    });

    let dealsTotal = data.data.deals
      ? data.data.deals.map((item) => Object.assign(item, { page: pageNumber }))
      : [];

    if (!dealsTotal || !dealsTotal.length) {
      dispatch(setNoMoreFilters());
    }

    dispatch(setFiltersExtra(dealsTotal || []));

    return true;
  } catch (err) {
    // TODO: Show the error if needed
    return false;
  }
};

export const setFiltersExtra = (newdeals) => (dispatch) => {
  return dispatch({
    type: FILTERS.SET_EXTRA_FILTERS,
    newdeals,
  });
};

export const setNoMoreFilters = () => (dispatch) => {
  return dispatch({
    type: FILTERS.SET_NO_MORE_FILTERS,
  });
};

export const setURLFilterPath = (url) => (dispatch) => {
  return dispatch({
    type: FILTERS.SET_URL_PATH,
    url,
  });
};
