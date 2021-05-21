import { isMobile, isTablet, isIPad13 } from 'react-device-detect';
import {
  WEBAPP_MOBILE,
  WEBAPP_TABLET,
  WEBAPP_DESKTOP,
} from '../config/setup/setup';

export const getAppPlatform = () => {
  if (isTablet || isIPad13) return WEBAPP_TABLET;
  if (isMobile) return WEBAPP_MOBILE;
  return WEBAPP_DESKTOP;
};
