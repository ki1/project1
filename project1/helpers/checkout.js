/**
 * Calculates the max purchase quantity a user is alowed to select.
 */
export function getMaxPurchaseQuantity(isAuthenticated, deal, product) {
  if (deal.purchaseCap) {
    return isAuthenticated && product.userDealInfo
      ? Math.min(deal.purchaseCap, product.userDealInfo.maxQuantityUserCanBuy)
      : Math.min(deal.purchaseCap, product.purchaseCap);
  } else {
    return isAuthenticated && product.userDealInfo
      ? product.userDealInfo.maxQuantityUserCanBuy
      : product.purchaseCap;
  }
}

/**
 * Generates an array of numbers from min to max inclusive.
 */
export function getSelectValues(min, max) {
  const out = [];
  for (let i = min; i <= max; i++) {
    out.push(i);
  }
  return out;
}

export function isOdd(num) {
  return num % 2 !== 0;
}

/**
 * @function - Returns the quantity of products marked as having giftpack from deals
 * @param {deals} deals from checkout API call
 */
export function getNumberProductsWithGiftpack(deals) {
  if (!deals) return 0;
  let products = [];
  deals.forEach((deal) => {
    deal.products.forEach((product) => {
      if (
        product.gifting &&
        product.gifting.gift === true &&
        product.gifting.giftPackProductId
      )
        products.push(product);
    });
  });
  return products.length;
}

/**
 * @function - Returns the quantity giftwrap from deals
 * @param {deals} deals from checkout API call
 */
export function getNumberOfGiftwrap(deals) {
  if (!deals) return 0;
  let quantity = 0;
  deals.forEach((deal) => {
    deal.products.forEach((product) => {
      if (
        product.gifting &&
        product.gifting.gift === true &&
        product.gifting.giftProductId
      )
        quantity = quantity + product.quantity;
    });
  });
  return quantity;
}

/**
 * Get the gift pack entry if it exists in the basket.
 */
export function getGiftPack(deals) {
  for (let i = 0; i < deals.length; i++) {
    const deal = deals[i];
    for (let ii = 0; ii < deal.products.length; ii++) {
      const product = deal.products[ii];
      if (product.giftPack) {
        return product;
      }
    }
  }
}

/**
 * Get the gift wrap entry if it exists in the basket.
 */
export function getGiftWrap(deals) {
  for (let i = 0; i < deals.length; i++) {
    const deal = deals[i];
    for (let ii = 0; ii < deal.products.length; ii++) {
      const product = deal.products[ii];
      if (product.giftWrap) {
        return product;
      }
    }
  }
}

/**
 * Get the gift pack entry from basket products
 */
export function getGiftPackFromProducts(products) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.giftPack) {
      return product;
    }
  }
}

/**
 * Get the gift wrap entry from basket products
 */
export function getGiftWrapFromProducts(products) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.giftWrap) {
      return product;
    }
  }
}

/**
 * Return true if all deal or product has reached purchase cap
 * @param {Object} deals.
 * @returns {Boolean}
 */
export const isAllPurchaseCapReached = (deals) => {
  if (!deals || deals.length === 0) return false;

  return deals.every((deal) => {
    return (
      deal.purchaseCap === 0 ||
      deal.products.some((product) => {
        return product?.userDealInfo?.maxQuantityUserCanBuy === 0;
      })
    );
  });
};

/**
 * Get basket products
 */
export const getSpikedOrSoldOutProducts = (deals) => {
  let products = [];
  deals.forEach((deal) => {
    deal.products.forEach((product) => {
      if (
        product.status === 'spiked' ||
        deal.status === 'spiked' ||
        product.soldOut ||
        deal.soldOut
      )
        products.push(product);
    });
  });
  return products;
};

/**
 * Get basket products
 */
export const getBasketProducts = (deals) => {
  let products = [];
  deals.map((deal) => {
    return deal.products.map((product) => {
      product.dealId = deal.id;
      product.closingDate = deal.closingDate;
      product.finalDealOrderAmount = deal.finalDealOrderAmount;
      return products.push(product);
    });
  });
  return products;
};

/**
 * Get total quantity of items in the basket.
 */
export const getTotalQuantityItems = (deals) => {
  if (!deals) return 0;
  let quantity = 0;
  deals.map((deal) => {
    quantity += deal.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  });
  return quantity;
};

export function isAtolProtected(deals) {
  for (let i = 0; i < deals.length; i++) {
    const deal = deals[i];
    if (deal.dealType === 'INTERNATIONAL_TRAVEL') {
      return true;
    }
  }
  return false;
}

export const addProfilingScript = (paymentDeviceProfile) => {
  if (!paymentDeviceProfile || !document) return;
  const { enabled, merchantId, orgId, sessionId } = paymentDeviceProfile;
  const SCRIPT_ID = 'profilingScript';
  const profilingScript = document && document.getElementById(SCRIPT_ID);
  if (enabled && !profilingScript) {
    let profileDomain = '';
    if (
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ||
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'nxt'
    ) {
      profileDomain = 'https://h.online-metrix.net';
    }
    const script = document.createElement('script');
    script.src = `${profileDomain}/fp/tags.js?org_id=${orgId}&session_id=${merchantId}${sessionId}`;
    script.id = SCRIPT_ID;
    document.body.appendChild(script);
  }
};
