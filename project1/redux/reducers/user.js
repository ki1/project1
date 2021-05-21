import { USER } from '../../config/constants/action-types';

const initialState = {
  username: '',
  isAuthenticated: false,
  userprofile: '',
  lightbox: false,
};

// eslint-disable-next-line default-param-last
const user = (state = initialState, { type, userprofile, lightbox }) => {
  switch (type) {
    case USER.SET_AUTHENTICATED: {
      return {
        ...state,
      };
    }
    case USER.SET_USER: {
      return {
        ...state,
        userprofile,
        isAuthenticated: true,
        username: userprofile.firstName || '',
      };
    }
    case USER.RESET_USER: {
      return {
        ...state,
        userprofile: {},
        isAuthenticated: false,
        username: '',
      };
    }
    case USER.SET_LIGHTBOX: {
      return {
        ...state,
        lightbox: lightbox,
      };
    }
    default:
      return state;
  }
};

export default user;
