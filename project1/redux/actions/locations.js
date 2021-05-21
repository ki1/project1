import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { LOCATIONS } from '../../config/constants/action-types';
import Cookies from 'react-cookies';
import COOKIES from '../../config/cookies/cookies';
import { DEFAULT_LOCATION, URLLOCATIONS } from '../../config/setup/setup';
import { getAppPlatform } from '../../helpers/device';

const setLocationCookie = (locationObj) => {
  // only name, shortName needed in cookie
  const cookieLocationObj = {
    name: locationObj.name,
    shortName: locationObj.shortName,
  };
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  Cookies.save(COOKIES.location, cookieLocationObj, {
    domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
    path: '/',
    expires,
    samesite: 'none',
    // secure: true,
  });
};

export const getLocation = (locations) => async (dispatch) => {
  try {
    const locationCookie = Cookies.load(COOKIES.location);
    const isCookieSet = locationCookie && locationCookie !== 'undefined';
    // check if the cookie is set
    if (isCookieSet) {
      // check we can find the location in the locations list
      const locationObj = locations.find(
        (loc) => loc.shortName === locationCookie.shortName
      );
      // only dispatch if we have a valid locationObj
      if (locationObj) {
        dispatch(setLocation(locationObj, false));
      }
    } else {
      // the cookie hasn't been set so we must set it to the default and store in the cookie
      dispatch(
        setLocation(
          DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE || 'wowcher'],
          true
        )
      );
    }
    return true;
  } catch (err) {
    // TODO: Show error message if needed
    return false;
  }
};

// Copy from angularjs
// TODO: can API fix this?
const mapNames = (locations) => {
  const mappedNames = {
    'hull-and-east-riding': 'Hull and East Riding',
    gloucestershire: 'Gloucester',
    'london-south': 'London (S)',
    'london-north': 'London (N)',
    'london-east': 'London (E)',
    'london-west': 'London (W)',
  };

  return locations.map((location) => {
    if (location.shortName && mappedNames[location.shortName]) {
      return { ...location, name: mappedNames[location.shortName] };
    } else {
      return location;
    }
  });
};

export const getLocations = () => async (dispatch) => {
  try {
    const res = await axios(URLLOCATIONS, {
      method: 'GET',
      withCredentials: true,
      headers: {
        webapp: true,
        brand: process.env.NEXT_PUBLIC_BRAND,
        'app-platform': getAppPlatform(),
      },
    });
    const data = res.data || [];
    const mapNamesResult = mapNames(data);
    dispatch(setLocations(mapNamesResult));
    return mapNamesResult;
  } catch (err) {
    // TODO: Show error message if needed
    return false;
  }
};

export const setLocation = (location, overWriteCookie) => (dispatch) => {
  if (overWriteCookie) setLocationCookie(location);
  return dispatch({ type: LOCATIONS.SET_LOCATION, location });
};

export const setLocations = (locations) => (dispatch) => {
  return dispatch({ type: LOCATIONS.SET_LOCATIONS, locations });
};
