import axios from '../../_generic/axiosSplunk/axiosSplunk';
import httpCommonHeaders from '../../../helpers/httpCommonHeaders';
import { parseWowcherPath, stripOrigin } from '../../../helpers/url';
import {
  DEAL_LOCATION_TYPES,
  PAGE_TYPES,
} from '../../../config/constants/page-types';

const OFFSET_DEAL_PAGE = 5;
const OFFSET_CATEGORY_PAGE = 2;
const PAGE_SIZE = 18;

export const fetchDeals = async (url) => {
  const response = await axios(url, {
    method: 'GET',
    headers: httpCommonHeaders(),
  });

  return response?.data?.deals;
};

export const getApiPath = (pageUrl, evergreenDealId) => {
  const {
    pageType,
    searchParams: searchParamsInUrl,
    details,
  } = parseWowcherPath(stripOrigin(pageUrl));
  const {
    locationType,
    localDealLocation,
    isEvergreen,
    category,
    subCategory,
    dealId: dealIdInUrl,
  } = details;

  if (![PAGE_TYPES.deal, PAGE_TYPES.category].includes(pageType))
    throw new Error('Unsupported page type');

  let dealId;
  if (pageType === PAGE_TYPES.deal) {
    dealId = isEvergreen ? evergreenDealId : dealIdInUrl;

    if (!dealId) throw new Error('Undefined dealId');
  }

  const apiPathArray = [
    locationType === DEAL_LOCATION_TYPES.national
      ? 'national-deal'
      : localDealLocation,
    category,
    subCategory,
    dealId,
  ].reduce((acc, item) => {
    if (item) acc.push(item);

    return acc;
  }, []);

  const searchParams = new URLSearchParams(searchParamsInUrl ?? {});

  searchParams.set(
    'offset',
    pageType === PAGE_TYPES.deal ? OFFSET_DEAL_PAGE : OFFSET_CATEGORY_PAGE
  );

  searchParams.set('pageSize', PAGE_SIZE);

  return { path: apiPathArray.join('/'), searchParams };
};
