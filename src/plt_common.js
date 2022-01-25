import Cookies from 'js-cookie';
import jQuery from 'jquery';

import * as constant from './constant';
import currencyFormatter from "currency-formatter";

const PltCommon = {
  getAccessTokenUserCooke: async () => {
    return await Cookies.get(constant.KEY_ACCESS_TOKEN);
  },

  /**
   * To low text and space to -
   * @param {String} textToLow
   * @returns {String}
   */
  subStrToLowWidthSpace: (textToLow) => {
    return textToLow.toLowerCase()
      .normalize("NFD")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  },

  /**
   * Check and to Boolean form string
   * @param {String} str
   */
  toBoolean: (str) => {
    str.toLowerCase().trim();

    if (str == 'true') {
      return true;
    }

    return false;
  },

  /**
   * Check and to Boolean form number
   * @param {Number} number
   */
  numberToBoolean: (number) => {
    if (number == 1) {
      return true;
    }

    return false;
  },

  /**
   * @param {String} strDate
   */
  convertDateToSetInputDateTime: (strDate) => {
    // '2021-05-20T20:05'
    let date = new Date(strDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month >= 0 && month <= 9) month = '0' + month;
    let day = date.getDate();
    if (day >= 0 && day <= 9) day = '0' + day;

    let hours = date.getHours();
    if (hours >= 0 && hours <= 9) hours = '0' + hours;
    let minutes = date.getMinutes();
    if (minutes >= 0 && minutes <= 9) minutes = '0' + minutes;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },

  /**
   * Scroll to element
   * @param {Element} el element to scroll to top
   */
  scrollTo: (el) => {
    const body = jQuery("html, body");
    const scrollTo = el.offsetTop;
    body.stop().animate({scrollTop: scrollTo + 120}, 500, 'swing');
  },

  /**
   * Check app runing on mobile
   * @returns {boolean}
   */
  isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }
  },

  /**
   * Check is string is empty
   * @param {string} str
   * @returns {boolean}
   */
  isStrEmpty(str) {
    str = str + '';
    str.trim();

    if (str === '' || str.length === 0) {
      return true;
    }

    return false;
  },

  /**
   * getHeightBody
   * @returns {number}
   */
  getHeightBody() {
    const body = document.body,
      html = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );
  },

  getFileUrlTemp(file) {
    return (window.URL || window.webkitURL).createObjectURL(file);
  },

  formatVietnamMoney(value) {
    return currencyFormatter.format(value, {code: 'VND'});
  }
};

export default PltCommon;
