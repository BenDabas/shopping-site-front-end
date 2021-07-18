const axios = require('axios');

// const { getConfig } = require('config');
const { getConfig } = require('../../config/index');

/* Configurations */

const config = getConfig(process.env.TARGET_ENV);
const defaultAxios = axios.create({ baseURL: config.backendConfig.baseUrl });
const axiosS3Instance = axios.create();

defaultAxios.CancelToken = axios.CancelToken;

/* Axios Interceptors */

defaultAxios.interceptors.request.use(async (req) => {
  req.headers['x-access-token'] = localStorage.getItem('myData');
  return req;
});

defaultAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('Axios Response Interceptors caught error: ', err);
    throw err;
  }
);

/* HTTP Service */

let cancelToken;

const HttpService = {
  makeHttpGetRequest: async (
    url,
    funcName,
    queryParams = {},
    isCancelToken = false
  ) => {
    try {
      if (isCancelToken) {
        // Check if there are any previous pending requests
        if (cancelToken !== undefined) {
          cancelToken.cancel('Operation canceled due to new request.');
        }
        // Save the cancel token for the current request
        cancelToken = defaultAxios.CancelToken.source();
      }

      const startedTime = new Date();
      console.log(`${startedTime}
        			Received GET request to '${config.backendConfig.baseUrl + '/' + url}' ${
        Object.keys(queryParams).length
          ? `with query params: ${JSON.stringify(queryParams)}`
          : ''
      } from '${funcName}' function`);

      const res = await defaultAxios.get(url, {
        params: queryParams,
        cancelToken: cancelToken && cancelToken.token, // Send the cancel token if exists
      });
      if (res && res.data) {
        const endTime = new Date() - startedTime;
        console.info(
          `API GET request succeeded with status ${res.status}.
					Processing time: ${endTime}ms
					Url: ${config.backendConfig.baseUrl + '/' + url}`,
          res
        );
        return res.data;
      }
    } catch (err) {
      console.info(
        `An error occurred at HttpGetMethod function, 
				triggered from ${funcName} while tried to fetch ${url}:`,
        err.message
      );
      throw err;
    }
  },

  makeHttpPostRequest: async (url, body, funcName) => {
    try {
      const startedTime = new Date();
      console.info(
        `${startedTime} Received POST request to '${
          config.backendConfig.baseUrl + url
        }' from '${funcName}' function`
      );

      const res = await defaultAxios.post(url, body);
      if (res && res.data) {
        const endTime = new Date() - startedTime;
        console.info(
          `API POST request succeeded with status ${res.status}.
					Processing time: ${endTime}ms
					Url: ${config.backendConfig.baseUrl + url}`,
          res
        );
        return res.data;
      }
    } catch (err) {
      console.info(
        `An error occurred at HttpPostMethod function,
				triggered from ${funcName} while tried to fetch ${url}`,
        err.response?.data?.message || err.message
      );
      throw err?.response?.data || err;
    }
  },

  makeHttpPatchRequest: async (url, body, funcName) => {
    try {
      const startedTime = new Date();
      console.info(`${startedTime}
			Received PATCH request to '${
        config.backendConfig.baseUrl + url
      }' from '${funcName}' function`);

      const res = await defaultAxios.patch(url, body);
      if (res && res.data) {
        const endTime = new Date() - startedTime;
        console.info(
          `API PATCH request succeeded with status ${res.status}.
					Processing time: ${endTime}ms
					Url: ${config.backendConfig.baseUrl + url}`,
          res
        );
        return res.data;
      }
    } catch (err) {
      console.info(
        `An error occurred at HttpPatchMethod function,
				triggered from ${funcName} while tried to fetch ${url}`,
        err.message
      );
      throw err;
    }
  },

  makeHttpDeleteRequest: async (url, body = {}, funcName = '') => {
    try {
      const startedTime = new Date();
      console.info(`${startedTime}
						Received DELETE request to '${
              config.backendConfig.baseUrl + url
            }' from '${funcName}' function`);

      const res = await defaultAxios.delete(url, body);
      if (res && res.data) {
        const endTime = new Date() - startedTime;
        console.info(
          `API DELETE request succeeded with status ${res.status}.
					Processing time: ${endTime}ms
					Url: ${url}`,
          res
        );
        return res.data;
      }
    } catch (err) {
      console.info(
        `An error occurred at HttpDeleteMethod function,
				triggered from ${funcName} while tried to fetch ${url}`,
        err.message
      );
    }
  },
};

export default HttpService;
