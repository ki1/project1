RegExp.escape = function (str) {
  // eslint-disable-next-line no-useless-escape
  return String(str).replace(/([*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};

export const validateEmail = (email) => {
  // We scape the input to avoid Dos
  const textToReview = RegExp.escape(email);
  const emailRegex = /^[^\s@]+@[\w-.]+\.[\w]{2,}$/;
  return emailRegex.test(textToReview);
};

export const validatePassword = (password) => {
  return password.length > 5;
};

export const validatePostCode = (postCode) => {
  const codeToReview = RegExp.escape(postCode);
  const regex = /^[a-z]{1,2}[0-9][a-z0-9]?\s?[0-9][a-z]{2}$/i;
  return regex.test(codeToReview);
};

export const validateName = (name) => {
  const value = RegExp.escape(name);
  return /^([^\n0123456789¬`!"£$%^&*()_+=<>?,/:@~;#|{}[\]\\]+)$/.test(value);
};

export const validatePhone = (num) => {
  const value = RegExp.escape(num);
  return /^\+?(\s*\d){9,20}\s*$/.test(value);
};

export const validateNumber = (num) => {
  const value = RegExp.escape(num);
  return /^[0-9]+$/i.test(value);
};

export const validateCharacter = (char) => {
  const value = RegExp.escape(char);
  return /^[A-Z0-9-]*$/i.test(value);
};
