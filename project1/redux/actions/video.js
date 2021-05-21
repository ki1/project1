import { VIDEO } from '../../config/constants/action-types';

export const setVideoVisibility = (id, visible) => (dispatch) => {
  return dispatch({
    type: VIDEO.SET_VISIBILITY,
    id,
    visible,
  });
};

export const setVideoAutoPlayable = (partial) => (dispatch) => {
  return dispatch({
    type: VIDEO.SET_AUTO_PLAYABLE,
    partial,
  });
};

export const playVideo = (id) => (dispatch) => {
  return dispatch({
    type: VIDEO.PLAY,
    id,
  });
};

export const stopVideo = (id) => (dispatch) => {
  return dispatch({
    type: VIDEO.STOP,
    id,
  });
};
