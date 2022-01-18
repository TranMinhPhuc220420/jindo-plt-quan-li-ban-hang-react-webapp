import axios from "axios";
import * as constant from "../constant";

const PltRequest = {
  getData: async (config) => {
    try {
      const {data, status, statusText} = await axios(config);
      let dataResult = {};
      if (data.data) {
        dataResult = JSON.parse(data.data);
      }

      return dataResult
    } catch (error) {
      return constant.OBJECT_REQUEST_UNAUTHORIZED.data;
    }
  },
  postData: async (config) => {
    try {
      const {data, status, statusText} = await axios(config);
      let dataResult = {};
      if (data.data) {
        dataResult = JSON.parse(data.data);
      }

      return dataResult
    } catch (error) {
      console.error(error);
      return constant.OBJECT_REQUEST_UNAUTHORIZED.data;
    }
  },
};

export default PltRequest;
