import axios from "axios";
import Cookies from 'js-cookie';

import * as constant from '../constant';

const url_loginByEmailPassword = `${constant.DOMAIN_APP}/api/admin/login`;
const url_logout = `${constant.DOMAIN_APP}/api/admin/logout`;
const url_getInfoByToken = `${constant.DOMAIN_APP}/api/admin/info`;

const AdminRequest = {
  /**
   * getInfoByToken
   * @param token
   * @returns {Promise<{data: {}, statusText: string, status: number}|{headers: null, data: null, statusText: string, config: {}, status: number}>}
   */
  getInfoByToken: async (token) => {
    if (typeof token === 'undefined' || !token) {
      token = Cookies.get(constant.KEY_ACCESS_TOKEN);
    }

    const configRequest = {
      method: 'GET',
      url: url_getInfoByToken,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const {data, status, statusText} = await axios(configRequest);

      let dataResult = {};
      if (data.data) {
        dataResult = JSON.parse(data.data);
      }

      return {data: dataResult, status, statusText};

    } catch (error) {
      Cookies.remove('access_token');
      return constant.OBJECT_REQUEST_UNAUTHORIZED;
    }
  },

  /**
   * loginByEmailPassword
   * @param email
   * @param password
   * @param callback
   * @returns {Promise<{data: {}, statusText: string, status: number}|{headers: null, data: null, statusText: string, config: {}, status: number}>}
   */
  loginByEmailPassword: async (email, password, callback) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const {data, status, statusText} = await axios.post(url_loginByEmailPassword, formData);

      let dataResult = {};
      if (data.data) {
        dataResult = JSON.parse(data.data);
      }

      return {data: dataResult, status, statusText};

    } catch (error) {

      return constant.OBJECT_REQUEST_UNAUTHORIZED;
    }
  },

  /**
   * logout
   * @param token
   * @returns {Promise<{data: {}, statusText: string, status: number}|{headers: null, data: null, statusText: string, config: {}, status: number}>}
   */
  logout: async (token) => {
    if (typeof token === 'undefined' || !token) {
      token = Cookies.get(constant.KEY_ACCESS_TOKEN);
    }

    try {
      Cookies.remove('access_token');

      const configRequest = {
        method: 'POST',
        url: url_logout,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      };

      const {data, status, statusText} = await axios(configRequest);
      let dataResult = {};
      if (data.data) {
        dataResult = JSON.parse(data.data);
      }
      Cookies.remove('access_token');
      return {data: dataResult, status, statusText};
    } catch (error) {
      Cookies.remove('access_token');
      return constant.OBJECT_REQUEST_UNAUTHORIZED;
    }
  },
};

export default AdminRequest;
