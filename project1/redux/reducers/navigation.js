import { NAVIGATION } from '../../config/constants/action-types';

const initialState = {
  list: [],
  previews: {},
  ssr: true,
};

const navigationReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  { type, list, ssr, preview }
) => {
  switch (type) {
    case NAVIGATION.SET_MENU: {
      return {
        ...state,
        list,
        ssr,
      };
    }
    case NAVIGATION.SET_SSR: {
      return {
        ...state,
        ssr,
      };
    }
    case NAVIGATION.SET_DEAL_PREVIEW: {
      return {
        ...state,
        previews: {
          ...state.previews,
          ...preview,
        },
      };
    }
    default:
      return state;
  }
};

export default navigationReducer;
