import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL as string,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_MATCHED_TOKEN as string}`,
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(config => config);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response?.data || 'Something went wrong');
  }
);

export default axiosInstance;
// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig?]): Promise<any> => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  nlp: "/web",
  categories: "/categories",
};