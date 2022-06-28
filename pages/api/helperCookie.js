import cookie from 'react-cookies';
// import env from '@/env';

const COOKIE_DOMAIN = 'http://localhost:3002';
const COOKIE_ACCESS_TOKEN = `atk`;
const COOKIE_REFRESH_TOKEN = `rtk`;
const BOOK_MARK = `bm`;
// const MAXIMUM_EXPIRES_TIME = 2147483647;

const cookieSetting = {
  path: '/',
  domain: COOKIE_DOMAIN,
  // secure: true,
  // httpOnly: true,
  // expires: MAXIMUM_EXPIRES_TIME,
};

export const setCookie = (name, value) => cookie.save(name, value, cookieSetting);

export const getCookie = (name) => cookie.load(name);

const removeCookie = (name) => cookie.remove(name, cookieSetting);

class AuthHelpers {
  getRefreshToken() {
    return getCookie(COOKIE_REFRESH_TOKEN);
  }

  storeRefreshToken(refreshToken) {
    setCookie(COOKIE_REFRESH_TOKEN, refreshToken);
  }

  getAccessToken() {
    return getCookie(COOKIE_ACCESS_TOKEN);
  }

  storeAccessToken(accessToken) {
    setCookie(COOKIE_ACCESS_TOKEN, accessToken);
  }

  getBookMark() {
    return getCookie(BOOK_MARK);
  }

  storeBookMark(data) {
    return setCookie(BOOK_MARK, data);
  }

  clearTokens() {
    removeCookie(COOKIE_ACCESS_TOKEN);
    removeCookie(COOKIE_REFRESH_TOKEN);
  }
}

const Instance = new AuthHelpers();
export default Instance;