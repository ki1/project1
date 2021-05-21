import { GIFTING } from '../../config/constants/action-types';

const initialState = {
  giftWrap: null,
  giftPack: null,
};
// eslint-disable-next-line default-param-last
const loading = (state = initialState, { type, giftWrap, giftPack }) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case GIFTING.SET_GIFTING: {
      return {
        ...state,
        giftWrap,
        giftPack,
      };
    }
    case GIFTING.RESET_GIFTING: {
      return {
        ...state,
        giftWrap: null,
        giftPack: null,
      };
    }
    default:
      return state;
  }
};

export default loading;
