import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from '../components/_generic/axiosSplunk/axiosSplunk';
import { BRAND_WOWCHER, SEARCHURL, URLDEAL } from '../config/setup/setup';
import { cutArray } from './deals';
import { makeUrlAbsolute } from './url';

export function siteToApiBrand(site) {
  switch (site) {
    case 'livingsocial':
      return 'living-social';
    case 'livingsocialie':
      return 'living-social-ie';
    default:
      return 'wowcher';
  }
}

export function findConfigFromPathAndPosition(configs, path, position) {
  return configs.find((c) => {
    return (
      path.indexOf(c.siteLocation) > -1 &&
      c.pageLocation === position.toString()
    );
  });
}

export function getUrlFromMerchandisingConfig(config) {
  const location = config.location.toLowerCase();
  if (config.specialSearchTag) {
    return `${URLDEAL}/${location}/special/${config.specialSearchTag.toLowerCase()}?pageSize=18`;
  } else if (config.searchTerm) {
    return `${SEARCHURL}/${location}?q=${config.searchTerm}&pageSize=18`;
  } else {
    const path = [
      URLDEAL,
      location,
      config.category?.toLowerCase(),
      config.subCategory?.toLowerCase(),
    ];
    return `${path.filter((i) => i).join('/')}?pageSize=18`;
  }
}

const fetchMerchandising = (url) =>
  axios({
    method: 'GET',
    url,
    headers: {
      brand: process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER,
    },
  });

export const useMerchandisingModuleConfig = (path, position) => {
  const data = useSelector((s) => s.scroller.config);
  const [config, setConfig] = useState({ deals: [] });
  useEffect(() => {
    let unmounted = false;
    const run = async () => {
      // if any of this fails we do nothing. the component will be hidden anyway.
      try {
        const moduleConfig = findConfigFromPathAndPosition(
          data,
          path,
          position
        );
        if (moduleConfig) {
          const url = getUrlFromMerchandisingConfig(moduleConfig);
          const response = useSWR(url, fetchMerchandising);

          if (!unmounted) {
            setConfig({
              header: moduleConfig.header,
              subHeader: moduleConfig.subHeader,
              backgroundImage: moduleConfig.backgroundImage,
              ctaLabel: moduleConfig.ctaLabel,
              ctaLink: makeUrlAbsolute(moduleConfig.ctaLink),
              deals: response.data.deals || [],
            });
          }
        }
      } catch (e) {
        return false;
      }
    };
    run();
    return () => {
      unmounted = true;
    };
  }, [data, path, position]);
  return config;
};

/** how many deals can we show on each page */
export function getCountFromBreakpoint(breakpoint) {
  switch (breakpoint) {
    case 'sm':
      return 1;
    case 'md':
      return 2;
    case 'lg':
      return 2;
    default:
      return 4;
  }
}

/** slice up deals into complete pages, disregard incomplete pages */
export function makePages(deals, count) {
  const pageRunOver = deals.length % count;
  const tidyPages = pageRunOver > 0 ? deals.slice(0, pageRunOver * -1) : deals;
  return cutArray(tidyPages, count);
}

/** memo version of above to avoid calling on all page resize events */
export function usePages(deals, count) {
  return useMemo(() => makePages(deals, count), [deals, count]);
}
