import {
  IMAGES_DEAL_URL,
  DEFAULT_DEAL_IMG_WIDTH,
  DEFAULT_DEAL_IMG_HEIGHT,
} from '../config/setup/setup';
import { PLACEHOLDER_IMG } from '../config/constants/images';

export function replaceImageServer(
  dealId,
  image,
  width = DEFAULT_DEAL_IMG_WIDTH,
  height = DEFAULT_DEAL_IMG_HEIGHT
) {
  if (!image) return '';

  const imageId = image.id || '';
  const imageExtension = image.extension || '';
  return `${
    IMAGES_DEAL_URL[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
      process.env.NEXT_PUBLIC_SITE || 'wowcher'
    ]
  }/images/deal/${dealId}/${width}x${height}/${imageId}.${imageExtension}`;
}

export const usePlaceholderImage = (e) => {
  e.target.onerror = null;
  e.target.src = PLACEHOLDER_IMG[process.env.NEXT_PUBLIC_SITE || 'wowcher'];
};

export function replaceImageLogo(dealId, item) {
  if (!item) return '';

  const imageId = item.id || '';
  const imageExtension = item.extension || '';
  if (item.imageUrl) return `${item.imageUrl}-logo.${imageExtension}`;
  return `${
    IMAGES_DEAL_URL[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
      process.env.NEXT_PUBLIC_SITE || 'wowcher'
    ]
  }/images/business/${dealId}/${imageId}-logo.${imageExtension}`;
}
