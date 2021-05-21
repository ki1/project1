// The cookies needs to be shared by all the subdomains
const commonCookiesOptions = {
  domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  path: '/',
  secure: true,
  samesite: 'none',
};

export default commonCookiesOptions;
