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

const storedValue = localStorage.getItem("recoil-persist");
const accessToken = storedValue ? JSON.parse(storedValue)?.UserInfoState?.accessToken : undefined;
export const customAxios = createCustomAxios(accessToken);

export const authAxios = axios.create({
  baseURL: "/api",
});