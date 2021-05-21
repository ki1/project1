import { VIDEO } from '../../config/constants/action-types';

const initialState = {
  playing: null, // the playing video id
  autoPlayable: {}, // should the video be autoplayed?
  visibility: {}, // is the video on screen?
};

/* eslint-disable default-param-last */
const videoReducer = (state = initialState, { type, partial, id, visible }) => {
  switch (type) {
    case VIDEO.SET_VISIBILITY: {
      if (state.playing === id && !visible) {
        return {
          ...state,
          playing: null,
          visibility: {
            ...state.visibility,
            [id]: visible,
          },
        };
      } else {
        return {
          ...state,
          visibility: {
            ...state.visibility,
            [id]: visible,
          },
        };
      }
    }
    case VIDEO.SET_AUTO_PLAYABLE: {
      return {
        ...state,
        autoPlayable: {
          ...partial, // when new deal load don't overwrite already set values
          ...state.autoPlayable,
        },
      };
    }
    case VIDEO.PLAY: {
      if (state.autoPlayable[id] !== undefined) {
        return {
          ...state,
          playing: id,
          autoPlayable: {
            ...state.autoPlayable,
            [id]: true,
          },
        };
      } else {
        return {
          ...state,
          playing: id,
        };
      }
    }
    case VIDEO.STOP: {
      if (state.autoPlayable[id] !== undefined) {
        return {
          ...state,
          playing: null,
          autoPlayable: {
            ...state.autoPlayable,
            [id]: false,
          },
        };
      } else {
        return {
          ...state,
          playing: null,
        };
      }
    }
    default:
      return state;
  }
};

export default videoReducer;
