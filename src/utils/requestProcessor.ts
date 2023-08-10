import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "./constants";
import Cookies from "js-cookie";

var accessToken: any = Cookies.get("user");
let token: any = "";
if (accessToken) {
  token = JSON.parse(accessToken);
}

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async (options: any) => {
  token !== "" &&
    (client.defaults.headers.common.Authorization = `Bearer ${token?.token}`);

  const onSuccess = (response: AxiosResponse) => {
    return response?.data;
  };
  const onError = (error: AxiosError) => {
    return Promise.reject(error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};
