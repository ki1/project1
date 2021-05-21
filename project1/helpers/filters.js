import { ALL_CAT_PAGE } from '../config/text/text';
import {
  FILTER_LOCATION,
  FILTER_SUBCATEGORY,
  FILTER_CATEGORY,
  FILTER_SORTBY,
  FILTER_MINPRICE,
  FILTER_MAXPRICE,
  READ_FILTERS_FROM_URL_PARAMETERS,
} from '../config/setup/setup';

export const getNavigationCategoriesWithFaceted = (facetedNavigation) => {
  if (
    !facetedNavigation ||
    !facetedNavigation.navigations ||
    !facetedNavigation.navigations.length
  )
    return [];
  return facetedNavigation.navigations.map((item) =>
    Object.assign(
      {},
      {
        name: item.linkText,
        url: item.url,
        value: item.shortName,
        isActive: item.isActive,
      }
    )
  );
};

/**
 * This function only works for 2 levels of Navigation
 * If there is 3 levels, like in /deals/travel/long-haul/india, the last item is not
 * in the navigation array
 */
export const getNavigationCategories = (navigation, path) => {
  const elements = path.split('/');
  let navigationElement = getNavigationFirstLevel(
    navigation,
    path,
    elements.pop().toLowerCase()
  );

  while (!navigationElement) {
    if (!elements || !elements.length) return false;
    const newpath = elements.join('/');
    navigationElement = getNavigationFirstLevel(
      navigation,
      newpath,
      elements.pop().toLowerCase()
    );
  }

  if (
    !navigationElement.subNavigations ||
    !navigationElement.subNavigations.length
  ) {
    const navigationElementAux = getNavigationFirstLevel(
      navigation,
      elements.join('/'),
      elements.pop().toLowerCase()
    );
    if (
      navigationElementAux &&
      navigationElementAux.subNavigations &&
      navigationElementAux.subNavigations.length
    )
      return navigationElementAux;
  }

  return navigationElement;
};

const getNavigationFirstLevel = (navigation, path, lastitem) => {
  return navigation.find(
    (item) =>
      item.url.indexOf(path) >= 0 && item.shortName.toLowerCase() === lastitem
  );
};

export const createNavigationFilter = (navigation) => {
  if (!navigation) return [];
  let options = [];
  const name = ALL_CAT_PAGE.replace('##word##', navigation.linkText || '');
  options.push({
    name: name,
    value: navigation.shortName || '',
    url: navigation.url || '',
  });

  if (!navigation.subNavigations || !navigation.subNavigations.length) {
    return options;
  }

  navigation.subNavigations.map((item) => {
    options.push({
      name: item.linkText || '',
      value: item.shortName || '',
      url: item.url || '',
    });
    return true;
  });
  return options;
};

export const getParameters = (param, value, query) => {
  let queryParams = new Array();
  let found = false;
  Object.keys(query).map((item) => {
    const itemLowerCase = item.toLowerCase();
    if (itemLowerCase === 'slug') return;
    if (itemLowerCase === 'page') return;
    if (itemLowerCase === param.toLowerCase()) {
      queryParams[item] = value;
      found = true;
      return;
    }
    queryParams[item] = query[item];
    return item;
  });
  if (!found) {
    queryParams[param] = value;
  }
  return queryParams;
};

export const convertToString = (query, connector = '&') => {
  if (!query) return '';
  let textArray = [];
  Object.keys(query).map((item) => {
    textArray.push(`${item}=${query[item]}`);
    return item;
  });
  return textArray.join(connector);
};

export const changeFiltersURL = (
  sortby,
  sliderValues,
  shortName,
  categorySelected,
  facetedNavigation,
  router
) => {
  if (!READ_FILTERS_FROM_URL_PARAMETERS) return;
  let paramAux = getParameters(FILTER_LOCATION, shortName, router.query);
  paramAux = getParameters(FILTER_SUBCATEGORY, categorySelected, paramAux);
  if (sortby && sortby.value) {
    paramAux = getParameters(FILTER_SORTBY, sortby.value, paramAux);
  }
  if (sliderValues) {
    if (sliderValues[0] && sliderValues[0].value) {
      paramAux = getParameters(
        FILTER_MINPRICE,
        sliderValues[0].value,
        paramAux
      );
    }
    if (sliderValues[1] && sliderValues[1].value) {
      paramAux = getParameters(
        FILTER_MAXPRICE,
        sliderValues[1].value,
        paramAux
      );
    }
  }
  paramAux = getParameters(
    FILTER_CATEGORY,
    facetedNavigation.category,
    paramAux
  );

  const paramText = convertToString(paramAux);

  router.push(
    `${router.pathname.split('?')[0]}?${paramText}`,
    `${router.asPath.split('?')[0]}?${paramText}`,
    {
      shallow: true,
    }
  );
};

export const getDefaultSliderValues = (router, filterPrice) => {
  let defaultSliderValues = [0, filterPrice.length - 1];
  if (
    !READ_FILTERS_FROM_URL_PARAMETERS ||
    (!router.query[FILTER_MINPRICE] && !router.query[FILTER_MAXPRICE])
  )
    return defaultSliderValues;

  const minPriceAuxValue = router.query[FILTER_MINPRICE] || -1;
  const maxPriceAuxValue = router.query[FILTER_MAXPRICE] || -1;
  let minPriceAuxIndex =
    filterPrice.findIndex((item) => item.value === minPriceAuxValue) || 99;

  let maxPriceAuxIndex = filterPrice.findIndex(
    (item) => item.value === maxPriceAuxValue
  );

  if (minPriceAuxIndex < 0) minPriceAuxIndex = 0;
  if (maxPriceAuxIndex < 0) maxPriceAuxIndex = filterPrice.length - 1;

  if (minPriceAuxIndex > maxPriceAuxIndex) minPriceAuxIndex = maxPriceAuxIndex;

  return [minPriceAuxIndex, maxPriceAuxIndex];
};

export const getParameterFromUrl = (param) => {
  if (typeof window === 'undefined' || !window || !window.location)
    return false;
  const params = new URLSearchParams(window.location.search);
  if (!params) return null;

  const paramAux = params.get(param);
  if (paramAux && paramAux.length) return paramAux;
  return null;
};

export const getSortByDefault = (router, filterPopularity) => {
  let sortByDefault = '-1';

  const FilterByValue =
    router.query[FILTER_SORTBY] || getParameterFromUrl(FILTER_SORTBY) || null;

  if (!READ_FILTERS_FROM_URL_PARAMETERS || !FilterByValue) return sortByDefault;

  const filterPopularityIndex = filterPopularity.findIndex(
    (item) => item.value === FilterByValue
  );
  if (filterPopularityIndex >= 0) sortByDefault = filterPopularityIndex;

  return sortByDefault;
};

export const isFilter = (query) => {
  // check if we need to recreate a filter
  if (!query || !Object.keys(query).length) return false;
  if (
    !query[FILTER_LOCATION] ||
    !query[FILTER_LOCATION].length ||
    !query[FILTER_CATEGORY] ||
    !query[FILTER_CATEGORY].length
    // !query[FILTER_SUBCATEGORY] // Subcategory can be empty
  )
    return false;

  return true;
  /*
  if (query[FILTER_SUBCATEGORY] && query[FILTER_SUBCATEGORY].length)
    return true;
  if (
    (!query[FILTER_SORTBY] || !query[FILTER_SORTBY].length) &&
    (!query[FILTER_MINPRICE] || !query[FILTER_MINPRICE].length) &&
    (!query[FILTER_MAXPRICE] || !query[FILTER_MAXPRICE].length)
  )
    return false;
  return true;
  */
};

export const isSearchFilter = () => {
  if (!window) return false;
  const params = new URLSearchParams(window.location.search);
  if (!params) return false;
  if (!params.get(FILTER_LOCATION) || !params.get(FILTER_CATEGORY))
    return false;
  if (
    !params.get(FILTER_SORTBY) &&
    !params.get[FILTER_MINPRICE] &&
    !params.get[FILTER_MAXPRICE]
  )
    return false;
  return true;
};
