import {
  COOKIE_SUBSCRIBED_EXPIRES,
  COOKIES_EXPIRES_DAY,
} from '../config/setup/setup';
import commonCookiesOptions from './commonCookiesOptions';
import { setLoadingState } from '../redux/actions/loading';
import { LOADING_STATUS } from '../redux/reducers/loading';
import { subscribeUser } from './subscribe';
import cookies from 'react-cookies';
import COOKIES from '../config/cookies/cookies';
import { trackEvent } from './analytics';
import { getProfile } from '../redux/actions/users';
import {
  loginGoogleUser,
  registerGoogleUser,
  showErrorToast,
} from './googleServiceAPI';
import { logoutGoogle } from './googleService';
import { AN_ERROR_OCCURED, INVALID_GOOGLE_TOKEN_ID } from '../config/text/text';

export const loginUser = async (email, id_token, toast, auth2, dispatch) => {
  if (cookies.load(COOKIES.userInfo)) cookies.remove(COOKIES.userInfo);
  dispatch(setLoadingState(LOADING_STATUS.LOADING));

  const response = await loginGoogleUser(id_token);
  const responseCode = response.response && response.response.code;

  if (responseCode === '2000') {
    cookies.save(COOKIES.customerToken, response.response.data.customerToken, {
      ...commonCookiesOptions,
      COOKIE_SUBSCRIBED_EXPIRES,
    });

    subscribeGoogleUser(email);
    onGoogleLoginSuccess(auth2, dispatch);
  } else {
    if (responseCode === '2002') {
      registerUser(id_token, auth2, dispatch, toast);
    } else if (responseCode === '2001') {
      dispatch(setLoadingState(LOADING_STATUS.READY));
      showErrorToast(
        response.response.message || INVALID_GOOGLE_TOKEN_ID,
        toast
      );
    } else {
      dispatch(setLoadingState(LOADING_STATUS.READY));
      showErrorToast(AN_ERROR_OCCURED, toast);
    }
  }
};

export const subscribeGoogleUser = async (email) => {
  const googleToken = cookies.load(COOKIES.gauth);
  if (googleToken) {
    try {
      await subscribeUser(email);
    } catch (err) {
      // we can not subscrube the user
    }

    cookies.remove(COOKIES.gauth);
  }
};

export const registerUser = async (token, auth2, dispatch, toast) => {
  try {
    const response = await registerGoogleUser(token);

    if (response.data) {
      onGoogleLoginSuccess(auth2, dispatch);
    } else {
      dispatch(setLoadingState(LOADING_STATUS.READY));
      showErrorToast(response.message || AN_ERROR_OCCURED, toast);
    }
  } catch (err) {
    dispatch(setLoadingState(LOADING_STATUS.READY));
    showErrorToast(err.message || AN_ERROR_OCCURED, toast);
  }
};

export const onGoogleLoginSuccess = async (auth2, dispatch) => {
  cookies.save(COOKIES.loginType, 'google_user', {
    ...commonCookiesOptions,
    COOKIES_EXPIRES_DAY,
  });

  trackEvent('google_sign_in');

  dispatch(getProfile());
  getProfile();

  dispatch(setLoadingState(LOADING_STATUS.READY));

  logoutGoogle(auth2);
};
