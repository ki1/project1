import { getAppPlatform } from './device';
import Cookies from 'react-cookies';
import COOKIES from '../config/cookies/cookies';

const headers = {
  accept: 'application/json',
  'Access-Control-Allow-Credentials': true,
  'content-type': 'application/json',
  'country-code': (process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb').toUpperCase(),
  'app-platform': getAppPlatform(),
  brand: process.env.NEXT_PUBLIC_BRAND || 'wowcher',
  webapp: true,
  version: 'v1.1',
};

const httpCommonHeaders = () => {
  const commonHeaders = headers;
  const dynamicPrice = Cookies.load(COOKIES.dynamicPrice);
  if (dynamicPrice) {
    commonHeaders[COOKIES.dynamicPrice] = dynamicPrice;
  }
  //TODO: do we need to read from adobe similar to angular
  return commonHeaders;
};

export default httpCommonHeaders;
