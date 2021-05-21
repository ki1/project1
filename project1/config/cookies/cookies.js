import { BRAND_WOWCHER } from '../setup/setup';

// TODO: check this is 100% accurate
// cookies need 'living-social' in the form 'livingsocial' so remove '-'
const Environment = (process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER).replace(
  '-',
  ''
);

const COOKIES = {
  affiliate: 'dod-affiliate',
  apiAuthToken: 'apiAuthToken',
  awinSource: 'dod-awin-source',
  awin_event: 'awin_event',
  basketToken: 'bt',
  brandCookie: `${Environment}-win`,
  buyDeal: 'dod-buy-deal',
  cjevent: 'cjevent',
  cloudinaryTest: 'cloudinary-test',
  cordial_mcid: 'cordial_mcid',
  customerToken: 'ct',
  didomiDeleted: 'didomi_deleted',
  didomi_token: 'didomi_token',
  dynamicPrice: 'dp',
  euconsent: 'euconsent',
  euconsent_v2: 'euconsent-v2',
  gauth: 'dod-gauth',
  gclid: 'dod-gclid',
  lightPage: 'lightPage',
  lightbox: 'subscribeLightbox',
  location: 'dod-location',
  loginType: 'login-type',
  logoutURL: 'dod-post-logout-url',
  msclkid: 'dod-msclkid',
  oldDidomiCookieRemoved: 'old_didomi_cookie_removed',
  onSiteV3: 'onSiteV3',
  pagination: 'pagination',
  postLoginUrl: 'dod-post-login-url',
  profile_image_url: 'dod-user-profile-image-url',
  purchaseUrl: 'dod-purchase-url',
  recentDeals: 'recentDeals',
  redirectLocal: 'dod-redirect-local',
  redirectUrl: 'dod-redirect',
  registered: 'dod-registered',
  sailthruDP: 'dp_st_data_sent',
  sessionSource: 'dod-session-source',
  smartbannerClosed: 'smartbannerClosed',
  splunkGuid: 'splunkGuid',
  subscribed: 'subscribed',
  subscriptionModal: `${Environment}-subscription-win`,
  userEmail: 'dod-user-email',
  userInfo: 'dod-user-info',
  userLoggedIn: 'dod_logged_in',
  userProfile: 'user_profile',
  userSource: 'dod-user-source',
  videoRolloutTest: 'videoRollout',
  wowcherUser: 'wowcher_user',
  wowcherWin: 'wowcher-win',
};

//42 cookies

export default COOKIES;
