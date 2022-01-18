import * as constant from "../constant";
import PltRequest from "./index";
import PltCommon from "../plt_common";

const url_getAll = `${constant.DOMAIN_APP}/api/admin/insurances/get-all`;
const url_create = `${constant.DOMAIN_APP}/api/admin/insurances/create`;
const url_update = `${constant.DOMAIN_APP}/api/admin/insurances/update`;
const url_delete = `${constant.DOMAIN_APP}/api/admin/insurances/delete`;

const InsurancesRequest = {
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
  update: async () => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();

    return PltRequest.postData({
      method: constant.KEY_METHOD_POST,
      url: url_update,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },

  /**
   * Delete
   * @returns {Object}
   */
  delete: async () => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();

    return PltRequest.postData({
      method: constant.KEY_METHOD_POST,
      url: url_delete,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },
};

export default InsurancesRequest;