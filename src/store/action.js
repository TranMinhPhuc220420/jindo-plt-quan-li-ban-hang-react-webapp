import Cookies from 'js-cookie';

import * as constant from '../constant';
import * as typeAction from '../store/actionType';

// UI
/**
 * setUiOpenNavLeft
 * @param isOpen
 * @returns {{payload: *, type: string}}
 */
export const setUiOpenNavLeft = (isOpen) => {
  return {
    type: typeAction.SET_UI_OPEN_NAV_LEFT,
    payload: isOpen
  }
};
/**
 * setUiLoadMark
 * @param isLoad
 * @returns {{payload: *, type: string}}
 */
export const setUiLoadMark = (isLoad) => {
  return {
    type: typeAction.SET_UI_LOAD_MARK,
    payload: isLoad
  }
};

// App
/**
 * setAppViewActive
 * @param dataView
 * @returns {{payload: *, type: string}}
 */
export const setAppViewActive = (dataView) => {
  return {
    type: typeAction.SET_APP_VIEW_ACTIVE,
    payload: dataView
  }
};
/**
 * setAppViewActive
 * @param {boolean} isOpen
 * @returns {{payload: *, type: string}}
 */
export const setAppOpenDialogAddNew = (isOpen) => {
  return {
    type: typeAction.SET_APP_OPEN_DIALOG_ADD_NEW,
    payload: isOpen
  }
};
/**
 * setAppOpenDialogEdit
 * @param {boolean} isOpen
 * @returns {{payload: *, type: string}}
 */
export const setAppOpenDialogEdit = (payload) => {
  return {
    type: typeAction.SET_APP_OPEN_DIALOG_EDIT,
    payload: payload
  }
};
/**
 * setAppSnackBar
 * @param {object} data
 * @returns {{payload: *, type: string}}
 */
export const setAppSnackBar = (data) => {
  return {
    type: typeAction.SET_APP_SNACK_BAR,
    payload: data
  }
};
/**
 * setAppSnackBar
 * @param {string} keySearch
 * @returns {{payload: *, type: string}}
 */
export const setAppKeySearchItemList = (keySearch) => {
  return {
    type: typeAction.SET_APP_KEY_SEARCH_ITEM_LIST,
    payload: keySearch
  }
};
/**
 * setAppSnackBar
 * @param {string} keySearch
 * @returns {{payload: *, type: string}}
 */
export const setAppGridIsLoading = (isLoading) => {
  return {
    type: typeAction.SET_APP_GRID_IS_LOADING,
    payload: isLoading
  }
};

// Data
/**
 * setDataUserLogin
 * @param dataUser
 * @returns {{payload: *, type: string}}
 */
export const setDataUserLogin = (dataUser) => {
  return {
    type: typeAction.SET_DATA_USER_LOGIN,
    payload: dataUser
  }
};
/**
 * setDataAccessToken
 * @param accessToken
 * @returns {{payload: *, type: string}}
 */
export const setDataAccessToken = (accessToken) => {
  Cookies.set(constant.KEY_ACCESS_TOKEN, accessToken);

  return {
    type: typeAction.SET_DATA_ACCESS_TOKEN,
    payload: accessToken
  }
};
/**
 * setDataCategorys
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setDataCategorys = (data) => {
  return {
    type: typeAction.SET_DATA_CATEGORYS,
    payload: data
  }
};
/**
 * setDataProducts
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setDataProducts = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].price = Number.parseInt(data[i].price);
    data[i].image_url += `?v=${Math.random()}`;
  }
  return {
    type: typeAction.SET_DATA_PRODUCT,
    payload: data
  }
};
/**
 * setDataCustomers
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setDataCustomers = (data) => {
  return {
    type: typeAction.SET_DATA_CUSTOMERS,
    payload: data
  }
};
/**
 * setDataBills
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setDataBills = (data) => {
  return {
    type: typeAction.SET_DATA_BILLS,
    payload: data
  }
};
/**
 * setDataInsurancess
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setDataInsurancess = (data) => {
  return {
    type: typeAction.SET_DATA_INSURANCESS,
    payload: data
  }
};