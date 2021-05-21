import Cookies from 'react-cookies';
import COOKIES from '../config/cookies/cookies';

export const isIE = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.navigator.userAgent.indexOf('Microsoft Internet Explorer') !== -1 ||
    window.navigator.userAgent.indexOf('Trident') !== -1
  );
};

export const isSamsung = () => {
  if (typeof window === 'undefined') return false;
  return window.navigator.userAgent.indexOf(`SamsungBrowser`) !== -1;
};

export const isLightPage = () => {
  return Cookies.load(COOKIES.lightPage) === 'true';
};
