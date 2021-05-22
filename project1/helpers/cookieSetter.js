import Cookies from 'react-cookies';
import COOKIES from '../config/cookies/cookies';
import commonCookiesOptions from '../helpers/commonCookiesOptions';
import dayjs from 'dayjs';
import { waitForDtm } from './analytics';

const activitiesList = [
  'paginationTest',
  'cloudinaryTest',
  'videoRollout',
  'onSiteV3',
  'dynamicPricing',
];

const DtmActivityHelper = {
  getActivityContentListByType(offers, activityType) {
    let activityContentList = [];
    if (
      Array.isArray(offers) &&
      offers.length > 0 &&
      typeof activityType === 'string'
    ) {
      const filteredOffers = this.filterByActionType(offers, activityType);
      if (
        Array.isArray(filteredOffers) &&
        filteredOffers.length > 0 &&
        Array.isArray(filteredOffers[0].content)
      ) {
        activityContentList = filteredOffers[0].content;
      }
    }
    return activityContentList;
  },

  getValueForActivity(activityContent, activityName) {
    let activityValue;
    const activityInfo = this.findByName(activityContent, activityName);
    if (
      activityInfo &&
      typeof activityInfo.group !== 'undefined' &&
      activityInfo.group !== null
    ) {
      activityValue = activityInfo.group;
    }
    return activityValue;
  },

  filterByActionType(offers, filter) {
    let filteredOffers = [];
    if (Array.isArray(offers)) {
      filteredOffers = offers.filter((offer) => offer.action === filter);
    }
    return filteredOffers;
  },

  findByName(contentList, filterName) {
    let filteredOffers = [];
    if (Array.isArray(contentList)) {
      filteredOffers = contentList.find(
        (content) => content.name === filterName
      );
    }
    return filteredOffers;
  },
};

export const setCookie = ({ key, value, expire, options = null }) => {
  const cookieExpire = expire && dayjs().add(expire, 'days').toISOString();

  Cookies.save(key, value, {
    ...(options ?? commonCookiesOptions),
    expires: new Date(cookieExpire),
  });
};

export const cookieMonsterInit = async (routerQuery) => {
  const dtmAvailable = await waitForDtm();
  if (!dtmAvailable) return;

  //getting values from URL query string
  const { ito, gclid, cauth, msclkid, mcid, source } = routerQuery;

  //add usersource from url query string if one is present
  if (ito?.length > 0) {
    setCookie({
      key: COOKIES.userSource,
      value: ito,
      expire: ito.indexOf('_affiliate') > -1 ? 30 : 365,
    });
    setCookie({ key: COOKIES.sessionSource, value: ito, expire: 365 });
  }

  //detects and sets brandcookie eg 'wowcher-win || livingsocial-win' a value depending on the users entry to app
  if (
    Cookies.load(COOKIES.brandCookie) &&
    ['registered_user', 'subscribed'].indexOf(
      Cookies.load(COOKIES.brandCookie)
    ) !== -1 &&
    ito
  ) {
    if (ito.indexOf('wowcher_email') > -1) {
      setCookie({
        key: COOKIES.brandCookie,
        value: 'wowcher_email',
        expire: 30,
      });
    } else if (
      ito.indexOf('criteo_all-user') > -1 &&
      ['bypassed', 'wowcher_email'].indexOf(
        Cookies.load(COOKIES.wowcherWin)
      ) !== -1
    ) {
      setCookie({
        key: COOKIES.brandCookie,
        value: 'wowcher_criteo',
        expire: 1,
      });
    } else if (
      ito.indexOf('wowcher_cloudiq') &&
      ['bypassed', 'wowcher_email'].indexOf(
        Cookies.load(COOKIES.wowcherWin)
      ) !== -1
    ) {
      setCookie({
        key: COOKIES.brandCookie,
        value: 'wowcher_cloudiq',
        expire: 1,
      });
    }
  }

  //set gclid cookie if available from url path
  if (gclid?.length > 0) {
    setCookie({ key: COOKIES.gclid, value: gclid, expire: 365 });
  }

  //setting 30 day awinSource and Awin_event cookies in parallel
  if (ito?.indexOf('_affiliate') > -1 && source === 'awin') {
    //used to bypass lightbox activation
    setCookie({ key: COOKIES.awinSource, value: 'awin' });

    const cookieObject = {
      value: 'awin',
      setDate: dayjs().toISOString(),
    };

    setCookie({ key: COOKIES.awin_event, value: cookieObject, expire: 30 });
  }

  //check customer token on app load - drop and refresh cookie if exists
  if (ito?.indexOf('wowcher_email') > -1) {
    if (!cauth) return;

    if (!Cookies.load(COOKIES.customerToken)) {
      setCookie({ key: COOKIES.customerToken, value: cauth });
    }
  }

  //Setting msclkid cookie based on URL msclkid param
  if (msclkid?.length > 0) {
    setCookie({ key: COOKIES.msclkid, value: msclkid, expire: 365 });
  }

  if (mcid?.length > 0) {
    setCookie({ key: COOKIES.cordial_mcid, value: mcid, expire: 365 });
  }

  window.adobe.target.getOffer({
    mbox: 'target-global-mbox',
    params: { specificActivity: activitiesList.join(',') }, //
    success: (offers) => {
      const activityContent = DtmActivityHelper.getActivityContentListByType(
        offers,
        'setJson'
      );

      //Pagination test cookie
      if (activityContent && activityContent.length > 0) {
        if (!Cookies.load('pagination')) {
          const paginationActivityValue = DtmActivityHelper.getValueForActivity(
            activityContent,
            'paginationTest'
          );
          if (
            typeof paginationActivityValue === 'string' &&
            paginationActivityValue.trim().length > 0
          ) {
            setCookie({
              key: COOKIES.pagination,
              value: paginationActivityValue,
              expire: 365,
            });
          }
        }

        // Cloudinary DTM test
        const cloudinaryActivityValue = DtmActivityHelper.getValueForActivity(
          activityContent,
          'cloudinaryTest'
        );
        if (
          typeof cloudinaryActivityValue === 'string' &&
          cloudinaryActivityValue.trim().length > 0
        ) {
          setCookie({
            key: COOKIES.cloudinaryTest,
            value: cloudinaryActivityValue,
            expire: 365,
          });
        }

        // Video test
        const videoActivityValue = DtmActivityHelper.getValueForActivity(
          activityContent,
          'videoRollout'
        );
        if (
          typeof videoActivityValue === 'string' &&
          videoActivityValue.trim().length > 0
        ) {
          setCookie({
            key: COOKIES.videoRolloutTest,
            value: videoActivityValue,
            expire: 365,
          });
        }

        // onSiteV3 test
        const onSiteV3ActivityValue = DtmActivityHelper.getValueForActivity(
          activityContent,
          'onSiteV3'
        );
        if (
          typeof onSiteV3ActivityValue === 'string' &&
          onSiteV3ActivityValue.trim().length > 0
        ) {
          setCookie({
            key: COOKIES.onSiteV3,
            value: onSiteV3ActivityValue,
            expire: 365,
          });
        }

        // dynamicPricing test
        const dynamicPricingActivityValue = DtmActivityHelper.getValueForActivity(
          activityContent,
          'dynamicPricing'
        );
        if (
          typeof dynamicPricingActivityValue === 'string' &&
          dynamicPricingActivityValue.trim().length > 0
        ) {
          setCookie({
            key: COOKIES.dynamicPrice,
            value: dynamicPricingActivityValue,
            expire: 365,
          });
        }
      }
    },
    error: (error) => {
      console.log('window.adobe.target.getOffer:', error);
    },
  });
};

const strictCookiesOptions = {
  domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  path: '/',
  secure: false,
  samesite: 'Lax',
};

export const didomiTokenSetter = () => {
  const didomiDeleted = Cookies.load(COOKIES.didomiDeleted);
  const didomi_token = Cookies.load(COOKIES.didomi_token);

  if (didomiDeleted || !didomi_token) return;

  const options = strictCookiesOptions;
  if (typeof window !== 'undefined') {
    options.domain = window.location.hostname;
  }

  const old_didomi = Cookies.load(COOKIES.oldDidomiCookieRemoved);

  if (old_didomi) {
    Cookies.remove(COOKIES.oldDidomiCookieRemoved, {
      domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
      path: '/',
    });
    Cookies.remove(COOKIES.oldDidomiCookieRemoved, {
      domain: `${options.domain}`,
      path: '/',
    });
  }

  if (didomi_token) {
    Cookies.remove(COOKIES.didomi_token, {
      domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
      path: '/',
    });
    setCookie({
      key: COOKIES.didomi_token,
      value: didomi_token,
      expire: 365,
      options,
    });
  }

  const euconsent = Cookies.load(COOKIES.euconsent);
  if (euconsent) {
    Cookies.remove(COOKIES.euconsent, {
      domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
      path: '/',
    });
    setCookie({
      key: COOKIES.euconsent,
      value: euconsent,
      expire: 365,
      options,
    });
  }

  const euconsent_v2 = Cookies.load(COOKIES.euconsent_v2);
  if (euconsent_v2) {
    Cookies.remove(COOKIES.euconsent_v2, {
      domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
      path: '/',
    });
    setCookie({
      key: COOKIES.euconsent_v2,
      value: euconsent_v2,
      expire: 365,
      options,
    });
  }

  setCookie({ key: COOKIES.didomiDeleted, value: true, expire: 365 });
};
