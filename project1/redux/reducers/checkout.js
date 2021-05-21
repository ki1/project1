import { CHECKOUT } from '../../config/constants/action-types';
import { getFiveMinInFuture } from '../../helpers/timer';
export const CHECKOUT_STATUS = {
  LOADING: 'LOADING', // loading data
  READY: 'READY', // loaded and countdown active
  REFRESHING: 'REFRESHING', // calling api for fresh data via timer
  REFRESHED: 'REFRESHED', // loaded fresh checkout data via timer
  UPDATING: 'UPDATING', // values are being updted (this blocks the timer refresh)
};

const initialState = {
  countdown: getFiveMinInFuture(),
  status: CHECKOUT_STATUS.LOADING,
  checkoutData: {
    deals: [],
    userInfo: {},
    orderSummary: {},
    promoCode: {},
    wallet: false,
  },
  giftPackPreset: {},
  giftWrapPreset: {},
  queryParams: {
    deliveryOptions: true,
    por_check: true,
    giftPacks: true,
    gifting: true,
    wallet: false,
    promoCode: null,
  },
};

const checkoutReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  { type, status, checkoutData, giftPackPreset, giftWrapPreset, queryParams }
) => {
  switch (type) {
    case CHECKOUT.SET_CHECKOUT_STATUS: {
      return {
        ...state,
        status,
      };
    }
    case CHECKOUT.CHECKOUT_API_PARAMS: {
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          ...queryParams,
        },
      };
    }
    case CHECKOUT.SET_CHECKOUT: {
      return {
        ...state,
        checkoutData,
        giftPackPreset,
        giftWrapPreset,
      };
    }
    case CHECKOUT.RESET_COUNTDOWN: {
      return {
        ...state,
        countdown: getFiveMinInFuture(),
      };
    }
    default:
      return state;
  }
};

export default checkoutReducer;
