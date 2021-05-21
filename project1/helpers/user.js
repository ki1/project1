import { getProfile } from '../redux/actions/users';
import {
  LINK_LOGGED_USER,
  LINK_NOT_LOGGED_USER,
  ANGULAR_HOME_URL,
} from '../config/links/links';
import { redirectToURL } from './url';
import Cookies from 'react-cookies';
import COOKIES from '../config/cookies/cookies';
import { getLocationShortName } from './location';

export const checkIsUserIsNotLogged = async (userState, router, dispatch) => {
  if (userState) return true;
  const result = await dispatch(getProfile());
  if (!result) redirectToURL(LINK_NOT_LOGGED_USER);
};

export const checkIsUserLogged = async (userState, router, dispatch) => {
  const redirectLocal = Cookies.load(COOKIES.redirectLocal) || '';
  const redirectUrl = Cookies.load(COOKIES.redirectUrl) || '';
  const postLoginUrl = Cookies.load(COOKIES.postLoginUrl) || '';
  let result = false;
  if (!userState) {
    result = await dispatch(getProfile());
  }
  if (result || userState) {
    if (redirectLocal) {
      Cookies.remove(COOKIES.redirectLocal);
      window.location.href =
        window.location.protocol + '//' + window.location.host + redirectLocal;

      return;
    }

    if (redirectUrl) {
      Cookies.remove(COOKIES.redirectUrl);
      redirectToURL(`${ANGULAR_HOME_URL}${redirectUrl}`);
      return;
    }

    if (postLoginUrl) {
      Cookies.remove(COOKIES.postLoginUrl);
      redirectToURL(postLoginUrl);
      return;
    }

    redirectToURL(LINK_LOGGED_USER, router);
  }
};

export const getUserProfile = async (userState, dispatch) => {
  let result = false;
  if (!userState) {
    result = await dispatch(getProfile());
  }
  return result;
};

export const getUserLocationShortName = () => {
  const locationCookie = Cookies.load(COOKIES.location);
  let shortName;
  shortName = getLocationShortName(locationCookie);
  return shortName;
};
