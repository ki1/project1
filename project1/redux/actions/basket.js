import { BASKET } from '../../config/constants/action-types';
import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import ReactCookies from 'react-cookies';
import httpCommonHeaders from '../../helpers/httpCommonHeaders';
import commonCookiesOptions from '../../helpers/commonCookiesOptions';

import {
  URLBASKET,
  BRAND_HYPHEN_DOMAIN,
  GIFTING_OPTIONS,
  COOKIES_EXPIRES_WEEK,
} from '../../config/setup/setup';
import COOKIES from '../../config/cookies/cookies';
import { getCheckoutData, setCheckoutStatus } from './checkout';
import { CHECKOUT_STATUS } from '../reducers/checkout';
import { mergeProducts } from '../../helpers/basketCreator';
import get from 'lodash/get';
import {
  getGiftPack,
  getGiftWrap,
  getSpikedOrSoldOutProducts,
  getNumberProductsWithGiftpack,
  getNumberOfGiftwrap,
} from '../../helpers/checkout';
import { trackEvent } from '../../helpers/analytics';

export const createBasket = async (products) => {
  try {
    return axios(URLBASKET, {
      method: 'POST',
      withCredentials: true,
      data: {
        brand: BRAND_HYPHEN_DOMAIN[process.env.NEXT_PUBLIC_SITE],
        products,
      },
      headers: httpCommonHeaders(),
    })
      .then((res) => {
        /* eslint-disable promise/always-return */
        if (res.headers.location) {
          const headersLocation = res.headers.location.split('/');
          const code = headersLocation.slice(-1);
          var expire = new Date();
          expire.setDate(expire.getDate() + COOKIES_EXPIRES_WEEK);
          // bt
          ReactCookies.save(COOKIES.basketToken, code[0], {
            ...commonCookiesOptions,
            expire,
          });
          return code[0];
        }
      })
      .catch((error) => {
        // TODO: Show error message if needed
        console.error(error);
        return null;
      });
  } catch (err) {
    console.error(err); // TODO: Show error message if needed
    return null;
  }
};

export const getBasket = (isAuthenticated = false) => (dispatch) => {
  try {
    const basketToken = ReactCookies.load(COOKIES.basketToken);

    if (basketToken) {
      // We try the Basket Token
      dispatch(getBasketWithURL(`${URLBASKET}/${basketToken}?giftPacks=true`));
    } else if (isAuthenticated) {
      // We try with the Customer Token ct
      const customerToken = ReactCookies.load(COOKIES.customerToken);
      if (customerToken) {
        dispatch(
          getBasketWithURL(
            `${URLBASKET}?customerToken=${customerToken}&giftPacks=true`
          )
        );
      }
    }
  } catch (err) {
    // TODO: Show error message if needed
    console.error(err);
    return null;
  }
};

export const getBasketWithURL = (url) => async (dispatch) => {
  const responseData = await fetchBasketWithURL(url);
  if (responseData) dispatch(setBasket(responseData));
};

export const setBasket = (basket) => (dispatch) => {
  return dispatch({ type: BASKET.SET_BASKET, basket });
};

export const resetBasket = () => (dispatch) => {
  return dispatch({ type: BASKET.RESET_BASKET });
};

/**
 * Helper to fetch a basket from URL
 *
 * @param {string} url     basket url
 */
const fetchBasketWithURL = async (url) => {
  const separator = url.indexOf('?') === -1 ? '?' : '&';
  try {
    const res = await axios({
      url: `${url}${separator}timestamp=${new Date().getTime()}`,
      method: 'GET',
      withCredentials: true,
      headers: httpCommonHeaders(),
    });
    const data = res.data && Array.isArray(res.data) ? res.data[0] : res.data;

    if (data && data.id && !ReactCookies.load(COOKIES.basketToken)) {
      ReactCookies.save(COOKIES.basketToken, data.id, {
        domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
      });
    }
    return data;
  } catch (err) {
    // Handle Error
    console.error(err);
  }
};

export const fetchBasket = async () => {
  const customerToken = ReactCookies.load(COOKIES.customerToken);
  if (customerToken) {
    getBasketWithURL(
      `${URLBASKET}?customerToken=${customerToken}&giftPacks=true`
    );
  }
};

/**
 * Helper to merge cookie and customer baskets if required
 * will be called from checkout on login or if already logged in
 *
 * @param {string} basketToken     basket token
 * @returns {string} bt - current or new one if required
 */
export const mergeBaskets = async (basketToken) => {
  const basketTokenBasket = await fetchBasketWithURL(
    `${URLBASKET}/${basketToken}`
  );

  const ct = ReactCookies.load(COOKIES.customerToken);
  // has a customerToken that matches ct cookie, no merging required
  if (
    basketTokenBasket &&
    basketTokenBasket.customerToken &&
    basketTokenBasket.customerToken === ct
  ) {
    return basketToken;
  }

  const customerTokenBasket = await fetchBasketWithURL(
    `${URLBASKET}?customerToken=${ct}&giftPacks=true`
  );

  let mergedProducts = [];
  let customerBt = null;
  // are there are two baskets to merge
  // an anonymous basket and a previous customer basket
  if (basketTokenBasket && customerTokenBasket) {
    customerBt = customerTokenBasket.id;
    mergedProducts = mergeProducts(
      get(customerTokenBasket, 'products', []),
      get(basketTokenBasket, 'products', [])
    );

    if (customerBt !== basketToken) {
      // replace basket
      await replaceBasket(customerBt, mergedProducts);
      // replace bt cookie
      ReactCookies.save(COOKIES.basketToken, customerBt, {
        domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
      });
      return customerBt;
    }
  }
  return basketToken;
};

/**
 * Helper to replace a basket
 *
 * @param {string} basketToken     basket token to update
 * @param {object} data   The new basket, an array of products
 * @param {boolean} isAuthenticated, is user logged in
 */
export const replaceBasket = async (basketToken, data, isAuthenticated) => {
  if (!basketToken || !data) {
    //  TODO: Don't throw errors if they are not captured
    // throw new Error('args malformed');
    return null;
  }

  const url = `${URLBASKET}/${basketToken}`;
  let customerToken = null;
  if (isAuthenticated) {
    customerToken = ReactCookies.load(COOKIES.customerToken);
  }
  try {
    await axios({
      url,
      method: 'PUT',
      withCredentials: true,
      headers: {
        id: basketToken,
        ...httpCommonHeaders(),
      },
      data: {
        id: basketToken,
        customerToken: customerToken,
        brand: BRAND_HYPHEN_DOMAIN[process.env.NEXT_PUBLIC_SITE],
        products: data,
      },
    });
    return basketToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Generic helper to add a product to a specified basket
 *
 * @param {string} basketToken     basket token to update
 * @param {object} data   The new product to insert
 */
export const addBasketProduct = async (basketToken, data) => {
  if (!basketToken || !data) {
    //  TODO: Don't throw errors if they are not captured
    // throw new Error('args malformed');
    return null;
  }
  const url = `${URLBASKET}/${basketToken}/product`;
  try {
    await axios({
      url,
      method: 'POST',
      withCredentials: true,
      headers: {
        id: basketToken,
        ...httpCommonHeaders(),
      },
      data,
    });
    return basketToken;
  } catch (err) {
    // TODO: show error if needed
    console.error(err);
    return null;
  }
};

/**
 * Generic helper function to patch a basket product with new values
 *
 * @param {string} basketToken           // the basket id
 * @param {string} productId    // the product to update
 * @param {object} data         // partial data to patch the product with
 */
export async function updateBasketProduct(basketToken, productId, data) {
  if (!basketToken || !productId || !data) {
    //  TODO: Don't throw errors if they are not captured
    // throw new Error('args malformed');
    return null;
  }
  const url = `${URLBASKET}/${basketToken}/product/${productId}`;
  await axios({
    url,
    method: 'PATCH',
    withCredentials: true,
    headers: httpCommonHeaders(),
    data,
  });
  return true;
}

/**
 * Generic helper function to empty basket
 *
 * @param {string} basketToken
 */
export const emptyBasketProducts = async (basketToken) => {
  if (!basketToken) {
    //  TODO: Don't throw errors if they are not captured
    // throw new Error('args malformed');
    return null;
  }
  const url = `${URLBASKET}/${basketToken}/product`;
  await axios({
    url,
    method: 'DELETE',
    withCredentials: true,
    headers: httpCommonHeaders(),
  });
  return true;
};

/**
 * Generic helper function to remove a product from a basket
 *
 * @param {string} basketToken
 * @param {string} productId
 */
export const removeBasketProduct = async (basketToken, productId) => {
  if (!basketToken || !productId) {
    throw new Error('args malformed');
  }
  const url = `${URLBASKET}/${basketToken}/product/${productId}`;
  await axios({
    url,
    method: 'DELETE',
    withCredentials: true,
    headers: httpCommonHeaders(),
  });
  return true;
};

/**
 * dispatch to update the quantity of a specific product in a basket
 */
export const updateProductQuantity = (
  basketToken,
  product,
  quantity,
  oldQuantity,
  giftWrap
) => async (dispatch, getState) => {
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.UPDATING));

  if (product.gifting && product.gifting.type === GIFTING_OPTIONS.WRAPPED) {
    // remove/decrement/increment the gift wrap if assigned to this product
    const quantityDiff = quantity - oldQuantity;
    const newQuantity = giftWrap.quantity + quantityDiff;
    await updateGiftWrapQuantity(basketToken, giftWrap, newQuantity);
  }

  await updateBasketProduct(basketToken, product.id, {
    quantity,
  });
  const checkoutData = await getCheckoutData(
    basketToken,
    getState().checkout.queryParams
  );
  dispatch(checkoutData);
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
};

/**
 * Add a gift pak to the basket if it doesn't exist or increments quantity if already present.
 *
 * @param {string} bt         id of Basket to update
 * @param {object} giftPack    Either the current gift pack from the basket or the default gift pack product
 * @param {object} toast    toast object to show a message
 */
export const addGiftPackToBasket = async (bt, giftPack, toast) => {
  // quantity is 0 when no gift pack is in the basket (ie. giftPack is preset)
  if (giftPack.quantity === 0) {
    // add a new gift pack to the basket
    await addBasketProduct(bt, {
      ...giftPack, // make sure we don't mutate the current giftPack
      quantity: 1,
    });
    toast.addToast('Gift Pack Added', 'toast-success', 'top-right');
  } else {
    // update the existing gift pack quantity
    // -- for some reason giftPack: true is overwritten on PATCH so define explicitly
    await updateBasketProduct(bt, giftPack.id, {
      quantity: giftPack.quantity + 1,
      giftPack: true,
    });
  }
};

/**
 * remove a gift pack from the basket if it no longer exist or decrements quantity if still needed by other products.
 *
 * @param {string} basketToken         id of Basket to update
 * @param {object} giftPack    Either the current gift pack from the basket or the default gift pack product
 */
export const removeGiftPackFromBasket = async (basketToken, giftPack) => {
  if (giftPack.quantity < 0) {
    // no gift pack to remove
    return true;
  } else if (giftPack.quantity === 1) {
    // add a new gift pack to the basket
    await removeBasketProduct(basketToken, giftPack.id);
  } else {
    // update the existing gift pack quantity
    // -- for some reason giftPack: true is overwritten on PATCH so define explicitly
    await updateBasketProduct(basketToken, giftPack.id, {
      quantity: giftPack.quantity - 1,
      giftPack: true,
    });
  }
};

/**
 * set gift pack quantity
 *
 * @param {string} basketToken         id of Basket to update
 * @param {object} giftPack    giftPack object with quantity set to the required number
 */
export const updateGiftPackQuantity = async (basketToken, giftPack) => {
  if (giftPack.quantity === 0) {
    // remove
    await removeBasketProduct(basketToken, giftPack.id);
  } else {
    // update quantity
    await updateBasketProduct(basketToken, giftPack.id, {
      quantity: giftPack.quantity,
    });
  }
};

/**
 * set gift wrap quantity
 * @param {string} basketToken         id of Basket to update
 * @param {object} giftWrap    existing giftWrap object
 * @param {number} newQuantity    set the gift wrap quantity to this
 * @param {object} [toast]    toast object to show a message
 */
export const updateGiftWrapQuantity = async (
  basketToken,
  giftWrap,
  newQuantity,
  toast
) => {
  const quantityToSet = Math.max(newQuantity, 0);

  if (quantityToSet === 0) {
    // remove the gift wrap
    await removeBasketProduct(basketToken, giftWrap.id);
  }
  if (quantityToSet > 0 && giftWrap.quantity === 0) {
    // add a new gift wrap with correct quantity to the basket
    await addBasketProduct(basketToken, {
      ...giftWrap,
      quantity: quantityToSet,
    });
    if (toast) toast.addToast('Gift Wrap Added', 'toast-success', 'top-right');
  }
  if (quantityToSet > 0 && giftWrap.quantity !== 0) {
    // update gift wrap quantity
    await updateBasketProduct(basketToken, giftWrap.id, {
      quantity: quantityToSet,
    });
  }
};

/**
 * update the gifting option of a specific product in a basket
 * none | e-gift | gift-pack
 *
 * On livingsocial there are only two options (none | e-gift). This is toggled by a checkbox but uses the same
 * update mechanism
 */
export const updateProductGifting = (
  basketToken,
  giftPack,
  giftWrap,
  product,
  giftingOption,
  toast
) => async (dispatch, getState) => {
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.UPDATING));
  switch (giftingOption) {
    case GIFTING_OPTIONS.NONE: {
      // if it is currently gift-pack we need to remove the gift pack
      if (
        product.gifting &&
        product.gifting.type === GIFTING_OPTIONS.GIFT_PACK
      ) {
        await removeGiftPackFromBasket(basketToken, giftPack);
      }
      // if it is currently gift-wrap we need to remove the gift wrap
      if (product.gifting && product.gifting.type === GIFTING_OPTIONS.WRAPPED) {
        // remove gift wrap quantity same as product removed quantity
        const newQuantity = giftWrap.quantity - product.quantity;
        await updateGiftWrapQuantity(basketToken, giftWrap, newQuantity);
      }
      // clear the gifting
      await updateBasketProduct(basketToken, product.id, {
        gift: false,
        gifting: {
          gift: false,
          type: GIFTING_OPTIONS.NONE,
          giftPackProductId: null,
          giftProductId: null,
        },
      });
      break;
    }
    case GIFTING_OPTIONS.GIFT: {
      // no need to remove gift pack for this option. LS only on which gift packs don't exist.
      await updateBasketProduct(basketToken, product.id, {
        gift: true,
      });
      break;
    }
    case GIFTING_OPTIONS.E_GIFT: {
      // if it is currently gift-pack we need to remove the gift pack
      if (
        product.gifting &&
        product.gifting.type === GIFTING_OPTIONS.GIFT_PACK
      ) {
        await removeGiftPackFromBasket(basketToken, giftPack);
      }
      // change gifting to e-gift
      await updateBasketProduct(basketToken, product.id, {
        gift: true,
        gifting: {
          gift: true,
          type: GIFTING_OPTIONS.E_GIFT,
          giftPackProductId: null,
          giftProductId: null,
        },
      });
      break;
    }
    case GIFTING_OPTIONS.GIFT_PACK: {
      // add/update the gift pack
      await addGiftPackToBasket(basketToken, giftPack, toast);
      // change gifting to gift-pack
      await updateBasketProduct(basketToken, product.id, {
        gift: true,
        gifting: {
          gift: true,
          type: GIFTING_OPTIONS.GIFT_PACK,
          giftPackProductId: giftPack.id,
        },
      });
      break;
    }
    case GIFTING_OPTIONS.WRAPPED: {
      // add/update the gift wrap quantity same as product quantity
      const newQuantity = giftWrap.quantity + product.quantity;
      await updateGiftWrapQuantity(basketToken, giftWrap, newQuantity, toast);

      // change gifting to wrapped
      await updateBasketProduct(basketToken, product.id, {
        gift: true,
        gifting: {
          gift: true,
          type: GIFTING_OPTIONS.WRAPPED,
          giftProductId: giftWrap.id,
        },
      });
      break;
    }
  }
  const checkoutData = await getCheckoutData(
    basketToken,
    getState().checkout.queryParams
  );
  dispatch(checkoutData);
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
};

/** Dispatch version of empty basket */
export const removeAllProductsFromBasket = (bt) => async (dispatch) => {
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.UPDATING));
  // remove the products
  await emptyBasketProducts(bt);
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
};

/** remove excess giftPack/Wrap */
export const removeExcessGift = (bt, checkoutDeals) => async () => {
  const giftPack = getGiftPack(checkoutDeals);
  const giftWrap = getGiftWrap(checkoutDeals);
  let wasItemRemoved = false;

  // no gift pack or wrap
  if (!giftPack && !giftWrap) return false;

  if (giftPack && giftPack.quantity) {
    const numberProductsWithGiftpack = getNumberProductsWithGiftpack(
      checkoutDeals
    );
    if (giftPack.quantity !== numberProductsWithGiftpack) {
      // need to update the gift pack number
      giftPack.quantity = numberProductsWithGiftpack;
      await updateGiftPackQuantity(bt, giftPack);
      wasItemRemoved = true;
    }
  }

  if (giftWrap && giftWrap.quantity) {
    const numberOfGiftwrap = getNumberOfGiftwrap(checkoutDeals);
    if (giftWrap.quantity !== numberOfGiftwrap) {
      // need to update the gift wrap number
      await updateGiftWrapQuantity(bt, giftWrap, numberOfGiftwrap);
      wasItemRemoved = true;
    }
  }

  return wasItemRemoved;
};

/** Dispatch remove sold out and spiked products from basket */
export const removeSoldOutSpikedFromBasket = (bt, checkoutDeals) => async (
  dispatch
) => {
  // if any spiked or sold out
  const spikedOrSoldOutProducts = getSpikedOrSoldOutProducts(checkoutDeals);

  if (spikedOrSoldOutProducts && spikedOrSoldOutProducts.length > 0) {
    // remove the products
    for (const product of spikedOrSoldOutProducts) {
      await dispatch(removeProductFromBasket(bt, product));
    }
    return true;
  }
  return false;
};

/** Dispatch version of removing a basket item */
export const removeProductFromBasket = (
  basketToken,
  product,
  giftPack,
  giftWrap
) => async (dispatch, getState) => {
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.UPDATING));
  if (product.gifting && product.gifting.type === GIFTING_OPTIONS.GIFT_PACK) {
    // remove/decrement the giftPack if assigned to this product
    await removeGiftPackFromBasket(basketToken, giftPack);
  }
  if (product.gifting && product.gifting.type === GIFTING_OPTIONS.WRAPPED) {
    // remove/decrement the gift wrap if assigned to this product
    const newQuantity = giftWrap.quantity - product.quantity;
    await updateGiftWrapQuantity(basketToken, giftWrap, newQuantity);
  }
  // remove the actual product
  await removeBasketProduct(basketToken, product.id);
  // refresh the checkout
  const checkoutData = await getCheckoutData(
    basketToken,
    getState().checkout.queryParams
  );
  dispatch(checkoutData);
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
  trackEvent('cart_remove_item');
};

/** Dispatch update deposit option */
export const updateProductDeposit = (bt, product, payDeposit) => async (
  dispatch,
  getState
) => {
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.UPDATING));
  await updateBasketProduct(bt, product.id, {
    payDeposit: payDeposit,
  });
  // refresh the checkout
  const checkoutData = await getCheckoutData(
    bt,
    getState().checkout.queryParams
  );
  dispatch(checkoutData);
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
};

/** Dispatch update delivery option type */
export const updateProductDeliveryOptionType = (
  basketToken,
  product,
  deliveryOptionType
) => async (dispatch, getState) => {
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.UPDATING));
  await updateBasketProduct(basketToken, product.id, {
    deliveryOptionType,
  });
  // refresh the checkout
  const checkoutData = await getCheckoutData(
    basketToken,
    getState().checkout.queryParams
  );
  dispatch(checkoutData);
  dispatch(setCheckoutStatus(CHECKOUT_STATUS.READY));
};
