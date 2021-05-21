import { SCROLLER } from '../../config/constants/action-types';

const initialState = {
  config: [],
  ssr: false,
};

/* eslint-disable default-param-last */
/* eslint-disable sonarjs/no-small-switch */
const scrollerReducer = (state = initialState, { type, config, ssr }) => {
  switch (type) {
    case SCROLLER.SET_SCROLLER: {
      return {
        ...state,
        config,
        ssr,
      };
    }
    default:
      return state;
  }
};

export default scrollerReducer;
