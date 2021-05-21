import { APP_BANNER_TITLE, TYPE_CATEGORY_DEAL } from '../config/text/text';
import {
  META_DESCRIPTION,
  TITLE_DEALS_LOCATION,
  TITLE_DEALS_NO_LOCATION,
  TITLE_DEALS_NO_CATEGORY,
  TITLE_DEALS_NO_CATEGORY_NOLOCATION,
  BRAND_WOWCHER,
} from '../config/setup/setup';
import { parseFacetedNavigation } from './facetedNavigation';
import { getCountryCurrency } from './currency';

export const getLocationFromUrl = (aspath, locations) => {
  if (!aspath) return null;
  const [url] = aspath.split('?');
  const elements = url.split('/');
  if (!elements || elements.length < 3) return null;
  const elementToSearch = elements[2].toLowerCase();
  return locations.find(
    (item) => item.shortName.toLowerCase() === elementToSearch
  );
};

export const getPageTitle = (
  facetedNavigation,
  aspath,
  shortnameAux,
  locationnameAux,
  navigation,
  locations,
  pageTitle = false,
  titletype = '',
  query = []
  /* eslint-disable-next-line sonarjs/cognitive-complexity */
) => {
  const LocationAux = getLocationFromUrl(aspath, locations);
  const shortname =
    LocationAux && LocationAux.shortName ? LocationAux.shortName : shortnameAux;
  const locationname =
    LocationAux && LocationAux.name ? LocationAux.name : locationnameAux;

  const parsed = parseFacetedNavigation(
    facetedNavigation,
    aspath, // router.asPath,
    shortname, // location.shortName
    navigation // navigation
  );

  const resultLinkText =
    parsed && parsed.defaultItem && parsed.defaultItem.linkText
      ? parsed.defaultItem.linkText
      : '';
  const resultSeoTitle =
    parsed && parsed.defaultItem && parsed.defaultItem.categoryName
      ? parsed.defaultItem.categoryName
      : resultLinkText;

  // Version requested by SEO

  const categoryAux = parsed && parsed.category ? parsed.category : '';
  let categoryToPrint =
    parsed && parsed.category !== resultSeoTitle
      ? `${resultSeoTitle} `
      : categoryAux;

  const isLocationIncluded = aspath
    .toLowerCase()
    .includes(shortname.toLowerCase());
  const textToChange = isLocationIncluded
    ? TITLE_DEALS_LOCATION
    : TITLE_DEALS_NO_LOCATION;

  if (pageTitle && titletype === TYPE_CATEGORY_DEAL && query.slug) {
    const isLocalDeal = query.slug[0] !== 'shop' && query.slug[0] !== 'travel';
    return isLocalDeal
      ? `${pageTitle} - ${locationname} - ${
          APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE || BRAND_WOWCHER]
        }`
      : `${pageTitle} - ${
          APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE || BRAND_WOWCHER]
        }`;
  }
  if ((!categoryToPrint || !categoryToPrint.length) && !isLocationIncluded) {
    return `${TITLE_DEALS_NO_CATEGORY_NOLOCATION}${
      APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE || BRAND_WOWCHER]
    }`;
  }
  if (!categoryToPrint || !categoryToPrint.length) {
    return `${TITLE_DEALS_NO_CATEGORY.replace('##LOCATION##', locationname)}${
      APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE || BRAND_WOWCHER]
    }`;
  }

  return `${textToChange
    .replace('##CATEGORY##', capitalizeFirstLetter(categoryToPrint))
    .replace('##LOCATION##', locationname)}${
    APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE || BRAND_WOWCHER]
  }`;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getMetaDescription = (
  facetedNavigation,
  aspath, // router.asPath,
  shortnameAux, // location.shortName
  locationnameAux,
  navigation, // navigation
  locations
) => {
  const LocationAux = getLocationFromUrl(aspath, locations);
  const shortname =
    LocationAux && LocationAux.shortName ? LocationAux.shortName : shortnameAux;
  const locationname =
    LocationAux && LocationAux.name ? LocationAux.name : locationnameAux;

  const parsed = parseFacetedNavigation(
    facetedNavigation,
    aspath, // router.asPath,
    shortname, // location.shortName
    navigation // navigation
  );

  let text = getMetaDescriptionFromArray(
    aspath,
    parsed && parsed.category ? parsed.category : ''
  );
  if (!text || !text.length) text = META_DESCRIPTION.default || '';

  // TODO: fill the TRAVELESCAPE & EVENTNAME with the right name
  text = text
    .replace(/##TRAVELESCAPE##/gi, '')
    .replace(/##CURRENCY##/gi, getCountryCurrency())
    .replace(
      /##BRAND##/gi,
      APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE || 'wowcher']
    )
    .replace(/##LOCATION##/gi, locationname)
    .replace(/##EVENTNAME##/gi, '');

  return text;
};

export const getMetaDescriptionFromArray = (aspath, category) => {
  if (!aspath || !aspath.length) return '';
  const arrayData = aspath.split('/');
  if (!arrayData || !arrayData.length) return '';
  if (arrayData[0] === '') arrayData.shift();

  if (
    arrayData[2] &&
    (arrayData[2].toLowerCase() === 'special-event' ||
      arrayData[2].toLowerCase() === 'special')
  ) {
    return getTextFromMetaDescription('special-event', category);
  }

  if (arrayData[arrayData.length - 1].toLowerCase() === 'shop') {
    return getTextFromMetaDescription('shop', category);
  }

  if (arrayData[2] && arrayData[2].toLowerCase() === 'gift-finder') {
    return getTextFromMetaDescription('gift-finder', category);
  }

  if (arrayData[arrayData.length - 1].toLowerCase() === 'travel') {
    return getTextFromMetaDescription('travel', category);
  }

  return getTextFromMetaDescription('local', category);
};

export const getTextFromMetaDescription = (section, category) => {
  if (META_DESCRIPTION[section]) {
    if (META_DESCRIPTION[section][category])
      return META_DESCRIPTION[section][category];
    if (META_DESCRIPTION[section].default)
      return META_DESCRIPTION[section].default;
  } else {
    return META_DESCRIPTION.default;
  }
};
