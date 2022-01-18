import * as constant from "../constant";
import PltRequest from "./index";
import PltCommon from "../plt_common";

const url_getAll = `${constant.DOMAIN_APP}/api/admin/bill/get-all`;
const url_create = `${constant.DOMAIN_APP}/api/admin/bill/create`;
const url_update = `${constant.DOMAIN_APP}/api/admin/bill/update`;
const url_delete = `${constant.DOMAIN_APP}/api/admin/bill/delete`;

const BillRequest = {
  /**
   * Create
   * @param formData
   * @returns {Object}
   */
  create: async (formData) => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();

    return PltRequest.postData({
      method: constant.KEY_METHOD_POST,
      url: url_create,
      data: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },

  /**
   * getAll
   * @returns {Array}
   */
  getAll: async () => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();

    return PltRequest.getData({
      method: constant.KEY_METHOD_GET,
      url: url_getAll,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },

  /**
   * Update
   * @returns {Object}
   */
  update: async (formData) => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();

    return PltRequest.postData({
      method: constant.KEY_METHOD_POST,
      url: url_update,
      data: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },

  /**
   * Delete
   * @returns {Object}
   */
  delete: async (formData) => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();

    return PltRequest.postData({
      method: constant.KEY_METHOD_POST,
      url: url_delete,
      data: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },
};

export default BillRequest;