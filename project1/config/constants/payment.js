// Payment types, match type from paymentInstruments in checkout API
export const PAYMENT_TYPES = {
  apple: 'apple_pay',
  card: 'credit_card',
  google: 'google_pay',
  paypal: 'paypal',
};

export const PAYMENT_METHODS = {
  applePay: 'ApplePay',
  card: 'Card',
  googlePay: 'GooglePay',
  paypal: 'PayPal',
  payPalCredit: 'PayPal Credit',
};

export const PAYMENT_BUTTON_TRACKING_TYPES = {
  apple: 'choose_apple',
  card: 'choose_card',
  google: 'choose_google',
  paypal: 'choose_paypal',
};

export const PAYMENT_DOD_TRACKING_TYPES = {
  apple: 'Apple Pay',
  card: 'Card',
  google: 'Google Pay',
  paypal: 'PayPal',
};

export const CARD_LENGTH = 16;
export const CVV_LENGTH = 3;

export const MONTH_DEFAULT_VALUE = '00';
export const YEAR_DEFAULT_VALUE = '00';
