import { WALLET } from '../../config/constants/action-types';

const initialState = {
  userWallet: [],
  hasError: false,
};

/* eslint-disable default-param-last */
const walletReducer = (state = initialState, { type, userWallet }) => {
  switch (type) {
    case WALLET.SET_WALLET: {
      return {
        ...state,
        userWallet,
        hasError: false,
      };
    }
    case WALLET.ERROR_WALLET: {
      return {
        ...state,
        userWallet: [],
        hasError: true,
      };
    }
    case WALLET.RESET_WALLET: {
      return {
        ...state,
        userWallet: [],
        hasError: false,
      };
    }
    default:
      return state;
  }
};

export default walletReducer;
