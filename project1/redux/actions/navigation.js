import { NAVIGATION } from '../../config/constants/action-types';
import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import {
  BRAND_WOWCHER,
  URLDEAL,
  URLNAVIGATION,
} from '../../config/setup/setup';
import { makeUrlAbsolute } from '../../helpers/url';
import { getLocationShortName } from '../../helpers/location';
import { getAppPlatform } from '../../helpers/device';

export const getNavigation = (location, ssr = false) => async (dispatch) => {
  try {
    const shortName = getLocationShortName(location);
    const url = `${URLNAVIGATION}/${shortName}?range=1-30`;
    const resp = await axios(url, {
      method: 'GET',
      headers: {
        brand: process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER,
        'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
        'app-platform': getAppPlatform(),
      },
    });
    const list = resp.data;
    const navigation = list.map((item) => {
      // The label is local in the db but we display the location name
      if (item.linkText.toLowerCase() === 'local') {
        return {
          ...item,
          url: makeUrlAbsolute(item.url),
          linkText: location.name || 'Local',
          isLocal: true,
          subNavigations: item.subNavigations.map((sub) => {
            return {
              ...sub,
              url: makeUrlAbsolute(sub.url),
            };
          }),
        };
      } else {
        return {
          ...item,
          url: makeUrlAbsolute(item.url),
          subNavigations: item.subNavigations.map((sub) => {
            return {
              ...sub,
              url: makeUrlAbsolute(sub.url),
            };
          }),
        };
      }
    });

    dispatch({ type: NAVIGATION.SET_MENU, list: navigation, ssr });

    return true;
  } catch (err) {
    // TODO: Show error message if needed
    return false;
  }
};

export const showDefaultNavigation = () => (dispatch) => {
  dispatch({ type: NAVIGATION.SET_SSR, ssr: false });
};

export const getDealPreviews = (url, count) => async (dispatch) => {
  try {
    const sliceAt = url.indexOf('deals/');
    const route = url.slice(sliceAt + 6);
    const cleanRoute = route.replace('shop', 'national-deal');
    const reqUrl = `${URLDEAL}/${cleanRoute}?preview=true&page=0&pageSize=${count}`;

    const resp = await axios(reqUrl, {
      method: 'GET',
      headers: {
        brand: process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER,
        'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
        webapp: true,
        'app-platform': getAppPlatform(),
      },
    });
    dispatch({
      type: NAVIGATION.SET_DEAL_PREVIEW,
      preview: { [url]: resp.data.deals || null },
    });
  } catch (e) {
    dispatch({
      type: NAVIGATION.SET_DEAL_PREVIEW,
      preview: { [url]: null },
    });
  }
};
