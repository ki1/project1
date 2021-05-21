import dayjs from 'dayjs';
import { useMemo, useRef } from 'react';
import axios from '../components/_generic/axiosSplunk/axiosSplunk';
import useSWR from 'swr';
import useClientSideEffect from './useClientSideEffect';
import 'intersection-observer';
import {
  MAX_TEXT_DEAL_SIZE,
  URLSOCIALCUE,
  MAX_LIMITED_AVAILABILITY,
  ALMOST_GONE_CUE,
  IN_HIGH_DEMAND_CUE,
  SELLING_FAST_CUE,
  URLDEALIMPRESSION,
  URLUSERDEALDATA,
  SHOW_REVIEWS,
  MIN_REVIEW_AVERAGE,
  URLEVERGREEN,
} from '../config/setup/setup';
import { ORDER } from '../config/constants/common';
import { SHOW_PRICE_TYPES } from '../config/constants/deals';
import { trackEvent, pointContinuousTrackingData } from './analytics';
import { NOW, SAVE, LIMITED_AVAILABILITY, FREE } from '../config/text/text';
import { stripOrigin, parseWowcherPath } from './url';
import { getAppPlatform } from './device';
import httpCommonHeaders from './httpCommonHeaders';
import each from 'lodash/each';
import {
  DESKTOP_PAGE_SIZE,
  MAIN_DEALS_PREFIX_LINK,
} from '../config/links/links';

export const getDealsFeedUrl = ({
  dealId,
  slug = [],
  page = 0,
  pageSize = DESKTOP_PAGE_SIZE,
  offset = 0,
}) => {
  const params = new URLSearchParams();

  if (!page) {
    params.set('pageSize', pageSize + offset);
  } else {
    params.set('page', page);
    params.set('pageSize', DESKTOP_PAGE_SIZE);
    params.set('offset', offset);
  }

  const [leading, ...rest] = slug;
  const sliceIndex = rest.findIndex((item) => /^(\d+|e)$/.test(item));
  const categories = sliceIndex > -1 ? rest.slice(0, sliceIndex) : rest;
  const path = [
    MAIN_DEALS_PREFIX_LINK,
    'deal',
    leading === 'shop' ? 'national-deal' : leading,
    ...categories,
  ];
  if (dealId) {
    path.push(dealId);
  }

  return `${path.join('/')}?${params.toString()}`;
};

export const textOverflow = (text, maxsize = MAX_TEXT_DEAL_SIZE) => {
  if (!text) return '';
  if (text.length < maxsize) {
    return text;
  }
  return `${text.slice(0, text.lastIndexOf(' ', maxsize))}...`;
};

const getSocialCues = async (url) => {
  const response = await axios(url, {
    method: 'GET',
    headers: {
      webapp: true,
      brand: process.env.NEXT_PUBLIC_BRAND || 'wowcher',
      'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
      'app-platform': getAppPlatform(),
    },
  });

  if (response.data) {
    return response.data;
  } else {
    throw new Error(`No data received from ${url}`);
  }
};

export const useSocialCues = (dealId) => {
  const url = `${URLSOCIALCUE}/${dealId}`;
  const { data } = useSWR(url, getSocialCues, {
    initialData: {},
    dedupingInterval: 600000,
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });

  return data;
};

export const getLimitedAvailabilityOnly = (amount) => {
  if (amount < MAX_LIMITED_AVAILABILITY) return LIMITED_AVAILABILITY;
  return '';
};

export const angularGetMainDealLimitedAvailability = ({
  productsTotalRemaining = [],
  mainDealTotalRemaining,
  mainDealTotalBought,
}) => {
  let dealCueMessage = '';
  // ALMOST GONE
  each(productsTotalRemaining, (totalRemaining) => {
    if (totalRemaining > 0 && totalRemaining < 10) {
      dealCueMessage = `ALMOST GONE - only ${totalRemaining} remaining!`;
      return false;
    }
  });
  if (dealCueMessage !== '') return dealCueMessage;

  // LIMITED STOCK AVAILABLE
  each(productsTotalRemaining, (totalRemaining) => {
    if (totalRemaining < 50) {
      dealCueMessage = 'Limited Availability!';
      return false;
    }
  });

  if (dealCueMessage !== '') return dealCueMessage;

  // IN HIGH DEMAND
  if (mainDealTotalBought > 100 && mainDealTotalRemaining > 0) {
    dealCueMessage = 'IN HIGH DEMAND!';
  }
  if (dealCueMessage !== '') return dealCueMessage;

  // SELLING FAST
  if (mainDealTotalBought > 25 && mainDealTotalRemaining > 0) {
    dealCueMessage = 'Selling fast!';
  }

  if (dealCueMessage !== '') return dealCueMessage;

  return dealCueMessage;
};

export const getMainDealLimitedAvailability = ({
  productsTotalRemaining = [],
  mainDealTotalRemaining,
  mainDealTotalBought,
}) => {
  // If a main deal has multiple products
  if (Array.isArray(productsTotalRemaining) && productsTotalRemaining.length) {
    // The requirement here is to find (sub) product with the least number of remaining
    // In other words find the most "urgent" social cue
    const sortedTotalRemaining = productsTotalRemaining
      .filter((item) => item > 0)
      .sort((a, b) => a - b);

    for (const totalRemaining of sortedTotalRemaining) {
      if (totalRemaining < 10) {
        return ALMOST_GONE_CUE.replace('##TOTAL##', totalRemaining);
      } else if (totalRemaining < 50) {
        return LIMITED_AVAILABILITY;
      }
    }
  }

  // If a main deal is a single product and still available
  if (mainDealTotalRemaining > 0) {
    if (mainDealTotalBought > 100) {
      return IN_HIGH_DEMAND_CUE;
    } else if (mainDealTotalBought > 25) {
      return SELLING_FAST_CUE;
    }
  }

  return '';
};

export const getModalSocialCue = ({ selected, deal }) => {
  let productsTotalRemaining = deal.products?.map(
    ({ totalRemaining }) => totalRemaining
  );

  if (selected >= 0) {
    productsTotalRemaining = [deal.products[selected].totalRemaining];
  }

  let socialCueText = angularGetMainDealLimitedAvailability({
    productsTotalRemaining,
    mainDealTotalRemaining: deal.totalRemaining,
    mainDealTotalBought: deal.totalBought,
  });

  if (socialCueText === IN_HIGH_DEMAND_CUE) {
    socialCueText = socialCueText.replace(
      '!',
      ` - already ${deal.totalBought} sold!`
    );
  }

  return socialCueText;
};

export const getLimitedAvailability = (
  totalProductRemaining,
  qtyProductBought
) => {
  if (totalProductRemaining > 0 && totalProductRemaining < 10)
    return ALMOST_GONE_CUE.replace('##TOTAL##', totalProductRemaining);
  if (totalProductRemaining < MAX_LIMITED_AVAILABILITY)
    return LIMITED_AVAILABILITY;
  if (qtyProductBought > 100 && totalProductRemaining > 0)
    return IN_HIGH_DEMAND_CUE;
  if (qtyProductBought > 25 && totalProductRemaining > 0)
    return SELLING_FAST_CUE;
  return '';
};

export const showPrice = ({
  dealPrice,
  currency = 'gbp',
  forceDecimals = false,
  pricePerPerson = false,
}) => {
  if (dealPrice === 0) return FREE;
  if (!dealPrice) return '';
  let price = dealPrice.toString();
  if (forceDecimals) {
    if (price.match(/\./g)) {
      price = `${
        dealPrice.toString().split('.')[0]
      }<span class='price__cents'>.${(
        dealPrice.toString().split('.')[1] + '0'
      ).slice(0, 2)}</span>`;
    } else if (price.match(/,/g)) {
      price = `${price.split(',')[0]}<span class='price__cents'>,${(
        price.split(',')[1] + '0'
      ).slice(0, 2)}</span>`;
    }
  }
  if (pricePerPerson) {
    price += `<span class="price__pp">PP</span>`;
  }

  return `${currency.toLowerCase() === 'gbp' ? '£' : '€'}${price}`;
};

export const hidePrice = (text, ssr) => {
  if (!ssr || !text || !text.length) return text;
  if (/(£|€|%)+/.test(text)) return '';
  return text;
};

export const cutArray = (array, chunkSize) => {
  if (!array || !array.length) return [];
  if (chunkSize <= 0 || chunkSize >= array.length) return [array];
  return [].concat.apply(
    [],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
};

export const getPrice = ({ priceType, deal, forceDecimals = false }) => {
  const isMonetaryValue = [
    SHOW_PRICE_TYPES.showPrice,
    SHOW_PRICE_TYPES.showOriginalPrice,
  ].includes(priceType);

  if (isMonetaryValue) {
    const { price, currency, pricePerPerson } = deal;

    return showPrice({
      dealPrice: price,
      currency,
      forceDecimals,
      pricePerPerson,
    });
  } else {
    return `${deal.discountPercentage}%`;
  }
};

export const getText = ({ priceType, deal }) => {
  if (
    [SHOW_PRICE_TYPES.showPrice, SHOW_PRICE_TYPES.showOriginalPrice].includes(
      priceType
    )
  ) {
    if (deal.display?.priceText && deal.priceText) {
      return deal.priceText.toUpperCase();
    } else {
      return NOW;
    }
  }
  return SAVE;
};

export const showPriceType = (
  deal,
  showDiscount = false,
  forcePrice = false
) => {
  if (deal.display?.discount === false) {
    return SHOW_PRICE_TYPES.showPrice;
  }

  if (
    !showDiscount &&
    deal.price &&
    ((deal.display && deal.display.showPrice) || forcePrice)
  ) {
    if (
      deal.originalPrice &&
      deal.display &&
      deal.display.discount &&
      deal.originalPrice !== deal.price
    ) {
      return SHOW_PRICE_TYPES.showOriginalPrice;
    }
    return SHOW_PRICE_TYPES.showPrice;
  }
  if (deal.priceIndicative && deal.discountPercentage)
    return SHOW_PRICE_TYPES.showDiscountIndicative;

  if (deal.discountPercentage && deal.discountPercentage > 0)
    return SHOW_PRICE_TYPES.showDiscount;

  if (deal.originalPrice?.length && deal.originalPrice !== deal.price)
    return SHOW_PRICE_TYPES.showOriginalPrice;
  return SHOW_PRICE_TYPES.showPrice;
};

export const isPrice = ({ deal, showDiscount = false, forcePrice = false }) => {
  const priceType = showPriceType(deal, showDiscount, forcePrice);
  return (
    priceType === SHOW_PRICE_TYPES.showPrice ||
    priceType === SHOW_PRICE_TYPES.showOriginalPrice
  );
};

export const showPostage = (deal, forceDiscount, forcePrice) => {
  if (!deal) {
    return false;
  }
  return (
    deal.deliveryType !== 'none' &&
    isPrice({ deal, forceDiscount, forcePrice }) &&
    !!deal.minPostagePrice
  );
};

/** Get the product cap for a specific product inside a deal */
export const getProductPurchaseCap = (deal, index = 0) => {
  if (!deal || !deal.products || !deal.products[index]) {
    return 0;
  }
  const product = deal.products[index];
  return (
    product.maxQuantityUserCanCurrentlyBuy ||
    Math.min(product.totalRemaining, product.purchaseCap)
  );
};

const getIsExpressBuyForUser = async (url) => {
  const response = await axios(url, {
    method: 'GET',
    withCredentials: true,
    headers: httpCommonHeaders(),
  });

  return response?.data?.data?.isExpressBuyable ?? false;
};

export const useIsExpressBuy = (dealId, isAuthenticated) => {
  const url = `${URLUSERDEALDATA}/${dealId}`;
  const { data: allowExpressBuy } = useSWR(
    isAuthenticated ? url : null,
    getIsExpressBuyForUser,
    {
      initialData: false,
    }
  );

  return isAuthenticated && allowExpressBuy;
};

//** If deal has multiple products (we show a popup) */
export const getIsChooseYourProductDeal = (deal) => {
  if (!deal || !deal.products) {
    return false;
  }
  return deal.products.length > 1 && deal.productDisplay.type === 'default';
};

//** If deal has multiple options -- ie dropdown display mode (we show a popup) */
export const getIsChooseYourOptionsDeal = (deal) => {
  if (!deal || !deal.products || !deal.productDisplay) {
    return false;
  }
  return deal.products.length > 1 && deal.productDisplay.type === 'dropdown';
};

//** If deal has choose availability (we show a popup) */
export const getIsViewAvailabilityDeal = (deal) => {
  if (!deal || !deal.productDisplay) {
    return false;
  }
  return deal.productDisplay.type === 'calendar';
};

export const getIsLeadGen = (deal) => {
  if (!deal) {
    return false;
  }

  return !!deal.leadGen;
};

/** how many thumbs to show on the main deal */
export function getMainDealThumbCountFromBreakpoint(breakpoint) {
  switch (breakpoint) {
    case 'sm':
      return 4;
    case 'md':
    case 'lg':
      return 5;
    case 'xl':
      return 6;
    default:
      return 6;
  }
}

export function getIsLocalDeal(deal) {
  return deal.category && deal.category.canonicalPathType !== 'national';
}

export function getIsPaypalFeatured(deal) {
  if (!deal || !deal.products) {
    return false;
  }

  return deal.products.filter((product) => product.totalPrice >= 99).length > 0;
}

export function getUrlFromDeal({ deal = {}, originPath }) {
  const { urlPrefix, id, urlPath, shareUrl, evergreenUrl } = deal;
  const { pathArray } = parseWowcherPath(originPath);
  const [leading, ...rest] = pathArray;
  let path;

  if (evergreenUrl) {
    path = stripOrigin(evergreenUrl);
  } else if (leading === 'deal') {
    // find dealId or the letter e (evergreen) in slug
    const sliceIndex = pathArray.findIndex((item) => /^(\d+|e)$/.test(item));

    if (sliceIndex !== -1) {
      path = '/' + [...pathArray.slice(0, sliceIndex), id].join('/');

      // add urlPrefix (which is actually a suffix), if defined
      if ((urlPrefix || '').length) path += urlPrefix;
    }
  } else if (leading === 'deals') {
    path = '/' + ['deal', ...rest, id].join('/');

    if ((urlPrefix || '').length) path += urlPrefix;
  }

  // If path is not defined by this time, then just some fallback path
  if (!path) {
    path = urlPath || shareUrl || '/';
  }

  return path;
}

export function addressToPinData(name, address) {
  return {
    lat: address.latLon ? address.latLon.lat : 51.505,
    lon: address.latLon ? address.latLon.lon : -0.0901,
    title: name || 'Location',
    body: address ? (
      <div>
        {address.addressLine1 && <p>{address.addressLine1}</p>}
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        {address.town && <p>{address.town}</p>}
        {address.postCode && <p>{address.postCode}</p>}
      </div>
    ) : null,
  };
}

function getBundlePins(deal) {
  const out = [];
  deal.bundle.children.forEach((child) => {
    child.locations.forEach((loc) => {
      out.push(addressToPinData(child.businessName, loc));
    });
  });
  return out;
}

function getNonBundlePins(deal) {
  if (!deal || !deal.business) {
    return [];
  }

  if (deal.business.otherAddresses && deal.business.otherAddresses.length > 0) {
    return deal.business.otherAddresses.map((address) => {
      return addressToPinData(deal.business.name, address);
    });
  }

  if (deal.business.mainAddress) {
    return [addressToPinData(deal.business.name, deal.business.mainAddress)];
  }

  return [];
}

export function getPins(deal) {
  if (!deal || (deal && deal.redeemLocationUrl)) {
    return [];
  }

  // bundle deals work slighty differently
  if (deal.bundle) {
    return getBundlePins(deal);
  } else {
    return getNonBundlePins(deal);
  }
}

export function usePins(deal) {
  return useMemo(() => getPins(deal), [deal]);
}

export function getShowReviews(deal) {
  return (
    SHOW_REVIEWS[process.env.NEXT_PUBLIC_SITE || 'wowcher'] &&
    deal &&
    deal.reviewSummary &&
    deal.reviews &&
    deal.reviews.length > 0 &&
    deal.reviewSummary.average >= MIN_REVIEW_AVERAGE
  );
}

/** Does the source allow for a deal to be bought in the grace period (ie. passed closed date but deal.open) */
export function sourceAllowsGracePeriodPurchase(query) {
  if (!query) {
    return false;
  }

  const allowList = ['search', 'recentlyViewed', 'recommended'];

  return (
    query.st_cid !== undefined ||
    (query.usr_src && query.usr_src.startsWith('sponsored_search_')) ||
    allowList.includes(query.usr_src)
  );
}

export function getIsOpen(deal, query) {
  // 1. non-open deals are closed.
  if (!deal || !deal.open) {
    return false;
  }

  // 2. if deal is open but after the close date: check if deal allows grace period
  // and if so check that the user has come from a permissable source (e.g email/search)
  if (dayjs() > dayjs(deal.closingDate).endOf('day')) {
    return (
      deal.display &&
      deal.display.lastChance &&
      sourceAllowsGracePeriodPurchase(query)
    );
  }

  // 3. The deal is open.
  return true;
}

const getSingleCompanyVatInfo = (deal) => {
  const displayName =
    deal && deal.business
      ? deal.business.displayName || deal.business.name || null
      : null;
  let vatNumber =
    deal.products && deal.products[0] && deal.products[0].merchant
      ? deal.products[0].merchant.vatNumber
      : null;

  if (!vatNumber) {
    vatNumber =
      deal.products &&
      deal.products.merchant &&
      deal.products.merchant.vatNumber
        ? deal.products.merchant.vatNumber
        : null;
  }

  return { displayName, vatNumber };
};

export const getVatInfo = (deal) => {
  if (!deal) {
    return [];
  }

  if (!deal.bundle || !deal.bundle.children || !deal.bundle.children.length) {
    return [getSingleCompanyVatInfo(deal)];
  }

  return deal.bundle.children.map((item) => {
    return {
      displayName: item.businessName || item.name || '',
      vatNumber: item.vatNumber || null,
    };
  });
};

export const getEvergreenPageInfo = async ({
  location,
  category,
  subCategory,
  dealName,
}) => {
  const { data } = await axios({
    method: 'GET',
    url: `${URLEVERGREEN}/${location}/${category}/${subCategory}/${dealName}`,
    params: {
      brand: process.env.NEXT_PUBLIC_BRAND,
    },
  });

  return data;
};

export const isClosedDeal = (deal, query) => {
  const currentDate = new Date();
  const closingDate = new Date(deal.closingDate);
  var timeDifference = currentDate.getTime() - closingDate.getTime();
  var dayDifference = timeDifference / (1000 * 3600 * 24);

  const isEnableBuyClosedDeal =
    deal.enableBuyClosedDeal && dayDifference > 0 && dayDifference <= 4;

  if (currentDate > closingDate && deal.display?.lastChance) {
    const canBuyClosedDeal =
      query.usr_src?.startsWith('sponsored_search_') ||
      ['search', 'recommended', 'recentlyViewed'].includes(query.usr_src) ||
      query.st_cid;
    return !canBuyClosedDeal;
  }

  return deal.soldOut || !deal.open || isEnableBuyClosedDeal;
};

export function sendDealImpressions(impressions, userLocation) {
  if (!userLocation) {
    throw new Error('Deal impressions: undefined or missing location data');
  }
  try {
    const data = Array.from(impressions);

    trackEvent('send_deal_impressions', data);

    // controlled by third party scrips which reads the data set here
    // third party scripts clears the batch
    // this is being used because of race conditions and how the batch is being cleared and we dont when they call this.
    pointContinuousTrackingData('copyDealImpressions', data);

    // Note: these calls are "best effort", we're not waiting for response
    axios({
      method: 'POST',
      url: URLDEALIMPRESSION.replace('##LOCATION##', userLocation),
      headers: httpCommonHeaders(),
      data,
    });
    impressions.clear();
  } catch (err) {
    console.error(err);
  }
}

/* eslint-disable sonarjs/cognitive-complexity */
export function GenerateUseDealImpresssion() {
  const impressions = new Set();
  const batchRequest = 50;
  // data accessible on the window object for the Marketing Team in DTM by typing
  // `window.continuousTrackingData.dealImpressions;`
  pointContinuousTrackingData('dealImpressions', impressions);

  let userLocation;

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      sendDealImpressions(impressions, userLocation || 'national');
    });
  }

  return ({ dealId, componentRef, location }) => {
    const observerRef = useRef();

    if (!userLocation) userLocation = location;

    useClientSideEffect(() => {
      if (!componentRef.current) {
        return;
      }

      const observer = new IntersectionObserver(
        (observerEntry) => {
          if (observerEntry[0].isIntersecting) {
            impressions.add(dealId);
            if (impressions.size >= batchRequest)
              sendDealImpressions(impressions, userLocation);
          }
        },
        {
          root: null,
          threshold: 1.0,
        }
      );

      observer.observe(componentRef.current);

      return () => observer.disconnect();
    }, [observerRef]);
  };
}

export const useDealImpresssion = new GenerateUseDealImpresssion();

export const getSocialCueOrder = ({ id, deals = [] }) => {
  const dealsWithAlt = deals.map((deal, index) => ({
    ...deal,
    order: index % 2 ? ORDER.even : ORDER.odd,
  }));

  return dealsWithAlt.find((item) => item.id === id);
};
