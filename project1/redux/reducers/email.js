import { USER_EMAIL } from '../../config/constants/action-types';

const initialState = {
  userEmail: '',
};

// eslint-disable-next-line default-param-last
const email = (state = initialState, { type, userEmail }) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case USER_EMAIL.SET_USER_EMAIL: {
      return {
        ...state,
        userEmail,
      };
    }
    default:
      return state;
  }
};

export default email;
