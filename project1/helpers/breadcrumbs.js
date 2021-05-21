import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const getTopLevelNavItem = (name, navigation, locations) => {
  if (!name || !navigation || !locations) {
    return null;
  }
  const entry = navigation.find((nav) => nav.shortName === name);
  // look for the entry in the nav
  if (entry) {
    return {
      linkText: entry.linkText,
      url: entry.url,
    };
  }
  // if it's not there it could be a location so check those
  const location = locations.find((loc) => loc.shortName === name);
  if (location) {
    return {
      linkText: location.name,
      url: '/deals/' + location.shortName,
    };
  }
  return null;
};

export const getSubLevelNavItem = (path, navigation) => {
  if (!path || !navigation) {
    return [];
  }

  const out = [];
  let stage = navigation;
  for (let i = 0; i < path.length; i++) {
    if (!stage || stage.length === 0) {
      return out;
    }
    const part = path[i];
    const entry = stage.find((nav) => nav.shortName === part);
    if (entry) {
      out.push({
        linkText: entry.linkText,
        url: entry.url,
      });
      stage = entry.subNavigations;
    } else {
      return out;
    }
  }
  return out;
};

export const getBreadcrumbs = (path, navigation, locations, deal) => {
  if (!path || !navigation || !locations) {
    return [];
  }

  // remove any query/hash and split into parts
  const parts = path
    .split('?')[0]
    .split('#')[0]
    .split('/')
    .filter((p) => p !== '');

  const isDealPage = parts[0] === 'deal';
  const isTravel = parts[1] === 'travel';

  const crumbs = [];

  if (!isTravel) {
    // shop or location (travel is techincally a cat not root so ignore)
    const root = getTopLevelNavItem(parts[1], navigation, locations);
    if (root) {
      crumbs.push(root);
    }
  }

  const catParts = parts.slice(
    isTravel ? 1 : 2,
    isDealPage ? -2 : parts.length // the last 2 parts on a deal page are always dealId & dealSlug
  );
  crumbs.push(...getSubLevelNavItem(catParts, navigation));

  if (deal && deal.headline) {
    crumbs.push({ linkText: deal.headline, url: '#' });
  }

  return crumbs;
};

export const useBreadcrumbs = (deal) => {
  const router = useRouter();
  const [navigation, locations] = useSelector((s) => [
    s.navigation.list,
    s.locations.locations,
  ]);
  return getBreadcrumbs(router.asPath, navigation, locations, deal);
};
