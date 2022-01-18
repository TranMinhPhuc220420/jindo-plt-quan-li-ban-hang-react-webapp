const dev_mode = (window.location.host.indexOf('localhost') !== -1);
let domain_app = '';
if (dev_mode) {
  domain_app = 'http://127.0.0.1:8000';
} else {
  console.log = function () { };
  console.info = function () { };
  console.warn = function () { };
  domain_app = 'https://psm.xaydungphanmem.com';
}

export const DOMAIN_APP = domain_app;
export const KEY_ACCESS_TOKEN = 'access_token';

export const KEY_METHOD_GET = 'GET';
export const KEY_METHOD_POST = 'POST';
// Successful response
export const RESPONSE_STATUS_OK = 200;
export const RESPONSE_STATUS_CREATED = 201;
// Client errors
export const RESPONSE_BAB_REQUEST = 400;
export const RESPONSE_MESSAGE_BAB_REQUEST = 'bab_request';
export const RESPONSE_STATUS_FORBIDDEN = 403;
export const RESPONSE_MESSAGE_FORBIDDEN = 'forbidden';
export const RESPONSE_STATUS_UNAUTHORIZED = 401;
export const RESPONSE_STATUS_INTERNAL_SERVER_ERROR = 500;

//
export const KEY_OF_ROLE_ADMIN = 'admin';
export const KEY_OF_ROLE_CLIENT = 'client';

export const OBJECT_REQUEST_UNAUTHORIZED = {
  config: {},
  data: null,
  headers: null,
  status: RESPONSE_STATUS_UNAUTHORIZED,
  statusText: RESPONSE_MESSAGE_FORBIDDEN,
};
