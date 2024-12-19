import { isArray, isString, isNumber, isNull, isUndefined } from "lodash";
import {
  waitControlShow,
  waitControlHide,
} from "./../Components/Controls/WaitControl";

export const getUrl = () => {
  const env = window.location.host;

  switch (env) {
    case "localhost:3000":
      // return "https://localhost:44317/api/v2";
      return "https://dijoks3b3xwsy.cloudfront.net/api/v2";

    case "residencialquintasdelsol.netlify.app":
      return "https://d39j50aglfnpm9.cloudfront.net/api/v2";

    default:
      return "http://apissaweb.ssahonduras.com/api/v2";
  }
};

export const getRequestUserInfo = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);

    return userInfo;
  }

  return {};
};

export const getRequestUserInfoByService = () => {
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);

    return {
      modifiedBy: userInfo.userName,
      createdBy: userInfo.userName,
    };
  }

  return {};
};

export const getRequestUserInfoSecurityObjects = () =>
  sessionStorage.securityObjects
    ? JSON.parse(sessionStorage.securityObjects)
    : [];

export const getLoggedUserName = sessionStorage.userName;

export const objectParametize = (obj, q, parent) => {
  const str = [];
  const delimeter = "&";
  let objKey;
  const a = Object.keys(obj);
  a.forEach((key) => {
    switch (typeof obj[key]) {
      case "object":
        if (obj[key]) {
          if (isArray(obj[key])) {
            obj[key].forEach((arrObject) => {
              if (parent) {
                objKey = `${parent}.${key}`;
              } else {
                objKey = key;
              }
              if (isString(arrObject) || isNumber(arrObject)) {
                if (parent) {
                  str[str.length] = `${parent}.${key}=${arrObject}`;
                }
                str[str.length] = `${key}=${arrObject}`;
              } else if (!isString(arrObject)) {
                str[str.length] = objectParametize(arrObject, false, objKey);
              }
            });
          } else if (isArray(obj[key])) {
            str[str.length] = `${parent}.${key}=${obj[key]}`;
          } else {
            if (parent) {
              objKey = `${parent}.${key}`;
            } else {
              objKey = key;
            }
            str[str.length] = objectParametize(obj[key], false, objKey);
          }
        }
        break;
      default: {
        if (obj[key]) {
          if (parent) {
            str[str.length] = `${parent}.${key}=${obj[key]}`;
          } else {
            str[str.length] = `${key}=${obj[key]}`;
          }
        }
      }
    }
  });

  return (q === true ? "?" : "") + str.join(delimeter);
};

export class restClient {
  static httpGet = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      waitControlShow();
    }

    const request = {
      ...obj,
      requestUserInfo: getRequestUserInfoByService(),
    };
    let urlparam;

    if (request) {
      urlparam = `&${objectParametize(request, false)}`;
    }

    const paramUrl = `${url}?format=json${urlparam}`;
    return fetch(`${getUrl()}${paramUrl}`)
      .catch((error) => {
        if (useWaitControl) {
          waitControlHide();
        }

        return error;
      })
      .then((response) => {
        if (useWaitControl) {
          waitControlHide();
        }

        if (isUndefined(response) || isNull(response)) {
          return response;
        }
        if (response && response.status && response.status === 404) {
          waitControlHide();

          return response;
        }

        if (response.stack || response.TypeError) {
          return response;
        }
        return response.json();
      })
      .then((response) => {
        if (useWaitControl) {
          waitControlHide(response);
        }
        if (response && response.status && response.status === 404) {
          // toast.error(response.statusText);
          if (useWaitControl) {
            waitControlHide();
          }

          return response;
        }

        return response;
      });
  };

  static httpPost = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      waitControlShow();
    }

    const requestUserInfo = getRequestUserInfoByService();

    const request = {
      ...obj,
      requestUserInfo,
    };

    // const authorization = `Bearer ${sessionStorage.access_token}`;

    return fetch(`${getUrl()}${url}`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-type": "application/json" },
    })
      .catch((error) => {
        if (useWaitControl) {
          waitControlHide();
        }
        // toast.error(error.message);
      })
      .then((response) => {
        if (isUndefined(response) || isNull(response)) {
          if (useWaitControl) {
            waitControlHide();
          }

          return response;
        }
        if (response && response.status && response.status === 404) {
          if (useWaitControl) {
            waitControlHide();
          }

          return response;
        }
        if (response.stack || response.TypeError) {
          return response;
        }

        return response.json();
      })
      .then((response) => {
        if (useWaitControl) {
          waitControlHide();
        }
        return response;
      });
  };

  static httpPut = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      waitControlShow();
    }
    const request = {
      ...obj,
      RequestUserInfo: getRequestUserInfoByService(),
    };
    return fetch(`${getUrl()}${url}`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: { "Content-type": "application/json" },
    })
      .catch((error) => {
        if (useWaitControl) {
          waitControlHide();
        }
        // toast.error(error.message);
      })
      .then((response) => {
        if (isUndefined(response) || isNull(response)) {
          return response;
        }
        if (response && response.status && response.status === 404) {
          waitControlHide();

          return response;
        }
        if (response.stack || response.TypeError) {
          waitControlHide();

          return response;
        }

        return response.json();
      })
      .then((response) => {
        if (useWaitControl) {
          waitControlHide();
        }
        return response;
      });
  };

  static httpDelete = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      waitControlShow();
    }
    const request = {
      ...obj,
      RequestUserInfo: getRequestUserInfoByService(),
    };
    return fetch(`${getUrl()}${url}`, {
      method: "DELETE",
      body: JSON.stringify(request),
      headers: { "Content-type": "application/json" },
    })
      .catch((error) => {
        if (useWaitControl) {
          waitControlHide();
        }
        // toast.error(error.message);
      })
      .then((response) => {
        if (isUndefined(response) || isNull(response)) {
          waitControlHide();

          return response;
        }
        if (response && response.status && response.status === 404) {
          return response;
        }

        if (response.stack || response.TypeError) {
          waitControlHide();

          return response;
        }

        return response.json();
      })
      .then((response) => {
        if (useWaitControl) {
          waitControlHide();
        }
        return response;
      });
  };
}
