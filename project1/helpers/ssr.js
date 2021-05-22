import Cookies from 'react-cookies';
import {
  DEFAULT_LOCATION,
  READ_FILTERS_FROM_URL_PARAMETERS,
  FILTER_LOCATION,
  FILTER_SUBCATEGORY,
  FILTER_CATEGORY,
  FILTER_SORTBY,
  FILTER_MINPRICE,
  FILTER_MAXPRICE,
  URLGETRECOMMENDATION,
  URLEVENTDEAL,
  URLLIVEDEAL,
  CUSTOMER_DEFAULT_TOKEN,
  EVENT_NAME_NEW_PRODUCTS,
  KEY_RECOMMENDED_DEALS,
  KEY_NEW_PRODUCT_DEALS,
  KEY_RECENTLY_VIEWED_DEALS,
} from '../config/setup/setup';
import { getLocations } from '../redux/actions/locations';
import { getNavigation } from '../redux/actions/navigation';
import { getDeals, getDealsData } from '../redux/actions/deals';
import { getTiles } from '../redux/actions/tiles';
import { DEALS } from '../config/constants/action-types';
import { getScrollerConfiguration } from '../redux/actions/scroller';
import { getFilter } from '../redux/actions/filters';
import { getNewProducts } from '../redux/actions/newproducts';
import { isFilter } from './filters';
import COOKIES from '../config/cookies/cookies';
import { getIdsStoredDeals } from './recentlyViewed';
import { PAGE_DECREMENT_ADJUSTMENT } from './infiniteScroll';

export const storedUrlIds = () => {
  const ids = getIdsStoredDeals();
  return ids ? `?id=${ids.join('&id=')}` : [];
};

const getSSRFilters = (ssr, query) => {
  return ssr
    ? {
        category: query.category || '',
        location: query.location || 'london',
        subcategory: query.subcategory || '',
        orderBy: query.orderBy || '',
        minPrice: query.minPrice || '',
        maxPrice: query.maxPrice || '',
        ssr,
        pageNumber: query.page || '0',
      }
    : {
        category: query[FILTER_CATEGORY],
        location: query[FILTER_LOCATION],
        subcategory: query[FILTER_SUBCATEGORY],
        orderBy: query[FILTER_SORTBY] || '',
        minPrice: query[FILTER_MINPRICE] || '',
        maxPrice: query[FILTER_MAXPRICE] || '',
        ssr,
        pageNumber: query.page || '0',
      };
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export function getDealInfo({
  query = {},
  ssr = false,
  dealId = null,
  secondaryDealsCount,
}) {
  const page = query.page
    ? parseInt(query.page) - PAGE_DECREMENT_ADJUSTMENT
    : 0;
  const location = DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE || 'wowcher'];
  const userId = Cookies.load(COOKIES.customerToken) || CUSTOMER_DEFAULT_TOKEN;
  const newProductLocation =
    query.slug && query.slug[0] !== 'shop' ? query.slug[0] : 'london';
  const filters = getSSRFilters(ssr, query);

  return (dispatch) => {
    const requests = [
      dispatch(
        getDeals({
          dealId,
          slug: query.slug,
          ssr,
          page,
          secondaryDealsCount,
        })
      ),
      READ_FILTERS_FROM_URL_PARAMETERS &&
        isFilter(query) &&
        (!dealId || !dealId.length) &&
        dispatch(getFilter(filters)),
      dispatch(
        getDealsData(
          KEY_RECOMMENDED_DEALS,
          URLGETRECOMMENDATION(userId),
          DEALS.SET_RECOMMENDED_DEALS
        )
      ),
      dispatch(
        getDealsData(
          KEY_NEW_PRODUCT_DEALS,
          URLEVENTDEAL(newProductLocation, EVENT_NAME_NEW_PRODUCTS),
          DEALS.SET_NEW_PRODUCT_DEALS
        )
      ),
      storedUrlIds().length > 0
        ? dispatch(
            getDealsData(
              KEY_RECENTLY_VIEWED_DEALS,
              URLLIVEDEAL(storedUrlIds()),
              DEALS.SET_RECENTLY_VIEWED_DEALS,
              true
            )
          )
        : null,
      dispatch(getNewProducts(location.shortName, ssr)),
      ssr ? dispatch(getNavigation(location, ssr)) : null,
      ssr ? dispatch(getLocations()) : null,
      // ssr ? dispatch(getTiles(query.slug)) || null : null,
      ssr ? dispatch(getScrollerConfiguration(ssr)) : null,
    ];

    if (page > 0) {
      requests.push(
        dispatch(
          getDeals({
            dealId,
            slug: query.slug,
            ssr,
            pageSize: 0,
            secondaryDealsCount,
            onlyMainDeal: true,
          })
        )
      );
    }

    return Promise.all(requests);
  };
}

// Retrieve only the Navigation info
export function getSSRNavigation(ssr = false) {
  const location = DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE || 'wowcher'];
  return (dispatch) =>
    Promise.all([
      dispatch(getNavigation(location, ssr)), // true, is ssr
      dispatch(getLocations()),
    ]);
}
