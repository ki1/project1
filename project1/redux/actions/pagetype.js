import { PAGE_TYPE } from '../../config/constants/action-types';
import { PAGE_TYPE_NAME } from '../reducers/pagetype';
import { parseWowcherPath } from '../../helpers/url';

export const isPage = (path, locations) => {
  /*
    --current definition of page types--
    SHOP PAGE
      /
      /deals/shop
    CATEGORY PAGE
      /deals/shop/electricals
      /deals/london/health-fitness
    LOCATION PAGE
     /deals/london
    OTHER PAGE
      unconfirmed pages to be set as other
  */
  const pathUrl = parseWowcherPath(path);
  const pathLength = pathUrl.pathArray.length;

  const [seg1, seg2] = pathUrl.pathArray;

  //check if shop page
  if (!seg1 || (seg1 === 'deals' && seg2 === 'shop' && pathLength === 2))
    return PAGE_TYPE_NAME.SHOP;

  //check if location
  if (
    pathLength === 2 &&
    seg1 === 'deals' &&
    locations.find((item) => item.shortName === seg2)
  )
    return PAGE_TYPE_NAME.LOCATION;

  //check if category or other
  return seg1 === 'deals' && pathLength > 2
    ? PAGE_TYPE_NAME.CATEGORY
    : PAGE_TYPE_NAME.OTHER;
};

export const setPageType = (path, locations) => (dispatch) => {
  return dispatch({
    type: PAGE_TYPE.SET_PAGE_TYPE,
    pageType: isPage(path, locations),
  });
};
