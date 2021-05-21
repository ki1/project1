/* eslint-disable default-param-last */
import merge from 'lodash/merge';
import ErrorTrackingService from './errorTrackingService';
import dayjs from 'dayjs';
import { PAYMENT_METHODS } from '../config/constants/payment.js';

/**
 * Page tracking
 * @param {Object} pageProps additional properties from controller to be merged with `DTM`
 */

const params = null;
const TRAVEL_TYPE = null;

let dtmPromise;
export const waitForDtm = () => {
  if (!dtmPromise) {
    dtmPromise = new Promise((resolve) => {
      // Don't run server side
      if (typeof window === 'undefined') {
        resolve(false);
        return;
      }

      if (typeof window.adobe !== 'undefined') {
        resolve(true);
        return;
      }

      const CHECK_INTERVAL_MS = 300;
      const MAX_TRY_COUNT = 20;
      let tryCount = 0;
      const interval = setInterval(() => {
        tryCount++;
        if (typeof window.adobe !== 'undefined') {
          clearInterval(interval);
          console.log('🚀 🚀 [DTM] is now available 🚀 🚀');
          resolve(true);
        } else if (tryCount > MAX_TRY_COUNT) {
          clearInterval(interval);
          console.warn(
            "🚀 🚀 [DTM] hasn't loaded correctly, sorry DTM is unavailable 🚀 🚀"
          );
          resolve(false);
        }
      }, CHECK_INTERVAL_MS);
    });
  }
  return dtmPromise;
};

const _newDOD = () => {
  const data = {};
  if (window.dod?.persistent) {
    data.persistent = window.dod.persistent;
  }

  return data;
};

/**
 * Track a page that was in secure-wowcher angular site
 * @param {Object} pageProps additional properties from controller
 */
export const trackSecurePage = async (pageProps = {}) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  const dod = _newDOD();

  window.dod = merge(dod, pageProps);
  window.dod.url = window.location.href;
  _directCall('secure_page_view');
};

const getPaymentMethod = (type) => {
  if (type === PAYMENT_METHODS.paypal) return 'PayPal';
  if (type === PAYMENT_METHODS.payPalCredit) return 'PayPal Credit';
  if (type === PAYMENT_METHODS.googlePay) return 'Google Pay';
  if (type === PAYMENT_METHODS.applePay) return 'Apple Pay';
  return 'Card';
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const trackPage = async (pageProps = {}, pageName) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  const dod = await _newDOD();
  const StoreLocation = pageProps.location || '';

  pageProps = pageProps || {};
  dod.section1 = 'deals';
  dod.location = StoreLocation.shortName;
  dod.siteLocation = StoreLocation.name;
  dod.scrollDepth = pageProps?.scrollDepth || 1;
  dod.url = location.href;
  dod.searchTerms = pageProps?.searchTerms || '';
  dod.searchResults = pageProps?.searchResults || '';
  //dod.searchTerms = pageProps.searchTerms || params.searchTerms;
  //dod.searchResults = pageProps.searchResults || params.searchResults;
  dod.categories = pageProps?.categories || null;
  dod.filter = pageProps?.filter || null;
  dod.price = pageProps.dealData?.price || null;
  dod.sort = pageProps?.sort || null;

  if (pageName) {
    dod.section2 = `deals: ${pageName}`;
    dod.pageName = `deals: ${pageName}`;
  } else {
    const location =
      params && params.dealLocation
        ? params.dealLocation
        : StoreLocation.shortName;
    let category = params && params.category ? params.category : 'local';

    if (location === TRAVEL_TYPE && !params.category) category = 'main';

    if (params && params.dealId) dod.dealId = params.dealId;

    dod.section2 = `deals: ${location}`;
    dod.section3 = `${dod.section2}: ${category}`;

    if (params && params.subcategory)
      dod.section3 = `${dod.section3}: ${params.subcategory}`;

    dod.pageName = `${dod.section3}: default deal with list`;
  }

  pageProps.location = StoreLocation.shortName;

  window.dod = merge(dod, pageProps);

  // if (_isNotDefaultFilter(dod)) _directCall('search_filtered_fired');

  _directCall('page_view');
};

export const updatePersistentProp = async (propName, propValue) => {
  const dtmAvailable = await waitForDtm();

  if (!dtmAvailable) {
    console.warn('DTM not available');
    return;
  }

  if (!propName) return;
  if (!window.dod) window.dod = {};
  if (!window.dod.persistent) window.dod.persistent = {};

  // delete property if no propValue given
  if (
    window.dod.persistent &&
    typeof propValue === typeof undefined &&
    window.dod.persistent[propName]
  ) {
    delete window.dod.persistent[propName];
    return;
  }

  window.dod.persistent[propName] = propValue;
};

export const trackError = async (pageProps = {}) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  const dod = _newDOD();
  window.dod = merge(dod, pageProps);
  _directCall('error_view');
};

export const trackEvent = async (eventName, parameters = {}) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  if (Object.keys(parameters).length > 0) {
    window.dodEvents = parameters;
  } else {
    delete window.dodEvents;
  }

  _directCall(eventName);
};

export const pointContinuousTrackingData = async (paramName, reference) => {
  try {
    const dtmAvailable = await waitForDtm();
    if (!dtmAvailable) return;

    if (!window.continuousTrackingData) {
      window.continuousTrackingData = {};
    }

    window.continuousTrackingData[paramName] = reference;
  } catch (error) {
    console.log(`${paramName} tracking not set`);
  }
};

export const updateDod = async (props) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  const dod = window.dod;
  props = props || {};
  window.dod = merge(dod, props);
};

const _directCall = async (eventName) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  if (typeof window._satellite !== 'object') {
    setTimeout(() => {
      if (typeof window._satellite === 'object') {
        window._satellite.track(`RE_${eventName}`);
      } else {
        console.error('Launch was never ready');
      }
    }, 1500);
  } else {
    window._satellite.track(`RE_${eventName}`);
  }
};

const _hoursUntilClosingDate = (isExpressBuy, products) => {
  return isExpressBuy
    ? ''
    : products
        .map((product) => {
          return product.closingDate
            ? dayjs(product.closingDate).diff(dayjs(), 'hour')
            : '';
        })
        .join();
};

const _serializedProductInformation = (
  isExpressBuy,
  products,
  order,
  purchasePrice
) => {
  return isExpressBuy
    ? `;${products[0].dealId};${order.data.quantity};${purchasePrice}`
    : products
        .map(
          (product) =>
            `;${product.dealId};${product.quantity ? product.quantity : 0};${
              product.finalDealOrderAmount
            }`
        )
        .join();
};

const _createDod = async (trackingData) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  if (trackingData && !trackingData.paymentMethod) {
    trackingData.paymentMethod = 'Card';
  }
  window.dod = merge({}, trackingData);
};

/**
 * Creates new dod with specific tracking data for purchase tracking and fires a "RR_completed_purchase" event
 */
export const trackPurchase = (products, order, isExpressBuy) => {
  if (!products || !order) return;
  try {
    // Formatting data
    const purchase = JSON.parse(order.config.data);
    const purchaseContainsGift =
      purchase.orderLines.map((orderLine) => orderLine.gift).indexOf(true) > -1;
    const paymentMethod =
      order.data.walletAmountUsed === 0
        ? order.data.cardType
        : 'Wallet, ' + order.data.cardType;
    const paymentType = order.data.cardType;
    const purchaseTypeField = isExpressBuy ? 'oneclick' : 'normal';
    // deal fields comma separated
    const dealClosingDateField = _hoursUntilClosingDate(isExpressBuy, products);
    const dealIdField = isExpressBuy
      ? products[0].dealId
      : products.map((product) => product.dealId).join();

    // Compute total value of purchase excluding wallet credits
    let purchasePrice;
    if (purchase.walletUsed) {
      purchasePrice = purchase.cashAmount + order.data.walletAmountUsed;
    } else {
      purchasePrice = purchase.cashAmount;
    }
    const productsField = _serializedProductInformation(
      isExpressBuy,
      products,
      order,
      purchasePrice
    );
    // Building tracking data object
    const trackingData = {
      orderValue: purchasePrice, // cash amount from purchase not considering wallet usage
      eVar4: purchaseTypeField, // 4 Purchase Type
      eVar27: purchaseContainsGift ? 'gift' : 'normal', // 27 Buy/Bought as a Gift
      eVar38: order.data.productOrder.id, // 38 Product Order ID
      eVar42: paymentMethod, // 42 Payment Method
      eVar43: order.data.walletAmountUsed, // 43 Wallet Credit Used
      eVar45: products.length, // 45 Number of Deals Bought
      eVar48: dealClosingDateField, // 48 Deal Time Remaining
      eVar49: dealIdField, // 49 Deal ID
      eVar51: getPaymentMethod(paymentType), // 51 Payment Type
      purchaseID: order.data.productOrder.id,
      products: productsField, // not considering wallet usage
      currencyCode: order.data.currency.toLowerCase(),
      pageName: 'my account: my vouchers: order confirmation',
      url:
        window.location.protocol +
        '//' +
        window.location.host +
        '/myaccount/vouchers',
    };
    _createDod(trackingData);
    trackEvent('completed_purchase');
  } catch (e) {
    ErrorTrackingService.logError(e);
  }
};
