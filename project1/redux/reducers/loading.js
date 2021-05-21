import { LOADING_STATE } from '../../config/constants/action-types';
export const LOADING_STATUS = {
  LOADING: 'LOADING',
  READY: 'READY',
};

const initialState = {
  status: LOADING_STATUS.READY,
  message: '',
};

// eslint-disable-next-line default-param-last
const loading = (state = initialState, { type, status, message }) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case LOADING_STATE.SET_LOADING_STATUS: {
      return {
        ...state,
        status: status,
        message: message || '',
      };
    }
    default:
      return state;
  }
};

export default loading;
