import { CHECKOUT } from '../../config/constants/action-types';
import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { BRAND_WOWCHER, URLCHECKOUT } from '../../config/setup/setup';
import { CHECKOUT_STATUS } from '../reducers/checkout';
import ReactCookies from 'react-cookies';
import COOKIES from '../../config/cookies/cookies';
import { getAppPlatform } from '../../helpers/device';
import { removeExcessGift } from './basket';

function getGiftPackPreset(giftingDetails) {
  return {
    id: giftingDetails ? giftingDetails.giftPack.productId : 2058008,
    dealId: giftingDetails ? giftingDetails.giftPack.dealId : 14040360,
    quantity: 0, // always start with zero for new gift packs so we know when a new pack has to be created
    payDeposit: false,
    gift: false,
    giftPack: true,
    giftWrap: false,
  };
}

function getGiftWrapPreset(giftingDetails) {
  return {
    id: giftingDetails ? giftingDetails.giftWrap.productId : 2440914,
    dealId: giftingDetails ? giftingDetails.giftWrap.dealId : 16172264,
    quantity: 0, // always start with zero for new gift packs so we know when a new pack has to be created
    payDeposit: false,
    gift: false,
    giftPack: false,
    giftWrap: true,
  };
}

export const getCheckoutData = async (token, queryParams) => {
  if (!token) {
    throw new Error('No token provided');
  }
  const purchaseSource = ReactCookies.load(COOKIES.sessionSource) || '';
  queryParams.timestamp = new Date().getTime();
  const resp = await axios({
    url: `${URLCHECKOUT}/${token}`,
    params: queryParams,
    method: 'GET',
    withCredentials: true,
    headers: {
      'access-control-allow-credentials': true,
      'App-Platform': getAppPlatform(),
      Brand: process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER,
      'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
      webapp: true,
      'Purchase-Source': purchaseSource,
      ALT_PAYMENT_METHODS: 'GOOGLE_PAY,APPLE_PAY',
    },
  });
  const data = resp.data;

  return {
    type: CHECKOUT.SET_CHECKOUT,
    checkoutData: data,
    giftPackPreset: getGiftPackPreset(data.giftingDetails),
    giftWrapPreset: getGiftWrapPreset(data.giftingDetails),
  };
};

/** Load the checkout data (triggered on page load) */
export const loadCheckoutData = (token) => async (dispatch, getState) => {
  try {
    dispatch(setCheckoutStatus(CHECKOUT_STATUS.LOADING));
    let checkoutData = await getCheckoutData(
      token,
      getState().checkout.queryParams
    );

    if (
      checkoutData &&
      checkoutData.checkoutData &&
      checkoutData.checkoutData.deals &&
      checkoutData.checkoutData.deals.length > 0
    ) {
      // backend now checks for any spiked or sold out
      // check for any orphan giftPacks or giftWraps
      const giftPackOrWrapWasRemoved = await dispatch(
        removeExcessGift(token, checkoutData.checkoutData.deals)
      );
      if (giftPackOrWrapWasRemoved) {
        // need to get checkout data again
        checkoutData = await getCheckoutData(
          token,
          getState().checkout.queryParams
        );
      }
    }

    dispatch(checkoutData);
    dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
  } catch (err) {
    // TODO: show an error state - the basket couldn't be loaded
  }
};

/** Refresh the checkout data (triggered by the countdown) */
export const refreshCheckoutData = (token) => async (dispatch, getState) => {
  try {
    dispatch(setCheckoutStatus(CHECKOUT_STATUS.REFRESHING));
    const checkoutData = await getCheckoutData(
      token,
      getState().checkout.queryParams
    );
    dispatch(checkoutData);
    dispatch(setCheckoutStatus(CHECKOUT_STATUS.REFRESHED));
    // we show a 'prices confirmed' message for 4 seconds before restarting
    // the countdown and hiding the message
    setTimeout(() => {
      dispatch(resetCountdown);
      dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
    }, 4000);
  } catch (err) {
    dispatch(resetCountdown);
    dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
    // TODO: do we want to show some form of failure message here?
  }
};

/** Update checkout data */
export const updateCheckoutData = (token) => async (dispatch, getState) => {
  try {
    dispatch(setCheckoutStatus(CHECKOUT_STATUS.UPDATING));
    const checkoutData = await getCheckoutData(
      token,
      getState().checkout.queryParams
    );
    dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
    dispatch(checkoutData);
  } catch (err) {
    // TODO: do we want to show some form of failure message here?
  }
};

export const setCheckoutStatus = (status) => (dispatch) => {
  dispatch({
    type: CHECKOUT.SET_CHECKOUT_STATUS,
    status,
  });
};

export const resetCountdown = (dispatch) => {
  dispatch({ type: CHECKOUT.RESET_COUNTDOWN });
};

//Keep track of query params across checkout api calls
export const updateCheckoutApiParams = (queryParams) => (dispatch) => {
  dispatch({
    type: CHECKOUT.CHECKOUT_API_PARAMS,
    queryParams,
  });
};
