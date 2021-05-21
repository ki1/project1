import { LOADING_STATE } from '../../config/constants/action-types';

export const setLoadingState = (status, message) => (dispatch) => {
  return dispatch({ type: LOADING_STATE.SET_LOADING_STATUS, status, message });
};
