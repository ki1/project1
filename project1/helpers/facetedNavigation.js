import find from 'lodash/find';
import forEach from 'lodash/forEach';
import replace from 'lodash/replace';
import {
  ALL_CAT_PAGE,
  DEFAULT_SEO_TEXT,
  DEFAULT_SEO_TEXT_CATEGORY,
  DEFAULT_SEO_TEXT_SUBCATEGORY,
} from '../config/text/text';

export const getCategoryName = (navigation, seoTitle) => {
  let title = seoTitle;
  const category = find(navigation, { shortName: seoTitle });
  if (category && category.linkText) title = category.linkText;
  return title;
};

export const parseFacetedNavigation = (
  facetedNavigation,
  path,
  location,
  navigation
) => {
  if (!facetedNavigation || !facetedNavigation.navigations) return;
  if (!find(facetedNavigation.navigations, { isDefault: true })) {
    const localShop = path.split('/')[2];
    const categoryName =
      getCategoryName(navigation, facetedNavigation.category) || '';
    const allDealsText = ALL_CAT_PAGE.replace('##word##', categoryName);
    const defaultNavItem = {
      isDefault: true,
      count: facetedNavigation.count ? facetedNavigation.count : 0,
      linkText: allDealsText,
      categoryName: categoryName,
      url: `/${localShop === 'shop' ? 'shop' : location}/${
        facetedNavigation.category
      }`,
    };
    facetedNavigation.navigations.unshift(defaultNavItem);
    facetedNavigation.defaultItem = defaultNavItem;
  }
  forEach(facetedNavigation.navigations, (item, index) => {
    facetedNavigation.navigations[index].url = replace(
      item.url,
      'national-deal',
      'shop'
    );

    if (facetedNavigation.navigations[index].url.indexOf('deals') === -1) {
      facetedNavigation.navigations[index].url =
        '/deals' + facetedNavigation.navigations[index].url;
    }

    const isActive = item.url === path.split('?')[0];
    if (isActive) {
      facetedNavigation.defaultItem = item;
    }
    facetedNavigation.navigations[index].isActive = isActive;
  });
  return facetedNavigation;
};

export const getSubCatsWithPicture = (facetedNavigation, path) => {
  if (!facetedNavigation || !facetedNavigation.navigations) return [];
  const filtered = facetedNavigation.navigations.filter(
    (item) => item.imageUrl && item.imageUrl !== 'null'
  );
  forEach(filtered, (item) => {
    const isActive = item.url === path;
    if (isActive) {
      item.isActive = true;
    }
  });
  return filtered;
};

export const getDefaultSeoText = (facetedNavigation) => {
  if (!facetedNavigation || Object.keys(facetedNavigation).length === 0) {
    return DEFAULT_SEO_TEXT;
  }
  if (
    facetedNavigation.defaultItem &&
    facetedNavigation.defaultItem.categoryName
  ) {
    return DEFAULT_SEO_TEXT_CATEGORY.replace(
      /##CATEGORY##/gi,
      facetedNavigation.defaultItem.categoryName
    );
  }
  if (facetedNavigation.defaultItem && facetedNavigation.defaultItem.linkText) {
    return DEFAULT_SEO_TEXT_SUBCATEGORY.replace(
      /##SUBCATEGORY##/gi,
      facetedNavigation.defaultItem.linkText
    );
  }
  return DEFAULT_SEO_TEXT;
};
