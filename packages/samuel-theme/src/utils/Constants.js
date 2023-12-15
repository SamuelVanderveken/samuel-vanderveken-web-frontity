// Base api URL.
export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://samuelvanderveken.com/wp-json`
    : `${process.env.REACT_APP_WORDPRESS_BASE_URL}/wp-json`;
