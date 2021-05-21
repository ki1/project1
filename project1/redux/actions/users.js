import { USER } from '../../config/constants/action-types';
import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import cookie from 'react-cookies';
import {
  URLUSER,
  URLLOGIN,
  URLREGISTR,
  URLLOGOUT,
} from '../../config/setup/setup';
import COOKIES from '../../config/cookies/cookies';
import commonCookiesOptions from '../../helpers/commonCookiesOptions';
import httpCommonHeaders from '../../helpers/httpCommonHeaders';
import getUserProfile from '../../helpers/profile';

export const logUser = async (login, password) => {
  if (cookie.load(COOKIES.userInfo)) cookie.remove(COOKIES.userInfo);
  cookie.save(COOKIES.userEmail, login);
  try {
    const { data } = await axios({
      method: 'POST',
      url: URLLOGIN,
      cache: false,
      withCredentials: true,
      validateStatus: (status) => {
        return status < 500;
      },
      data: {
        loginRequest: {
          j_username: login,
          j_password: password,
        },
      },
      headers: httpCommonHeaders(),
      _spring_security_remember_me: true,
    });
    return data.response;
  } catch (err) {
    throw Error(err);
  }
};

export const setLightbox = (lightbox) => (dispatch) => {
  dispatch({ type: USER.SET_LIGHTBOX, lightbox });
};

export const registerUser = async (user) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: URLREGISTR,
      validateStatus: (status) => {
        return status < 500;
      },
      data: {
        requestRegistration: user,
      },
      headers: httpCommonHeaders(),
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

export const loginSuccess = (data) => async (dispatch) => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  // ct
  cookie.save(COOKIES.customerToken, data.customerToken, {
    ...commonCookiesOptions,
    expires,
  });
  // ${BRAND}-win cookies
  cookie.save(COOKIES.brandCookie, 'registered_user', {
    ...commonCookiesOptions,
    expires,
  });

  await dispatch(getProfile());
};

export const getProfile = () => async (dispatch) => {
  try {
    const res = await getUserProfile();
    // res structure is different in DEV and in PROD
    if (res.email) {
      // user_profile
      cookie.save(
        COOKIES.userProfile,
        JSON.stringify(res),
        commonCookiesOptions
      );
      dispatch(setUser(res));
      return true;
    } else {
      // TODO: Redirect to the right page if needed
      return false;
    }
  } catch (err) {
    // TODO: Redirect to the right page if needed
    return false;
  }
};

export const setUser = (userprofile) => (dispatch) => {
  return dispatch({ type: USER.SET_USER, userprofile });
};

export const resetUser = () => (dispatch) => {
  return dispatch({ type: USER.RESET_USER });
};

export const updateUser = async (userprofile) => {
  try {
    return await axios(URLUSER, {
      method: 'PUT',
      cache: false,
      withCredentials: true,
      validateStatus: (status) => {
        return status < 500;
      },
      headers: httpCommonHeaders(),
      data: {
        user: userprofile,
      },
    });
  } catch (err) {
    return false;
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: URLLOGOUT,
      validateStatus: (status) => {
        return status < 500;
      },
      cache: false,
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};
