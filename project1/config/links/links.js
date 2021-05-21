/* eslint-disable sonarjs/no-duplicate-string */
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod';
const BRAND_WOW = process.env.NEXT_PUBLIC_SITE || 'wowcher';
const BRAND_LSUK = process.env.NEXT_PUBLIC_SITE || 'livingsocial';
const BRAND_LSIE = process.env.NEXT_PUBLIC_SITE || 'livingsocialie';

// REDIRECT TO ANGULAR URLS false : true
const USE_ANGULAR_URL_CHECKOUT = true; // Redirect to Angular site basket icon
const USE_ANGULAR_URL_BUY_BUTTON = false; // Redirect to Angular Buy/Gift Buttons

export const NUMBER_OF_DEALS = 9; // We show 9 deals per page so let's make the request based on this number

export const DEFAULT_PUBLIC_API = 'https://public-api.wowcher.co.uk';
export const DEFAULT_PUBLIC_API_TEST = 'https://public-api05.devwowcher.co.uk';

export const LOGIN_URL = 'login';
export const REGISTER_URL = 'register';

export const DEFAULT_SUGGGEST_API = {
  dev: {
    wowcher: 'https://suggest-05.devwowcher.co.uk/suggestwow',
    livingsocial: 'https://suggest-05.devlivingsocial.co.uk/suggestlsuk',
    livingsocialie: 'https://suggest-05.devlivingsocialie.net/suggestlsie',
  },
  nxt: {
    wowcher: 'https://suggest-01.nxtwowcher.co.uk/suggestwow',
    livingsocial: 'https://suggest-01.nxtlivingsocial.co.uk/suggestlsuk',
    livingsocialie: 'https://suggest-01.nxtlivingsocialie.net/suggestlsie',
  },
  prod: {
    wowcher: 'https://suggest.wowcher.co.uk/suggestwow',
    livingsocial: 'https://suggest.livingsocial.co.uk/suggestlsuk',
    livingsocialie: 'https://suggest.livingsocial.ie/suggestlsie',
  },
};

export const LINKS_GLOBAL_WOWCHER = {
  dev: {
    wowcher: 'https://www05.devwowcher.co.uk',
    livingsocial: 'https://www05.devlivingsocial.co.uk',
    livingsocialie: 'https://www05.devlivingsocialie.net',
  },
  nxt: {
    wowcher: 'https://www01.nxtwowcher.co.uk',
    livingsocial: 'https://www01.nxtlivingsocial.co.uk',
    livingsocialie: 'https://www01.nxtlivingsocialie.net',
  },
  prod: {
    wowcher: 'https://www.wowcher.co.uk',
    livingsocial: 'https://www.livingsocial.co.uk',
    livingsocialie: 'https://www.livingsocial.ie',
  },
};

export const CORDIAL_TRACK_URLS = {
  wowcher: {
    trackUrl: 'https://se.email.wowcher.co.uk',
    connectUrl: 'https://d.email.wowcher.co.uk',
  },
  livingsocial: {
    trackUrl: 'https://se.email.livingsocial.co.uk',
    connectUrl: 'https://d.email.livingsocial.co.uk',
  },
  livingsocialie: {
    trackUrl: 'https://se.email.livingsocial.ie',
    connectUrl: 'https://d.email.livingsocial.ie',
  },
};

const SPLUNK_BASE_URL_DEV =
  'https://internal-splunk-dev.wowcher.co.uk/services/collector/event';
const SPLUNK_BASE_URL_PROD =
  'https://internal-splunk.wowcher.co.uk/services/collector/raw';

export const LINKS_GLOBAL_SPLUNK = {
  dev: SPLUNK_BASE_URL_DEV,
  nxt: SPLUNK_BASE_URL_DEV,
  prod: SPLUNK_BASE_URL_PROD,
};

export const LINKS_GLOBAL_SECURE = {
  dev: {
    wowcher: 'https://secure05.devwowcher.co.uk',
    livingsocial: 'https://secure05.devlivingsocial.co.uk',
    livingsocialie: 'https://secure05.devlivingsocialie.net',
  },
  nxt: {
    wowcher: 'https://secure01.nxtwowcher.co.uk',
    livingsocial: 'https://secure01.nxtlivingsocial.co.uk',
    livingsocialie: 'https://secure01.nxtlivingsocialie.net',
  },
  prod: {
    wowcher: 'https://secure.wowcher.co.uk',
    livingsocial: 'https://secure.livingsocial.co.uk',
    livingsocialie: 'https://secure.livingsocial.ie',
  },
};

export const ANGULAR_HOME_URL = `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}`;

export const ANGULAR_LOGOUT = `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/logout`;

export const LINK_HOME = `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}`;

export const LINK_FORGOT_PASSWORD = `/forgot-password`;

export const LINK_LOGGED_USER = '/';
export const LINK_SEARCH_PAGE = `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/search`;
export const LINK_NOT_LOGGED_USER = `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/${LOGIN_URL}`; // Dont need to be the same as login
export const LINK_LOGIN = `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/${LOGIN_URL}`;
export const LINK_MY_VOUCHERS = `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/myaccount/vouchers`;
export const LINK_CHECKOUT = `${
  (USE_ANGULAR_URL_CHECKOUT && LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]) || ''
}/checkout/`;
export const LINK_CHECKOUT_RELATIVE = `/checkout/`;

export const LINK_CHECKOUT_BUTTON = `${
  (USE_ANGULAR_URL_BUY_BUTTON && LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]) || ''
}/checkout/`;
export const LINK_LIVINGSOCIAL_IE = {
  dev: 'https://www05.devlivingsocialie.net',
  nxt: 'https://www01.nxtlivingsocialie.net',
  prod: 'https://www.livingsocial.ie',
};
export const LINK_LIVINGSOCIAL = {
  dev: 'https://www05.devlivingsocial.co.uk',
  nxt: 'https://www01.nxtlivingsocial.co.uk',
  prod: 'https://www.livingsocial.co.uk',
};

export const LINK_MAIN_HOME = `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}`;

export const LINK_GIFT_FINDER = (location) =>
  `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deal/${location}/gift-finder`;

export const LINK_404 = `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/404`;

export const RESET_PASSWORD = `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/request-password-reset`;

// APP STORES
export const LINK_APPLE_APP_STORE = {
  wowcher: 'https://wowcher.app.link/3uR5bxzdf6',
  livingsocial: 'https://living-social.app.link/95UlGiGBg6',
  livingsocialie: 'https://living-social.app.link/95UlGiGBg6',
};
export const LINK_GOOGLE_PLAY_STORE = {
  wowcher: 'https://wowcher.app.link/MZ781rJdf6',
  livingsocial: 'https://living-social.app.link/1ZV1ay4Bg6',
  livingsocialie: 'https://living-social.app.link/1ZV1ay4Bg6',
};

// APP BANNER
export const APP_BANNER_DEEPLINK_APPLE = {
  wowcher: 'wowcher://',
  livingsocial: 'livingsocial://',
  livingsocialie: 'livingsocial://',
};
export const APP_BANNER_DEEPLINK_ANDROID = {
  wowcher: 'http://wowcher.co.uk/deal',
  livingsocial: 'http://livingsocial.co.uk/deal',
  livingsocialie: 'http://livingsocial.co.uk/deal',
};

export const LINK_CAREERS = 'https://careers.wowcher.co.uk/careers.html';

export const SOCIAL_MEDIA_SHARE_LINKS = {
  wowcher: [
    {
      icon: faFacebookF,
      backgroundColor: '#0052a3',
      href: 'https://www.facebook.com/wowcher.co.uk',
      ariaLabel: 'Facebook Page',
    },
    {
      icon: faTwitter,
      backgroundColor: '#4099ff',
      href: 'https://twitter.com/wowcher',
      ariaLabel: 'Twitter Page',
    },
    {
      icon: faInstagram,
      backgroundColor: '#125688',
      href: 'https://www.instagram.com/wowcher',
      ariaLabel: 'Instagram Page',
    },
    {
      icon: faPinterest,
      backgroundColor: '#c92228',
      href: 'https://www.pinterest.com/wowcher',
      ariaLabel: 'Pinterest Page',
    },
  ],
  livingsocial: [
    {
      icon: faFacebookF,
      backgroundColor: '#0052a3',
      href: 'https://www.facebook.com/LivingSocialUK',
      ariaLabel: 'Facebook Page',
    },
    {
      icon: faTwitter,
      backgroundColor: '#4099ff',
      href: 'https://twitter.com/LivingSocialUK',
      ariaLabel: 'Twitter Page',
    },
    {
      icon: faInstagram,
      backgroundColor: '#125688',
      href: 'https://www.instagram.com/livingsocialuk/',
      ariaLabel: 'Instagram Page',
    },
    {
      icon: faPinterest,
      backgroundColor: '#c92228',
      href: 'https://www.pinterest.com/livingsocialuk/',
      ariaLabel: 'Pinterest Page',
    },
  ],
  livingsocialie: [
    {
      icon: faFacebookF,
      backgroundColor: '#0052a3',
      href: 'https://www.facebook.com/LivingSocialIE',
      ariaLabel: 'Facebook Page',
    },
    {
      icon: faTwitter,
      backgroundColor: '#4099ff',
      href: 'https://twitter.com/LivingSocialIE',
      ariaLabel: 'Twitter Page',
    },
    {
      icon: faInstagram,
      backgroundColor: '#125688',
      href: 'https://www.instagram.com/livingsocial.ie/',
      ariaLabel: 'Instagram Page',
    },
    {
      icon: faPinterest,
      backgroundColor: '#c92228',
      href: 'https://www.pinterest.com/livingsocialuk/',
      ariaLabel: 'Pinterest Page',
    },
  ],
};

export const FOOTER_LEGAL_LINKS = {
  wowcher: [
    { text: 'Terms of use', href: 'https://www.wowcher.co.uk/page/termsofuse' },
    {
      text: 'Privacy & Cookies Policy',
      href: 'https://www.wowcher.co.uk/page/privacypolicy',
    },
    {
      text: 'E-Commerce Terms',
      href: 'https://www.wowcher.co.uk/page/e-commerceterms',
    },
    {
      text: 'Internet Safety',
      href: 'https://www.wowcher.co.uk/page/internetsafety',
    },
    {
      text: 'UK modern slavery act',
      href:
        'https://www.wowcher.co.uk/page/uk-modern-slavery-act-transparency-statement',
    },
    {
      text: 'Takedown Policy',
      href: 'https://www.wowcher.co.uk/page/takedown',
    },
  ],
  livingsocial: [
    {
      text: 'Terms of use',
      href: 'https://www.livingsocial.co.uk/page/termsofuse',
    },
    {
      text: 'Privacy & Cookies Policy',
      href: 'https://www.livingsocial.co.uk/page/privacypolicy',
    },
    {
      text: 'E-Commerce Terms',
      href: 'https://www.livingsocial.co.uk/page/e-commerceterms',
    },
    {
      text: 'Internet Safety',
      href: 'https://www.livingsocial.co.uk/page/internetsafety',
    },
    {
      text: 'UK modern slavery act',
      href:
        'https://www.livingsocial.co.uk/page/uk-modern-slavery-act-transparency-statement',
    },
    {
      text: 'Takedown Policy',
      href: 'https://www.livingsocial.co.uk/page/takedown',
    },
  ],
  livingsocialie: [
    {
      text: 'Terms of use',
      href: 'https://www.livingsocial.ie/page/termsofuse-ie',
    },
    {
      text: 'Privacy & Cookies Policy',
      href: 'https://www.livingsocial.ie/page/privacypolicy-ie',
    },
    {
      text: 'E-Commerce Terms',
      href: 'https://www.livingsocial.ie/page/e-commerceterms-ie',
    },
    {
      text: 'Internet Safety',
      href: 'https://www.livingsocial.ie/page/internetsafety',
    },
    {
      text: 'UK modern slavery act',
      href:
        'https://www.livingsocial.ie/page/uk-modern-slavery-act-transparency-statement',
    },
    {
      text: 'Takedown Policy',
      href: 'https://www.livingsocial.ie/page/takedown',
    },
  ],
};

export const FOOTER_DEALS_LINKS = {
  wowcher: [
    {
      text: 'Restaurants',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deals/london/restaurants-food`,
    },
    {
      text: 'Shopping',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deals/shop`,
    },
    {
      text: 'Holiday Deals',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/guides/holiday-deals`,
    },
    {
      text: 'Guides',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deals/hub`,
    },
    {
      text: 'Redeem Gift Card',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/giftcard/redeem`,
    },
  ],
  livingsocial: [
    {
      text: 'Shop',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deals/shop`,
    },
    {
      text: 'Escapes',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deals/escapes`,
    },
  ],
  livingsocialie: [
    {
      text: 'Shop',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deals/shop`,
    },
    {
      text: 'Escapes',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/deals/escapes`,
    },
  ],
};

export const FOOTER_COMPANY_LINKS = {
  wowcher: [
    {
      text: 'About Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/aboutus`,
    },
    {
      text: 'Merchant FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/workwithus`,
    },
    {
      text: 'Affiliate FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/guides/wowcher-affiliates`,
    },
    {
      text: 'Blog',
      href:
        'https://blog.wowcher.co.uk/?_ga=2.267451022.107186891.1597051109-1566888493.1580121875',
    },
  ],
  livingsocial: [
    {
      text: 'About Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/aboutus`,
    },
    {
      text: 'Merchant FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/merchantfaqs`,
    },
    {
      text: 'Affiliate FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/affiliates-livingsocial`,
    },
  ],
  livingsocialie: [
    {
      text: 'About Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/aboutus`,
    },
    {
      text: 'Merchant FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/merchantfaqs`,
    },
    {
      text: 'Affiliate FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/livingsocial-ie-affiliates`,
    },
  ],
};

export const FOOTER_CUSTOMER_SERVICE_LINKS = {
  wowcher: [
    {
      text: 'Daily Deals FAQs',
      href: `https://help.wowcher.co.uk/knowledgebase/s/?_ga=2.195173292.107186891.1597051109-1566888493.1580121875`,
    },
    {
      text: 'Refunds and Returns',
      href: `https://help.wowcher.co.uk/knowledgebase/s/article/Refunds`,
    },
    {
      text: 'Contact Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/contact`,
    },
    {
      text: 'Product Recalls',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/productrecalls`,
    },
  ],
  livingsocial: [
    {
      text: 'Daily Deals FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/faqs`,
    },
    {
      text: 'Contact Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/contact`,
    },
    {
      text: 'Product Recalls',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/productrecalls`,
    },
  ],
  livingsocialie: [
    {
      text: 'Daily Deals FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/faqs-ie`,
    },
    {
      text: 'Contact Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/contact-ie`,
    },
    {
      text: 'Product Recalls',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/productrecalls`,
    },
  ],
};

export const MORE_POPOVER_LINKS = {
  wowcher: [
    { text: 'Need Help', href: '/page/needhelp' },
    {
      text: 'Work With Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/workwithus`,
    },
    {
      text: 'Student Discount',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/student-discount`,
    },
    {
      text: 'Refer A Friend',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/refer-a-friend.html?rfrsrc=nav`,
    },
  ],
  livingsocial: [{ text: 'Need Help', href: `/page/needhelp` }],
  livingsocialie: [{ text: 'Need Help', href: `/page/needhelp` }],
};

export const LOGIN_MENU = {
  wowcher: [
    {
      text: 'My Wowchers',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/myaccount/vouchers`,
    },
    {
      text: 'My Details',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/myaccount/profile`,
    },
  ],
  livingsocial: [
    {
      text: 'my vouchers',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSUK]}/myaccount/vouchers`,
    },
    {
      text: 'my details',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSUK]}/myaccount/profile`,
    },
  ],
  livingsocialie: [
    {
      text: 'my vouchers',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSIE]}/myaccount/vouchers`,
    },
    {
      text: 'my details',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSIE]}/myaccount/profile`,
    },
  ],
};

export const REGISTER_MENU = {
  wowcher: [
    {
      text: 'Login',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/${LOGIN_URL}`,
    },
    {
      text: 'Sign Up',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/${REGISTER_URL}`,
    },
  ],
  livingsocial: [
    {
      text: 'Login',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSUK]}/${LOGIN_URL}`,
    },
    {
      text: 'Sign Up',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSUK]}/${REGISTER_URL}`,
    },
  ],
  livingsocialie: [
    {
      text: 'Login',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSIE]}/${LOGIN_URL}`,
    },
    {
      text: 'Sign Up',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSIE]}/${REGISTER_URL}`,
    },
  ],
};

export const MOBILE_MENU_MORE_LINKS = {
  wowcher: [
    { text: 'Need Help', href: '/page/needhelp' },
    {
      text: 'Work With Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/workwithus`,
    },
    { text: 'Create a deal', href: 'https://marketplace.wowcher.co.uk' },
    {
      text: 'About Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/aboutus`,
    },
    {
      text: 'FAQs',
      href: `https://help.wowcher.co.uk/knowledgebase/s/`,
    },
    {
      text: 'Privacy & Cookie Policy',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/privacypolicy`,
    },
    {
      text: 'Terms of use',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/termsofuse`,
    },
    {
      text: 'E-commerce terms',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/e-commerceterms`,
    },
    {
      text: 'Internet Safety',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_WOW]}/page/internetsafety`,
    },
    {
      text: 'Redeem Gift Card',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_WOW]}/giftcard/redeem`,
    },
  ],
  livingsocial: [
    { text: 'Need Help', href: '/page/needhelp' },
    { text: 'Create a deal', href: 'https://marketplace.wowcher.co.uk' },
    {
      text: 'About Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/aboutus`,
    },
    {
      text: 'FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/faqs`,
    },
    {
      text: 'Privacy & Cookie Policy',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/privacypolicy`,
    },
    {
      text: 'Terms of use',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/termsofuse`,
    },
    {
      text: 'E-commerce terms',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/e-commerceterms`,
    },
    {
      text: 'Internet Safety',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/page/internetsafety`,
    },
    {
      text: 'Redeem Gift Card',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSUK]}/giftcard/redeem`,
    },
  ],
  livingsocialie: [
    { text: 'Need Help', href: '/page/needhelp' },
    { text: 'Create a deal', href: 'https://marketplace.wowcher.co.uk' },
    {
      text: 'About Us',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/aboutus`,
    },
    {
      text: 'FAQs',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/faqs`,
    },
    {
      text: 'Privacy & Cookie Policy',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/privacypolicy-ie`,
    },
    {
      text: 'Terms of use',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/termsofuse-ie`,
    },
    {
      text: 'E-commerce terms',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/e-commerceterms-ie`,
    },
    {
      text: 'Internet Safety',
      href: `${LINKS_GLOBAL_WOWCHER[ENV][BRAND_LSIE]}/page/internetsafety`,
    },
    {
      text: 'Redeem Gift Card',
      href: `${LINKS_GLOBAL_SECURE[ENV][BRAND_LSIE]}/giftcard/redeem`,
    },
  ],
};

// Gifting
export const GIFTING_LINK = `${
  process.env.NEXT_PUBLIC_PUBLIC_API || DEFAULT_PUBLIC_API
}/v1/checkout/config/gifting`;

// We only get 2 deals for page > 0
export const ONLY_MAIN_DEAL_EXTRA_SUFFIX = '?pageSize=##NUMBER##';

// Number of Deals per page
export const DESKTOP_NUMBER_OF_PAGES = 2;
export const DESKTOP_PAGE_SIZE = NUMBER_OF_DEALS * DESKTOP_NUMBER_OF_PAGES;
export const MOBILE_PAGE_SIZE = NUMBER_OF_DEALS * 1;

// Get Deals links

export const MAIN_DEALS_DEFAULT_LINK = `${
  process.env.NEXT_PUBLIC_PUBLIC_API || DEFAULT_PUBLIC_API
}/v1/deal/national-deal`;
export const MAIN_DEALS_PREFIX_LINK = `${
  process.env.NEXT_PUBLIC_PUBLIC_API || DEFAULT_PUBLIC_API
}/v1`;
export const PAGE_SIZE_SUFFIX = `?pageSize=${DESKTOP_PAGE_SIZE}`;
export const DEALS_SUFFIX_LINK_PAGE_NUMBER = '&page=##NUMBER##';
export const DEALS_PAGE_PARAMETER = 'page';
export const SCROLLER_CONFIGURATION_LINK = `${
  process.env.NEXT_PUBLIC_PUBLIC_API || DEFAULT_PUBLIC_API
}/v1/content/scroller-configuration?brand=##brand##`;
export const NEW_PRODUCTS_LINK = `${
  process.env.NEXT_PUBLIC_PUBLIC_API || DEFAULT_PUBLIC_API
}/v1/deal/##location##/special/new-products`;

export const LINKS_GLOBAL_DTM = {
  dev: {
    wowcher:
      '//assets.adobedtm.com/db068b679b47/1c2b442f468f/launch-9d2eefbcb197-development.min.js',
    livingsocial:
      '//assets.adobedtm.com/db068b679b47/23da2dffa1a2/launch-a7f8c350452a-development.min.js',
    livingsocialie:
      '//assets.adobedtm.com/db068b679b47/23da2dffa1a2/launch-a7f8c350452a-development.min.js',
  },
  nxt: {
    wowcher:
      '//assets.adobedtm.com/db068b679b47/1c2b442f468f/launch-80cfe819b208-staging.min.js',
    livingsocial:
      '//assets.adobedtm.com/db068b679b47/23da2dffa1a2/launch-1ffad00d0545-staging.min.js',
    livingsocialie:
      '//assets.adobedtm.com/db068b679b47/23da2dffa1a2/launch-1ffad00d0545-staging.min.js',
  },
  prod: {
    wowcher:
      '//assets.adobedtm.com/db068b679b47/1c2b442f468f/launch-9543b53a1c22.min.js',
    livingsocial:
      '//assets.adobedtm.com/db068b679b47/23da2dffa1a2/launch-e85bde02e774.min.js',
    livingsocialie:
      '//assets.adobedtm.com/db068b679b47/23da2dffa1a2/launch-e85bde02e774.min.js',
  },
};

export const LINKS_GLOBAL_AWIN = {
  dev: {
    wowcher: '//www.dwin1.com/3595.js',
    livingsocial: '//www.dwin1.com/3925.js',
    livingsocialie: '//www.dwin1.com/4319.js ',
  },
  nxt: {
    wowcher: '//www.dwin1.com/3595.js',
    livingsocial: '//www.dwin1.com/3925.js',
    livingsocialie: '//www.dwin1.com/4319.js ',
  },
  prod: {
    wowcher: '//www.dwin1.com/3595.js',
    livingsocial: '//www.dwin1.com/3925.js',
    livingsocialie: '//www.dwin1.com/4319.js ',
  },
};

// CHECKOUT
export const LINK_ECOMMERCE_TERMS = {
  wowcher: {
    text: 'E-Commerce Terms',
    href: 'https://www.wowcher.co.uk/page/e-commerceterms',
  },
  livingsocial: {
    text: 'E-Commerce Terms',
    href: 'https://www.livingsocial.co.uk/page/e-commerceterms',
  },
  livingsocialie: {
    text: 'E-Commerce Terms',
    href: 'https://www.livingsocial.ie/page/e-commerceterms-ie',
  },
};

export const LINK_FILTER_API = `${
  process.env.NEXT_PUBLIC_PUBLIC_API || DEFAULT_PUBLIC_API
}/v1/deal`;

export const LINK_NOTFOUNDHIT = `${
  process.env.NEXT_PUBLIC_PUBLIC_API || DEFAULT_PUBLIC_API_TEST
}/v1/notFoundHit`;

export const CLOUDFLARE_TRACE = 'https://www.cloudflare.com/cdn-cgi/trace';

export const PAYPAL_CREDIT_LINK =
  'https://www.paypal.com/uk/webapps/mpp/paypal-virtual-credit/faq';
