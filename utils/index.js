import moment from 'moment';
import BigNumber from 'bignumber.js';

import LENGTH_CONSTANTS from 'constants/length';
import { EMPTY_DEFAULT_TEXT, ZERO_VALUE } from 'constants/common';
import { ANTD_ORDERS, MAX_LENGTH_PRICE, ORDERS } from 'constants/nft';


const { MIN_VALUE } = LENGTH_CONSTANTS;

export const DATE_FORMAT = 'MMMM DD, YYYY  HH:mm:ss';

export const clearRequestParams = (params) => {
  const newParams = {} ;
  const cloneParams = { ...params };
  for (const field in cloneParams) {
    if (cloneParams?.[field] || cloneParams?.[field] === 0 || cloneParams?.[field] === false) {
      newParams[field] = cloneParams?.[field];
    }
  }
  return newParams;
};

export const formatDate = (date, type = DATE_FORMAT) => {
  return date ? moment(date).format(type) : EMPTY_DEFAULT_TEXT;
};

export const getLocation = () => {
  return typeof window !== 'undefined' ? window.location.href : '';
};

export const shortenAddress = (address, number = -4) => {
  if (address) {
    const first = address.slice(0, 6);
    const last = address.slice(number);
    return `${first}...${last}`;
  }
  return;
};

export const formatCurrency = (value) => {
  if (!value) {
    return ZERO_VALUE;
  }
  return new BigNumber(value).isLessThan(new BigNumber(MIN_VALUE))
    ? new BigNumber(MIN_VALUE).toFormat()
    : new BigNumber(value).toFormat();
};

export const getNumberValue = (value) => {
  return value ?? ZERO_VALUE;
};

export const convertPriceBigNumber = (value, coinDecimal = 18) => {
  BigNumber.config({
    EXPONENTIAL_AT: 100,
  });
  return new BigNumber(value).multipliedBy(new BigNumber(Math.pow(10, coinDecimal)));
};

export const isLessThanOfTenPowerByCap = (value, dicimal) => {
  BigNumber.config({
    EXPONENTIAL_AT: 100,
  });
  return value > 0 && new BigNumber(value).lt(new BigNumber(Math.pow(10, dicimal)));
};

export const multipleTwoBigNumber = (first, second) => {
  if (!first || !second) {
    return 0;
  }
  BigNumber.config({
    EXPONENTIAL_AT: 100,
  });
  return new BigNumber(first).multipliedBy(new BigNumber(second)).toString();
};

export const convertToNumber = (value) => {
  return value ? new BigNumber(value).toNumber() : ZERO_VALUE;
};

export const limitMaxLengthNumber =
  (maxLength = MAX_LENGTH_PRICE) =>
  (inputObj) => {
    const { value } = inputObj;
    const integerPath = (value || '').split('.')[0];
    return integerPath.length <= maxLength;
  };

export const getValueAttributes = (attributes, field) => attributes?.[field]?.text || attributes?.[field];

export const getImageAttributes = (attributes, field) => attributes?.[field]?.imgUrl;

export const getRowKey = (row) => row?._id;

export const setOrderSorter = (order) => {
  const newOrder =
    (order === ANTD_ORDERS.ASCEND && ORDERS.ASC) || (order === ANTD_ORDERS.DESCEND && ORDERS.DESC) || null;
  return newOrder;
};

export const getStartDateTimestamp = (value) => {
  if (!value) {
    return;
  }
  return moment(value).clone().startOf('days').toISOString();
};

export const getEndDateTimestamp = (value) => {
  if (!value) {
    return;
  }
  return moment(value).clone().endOf('days').toISOString();
};

export const nFormatter = (num, digits = 2) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : num.toFixed(8);
};
