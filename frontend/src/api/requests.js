import { axiosInstance } from "./routes";

/**
 * @typedef {Object} daoRequest The general pattern for requests in this app
 * @property {string} daoRequest.route Backend route to the data
 * @property {string} [daoRequest.id] Identifying option for route
 * @property {string} daoRequest.token Token to verify identity
 * @property {Object} [daoRequest.data] Data to be POST/PUT
 * @property {"PUT"|"POST"} [daoRequest.method] Method to be used
 */

/**
 * Triggers a GET request to the specified route
 * @param {daoRequest} daoRequest only get routes
 */
export const fetchData = async ({ route, id, token }) => {
  try {
    const res = await axiosInstance.get(route + id, {
      headers: { Authorization: `Basic ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Triggers a POST or PUT request and sends data
 * @param {daoRequest} daoRequest for PUT or POST routes
 */
export const sendData = async ({ route, id, token, data, method }) => {
  // If no ID is needed, make empty string so it still works
  if (!id) {
    id = "";
  }

  try {
    const res = await axiosInstance.request({
      url: route + id,
      data: data,
      method: method,
      headers: { Authorization: `Basic ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
