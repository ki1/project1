import { FREE } from '../config/text/text';

export const getCountryCurrency = () => {
  // TODO: Add more currencies
  const currencyPound = (process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb') === 'gb';
  return currencyPound ? '£' : '€';
};

/**
 * returns the currency sign from the currency string
 * ie. gbp => £
 */
export const signFromCurrency = (currency) => {
  // TODO: Add more currencies
  if (currency === 'eur') return '€';
  return '£';
};

/**
 * Formats a number into a currency. ints are displayed as is and
 * floats are formatted to 2dp (unless fixed).
 *
 * @param {number} num      the number to display
 * @param {boolean} fixed   always show to 2 dp
 * @param {boolean} [round]   whether to round number
 */
export const formatPrice = (num, fixed, round) => {
  if (typeof num !== 'number') {
    return '0.00';
  } else {
    if (!fixed && num % 1 === 0) {
      return num.toString();
    } else {
      return round ? (Math.round(num * 100) / 100).toFixed(2) : num.toFixed(2);
    }
  }
};

/**
 *
 * @param {string} currency   the currency
 * @param {number} num        the numeric value
 * @param {boolean} fixed     should it be fixed to 2dp?
 * @param {boolean} freeText  should the word FREE be used for 0?
 */
export const formatCurrency = (currency, num, fixed, freeText) => {
  if (num === 0 && freeText) {
    return FREE;
  } else {
    return signFromCurrency(currency) + formatPrice(num, fixed);
  }
};
