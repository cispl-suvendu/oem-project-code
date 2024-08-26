import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/${process.env.NEXT_PUBLIC_APP_API_VERSION}`
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 15000;

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    Cookies.remove('token');
    window.location.href = "/login";
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, option?: AxiosRequestConfig) => instance.get(url, option).then(responseBody),
  post: (url: string, body?: object | FormData, option?: AxiosRequestConfig) => {
    const config = {
      ...option,
      headers: {
        ...(body instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
        ...option?.headers,
      },
    };
    return instance.post(url, body, config).then(responseBody);
  },
  patch: (url: string, body?: object) => instance.patch(url, body).then(responseBody),
  put: (url: string, body?: object, option?: AxiosRequestConfig) => instance.put(url, body, option).then(responseBody),
  delete: (url: string, body?: object, option?: AxiosRequestConfig) => instance.delete(url, { ...option, data: body }).then(responseBody),
};

export default requests;
