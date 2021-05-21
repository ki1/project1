export const PAGE_DECREMENT_ADJUSTMENT = 1;

export const getPage = () => {
  const page = new URLSearchParams(window.location.search).get('page');
  return page ? parseInt(page) - PAGE_DECREMENT_ADJUSTMENT : null;
};

export const scrollToTop = () =>
  window.requestAnimationFrame(() => window.scrollTo(0, 0));
