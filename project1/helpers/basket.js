/**
 * We must have a deal that is walletAllowed and has a non-disabled product
 */
export const findWalletAllowed = (deals) => {
  if (Object.keys(deals).length === 0) {
    return false;
  }
  const walletAllowed = deals.find((deal) => {
    return deal.walletAllowed;
  });
  return !!(
    walletAllowed &&
    walletAllowed.products.find((product) => {
      return !product.disabled;
    })
  );
};

/**
 * Get quantity for basket icon, no giftPack or giftWrap counted
 */
export const getBasketQuantity = (products) => {
  return products.reduce(
    (total, product) =>
      product.giftPack === false && product.giftWrap === false
        ? total + product.quantity
        : total,
    0
  );
};
