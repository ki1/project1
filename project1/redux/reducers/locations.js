import { LOCATIONS } from '../../config/constants/action-types';
import { DEFAULT_LOCATION } from '../../config/setup/setup';

const initialState = {
  locations: [],
  location: DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE || 'wowcher'],
};

const locationsReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  { type, locations, location }
) => {
  switch (type) {
    case LOCATIONS.SET_LOCATIONS: {
      return {
        ...state,
        locations,
      };
    }
    case LOCATIONS.SET_LOCATION: {
      return {
        ...state,
        location,
      };
    }
    default:
      return state;
  }
};

export default locationsReducer;
