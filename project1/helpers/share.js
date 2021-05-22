import {
  FACEBOOK_SHARE_ITO,
  PINTEREST_SHARE_ITO,
  TWITTER_HANDLES,
  TWITTER_SHARE_ITO,
  WHATSAPP_SHARE_ITO,
  EMAIL_SHARE_ITO,
  WEB_ADDRESS,
  FACEBOOK_ID,
} from '../config/social/config';
import { formatCurrency } from './currency';
import { makeUrlAbsolute } from './url';

export const getPopupWindowParams = (config = {}) => {
  const params = {
    height: 600,
    width: 550,
    top: 100,
    left: window && window.screen ? window.screen.width / 2 - 275 : 100,
    toolbar: 0,
    location: 0,
    menubar: 0,
    directories: 0,
    scrollbars: 0,
    noopener: true,
    noreferrer: true,
    ...config,
  };
  const out = [];
  Object.keys(params).forEach((key) => {
    out.push(`${key}=${params[key]}`);
  });
  return out.join(',');
};

export function getNowOrFrom(deal) {
  return deal && deal.products && deal.products.length > 1 ? 'from' : 'now';
}

/** make share url absolute and appends the ito value for the platform and brand */
function getFullShareUrl(deal, ito) {
  if (!deal || !deal.shareUrl) {
    return makeUrlAbsolute('/');
  }
  return encodeURI(`${makeUrlAbsolute(deal.shareUrl)}?ito=${ito}${deal.id}`);
}

export function getFacebookShareUrl(deal) {
  const app_id =
    FACEBOOK_ID[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
      process.env.NEXT_PUBLIC_SITE || 'wowcher'
    ];
  const url = getFullShareUrl(
    deal,
    FACEBOOK_SHARE_ITO[process.env.NEXT_PUBLIC_SITE || 'wowcher']
  );
  return `https://www.facebook.com/dialog/share?app_id=${app_id}&display=popup&href=${url}`;
}

export function getTwitterShareUrl(deal) {
  const url = getFullShareUrl(
    deal,
    TWITTER_SHARE_ITO[process.env.NEXT_PUBLIC_SITE || 'wowcher']
  );

  const text = `${deal.headline} (${getNowOrFrom(deal)} ${formatCurrency(
    deal.currency,
    deal.price
  )}) via ${TWITTER_HANDLES[process.env.NEXT_PUBLIC_SITE || 'wowcher']}`;

  return `https://twitter.com/share?url=${url}&text=${encodeURIComponent(
    text
  )}`;
}

export function getPinterestShareUrl(deal) {
  const url = getFullShareUrl(
    deal,
    PINTEREST_SHARE_ITO[process.env.NEXT_PUBLIC_SITE || 'wowcher']
  );
  return `https://pinterest.com/pin/create/link/?url=${url}&description=${encodeURIComponent(
    deal.headline
  )}`;
}

export function getWhatsAppShareUrl(deal) {
  const url = getFullShareUrl(
    deal,
    WHATSAPP_SHARE_ITO[process.env.NEXT_PUBLIC_SITE || 'wowcher']
  );
  return `https://wa.me/?text=${encodeURIComponent(
    `Your friend sent you a great deal on ${
      WEB_ADDRESS[process.env.NEXT_PUBLIC_SITE || 'wowcher']
    }: ${deal.headline}\n\n${url}`
  )}`;
}

export function getEmailShareUrl(deal) {
  const subject = `Your friend sent you a great deal on ${
    WEB_ADDRESS[process.env.NEXT_PUBLIC_SITE || 'wowcher']
  }: ${deal.headline}`;

  const body = `${`${deal.title}.\n\nSee deal now:`} ${getFullShareUrl(
    deal,
    EMAIL_SHARE_ITO[process.env.NEXT_PUBLIC_SITE || 'wowcher']
  )}`;

  return `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
