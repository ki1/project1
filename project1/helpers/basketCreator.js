import Cookies from 'react-cookies';
import COOKIES from '../config/cookies/cookies';

// Basket object builders
const productBuilder = (
  deal,
  locations,
  position = 0,
  isAGift = false,
  productId = null,
  quantity = -1
) => {
  const products = deal.products[parseInt(position)];

  const productsQuantity = products.quantity ? products.quantity : 1;
  return {
    adId: products.adId ? products.adId : null,
    dealProductId: products.id,
    checkInDate: products.checkInDate ? products.checkInDate : null,
    checkOutDate: products.checkOutDate ? products.checkOutDate : null,
    flights: products.flights ? products.flights : null,
    depositProduct: products.depositProduct ? products.depositProduct : null,
    depositProductId: products.depositProduct
      ? products.depositProduct.id
      : null,
    depositDisplayPrice: products.depositProduct
      ? products.depositProduct.price
      : null,
    discount: products.discount,
    discountPercentage: products.discountPercentage,
    discountValue: products.discount,
    displayDiscount: products.displayDiscount,
    hasDeposit: products.hasDeposit,
    hideProductDiscount: !products.displayDiscount,
    id: products.id,
    originalPrice: products.originalPrice,
    postagePrice: products.postagePrice,
    price: products.price,
    payDeposit: products.payDeposit || products.isDepositOption,
    purchaseCap: products.purchaseCap,
    title: products.title,
    gift: isAGift,
    gifting: giftingBuilder(
      deal,
      deal.deliveryType || false,
      isAGift,
      productId
    ),
    dealId: deal.id,
    dealType: deal.productDisplay.type || 'default',
    sessionPurchaseSource: Cookies.load(COOKIES.sessionSource) || null,
    purchaseGclid: Cookies.load(COOKIES.gclid) || null,
    purchaseUrl: Cookies.load(COOKIES.purchaseUrl),
    purchaseLocation: locations.location.shortName,
    quantity: quantity >= 0 ? quantity : productsQuantity,
  };
};

const giftingBuilder = (product, deliveryType, isAGift, productId = null) => {
  if (
    !isAGift ||
    process.env.NEXT_PUBLIC_BRAND !== 'wowcher' ||
    deliveryType === 'none'
  )
    return null;
  return {
    gift: isAGift ? isAGift : null,
    giftPackProductId: productId,
    giftProductId: isAGift ? product.id : null,
    type: isAGift ? 'wrapped' : null,
  };
};

//then we need to merge a guest basket when the user has logged in
export const basketCreator = (
  deal,
  locations,
  position = 0,
  isAGift = false,
  productId = null
) => {
  if (Array.isArray(position)) {
    // MultiSelect Option
    let newProducts = new Array();
    position.map((item, index) => {
      if (!item) return;
      newProducts.push(
        productBuilder(
          deal,
          locations,
          index,
          isAGift,
          productId,
          parseInt(item)
        )
      );
      return true;
    });
    return newProducts;
  }
  //const basket = getBasket;
  return [productBuilder(deal, locations, position, isAGift, productId)];
};

export const mergeProducts = (previousProducts, newProducts) => {
  // TODO: We need to merge the products and increase the value of the wrapper items
  // const itemsDealIds = previousProducts.map((item) => item.dealId);
  const itemsDealIds = previousProducts.map((item) => item.id);

  // We remove the duplicated products
  const newProductsFiltered = newProducts.filter((item) => {
    //  if (itemsDealIds.includes(item.dealId)) {
    if (itemsDealIds.includes(item.id)) {
      const indexNew = previousProducts.findIndex(
        // (i) => i.dealId === item.dealId
        (i) => i.id === item.id
      );
      if (indexNew >= 0) {
        if (!item.quantity) {
          // we remove the item if has not quantity, this is for multi select options
          previousProducts.splice(indexNew, 1);
          return false;
        }
        Object.assign(previousProducts[indexNew], {
          quantity: item.quantity || 1,
          checkInDate: item.checkInDate || null, // include (possibly) updated checin/out dates
          checkOutDate: item.checkOutDate || null,
        });
      }
      return false;
    }
    if (!item.quantity) return false;
    return true;
  });

  if (!newProductsFiltered || !newProductsFiltered.length)
    return previousProducts;
  return [...previousProducts, ...newProductsFiltered];
};

const getWrapItem = (giftWrap, product) => {
  return {
    dealId: giftWrap.dealId,
    gift: false,
    giftPack: false,
    giftWrap: true,
    gifting: {
      gift: false,
      giftPackProductId: null,
      giftProductId: null,
      type: 'none',
    },
    id: giftWrap.productId,
    payDeposit: product.payDeposit || product.isDepositOption,
    quantity: 1,
  };
};

export const addWrappItem = (giftWrap, items, product) => {
  if (!giftWrap || !giftWrap.dealId || !giftWrap.productId) return items;

  let itemFound = false;
  let newItems = items.map((item) => {
    if (item.dealId !== giftWrap.dealId) return item;
    item.quantity =
      item.quantity + parseInt(product.quantity ? product.quantity : 1);
    itemFound = true;
    return item;
  });
  if (!itemFound) {
    newItems.push(getWrapItem(giftWrap, product));
  }
  return newItems;
};
