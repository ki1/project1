import { BASKET } from '../../config/constants/action-types';
import { getBasketQuantity } from '../../helpers/basket';

const initialState = {
  quantity: '',
  basket: [],
};

// eslint-disable-next-line default-param-last
const basketReducer = (state = initialState, { type, basket }) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case BASKET.SET_BASKET: {
      let products = [];
      if (basket) {
        if (basket.products) {
          products = basket.products;
        } else if (basket[0].products) {
          products = basket[0].products;
        }
      }

      const quantity = getBasketQuantity(products);
      return {
        ...state,
        basket,
        quantity: quantity ? quantity.toString() : '',
      };
    }
    case BASKET.RESET_BASKET: {
      return {
        ...state,
        quantity: '',
        basket: [],
      };
    }
    default:
      return state;
  }
};

export default basketReducer;
