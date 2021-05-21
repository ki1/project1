import {
  NUMBER_OF_RECENTLY_VIEWED_DEALS,
  RECENT_DEALS_LOCAL_STORE,
} from '../config/setup/setup';

/**
 * Store a main deal in localstorage
 */
export const storeMainDeal = (mainDealId) => {
  if (!localStorage) return;

  let storedDeals = JSON.parse(
    localStorage.getItem(RECENT_DEALS_LOCAL_STORE) || null
  );
  const dealObj = { id: mainDealId };

  if (!storedDeals) {
    localStorage.setItem(
      RECENT_DEALS_LOCAL_STORE,
      JSON.stringify({
        recentDeals: [dealObj],
        storedDate: Date.now(),
      })
    );
    return;
  }

  //deal already stored and at index 0
  if (storedDeals.recentDeals.findIndex((item) => item.id === mainDealId) === 0)
    return;

  storedDeals.recentDeals = storedDeals.recentDeals.filter(
    (item) => item.id !== mainDealId
  );
  // add deal to beginning of array
  storedDeals.recentDeals.unshift(dealObj);
  storedDeals.recentDeals.slice(0, NUMBER_OF_RECENTLY_VIEWED_DEALS - 1);
  storedDeals.storedDate = Date.now();

  localStorage.setItem(RECENT_DEALS_LOCAL_STORE, JSON.stringify(storedDeals));
};

/**
 * returns the stored deals
 */
//export function getStoredDeals() {
export const getIdsStoredDeals = () => {
  if (typeof window === 'undefined') return;
  let storedDeals = JSON.parse(
    localStorage.getItem(RECENT_DEALS_LOCAL_STORE) || null
  );
  if (!storedDeals) return;
  return storedDeals.recentDeals.map((deal) => deal.id);
};
