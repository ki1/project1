import { DEFAULT_SUGGGEST_API, LINK_MAIN_HOME } from '../links/links';

export const BRAND_WOWCHER = 'wowcher';
export const BRAND_LIVINGSOCIAL = 'living-social';

export const SITE_LIVINGSOCIAL_IE = 'livingsocialie';

/* CURRENT URLs
Development  https://react-node05.devwowcher.co.uk/
Staging      https://react-node01.nxtwowcher.co.uk/
Production   https://react-node.wowcher.co.uk/
*/

export const URLSTATICSUFFIX = '.html';
export const URLSTATIC = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/staticpage`;
export const URLLOCATIONS = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/location`;
export const SUGGESTEDSEARCHURL =
  DEFAULT_SUGGGEST_API[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
    process.env.NEXT_PUBLIC_SITE || 'livingsocialie'
  ];
export const SEARCHURL = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/search`;
export const URLUSER = `${process.env.NEXT_PUBLIC_LEGACY_API}/user`;
export const URLUSERSTATUS = `${process.env.NEXT_PUBLIC_LEGACY_API}/user/account-status`;
export const URLLOGIN = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/login?_spring_security_remember_me=true`;
export const URLLOGOUT = `${process.env.NEXT_PUBLIC_LEGACY_API}/logout`;
export const URLREGISTR = `${process.env.NEXT_PUBLIC_LEGACY_API}/register`;
export const URLFBLOGIN = `${process.env.NEXT_PUBLIC_LEGACY_API}/facebook/authenticate`;
export const URLGOOGLELOGIN = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/logingoogle`;
export const URLGOOGLEREGISTR = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/registergoogleuser`;

export const URLBASKET = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/basket`;
export const URLBASKETABANDON = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/basketabandon`;
export const URLSUBSCRIBE = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/email`;
export const URLNOTIFYME = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/deal/sold-out-notification`;
export const URLEMAILSUBSCRIBE = `${process.env.NEXT_PUBLIC_LEGACY_API}/email-subscribe`;
export const URLEVERGREEN = `${process.env.NEXT_PUBLIC_EVERGREEN_API}/evergreen-deal-api/v1/evergreen-deals`;
export const URLNAVIGATION = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/navigation`;
export const URLDEAL = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/deal`;
export const URLCHECKOUT = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/checkout`;
export const URLSOCIALCUE = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/socialcue/deal`;
export const URLUSERDEALDATA = `${process.env.NEXT_PUBLIC_LEGACY_API}/payment/view`;
export const URLVALIDATEVOUCHER = `${process.env.NEXT_PUBLIC_LEGACY_API}/voucher`;
export const URLDEALIMPRESSION = `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/deal/##LOCATION##/impressions`;
export const URLBOOKING = `${process.env.NEXT_PUBLIC_LEGACY_API}/booking`;
export const URLTILES = `${process.env.NEXT_PUBLIC_TILES_API}`;

// Registration
export const FINDADDRESS = `${process.env.NEXT_PUBLIC_LEGACY_API}/address/postcode/##POSTCODE##`;
// To make it work on localhost, we can pass the apiKey
// export const SELECTADDRESS = `${process.env.NEXT_PUBLIC_LEGACY_API}/address/moniker/##MONIKER##?apiKey=cf522cfec2a4d56d569e60a152040000`;
export const SELECTADDRESS = `${process.env.NEXT_PUBLIC_LEGACY_API}/address/moniker/##MONIKER##`;

// Gift
export const URLVALIDATEGIFTCODE = `${process.env.NEXT_PUBLIC_LEGACY_API}/deal/gift-redeem`;

// GIFT CARD
export const URLREDEEMGIFTCARDCODE = `${process.env.NEXT_PUBLIC_LEGACY_API}/gift-card/redeem`;

// WALLET
export const URLWALLET = `${process.env.NEXT_PUBLIC_LEGACY_API}/user/wallet`;

// REQUEST PASSWORD RESET
export const REQUESTPASSWORDRESET = (email) =>
  `${process.env.NEXT_PUBLIC_LEGACY_API}/user/${email}/password_reset_request`;

// PASSWORD RESET
export const URLRESETPASSWORD = (requestId) =>
  `${process.env.NEXT_PUBLIC_LEGACY_API}/user/password_reset?_xx_=${requestId}`;

// User Recommendation
export const URLGETRECOMMENDATION = (userId) =>
  `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/deal/${userId}/recommendations`;

// deal event service
export const URLEVENTDEAL = (location, eventName) =>
  `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/deal/${location}/special/${eventName}`;
export const EVENT_NAME_NEW_PRODUCTS = 'new-products';

// live deal service
export const URLLIVEDEAL = (ids) =>
  `${process.env.NEXT_PUBLIC_PUBLIC_API}/v1/deal/live${ids}`;

//Cookie expiry length
export const COOKIE_EXPIRY_365 = 365;

// COUNTDOWN TIMER
// Show/hide the Countdown timer by brand
export const COUNTDOWN_BRAND = {
  wowcher: true,
  livingsocial: true,
  livingsocialie: true,
};

// Default locations
export const DEFAULT_LOCATION = {
  wowcher: {
    latLon: {
      lon: -0.1166670024394989,
      lat: 51.5,
    },
    countryCode: 'gb',
    name: 'London',
    id: 275850,
    shortName: 'london',
    _score: NaN,
    brand: 'wowcher',
  },
  livingsocial: {
    latLon: {
      lon: -0.1166670024394989,
      lat: 51.5,
    },
    countryCode: 'gb',
    name: 'London',
    id: 275850,
    shortName: 'london',
    _score: NaN,
    brand: 'livingsocial',
  },
  livingsocialie: {
    latLon: {
      lon: -6.2603097,
      lat: 53.349804,
    },
    countryCode: 'ie',
    name: 'Dublin South',
    id: 276602,
    shortName: 'dublin-south',
    _score: NaN,
    brand: 'livingsocial',
  },
};

export const SPLUNK_TOKEN = {
  dev: '14e6fcee-7c05-4f29-b02a-2f86ceb27728',
  nxt: '14e6fcee-7c05-4f29-b02a-2f86ceb27728',
  prod: '57c95d85-09e3-4fa9-9ddd-3c1fe5241fd2',
};

export const SITE_NAME = {
  wowcher: 'Wowcher',
  livingsocial: 'LivingSocial',
  livingsocialie: 'LivingSocial',
};

export const DIDOMI_KEY = '7f13ffa6-3aca-47e3-9a52-4f534c5507f0';

export const SUBSCRIPTION_SOURCE =
  'wowcher_email_cordial_national_special_04082020_2020-08-04';

// Filters values
export const READ_FILTERS_FROM_URL_PARAMETERS = false; // if true the filter can read the parameters from the URL
export const FILTER_LOCATION = 'location';
export const FILTER_SUBCATEGORY = 'subcategory';
export const FILTER_CATEGORY = 'category';
export const FILTER_SORTBY = 'sortBy';
export const FILTER_MINPRICE = 'minPrice';
export const FILTER_MAXPRICE = 'maxPrice';

// possible values: POPULARITY, DATE, PRICE, POSITION, DISCOUNTPERCENTAGE, RECENTLYADDED, DISTANCE
export const filterPopularity = [
  {
    name: 'Popularity',
    value: 'popularity',
  },
  {
    name: 'Price high to low',
    value: 'price',
  },
  /*
  {
    name: 'Date',
    value: 'date',
  },
  */
  {
    name: 'Discount %',
    value: 'discountPercentage',
  },
  {
    name: 'Recently Added',
    value: 'recentlyAdded',
  },
  {
    name: 'Price low to high',
    value: 'pricelow',
  },
];
export const filterPrice = [
  {
    name: '0',
    value: '0',
  },
  {
    name: '5',
    value: '5',
  },
  {
    name: '10',
    value: '10',
  },
  {
    name: '15',
    value: '15',
  },
  {
    name: '20',
    value: '20',
  },
  {
    name: '30',
    value: '30',
  },
  {
    name: '40',
    value: '40',
  },
  {
    name: '50',
    value: '50',
  },
  {
    name: '75',
    value: '75',
  },
  {
    name: '100',
    value: '100',
  },
  {
    name: '200',
    value: '200',
  },
  {
    name: '500',
    value: '500',
  },
  {
    name: '1000',
    value: '1000',
  },
];

export const filterRating = [
  {
    name: 'Rating',
    value: '0',
  },
];
export const filterNew = [
  {
    name: 'New',
    value: '0',
  },
];

export const GIFTING_OPTIONS = {
  NONE: 'none',
  GIFT: 'gift', // ls only: this sets product.gift = true only.
  E_GIFT: 'e-gift', // NON-DELIVERABLE wowcher only: does not exist on ls
  GIFT_PACK: 'gift-pack', // NON-DELIVERABLE wowcher only: does not exist on ls
  WRAPPED: 'wrapped', // DELIVERABLE wowcher only: does not exist on ls
};
export const GIFTING_OPTIONS_DISPLAY = {
  none: 'None',
  gift: 'Gift',
  'e-gift': 'Send As E-Gift',
  'gift-pack': 'Add Gift-Pack',
  wrapped: 'Send Gift Wrapped',
};

// Deals
export const MAX_TITLE_DEAL_SIZE = 65;
export const MAX_TEXT_DEAL_SIZE = 195;
export const MAX_TEXT_DEAL_MEDIUM_SIZE = 70;
export const MAX_TITLE_DEAL_CAT_MAIN_SIZE = 45;
export const MAX_SUBTITLE_DEAL_CAT_MAIN_SIZE = 120;
export const MAX_LIMITED_AVAILABILITY = 50;
export const MAX_CATEGORY_DEALS_BLOCK = 9;
export const MAX_SECONDARY_DEALS_BLOCK = 3;
export const MAX_SECONDARY_SMALL_DEALS_BLOCK = 2;
export const MAX_MEDIUM_DEALS_PER_ROW = 3;
export const SHOW_CARROUSEL_ARROWS = true; // show arrows in the carrousel component
export const ALMOST_GONE_CUE = 'ALMOST GONE - only ##TOTAL## remaining!';
export const IN_HIGH_DEMAND_CUE = 'IN HIGH DEMAND!';
export const SELLING_FAST_CUE = 'Selling fast!';
export const REMAINING_TEXT = 'remaining';
export const BOUGHT_TEXT = 'bought';
export const REVIEWS_TO_SHOW = 3;
export const MIN_REVIEW_AVERAGE = 3.5;
export const SHOW_REVIEWS = {
  wowcher: false,
  livingsocial: false,
  livingsocialie: false,
};

export const STATIC_SERVER = 'static';
export const IMAGES_SERVER = 'images';
export const DEFAULT_DEAL_IMG_WIDTH = '777';
export const DEFAULT_DEAL_IMG_HEIGHT = '520';
export const DEFAULT_DEAL_IMG_WIDTH_MOBILE = '375';
export const DEFAULT_DEAL_IMG_HEIGHT_MOBILE = '250';
export const DEFAULT_DEAL_IMG_WIDTH_THUMB = '64';
export const DEFAULT_DEAL_IMG_HEIGHT_THUMB = '43';

export const IMAGES_DEAL_URL = {
  dev: {
    wowcher: 'https://images05.devwowcher.co.uk',
    livingsocial: 'https://images05.devlivingsocial.co.uk',
    livingsocialie: 'https://images05.devlivingsocialie.net',
  },
  nxt: {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    wowcher: 'https://images01.nxtwowcher.co.uk',
    livingsocial: 'https://images01.nxtwowcher.co.uk',
    livingsocialie: 'https://images01.nxtwowcher.co.uk',
  },
  prod: {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    wowcher: 'https://images.wowcher.co.uk',
    livingsocial: 'https://images.wowcher.co.uk',
    livingsocialie: 'https://images.wowcher.co.uk',
  },
};
export const USER_STATUS_MAPPING = {
  a: 'hasAddress',
  d: 'DED',
  f: 'isFacebook',
  fo: 'FBO',
  r: 'isRegistered',
  s: 'isSubscribed',
  l: 'isLocked',
};

// Splunk
export const SPLUNK_ACTIVATED = true; // Send info to the Splunk Server true/false
export const SPLUNK_SENT_WINDOW_INFORMATION = true; // Send extra info from the client request

// Meta Data
export const TITLE_DEALS_LOCATION = '##CATEGORY## - ##LOCATION## - ';
export const TITLE_DEALS_NO_LOCATION = '##CATEGORY## - ';
export const TITLE_DEALS_NO_CATEGORY =
  '##LOCATION## Deals - Up to 80% off Vouchers & Offers - ';
export const TITLE_DEALS_NO_CATEGORY_NOLOCATION =
  'Shop - Online Deals & Vouchers of up to 80% off - ';

export const META_DESCRIPTION = {
  default:
    'Huge discounts on the latest and greatest products. Shop now and save up to 80% on hundreds of amazing deals.',
  'gift-finder': {
    'national-deal':
      "Save up to 80% on the latest and greatest gifts in shopping. We've got perfumes, toys, jewellery and loads more.",
    travel: `Save up to 80% on the latest and greatest gifts in ##TRAVELESCAPE## and shopping. We've got spa breaks, city breaks, toys, jewellery and loads more.`,
    default:
      "Save up to 80% on the latest and greatest gifts in ##LOCATION## and shopping. We've got massages, afternoon tea, toys, jewellery and loads more.",
  },
  local: {
    travel: `Save up to 80% on ##TRAVELESCAPE## deals – From short breaks in the UK and relaxing spa breaks to beach holidays and long haul adventures, ##BRAND## has hundreds of cheap ##TRAVELESCAPE## deals.`,
    default: `Save up to 80% on deals in ##LOCATION## – From restaurants and beauty to entertainment and fitness, ##BRAND## has hundreds of deals in your area.`,
    activity: `Looking for something fun to do in ##LOCATION##? From paintballing to bungee jumping and supercars to bubble football, you're sure to find an adrenaline fueled activity on ##BRAND##. Save up to 80%.`,
    adult:
      "For adult eyes only! Browse adult products and naughty things to do in ##LOCATION##. Save up to 80%. Sex toys, enhancers and adult themed shows - don't miss out!",
    beauty: `Time for a pamper? You'll find the latest and greatest ##LOCATION## beauty treatments on ##BRAND## . From haircuts to facials, we're always looking out for the next thing that'll make us feel fabulous.`,
    entertainment: `Concerts, Sporting events, Tarot Reading, Cinemas and more. Whether you're trying to impress someone or planning a weekend with friends, check out ##BRAND## for great events in ##LOCATION##. Save up to 80%.`,
    'health-fitness':
      "Find the best health and fitness deals that ##LOCATION## has to offer. If gym passes and bootcamps don't do it for you, shop our amazing fitness products. Save up to 80%.",
    kids:
      "From toys and games to learning aids, we're sure to have something to keep the little ones occupied. Keep an eye out for exciting things for the kids to do in ##LOCATION##. Save up to 80%.",
    learning:
      "We're always looking for that next thing to add to our CV. From interior design to Excel training, we've got a wide range of vocational and recreational online and ##LOCATION## classroom based courses. Save up to 80%.",
    'food-drink':
      "Save up to 80% on the best restaurants in ##LOCATION##. From fine dining to quick eats, we've got an ever-changing range of amazing food and drink deals for you. Bon appetit.",
  },
  shop: {
    default:
      'Huge discounts on the latest and greatest products. Shop now and save up to 80% on hundreds of amazing deals.',
    'home-garden':
      "Home sweet home! Save up to 80% on furniture, art, bedding, mattresses, garden accessories and more. We've got hundreds of deals to help you get the home of your dreams.",
    'fashion-jewellery':
      "Save up to 80% on the latest fashion trends. Jewellery, watches, fashion and accessories - we've got hundreds of products to make you look fabulous. Happy shopping!",
    electricals:
      'Save up to 80% on cheap electronics and accessories. Computers, laptops, android tablets, in-car accessories and more.',
    'home-essentials':
      'Save up to 80% on household essentials. Toilet rolls, toothbrush heads, dish-washing tablets and more.',
  },
  travel: {
    default: `Save up to 80% on ##TRAVELESCAPE## deals – From short breaks in the UK and relaxing spa breaks to beach holidays and long haul adventures, ##BRAND## has hundreds of cheap ##TRAVELESCAPE##  deals.`,
    'uk-city-breaks':
      "Enjoy a weekend away in the UK. From a relaxing countryside break to the hustle and bustle of the city, there's plenty to choose from. Save up to 50%.",
    'city-breaks':
      "Enjoy a weekend away in a choice of amazing European cities. Including flights, hotel only or all-inclusive, there's a deal here for you. Save up to 50%.",
    romantic:
      "Treat a loved one to a romantic break and save up to 50%. With deals for 2 people, including flights and accommodation, there's a hassle-free weekend away waiting for you!",
    'spa-and-health': `Relax, pamper yourself and save up to 50% while you're doing it. UK and European spa breaks starting from just ##CURRENCY##59. Ahhhh.`,
    beach: `Feel sand between your toes with a ##BRAND##  beach break. Short-haul including flights, and offers for further afield. Book your summer holiday now.`,
    adventure: `Looking for something a bit different from your holiday? Tours, animals, adventures and the magical Disneyland are but a few options from ##BRAND## . Book now and save up to 50%.`,
    'sports-and-activities': `Get-up-and-go holidays from ##BRAND## . Save up to 50% on a holiday you won't forget. Sailing, Skiing, Hiking and Kayaking and just a few ideas to get you started.`,
    'last-minute': `Need a break now? Last minute breaks from ##BRAND##  have discounts of up to 50% for stays starting this weekend! Book now.`,
    family:
      "Holiday fun for all the family! Whether it's Disneyland or a beach holiday, we've got something that'll keep you all entertained. Save up to 50%.",
  },
  'special-event': {
    default: `Save up to 80% on ##EVENTNAME## deals in ##LOCATION##. From restaurants and beauty to entertainment and fitness, ##BRAND##  has hundreds of deals in your area.`,
  },
};

export const WEBAPP_MOBILE = 'WEBAPP-MOBILE';
export const WEBAPP_TABLET = 'WEBAPP-TABLET';
export const WEBAPP_DESKTOP = 'WEBAPP-DESKTOP';

// Page cache
export const PAGE_CACHE_AGE_SEC = 1200;

// Axios setup
export const AXIOS_RESPONSE_TIMEOUT = 20000;
export const AXIOS_CONNECT_TIMEOUT = 20000;

// Time before return 404 when main deal doesnt exist
export const TIMEOUT_CHECK_404 = 500;

// Pagination
export const ALLOW_SSR_PAGINATION = true; // Allow XXX?page=XXX URLs on deals

// Login and registration setup
export const POST_CODE_MAX_LENGTH = 8;
export const PASSWORD_MIN_LENGTH = 6;

export const HEADER_LOGO_MAX = 768;

export const SHOW_LIGHTBOX = {
  wowcher: true,
  livingsocial: false,
  livingsocialie: false,
};

//claim credit update status
export const CLAIM_CREDIT_UPDATE_STATUS = 'ON_DEMAND_REFUND';

// Cookies expires time
export const COOKIE_SUBSCRIBED_EXPIRES = 365;
export const COOKIES_EXPIRES_HALF_YEAR = 182;
export const COOKIES_EXPIRES_WEEK = 7;
export const COOKIES_EXPIRES_DAY = 1;

// Deals
export const NUMBER_OF_SECONDARY_DEALS_ON_CATEGORY = 2; // number of deals next to the main deal on the category page
export const NUMBER_OF_SECONDARY_DEALS_ON_DEAL = 5; // number of deals next to the main deal on the deal page
export const NUMBER_OF_RECENTLY_VIEWED_DEALS = 4; // max number of recent deals
export const RECENT_DEALS_LOCAL_STORE = `angular${
  process.env.NEXT_PUBLIC_BRAND === BRAND_WOWCHER ? 'WOWCHER' : 'LS'
}.recentDealsLocalStore`; // recent deals storage key
export const CUSTOMER_DEFAULT_TOKEN = 'th1515adumMyt0k3n'; // recent deals storage key
export const KEY_RECOMMENDED_DEALS = 'recommendedDeals';
export const KEY_NEW_PRODUCT_DEALS = 'newProductDeals';
export const KEY_RECENTLY_VIEWED_DEALS = 'recentlyViewedDeals';
export const DEALS_PROMO_TYPES = (newProdLink = '') => {
  return {
    recentlyViewed: {
      title: 'Recently Viewed',
      link: `${LINK_MAIN_HOME}/recently-viewed`,
      linkName: 'View all',
    },
    recommended: {
      title: 'Recommended for you',
      link: `${LINK_MAIN_HOME}/recommended-for-you`,
      linkName: 'View all',
    },
    newProducts: {
      title: 'New Products',
      link: `${LINK_MAIN_HOME}${newProdLink}`,
      linkName: 'View all',
    },
  };
};
export const SEO_LOCATION_TEXT =
  'Save on ##LOCATION## attractions, restaurants and spa days with hundreds of deals on ##SITE_NAME##. We’ve got discounts on everything from day trips and experience days to afternoon teas and nights out in ##LOCATION## for you to browse!';

// Logos
export const MAX_LOGOS_IN_LIST = 3;
export const MAX_LOGOS_PERCENTAGE = 100;

// Choose your options
export const CHOOSE_YOUR_OPTIONS_COMPONENT = 'ChooseYourOptions';
export const REVIEWS_COMPONENT = 'reviewsComponent';

// Payment
export const PAYMENT_ELEMENT_NAME = 'payment-component-element';
export const PAYMENT_TOP_CTA_ID = 'top-cta-button';

// BRAND_HYPHEN_DOMAIN used in some API calls as 'brand' (in data not header)
export const BRAND_HYPHEN_DOMAIN = {
  wowcher: process.env.NEXT_PUBLIC_BRAND,
  livingsocial: process.env.NEXT_PUBLIC_BRAND,
  livingsocialie: `${process.env.NEXT_PUBLIC_BRAND}-ie`,
};
