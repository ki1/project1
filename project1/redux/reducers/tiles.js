import { TILES } from '../../config/constants/action-types';

const initialState = {
  tiles: null,
};

const tilesReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  { type, tiles, apiUrl }
) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case TILES.SET_TILES: {
      return {
        ...state,
        apiUrl,
        tiles,
      };
    }
    default:
      return state;
  }
};

export default tilesReducer;
