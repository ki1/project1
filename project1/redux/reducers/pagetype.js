import { PAGE_TYPE } from '../../config/constants/action-types';

export const PAGE_TYPE_NAME = {
  CATEGORY: 'CATEGORY',
  LOCATION: 'LOCATION',
  SHOP: 'SHOP',
  OTHER: 'OTHER',
};

const initialState = {
  pageType: '',
};

// eslint-disable-next-line default-param-last
const pagetypeReducer = (state = initialState, { type, pageType }) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case PAGE_TYPE.SET_PAGE_TYPE: {
      return {
        ...state,
        pageType: pageType,
      };
    }
    default:
      return state;
  }
};

export default pagetypeReducer;
