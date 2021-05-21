export function almostGone(deal, product) {
  return (
    product.quantity > 0 &&
    product.totalRemaining > 0 &&
    product.totalRemaining < 10
  );
}

export function limitedAvailability(deal, product) {
  return (
    product.quantity > 0 &&
    product.totalRemaining >= 10 &&
    product.totalRemaining < 50
  );
}

export function inHighDemand(deal, product) {
  return product.quantity > 0 && deal.totalBought > 100;
}

export function sellingFast(deal, product) {
  return product.quantity > 0 && deal.totalBought > 25;
}

/**
 * @typedef {Object}      Rule
 * @property {Function}   match       Does the rule match
 * @property {Function}   message     The essage to show for this rule, takes args (deal, product) => string
 * @property {Boolean}    firstOnly   if the rule should be applied to just the first match
 * @property {Boolean}    found       if a match has already been found for this rule
 */

/**
 * @returns {Rule[]} An ordered set of rules to be applied if they match
 */
const generateRules = () => [
  // ALMOST GONE - apply to all products that match
  {
    match: almostGone,
    message: (deal, product) =>
      `ALMOST GONE - only ${product.totalRemaining} remaining!`,
    firstOnly: false,
    found: false,
  },
  // LIMITED AVAILABILITY - apply to first product found with no existing message
  {
    match: limitedAvailability,
    message: () => 'Limited Availability!',
    firstOnly: true,
    found: false,
  },
  // IN HIGH DEMAND - set on first product found with no existing message
  {
    match: inHighDemand,
    message: (deal) => `IN HIGH DEMAND - already ${deal.totalBought} sold!`,
    firstOnly: true,
    found: false,
  },
  // SELLING FAST - set on first product found with no existing message
  {
    match: sellingFast,
    message: () => 'Selling fast!',
    firstOnly: true,
    found: false,
  },
];

/**
 * Get social cue for products in the checkout.
 * Products can only have 1 social cue message, the rules get applied in the order defined above.
 */
export function getSocialCuesForCheckout(deals = []) {
  // fresh rules array to reset found values.
  const rules = generateRules();
  // messages to show {[product.id]: ...message};
  const messages = {};
  // loop all the products
  deals.forEach((deal) => {
    deal.products.forEach((product) => {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule.match(deal, product)) {
          // we either apply on all that match or on the first that matches depending on firstOnly boolean
          if (!rule.firstOnly || !rule.found) {
            messages[product.id] = rule.message(deal, product);
            rule.found = true;
          }
          // this was a match, move onto the next product
          break;
        }
      }
    });
  });
  return messages;
}

export const getSocialCueMessageDealsImage = (socialCuesData) => {
  if (!socialCuesData || Object.keys(socialCuesData).length === 0) return null;
  // NOTE: Defaulting to the 24 hour message to mimic
  // the angular which is currently not working
  // TODO: Once released, reassess along with angular to decide
  // on a solution (as per ticket FEF-1568 comments)
  return socialCuesData.lastTwentyFourHours > 1
    ? `${socialCuesData.lastTwentyFourHours} others bought this deal in the last 24 hours!`
    : null;
};
