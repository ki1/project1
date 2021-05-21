import axios from '../components/_generic/axiosSplunk/axiosSplunk';
import { URLGOOGLELOGIN, URLGOOGLEREGISTR } from '../config/setup/setup';
import httpCommonHeaders from './httpCommonHeaders';

export const loginGoogleUser = async (token) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: URLGOOGLELOGIN,
      cache: false,
      withCredentials: true,
      validateStatus: (status) => {
        return status < 500;
      },
      headers: httpCommonHeaders(),
      data: {
        loginRequest: {
          tokenId: token,
        },
      },
    });
    return data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    }
    throw Error(err);
  }
};

export const registerGoogleUser = async (token) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: URLGOOGLEREGISTR,
      cache: false,
      withCredentials: true,
      validateStatus: (status) => {
        return status < 500;
      },
      headers: httpCommonHeaders(),
      data: {
        requestRegistration: {
          tokenId: token,
        },
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

export const showErrorToast = (message, toast) => {
  toast.addToast(message, 'toast-error');
};
