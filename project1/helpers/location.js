import { DEFAULT_LOCATION } from '../config/setup/setup';

export function getLocationShortName(location) {
  if (location && location.shortName) {
    return location.shortName;
  } else {
    return DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE || 'wowcher']
      .shortName;
  }
}
