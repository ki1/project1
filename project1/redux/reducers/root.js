import { combineReducers } from 'redux';

import basketReducer from './basket';
import dealsReducer from './deals';
import emailReducer from './email';
import filtersReducer from './filters';
import giftingReducer from './gifting';
import userReducer from './user';
import { searchReducer } from './search';
import locationsReducer from './locations';
import loadingReducer from './loading';
import navigationReducer from './navigation';
import scrollerReducer from './scroller';
import newproductsReducer from './newproducts';
import checkoutReducer from './checkout';
import walletReducer from './wallet';
import videoReducer from './video';
import pagetypeReducer from './pagetype';
import tilesReducer from './tiles';

const rootReducer = combineReducers({
  basket: basketReducer,
  checkout: checkoutReducer,
  email: emailReducer,
  deals: dealsReducer,
  filters: filtersReducer,
  gifting: giftingReducer,
  locations: locationsReducer,
  profile: loadingReducer,
  navigation: navigationReducer,
  newproducts: newproductsReducer,
  user: userReducer,
  search: searchReducer,
  scroller: scrollerReducer,
  wallet: walletReducer,
  video: videoReducer,
  pagetype: pagetypeReducer,
  tiles: tilesReducer,
});

export default rootReducer;
