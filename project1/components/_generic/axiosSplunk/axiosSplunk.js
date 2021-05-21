import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Cookies from 'react-cookies';
import COOKIES from '../../../config/cookies/cookies';
import {
  SPLUNK_TOKEN,
  SPLUNK_ACTIVATED,
  SPLUNK_SENT_WINDOW_INFORMATION,
  AXIOS_RESPONSE_TIMEOUT,
  AXIOS_CONNECT_TIMEOUT,
} from '../../../config/setup/setup';
import {
  LINKS_GLOBAL_SPLUNK,
  LINK_NOTFOUNDHIT,
  CLOUDFLARE_TRACE,
} from '../../../config/links/links';
import httpCommonHeaders from '../../../helpers/httpCommonHeaders';
import dayjs from 'dayjs';

//Creates a unique guid for the requests and stores it as a cookie
export const getGuid = () => {
  if (!Cookies.load(COOKIES.splunkGuid)) {
    const generatedGuid = uuidv4();
    Cookies.save(COOKIES.splunkGuid, generatedGuid, 365);
  }
  return Cookies.load(COOKIES.splunkGuid);
};

// Use editConfig only in client request, not in SSR
export const editConfig = (data) => {
  if (typeof window === 'undefined' || !window) return data;

  if (window.navigator && window.navigator.userAgent) {
    Object.assign(data, { 'User-Agent': window.navigator.userAgent });
  }
  if (
    window.platform &&
    window.platform.os &&
    window.platform.os.family &&
    window.platform.os.version
  ) {
    Object.assign(data, {
      'Platform-family': window.platform.os.family,
      'Platform-version': window.platform.os.version,
    });
  }

  return data;
};

//sending data of the request to splunk
axios.interceptors.request.use(async (config) => {
  if (!SPLUNK_ACTIVATED || !config) return;
  Object.assign(config, { 'X-Correlation-ID': getGuid() });

  let data = config;
  if (SPLUNK_SENT_WINDOW_INFORMATION && config.withCredentials) {
    data = editConfig(config);
  }
  fetch(LINKS_GLOBAL_SPLUNK[process.env.NEXT_PUBLIC_ENVIRONMENT], {
    method: 'POST',
    headers: {
      Authorization: `Splunk ${
        SPLUNK_TOKEN[process.env.NEXT_PUBLIC_ENVIRONMENT]
      }`,
    },
    body: JSON.stringify({ event: data }),
  }).catch((error) => {
    console.error('Unable to send reuqest data to Splunk', error);
    return false;
  });

  return config;
});

/* eslint-disable promise/param-names */
const fetchWithTimer = (url, options, timeout = AXIOS_CONNECT_TIMEOUT) => {
  return Promise.race([
    axios(url, options),
    new Promise((_, reject) =>
      setTimeout(async () => {
        return reject(new Error(`Connection timeout: ${timeout}`));
      }, timeout)
    ),
  ]);
};

export const SplunkHttp = (data) => {
  return fetch(LINKS_GLOBAL_SPLUNK[process.env.NEXT_PUBLIC_ENVIRONMENT], {
    method: 'POST',
    headers: {
      Authorization: `Splunk ${
        SPLUNK_TOKEN[process.env.NEXT_PUBLIC_ENVIRONMENT]
      }`,
    },
    body: JSON.stringify({ event: data }),
  }).catch((error) => {
    console.error('Splunk error:', error);
    return false;
  });
};

axios.interceptors.response.use(undefined, function (error) {
  // Do something with response error
  if (
    error.response &&
    error.response.status &&
    (error.response.status === 401 || error.response.status === 404)
  ) {
    return;
  }
  // We assign the request as an error
  Object.assign(error, { error: true });
  SplunkHttp(error);
  return Promise.reject(error);
});

// Default response timeout
axios.defaults.timeout = AXIOS_RESPONSE_TIMEOUT || 2500;
axios.defaults.withCredentials = true;

// All these functions needs to be called only on the FE
const getIPfromText = (text) => {
  const ipIndex = text.indexOf('ip=');
  const tsIndex = text.indexOf('ts=');
  if (!ipIndex || !tsIndex) return '';
  return text.slice(ipIndex + 3, tsIndex).trim();
};

const requestIPfromCloudflare = () => {
  return fetch(CLOUDFLARE_TRACE)
    .then((response) => response.text())
    .then((dataReceived) => getIPfromText(dataReceived))
    .catch((error) => {
      console.error('Unable to request IP from Cloudflare', error);
      return '';
    });
};

const sendErrorInfoToSplunk = (defaultHeaders, body) => {
  defaultHeaders['Authorization'] = `Splunk ${
    SPLUNK_TOKEN[process.env.NEXT_PUBLIC_ENVIRONMENT]
  }`;

  return fetch(LINK_NOTFOUNDHIT, {
    method: 'POST',
    headers: defaultHeaders,
    credentials: 'include',
    body: JSON.stringify(body),
  }).catch((error) => {
    console.error('Unable to send error info to Splunk', error);
  });
};

const getDataToSend = (IP, path) => {
  let now = dayjs();
  return {
    dateTime: now.format('DD/MMMM/YYYY HH:mm:ss'),
    pageNotFound: path,
    userAgent: navigator ? navigator.userAgent : '',
    brand: process.env.NEXT_PUBLIC_BRAND || 'wowcher',
    additionalData: IP,
  };
};

export const sendErrorDataToSplunk = async (route) => {
  const IP = await requestIPfromCloudflare();
  const data = getDataToSend(IP, route.asPath);
  return sendErrorInfoToSplunk(httpCommonHeaders(), data);
};

// return an axios wrapper with connection timeout, if we dont want to use it, return axios instead
export default fetchWithTimer;
