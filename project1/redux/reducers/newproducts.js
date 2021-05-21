import { NEWPRODUCTS } from '../../config/constants/action-types';

const initialState = {
  specialEvent: {},
  canonicalUrl: '',
  deals: [],
  ssr: false,
};

/* eslint-disable default-param-last */
/* eslint-disable sonarjs/no-small-switch */
const newproductsReducer = (
  state = initialState,
  { type, specialEvent, canonicalUrl, deals, ssr }
) => {
  switch (type) {
    case NEWPRODUCTS.SET_NEWPRODUCTS: {
      return {
        ...state,
        specialEvent,
        canonicalUrl,
        deals,
        ssr,
      };
    }
    default:
      return state;
  }
};

export default newproductsReducer;
