import axios, { AxiosRequestConfig } from "axios";

export const createCustomAxios = (token: string | undefined = undefined) => {
  const config: AxiosRequestConfig = {
    baseURL: "/api",
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  return axios.create(config);
};

export const customAxios = createCustomAxios();

export const authAxios = axios.create({
  baseURL: "/api",
});