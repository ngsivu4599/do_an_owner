import { i18n } from "next-i18next";
import { throttle } from "lodash";
import axios from "axios";

import baseUrl from "./config";

// import showMessage from 'components/Message';

// import { storeGlobal } from 'redux/configStore';
// import { handleSetAuthenticationToken } from 'redux/authentication/slice';
// import { handleRemoveAddressNetwork, handleSetAddressNetwork } from 'redux/address/slice';

import validate from "../../utils/validate";

const TYPE_CONSTANTS = {
  MESSAGE: {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    IMG_DONE: "done",
  },
};

const HTTP_STATUS_CONSTANTS = {
  OK: 200,
  ERROR_CODE_401: 401,
  RESPONSE_OK: 0,
  SERVER_ERROR: "E0",
  ERROR: 400,
};

const HEADERS = {
  Accept: "*/*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  Connection: " keep-alive",
  "Content-Length": 123,
  "Content-Type": " application/json; charset=utf-8",
};

const HEADERS_MULTIPLE_PART = {
  ...HEADERS,
  "Content-Type": "multipart/form-data; boundary=something",
  Accept: "application/json",
};

export const getToken = (token) => {
  HEADERS["Authorization"] = `Bearer ${token}`;
  HEADERS_MULTIPLE_PART["Authorization"] = `Bearer ${token}`;
};

const getFullUrl = (url) => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  return `http://localhost:3500` + url;
};

const resetToLogin = () => {
  // const address = storeGlobal?.getState()?.AddressSlice?.address;

  // storeGlobal.dispatch(handleSetAddressNetwork({}));
  // storeGlobal.dispatch(handleSetAuthenticationToken(""));
  // storeGlobal?.dispatch(handleRemoveAddressNetwork({ address }));
};

const throttledResetToLogin = throttle(resetToLogin, 500, {
  leading: false,
  trailing: true,
});

const checkErrorNetwork = (err) => {
  if (err?.toJSON() && err.toJSON().message === "Network Error") {
    return showMessage(typeOfMessage.ERROR, i18n?.t(`message.E3`));
  }
  return err;
};

export const excludeResponse = ["empty_response"];

const checkErrorStatus = (response, options) => {
  if (
    response?.status >= HTTP_STATUS_CONSTANTS.ERROR &&
    !excludeResponse.includes(response?.data?.code)
  ) {
    // if (HTTP_STATUS_CONSTANTS.SERVER_ERROR !== response?.data?.code) {
    //   !options?.isHideErrorMessage &&
    //     showMessage(
    //       typeOfMessage.ERROR,
    //       response?.data?.code
    //         ? `message.${response?.data?.code}`
    //         : `message.${response?.code}`,
    //       response?.meta?.extraInfo
    //     );
    // } else {
    //   !options?.isHideErrorMessage &&
    //     showMessage(typeOfMessage.ERROR, response?.meta?.msg);
    // }
  }
  return response.data;
};

export const checkSuccessRequest = (response) => {
  return response?.status < HTTP_STATUS_CONSTANTS.ERROR;
};

const checkExpiredOrAuthorization = (response) => {
  return HTTP_STATUS_CONSTANTS.ERROR_CODE_401 === response?.status;
};

const api = {
  post: (endpoint, params, options) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        //headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          console.log(response,122)
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response, options);
        },
        (err) => {
          console.log(err.response,11)
          return (
            checkErrorStatus(err?.response, options) || checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        console.log(response)
        return response.data;
      });
  },

  postMultiplePart: (endpoint, params, options) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response, options);
        },
        (err) => {
          return (
            checkErrorStatus(err?.response, options) || checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  get: (endpoint, params = {}, options) => {
    return axios
      .get(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data, options);
          }
          return checkErrorStatus(response, options);
        },
        (err) => {
          return (
            checkErrorStatus(err?.response, options) || checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  put: (endpoint, params, options) => {
    return axios
      .put(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data, options);
          }
          return checkErrorStatus(response, options);
        },
        (err) => {
          return (
            checkErrorStatus(err?.response, options) || checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  patch: (endpoint, params, options) => {
    return axios
      .patch(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data, options);
          }
          return checkErrorStatus(response, options);
        },
        (err) => {
          return (
            checkErrorStatus(err?.response, options) || checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  patchMultipart: (endpoint, params, options) => {
    return axios
      .patch(getFullUrl(endpoint), params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data, options);
          }
          return checkErrorStatus(response, options);
        },
        (err) => {
          return (
            checkErrorStatus(err?.response, options) || checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  delete: (endpoint, params, options) => {
    return axios
      .delete(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response, options);
        },
        (err) => {
          return (
            checkErrorStatus(err?.response, options) || checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        return response.data;
      });
  },
};

const apiCustom = {
  get: (endpoint, params = {}, options) => {
    return axios
      .get(endpoint, {
        params: params,
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (checkExpiredOrAuthorization(response)) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data, options);
          }
          return checkErrorStatus(response?.data, options);
        },
        (err) => {
          return (
            (err?.response?.data &&
              checkErrorStatus(err.response.data, options)) ||
            checkErrorNetwork(err)
          );
        }
      )
      .catch((response) => {
        return response.data;
      });
  },
};

export { api, apiCustom };
