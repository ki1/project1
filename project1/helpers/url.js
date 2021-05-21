import axios from '../components/_generic/axiosSplunk/axiosSplunk';
import { useMemo } from 'react';
import { URLSTATIC, URLSTATICSUFFIX } from '../config/setup/setup';
import { LINKS_GLOBAL_WOWCHER } from '../config/links/links';
import { getAppPlatform } from './device';
import memoize from 'lodash/memoize';
import {
  DEAL_LOCATION_TYPES,
  PAGE_TYPES,
} from '../config/constants/page-types';

export const getStaticContent = async (context) => {
  // We need to remove the .html that may can appear
  // URLSTATIC[environment].replace(REPLACE_BRAND, mainTheme).replace(REPLACE_DOMAIN, DOMAINS[domain.toLowerCase()]) +
  const url = `${URLSTATIC}/${context.query.slug
    .toString()
    .replace(/.html$/gi, '')}${URLSTATICSUFFIX}`;

  try {
    const data = await axios(url, {
      method: 'GET',
      headers: {
        webapp: true,
        brand: process.env.NEXT_PUBLIC_BRAND || 'wowcher',
        'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
        'app-platform': getAppPlatform(),
      },
    });

    return {
      // will be passed to the page component as props
      props: {
        text: data.data.text,
        additionalText: data.data.additionalText,
        title: data.data.displayName,
        description: data.data.description || '',
      },
    };
  } catch (err) {
    const { res } = context;
    res.statusCode = 404;

    return {
      // if url or data.data.text doesn't exist we will shown the 404 page
      props: { errorCode: true },
    };
  }
};

export const redirectToURL = (url, router, as) => {
  // router/Link only works for internal URLs
  // This function check if the url is external to redirect through document.location
  if (url && url.toLowerCase().startsWith('http')) {
    document.location.href = url;
    return;
  }
  if (!router || !url) return;
  if (as && as.length) {
    router.push(url, as);
    return;
  }
  router.push(url);
};

/**
 * Select the longest navigation link that matches the current url path
 * TODO: Is there a better way of getting selection when pages setup?
 */
export const useNavigationSelection = (navigation, path) => {
  return useMemo(() => {
    // filter out all the none paths that don't contain the current route
    const filtered = navigation.filter((item) => path.indexOf(item.url) === 0);
    const found = filtered.reduce((selection, item) => {
      if (selection === null || item.url.length > selection.url.length) {
        selection = item;
      }
      return selection;
    }, null);
    return found === null ? null : found.id;
  }, [navigation, path]);
};

export const findLinkMatchingPath = (linkCollection, path) => {
  return useMemo(() => {
    return linkCollection.filter((link) => path.indexOf(link.href) !== -1)[0];
  }, [linkCollection, path]);
};

export const makeUrlRelativeToRoot = (url) => {
  if (typeof url === 'string' || url instanceof String) {
    return url.indexOf('/') === 0 ? url : `/${url}`;
  } else {
    return '/';
  }
};

export const makeUrlAbsolute = (url) => {
  const rootUrl =
    LINKS_GLOBAL_WOWCHER[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
      process.env.NEXT_PUBLIC_SITE || 'wowcher'
    ];
  const relativeUrl = makeUrlRelativeToRoot(url);
  return `${rootUrl}${relativeUrl}`;
};

export const _stripOrigin = (url) => {
  if (typeof url === 'string' && url.startsWith('http')) {
    const { pathname, search } = new URL(url);

    return `${pathname}${search.length ? search : ''}`;
  } else return url;
};

export const stripOrigin = memoize(_stripOrigin);

const getLocalDealLocation = (pathArray) => {
  if (pathArray.length < 2 || ['shop', 'travel'].includes(pathArray[1])) {
    return null;
  } else {
    return pathArray[1];
  }
};

const getLocationType = (pathArray) => {
  if (pathArray.length >= 2 && pathArray[1] === 'shop') {
    return DEAL_LOCATION_TYPES.national;
  } else if (pathArray.length >= 2 && pathArray[1] !== 'travel') {
    return DEAL_LOCATION_TYPES.local;
  } else {
    return null;
  }
};

const getDealIdOrEvergreenIndex = (pathArray) =>
  pathArray.findIndex((item) => /^(\d+|e)$/.test(item));

const getDealPageCategories = (pathArray) => {
  const dealIndex = pathArray.findIndex((item) => item === 'deal');
  const dealIdOrEvergreenIndex = getDealIdOrEvergreenIndex(pathArray);

  let category;
  let subCategory;
  let subSubCategory;

  if (dealIndex !== -1 && dealIdOrEvergreenIndex !== -1) {
    [
      category = null,
      subCategory = null,
      subSubCategory = null,
    ] = pathArray.slice(dealIndex + 2, dealIdOrEvergreenIndex);
  }

  return {
    category,
    subCategory,
    subSubCategory,
  };
};

const getDealPageBlurb = (pathArray) => {
  const dealIdOrEvergreenIndex = getDealIdOrEvergreenIndex(pathArray);
  if (
    dealIdOrEvergreenIndex !== -1 &&
    pathArray.length > dealIdOrEvergreenIndex
  ) {
    return pathArray[dealIdOrEvergreenIndex + 1];
  } else {
    return null;
  }
};

const getCategoryPageCategories = (pathArray) => {
  const startIndex = pathArray.findIndex((item) => item === 'deals');
  let category;
  let subCategory;

  [category = null, subCategory = null] = pathArray.slice(startIndex + 2);

  return { category, subCategory };
};

export const _parseWowcherPath = (path) => {
  let searchParams = null;
  let pathArray;

  try {
    if (!path.length) throw new Error('Empty string received');

    const [pathString, queryString] = path.split(/\?|#/g);
    pathArray = pathString.split('/').filter((item) => item.length);
    if (queryString) {
      searchParams = new URLSearchParams(queryString);
    }
  } catch (err) {
    throw new Error('Unable to parse URL', err);
  }

  const pageType =
    {
      deal: PAGE_TYPES.deal,
      deals: PAGE_TYPES.category,
    }[pathArray?.[0]] ?? PAGE_TYPES.other;

  let details = null;

  if (pageType === PAGE_TYPES.deal) {
    const { category, subCategory, subSubCategory } = getDealPageCategories(
      pathArray
    );

    details = {
      blurb: getDealPageBlurb(pathArray),
      category,
      dealId: pathArray.find((item) => /^\d+$/.test(item)) ?? null,
      isEvergreen: pathArray.includes('e') ?? false,
      isTravel: pathArray.includes('travel') ?? false,
      localDealLocation: getLocalDealLocation(pathArray),
      locationType: getLocationType(pathArray),
      subCategory,
      subSubCategory,
    };
  }

  if (pageType === PAGE_TYPES.category) {
    const { category, subCategory } = getCategoryPageCategories(pathArray);
    details = {
      localDealLocation: getLocalDealLocation(pathArray),
      locationType: getLocationType(pathArray),
      isTravel: pathArray.includes('travel') ?? false,
      category,
      subCategory,
    };
  }

  return {
    searchParams,
    pathArray,
    pageType,
    details,
  };
};

export const parseWowcherPath = memoize(_parseWowcherPath);
