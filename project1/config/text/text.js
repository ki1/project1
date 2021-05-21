import { LINKS_GLOBAL_WOWCHER } from '../links/links';
const LINKS_GLOBAL_WOWCHER_ENV = `${
  LINKS_GLOBAL_WOWCHER[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
    process.env.NEXT_PUBLIC_SITE || 'wowcher'
  ]
}`;
const PASSWORDS_SHOULD_MATCH = 'Passwords should match';
const WOWCHER_LIMITED = 'Wowcher Limited';
export const DISMISS = 'dismiss';
export const GO_BACK = 'Go Back';

export const BRAND_NAME = {
  wowcher: 'Wowcher',
  'living-social': 'Living Social',
};

// LOCATION
export const COUNTRY_NAME = {
  wowcher: 'United Kingdom',
  livingsocial: 'United Kingdom',
  livingsocialie: 'Ireland',
};

export const CHANGE_LOCATION = 'Change Location';

// MOBILE APP BANNER
export const APP_BANNER_APPLE = 'Apple';
export const APP_BANNER_GOOGLE = 'Google';
export const APP_BANNER_TITLE = {
  wowcher: 'Wowcher',
  livingsocial: 'LivingSocial',
  livingsocialie: 'LivingSocial',
};
export const APP_BANNER_AUTHOR = 'dmg media ltd';
export const APP_BANNER_PRICE = 'FREE';
export const APP_BANNER_PRICE_SUFFIX_APPLE = ' - On the App Store';
export const APP_BANNER_PRICE_SUFFIX_ANDROID = ' - In Google Play';
export const APP_BANNER_GET = 'Get app';
export const APP_BANNER_OPEN = 'Open app';

// HEADER
export const GIFT_FINDER = 'Gift Finder';
export const MORE = 'more';
export const MORE_CATEGORIES = 'More Categories';
export const MORE_OPTIONS = 'More Options';
export const ALL_CATEGORY_DEALS = (category) => `All ${category} Deals`;

// MOBILE MENU
export const MOBILE_MENU_NAV_HEAD = 'shop by category';
export const MOBILE_MENU_ACCOUNT_HEAD = 'my account';
export const MOBILE_MENU_MORE_HEAD = 'more options';
export const MOBILE_MENU_SUBSCRIBE_HEAD = 'subscribe';
export const MOBILE_MENU_DOWNLOAD = 'download app';

// SEARCH
export const SEARCH_PLACEHOLDER = 'What are you looking for?';
export const SEARCH_INPUT_ARIA_LABEL = {
  wowcher: 'Search the Wowcher website',
  livingsocial: 'Search the LivingSocial website',
  livingsocialie: 'Search the LivingSocial website',
};
export const SEARCH_BUTTON_ARIA_LABEL = 'Start Search';
export const NO_RESULTS = 'No results for your search term was found';
export const SUGGESTIONS_TITLE = 'Suggestions';
export const TOP_SEARCHES_TITLE = 'Top Searches';

// FOOTER
export const DOWNLOAD_THE_APP = 'Download the app';
export const APPLE_APP_STORE_ARIA_LABEL = 'Download on the App Store';
export const GOOGLE_PLAY_ARIA_LABEL = 'Get it on Google Play';
export const VIEW_CAREERS = 'View Careers';
export const WORK_WITH_US = 'work with us';
export const FOOTER_DEALS_TITLE = 'Deals';
export const FOOTER_COMPANY_TITLE = 'Company';
export const FOOTER_CUTOMER_SERVICE_TITLE = 'Customer Service';
export const COMPANY_LEGAL_NAME = {
  wowcher: WOWCHER_LIMITED,
  livingsocial: WOWCHER_LIMITED,
  livingsocialie: 'LivingSocial Europe Limited',
};
export const COMPANY_TRADING_NAME = {
  wowcher: WOWCHER_LIMITED,
  livingsocial: 'Wowcher Limited t/a LivingSocial',
  livingsocialie: 'Wowcher Limited t/a LivingSocial',
};
export const ALL_RIGHTS_RESERVED = 'All rights reserved';
export const REPLACE_COMPANY_TRADING_NAME = '##COMPANY_TRADING_NAME##';
export const PAYPAL_CREDIT_LEGAL =
  'Subject to status. Terms and conditions apply. ##COMPANY_TRADING_NAME## acts as a broker and offers credit from PayPal Credit. PayPal Credit is a trading name of PayPal (Europe) S.à.r.l. et Cie, S.C.A.,22-24 Boulevard Royal L-2449, Luxembourg.';

export const COUNTDOWN_LEGAL =
  '*All deals on site refresh at 00:00:00:00 at which point prices and availability of deals are subject to change.';

export const PRICES_SUBJECT_TO_CHANGE =
  'Prices subject to change, all deals subject to availability.';

// HEADER
export const SIGN_UP = 'Sign Up';

//SUBSCRIBE MODAL
export const SUBSCRIBE_CONFIRMATION = `By clicking continue you agree to receive daily emails featuring local
service, shopping and travel offers and accept our <a href="/page/termsofuse" target="_blank"> Terms of Use </a>
and <a href="/page/privacypolicy" target="_blank"> Privacy & Cookies Policy. </a> You can change your preferences and unsubscribe at any time. Our Welcome email includes a link to immediately opt out of any marketing emails.`;
export const CONTINUE = `Continue`;

// MY ACCOUNT TEXTS
export const LOGIN = 'Login';
export const LOGOUT = 'Logout';
export const LOGIN_REGISTER = 'Not yet signed up?';
export const LOGIN_REGISTER_LINK = 'Register here.';
export const SIGN_IN_WITH_GOOGLE = `Sign in with Google`;
export const SIGN_UP_WITH_GOOGLE = `Sign up with Google`;
export const SIGN_IN_WITH_FACEBOOK = 'Sign in with Facebook';
export const SIGN_IN_WITH_FACEBOOK_ONLY =
  'you previously logged in with Facebook';
export const REQUIRED_FIELD = 'Required field';
export const ENTER_VALID_EMAIL = 'Please enter a valid email';
export const PASSWORD_6_CHARACTERS = 'Password must be at least 6 characters';
export const CREATE_PASSWORD_FOR_THIS_ACCOUNT =
  'Create a password for this account';
export const LOGIN_PRIVACY_POLICY = {
  wowcher: `By logging in you agree to continue to receive daily emails featuring local service, shopping and travel offers from Wowcher. You can change your preferences and unsubscribe at any time by clicking on the unsubscribe option in the email itself or in the email preference centre. View our Privacy &amp; Cookie Policy <a href="/page/privacypolicy" data-qa="privacyAndCookiesPolicy" target="_blank">here</a>.`,
  'living-social': `By logging in you agree to continue to receive daily emails featuring local service, shopping and travel offers from LivingSocial. You can change your preferences and unsubscribe at any time by clicking on the unsubscribe option in the email itself or in the email preference centre. View our Privacy &amp Cookie Policy <a href="/page/privacypolicy" data-qa="privacyAndCookiesPolicy" target="_blank">here</a>.`,
};
export const FORGOT_YOUR_PASSWORD = 'Forgot your password?';
export const YOUR_EMAIL = 'Your Email';
export const MYACCOUNT_FOOTER_TEXT = {
  wowcher: `<p class="copyright  ng-binding">© 2020, Wowcher  Limited. All rights reserved.</p>
               <p class="footer__text">
                Subject to status.
                Terms and conditions apply.
                Wowcher Limited acts as a broker and offers credit from PayPal Credit.
                PayPal Credit is a trading name of PayPal (Europe) S.à.r.l. et Cie, S.C.A.,22-24 Boulevard Royal L-2449, Luxembourg.
              </p>
              <a href="/page/termsofuse">Terms of use</a>,
              <a href="/page/privacypolicy">Privacy &amp; Cookies policy</a>,
              <a href="/page/e-commerceterms">E-commerce terms</a>,
              <a href="/page/internetsafety">Internet safety</a>,
              <a href="/page/uk-modern-slavery-act-transparency-statement">UK Modern Slavery Act</a>.`,
  'living-social': `<p class="copyright ng-binding">© 2020, Wowcher Limited. All rights reserved.</p>
          <p class="footer__text">
            Subject to status. 
            Terms and conditions apply. 
            Wowcher Limited acts as a broker and offers credit from PayPal Credit. 
            PayPal Credit is a trading name of PayPal (Europe) S.à.r.l. et Cie, S.C.A.,22-24 Boulevard Royal L-2449, Luxembourg.
          </p>
          <a href="/page/termsofuse">Terms of use</a>,
          <a href="/page/privacypolicy">Privacy &amp; Cookies policy</a>,
          <a href="/page/e-commerceterms">E-commerce terms</a>,
          <a href="/page/internetsafety">Internet safety</a>,
          <a href="/page/uk-modern-slavery-act-transparency-statement">UK Modern Slavery Act</a>.`,
};

export const DEALS_SUBSCRIPTION = 'Deals subscription';
export const AN_ERROR_OCCURED = 'An error occured';
export const INVALID_GOOGLE_TOKEN_ID = 'Invalid google token id';

// REGISTRATION
export const REGISTER = 'Register';
export const REGISTER_LOGIN = 'Already registered?';
export const REGISTER_LOGIN_LINK = 'Login here.';
export const SOCIAL_MESSAGE = 'It only takes a minute...';
export const FIRST_TIME_BUYER = 'First time buyer';
export const FIRST_TIME_BUYER_LINK = 'First time buyer?';
export const DETAIL_TITLE_OR = 'Or';
export const DETAIL_LOGIN = 'Login';
export const DETAIL_LOGIN_HERE = 'Login here';
export const USER_EXISTS =
  'You have already registered with us. Please login to continue.';
export const USER_DOESNT_EXISTS =
  'You have not yet registered with us. Please register to continue.';
export const REGISTER_PRIVACY_POLICY = {
  wowcher: `By creating an account you agree to receive daily emails featuring local service, shopping and travel offers from Wowcher. You can change your preferences and unsubscribe at any time by clicking on the unsubscribe option in the email itself or in the email preference centre. Our Welcome email includes a link to immediately opt out of any marketing emails. View our Privacy &amp; Cookie Policy <a href="/page/privacypolicy" data-qa="privacyAndCookiesPolicy" target="_blank">here</a>.`,
  'living-social': `By creating an account you agree to receive daily emails featuring local service, shopping and travel offers from LivingSocial. You can change your preferences and unsubscribe at any time by clicking on the unsubscribe option in the email itself or in the email preference centre. Our Welcome email includes a link to immediately opt out of any marketing emails. View our Privacy &amp; Cookie Policy <a href="/page/privacypolicy" data-qa="privacyAndCookiesPolicy" target="_blank">here</a>.`,
};
export const REGISTER_MATCH_PASSWORD = PASSWORDS_SHOULD_MATCH;
export const REGISTER_NOTIFICATION =
  'You can confirm your delivery address once you place your order';

// LOCKED ACCOUNT
export const LOCKED_ACCOUNT = (link) =>
  `Your account has been temporarily locked.
   Please try again later or <a href=${link}><b>reset your password</b></a> to unlock it.`;

// REGISTRATION FORM
export const FORM_EMAIL = 'Email';
export const FORM_PASSWORD = 'Password';
export const REGISTRATION_FIRST_NAME = 'First Name';
export const REGISTRATION_LAST_NAME = 'Last Name';
export const REGISTRATION_ADDRESS = 'Select your billing address';
export const LOOKUP_ADDRESS = 'Lookup address';
export const REGISTRATION_ADDRESS_1 = 'Address Line 1';
export const REGISTRATION_ADDRESS_2 = 'Address Line 2';
export const REGISTRATION_CITY = 'City';
export const REGISTRATION_EIRCODE = 'Eircode';
export const REGISTRATION_CONFIRM_PASSWORD = 'Confirm Password';
export const REGISTRATION_RULE = 'minimum 6 characters';
export const REGISTER_ENTER_VALID_EMAIL = 'Enter a valid email';
export const REGISTER_ENTER_VALID_POSTCODE = 'Enter a valid postcode';
export const REGISTER_POSTCODE_DOESNT_EXIST = `The postcode you entered doesn't exist. Please enter your address manually below`;
export const REGISTER_BUTTON = 'Proceed';
export const REGISTER_LOOKUP_ERROR = `An error occurred looking up your postcode. Please enter your address manually.`;
export const REGISTER_ENTER_MANUALLY = 'Enter address manually?';
export const REGISTER_TRY_LATER = 'An error occurred. Please try again later.';
export const REGISTER_ERROR_OCCURRED = 'An error occurred.';
export const REGISTER_SUCCESSFULLY = 'You have been successfully registered.';
export const LOOKUP_OR_ENTER_ADDRESS = 'Lookup address or enter one manually';

export const TITLE_INDEX = {
  wowcher: 'Wowcher React App',
  'living-social': 'LivingSocial React App',
};

export const TITLE_LOGIN = {
  wowcher: 'Wowcher | Login',
  'living-social': 'LivingSocial | Login',
};
export const TITLE_REGISTER = {
  wowcher: 'Wowcher | Register',
  'living-social': 'LivingSocial | Register',
};
export const MENU = 'Menu';

// These text can be different
export const COUNTDOWN_TEXT = {
  wowcher: 'Deals Refresh In',
  livingsocial: 'deals refresh in',
  livingsocialie: 'deals refresh in',
};
export const INITIAL_COUNTDOWN_TIME = '00:00:00:00';

// Claim your gift
export const CLAIM_GIFT_TITLE = 'Claim your gift!';
export const CLAIM_GIFT_TEXT = `
<p class="right-padding">Enter the code from your gift email to claim your e-voucher.</p>
<p>Your e-voucher PDF will then be sent to your registered email address. Follow the instructions on the voucher to redeem it and enjoy!</p>`;
export const CLAIM_GIFT_IMAGE_ALT = {
  wowcher: 'Wowcher gift redeem',
  livingsocial: 'LivingSocial gift redeem',
  livingsocialie: 'LivingSocial gift redeem',
};
export const CLAIM_GIFT_PLACEHOLDER = 'Enter your code here';
export const CLAIM_GIFT_BUTTON = 'Claim gift';
export const CLAIM_GIFT_ERROR = 'Gift code not recognized. Please try again';
export const CLAIM_GIFT_CODE_ACCEPTED = `<p><b>Congratulations!</b> Your gift has been successfully claimed.</p>
  <p>Please check your inbox for your voucher PDF.</p>`;
export const CLAIM_GIFT_CONTINUE_SHOPPING = 'Continue shopping';

// GIFT CARD
export const GIFT_CARD_TITLE = {
  giftCardTitle: 'Wowcher Gift card',
  redeemTitle: 'Redeem your Gift card',
};
export const GIFT_CARD_TEXT = {
  giftCardTxt: `
    <ul>
      <li>Wowcher gift cards are only redeemable for Wowcher Wallet Credit to be used online at <a href="https://www.wowcher.co.uk">https://www.wowcher.co.uk</a>.</li>
      <li>Wowcher gift cards cannot be exchanged for cash.</li>
      <li>Wowcher gift cards not redeemed for Wowcher Wallet Credit within 6 months from the date of purchase, will expire.</li>
      <li>Wowcher Wallet Credit will expire 12 months after the date of redemption.</li>
      <li>Should the Wowcher gift card be gifted, it is the purchaser's responsibility to ensure that the recipient of the card is aware of the expiry dates.</li>
      <li>View our full <a href="/page/giftcardterms">Gift card terms and conditions</a></li>
    </ul>`,
  redeemTxt: `
    <p>
      <span class="gift-card__spacer"></span>
      Enter the code from your gift card to redeem for Wowcher Wallet Credit. The value will appear in your Wowcher Wallet immediately after redeeming.
    </p>
    <p>N.B. Codes are case sensitive. Please enter your code exactly as it appears on the card.</p>
  `,
};
export const GIFT_CARD_PLACEHOLDER = 'Enter your code here';
export const GIFT_CARD_BUTTON = 'REDEEM';
export const GIFT_CARD_RESPONSE = {
  redeem: {
    success: 'Gift card code has been successfully redeemed!',
    error: 'An unexpected error occurred, please try again later.',
  },
  wallet: {
    success: `You've successfully redeemed your Gift card. Your updated ${process.env.NEXT_PUBLIC_BRAND} balance is below.`,
    error: `An error occured fetching your ${process.env.NEXT_PUBLIC_BRAND} details.`,
  },
};
export const GIFT_CARD_WALLET = {
  walletHeader: {
    title: 'Success!',
    subTitle: 'View wallet history',
    subUrl: `${LINKS_GLOBAL_WOWCHER_ENV}/myaccount/wallet`,
  },
  walletContent: {
    title: 'Wowcher Wallet',
    text: 'Credit for purchases',
    altImg: 'wallet',
  },
  walletBtn: 'REDEEM ANOTHER GIFT CARD',
};

// MINI MENU
// links
const MINI_MENU_DETAILS = `${LINKS_GLOBAL_WOWCHER_ENV}/myaccount/profile`;
const MINI_MENU_CREDIT = `${LINKS_GLOBAL_WOWCHER_ENV}/myaccount/credit`;
export const MINI_MENU_VOUCHER = `${LINKS_GLOBAL_WOWCHER_ENV}/myaccount/vouchers`;
export const MINI_MENU_WALLET = `${LINKS_GLOBAL_WOWCHER_ENV}/myaccount/wallet`;
const MINI_MENU_REWARDS = `${LINKS_GLOBAL_WOWCHER_ENV}/myaccount/rewards`;
const MINI_MENU_REDEEM = `${LINKS_GLOBAL_WOWCHER_ENV}/giftcard/redeem`;
const MINI_MENU_MYGIFT = `${LINKS_GLOBAL_WOWCHER_ENV}/mygift`;
const MINI_MENU_NEED_HELP = `${LINKS_GLOBAL_WOWCHER_ENV}/needhelp`;
const MINI_MENU_LOGOUT = `${LINKS_GLOBAL_WOWCHER_ENV}/logout`;
const MINI_MENU_BECOME_MERCHANT = `${LINKS_GLOBAL_WOWCHER_ENV}/page/businessfaq`;
// labels
const MINI_MENU_LABEL_DETAILS = 'View account details';
const MINI_MENU_LABEL_CREDIT = 'Claim credit';
const MINI_MENU_LABEL_GIFT = 'Claim a gift';
const MINI_MENU_LABEL_BECOME_MERCHANT = 'Become a merchant';
export const MINI_MENU_LABEL_MERCHANT_AREA = 'Merchant Area';

export const MINI_MENU = {
  wowcher: [
    { name: 'My Wowchers', value: MINI_MENU_VOUCHER },
    { name: MINI_MENU_LABEL_DETAILS, value: MINI_MENU_DETAILS },
    { name: MINI_MENU_LABEL_CREDIT, value: MINI_MENU_CREDIT },
    { name: 'My Wowcher Wallet', value: MINI_MENU_WALLET },
    { name: 'Club Wowcher', value: MINI_MENU_REWARDS },
    { name: 'Redeem a gift card', value: MINI_MENU_REDEEM },
    { name: MINI_MENU_LABEL_GIFT, value: MINI_MENU_MYGIFT },
    { name: MINI_MENU_LABEL_BECOME_MERCHANT, value: MINI_MENU_BECOME_MERCHANT },
  ],
  livingsocial: [
    { name: 'My vouchers', value: MINI_MENU_VOUCHER },
    { name: MINI_MENU_LABEL_DETAILS, value: MINI_MENU_DETAILS },
    { name: MINI_MENU_LABEL_CREDIT, value: MINI_MENU_CREDIT },
    { name: 'My living social wallet', value: MINI_MENU_WALLET },
    { name: MINI_MENU_LABEL_GIFT, value: MINI_MENU_MYGIFT },
  ],
  livingsocialie: [
    { name: 'My vouchers', value: MINI_MENU_VOUCHER },
    { name: MINI_MENU_LABEL_DETAILS, value: MINI_MENU_DETAILS },
    { name: MINI_MENU_LABEL_CREDIT, value: MINI_MENU_CREDIT },
    { name: 'My living social wallet', value: MINI_MENU_WALLET },
    { name: MINI_MENU_LABEL_GIFT, value: MINI_MENU_MYGIFT },
  ],
};

// CHECKOUT
export const TITLE_CHECKOUT = {
  wowcher: 'Wowcher React App | Checkout',
  'living-social': 'LivingSocial React App | Checkout',
};
export const YOUR_BASKET = 'Your Basket';
export const YOUR_BASKET_IS_EMPTY = 'Your basket is empty!';
export const BROWSE_GREAT_DEALS_AND =
  'Browse some of our great deals and add them to your basket today.';
export const BROWSE_GREAT_DEALS_OR = 'Browse some of our great deals or';
export const TO_SEE_SAVED_ITEMS = 'to see saved items.';
export const CONTINUE_SHOPPING = 'Continue Shopping';
export const TIME_REMAINING = 'Time remaining';
export const REFRESHING = 'Refreshing';
export const PRICES_CONFIRMED = 'Prices Confirmed!';
export const NO_QUIBBLE = {
  wowcher: 'No quibble 14 day refund guarantee on unredeemed Wowchers',
  livingsocial: 'No quibble 14 day refund guarantee on unredeemed vouchers',
  livingsocialie: 'No quibble 14 day refund guarantee on unredeemed vouchers',
};
export const CHANGE_YOUR_MIND =
  'Change your mind? You can redeem this towards any other deal on site';
export const CUE_ATOL_PROTECTED =
  'ATOL Protected - Financial protection through the UK ATOL Scheme';
export const CUE_ATOL_INSTANT = 'Instant Booking - No redemption required';
export const ATOL_LOGO_ALT = 'Atol logo';
export const ORDER_SUMMARY = 'Order Summary';
export const PAYMENT = 'Payment';
export const YOUR_DETAILS = 'Your Details';
export const SAVE = 'Save';
export const DEPOSIT = 'Deposit';
export const NOW = 'Now';
export const WAS = 'was';
export const ONLY = 'only';
export const QUANTITY = 'Quantity';
export const SUBTOTAL = 'Subtotal';
export const FREE = 'FREE';
export const DELETE = 'Delete';
export const SELECT_QUANTITY = 'Select Quantity';
export const GIFTING_OPTIONS = 'Gifting Options';
export const SHOW_GIFTING_INFO = 'Show gifting information';
export const GIFT_PACK_INCLUDES = 'Gift Pack Includes';
export const GIFT_PACK_INCLUDES_BULLETS = [
  'Sleek pink presentation wallet',
  'Personalised message',
  'Highlights and images from your chosen gift',
  'First class postage (delivery within 3 working days)',
];
export const GIFT_WRAP_INCLUDES = 'Gift Wrap Includes';
export const GIFT_WRAP_INCLUDES_BULLETS = [
  'Your present will arrive in a Christmas themed bag at your recipients address',
  'Every bag will have a ribbon closure',
  'We will ensure the best sized bag is chosen for your gift',
  'Each sized bag has a different Christmas design',
  'You can include a personalised message',
  'Your message will be printed and attached to the bag',
];
export const GIFT_PACK_ALT = 'Gift pack example';
export const GIFT_WRAP_ALT = 'Gift wrap example';
export const BASED_ON_SHARING = 'This deal is based on 2 people sharing';
export const GIVE_AS_A_GIFT = 'Give as a gift';
export const BUY_AS_A_GIFT = 'buy as a gift';
export const DATE = 'Date';
export const CHECK_IN = 'Check In';
export const CHECK_OUT = 'Check Out';
export const DEPOSIT_PAY_FULL = 'Pay Full Amount:';
export const DEPOSIT_PAY_DEPOSIT = 'Pay Deposit:';
export const DEPOSIT_PAY_TO_MERCHANT = 'to be paid to merchant';
export const GET_IT_BY = 'get it by';
export const MUST_REDEEM_TODAY =
  'Redeem today for delivery by specified date. Delivery price per voucher.';
export const PLEASE_CHOOSE_ONE_PRODUCT = 'Please choose at least one product';
export const PROCEED = 'Proceed';
export const DEAL_BASKET_MAX_PRODUCT =
  "You've already purchased the max quantity for these products. <strong>They will be removed at purchase.</strong>";

// CHECKOUT - Payment
export const CARD_BUTTON_TEXT = 'Pay with Card';
export const PAYPAL_BUTTON_TEXT = 'Pay with PayPal';
export const GOOGLE_BUTTON_TEXT = 'Pay with Google Pay';
export const APPLE_BUTTON_TEXT = 'Pay with Apple Pay';
export const CARD_BUTTON_IMG_TEXT = 'Credit Card';
export const PAYPAL_BUTTON_IMG_TEXT = 'PayPal';
export const GOOGLE_BUTTON_IMG_TEXT = 'Google Pay';
export const APPLE_BUTTON_IMG_TEXT = 'Apple Pay';
export const PAYPAL_CREDIT_BUTTON_IMG_TEXT = 'PayPal Credit';
export const PAYPAL_FORM_MESSAGE =
  'You will be redirected to PayPal to complete the payment.';
export const GOOGLE_FORM_MESSAGE =
  "Tap the 'Google Pay' button below and confirm your purchase.";
export const APPLE_FORM_MESSAGE =
  "Tap the 'Apple Pay' button below and confirm your purchase with Touch ID or Face ID on your Apple device.";
export const I_AGREE = 'I agree to the';
export const BASKET_SUMMARY_TOTAL = 'Basket Total';
export const BASKET_SUMMARY_ITEMS = 'items';
export const PAYMENT_LOGIN_MESSAGE = 'Login or register to complete purchase.';
export const PAYMENT_NO_PURCHASABLE_MESSAGE =
  'You have no purchasable products in your basket.';
export const BUTTON_PLACE_ORDER = {
  wowcher: 'PLACE YOUR ORDER',
  livingsocial: 'place your order',
  livingsocialie: 'place your order',
};
export const BUTTON_GO_TO_PAYMENT = 'GO TO PAYMENT';
export const BUTTON_PAYPAL = 'Continue to';
export const BUTTON_PAYPAL_CREDIT = 'Continue with';
export const BUTTON_APPLE = 'Pay with';
export const CARD_TOGGLE_ANOTHER_PRE = 'Or ';
export const CARD_TOGGLE_ANOTHER_LINK = 'use another card';
export const CARD_TOGGLE_ANOTHER_DATA_QA = 'changeCard';
export const CARD_TOGGLE_SAVED_PRE = 'You can also ';
export const CARD_TOGGLE_SAVED_LINK = 'use your saved card';
export const CARD_TOGGLE_SAVED_DATA_QA = 'useSavedCard';
export const CARD_TOGGLE_SEE_ALL_CARDS = 'see all your cards';
export const CARD_FLEXFORM_CONTAINER_ID = 'cardNumber-container';
export const CARD_INPUT_NAME = 'cardNumber';
export const CARD_INPUT_DATA_QA = 'cardNumber';
export const CARD_INPUT_PLACEHOLDER = 'Long card number';
export const CARD_INPUT_ARIA_LABEL = 'Long card number';
export const CARD_ERROR_EXPIRED = 'Card Expired';
export const CARD_ERROR_REQUIRED = 'Sorry, Credit Card number is required';
export const CARD_ERROR_INVALID = "Hmm. That card number doesn't look right";
export const CARD_ERROR_DATE_NOT_VALID = 'This expiry date is not valid';
export const CARD_ERROR_TYPES =
  'Sorry, we currently only accept Visa and MasterCard';
export const CVV_INPUT_NAME = 'cardCvv';
export const CVV_INPUT_DATA_QA = 'securityCode';
export const CVV_INPUT_PLACEHOLDER = 'Security code';
export const CVV_INPUT_ARIA_LABEL = 'Security code';
export const CVV_INFO_ERROR =
  'Please enter your security code (last 3 digits on the\n' +
  '                        back of the card)';
export const CVV_ERROR_REQUIRED = 'Security code is required';
export const CVV_ERROR_LENGTH = 'Security code requires ##numdigits## digits';
export const CVV_ERROR_INVALID = 'Please enter a valid security code';
export const MONTH_INPUT_NAME = 'cardExpiryMonth';
export const MONTH_INPUT_DATA_QA = 'expiryMonth';
export const MONTH_INPUT_ARIA_LABEL = 'Card Expiry Month';
export const MONTH_ERROR_REQUIRED = 'Month is required';
export const YEAR_INPUT_NAME = 'cardExpiryYear';
export const YEAR_INPUT_DATA_QA = 'expiryYear';
export const YEAR_INPUT_ARIA_LABEL = 'Card Expiry Year';
export const YEAR_ERROR_REQUIRED = 'Year is required';
export const DEFAULT_PAYMENT_ERROR =
  'There was a problem with your payment and your order has not been placed. Please check your details and try again. If the issue persists please contact us for assistance.';
export const ERROR_MESSAGE_BRAINTREE =
  'We had a problem completing your request, please continue your purchase or try again later';
export const LIABILITY_ERROR = `Unfortunately, your payment did not go through. Please try again or select a different payment method`;
export const POSTAL_CODE_REQUIRED = 'Postal code is required';
// CHECKOUT - Your details
export const DETAILS_BILLIND_ADDRESS = 'Billing address';
export const DETAILS_CHANGE_ADDRESS = 'Change address';
export const DETAILS_UPDATE_ADDRESS = 'Update address';
export const DETAILS_ADD_ADDRESS = 'Add address';
export const BUTTON_CANCEL = 'Cancel';
export const DETAILS_ADDRESS_IS_UPDATED = `Billing address updated successfully!`;
export const DETAILS_ADDRESS_UPDATE_ERROR = `Billing address wasn't updated`;

// SUBSCRIBE DIALOG
export const SUBSCRIBE_LEGAL_TEXT = {
  wowcher: `By clicking GO TO DEALS!, LOGIN or Sign Up With Google you agree to receive daily emails
            featuring local service, shopping and travel offers from Wowcher.
            You can change your preferences and unsubscribe at any time by
            clicking on the unsubscribe option in the email itself or in the
            email preference centre. Alternatively, press ESC or refresh the
            page to go directly to the site. View our Privacy &amp; Cookie
            Policy&nbsp;
            <a
              href='${
                LINKS_GLOBAL_WOWCHER[
                  process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'
                ][process.env.NEXT_PUBLIC_SITE || 'wowcher']
              }/page/privacypolicy'
              target="_blank"
              rel="noreferrer noopener"
            >
              here.</a>`,
  'living-social': `By clicking GO TO DEALS!, LOGIN or Sign Up With Google you agree to receive daily emails
              featuring local service, shopping and travel offers from LivingSocial.
              You can change your preferences and unsubscribe at any time by
              clicking on the unsubscribe option in the email itself or in the
              email preference centre. Alternatively, press ESC or refresh the
              page to go directly to the site. View our Privacy &amp; Cookie
              Policy&nbsp;
              <a
                href='${
                  LINKS_GLOBAL_WOWCHER[
                    process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'
                  ][process.env.NEXT_PUBLIC_SITE || 'wowcher']
                }/page/privacypolicy'
                target="_blank"
                rel="noreferrer noopener"
              >
                here.</a>`,
};

export const TOASTRMSG = 'An unexpected error occured. Please try again later.';
export const TOASTRMSGINVALIDEMAIL =
  'Invalid Email. Please enter a valid email address';
export const AND = 'AND';
export const CLOSE = 'Close';
export const SAVE_80_WHERE_YOU_LIVE = 'Save up to 80% where you live';
export const GO_TO_DEALS = 'go to deals';
export const ALL_CAT_PAGE = 'All ##word## deals';

// DEALS
export const FROM = 'From';
export const VIEW_AVAILABILITY = 'View Availability';
export const OPTIONS = 'options';
export const CHOOSE_YOUR_OPTIONS = 'Choose your options';
export const QUICK_BUY = 'Quick Buy!';
export const BUY = 'Buy';
export const BUY_EXCL = 'BUY!';
export const BUYNOW = 'Buy now';
export const BUYNOW_EXCL = 'BUY NOW!';
export const PLEASE_CHOOSE = 'Please choose';
export const PLEASE_CHOOSE_ONE_OPTION = 'Please choose one of the options';
export const VIEW = 'View';
export const POSTAGE_AND_PACKAGING_SHORT = 'P&P';
export const SOCIAL_CUE_TOTAL_BOUGTH = '##COUNT## Bought';
export const SOCIAL_CUE_TOTAL_REMAINING = '##COUNT## Remaining';
export const LIMITED_AVAILABILITY = 'Limited availability';
export const NEW_DEAL_TODAY = 'New deal today';
export const NEW_DEAL = 'New deal';
export const TODAY = 'today';
export const SOLD_OUT = 'SOLD OUT';
export const AUTHENTIC = {
  wowcher: 'The authenticity of this product has been verified by Wowcher',
  'living-social':
    'The authenticity of this product has been verified by Living Social',
};
export const HIGHLIGHTS = 'Highlights';
export const PRODUCT_FEATURES = 'Product Features';
export const PRODUCT_SPECIFICATIONS = 'Product Specifications';
export const FULL_DETAILS = 'Full Details';
export const FINE_PRINT = 'The Fine Print';
export const HOW_TO_REDEEM = 'How To Redeem';
export const SEE_MORE = 'See more';
export const SEE_LESS = 'See less';

export const EXPANDER_MORE = 'Read more';
export const EXPANDER_LESS = 'Read less';
export const EXPANDER_MORE_MOBILE = 'More';
export const EXPANDER_LESS_MOBILE = 'Less';
export const GO_TO_DEAL = 'Go to ##DEAL## deal';
export const NO_SEARCH_RESULTS =
  "There were no search results for <span class='search-results__term'>'##TEXT##'</span>. Here are today's top deals instead:";
export const NO_FILTER_RESULTS =
  'There were no results for your selected filters. Please broaden your search and try again.';

export const SAVE_UP_TO = 'Save up to';
export const FILTER_SORT_BY = 'Sort by';
export const FILTER_PRICE = 'Filter by price';
export const UP_TO = 'up to';
export const APPLY = 'Apply';
export const CLEAR = 'Clear';
export const FEATURED_DEAL_TITLE = 'Featured Deal!';
export const IMAGE_NOT_FOUND_ALT = 'Image not found';
export const SHARE = 'Share';
export const SHARE_ON_FACEBOOK = 'Share on Facebook';
export const SHARE_ON_TWITTER = 'Share on Twitter';
export const SHARE_ON_PINTEREST = 'Share on Pinterest';
export const SHARE_ON_WHATSAPP = 'Share on WhatsApp';
export const SHARE_BY_EMAIL = 'Share by email';
export const LOCATION = 'Location';
export const PAYPAL_CREDIT_ALT = 'PayPal credit logo';
export const PAYPAL_CREDIT_TEXT =
  '0% interest for 4 months available on this purchase.';
export const PAYPAL_CREDIT_UNMET_TEXT =
  'Spend £99 or more to enjoy 0% interest for 4 months.';
export const PAYPAL_CREDIT_LINK_TEXT = 'Click for details.';
export const STAR_RATING = 'star rating';
export const ANON_USER = 'Anonymous User';
export const PERCT_OFF = '% off';
export const CALL_TO_BOOK = 'Call to book';
export const EXPIRED_DEAL = `The deal you tried to view has expired, so we're showing you this similar deal instead.`;

export const DEAL_WILL_BE_ADVERTISED =
  'This deal will be advertised on site until';
export const PRICE_MAY_CHANGE = 'Price is subject to change.';

// SOLD OUT BANNER
export const BANNER_TITLE = 'Out of stock!';
export const BANNER_TEXT =
  'We will notify you when this product becomes available.';
export const BANNER_BUTTON = 'notify me';
export const BANNER_SHOW_LINK = 'See Deal Detail +';
export const BANNER_HIDE_LINK = 'Hide deal detail -';
export const BANNER_PLACEHOLDER = 'Email Address';

// MERCHANDISING MODULES
export const SHOP_NOW = 'SHOP NOW';
export const SHOP_ALL_DEALS = (moduleName) => `Shop all ${moduleName} deals`;

// TYPE
export const TYPE_CATEGORY_DEALS = 'CATEGORY_DEALS';
export const TYPE_CATEGORY_DEAL = 'CATEGORY_DEAL';

// PROMO
export const PROMO_ADD = 'Add promo code';
export const PROMO_APPLY = 'APPLY';
export const PROMO_REMOVE = 'REMOVE';
export const PROMO_PLACEHOLDER = 'PROMO CODE';
export const PROMO_NOT_AUTHENTICATED =
  'Please register or log in to apply promo code';

// SUMMARY
export const SUMMARY_SUBTOTAL = 'Subtotal:';
export const SUMMARY_ADMIN_FEE = 'Administration fee:';
export const SUMMARY_GIFT_PACK = 'Gift pack:';
export const SUMMARY_GIFT_WRAP = 'Gift wrap:';
export const SUMMARY_POST_PACKAGING = 'Post & Packaging:';
export const SUMMARY_POSTAGE_CALCULATED = 'How is postage calculated?';
export const SUMMARY_POSTAGE_CHARGE = (value) =>
  `We will only charge for postage on the ${value} items with the most expensive postage. The rest comes free!`;
export const SUMMARY_PROMO_DISCOUNT = (discount) =>
  `Promo code (${discount}%):`;
export const SUMMARY_TOTAL_TO_PAY = 'Total to pay:';
export const SUMMARY_CONGRATULATIONS = 'Congratulations, ';
export const SUMMARY_YOU_SAVED = 'you have saved:';
export const SUMMARY_BALANCE_OF = 'Balance of ';
export const SUMMARY_MERCHANT = ' to be paid to merchant(s)';
export const SUMMARY_POSTAGE_DISCOUNT =
  'Add more items to receive a discount on postage';
export const SUMMARY_CREDIT_APPLIED = 'Credit applied:';
export const SUMMARY_TOTAL_PAY_TODAY = 'Total to pay today:';

// REDEEM CODE
export const REDEEM_CODE_ORDER_NO = 'Order Number:';
export const REDEEM_CODE_WOWCHER_CODE = (value) => `${value} Code:`;
export const REDEEM_CODE_ORDER_ERROR = 'Please enter a valid Order Number';
export const REDEEM_CODE_ORDER_REQUIRED = 'Order Number is required';
export const REDEEM_CODE_WOWCHER_CODE_REQUIRED = (value) =>
  `${value} Code is required`;
export const REDEEM_CODE_WOWCHER_CODE_ERROR = (value) =>
  `Please enter a valid ${value} code`;
export const REDEEM_CODE_CONFIRM_MERCHANT =
  'I confirm that I have not redeemed this code with the merchant';
export const REDEEM_CODE_BTN_CONFIRM = 'Confirm';
export const REDEEM_CODE_BTN_CANCEL = 'Cancel';
export const REDEEM_CODE_BTN_DONE = 'DONE';
export const REDEEM_CODE_UNUSED_WOWCHER = (value) =>
  `Redeem an unused ${value} code towards this purchase`;

// CREDIT CLAIM
export const CREDIT_CLAIM_FULL_CREDIT_REFUND =
  'Please confirm that you would like us to proceed with this request. If you have changed your mind, just press Cancel to return to the main page.';
export const CREDIT_CLAIM_NON_REFUNDABLE = (value) =>
  `Note: Part of your purchase was made with ${value} of non-refundable credit.`;
export const CREDIT_CLAIM_TOWARDS_DEAL = (preString, value) =>
  `Your ${preString} has been redeemed towards your purchase to the value of <strong>${value}</strong>`;
export const CREDIT_CLAIM_NOT_TOWARDS_DEAL = (preString, value) =>
  `Your ${preString} has been redeemed for <strong>${value}</strong> of credit. This is now available in your account.`;
export const CREDIT_CLAIM_NOT_TOWARDS_DEAL_RETURN = (preString) =>
  `To return to the My ${preString} page, just click Done below.`;
export const CREDIT_CLAIM_ERROR_CURRENCIES = (preString) =>
  `The ${preString} and deal currencies don't match.`;

// CREDIT
export const CREDIT_MSG_PURCHASE = (value) =>
  `Use my ${value} credit for this purchase`;
export const CREDIT_MSG_LARGE = (totalWallet, amountInWallet) =>
  `Use ${totalWallet} of my ${amountInWallet} credit for this purchase`;
export const CREDIT_MSG_ZERO = (value) =>
  `Use my ${value} credit for this purchase`;
export const CREDIT_MSG_CANNOT = (value) =>
  `(${value} marketing credit cannot be used`;
export const CREDIT_MSG_ALLOWED = ' with a promo code)';
export const CREDIT_MSG_NOT_ALLOWED = ' for this purchase)';

// SOCIAL CUES
export const SOCIAL_CUES_MAY_INCREASE =
  'This price may increase if you buy later';

// Lightbox
export const GOOGLE_SIGN_UP_ALT = 'Sign up with Google';
export const SUBSCRIPTION_EMAIL_IS_REQUIRED = 'Subscription email is required';
export const PLEASE_WAIT = 'Please wait...';
export const SUBSCRIPTION_SUCCESSFUL = 'Email registered';
export const SUBSCRIPTION_FAIL = `Email wasn't registered`;

// Error pages
export const TEXT_404_SERIOUSLY =
  '##STATUSCODE## - seriously, so embarrassing.';
export const TEXT_404_LOOKS_LIKE =
  'Looks like the page you are looking for is temporarily unavailable.';
export const TEXT_404_CONTINUE_SHOPPING = 'Continue shopping';
export const PAGE_NOT_FOUND = 'Page not found';
export const OR_SEARCH_INSTEAD = 'Or search our site here instead';
export const PAGE_ERROR_TITLE = 'Page not found';

// Default SEO texts
// export const DEFAULT_SEO_TEXT =
//  'Browse our deals and offers and save up to 80%. Where you’re spoiling yourself or treating someone else, you’re sure to find that perfect deal in our sale.';
export const DEFAULT_SEO_TEXT = '';
export const DEFAULT_SEO_TEXT_CATEGORY =
  'Browse our ##CATEGORY## deals and offers and save up to 80%. Where you’re spoiling yourself or treating someone else, you’re sure to find that perfect deal in our ##CATEGORY## sale.';
export const DEFAULT_SEO_TEXT_SUBCATEGORY =
  'Browse our ##SUBCATEGORY## deals and offers and save up to 80%. Where you’re spoiling yourself or treating someone else, you’re sure to find that perfect deal in our ##SUBCATEGORY## sale.';

// get preformatted strings
const getPreformattedStrings = () => {
  const brand = process.env.NEXT_PUBLIC_BRAND;
  const isBrandWowcher = brand === 'wowcher';

  return {
    brandTerminology: {
      wowcher_or_voucher: isBrandWowcher ? brand : 'voucher',
      wowchers_or_vouchers: isBrandWowcher ? `${brand}s` : 'vouchers',
    },
  };
};

export const PREFORMATTED_STRINGS = getPreformattedStrings();

// Infinite scroll
export const HIDE_FOOTER = 'Hide footer';
export const SHOW_FOOTER = 'Show footer';
export const PAGE_TEXT = 'Page';
export const BACK_TO_TOP = 'Back to top';

// Invasive Health
export const IHEALTH_TITLE = `${
  BRAND_NAME[process.env.NEXT_PUBLIC_BRAND]
} Wellbeing`;
export const IHEALTH_TITLE_NOHURRY = "There's no hurry";
export const IHEALTH_TEXT_NOHURRY =
  "Our health offers are here for longer so you've got time to make the right decision.";
export const IHEALTH_TITLE_TIMETOTHINK = 'Time to think';
export const IHEALTH_TEXT_TIMETOTHINK =
  'Your voucher is valid for at least six months to give you enough time to consider wether you wish to proceed with the treatment.';
export const IHEALTH_TITLE_NOTSURE = 'Not sure?';
export const IHEALTH_TEXT_NOTSURE =
  "If you change your mind after buying this deal or find you are medically unsuitable, we'll give you a refund.";
export const IHEALTH_TITLE_SAFEHANDS = "You're in safe hands";
export const IHEALTH_TEXT_SAFEHANDS =
  'We only use qualified merchants to ensure you get the best possible care and service. Before redeeming your voucher with a merchant, take the time to do some research to ensure you are happy with them and the products and services that they offer.';

// VAT Text
export const VAT_TEXT_1 = 'This deal is brought to you by ';
export const VAT_TEXT_2 = 'VAT number: ';

//passenger details
export const PASSENGER_DETAILS_HEADING = 'Passenger Details';
export const PASSENGER_DETAILS_NOTE =
  'Please add the passenger details as they appear on your passports.';
export const PASSENGER_DETAILS_REQUIRED = '*required field';
export const PASSENGER_DETAILS_LABEL_CONTACTNO = 'Contact Phone Number';
export const PASSENGER_DETAILS_PLACEHOLDER_CONTACTNO = 'Phone number*';

export const PASSENGER_HEADING = (value) => `Passenger ${value}`;
export const PASSENGER_SELECT_TITLES = [
  { name: 'Title*', value: '' },
  { name: 'Mr', value: 'Mr' },
  { name: 'Mrs', value: 'Mrs' },
  { name: 'Ms', value: 'Ms' },
  { name: 'Miss', value: 'Miss' },
];
export const PASSENGER_PLACEHOLDER_FNAME = 'First name(s)*';
export const PASSENGER_PLACEHOLDER_LNAME = 'Last Name*';
export const PASSENGER_LABEL_DOB = 'Date of Birth';
export const PASSENGER_SELECT_DAYS = 'Days*';
export const PASSENGER_SELECT_MONTHS = 'Months*';
export const PASSENGER_PLACEHOLDER_YEARS = 'Year* (YYYY)';

//forgot password form
export const TITLE_FORGOT_PASSWORD = {
  wowcher: 'Wowcher | Forgot Password',
  'living-social': 'LivingSocial | Forgot Password',
};
export const FORGOT_PASSWORD_TITLE = 'Forgot Password';
export const FORGOT_PASSWORD_PLACEHOLDER = 'Email';
export const FORGOT_PASSWORD_BTN = 'REQUEST RESET PASSWORD LINK ';
export const FORGOT_PASSWORD_ERROR =
  'An unexpected error occured, please try again later.';
export const FORGOT_PASSWORD_RESET_LINK = (value) =>
  `A password reset link has been sent<span> to <em>${value}</em></span>.`;

//reset password form
export const TITLE_RESET_PASSWORD = {
  wowcher: 'Wowcher | Reset Password',
  'living-social': 'LivingSocial | Reset Password',
};
export const RESET_PASSWORD_TITLE = 'Reset Password';
export const RESET_PASSWORD_PLACEHOLDER_PASSWORD = 'Reset Password';
export const RESET_PASSWORD_PLACEHOLDER_CONFIRM = PASSWORDS_SHOULD_MATCH;
export const RESET_PASSWORD_BTN = 'RESET PASSWORD AND LOGIN';
export const RESET_PASSWORD_ERROR_MIN = 'Enter at least 6 characters';
export const RESET_PASSWORD_ERROR_MATCH = PASSWORDS_SHOULD_MATCH;
export const RESET_PASSWORD_ERROR =
  'An unexpected error occured, please try again later.';

// booking
export const BOOKING_STEP_1 = 'Step 1: Choose a date';
export const BOOKING_STEP_2 = 'Step 2: Choose your stay';
export const BOOKING_STEP_3 = 'Step 3: Choose payment option';
export const CLEAR_SELCTION = 'Clear Selection';
export const PRICES_SHOWN_LOWEST =
  'prices shown refer to the lowest priced product';
export const CHOOSE_ARRIVAL = 'Please choose your arrival date';
export const DEPOSIT_AVAILABLE = (price) =>
  `Deposit payment FROM ${price}. Balance to be paid directly to the merchant`;
export const UNAVAILABLE = 'Unavailable';
export const GENERIC_FAILURE = 'Something went wrong. Please try again.';

// video
export const PLAY_VIDEO = 'Play video';
export const PAUSE_VIDEO = 'Pause video';

//vouchers
export const VIEW_HISTORY = 'View history';
export const VIEW_YOUR_WOWCHERS = 'View your Wowchers';

//account options
export const ACCOUNT_OPTIONS_LOWER = [
  { name: 'Need help?', value: MINI_MENU_NEED_HELP },
  { name: 'Logout', value: MINI_MENU_LOGOUT },
];
export const ACCOUNT_OPTIONS_HI = (value) => `Hi ${value}`;

//Wowcher status
export const WOWCHER_STATUS_LIST = [
  {
    title: 'Ready to Redeem',
    desc: 'Print this Wowcher and use it to redeem your deal!',
  },
  {
    title: 'Redeemed',
    desc: 'The voucher has been redeemed',
  },
  {
    title: 'Booked',
    desc:
      'Expect travel documentation from Merchant within 3 working days from booking',
  },
  {
    title: 'Credit Requested',
    desc: 'A credit has been requested',
  },
  {
    title: 'Request Processed',
    desc: 'Redeemed for credit or towards another deal',
  },
  {
    title: 'Refunded',
    desc: 'The voucher has been refunded',
  },
  {
    title: 'Expired',
    desc: 'The voucher expiry date has passed',
  },
];
export const WOWCHER_STATUS_TITLE = 'Wowcher Status';

//My Wowchers
export const MY_WOWCHERS_TITLE = 'My Wowchers';

//Payment Errors
export const ERROR_BANK_UNRESPONSIVE = `We tried to take payment but didn’t get a response from your Bank. Try a different card or use Paypal and then try again.`;
export const ERROR_BILLING_ADDRESS = `Oops, it looks like you’ve typed your billing address incorrectly. Please try again!`;
export const ERROR_CARD_AMEX_DINERS = `We don’t accept American Express / Diners Card so try again using another card type, or use Paypal!`;
export const ERROR_CARD_DECLINED = `Sorry, your card has been declined. Please try another card or payment method.`;
export const ERROR_CARD_DECLINED_BANK = `Sorry, your card has been declined by your bank. Please try another card or payment method.`;
export const ERROR_CARD_DECLINED_DETAILS = `Sorry, your card has been declined. Please check that you entered the details correctly or try another card/payment method.`;
export const ERROR_CARD_EXPIRED = `Oh no, this card has expired! Add a new card or why not try PayPal!`;
export const ERROR_CARD_EXPIRED_NEW_CARD = `Oh no, this card has expired! Add a new card and let’s get this payment sorted.`;
export const ERROR_CARD_INCORRECT_CVV = `Oops, it looks like you’ve typed your CVV incorrectly. Please try again!`;
export const ERROR_CARD_INCORRECT_DATE = `Oops, it looks like you’ve typed your expiry date incorrectly. Please try again!`;
export const ERROR_CARD_INCORRECT_NUMBER = `Oops, it looks like you’ve typed your card number incorrectly. Please try again!`;
export const ERROR_CARD_INCORRECT_SECURITY_CODE = `Oops, it looks like you’ve typed your security code incorrectly. Please try again!`;
export const ERROR_CARD_INCORRECT_ADDRESS = `Oops, it looks like you’ve typed your address incorrectly. Please try again!`;
export const ERROR_PAYPAL_REJECTION = `Sorry, PayPal rejected that transaction. Please check your account or try an alternative payment method.`;
export const ERROR_ISSUER_AUTHENTICATION =
  'Your card issuer cannot authenticate this card. Please select another card or form of payment to complete your purchase.';
export const ERROR_AUTHENTICATION =
  'There was a problem with authentication. Please select another payment method.';

export const POPULATE_CARD_OR_SWITCH = `popOrSwitch`;
export const PAYPAL_OR_SWITCH = `paypalOrSwitch`;
export const POPULATE_EMPTY_CARD_OR_SWITCH = `popEmptyOrSwitch`;
export const SAVED_CARD = `savedCard`;
export const POPULATE_CARD_INPUT = `cardInputPop`;

export const FETCH_DEALS_ERROR = 'FETCH DEALS ERROR';
export const ERROR_FETCHING_DEALS = 'Error fetching deals from the API.';
